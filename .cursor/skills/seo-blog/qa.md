# Publishing standard

Run this before `draft: false` and before a wave is called ready to schedule. It is the same standard every locale meets.

## The article

- The title, the first paragraph, and one H2 carry the primary query; the opening answers it.
- Each locale answers the query people use in that language, in the brand's address form (Aurum de-CH: Sie; Vemoir: DE du, FR vous, IT tu, EN you; Postology: DE du).
- The same sections, paragraphs, and FAQ items run through every locale; the block sequence matches.
- Numbers, quotes, customers, and ratings come from the brand context or a linked source. A number that is not the brand's own carries its source and its measurement label.
- Prices, features, and limits match the brand context or the vendor's current page.

## The page as it reads

- Calm, specific body copy. Short paragraphs; the emphasis lives in the words. Asides use commas, parentheses, colons, or a new sentence.
- Headings start at H2. FR body copy uses a non-breaking space before `: ; ? !`; de-CH uses `ss`.
- Blocks from [blocks.md](blocks.md) carry the facts, steps, comparisons, and limits that keep the page scannable; each block has its own content.
- One FAQ section under its own localized H2, one form per article (`div.blog-faq` or the H2 + `###` form), identical across locales.

## Frontmatter and links

- The brand's field set and order; `description` under 160 characters; 3–5 tags (Vemoir 2–4); the brand's own byline.
- `translationKey` is the English slug; `funnelStage` is identical across locales.
- `image` points at `@/assets/blog/{translationKey}/hero.webp`; an Unsplash credit sits after the lede, translated.
- `relatedPosts` holds 1–3 slugs that exist in that language: awareness links to interest or consideration, interest to interest or consideration, consideration to consideration (or to interest while the language has no other consideration post).
- One related post is linked in the body. Body links resolve on disk and point at posts that are live when this one publishes.

## Mechanical checks

- WebP-only content: `npm run check:images` (also runs before publish dispatches).
- After adding PNG/JPEG from generators or Unsplash scripts, run `npm run images:webp`.
- Compile the MDX: `node scripts/aurum/mdxcheck.mjs <file> ...`
- Where a plan has its own validator (for example `scripts/aurum/validate.py` for the security wave), run it.

## Retro

After a wave ships, add 5–15 lines to the batch folder: what changed in review, and the one improvement to carry into the next wave. Read the last retro before planning the next batch.
