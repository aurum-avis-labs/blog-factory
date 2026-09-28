# CitySage — Unsplash image policy (AAL shared key)

**Stand:** 2026-09-28 · **Owner:** Robert override

## Shared rate limit

- `UNSPLASH_ACCESS_KEY` is **shared across all AAL Cloud Agents** (~**50 API requests/hour** total).
- **Do not** batch-fetch images for Postology, Inklets, Holist-IQ, or other brands in parallel with CitySage.

## Workflow order

1. **Write / fix MDX first** (`draft: false` when publish-ready).
2. **Images only when** `process.env.UNSPLASH_ACCESS_KEY` is present and copy is stable.
3. **One CitySage post per run** of `scripts/citysage-unsplash-images.mjs` (Wave order #1 → #20, skip GATEs).

## Minimal API usage (per post)

| Step | Calls |
|------|--------|
| One `search/photos` (`per_page=30`) | 1 |
| Three `download_location` (hero + 2 inline) | 3 |
| **Total** | **4** |

CDN fetch of JPEG bytes does not count toward the Unsplash API hourly cap (only search + download_location).

## Throttle rules

- **90s minimum** between Unsplash API calls within a run (`--delay-ms` to increase if needed).
- **403:** script backs off (15m, then 30m) and **exits** — do not spin other brands; retry **same slug** later.
- **Lock file:** `.citysage-unsplash.lock` — only one fetch process repo-wide.
- **Dedupe:** `context/citysage/unsplash-used-photo-ids.json` — never reuse a photo ID across CitySage posts.

## PR requirements

- Hero 1200×900 + ≥2 in-body images under `brands/citysage/images/{slug}/`.
- Commit `sources.json` with photo IDs and photographer names.
- PR description: Unsplash credits + link per image (`photoPageUrl`).

## No fallbacks

- No Higgsfield / generated travel photos.
- No direct `images.unsplash.com` curl without API `download_location`.
- If key missing: **STOP**, do not substitute.

## Script

```bash
node scripts/citysage-unsplash-images.mjs --slug what-is-an-ai-travel-itinerary --search "travel planning map"
```

After images: preview screenshots on the **same PR branch**, then push.
