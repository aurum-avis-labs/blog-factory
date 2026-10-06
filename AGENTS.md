# Blog Factory

Central content repo for Aurum Avis Labs blogs. Landing pages fetch `brands/{brand}/` at build time. Pushing `main` can deploy those sites. Do not edit `.github/`.

## Writing posts

Blog writing, SEO batches, translations, and images are handled by the project skill:

`.cursor/skills/seo-blog/SKILL.md`

Read that skill before drafting or queuing posts. Every wave passes `.cursor/skills/seo-blog/qa.md` before `draft: false`. Brand strategy stays in `context/{brand}/` and overrides the skill when they conflict.

## Contract

- Posts: `brands/{brand}/{lang}/{slug}.mdx`
- Images: `brands/{brand}/images/{translationKey}/` (`hero.webp`, optional `inline1.webp`, `inline2.webp`). Generation may produce PNG/JPEG; run `npm run images:webp` before commit. Only WebP may be referenced (`npm run check:images`).
- Languages and domains: `brands.config.ts`
- `funnelStage`: `awareness`, `interest`, or `consideration`. Same value on every locale.
- `translationKey`: the English slug, shared by every locale.
- `relatedPosts`: 1–3 slugs in the same language, traveling from lower to higher intent (`awareness` < `interest` < `consideration`): interest points to interest or consideration; consideration points to consideration, or to interest while that language has no other consideration post.
- `description`: under 160 characters.
- `seoTitle` (optional): SERP `<title>` when it must differ from the on-page H1; keep `title` as the H1, ≤60 characters before any landing-page brand suffix. Omit when `title` is enough.
- Body starts at H2; `---` is reserved for frontmatter.
- New waves stay `draft: true` until they are approved to schedule. `draft: false` with a due `pubDate` is eligible for `scripts/dispatch-due-deploys.ts`.

Full field order, query types, images, and wave rules are in the skill.

## Backlinks and directory listings

Listing products on free directories (badges, register, dev task files) is handled by the project skill `.cursor/skills/backlink-directories/SKILL.md`; overview and lessons are in `backlinks/`. Read the skill before doing any directory work. The real data lives in `backlinks/data/`, which is gitignored: this repo is public, so never commit it, and never write passwords or account emails into committed files. Nothing under `backlinks/` is published or deploys a blog.
