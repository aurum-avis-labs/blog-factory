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

function rewriteImagePaths(filePath: string, brandId: string): void {
  const content = fs.readFileSync(filePath, "utf-8");
  // Rewrite @/assets/blog/ to @/assets/blog/{brand}/ (only if not already prefixed)
  const rewritten = content.replace(
    /@\/assets\/blog\//g,
    `@/assets/blog/${brandId}/`
  );
  if (rewritten !== content) {
    fs.writeFileSync(filePath, rewritten, "utf-8");
  }
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

let totalContent = 0;
let totalImages = 0;

for (const brandDir of brandDirs) {
  const brandId = brandDir.name;
  const brandPath = path.join(BRANDS_ROOT, brandId);

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
          rewriteImagePaths(path.join(langDest, file), brandId);
        }
      }
    }
  }

  // Copy images namespaced by brand
  const imagesSrc = path.join(brandPath, "images");
  if (fs.existsSync(imagesSrc)) {
    const imagesDest = path.join(ASSETS_DEST, brandId);
    const count = copyDirRecursive(imagesSrc, imagesDest);
    totalImages += count;
  }
}

console.log(
  `Synced ${totalContent} content files and ${totalImages} images from ${brandDirs.length} brands`
);
