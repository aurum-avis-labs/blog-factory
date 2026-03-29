# Blog Factory

Centralized blog content hub for all Aurum Avis Labs brands. This repo is the single source of truth for blog content across all landing pages.

## Repository Structure

```
blog-factory/
  brands.config.ts          # Brand registry (all brands, repos, domains, languages)
  brands/                   # Blog content organized by brand
    {brand-id}/
      {lang}/               # Language folders (en/, de/, fr/, it/)
        post-slug.mdx       # Blog post (MDX with frontmatter)
      images/               # Blog images for this brand
        {post-slug}/        # Images grouped by post
          img1.png
  preview/                  # Astro preview site with brand switcher
  scripts/                  # Migration, publish, and deploy scripts
  .github/workflows/        # Auto-publish and manual publish workflows
```

## Brand Registry

All brands are defined in `brands.config.ts`. To add a new brand, add an entry there and create its folder under `brands/`.

Current brands: aurum, do-for-me, gold-crew, postology, beauty-corner, holist-iq, kitchen-crew.

## Blog Post Schema

Every MDX file must have this frontmatter:

```yaml
---
title: "Post Title"                    # Required — string
description: "Short description"       # Required — string, keep under 160 chars for SEO
pubDate: 2026-03-25                    # Required — date (YYYY-MM-DD)
updatedDate: 2026-03-26               # Optional — date
author: "Author Name"                  # Optional — string
image: "@/assets/blog/slug/img1.png"   # Optional — path to hero image
tags: ["tag1", "tag2"]                 # Optional — array of strings
draft: false                           # Optional — boolean, default false
relatedPosts: ["other-post-slug"]      # Optional — array of post slugs (same language)
---
```

## Image Handling

- Hero images: referenced in frontmatter `image` field
- Inline images: use Astro's Image component:
  ```mdx
  import { Image } from 'astro:assets';
  import img1 from '@/assets/blog/post-slug/img1.png';

  <Image src={img1} alt="Description" width={500} quality={80} class="w-full" />
  ```
- All image paths use `@/assets/blog/...` — this resolves correctly when fetched to landing pages
- Store images at `brands/{brand}/images/{post-slug}/`

## Content Guidelines

- Descriptions MUST be under 160 characters for SEO
- Use semantic heading hierarchy (h2, h3, h4 — never h1, that's the title)
- Include 2-3 relevant tags for categorization
- Set relatedPosts to link to 1-3 existing posts in the same language
- Slugs should be localized (German posts get German slugs, etc.)
- Each post should exist in all languages configured for the brand (see brands.config.ts)

## Workflows

### Preview locally
```bash
npm run preview    # Starts Astro dev server with brand switcher UI
```

### Publish to a landing page
Content is auto-published when pushed to main. The `auto-publish.yml` workflow detects which brands changed and dispatches builds to affected landing page repos.

Manual publish:
```bash
npm run publish:brand -- --brands=aurum
```

### Add a new brand
1. Add entry to `brands.config.ts`
2. Create `brands/{new-brand}/{lang}/` folders for each language
3. In the landing page repo: add `scripts/fetch-blog.ts`, set `BLOG_BRAND` env var

## Content Generation (AI Pipeline)

When generating blog content for a brand:

1. Read `brands.config.ts` to get the brand's languages and domain
2. Check existing posts in `brands/{brand}/` to avoid topic duplication
3. Generate content in ALL configured languages for the brand
4. Use localized slugs (not English slugs with translated content)
5. Place files in `brands/{brand}/{lang}/post-slug.mdx`
6. If using images, place them in `brands/{brand}/images/post-slug/`
7. Preview with `npm run preview` before pushing
