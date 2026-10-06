/**
 * Fail if blog content references or contains non-WebP raster images.
 *
 * Usage: npm run check:images
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REPO = path.resolve(import.meta.dirname, "..");
const BRANDS = path.join(REPO, "brands");
const WARN_WEBP_BYTES = 400 * 1024;

const RASTER_IN_PATH =
  /(?:@\/assets\/blog\/|\.\.\/assets\/blog\/|brands\/[^/\s"']+\/images\/)[^"'`\s)]+\.(png|jpe?g)\b/gi;

const TEXT_EXT = new Set([
  ".mdx",
  ".md",
  ".json",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".yml",
  ".yaml",
]);

const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string, onFile: (file: string) => void): void {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
}

function isContentTextFile(file: string): boolean {
  if (!file.startsWith(BRANDS)) return false;
  const rel = path.relative(BRANDS, file);
  if (rel.startsWith("..")) return false;
  const ext = path.extname(file).toLowerCase();
  return TEXT_EXT.has(ext);
}

function scanTextFile(file: string): void {
  const text = fs.readFileSync(file, "utf-8");
  const rel = path.relative(REPO, file);

  for (const match of text.matchAll(RASTER_IN_PATH)) {
    errors.push(`${rel}: references raster image path "${match[0]}"`);
  }

  for (const match of text.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^https?:\/\//i.test(target)) continue;
    if (/\.(png|jpe?g)(\?|#|$)/i.test(target)) {
      errors.push(`${rel}: markdown image uses raster "${target}"`);
    }
  }

  for (const line of text.split("\n")) {
    const fm = line.match(/^\s*(?:image|cover|heroImage):\s*["']?([^"'\n]+)["']?\s*$/i);
    if (!fm) continue;
    const value = fm[1];
    if (/^https?:\/\//i.test(value)) continue;
    if (/\.(png|jpe?g)(\?|#|$)/i.test(value)) {
      errors.push(`${rel}: frontmatter references raster "${value}"`);
    }
  }

  for (const match of text.matchAll(/from\s+['"]([^'"]+\.(png|jpe?g))['"]/gi)) {
    errors.push(`${rel}: import references raster "${match[1]}"`);
  }
}

function scanImageTree(): void {
  walk(BRANDS, (file) => {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".webp") {
      const size = fs.statSync(file).size;
      if (size > WARN_WEBP_BYTES) {
        warnings.push(
          `${path.relative(REPO, file)}: ${(size / 1024).toFixed(1)} KB (>${WARN_WEBP_BYTES / 1024} KB)`,
        );
      }
      return;
    }
    if ([".png", ".jpg", ".jpeg"].includes(ext)) {
      const base = path.basename(file);
      if (base.startsWith(".")) return;
      errors.push(`${path.relative(REPO, file)}: raster file must be converted to WebP`);
    }
  });
}

export function runCheckImages(): number {
  errors.length = 0;
  warnings.length = 0;

  walk(BRANDS, (file) => {
    if (isContentTextFile(file)) scanTextFile(file);
  });
  scanImageTree();

  if (warnings.length) {
    console.warn("Large WebP files (optional warning):");
    for (const w of warnings) console.warn(`  ${w}`);
  }

  if (errors.length) {
    console.error("Image policy violations (WebP only in blog content):");
    for (const e of errors) console.error(`  ${e}`);
    return 1;
  }

  console.log("check:images ok");
  return 0;
}

function invokedDirectly(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

if (invokedDirectly()) {
  process.exit(runCheckImages());
}
