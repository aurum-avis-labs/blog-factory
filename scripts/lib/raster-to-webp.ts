import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export const WEBP_QUALITY = 80;
export const MAX_WIDTH = 1600;
export const WARN_WEBP_BYTES = 400 * 1024;

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);

export function isRasterExtension(ext: string): boolean {
  return RASTER_EXT.has(ext.toLowerCase());
}

export function webpPathFor(inputPath: string): string {
  return inputPath.replace(/\.(png|jpe?g)$/i, ".webp");
}

export async function convertRasterFile(
  inputPath: string,
  options: { deleteOriginal?: boolean; maxWidth?: number; quality?: number } = {},
): Promise<{ outputPath: string; width: number; height: number; bytes: number }> {
  const deleteOriginal = options.deleteOriginal ?? false;
  const maxWidth = options.maxWidth ?? MAX_WIDTH;
  const quality = options.quality ?? WEBP_QUALITY;

  const ext = path.extname(inputPath).toLowerCase();
  if (!isRasterExtension(ext)) {
    throw new Error(`Not a raster image: ${inputPath}`);
  }

  const outputPath = webpPathFor(inputPath);
  const image = sharp(inputPath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const resizeWidth =
    meta.width && meta.width > maxWidth ? maxWidth : undefined;

  await image
    .resize(resizeWidth, undefined, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);

  if (deleteOriginal) {
    fs.unlinkSync(inputPath);
  }

  const outMeta = await sharp(outputPath).metadata();
  const bytes = fs.statSync(outputPath).size;
  return {
    outputPath,
    width: outMeta.width ?? 0,
    height: outMeta.height ?? 0,
    bytes,
  };
}

/** Encode an in-memory PNG/JPEG buffer as WebP on disk. */
export async function writeBufferAsWebp(
  input: Buffer,
  outputPath: string,
  options: { maxWidth?: number; quality?: number } = {},
): Promise<number> {
  const maxWidth = options.maxWidth ?? MAX_WIDTH;
  const quality = options.quality ?? WEBP_QUALITY;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const image = sharp(input, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const resizeWidth =
    meta.width && meta.width > maxWidth ? maxWidth : undefined;
  await image
    .resize(resizeWidth, undefined, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);
  return fs.statSync(outputPath).size;
}
