# Batches and waves

A **batch** is the full plan (often 30–90 articles). A **wave** is the 8–12 articles you write in one pass, in every language configured for the brand.

One article × four languages is four MDX files and one image set. Count articles in the plan, files on disk.

## Before the plan

- Read the brand strategy and any existing queue; the new plan starts where the drafted and published topics end.
- List live slugs and titles per language.
- Note the offer URLs the brand context links.

## Plan file

Create `context/{brand}/batches/{yyyy-mm-dd}-{slug}.md` as a new file; `STRATEGY.md` and earlier queues stay as they are.

```markdown
# {Brand} batch — {date}

Audience: ...
Offer URLs: ...
Languages: en, de
Mix: 35 / 40 / 25

| ID | Wave | Type | funnelStage | Primary query | EN slug | Image | Status |
|----|------|------|-------------|---------------|---------|-------|--------|
| 1 | 1 | problem | awareness | ... | ... | unsplash | planned |
```

Add columns for each other language's slug when you know them. `Status` moves `planned` → `drafted` → `scheduled`.

A row stays when it has its own primary query and decision. Rows give way when an existing post already answers that query, two rows share one intent, the only difference is a year, a city, or a synonym, or the topic sits outside the ICP.

The type says what the page must do. Research that query, then write it.

## Writing a wave

1. Mark the wave in the plan.
2. For each article: English MDX, then the other locales, then images.
3. Read each locale; it is `drafted` when it finishes the query on its own terms.
4. `relatedPosts` may point at other slugs in the same wave once those files exist. Fix the links before the PR.
5. `draft: true` on every new file.
6. Open a PR that contains that wave only. Say what was verified (competitor pages, sources). Note any file that still needs work.
7. Leave the rest of the batch as rows.
8. Run [qa.md](qa.md) on the wave; every locale passes the standard before the wave is ready to schedule.

When you audit posts that already exist, expand every language of that `translationKey`; the fix covers all locales, even where blocks or images already look fine.

## Going live

Only after the user accepts the wave:

- run the [qa.md](qa.md) gate on every file and fix what it reports
- set `draft: false`
- set `pubDate` values about 2–3 days apart, spread across the calendar
- merge, or leave the dates for `scheduled-publish.yml` (`scripts/dispatch-due-deploys.ts` skips drafts and future dates)

Schedules are per `site`: worlds on one host keep separate calendars. Two sections may publish on the same date; inside one section keep one article per date. A new section's schedule may start as soon as its posts pass the gate, even while another section is still running.

The batch reaches `main` with its staggered dates.
