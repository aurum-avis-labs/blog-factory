# Writer brief: Aurum SME cluster, wave 3

You write blog posts for **aurum-avis-labs.ch** (Aurum Avis Labs GmbH, Oberägeri ZG). Reader: owners, managing directors, office, ops and finance leads of Swiss SMEs (5–80 people, little or no in-house IT). They do repetitive office work by hand and want to know what is worth automating, what it costs and whether it is allowed. The blog funnels them to the **Prozess-Check** (primary), the **KI im Unternehmen Workshop**, or **KI-Integration**.

All paths below are relative to the blog-factory repo root. `PLAN` = `context/aurum/batches/2026-09-30-wave-3`.

## 1. Read first (in this order)

1. `context/aurum/company-blog-strategy/STRATEGY.md`: ICP, anti-ICP, research sources, anti-patterns, CTA rules.
2. `.cursor/skills/seo-blog/SKILL.md`, `query-map.md`, `blocks.md`, `frontmatter.md`, `seo-2026.md`.
3. Voice reference: `PLAN/reference/landing-prozess-check-de.json` (German) and `...-en.json`. This is the tone Swiss reviewers approved for the Prozess-Check page: Sie, plain office German, short sentences, concrete. Read it.
4. Exemplars (match structure and density, not wording):
   - awareness overview: `brands/aurum/de/ki-in-der-treuhand.mdx` + `brands/aurum/en/ai-for-swiss-fiduciaries.mdx`
   - how-to: `brands/aurum/de/regierapport-zur-rechnung.mdx` + `brands/aurum/en/daywork-report-to-invoice.mdx`
   - checklist/template: `brands/aurum/de/automatisierung-nutzen-berechnen.mdx` + `brands/aurum/en/calculate-automation-benefit.mdx`
5. `PLAN/calendar.json`: every post of the cluster (103) with `seq`, pubDate, funnel, slugs; for wave 3 also type, floor/ceiling, queries, CTA, relatedPosts, angle, verify and overlap notes. `PLAN/TOPICS.md` shows the same briefs readable.
6. The existing posts named in your topics' relatedPosts and "Keep apart from" notes, so you link them and do not repeat them.

## 2. Workflow per topic (persist as you go)

Work one topic at a time and write each file to disk as soon as it is done. Sessions get cut off; anything on disk survives.

1. **Research note** `PLAN/research/{translationKey}.md` (template in section 10). Verify facts, collect source URLs, note what you could not verify. Commit.
2. **English post** `brands/aurum/en/{en_slug}.mdx`.
3. **German post** `brands/aurum/de/{de_slug}.mdx`, written as German for the German query, not translated.
4. **Hero prompt** `PLAN/prompts/{translationKey}.txt` (format in section 9).
5. Run `python3 PLAN/tools/validate.py {translationKey}`, fix every ERROR, commit, then set `"status": "written"` for that topic in your final report (the QA agent updates calendar.json, not you).

## 3. Frontmatter (exact order, no `image` line)

```yaml
---
title: "..."
description: "..."
pubDate: YYYY-MM-DD
author: "Aurum Avis Labs"
tags: ["...", "...", "..."]
funnelStage: interest
translationKey: english-slug
relatedPosts: ["same-language-slug", "..."]
draft: false
---
```

- `title`: contains the primary query of that language; specific; aim under ~65 characters.
- `description`: **under 160 characters**; says what the page decides or explains.
- `pubDate`, `funnelStage`, `translationKey`: exactly as in calendar.json.
- `tags`: 3 lowercase topic labels in the post's language. No product brand tags.
- `relatedPosts`: the keys from calendar.json mapped to that language's slug.
- No `image` line. The hero agent adds it once `hero.jpg` exists (a missing file breaks the Astro build).

## 4. Body rules

- Starts with an H2 (`## `). No H1. No `---` line. H3 under H2 is fine.
- One primary query. Put it in the title, the first paragraph and one H2.
- **Answer the query in the first paragraph.** Then one H2 per adjacent question (limits, cost, who should skip, how it differs, what to do first), each opening with a direct answer sentence.
- One worked example for how-to and checklist types, **clearly hypothetical** («Ein erfundenes Beispiel: …»). No invented company names, customers, quotes, ratings or results.
- 1–2 blocks from `blocks.md`, exact markup and class names. Tables as markdown tables.
- Practical close: what to do next, plus the CTA (section 7).
- Voice: calm, specific, no hype, **no exclamation marks**, **no em dash (U+2014)**. En dash (–) only for ranges. Short paragraphs.
- **MDX safety:** no raw `{` `}` in prose, no `<` followed by a letter outside the block HTML, no HTML comments, no `<br>`. Close every tag.

## 5. Language rules

**German (de-CH, the SEO target):** Sie / Ihnen / Ihr, never du/ihr/euch. Swiss spelling: **ss, never ß**. Quotes «so». `CHF 3'200`, `CHF 50–150`. Plain office words: «Umsetzung» (not «Bau» for software), «Termin/Gespräch» (not «Call»), «Ablauf», «Arbeit», «Betrieb», «KMU», «Geschäftsleitung». Use the German term people search for (e.g. «Mahnwesen», «Spesenabrechnung», «Inventur», «Regierapport», «Kostengutsprache»).

**English (hreflang twin, still a full page):** British spelling (licence, organisation, digitalisation). Swiss context kept (CHF, nDSG/FADP, Swiss software names). Same structure, blocks, facts, CTA and funnel.

## 6. Length (hard rule)

Body words without frontmatter and HTML tags. Each language **at or above the floor** of the topic type, stop near the ceiling (validator warns above ceiling +10 %). German counts run lower; plan German about 10 % above the floor. Do not pad; add the missing adjacent answers.

## 7. Links and CTAs

**Paths.** DE blog `/de/blog/{de_slug}`, EN blog `/blog/{en_slug}`. Allowed pages:

| Page | DE | EN |
|---|---|---|
| Prozess-Check offer | `/de/prozess-check` | `/prozess-check` |
| Prozess-Check booking | `/de/prozess-check/buchen` | `/prozess-check/buchen` |
| KI im Unternehmen Workshop | `/de/services/ai-in-business` | `/services/ai-in-business` |
| KI-Integration | `/de/services/ai-implementation-consulting` | `/services/ai-implementation-consulting` |
| KitchenCrew case | `/de/portfolio/kitchencrew` | `/portfolio/kitchencrew` |

**Order rule for body links (important):** link in the body only to cluster posts with a **lower `seq`** than your post. Posts with a higher seq are not live yet and return 404. relatedPosts may include later posts (the site hides them until live). At least one body link to an earlier cluster post when one fits. Never link the MVP/startup posts (anything not in calendar.json).

**CTA codes:**

- `check-soft` (awareness): one or two light sentences near the end linking the Prozess-Check offer.
- `check` (interest): short closing section on when the Prozess-Check fits (one recurring manual task, 60 minutes, you leave with a case and a price range), link the offer page.
- `check-book` (consideration): link booking plus offer page, and say who should not book.
- `workshop` / `workshop-soft`: Workshop page as main link; one sentence that a single concrete task is a Prozess-Check case.
- `integration`: KI-Integration page as main link; one sentence that the Prozess-Check is the small entry point.

## 8. Facts about Aurum (only these)

Prozess-Check (live page):
- 60 minutes via Microsoft Teams, **CHF 99**, paid by card via Stripe when booking. Aurum Avis Labs is not VAT-registered, no MWST is added.
- Bring one recurring task; describing it is enough, no customer data needed.
- Afterwards: where to start, whether it pays off, a price range and rough duration, a short written summary.
- Money back if the hour finds nothing worth automating (appointment must have taken place). Rescheduling free up to 12 h before. The hour commits to nothing. CHF 99 credited if implemented.
- German, Swiss German, English. Works with any program that has an API.
- Packages (guide prices, fixed price in writing after the Check, tests included, not billed by the hour): Small 2–3 days CHF 3'200–4'800; Medium 7 days approx. CHF 14'000; Large 10 days approx. CHF 20'000 (with documentation and handover); Max from 12 days, from CHF 25'000.
- Operation: hosting CHF 50–150 per month plus AI service costs by usage, cancellable any time.
- Robert Schlittler, co-founder, builds and runs the automations; co-founder Riccardo Conti is responsible for security and data protection. Founded 2024.

Workshop and KI-Integration: only what `PLAN/reference/service-ai-in-business-*.ts` and `service-ai-integration-*.ts` say (e.g. workshop half day CHF 3'960, full day CHF 7'480, up to 20 participants).

Built and claimable: Microsoft 365 (Graph, Outlook, Bookings, Teams), Google Workspace (Sheets, Apps Script, Drive), Stripe. **Not** built: bexio, Abacus or vertical-software integrations. Name those only as the reader's systems; state a product feature or API only if verified on the vendor's own page; otherwise «was Ihr Programm an Schnittstellen bietet, klären wir im Check».

Real cases you may reference (link, do not retell): KitchenCrew (`kitchencrew-supplier-ordering-case`), our booking flow (`booking-with-payment-case`), our Google Workspace download gate (`automate-google-workspace`). No metrics exist for any of them.

## 9. Hero prompt file

```
translationKey: {translationKey}
path: brands/aurum/images/{translationKey}/hero.jpg (1200x675, JPEG)
prompt: {one Higgsfield prompt, 60–110 words}
alt_de: {German alt text, under 120 chars}
alt_en: {English alt text, under 120 chars}
```

Follow `context/aurum/context-files/aurum_avis_labs_blogpost_image_instructions.md`: near-black background, restrained gold (#D4AF37), one visual idea that shows this article's subject, negative space. No words, letters, numbers, logos, UI text, people's faces, stock handshake or laptop. It must differ visibly from the prompts already in `context/aurum/batches/2026-09-30-sme-cluster-wave-2-hero-prompts.txt`.

## 10. Research note template (`PLAN/research/{translationKey}.md`)

```markdown
# {translationKey}
Primary query DE / EN: ...
SERP (top results seen, what they cover, the gap we fill): ...
Verified facts (one per line, each with URL and access date):
- ...
Vendor / product features used (URL each): ...
Not verifiable, therefore left out: ...
Internal links planned (seq-checked): ...
```

Research rules: verify every external fact at write time (laws, deadlines, rates, vendor features, prices, statistics) and link it inline. Prefer fedlex.admin.ch, edoeb.admin.ch, kmu.admin.ch, estv.admin.ch, ahv-iv.ch, seco/arbeit.swiss, bag.admin.ch, finma.ch, ebill.ch/six-group.com, Microsoft Learn, Google Workspace help, vendor sites. Other people's statistics are labelled as theirs. If you cannot verify it, leave it out. Legal topics: practical, not legal advice, point to the adviser.

## 11. Anti-patterns (reject)

Tool listicles without a decision, prompt lists, marketing-copy tips, invented cases or numbers, a post that is the same outline as another with the industry swapped (every industry post needs that industry's own workflow, vocabulary and limits), repeating an existing post instead of linking it, urgency tricks, promising integrations Aurum has not built.
