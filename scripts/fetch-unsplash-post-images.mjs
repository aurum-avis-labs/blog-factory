#!/usr/bin/env node
/**
 * Fetch 3 unique Unsplash photos for one blog post (shared EN+DE).
 * Budget: 1 search + 3 download_location calls per post (4 req/post).
 * Usage: UNSPLASH_ACCESS_KEY=... node scripts/fetch-unsplash-post-images.mjs \
 *   --key what-is-a-causal-loop-diagram --query "systems thinking abstract network" \
 *   --out brands/holist-iq/images/what-is-a-causal-loop-diagram
 *
 * Writes credits.json in --out for PR description.
 * Tracks used photo IDs in .unsplash-used-ids.json (repo root) to avoid reuse.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const USED_IDS_PATH = path.join(REPO_ROOT, ".unsplash-used-ids.json");
const MIN_MS_BETWEEN = 2500;

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  console.error("STOP: UNSPLASH_ACCESS_KEY not set. No fetch (shared 50 req/h limit).");
  process.exit(2);
}

function parseArgs() {
  const args = process.argv.slice(2);
  let key = "";
  let query = "";
  let out = "";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--key") key = args[++i];
    else if (args[i] === "--query") query = args[++i];
    else if (args[i] === "--out") out = args[++i];
  }
  if (!key || !query || !out) {
    console.error("Usage: --key <translationKey> --query <search> --out <imageDir>");
    process.exit(1);
  }
  return { key, query, outDir: path.resolve(REPO_ROOT, out) };
}

function loadUsedIds() {
  if (!fs.existsSync(USED_IDS_PATH)) return new Set();
  try {
    return new Set(JSON.parse(fs.readFileSync(USED_IDS_PATH, "utf8")).photoIds || []);
  } catch {
    return new Set();
  }
}

function saveUsedIds(set) {
  fs.writeFileSync(
    USED_IDS_PATH,
    JSON.stringify({ photoIds: [...set], updatedAt: new Date().toISOString() }, null, 2)
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithBackoff(url, options, label) {
  let delay = 5000;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, options);
    if (res.status === 403 || res.status === 429) {
      console.warn(`${label}: ${res.status}, backing off ${delay}ms`);
      await sleep(delay);
      delay = Math.min(delay * 2, 120000);
      continue;
    }
    return res;
  }
  throw new Error(`${label}: failed after backoff (403/429)`);
}

function buildImageUrl(raw, w, h) {
  const u = new URL(raw);
  u.searchParams.set("w", String(w));
  u.searchParams.set("h", String(h));
  u.searchParams.set("fit", "crop");
  u.searchParams.set("q", "80");
  u.searchParams.set("fm", "jpg");
  return u.toString();
}

const auth = {
  Authorization: `Client-ID ${accessKey}`,
  "Accept-Version": "v1",
};

const { key, query, outDir } = parseArgs();
const usedGlobal = loadUsedIds();

await sleep(MIN_MS_BETWEEN);

const searchUrl = new URL("https://api.unsplash.com/search/photos");
searchUrl.searchParams.set("query", query);
searchUrl.searchParams.set("per_page", "12");
searchUrl.searchParams.set("page", "1");
searchUrl.searchParams.set("orientation", "landscape");
searchUrl.searchParams.set("content_filter", "high");

const searchRes = await fetchWithBackoff(searchUrl, { headers: auth }, "search");
if (!searchRes.ok) {
  console.error("search failed", searchRes.status, await searchRes.text());
  process.exit(1);
}

const data = await searchRes.json();
const candidates = (data.results || []).filter((p) => !usedGlobal.has(p.id));
if (candidates.length < 3) {
  console.error("Need 3 unused photos; got", candidates.length, "try a different --query");
  process.exit(1);
}

const picked = candidates.slice(0, 3);
fs.mkdirSync(outDir, { recursive: true });

const credits = [];
const sizes = [
  { file: "img1.jpg", w: 1200, h: 900 },
  { file: "img2.jpg", w: 1000, h: 700 },
  { file: "img3.jpg", w: 1000, h: 700 },
];

for (let i = 0; i < 3; i++) {
  const photo = picked[i];
  await sleep(MIN_MS_BETWEEN);
  const trackRes = await fetchWithBackoff(photo.links.download_location, { headers: auth }, `download ${i + 1}`);
  if (!trackRes.ok) {
    console.error("download_location failed", await trackRes.text());
    process.exit(1);
  }

  const imgUrl = buildImageUrl(photo.urls.raw, sizes[i].w, sizes[i].h);
  await sleep(MIN_MS_BETWEEN);
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) {
    console.error("image fetch failed", imgRes.status);
    process.exit(1);
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(path.join(outDir, sizes[i].file), buf);

  usedGlobal.add(photo.id);
  credits.push({
    file: sizes[i].file,
    photoId: photo.id,
    photographerName: photo.user.name,
    photographerUsername: photo.user.username,
    photoPageUrl: photo.links.html,
  });
}

saveUsedIds(usedGlobal);
fs.writeFileSync(
  path.join(outDir, "credits.json"),
  JSON.stringify({ translationKey: key, query, credits }, null, 2)
);

console.log("OK", key, "→", outDir);
console.log(JSON.stringify(credits, null, 2));
