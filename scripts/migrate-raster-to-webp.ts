/**
 * One-shot migration: convert brands/ raster images to WebP and update references.
 */

import fs from "node:fs";
import path from "node:path";
import { convertRasterFile, isRasterExtension } from "./lib/raster-to-webp.ts";

const REPO = path.resolve(import.meta.dirname, "..");
const BRANDS = path.join(REPO, "brands");

const REF_DIRS = [
  BRANDS,
  path.join(REPO, "scripts"),
  path.join(REPO, "tool"),
  path.join(REPO, "preview"),
  path.join(REPO, "templates"),
  path.join(REPO, ".cursor", "skills", "seo-blog"),
  path.join(REPO, ".claude", "skills", "seo-blog"),
];

const REF_FILES = [
  path.join(REPO, "AGENTS.md"),
  path.join(REPO, "CLAUDE.md"),
  path.join(REPO, "README.md"),
  path.join(REPO, "writing-instructions.md"),
  path.join(REPO, "TOOL_INSTRUCTIONS.md"),
];

const TEXT_EXT = new Set([
  ".mdx",
  ".md",
  ".json",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".py",
  ".yml",
  ".yaml",
]);

function walk(dir: string, onFile: (file: string) => void): void {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
}

function replaceRasterRefs(content: string): string {
  let out = content;
  out = out.replace(
    /(@\/assets\/blog\/[^"'`\s)]+)\.(png|jpe?g)\b/gi,
    "$1.webp",
  );
  out = out.replace(
    /(brands\/[^"'`\s)]+\/images\/[^"'`\s)]+)\.(png|jpe?g)\b/gi,
    "$1.webp",
  );
  out = out.replace(/"filename":\s*"([^"]+)\.(png|jpe?g)"/gi, '"filename": "$1.webp"');
  out = out.replace(/"name":\s*"([^"]+)\.(png|jpe?g)"/gi, '"name": "$1.webp"');
  out = out.replace(/hero\.jpg\b/g, "hero.webp");
  out = out.replace(/inline1\.jpg\b/g, "inline1.webp");
  out = out.replace(/inline2\.jpg\b/g, "inline2.webp");
  out = out.replace(/img(\d+)\.png\b/g, "img$1.webp");
  out = out.replace(/img(\d+)\.jpg\b/g, "img$1.webp");
  return out;
}

async function main(): Promise<void> {
  const rasterFiles: string[] = [];
  walk(BRANDS, (file) => {
    if (isRasterExtension(path.extname(file))) {
      if (path.basename(file).startsWith(".")) return;
      rasterFiles.push(file);
    }
  });

  rasterFiles.sort();
  let beforeBytes = 0;
  for (const f of rasterFiles) beforeBytes += fs.statSync(f).size;

  console.log(`Converting ${rasterFiles.length} raster files…`);
  let converted = 0;
  let afterBytes = 0;
  for (const file of rasterFiles) {
    const { outputPath, bytes } = await convertRasterFile(file, { deleteOriginal: true });
    afterBytes += bytes;
    converted++;
    if (converted % 50 === 0) console.log(`  …${converted}/${rasterFiles.length}`);
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Missing output: ${outputPath}`);
    }
  }

  const perBrand: Record<string, number> = {};
  for (const file of rasterFiles) {
    const rel = path.relative(BRANDS, file);
    const brand = rel.split(path.sep)[0] ?? "unknown";
    perBrand[brand] = (perBrand[brand] ?? 0) + 1;
  }

  let refFilesUpdated = 0;
  const updatedPaths: string[] = [];

  const touch = (file: string) => {
    if (!fs.existsSync(file)) return;
    const ext = path.extname(file).toLowerCase();
    if (!TEXT_EXT.has(ext) && !file.endsWith(".md")) return;
    const before = fs.readFileSync(file, "utf-8");
    const after = replaceRasterRefs(before);
    if (after !== before) {
      fs.writeFileSync(file, after, "utf-8");
      refFilesUpdated++;
      updatedPaths.push(path.relative(REPO, file));
    }
  };

  for (const dir of REF_DIRS) walk(dir, touch);
  for (const file of REF_FILES) touch(file);

  const summary = {
    converted,
    beforeMB: (beforeBytes / (1024 * 1024)).toFixed(1),
    afterMB: (afterBytes / (1024 * 1024)).toFixed(1),
    perBrand,
    refFilesUpdated,
  };
  fs.writeFileSync(
    path.join(REPO, "scripts", ".webp-migration-summary.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
