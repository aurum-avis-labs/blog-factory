---
name: seo-blog
description: >-
  Plans and writes SEO blog batches for blog-factory brands: topic clusters,
  funnel stages, localized MDX, related posts, and Unsplash or Higgsfield
  images. Use when writing, translating, or queuing blog posts, SEO content,
  comparisons, alternatives, or a content batch for a brand.
---

# SEO blog writing

You write SEO blog content. Brainstorm the queries, keywords, and topics a specific reader actually searches, research them, and write the article. A large batch is a planned cluster of distinct queries, published in waves. It is not many copies of one article.

## Read before writing

1. `brands.config.ts` for that brand: languages, domain, display name.
2. `context/{brand}/` strategy, topic queue, and image guide. Brand files override generic advice. Do not rewrite them.
3. Existing `brands/{brand}/{lang}/*.mdx` so you do not retarget a query that already has a URL.
4. Then the file you need:
   - [frontmatter.md](frontmatter.md) for the schema
   - [query-map.md](query-map.md) for funnel and query types
   - [batch.md](batch.md) for the queue and wave size
   - [blocks.md](blocks.md) for the allowed HTML blocks (facts, steps, callouts, tables, and the rest of that list)
   - [images.md](images.md) for the single hero (Unsplash or Higgsfield)
   - [seo-2026.md](seo-2026.md) for what to refuse

## Workflow

1. **Plan the whole batch first.** Write `context/{brand}/batches/{yyyy-mm-dd}-{slug}.md` using the template in [batch.md](batch.md). One row is one article, not one language file. Do not start MDX until the plan has distinct primary queries.
2. **Reject rows** that match an existing post, repeat a query with a swapped synonym, or sit outside the brand ICP.
3. **Write one wave** (8–12 articles). Finish every language in `brands.config.ts` for each article before the next article.
4. **English first** when `en` is a brand language. `translationKey` is the English slug. Other locales get a localized slug, the same `funnelStage`, the same `translationKey`, and `relatedPosts` in that language.
5. **One hero per article**, shared by every locale. No inline photos. Follow [images.md](images.md). Use a block from [blocks.md](blocks.md) where a limit, sequence, or comparison would otherwise need a picture.
6. **Run the gate.** Before any file gets `draft: false`, or leaves the wave ready to schedule, run [qa.md](qa.md) on every locale and fix what it reports.
7. **Stop after the wave.** Leave later rows unwritten. Open a PR. Do not push `main` unless the user asks. Leave a short retro (see [qa.md](qa.md)) for the next batch.

## Each article

- One primary query, one intent. Put that query in the title, the first paragraph, and one H2.
- Answer the query in the opening. Later sections add the next questions a searcher actually has (limits, cost, who should skip, how it differs).
- Research the query and the questions around it, then write the article. A page that only names the query is not done. A locale that only swaps the keyword is not done.
- 3–5 secondary phrases, used where they belong. No stuffing.
- 1–3 `relatedPosts` in the same language, same or higher funnel; verify each slug exists as a file in that language. Also link one of them in the body with the path pattern that brand already uses (`/blog/...` or `/{lang}/blog/...`). Body links point only at posts that are already live when this post publishes; `relatedPosts` may point forward.
- CTA only to a URL that already exists in that brand's context. Awareness stays light. Consideration can name the product and say when not to use it.
- Comparisons name who each option is for and who should skip it. Prices and feature claims come from the vendor page at write time. If you cannot verify a number, omit it.
- Stats that are not yours get a source link and are labeled as someone else's measurement. No meta commentary in the body: no writer notes, no remarks about the search results or the article itself.
- Voice: calm, specific, no hype, no exclamation marks in body copy, no em dash (U+2014). Short paragraphs. Headings start at H2. No `---` in the body.
- Use blocks from [blocks.md](blocks.md) to make the post visually appealing and scannable instead of reaching for more photos. Use the ones the article needs; give each block its own content; keep one FAQ section under its own localized H2; do not invent a class. The Showcase brand is the specimen, not the pattern to copy.
- Locale voice comes from the brand file (for Aurum German, de-CH: ss, not ß).

## Ship shape

New wave files use `draft: true` unless the user says this wave is ready to schedule. When they are ready, run [qa.md](qa.md), then stagger `pubDate` in `Europe/Zurich` (2–3 days apart by default; a researched cluster of distinct queries may run weekdays). Schedules are per `site`: worlds on one host keep separate calendars, two sections may publish on the same date, and one section keeps one article per date. `draft: false` plus a due `pubDate` is what `scripts/dispatch-due-deploys.ts` sends live. Pushing `main` can also trigger `auto-publish.yml`. Never edit `.github/`.

## Hard stops

- Do not publish many pages whose main job is to rank. Google treats that as scaled content abuse, including when AI writes them, and a site-wide quality signal can demote the rest of the domain. See [seo-2026.md](seo-2026.md).
- Do not invent customers, quotes, ratings, or results.
- Do not invent `relatedPosts` slugs.
- Do not keyword-swap one draft across cities, tools, or years.
- A translation that only swaps the keyword into another language is not a locale. Write the query people use in that language.
- Do not ship a post that only names its query, or a locale that is a stub of another language. When you audit existing posts, unfinished URLs fail and you expand them in every language.
