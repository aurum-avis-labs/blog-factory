# Blog Factory

Central content repo for Aurum Avis Labs blogs. Landing pages fetch `brands/{brand}/` at build time. Pushing `main` can deploy those sites. Do not edit `.github/`.

## Writing posts

Blog writing, SEO batches, translations, and images are handled by the project skill:

`.cursor/skills/seo-blog/SKILL.md`

Read that skill before drafting or queuing posts. Brand strategy stays in `context/{brand}/` and overrides the skill when they conflict.

## Contract

- Posts: `brands/{brand}/{lang}/{slug}.mdx`
- Images: `brands/{brand}/images/{translationKey}/` (`hero.jpg`, optional `inline1.jpg`, `inline2.jpg`)
- Languages and domains: `brands.config.ts`
- `funnelStage`: `awareness`, `interest`, or `consideration` only. Same value on every locale.
- `translationKey`: the English slug, shared by every locale.
- `relatedPosts`: 1–3 slugs in the same language. Same or higher intent (`awareness` < `interest` < `consideration`). `interest` does not link to `awareness`. `consideration` links to `consideration`, or to `interest` only if no other `consideration` post exists in that language.
- `description`: under 160 characters.
- Body starts at H2. No `---` in the body.
- New waves stay `draft: true` until they are approved to schedule. `draft: false` with a due `pubDate` is eligible for `scripts/dispatch-due-deploys.ts`.

Full field order, query types, images, and wave rules are in the skill.
