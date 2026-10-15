#!/usr/bin/env node
/**
 * Convert PNG/JPG/JPEG under brands/ to WebP, rewrite references, remove originals.
 *
 * Usage: node scripts/images-to-webp.mjs [--dry-run] [--path brands/foo]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CONTENT_ROOT,
  convertFileToWebp,
  rewriteRasterRefsToWebp,
  walkRasterFiles,
  walkTextFiles,
  webpBasename,
} from "./lib/image-webp.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const pathArg = args.find((a) => a.startsWith("--path="))?.split("=")[1];
const root = pathArg ? path.resolve(REPO, pathArg) : CONTENT_ROOT;

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${root}`);
  process.exit(1);
}

const brandsRoot = root.startsWith(CONTENT_ROOT) ? CONTENT_ROOT : root;

/** @type {{ converted: number, skipped: number, bytesBefore: number, bytesAfter: number, errors: string[] }} */
const stats = {
  converted: 0,
  skipped: 0,
  bytesBefore: 0,
  bytesAfter: 0,
  errors: [],
};

const rasterFiles = [...walkRasterFiles(root)];
console.log(`Found ${rasterFiles.length} raster file(s) under ${path.relative(REPO, root)}`);

for (const src of rasterFiles) {
  const dest = path.join(path.dirname(src), webpBasename(path.basename(src)));
  if (fs.existsSync(dest)) {
    stats.skipped++;
    continue;
  }
  const before = fs.statSync(src).size;
  stats.bytesBefore += before;
  if (dryRun) {
    console.log(`[dry-run] ${path.relative(REPO, src)} → ${path.basename(dest)}`);
    stats.converted++;
    continue;
  }
  try {
    await convertFileToWebp(src, dest);
    const after = fs.statSync(dest).size;
    stats.bytesAfter += after;
    fs.unlinkSync(src);
    stats.converted++;
    if (stats.converted % 50 === 0) {
      console.log(`  … ${stats.converted} converted`);
    }
  } catch (e) {
    stats.errors.push(`${src}: ${e.message || e}`);
  }
}

const rewriteRoot = brandsRoot;
let filesUpdated = 0;
for (const file of walkTextFiles(rewriteRoot)) {
  const original = fs.readFileSync(file, "utf8");
  const updated = rewriteRasterRefsToWebp(original);
  if (updated !== original) {
    filesUpdated++;
    if (!dryRun) fs.writeFileSync(file, updated, "utf8");
  }
}

console.log("\n--- Summary ---");
console.log(`Converted: ${stats.converted}, skipped (webp exists): ${stats.skipped}`);
console.log(
  `Size before: ${(stats.bytesBefore / 1024 / 1024).toFixed(2)} MiB` +
    (stats.bytesAfter
      ? `, after: ${(stats.bytesAfter / 1024 / 1024).toFixed(2)} MiB`
      : "")
);
console.log(`Reference files updated: ${filesUpdated}`);
if (stats.errors.length) {
  console.error("Errors:");
  for (const err of stats.errors) console.error(" ", err);
  process.exit(1);
}
