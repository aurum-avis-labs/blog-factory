#!/usr/bin/env node
/**
 * CitySage Unsplash images — ONE post per invocation.
 *
 * HOLD (2026-09-28): Do not run until Robert lifts "STOP Unsplash API" notice.
 *
 * Shared AAL limit: ~50 Unsplash API requests/hour across all agents.
 * - Minimal calls: 1 search (per_page=30) + 3 download_location = 4 API calls/post
 * - Sequential delays between API calls (default 90s)
 * - 403 → exponential backoff, then STOP (exit 3) so other brands are not raced
 * - Repo lock: only one fetch process at a time
 *
 * Requires process.env.UNSPLASH_ACCESS_KEY.
 *
 * Usage:
 *   node scripts/citysage-unsplash-images.mjs --slug my-post --search "lisbon travel street"
 *   node scripts/citysage-unsplash-images.mjs --slug my-post --search "..." --delay-ms 90000
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const LOCK_PATH = path.join(REPO_ROOT, ".citysage-unsplash.lock");
const USED_IDS_PATH = path.join(REPO_ROOT, "context/citysage/unsplash-used-photo-ids.json");

const DEFAULT_DELAY_MS = 90_000;
const BACKOFF_403_MS = [15 * 60_000, 30 * 60_000];

function parseArgs() {
  const argv = process.argv.slice(2);
  let slug = "";
  let searchQuery = "";
  let delayMs = DEFAULT_DELAY_MS;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--slug" && argv[i + 1]) slug = argv[++i];
    else if (argv[i] === "--search" && argv[i + 1]) searchQuery = argv[++i];
    else if (argv[i] === "--delay-ms" && argv[i + 1]) delayMs = Number(argv[++i]);
  }
  if (!slug || !searchQuery) {
    console.error("Usage: node scripts/citysage-unsplash-images.mjs --slug SLUG --search \"query\"");
    process.exit(1);
  }
  return { slug, searchQuery, delayMs };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function acquireLock() {
  if (fs.existsSync(LOCK_PATH)) {
    try {
      const raw = JSON.parse(fs.readFileSync(LOCK_PATH, "utf8"));
      const age = Date.now() - raw.startedAt;
      if (age < 2 * 60 * 60_000) {
        console.error(`STOP: another Unsplash fetch in progress (pid ${raw.pid}, ${Math.round(age / 1000)}s ago). One post at a time.`);
        process.exit(4);
      }
    } catch {
      /* stale lock */
    }
  }
  fs.writeFileSync(
    LOCK_PATH,
    JSON.stringify({ pid: process.pid, startedAt: Date.now(), repo: "blog-factory" }) + "\n"
  );
}

function releaseLock() {
  try {
    fs.unlinkSync(LOCK_PATH);
  } catch {
    /* ignore */
  }
}

function loadUsedIds() {
  if (!fs.existsSync(USED_IDS_PATH)) return new Set();
  const data = JSON.parse(fs.readFileSync(USED_IDS_PATH, "utf8"));
  return new Set(Array.isArray(data.photoIds) ? data.photoIds : []);
}

function saveUsedIds(set) {
  fs.mkdirSync(path.dirname(USED_IDS_PATH), { recursive: true });
  fs.writeFileSync(
    USED_IDS_PATH,
    JSON.stringify({ photoIds: [...set], updatedAt: new Date().toISOString() }, null, 2) + "\n"
  );
}

async function apiFetch(url, auth, delayMs, label) {
  let attempt = 0;
  while (true) {
    if (attempt > 0) console.log(`Retry ${label} attempt ${attempt + 1}`);
    await sleep(delayMs);
    const res = await fetch(url, { headers: auth });
    if (res.status === 403) {
      const wait = BACKOFF_403_MS[attempt];
      if (wait == null) {
        console.error("STOP: Unsplash 403 rate limit — back off and retry this slug later. Do not run other brands.");
        process.exit(3);
      }
      console.error(`Unsplash 403 on ${label}; waiting ${wait / 1000}s before retry`);
      await sleep(wait);
      attempt++;
      continue;
    }
    if (!res.ok) throw new Error(`${label} ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return res;
  }
}

async function searchThreePhotos(accessKey, query, usedIds, delayMs) {
  const searchUrl = new URL("https://api.unsplash.com/search/photos");
  searchUrl.searchParams.set("query", query);
  searchUrl.searchParams.set("per_page", "30");
  searchUrl.searchParams.set("page", "1");
  searchUrl.searchParams.set("orientation", "landscape");
  const auth = { Authorization: `Client-ID ${accessKey}`, "Accept-Version": "v1" };

  const res = await apiFetch(searchUrl, auth, delayMs, "search");
  const data = await res.json();
  const picked = [];
  for (const photo of data.results ?? []) {
    if (usedIds.has(photo.id)) continue;
    picked.push(photo);
    if (picked.length === 3) break;
  }
  if (picked.length < 3) {
    throw new Error(`Need 3 unused photos; got ${picked.length} for query "${query}". Try a broader search.`);
  }
  return picked;
}

async function trackAndDownload(photo, accessKey, delayMs, w, h) {
  const auth = { Authorization: `Client-ID ${accessKey}`, "Accept-Version": "v1" };
  await apiFetch(photo.links.download_location, auth, delayMs, "download_location");
  const imgUrl = `${photo.urls.raw}&w=${w}&h=${h}&fit=crop&q=80&auto=format`;
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) throw new Error(`Image CDN ${imgRes.status}`);
  return Buffer.from(await imgRes.arrayBuffer());
}

async function main() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error("STOP: UNSPLASH_ACCESS_KEY is not set. Write MDX first; fetch images when key is ready.");
    process.exit(2);
  }

  const { slug, searchQuery, delayMs } = parseArgs();
  acquireLock();
  try {
    const outDir = path.join(REPO_ROOT, "brands/citysage/images", slug);
    fs.mkdirSync(outDir, { recursive: true });

    const usedIds = loadUsedIds();
    const photos = await searchThreePhotos(accessKey, searchQuery, usedIds, delayMs);

    const sources = {
      slug,
      searchQuery,
      fetchedAt: new Date().toISOString().slice(0, 10),
      apiCallsNote: "1 search + 3 download_location (minimal)",
      images: [],
    };
    const names = ["img1.jpg", "img2.jpg", "img3.jpg"];
    const roles = ["hero", "inline", "inline"];

    for (let i = 0; i < 3; i++) {
      const photo = photos[i];
      const h = i === 0 ? 900 : 750;
      const w = i === 0 ? 1200 : 1000;
      const buf = await trackAndDownload(photo, accessKey, delayMs, w, h);
      const outPath = path.join(outDir, names[i]);
      fs.writeFileSync(outPath, buf);
      usedIds.add(photo.id);
      sources.images.push({
        file: names[i],
        role: roles[i],
        photoId: photo.id,
        photographerName: photo.user.name,
        photographerUsername: photo.user.username,
        photoPageUrl: photo.links.html,
      });
      console.log(`Wrote ${outPath} photo ${photo.id} by ${photo.user.name}`);
    }

    saveUsedIds(usedIds);
    fs.writeFileSync(path.join(outDir, "sources.json"), JSON.stringify(sources, null, 2) + "\n");
    console.log("Done. Wait before next post (~90s+ between runs). CitySage only; do not race other brands.");
  } finally {
    releaseLock();
  }
}

main().catch((e) => {
  console.error(e);
  releaseLock();
  process.exit(1);
});
