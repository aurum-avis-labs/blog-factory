/**
 * Convert one or more PNG/JPG files to WebP (max width 1600px, q~80).
 *
 * Usage:
 *   npm run images:webp -- brands/vemoir/images/foo/hero.webp
 *   npm run images:webp -- path/a.png path/b.jpg
 */

import fs from "node:fs";
import path from "node:path";
import {
  convertRasterFile,
  isRasterExtension,
  WARN_WEBP_BYTES,
} from "./lib/raster-to-webp.ts";

const args = process.argv.slice(2).filter((a) => a !== "--");

if (args.length === 0) {
  console.error("Usage: npm run images:webp -- <image-path> [more paths…]");
  process.exit(1);
}

let failed = 0;

for (const arg of args) {
  const inputPath = path.resolve(arg);
  if (!fs.existsSync(inputPath)) {
    console.error(`Missing file: ${inputPath}`);
    failed++;
    continue;
  }
  const ext = path.extname(inputPath);
  if (!isRasterExtension(ext)) {
    console.error(`Skip (not PNG/JPG): ${inputPath}`);
    failed++;
    continue;
  }

  try {
    const { outputPath, width, height, bytes } = await convertRasterFile(inputPath, {
      deleteOriginal: true,
    });
    const kb = (bytes / 1024).toFixed(1);
    console.log(`✓ ${path.relative(process.cwd(), outputPath)} (${width}×${height}, ${kb} KB)`);
    if (bytes > WARN_WEBP_BYTES) {
      console.warn(
        `  warn: ${path.basename(outputPath)} is ${kb} KB (> ${WARN_WEBP_BYTES / 1024} KB); consider re-exporting`,
      );
    }
  } catch (err) {
    console.error(`✗ ${inputPath}: ${err instanceof Error ? err.message : err}`);
    failed++;
  }
}

process.exit(failed > 0 ? 1 : 0);
