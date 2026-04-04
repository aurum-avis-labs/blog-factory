# Blog Factory — Local Tool Instructions for Claude Code

This document contains everything needed to build the `tool/` local web app inside the `blog-factory` repository. Read this fully before writing any code.

---

## 1. What You Are Building

A locally-hosted blog creation tool for Aurum Avis Labs. It runs on the developer's machine via a local Express server and is accessed via browser at `http://localhost:3000`.

The tool lets the user:
1. Select a brand from the registered brands in `brands.config.ts`
2. Enter a blog topic prompt and optional context
3. Choose which languages to generate (pre-filled from brand config)
4. Choose how many images to generate
5. Generate complete `.mdx` files via an AI model (Claude or Azure OpenAI)
6. Generate images via Azure DALL-E
7. Preview all generated content (rendered MDX + images) before committing anything
8. Approve and push everything to the correct paths in this repo via GitHub API
9. Watch the progress in a real-time log

**The tool lives at:** `tool/` inside the `blog-factory` repo root.

---

## 2. Repository Context

### Repo: `aurum-avis-labs/blog-factory`

This is the central content repository for all Aurum Avis Labs landing pages. Read `CLAUDE.md` and `README.md` at the repo root for full context. Key points:

- **Never touch `.github/`** — workflows are already configured and must not be modified
- Content lives under `brands/{brand-id}/{lang}/post-slug.mdx`
- Images live under `brands/{brand-id}/images/{post-slug}/img1.png`, `img2.png`, etc.
- All brands are defined in `brands.config.ts` at the repo root
- When content is pushed to `main`, the `auto-publish.yml` workflow automatically detects changed brands and dispatches rebuilds to affected landing page repos — no manual deployment needed

### Brand Config Shape (`brands.config.ts`)

```typescript
export interface BrandConfig {
  id: string;           // matches folder name under brands/
  displayName: string;  // human-readable name
  repo: string;         // owner/repo of the landing page
  domain: string;       // production domain
  languages: string[];  // supported languages e.g. ["en", "de", "fr", "it"]
  defaultLanguage: string;
}
```

Current brands: `aurum`, `do-for-me`, `gold-crew`, `postology`, `holist-iq`, `kitchen-crew` (see `brands.config.ts` — keep this list in sync when adding or removing brands).

---

## 3. MDX File Schema

Every generated `.mdx` file must follow this exact frontmatter schema:

```mdx
---
title: "Post Title"
description: "Short description — MUST be under 160 characters for SEO"
pubDate: 2026-03-25
author: "Brand Display Name"
image: "@/assets/blog/post-slug/img1.png"
tags: ["tag1", "tag2", "tag3"]
funnelStage: "awareness"
draft: false
relatedPosts: ["other-existing-post-slug"]
---
```

**Rules:**
- Wrap frontmatter in opening and closing `---` lines (Astro/MDX standard). A block of `title:` / `description:` lines without those delimiters is not valid frontmatter and breaks content collections.
- `description` must be under 160 characters — hard requirement for SEO
- `pubDate` is today's date in `YYYY-MM-DD` format
- `image` field uses the path `@/assets/blog/{post-slug}/img1.png` — this resolves correctly when landing pages fetch content
- `funnelStage` must be one of `awareness`, `interest`, or `consideration` — same value for every locale of the same article. Matches landing-page blog schema and GA4 funnel tracking (`@aurum-avis-labs/browser-tracking`). The tool UI selects this per job; the server also rewrites the key after generation so it cannot drift.
- `relatedPosts` should reference 1–3 existing post slugs in the same language, or be an empty array `[]`
- Omit `image` field if no images are being generated
- Use `h2`, `h3`, and `h4` headings only — never `h1` (title is already the h1)
- Slugs must be localized: German posts get German slugs, French posts get French slugs, etc.

### Image references in MDX body

When images are included, add this import block immediately after the closing `---` of the frontmatter:

```mdx
import { Image } from 'astro:assets';
import img1 from '@/assets/blog/post-slug/img1.png';
import img2 from '@/assets/blog/post-slug/img2.png';
import img3 from '@/assets/blog/post-slug/img3.png';
```

Inline image usage:

```mdx
<Image src={img1} alt="Descriptive alt text" width={700} quality={80} class="w-full" />
```

- `img1` is always the hero image and appears near the top of the post
- Inline images are placed at natural content breaks
- Replace `post-slug` with the actual slug throughout

---

## 4. File Placement on Push

When pushing generated content to the repo via GitHub API:

| File type | Path in repo |
|---|---|
| MDX (English) | `brands/{brand-id}/en/{slug}.mdx` |
| MDX (German) | `brands/{brand-id}/de/{slug}.mdx` |
| MDX (French) | `brands/{brand-id}/fr/{slug}.mdx` |
| MDX (Italian) | `brands/{brand-id}/it/{slug}.mdx` |
| Images | `brands/{brand-id}/images/{slug}/img1.png`, `img2.png`, etc. |

All files for a given post share the same slug. The slug is derived from the post title, lowercased, with spaces replaced by hyphens, localized per language.

---

## 5. Tool Stack

```
tool/
  server.ts           ← Express server (TypeScript, tsx)
  public/
    index.html        ← Single-page UI
    style.css         ← Styles
    app.js            ← Frontend JS
  .env.local          ← All secrets (gitignored)
  package.json
  tsconfig.json
  README.md           ← How to run the tool
```

### Server
- **Runtime:** Node.js with `tsx` (already a devDependency in the root)
- **Framework:** Express
- **Port:** 3000
- Serves the `public/` folder as static files
- Exposes API routes that proxy calls to Claude API, Azure OpenAI, and GitHub API so secrets never touch the browser

### Frontend
- Plain HTML + CSS + vanilla JS (no framework, no build step)
- Communicates with the local Express server only — never calls external APIs directly
- Persistent config loaded from server (via `.env.local`) — no config panel needed in the UI, keys are always present

---

## 6. Environment Variables (`.env.local`)

Create `tool/.env.local` with these variables. Add `tool/.env.local` to the root `.gitignore`.

```env
# GitHub — for pushing generated content to this repo
GITHUB_PAT=ghp_xxxxxxxxxxxx

# Anthropic Claude — optional; used when the UI selects Claude for MDX generation
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
# Optional override (default: claude-sonnet-4-20250514)
# ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Azure OpenAI — text (when UI selects Azure), image generation, planning/translation helpers
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=xxxxxxxxxxxx
AZURE_OPENAI_DEPLOYMENT=gpt-4o          # text model deployment name
AZURE_DALLE_DEPLOYMENT=dall-e-3         # image model deployment name

# Tool config
PORT=3000
```

---

## 7. AI Provider Support

### MDX body generation (user-selectable)

The Generate form offers **Azure OpenAI** or **Anthropic Claude** for writing the MDX post body. The server enforces that the selected provider is configured before queuing a job.

- **Azure OpenAI:** `chat/completions` with `max_completion_tokens` (16k for generation, 8k for refine).
- **Claude:** `POST https://api.anthropic.com/v1/messages` with `x-api-key`, `anthropic-version: 2023-06-01`, model from `ANTHROPIC_MODEL` or default `claude-sonnet-4-20250514`, `max_tokens` 16k for generation / 8k for refine.

`/api/config` exposes `azureOpenAI` and `claude` booleans so the UI can disable unavailable options. At least one must be true to generate.

### Planning, refine compatibility, and images

- English image-planning and most auxiliary text calls still use **Azure OpenAI** when configured (unchanged pipeline).
- **Refine** uses the same text provider as the original staged post (`textProvider` stored in staging JSON): Azure or Claude. Staged posts created before this field default to Azure.
- **Image generation** remains Azure DALL-E and/or Unsplash as already implemented.

### Image generation — Azure DALL-E only
- Endpoint: `{AZURE_OPENAI_ENDPOINT}openai/deployments/{AZURE_DALLE_DEPLOYMENT}/images/generations?api-version=2024-02-01`
- Auth header: `api-key: {AZURE_OPENAI_API_KEY}`

```json
{
  "prompt": "...",
  "n": 1,
  "size": "1024x1024",
  "quality": "standard"
}
```

Response image URL is at `data.data[0].url`. Images must be downloaded server-side and pushed to GitHub as base64.

---

## 8. Generation Pipeline (Server-Side)

The server handles the full pipeline. The frontend just makes fetch calls to local API routes.

### `POST /api/jobs` (primary generation entrypoint)

Request body:
```json
{
  "brandId": "do-for-me",
  "languages": ["en", "de"],
  "prompt": "Why AI virtual teams are the future of work",
  "context": "Focus on SMBs, cost angle",
  "imageCount": 3,
  "imageSource": "ai",
  "referenceMode": "auto",
  "referenceName": "optional-style-ref.png",
  "funnelStage": "interest",
  "textProvider": "azure"
}
```

- `funnelStage`: `"awareness"` | `"interest"` | `"consideration"` (default `awareness` if omitted).
- `textProvider`: `"azure"` | `"claude"` (default `azure`). Must match configured keys (see §7).

Steps the worker performs:
1. Load `brands.config.ts` to get brand metadata
2. Read existing post slugs from the local `brands/{brandId}/{lang}/` tree for deduplication hints
3. For each language: call the selected text provider with the MDX system prompt (frontmatter, `funnelStage`, headings, images)
4. Extract the slug from the generated title; replace `POST_SLUG` in paths
5. After all languages, **rewrite** `funnelStage` in frontmatter so it matches the job (model output cannot override the UI)
6. For each image slot: planning (Azure) + DALL-E or Unsplash as configured
7. Persist a staged post under `tool/staging/` (JSON) for review and push

Response: `{ "jobId": "...", "position": 0 }` — the UI listens to `GET /api/jobs/:id/stream` (SSE) for logs and completion (`stagingId`).

### `POST /api/push`

Request body:
```json
{
  "brandId": "do-for-me",
  "slug": "why-ai-virtual-teams-are-the-future",
  "posts": { "en": "mdx content...", "de": "mdx content..." },
  "images": [{ "filename": "img1.png", "base64": "..." }]
}
```

Steps:
1. For each language: push MDX to `brands/{brandId}/{lang}/{slug}.mdx` via GitHub Contents API (PUT)
2. For each image: push to `brands/{brandId}/images/{slug}/{filename}` via GitHub Contents API (PUT)
3. All files in a single logical commit (same commit message)
4. Commit message format: `feat(content): add "{slug}" for {brandId}`

GitHub Contents API push:
```
PUT https://api.github.com/repos/aurum-avis-labs/blog-factory/contents/{path}
Authorization: token {GITHUB_PAT}
Content-Type: application/json

{
  "message": "feat(content): add \"post-slug\" for brand-id",
  "content": "{base64-encoded-content}"
}
```

### `GET /api/brands`

Returns the parsed `brands.config.ts` as JSON. Read the file from disk (the tool runs inside the repo), parse the TypeScript to extract the brands array.

### `GET /api/existing/:brandId`

Fetches existing post slugs for a brand from the GitHub API:
```
GET https://api.github.com/repos/aurum-avis-labs/blog-factory/contents/brands/{brandId}/{lang}
```
No auth needed (public repo). Returns a flat list of slugs per language.

### `GET /api/config`

Returns which providers are available based on which env vars are set:
```json
{
  "azureOpenAI": true,
  "claude": true,
  "azureDalle": true,
  "unsplash": false
}
```

---

## 9. System Prompt for MDX Generation

Use this as the base system prompt, filled in dynamically:

```
You are a professional blog writer for {brand.displayName} ({brand.domain}).

Write a complete, high-quality MDX blog post in {language}.

FRONTMATTER (mandatory, exact format):
---
title: "Post Title"
description: "Under 160 chars"
pubDate: {today}
author: "{brand.displayName}"
{imageLineIfAny}
tags: ["tag1", "tag2", "tag3"]
funnelStage: "{funnelStage}"
draft: false
relatedPosts: []
---

RULES:
- Slug must be localized to the post language (German title → German slug)
- You will use POST_SLUG as a placeholder — it will be replaced with the actual slug
- Use h2, h3, and h4 headings only — never h1
- funnelStage must stay "{funnelStage}" (awareness = top-of-funnel; interest = mid; consideration = bottom — landing-page analytics)
- Description under 160 characters — hard limit
- 600–900 words of substantive, insightful content
- Professional tone, not salesy
- Include 2–3 relevant tags

{imageInstructions}

Existing posts to avoid duplicating:
{existingSlugList}

Return ONLY the raw MDX. No explanation, no code fences.
```

Image instructions block (when imageCount > 0):
```
Include {imageCount} images. Add this import block immediately after the frontmatter ---:

import { Image } from 'astro:assets';
import img1 from '@/assets/blog/POST_SLUG/img1.png';
[...repeat for each image]

Place each `<Image />` at natural section breaks; the first image should appear only after the intro and the first `##` heading (see implementation in `tool/server.ts`).
```

---

## 10. UI Design Requirements

The UI should be **polished and production-grade** — this is an internal tool but it should feel well-built. Dark theme. The Aurum Avis Labs brand uses gold (#C9A84C) as its accent color on dark backgrounds.

### Layout
- Two-column: narrow sidebar (config/status) + main content area
- Main tabs: **Generate**, **Posts** (staging queue), **Existing Posts**, **Settings**

### Generate tab
- Brand selector (sidebar) and brand info bar (domain, repo, languages)
- Language checkboxes (pre-checked from brand config)
- **Funnel stage** radio group: awareness / interest / consideration
- **Text generation** radio group: Azure OpenAI / Claude (options disabled if not in `/api/config`)
- Blog prompt and optional context textareas
- Image count selector: 0, 2, 3, 4; image source and reference controls when images > 0
- Generate button → `POST /api/jobs`; progress via Posts tab and job stream

### Posts tab
- Staging cards show slug, languages, optional funnel badge, image count, approve/reject
- Detail view: per-language MDX, refine chat, push to repo

### Existing Posts tab
- Brand selector; list slugs from the local `brands/` tree

### Settings tab
- API status grid: Azure OpenAI, Anthropic Claude, image generation, Unsplash (`/api/config`)

### Sidebar
- Pills for text (any of Azure/Claude) and images (DALL-E or Unsplash)
- Global brand selector

---

## 11. How to Run

Add to `tool/package.json`:
```json
{
  "scripts": {
    "dev": "tsx watch server.ts",
    "start": "tsx server.ts"
  }
}
```

Add to root `package.json` scripts:
```json
"tool": "cd tool && npm run dev"
```

So from the repo root: `npm run tool` starts the blog creation tool at `http://localhost:3000`.

---

## 12. .gitignore Additions

Add to the **root** `.gitignore`:
```
tool/.env.local
tool/node_modules/
```

---

## 13. What NOT to Do

- **Never touch `.github/`** — workflows are complete and must not be modified
- **Never hardcode brand IDs** — always read from `brands.config.ts`
- **Never push to any branch other than `main`** — the auto-publish workflow only triggers on main
- **Never call external APIs from the browser** — all API calls go through the local Express server so secrets stay in `.env.local`
- **Never create a separate content repo** — all content goes into this repo under `brands/`
- **Never modify `scripts/`, `templates/`, or `preview/`** — these are separate concerns

---

## 14. Slug Generation Logic

```typescript
function generateSlug(title: string, lang: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 80);
}
```

The slug is extracted from the AI-generated title in the frontmatter. The AI is instructed to produce a localized title (and therefore a localized slug).

---

## 15. Deployment Pipeline (for reference — already set up, do not modify)

When the tool pushes content to `main`:

1. `auto-publish.yml` detects which `brands/` folders changed via `git diff`
2. Runs `scripts/dispatch-deploys.ts` which sends `repository_dispatch` events to affected landing page repos
3. Each landing page repo receives the event, runs `fetch-blog.ts` (sparse git checkout of just its brand folder), copies MDX and images into `src/content/blog/` and `src/assets/blog/`, then runs `astro build` and deploys to Azure Static Web Apps
4. The sitemap on each landing page is regenerated from the new content at build time

No manual deployment step is needed after pushing content. The entire pipeline is automatic.
