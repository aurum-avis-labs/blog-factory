# Blog Factory

Centralized blog content for all Aurum Avis Labs landing pages.

## How It Works

```
blog-factory (this repo)          Landing page repos
┌─────────────────────┐           ┌──────────────────────┐
│ brands/              │  fetch    │ scripts/fetch-blog.ts │
│   aurum/             │◄─────────│                        │
│   do-for-me/         │  (build  │ npm run build          │
│   gold-crew/         │   time)  │   → fetch-blog         │
│   ...                │           │   → astro build        │
├─────────────────────┤           └──────────────────────┘
│ .github/workflows/   │                    ▲
│   auto-publish.yml   │───────────────────┘
│   publish.yml        │  repository_dispatch
└─────────────────────┘  (triggers rebuild + deploy)
```

**Push content to blog-factory** → auto-publish detects changed brands → dispatches rebuild to affected landing pages → landing pages fetch latest content → build → deploy to Azure SWA.

## Brand ID Convention

Brand IDs are derived automatically from the landing page repo name by stripping `-landing*` and everything after it:

| Repo name | Brand ID |
|-----------|----------|
| `aurum-landing-page` | `aurum` |
| `do-for-me-landingpage` | `do-for-me` |
| `gold-crew-landing-page` | `gold-crew` |
| `postology-landing-page` | `postology` |
| `beauty-corner-landing-page` | `beauty-corner` |
| `holist-iq-landing-page` | `holist-iq` |
| `kitchen-crew-landing-page` | `kitchen-crew` |

This means **no configuration is needed** in landing page repos — `fetch-blog.ts` detects the brand from the git remote URL or directory name.

## Content Structure

```
brands/{brand-id}/
  {lang}/                # en/, de/, fr/, it/
    post-slug.mdx        # Blog post with frontmatter
  images/                # Blog images
    {post-slug}/
      img1.png
```

Images are referenced in MDX as `@/assets/blog/{post-slug}/img1.png`.

## Deployment Pipeline

### Automatic (on push)

1. Push content changes to `main` in this repo
2. `auto-publish.yml` runs `git diff` to detect which `brands/` folders changed
3. Sends `repository_dispatch` (`blog-update`) to each affected landing page repo
4. Landing page's `deploy-blog-update.yml` triggers → fetches content → builds → deploys

### Manual

Go to **Actions → Manual Publish → Run workflow**, select a brand or `all`.

### How landing pages fetch content

`scripts/fetch-blog.ts` runs as a pre-build step (`npm run build` = `fetch-blog && astro build`):

1. Detects brand ID from repo name (strips `-landing*`)
2. Git sparse-checkout of `brands/{brand}/` from this repo (public, no auth needed)
3. Copies MDX files → `src/content/blog/{lang}/`
4. Copies images → `src/assets/blog/`
5. Astro builds normally with content collections

## Setup

### This repo (one-time)

- `CROSS_REPO_PAT` secret — fine-grained PAT with `Contents: Read and write` on all landing page repos (needed for `repository_dispatch`)
- To add a new landing page: edit the PAT to include the new repo (no need to create a new PAT)

### Adding a new brand

1. Add entry to `brands.config.ts`
2. Create `brands/{new-brand}/{lang}/` folders
3. In the landing page repo:
   - Copy `templates/fetch-blog.ts` → `scripts/fetch-blog.ts`
   - Copy `templates/deploy-blog-update.yml` → `.github/workflows/deploy-blog-update.yml`
   - Add `tsx` as devDependency
   - Update package.json: `"build": "npm run fetch-blog && astro build"`
   - Add to `.gitignore`: `src/content/blog/`, `src/assets/blog/`, `.blog-factory-tmp/`
4. Update `publish.yml` dropdown to include the new brand

### Preview

```bash
cd preview && npm run dev
```

Renders all brands' blogs locally with a brand switcher UI.
