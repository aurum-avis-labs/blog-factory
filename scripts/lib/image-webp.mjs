/**
 * Shared WebP conversion and reference helpers for blog-factory content.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  // Lazy import: check:images must run without loading sharp.
  const { default: sharp } = await import("sharp");
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

/*
 * A raster reference is either
 *   - a path containing "/" (e.g. @/assets/blog/x/hero.jpg, ../../../assets/…, https://…/a.png), or
 *   - a whole quoted string / unquoted YAML value that is a bare filename ("img1.png", image: hero.jpg).
 * Bare filenames inside prose or inline code (e.g. `final_v3.png`) are example text, not image
 * references, and are neither flagged nor rewritten.
 */
const PATH_REF = /[^\s"'`()<>\[\]{}|,;]*\/[^\s"'`()<>\[\]{}|,;]*?\.(png|jpe?g)(?![\w-])/gi;
const QUOTED_NAME_REF = /(["'])([^"'\s\/`]+)\.(png|jpe?g)\1/gi;
const YAML_NAME_REF = /^(\s*[\w-]+:\s+)([^\s"'\/`#]+)\.(png|jpe?g)\s*$/gim;

/**
 * Rewrite .png/.jpg/.jpeg image references to .webp (case-insensitive ext).
 * @param {string} content
 */
export function rewriteRasterRefsToWebp(content) {
  return content
    .replace(PATH_REF, (m) => (/^https?:\/\//i.test(m) ? m : m.replace(/\.(png|jpe?g)$/i, ".webp")))
    .replace(QUOTED_NAME_REF, (_, q, stem) => `${q}${stem}.webp${q}`)
    .replace(YAML_NAME_REF, (_, key, stem) => `${key}${stem}.webp`);
}

/**
 * @param {string} content
 * @returns {string[]}
 */
export function findRasterReferences(content) {
  const hits = new Set();
  for (const re of [PATH_REF, QUOTED_NAME_REF, YAML_NAME_REF]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      hits.add(m[0].trim());
    }
  }
  return [...hits];
}
