/**
 * capture-pr-screenshots.ts
 *
 * Builds screenshot evidence for PR review: hero + inline blog images rendered
 * in the preview Astro site (not live landing pages).
 *
 * Usage (preview server must be running, or pass --serve to start astro preview):
 *   npm run capture:pr -- --serve
 *   npm run capture:pr -- --url http://127.0.0.1:4321
 *
 * Env:
 *   PR_PREVIEW_BASE_REF — git ref to diff against (default: origin/main)
 *   PR_PREVIEW_POSTS — comma-separated "brand/slug" to capture (overrides git diff)
 */

import { execSync, spawn, type ChildProcess } from "child_process";
import fs from "fs";
import path from "path";
import { chromium, type Browser, type Page } from "playwright";
import { brands, type BrandConfig } from "../../brands.config.ts";

const PREVIEW_ROOT = path.resolve(import.meta.dirname, "..");
const REPO_ROOT = path.resolve(PREVIEW_ROOT, "..");
const OUTPUT_DIR = path.join(PREVIEW_ROOT, ".pr-screenshots");
const DEFAULT_PORT = 4321;

interface PostTarget {
  brandId: string;
  lang: string;
  slug: string;
  urlPath: string;
}

function parseArgs(): { baseUrl: string | null; serve: boolean; baseRef: string } {
  const argv = process.argv.slice(2);
  let baseUrl: string | null = null;
  let serve = false;
  let baseRef = process.env.PR_PREVIEW_BASE_REF || "origin/main";

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--url" && argv[i + 1]) {
      baseUrl = argv[++i].replace(/\/$/, "");
    } else if (argv[i] === "--serve") {
      serve = true;
    } else if (argv[i] === "--base-ref" && argv[i + 1]) {
      baseRef = argv[++i];
    }
  }
  return { baseUrl, serve, baseRef };
}

function gitDiffPosts(baseRef: string): PostTarget[] {
  execSync("git fetch origin main --quiet", { cwd: REPO_ROOT, stdio: "pipe" });
  let diffOutput = "";
  try {
    diffOutput = execSync(`git diff --name-only ${baseRef}...HEAD -- brands/`, {
      cwd: REPO_ROOT,
      encoding: "utf-8",
    });
  } catch {
    diffOutput = execSync(`git diff --name-only ${baseRef} HEAD -- brands/`, {
      cwd: REPO_ROOT,
      encoding: "utf-8",
    });
  }

  const brandMap = new Map(brands.map((b) => [b.id, b]));
  const targets: PostTarget[] = [];

  for (const line of diffOutput.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const match = line.match(/^brands\/([^/]+)\/([^/]+)\/(.+)\.mdx$/);
    if (!match) continue;
    const [, brandId, lang, slug] = match;
    const brand = brandMap.get(brandId);
    if (!brand) continue;
    targets.push({
      brandId,
      lang,
      slug,
      urlPath: postUrlPath(brand, lang, slug),
    });
  }

  return dedupePosts(targets);
}

function postsFromEnv(): PostTarget[] | null {
  const raw = process.env.PR_PREVIEW_POSTS;
  if (!raw) return null;
  const brandMap = new Map(brands.map((b) => [b.id, b]));
  const targets: PostTarget[] = [];
  for (const entry of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
    const [brandId, slug] = entry.split("/");
    const brand = brandMap.get(brandId);
    if (!brand || !slug) continue;
    const lang = brand.defaultLanguage;
    targets.push({
      brandId,
      lang,
      slug,
      urlPath: postUrlPath(brand, lang, slug),
    });
  }
  return targets.length ? targets : null;
}

function postUrlPath(brand: BrandConfig, lang: string, slug: string): string {
  if (lang === brand.defaultLanguage) {
    return `/${brand.id}/blog/${slug}`;
  }
  return `/${brand.id}/${lang}/blog/${slug}`;
}

function dedupePosts(posts: PostTarget[]): PostTarget[] {
  const seen = new Set<string>();
  return posts.filter((p) => {
    const key = `${p.brandId}/${p.lang}/${p.slug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function waitForServer(baseUrl: string, timeoutMs = 120_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${baseUrl}/`);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview server did not respond at ${baseUrl}`);
}

function startPreviewServer(): ChildProcess {
  return spawn("npx", ["astro", "preview", "--host", "127.0.0.1", "--port", String(DEFAULT_PORT)], {
    cwd: PREVIEW_ROOT,
    stdio: "pipe",
    env: { ...process.env, NODE_ENV: "production" },
  });
}

async function assertImageLoaded(page: Page, selector: string): Promise<void> {
  const locator = page.locator(selector).first();
  await locator.scrollIntoViewIfNeeded();
  await locator.waitFor({ state: "visible", timeout: 15_000 });
  await page.waitForFunction(
    (sel) => {
      const img = document.querySelector(sel) as HTMLImageElement | null;
      return Boolean(img && img.complete && img.naturalWidth > 0);
    },
    selector,
    { timeout: 15_000 }
  );
}

async function capturePost(
  page: Page,
  baseUrl: string,
  target: PostTarget,
  outDir: string
): Promise<{ hero: string; inline?: string }> {
  const url = `${baseUrl}${target.urlPath}`;
  const prefix = `${target.brandId}-${target.slug}`;

  await page.goto(url, { waitUntil: "networkidle" });
  const title = await page.title();
  if (title.toLowerCase().includes("404") || (await page.locator("h1").textContent())?.includes("404")) {
    throw new Error(`Post not found at ${url}`);
  }

  await assertImageLoaded(page, '[data-preview="hero-image"]');
  const heroPath = path.join(outDir, `${prefix}-hero.png`);
  await page.locator("article header").screenshot({ path: heroPath });

  const inlineLocator = page.locator("article main img, article main picture img");
  const inlineCount = await inlineLocator.count();
  let inlinePath: string | undefined;
  if (inlineCount > 0) {
    inlinePath = path.join(outDir, `${prefix}-inline.png`);
    await assertImageLoaded(page, "article main img, article main picture img");
    await inlineLocator.first().screenshot({ path: inlinePath });
  }

  return { hero: heroPath, inline: inlinePath };
}

async function main(): Promise<void> {
  const { baseUrl: urlArg, serve, baseRef } = parseArgs();
  let previewProc: ChildProcess | null = null;
  let baseUrl = urlArg;

  const envPosts = postsFromEnv();
  let targets = envPosts ?? gitDiffPosts(baseRef);
  if (targets.length === 0) {
    console.log("No changed blog posts detected; nothing to capture.");
    process.exit(0);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    if (file.endsWith(".png")) fs.unlinkSync(path.join(OUTPUT_DIR, file));
  }

  if (!baseUrl) {
    if (!serve) {
      console.error("Pass --url <preview-base> or --serve to start astro preview after build.");
      process.exit(1);
    }
    previewProc = startPreviewServer();
    baseUrl = `http://127.0.0.1:${DEFAULT_PORT}`;
    await waitForServer(baseUrl);
  }

  let browser: Browser | null = null;
  const manifest: Array<{
    brandId: string;
    slug: string;
    urlPath: string;
    hero: string;
    inline?: string;
  }> = [];

  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    for (const target of targets) {
      console.log(`Capturing ${target.brandId}/${target.slug} → ${target.urlPath}`);
      const shots = await capturePost(page, baseUrl!, target, OUTPUT_DIR);
      manifest.push({
        brandId: target.brandId,
        slug: target.slug,
        urlPath: target.urlPath,
        hero: path.basename(shots.hero),
        inline: shots.inline ? path.basename(shots.inline) : undefined,
      });
    }

    fs.writeFileSync(
      path.join(OUTPUT_DIR, "manifest.json"),
      JSON.stringify({ baseUrl, posts: manifest }, null, 2)
    );
    console.log(`Saved ${manifest.length} post preview(s) to ${OUTPUT_DIR}`);
  } finally {
    await browser?.close();
    if (previewProc) previewProc.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
