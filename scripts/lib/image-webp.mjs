/**
 * Shared WebP conversion and reference helpers for blog-factory content.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

export const RASTER_EXT = /\.(png|jpe?g)$/i;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const CONTENT_ROOT = path.resolve(__dirname, "../..", "brands");

/** @param {string} basename */
export function maxWidthForBasename(basename) {
  const lower = basename.toLowerCase();
  if (
    lower.startsWith("hero.") ||
    lower.startsWith("inline1.") ||
    /^img1\./.test(lower)
  ) {
    return 1200;
  }
  return 1600;
}

/**
 * @param {string} srcPath
 * @param {string} destPath
 * @param {{ quality?: number, maxWidth?: number }} [opts]
 */
export async function convertFileToWebp(srcPath, destPath, opts = {}) {
  const quality = opts.quality ?? 80;
  const base = path.basename(srcPath);
  const maxWidth = opts.maxWidth ?? maxWidthForBasename(base);

  const pipeline = sharp(srcPath).rotate();
  const meta = await pipeline.metadata();
  let w = meta.width ?? maxWidth;
  if (w > maxWidth) {
    await pipeline
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(destPath);
  } else {
    await sharp(srcPath)
      .rotate()
      .webp({ quality, effort: 4 })
      .toFile(destPath);
  }

  await sharp(destPath).metadata();
}

/**
 * @param {string} dir
 * @returns {Generator<string>}
 */
export function* walkRasterFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkRasterFiles(full);
    } else if (RASTER_EXT.test(entry.name)) {
      yield full;
    }
  }
}

const TEXT_EXT = new Set([".mdx", ".md", ".json", ".ts", ".tsx", ".yaml", ".yml"]);

/**
 * @param {string} dir
 * @returns {Generator<string>}
 */
export function* walkTextFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkTextFiles(full);
    } else if (TEXT_EXT.has(path.extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

/** @param {string} relPath e.g. hero.jpg */
export function webpBasename(relPath) {
  return relPath.replace(RASTER_EXT, ".webp");
}

/**
 * Rewrite .png/.jpg/.jpeg path segments in file contents (case-insensitive ext).
 * @param {string} content
 */
export function rewriteRasterRefsToWebp(content) {
  return content.replace(
    /([^\s"'`]+?)\.(png|jpe?g)(?=\b|["'`\s)/?#])/gi,
    (_, stem, ext) => `${stem}.webp`
  );
}

/**
 * @param {string} content
 * @returns {string[]}
 */
export function findRasterReferences(content) {
  const hits = new Set();
  const re =
    /(?:@\/assets\/blog\/[^\s"'`]+|brands\/[^\s"'`]+|(?:\.\/)?[\w./-]+)\.(png|jpe?g)\b/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    hits.add(m[0]);
  }
  const remote =
    /https?:\/\/[^\s"'`)]+?\.(png|jpe?g)(?:\?[^\s"'`)]*)?/gi;
  while ((m = remote.exec(content)) !== null) {
    hits.add(m[0]);
  }
  return [...hits];
}
