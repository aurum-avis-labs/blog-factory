#!/usr/bin/env node
/**
 * Fail if blog content references or contains non-WebP raster images.
 *
 * Scans brands/ only (posts, images, sources.json). Remote raster URLs in
 * frontmatter or MDX must be replaced with local WebP under brands/{brand}/images/.
 *
 * Usage: node scripts/check-webp-only.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CONTENT_ROOT,
  RASTER_EXT,
  findRasterReferences,
  walkRasterFiles,
  walkTextFiles,
} from "./lib/image-webp.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");

/** @type {string[]} */
const problems = [];

for (const file of walkRasterFiles(CONTENT_ROOT)) {
  problems.push(`Raster file on disk: ${path.relative(REPO, file)}`);
}

for (const file of walkTextFiles(CONTENT_ROOT)) {
  const text = fs.readFileSync(file, "utf8");
  for (const ref of findRasterReferences(text)) {
    if (ref.includes("unsplash.com/photos") || ref.includes("unsplash.com/de/fotos")) {
      continue;
    }
    problems.push(
      `Non-WebP reference in ${path.relative(REPO, file)}: ${ref.slice(0, 120)}`
    );
  }
}

if (problems.length) {
  console.error(`check:images failed (${problems.length} issue(s)):\n`);
  for (const p of problems.slice(0, 80)) {
    console.error(`  • ${p}`);
  }
  if (problems.length > 80) {
    console.error(`  … and ${problems.length - 80} more`);
  }
  console.error(
    "\nFix: run `npm run images:webp` for local PNG/JPG, or store heroes as WebP under brands/{brand}/images/."
  );
  process.exit(1);
}

console.log("check:images ok (brands/ is WebP-only)");
