# Batches and waves

A **batch** is the full plan (often 30–90 articles). A **wave** is the 8–12 articles you write in one pass, in every language configured for the brand.

One article × four languages is four MDX files and one image set. Count articles in the plan, files on disk.

## Before the plan

- Read the brand strategy and any existing queue. Do not re-queue a topic that is already drafted or published.
- List live slugs and titles per language.
- Note offer URLs you are allowed to link. If the strategy has an anti-ICP, those topics are out.

## Plan file

Create `context/{brand}/batches/{yyyy-mm-dd}-{slug}.md`. Do not overwrite `STRATEGY.md` or an existing topic queue.

```markdown
# {Brand} batch — {date}

Audience: ...
Offer URLs: ...
Languages: en, de
Mix: 35 / 40 / 25

| ID | Wave | Type | funnelStage | Primary query | EN slug | Length | Image | Status |
|----|------|------|-------------|---------------|---------|--------|-------|--------|
| 1 | 1 | problem | awareness | ... | ... | 900 | unsplash | planned |
```

Add columns for each other language's slug when you know them. `Status` moves `planned` → `drafted` → `scheduled`.

Drop a row when:

- an existing post already answers that query
- two rows would rank for the same intent
- the only difference is a year, a city, or a synonym
- the topic is outside the ICP

## Writing a wave

1. Mark the wave in the plan.
2. For each article: English MDX, then the other locales, then images.
3. `relatedPosts` may point at other slugs in the same wave once those files exist. Fix the links before the PR.
4. `draft: true` on every new file.
5. Open a PR that contains that wave only. Say what was verified (competitor pages, sources) and what was not.
6. Leave the rest of the batch as rows.

## Going live

Only after the user accepts the wave:

- set `draft: false`
- set `pubDate` values about 2–3 days apart, not all on today
- merge, or leave the dates for `scheduled-publish.yml` (`scripts/dispatch-due-deploys.ts` skips drafts and future dates)

Do not dump a finished batch onto `main` with today's date.
