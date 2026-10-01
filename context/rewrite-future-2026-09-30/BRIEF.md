# Rewrite brief: future blog posts

You rewrite scheduled posts already on disk. You do not add new URLs, and you do not touch Aurum posts whose frontmatter `site` is `studio`.

Repo: `/Users/robertschlittler/Coding/blog-factory`.

## Read before the first sentence

1. This file.
2. `.cursor/skills/seo-blog/SKILL.md`
3. `.cursor/skills/seo-blog/blocks.md`
4. `.cursor/skills/seo-blog/query-map.md`
5. `.cursor/skills/seo-blog/frontmatter.md`
6. `.cursor/skills/seo-blog/seo-2026.md`
7. The brand file for each article you own. Brand files win when they conflict with the skill.

Brand files:

- Aurum Prozess-Check: `context/aurum/company-blog-strategy/STRATEGY.md` (sections 2, 4, 5, 6, 7) and `context/aurum/company-blog-strategy/HANDOFF-TO-BLOG-WRITER.md`
- Aurum Security: `context/aurum/security-blog-strategy/RESEARCH.md` (sections 2, 4, 5, 11) and `context/aurum/batches/security-2026-09-30/WRITER-BRIEF.md` for facts, CTAs, and link rules. Also `context/aurum/batches/security-2026-09-30/research/{translationKey}.md` when that file exists. Do not edit `calendar.json` or that writer brief.
- Vemoir: `context/vemoir/brand-context.md` sections 3.2 through 3.7
- Postology: `context/postology/brand-context.md` and `context/postology/content-strategy-autopilot.md`
- Holist-IQ: `context/holist-iq/brand-context.md` and `context/holist-iq/content-strategy-autopilot.md`
- Inklets: the files live in `brands/canvas-games/`. Read `context/canvas-games/brand-context.md` and `context/inklets/content-strategy-autopilot.md`
- CitySage: `context/citysage/content-strategy-autopilot.md`

## What you are fixing

The post is already scheduled. Read every locale, then research the query and the questions beside it (the limit, the cost, who should skip it, how it differs from the neighbour post). Write the article again so a searcher gets a real answer, not a thin outline.

Each locale is its own article for the query people use in that language. A sentence-by-sentence translation fails. Facts stay the same across locales. Examples, law names, and search phrases change with the language.

Security posts are often short. Expand them when the adjacent questions are real. Do not pad a long post past the ceiling below.

## Length

Stop when the question is answered. These bands are the floor and the ceiling:

- Glossary or "what it is": 700–1'100 words
- Problem or cost: 900–1'400
- How-to, checklist, audit: 1'100–1'700
- Comparison or alternative: 1'300–2'000

Vemoir's own bands win: how-to and troubleshooting 1'200–2'000, guides 1'500–2'500, alternatives and best-of 2'500–3'500 (`context/vemoir/brand-context.md` section 3.6).

A post already inside its band still gets a full pass on the query, the voice, and the visual rhythm. It does not get filler to hit the ceiling.

## Visual rhythm

Read `blocks.md`. Use those blocks to give the article a pleasant visual rhythm. You decide which blocks belong where.

Where the brand file requires a FAQ as a localized H2 plus markdown `###` (Vemoir: `Frequently asked questions`, `Häufige Fragen`, `Questions fréquentes`, `Domande frequenti`), keep that form. Do not also wrap those questions in `div.blog-faq`.

Aurum Security may use only these classes, because `scripts/aurum/validate.py` rejects anything else: `blog-facts`, `blog-kicker`, `blog-stat`, `blog-steps`, `blog-flow`, `blog-callout`, `blog-callout--limit`, `blog-pair`, `blog-checklist`, `blog-scenarios`, `blog-faq`, `blog-faq-q`.

## Voice

Calm, specific, no hype, no exclamation marks in the body, no em dash (U+2014). A comma, a colon, a full stop, or parentheses. No "in today's world" opening. No recap that adds nothing.

Machine tells to remove while you rewrite:

- Antithesis chains (`nicht X, sondern Y`, `not X but Y`, and the same shape in French and Italian). One in a whole article is already a lot.
- Sentences written to be quotable, with no instruction in them.
- Three parallel items where two would do.
- Empty intensifiers and bloodless verbs (`erfolgt`, `ermöglicht`, `im Rahmen von`).
- Every paragraph the same length.

Address, and do not flip it:

- Aurum German: **Sie**, de-CH **ss never ß**, quotes «so». «Termin» or «Gespräch», not «Call». «KMU», «Betrieb». English: British spelling.
- Vemoir: EN you, US spelling. DE **du**, ss never ß. FR **vous**, non-breaking space before : ; ? !. IT **tu**.
- Holist-IQ, Postology, Inklets, CitySage: keep the address already in that file.

Do not invent customers, quotes, ratings, or results. A made-up walkthrough is labeled (`Ein erfundenes Beispiel:` / `A made-up example:` / the same in FR and IT). No fake company name.

Numbers that are not the brand's get a source link and are labeled as someone else's measurement. If you cannot verify a price or a feature, leave it out. Vemoir comparisons: vendor pages at write time, and "as of September 2026" on facts that change.

## Frontmatter

Keep, unchanged: `title` may be sharpened if it still contains the primary query and stays specific, but do not change the filename. Keep `pubDate`, `author`, `funnelStage`, `translationKey`, `relatedPosts`, `site`, `draft`, `tool`, and `image` exactly. Do not invent `relatedPosts` slugs.

`description` stays under 160 characters. Vemoir: 120–155, keyword in the first 60, title 50–65 characters.

Add `updatedDate: 2026-09-30` on a new line directly under `pubDate` when the body materially changes.

**Exception: Aurum `site: security`.** Do not add `updatedDate` or any other key. The validator requires this order and nothing else (optional `image` directly before `draft`):

```yaml
title
description
pubDate
author
tags
funnelStage
translationKey
relatedPosts
draft
site
```

Tags stay 3–5 (Vemoir 2–4), in that language, not synonyms of the title.

## Links

Keep internal links that already resolve. Do not add a link to a post whose `pubDate` is after this article's `pubDate`. Body links follow the path pattern already in that brand (`/de/blog/...`, `/blog/...`, `/de/security/blog/...`, `/security/blog/...`).

Aurum Security, from the writer brief: blog links only inside the security cluster, and only to an earlier `seq` in `calendar.json`. Prozess-Check links only if that post's date is on or before this post. Other internal paths only `/de/security`, `/de/security/security-awareness`, `/de/security/datenschutz` and the English twins. No `/blog/`, no booking URL, no MVP URL. Prices CHF 1'190 and CHF 2'190 only in the two posts named in the security writer brief. Do not write «konform» or «rechtssicher».

Aurum Prozess-Check: CTA only to the live URLs in STRATEGY.md section 2. No MVP cluster links (STRATEGY.md section 6). Prozess-Check price is CHF 99 when you mention it. Packages are ranges, called Richtwerte, and they stay out of awareness posts.

Delete pasted closers that are not about this query, including the headings «Praxis im Schweizer KMU ohne CISO» and «Fragen von VR und Versicherung» when they are the shared block rather than a point this article earned. Repair broken lines (a stranded word such as `Die` before a heading).

## MDX

Body starts at `##`. No H1. No `---` in the body. No raw `{` or `}` in prose. No HTML comments. No `<br>`. No inline images. No imports.

## Files you may write

Only the MDX paths assigned to you, plus one note per article:

`context/rewrite-future-2026-09-30/done/{brand}--{translationKey}.md`

```markdown
# {brand}/{translationKey}
- de: {old} -> {new} words, {path}
- en: {old} -> {new} words, {path}
## What changed
Two or three sentences: which queries you added, what you verified, what you left out.
```

List every locale. Do not edit `manifest.json`, `calendar.json`, `.github/`, images, or any file whose `site` is `studio`. If an assigned file has `site: studio`, skip it and say so in the note.

Do not commit. Do not push.
