/**
 * fetch-blog.ts
 *
 * Pre-build script for landing pages. Fetches blog content from the
 * blog-factory GitHub repo for this brand using git sparse-checkout.
 *
 * Reads BLOG_BRAND env var to determine which brand's content to fetch.
 * Places MDX files in src/content/blog/{lang}/ and images in src/assets/blog/.
 *
 * Usage: npx tsx scripts/fetch-blog.ts
 *
 * Required env vars:
 *   BLOG_BRAND    - Brand ID (e.g., "aurum", "do-for-me")
 *   GITHUB_TOKEN  - Token with read access to blog-factory repo (optional for public repos)
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const BLOG_FACTORY_REPO = "aurum-avis-labs/blog-factory";
const BRAND = process.env.BLOG_BRAND;
const TOKEN = process.env.GITHUB_TOKEN || process.env.BLOG_FACTORY_TOKEN;

if (!BRAND) {
  console.log("BLOG_BRAND not set, skipping blog content fetch.");
  process.exit(0);
}

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content", "blog");
const ASSETS_DIR = path.join(ROOT, "src", "assets", "blog");
const TEMP_DIR = path.join(ROOT, ".blog-factory-tmp");

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

function cleanup() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }
}

console.log(`Fetching blog content for brand: ${BRAND}`);

// Clean up from any previous run
cleanup();

// Build clone URL
const repoUrl = TOKEN
  ? `https://x-access-token:${TOKEN}@github.com/${BLOG_FACTORY_REPO}.git`
  : `https://github.com/${BLOG_FACTORY_REPO}.git`;

try {
  // Sparse checkout: only fetch the brand's directory
  execSync(
    `git clone --depth 1 --filter=blob:none --sparse "${repoUrl}" "${TEMP_DIR}"`,
    { stdio: "pipe" }
  );
  execSync(`git -C "${TEMP_DIR}" sparse-checkout set "brands/${BRAND}"`, {
    stdio: "pipe",
  });
} catch (err) {
  console.error(`Failed to clone blog-factory. Is the repo accessible?`);
  console.error(`Repo: ${BLOG_FACTORY_REPO}, Brand: ${BRAND}`);
  cleanup();
  // Don't fail the build — just skip blog content
  process.exit(0);
}

const brandDir = path.join(TEMP_DIR, "brands", BRAND);

if (!fs.existsSync(brandDir)) {
  console.log(`No content found for brand "${BRAND}" in blog-factory.`);
  cleanup();
  process.exit(0);
}

// Clear existing content (if any)
if (fs.existsSync(CONTENT_DIR)) {
  fs.rmSync(CONTENT_DIR, { recursive: true });
}
fs.mkdirSync(CONTENT_DIR, { recursive: true });

// Copy language directories
let contentCount = 0;
for (const entry of fs.readdirSync(brandDir, { withFileTypes: true })) {
  if (entry.isDirectory() && entry.name !== "images") {
    const langSrc = path.join(brandDir, entry.name);
    const langDest = path.join(CONTENT_DIR, entry.name);
    contentCount += copyDirRecursive(langSrc, langDest);
  }
}

// Copy images
let imageCount = 0;
const imagesSrc = path.join(brandDir, "images");
if (fs.existsSync(imagesSrc)) {
  if (fs.existsSync(ASSETS_DIR)) {
    fs.rmSync(ASSETS_DIR, { recursive: true });
  }
  imageCount = copyDirRecursive(imagesSrc, ASSETS_DIR);
}

cleanup();
console.log(
  `Fetched ${contentCount} content files and ${imageCount} images for "${BRAND}".`
);
