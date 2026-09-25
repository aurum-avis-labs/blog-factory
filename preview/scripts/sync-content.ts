/**
 * sync-content.ts
 *
 * Pre-build script that copies blog content from brands/ into the preview
 * site's content collection directory. Also copies and namespaces images
 * per brand to avoid collisions.
 *
 * Content: brands/{brand}/{lang}/*.mdx → src/content/blog/{brand}/{lang}/
 * Images:  brands/{brand}/images/*     → src/assets/blog/{brand}/
 *
 * Image paths in MDX are rewritten from @/assets/blog/... to @/assets/blog/{brand}/...
 */

import fs from "fs";
import path from "path";

const PREVIEW_ROOT = path.resolve(import.meta.dirname, "..");
const BRANDS_ROOT = path.resolve(PREVIEW_ROOT, "..", "brands");
const CONTENT_DEST = path.join(PREVIEW_ROOT, "src", "content", "blog");
const ASSETS_DEST = path.join(PREVIEW_ROOT, "src", "assets", "blog");

function copyDirRecursive(src: string, dest: string): number {
  let count = 0;
  if (!fs.existsSync(src)) return count;

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

function namespaceAssetPath(brandId: string): string {
  return `@/assets/blog/${brandId}/`;
}

function rewriteImagePaths(filePath: string, brandId: string): string {
  const namespaced = namespaceAssetPath(brandId);
  let content = fs.readFileSync(filePath, "utf-8");

  // Landing-page relative paths → preview alias
  content = content.replace(/(?:\.\.\/)+assets\/blog\//g, namespaced);

  // @/assets/blog/... but skip paths already namespaced for this brand
  content = content.replace(
    new RegExp(`@/assets/blog/(?!${brandId}/)`, "g"),
    namespaced
  );

  // Fix accidental double brand prefix from older sync runs
  content = content.replaceAll(`${brandId}/${brandId}/`, `${brandId}/`);

  content = repairRelatedPostsFrontmatter(content);

  // Unquoted @/ paths break YAML frontmatter
  content = content.replace(
    /^image:\s+(@\/assets\/blog\/[^\n]+)$/m,
    'image: "$1"'
  );

  fs.writeFileSync(filePath, content, "utf-8");
  return content;
}

function assetRefToFsPath(ref: string, brandId: string): string | null {
  const prefix = `@/assets/blog/${brandId}/`;
  if (!ref.startsWith(prefix)) return null;
  const rel = ref.slice(prefix.length);
  return path.join(ASSETS_DEST, brandId, rel);
}

function collectAssetRefs(content: string): string[] {
  const refs = new Set<string>();
  for (const m of content.matchAll(/@\/assets\/blog\/[^'"\s)]+/g)) {
    refs.add(m[0]);
  }
  return [...refs];
}

/** Fixes a common invalid relatedPosts block that breaks YAML parsers in preview. */
function repairRelatedPostsFrontmatter(content: string): string {
  return content.replace(
    /relatedPosts:\r?\n\s+\[([\s\S]*?)\]\r?\n/g,
    (_match, inner: string) => {
      const items = [...inner.matchAll(/"([^"]+)"/g)].map((m) => `"${m[1]}"`);
      if (items.length === 0) return _match;
      return `relatedPosts: [${items.join(", ")}]\n`;
    }
  );
}

function skipPostWhenImagesMissing(filePath: string, brandId: string, content: string): void {
  const missing = collectAssetRefs(content).filter((ref) => {
    const fsPath = assetRefToFsPath(ref, brandId);
    return !fsPath || !fs.existsSync(fsPath);
  });

  if (missing.length === 0) return;

  fs.unlinkSync(filePath);
  console.warn(
    `[sync] ${path.basename(filePath)}: missing ${missing.length} image(s); omitted from preview`
  );
}

// Clean previous sync
if (fs.existsSync(CONTENT_DEST)) {
  fs.rmSync(CONTENT_DEST, { recursive: true });
}
if (fs.existsSync(ASSETS_DEST)) {
  fs.rmSync(ASSETS_DEST, { recursive: true });
}
fs.mkdirSync(CONTENT_DEST, { recursive: true });
fs.mkdirSync(ASSETS_DEST, { recursive: true });

// Discover brands
const brandDirs = fs
  .readdirSync(BRANDS_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("."));

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function brandHasBinaryImages(brandPath: string): boolean {
  const imagesSrc = path.join(brandPath, "images");
  if (!fs.existsSync(imagesSrc)) return false;

  const stack = [imagesSrc];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) return true;
    }
  }
  return false;
}

let totalContent = 0;
let totalImages = 0;

for (const brandDir of brandDirs) {
  const brandId = brandDir.name;
  const brandPath = path.join(BRANDS_ROOT, brandId);

  if (!brandHasBinaryImages(brandPath)) {
    console.warn(`[sync] Skipping ${brandId}: no binary images under brands/${brandId}/images`);
    continue;
  }

  // Copy images first so missing-image checks see synced assets
  const imagesSrc = path.join(brandPath, "images");
  if (fs.existsSync(imagesSrc)) {
    const imagesDest = path.join(ASSETS_DEST, brandId);
    totalImages += copyDirRecursive(imagesSrc, imagesDest);
  }

  // Copy language folders (skip 'images')
  const entries = fs
    .readdirSync(brandPath, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "images");

  for (const langDir of entries) {
    const langSrc = path.join(brandPath, langDir.name);
    const langDest = path.join(CONTENT_DEST, brandId, langDir.name);
    const count = copyDirRecursive(langSrc, langDest);
    totalContent += count;

    // Rewrite image paths in copied MDX files
    if (fs.existsSync(langDest)) {
      for (const file of fs.readdirSync(langDest)) {
        if (file.endsWith(".mdx") || file.endsWith(".md")) {
          const destFile = path.join(langDest, file);
          const rewritten = rewriteImagePaths(destFile, brandId);
          skipPostWhenImagesMissing(destFile, brandId, rewritten);
        }
      }
    }
  }
}

console.log(
  `Synced ${totalContent} content files and ${totalImages} images from ${brandDirs.length} brands`
);
