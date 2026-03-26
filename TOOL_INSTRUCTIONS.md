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

Current brands: `aurum`, `do-for-me`, `gold-crew`, `postology`, `holist-iq`, `kitchen-crew`, `beauty-corner`

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
draft: false
relatedPosts: ["other-existing-post-slug"]
---
```

**Rules:**
- `description` must be under 160 characters — hard requirement for SEO
- `pubDate` is today's date in `YYYY-MM-DD` format
- `image` field uses the path `@/assets/blog/{post-slug}/img1.png` — this resolves correctly when landing pages fetch content
- `relatedPosts` should reference 1–3 existing post slugs in the same language, or be an empty array `[]`
- Omit `image` field if no images are being generated
- Use `h2`, `h3`, `h4` headings only — never `h1` (title is already the h1)
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

# Claude API — for MDX content generation (option 1)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx

# Azure OpenAI — for MDX content generation (option 2) and image generation
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=xxxxxxxxxxxx
AZURE_OPENAI_DEPLOYMENT=gpt-4o          # text model deployment name
AZURE_DALLE_DEPLOYMENT=dall-e-3         # image model deployment name

# Tool config
PORT=3000
```

---

## 7. AI Provider Support

The tool must support two AI providers for **text generation** (MDX writing), selectable in the UI:

### Option A — Anthropic Claude API
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-20250514`
- Auth header: `x-api-key: {ANTHROPIC_API_KEY}`
- Header: `anthropic-version: 2023-06-01`

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 2000,
  "system": "...",
  "messages": [{ "role": "user", "content": "..." }]
}
```

Response text is at `data.content[0].text`.

### Option B — Azure OpenAI (chat completions)
- Endpoint: `{AZURE_OPENAI_ENDPOINT}openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-01`
- Auth header: `api-key: {AZURE_OPENAI_API_KEY}`

```json
{
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "..." }
  ],
  "max_tokens": 2000
}
```

Response text is at `data.choices[0].message.content`.

The UI should show a provider toggle (Claude / Azure OpenAI). The server reads both keys from `.env.local` and routes accordingly. If a key is missing, that option is greyed out.

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

### `POST /api/generate`

Request body:
```json
{
  "brandId": "do-for-me",
  "languages": ["en", "de"],
  "prompt": "Why AI virtual teams are the future of work",
  "context": "Focus on SMBs, cost angle",
  "imageCount": 3,
  "provider": "claude"
}
```

Steps the server performs:
1. Load `brands.config.ts` to get brand metadata
2. Fetch existing post slugs from the repo via GitHub API (public, no auth needed) to pass to the AI for deduplication
3. For each language: call the AI API with a system prompt that enforces the MDX schema, frontmatter rules, image import syntax, and language/slug localization
4. Extract the slug from the generated title
5. Replace `POST_SLUG` placeholder in image paths with the actual slug
6. For each image (1 to imageCount): generate via Azure DALL-E with a contextual prompt
7. Download each image server-side, convert to base64
8. Return everything to the frontend

Response:
```json
{
  "slug": "why-ai-virtual-teams-are-the-future",
  "posts": {
    "en": "---\ntitle: ...",
    "de": "---\ntitle: ..."
  },
  "images": [
    { "filename": "img1.png", "base64": "...", "previewUrl": "data:image/png;base64,..." },
    { "filename": "img2.png", "base64": "...", "previewUrl": "data:image/png;base64,..." }
  ]
}
```

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
  "claude": true,
  "azureOpenAI": true,
  "azureDalle": true,
  "githubPat": true
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
image: "@/assets/blog/POST_SLUG/img1.png"
tags: ["tag1", "tag2", "tag3"]
draft: false
relatedPosts: []
---

RULES:
- Slug must be localized to the post language (German title → German slug)
- You will use POST_SLUG as a placeholder — it will be replaced with the actual slug
- Use h2, h3 headings only — never h1
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

Place <Image src={imgN} alt="descriptive alt text" width={700} quality={80} class="w-full" /> 
at natural content breaks. img1 appears near the top as the hero.
```

---

## 10. UI Design Requirements

The UI should be **polished and production-grade** — this is an internal tool but it should feel well-built. Dark theme. The Aurum Avis Labs brand uses gold (#C9A84C) as its accent color on dark backgrounds.

### Layout
- Two-column: narrow sidebar (config/status) + main content area
- Three tabs in main area: **Generate**, **Preview**, **Existing Posts**

### Generate tab
- Brand selector dropdown (loaded from `/api/brands`)
- Brand info bar showing domain, languages, repo once brand is selected
- Language checkboxes (pre-checked, loaded from brand config)
- AI provider toggle: Claude / Azure OpenAI (disabled if key not present)
- Blog prompt textarea
- Additional context textarea (optional)
- Image count selector: 0, 2, 3, 4
- Generate button
- Real-time progress log (streaming updates as each step completes)

### Preview tab
- MDX files displayed per language with syntax highlighting (frontmatter keys highlighted in gold, headings in white)
- Generated images displayed as thumbnails in a grid
- Approve & Push button
- Back to edit / Discard buttons

### Existing Posts tab
- Brand selector
- List of existing posts with slug, languages available, date

### Sidebar
- Status indicators: GitHub PAT ✓/✗, Claude ✓/✗, Azure OpenAI ✓/✗, DALL-E ✓/✗
- These are read from `/api/config` — no user input needed, keys come from `.env.local`
- Current brand display

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
