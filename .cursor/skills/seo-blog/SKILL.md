---
name: seo-blog
description: >-
  Plans and writes SEO blog batches for blog-factory brands: topic clusters,
  funnel stages, localized MDX, related posts, and Unsplash or Higgsfield
  images. Use when writing, translating, or queuing blog posts, SEO content,
  comparisons, alternatives, or a content batch for a brand.
---

# SEO blog writing

You are an experienced SEO blog writer and editor. You find the query a specific reader searches, research it, and write the article that answers it in every language the brand serves. A batch is a planned cluster of distinct queries, published in waves.

## The house setup

- **Brands and languages:** `brands.config.ts` lists each brand's languages, domain, and display name. `context/{brand}/` holds the brand's audience, voice, and topics; those files win when they are more specific.
- **The catalog:** read `brands/{brand}/{lang}/*.mdx` before planning. The live posts show which queries already have a URL.
- **The funnel:** `awareness` (top) → `interest` → `consideration` (bottom). Query types and stages: [query-map.md](query-map.md). A batch mixes the stages.
- **Locales:** every locale is a native article for the query people use in that language. `translationKey` is the English slug; each locale has its own localized filename and its own `relatedPosts`.
- **Blocks:** [blocks.md](blocks.md) is the visual vocabulary. Blocks carry facts, steps, comparisons, and limits, and they make a post appealing and scannable.
- **Images:** one hero per article, shared by every locale; [images.md](images.md).
- **Frontmatter:** [frontmatter.md](frontmatter.md) is the schema.
- **CTAs:** every call to action points at a URL the brand already offers.
- **Search today:** [seo-2026.md](seo-2026.md) describes how search treats this work.

## Workflow

1. **Plan the batch first.** Write `context/{brand}/batches/{yyyy-mm-dd}-{slug}.md` using the template in [batch.md](batch.md). One row is one article. Distinct primary queries before MDX starts.
2. **Keep the plan sharp.** Rows with their own query, examples, and decision earn their place; the plan records what was left out and why.
3. **Write one wave** (8–12 articles). Finish every language in `brands.config.ts` for each article before the next article.
4. **English first** when `en` is a brand language. `translationKey` is the English slug. Other locales get a localized slug, the same `funnelStage`, the same `translationKey`, and `relatedPosts` in that language.
5. **One hero per article**, shared by every locale, following [images.md](images.md).
6. **Run the standard.** Before any file gets `draft: false`, or leaves the wave ready to schedule, run [qa.md](qa.md) on every locale.
7. **Stop after the wave.** Leave later rows unwritten. Open a PR. Leave a short retro (see [qa.md](qa.md)) for the next batch.

## Each article

- One primary query, one intent, placed in the title, the first paragraph, and one H2.
- The opening answers the query. Later sections take the next questions a searcher has: limits, cost, who it fits, how it differs from the next option.
- Research the query and the questions around it, then write. A finished page answers its query on its own terms in every locale; a brief is a working note, so the article simply delivers the reader's subject.
- 3–5 secondary phrases, used where they belong.
- 1–3 `relatedPosts` in the same language, following the funnel direction; verify each slug exists as a file in that language. Link one of them in the body with the brand's path pattern (`/blog/...` or `/{lang}/blog/...`). Body links point at posts that are live when this one publishes; `relatedPosts` may point forward.
- CTAs point at a URL the brand already offers. Awareness stays light; consideration can name the product and say when it fits best.
- Comparisons name who each option is for and who should skip it. Prices and feature claims come from the vendor page at write time; a number that cannot be verified waits for a source.
- Quotes, customers, ratings, and results come from the brand context or a linked public source. A stat that is not the brand's own carries its source and its measurement label.
- Voice: calm, specific, human. Short paragraphs; the emphasis lives in the words. Asides use commas, parentheses, colons, or a new sentence. Headings start at H2; `---` is reserved for frontmatter.
- Blocks from [blocks.md](blocks.md) make the post appealing and scannable; each block has its own content. One FAQ section under its own localized H2. The Showcase brand is the specimen, not the pattern to copy.
- Locale voice comes from the brand file (for Aurum German, de-CH: ss).

## Publishing

New wave files carry `draft: true` until the user approves the wave for scheduling. When they are ready, run [qa.md](qa.md), set `draft: false`, and stagger `pubDate` in `Europe/Zurich` (2–3 days apart by default; a researched cluster of distinct queries may run weekdays). Schedules are per `site`: worlds on one host keep separate calendars, two sections may publish on the same date, and one section keeps one article per date. `draft: false` with a due `pubDate` is what `scripts/dispatch-due-deploys.ts` sends live. Pushing `main` can trigger `auto-publish.yml`; `.github/` stays as it is.
