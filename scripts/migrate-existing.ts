/**
 * migrate-existing.ts
 *
 * One-time migration script that copies existing blog content from landing page
 * repos into the blog-factory brands/ directory structure.
 *
 * Usage: npx tsx scripts/migrate-existing.ts [--brand=<brand-id>]
 *   Without --brand: migrates all brands that have existing content
 *   With --brand: migrates only the specified brand
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CODING_DIR = path.resolve(ROOT, "..");

interface MigrationSource {
  brandId: string;
  /** Absolute path to the landing page repo root */
  repoPath: string;
  /** Relative path from repo root to blog content */
  contentPath: string;
  /** Relative path from repo root to blog images (if any) */
  imagesPath: string;
}

const sources: MigrationSource[] = [
  {
    brandId: "aurum",
    repoPath: path.join(CODING_DIR, "aurum-landingpage"),
    contentPath: "src/content/blog",
    imagesPath: "src/assets/blog",
  },
  {
    brandId: "do-for-me",
    repoPath: path.join(CODING_DIR, "do-for-me-landingpage"),
    contentPath: "src/content/blog",
    imagesPath: "src/assets/blog",
  },
  {
    brandId: "gold-crew",
    repoPath: path.join(CODING_DIR, "gold-crew-landing-page"),
    contentPath: "src/content/blog",
    imagesPath: "src/assets/blog",
  },
];

function copyDirRecursive(src: string, dest: string): number {
  let count = 0;
  if (!fs.existsSync(src)) return count;

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    // Skip .DS_Store and other dotfiles
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

function migrateBrand(source: MigrationSource): void {
  const { brandId, repoPath, contentPath, imagesPath } = source;
  const brandDir = path.join(ROOT, "brands", brandId);

  console.log(`\n--- Migrating: ${brandId} ---`);

  if (!fs.existsSync(repoPath)) {
    console.log(`  SKIP: repo not found at ${repoPath}`);
    return;
  }

  // Migrate blog content (MDX files organized by language)
  const contentSrc = path.join(repoPath, contentPath);
  if (fs.existsSync(contentSrc)) {
    const langs = fs
      .readdirSync(contentSrc, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const lang of langs) {
      const langSrc = path.join(contentSrc, lang);
      const langDest = path.join(brandDir, lang);
      const count = copyDirRecursive(langSrc, langDest);
      console.log(`  Content: ${lang}/ — ${count} files`);
    }
  } else {
    console.log(`  No content found at ${contentSrc}`);
  }

  // Migrate images
  const imagesSrc = path.join(repoPath, imagesPath);
  if (fs.existsSync(imagesSrc)) {
    const imagesDest = path.join(brandDir, "images");
    const count = copyDirRecursive(imagesSrc, imagesDest);
    if (count > 0) {
      console.log(`  Images: ${count} files`);
    } else {
      console.log(`  Images: directory exists but empty`);
    }
  } else {
    console.log(`  No images directory`);
  }
}

// Parse CLI args
const brandArg = process.argv
  .find((a) => a.startsWith("--brand="))
  ?.split("=")[1];

const toMigrate = brandArg
  ? sources.filter((s) => s.brandId === brandArg)
  : sources;

if (toMigrate.length === 0) {
  console.error(`Unknown brand: ${brandArg}`);
  console.error(`Available: ${sources.map((s) => s.brandId).join(", ")}`);
  process.exit(1);
}

console.log(`Migrating ${toMigrate.length} brand(s) to ${ROOT}/brands/`);

for (const source of toMigrate) {
  migrateBrand(source);
}

console.log("\nDone. Review the brands/ directory and commit when ready.");
