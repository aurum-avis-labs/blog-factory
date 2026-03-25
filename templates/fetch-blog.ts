/**
 * fetch-blog.ts
 *
 * Pre-build script for landing pages. Fetches blog content from the
 * blog-factory GitHub repo for this brand using git sparse-checkout.
 *
 * Brand ID is derived automatically from the repo name by stripping
 * everything from "-landing" onward (e.g., "do-for-me-landingpage" → "do-for-me").
 * Can be overridden with BLOG_BRAND env var.
 *
 * Places MDX files in src/content/blog/{lang}/ and images in src/assets/blog/.
 *
 * Usage: npx tsx scripts/fetch-blog.ts
 *
 * Optional env vars:
 *   BLOG_BRAND    - Override auto-detected brand ID
 *   GITHUB_TOKEN  - Token with read access to blog-factory repo (optional for public repos)
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const BLOG_FACTORY_REPO = "aurum-avis-labs/blog-factory";
const TOKEN = process.env.GITHUB_TOKEN || process.env.BLOG_FACTORY_TOKEN;

function detectBrand(): string | null {
  // 1. Explicit env var
  if (process.env.BLOG_BRAND) return process.env.BLOG_BRAND;

  // 2. Derive from git remote origin URL
  try {
    const remote = execSync("git remote get-url origin", { encoding: "utf-8" }).trim();
    // Extract repo name from URL (handles both HTTPS and SSH)
    const repoName = remote.replace(/\.git$/, "").split("/").pop();
    if (repoName) {
      const brand = repoName.replace(/-landing.*$/, "");
      if (brand && brand !== repoName) return brand;
    }
  } catch {}

  // 3. Derive from directory name
  const dirName = path.basename(process.cwd());
  const brand = dirName.replace(/-landing.*$/, "");
  if (brand && brand !== dirName) return brand;

  return null;
}

const BRAND = detectBrand();

if (!BRAND) {
  console.log("Could not detect brand. Set BLOG_BRAND env var or ensure repo name contains '-landing'.");
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
