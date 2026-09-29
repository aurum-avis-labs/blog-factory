---
name: seo-blog
description: >-
  Plans and writes SEO blog batches for blog-factory brands: topic clusters,
  funnel stages, localized MDX, related posts, and Unsplash or Higgsfield
  images. Use when writing, translating, or queuing blog posts, SEO content,
  comparisons, alternatives, or a content batch for a brand.
---

# SEO blog writing

Write posts that a specific reader can use. A large batch is a planned cluster of distinct queries, published in waves. It is not many copies of one article.

## Read before writing

1. `brands.config.ts` for that brand: languages, domain, display name.
2. `context/{brand}/` strategy, topic queue, and image guide. Brand files override generic advice. Do not rewrite them.
3. Existing `brands/{brand}/{lang}/*.mdx` so you do not retarget a query that already has a URL.
4. Then the file you need:
   - [frontmatter.md](frontmatter.md) for the schema
   - [query-map.md](query-map.md) for funnel, query types, and length
   - [batch.md](batch.md) for the queue and wave size
   - [blocks.md](blocks.md) for HTML fact rows, steps, callouts, and tables
   - [images.md](images.md) for the single hero (Unsplash or Higgsfield)
   - [seo-2026.md](seo-2026.md) for what to refuse

## Workflow

1. **Plan the whole batch first.** Write `context/{brand}/batches/{yyyy-mm-dd}-{slug}.md` using the template in [batch.md](batch.md). One row is one article, not one language file. Do not start MDX until the plan has distinct primary queries.
2. **Reject rows** that match an existing post, repeat a query with a swapped synonym, or sit outside the brand ICP.
3. **Write one wave** (8–12 articles). Finish every language in `brands.config.ts` for each article before the next article.
4. **English first** when `en` is a brand language. `translationKey` is the English slug. Other locales get a localized slug, the same `funnelStage`, the same `translationKey`, and `relatedPosts` in that language.
5. **One hero per article**, shared by every locale. No inline photos. Follow [images.md](images.md). Use a block from [blocks.md](blocks.md) where a limit, sequence, or comparison would otherwise need a picture.
6. **Stop after the wave.** Leave later rows unwritten. Open a PR. Do not push `main` unless the user asks.

## Each article

- One primary query, one intent. Put that query in the title, the first paragraph, and one H2.
- Answer the query in the opening. Later sections add the next questions a searcher actually has (limits, cost, who should skip, how it differs).
- Length comes from [query-map.md](query-map.md). Hit the **floor** in every language so the page actually answers the query. Stop at the **ceiling** when the next section would repeat. Substantial and useful beats short. A 1–2 minute read is not an SEO page unless it is a glossary that already cleared 400 words and is done.
- 3–5 secondary phrases, used where they belong. No stuffing.
- 1–3 `relatedPosts` in the same language, same or higher funnel. Also link one of them in the body with the path pattern that brand already uses (`/blog/...` or `/{lang}/blog/...`).
- CTA only to a URL that already exists in that brand's context. Awareness stays light. Consideration can name the product and say when not to use it.
- Comparisons name who each option is for and who should skip it. Prices and feature claims come from the vendor page at write time. If you cannot verify a number, omit it.
- Stats that are not yours get a source link and are labeled as someone else's measurement.
- Voice: calm, specific, no hype, no exclamation marks in body copy, no em dash (U+2014). Short paragraphs. Headings start at H2. No `---` in the body.
- Prefer a block from [blocks.md](blocks.md) over a decorative photo. Most posts need one or two blocks, not the whole set.
- Locale voice comes from the brand file (for Aurum German, de-CH: ss, not ß).

## Length (reviewers)

This is a ship rule, not a style hint. The 2026-09-29 audit left 1–2 minute posts in place because an older line said the bands were ceilings only. That was wrong.

- Assign a type, then treat the query-map band as floor–ceiling.
- Fail any locale under the floor. Expand all languages of that article. Do not "prefer short."
- Fail a locale that is only a keyword-swapped stub of English.
- Do not add a recap, a synonym H2, or a second pillar to hit the floor. Add the missing adjacent answers (limits, who should skip, one worked example, sourced numbers you can verify).
- Stop at the ceiling. Ten-minute padding is also a fail.

## Ship shape

New wave files use `draft: true` unless the user says this wave is ready to schedule. When they are ready, stagger `pubDate` about 2–3 days apart in `Europe/Zurich`. `draft: false` plus a due `pubDate` is what `scripts/dispatch-due-deploys.ts` sends live. Pushing `main` can also trigger `auto-publish.yml`. Never edit `.github/`.

## Hard stops

- Do not publish many pages whose main job is to rank. Google treats that as scaled content abuse, including when AI writes them, and a site-wide quality signal can demote the rest of the domain. See [seo-2026.md](seo-2026.md).
- Do not invent customers, quotes, ratings, or results.
- Do not invent `relatedPosts` slugs.
- Do not keyword-swap one draft across cities, tools, or years.
- A translation that only swaps the keyword into another language is not a locale. Write the query people use in that language.
- Do not ship a post, or a locale of a post, below the query-map floor. "Word count is not a ranking factor" is not permission to leave a comparison at 300 words or a DE/FR/IT stub at 90. When you audit existing posts, below-floor URLs fail and you expand them in every language. You do not leave them because the old skill said the band was only a ceiling.
