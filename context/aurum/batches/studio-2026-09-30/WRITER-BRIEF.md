# Writer brief: Aurum studio MVP blog

You write one SEO article for **aurum-avis-labs.ch**, site `studio`. Blog paths: `/blog/{slug}` and `/de/blog/{slug}`.

Readers, pick the one your calendar row is for:

- **G** Founder, idea or pre-seed, often no technical co-founder.
- **K** Swiss SME turning know-how into an app, a portal, or a small SaaS.
- **I** Innovation lead who must show the board a test, not a slide.
- **V** Someone who already built with Lovable, Bolt, v0, Replit, Cursor, or Claude Code.

Not the reader: an agency tender, a corporate IT team that only wants extra developers, a student essay, a hobby with no business, crypto speculation.

`PLAN` = `context/aurum/batches/studio-2026-09-30` in `/Users/robertschlittler/Coding/blog-factory`.

## Read

1. This file.
2. Your object in `PLAN/calendar.json` (`id` equals your assignment).
3. `.cursor/skills/seo-blog/blocks.md`.
4. Voice only, not the topic and not the CTA: `brands/aurum/de/auskunftsbegehren-dsg.mdx` and `brands/aurum/en/data-subject-access-requests.mdx`.
5. If your row has `html`, that file. Never `case-study-template`. Its 84 / 68 / 92 figures are placeholders.

`context/aurum/studio-blog-strategy/RESEARCH.md` sections 2, 5 and 8 are already distilled below. If a line says re-check, open the page or omit the figure.

## Write, then stop

1. `PLAN/research/{translationKey}.md`
2. `brands/aurum/en/{en_slug}.mdx`
3. `brands/aurum/de/{de_slug}.mdx` for `query_de`, not a translation of the English
4. `PLAN/prompts/{translationKey}.txt`

No images. No `image:` line. No git. Do not edit `calendar.json`, this brief, or another id's files.

## Frontmatter, exact order

```yaml
---
title: "..."
description: "..."
pubDate: YYYY-MM-DD
author: "Aurum Avis Labs"
tags: ["...", "...", "..."]
funnelStage: interest
translationKey: english-slug
relatedPosts: ["same-language-slug"]
draft: true
site: studio
---
```

- Copy `pubDate`, `funnelStage`, `translationKey`, and `relatedPosts` (`relatedPosts_en` or `relatedPosts_de`) from your row. `pubDate` is a placeholder. Leave it.
- `description` is under 160 characters after the quotes are removed.
- The title contains `query_en` or `query_de`. Those strings already use ss. Do not put ß into the file.
- `tags`: 3 to 5 lowercase labels in that language.
- No `image` line. `draft` stays `true`.

## Body

- Starts with `## `. No H1. No `---` line.
- Answer the query in the first paragraph. The query appears there and in one H2.
- Then the next real questions: the limit, who should skip, what it does not prove.
- One or two blocks. Classes only: `blog-facts`, `blog-kicker`, `blog-stat`, `blog-steps`, `blog-flow`, `blog-callout`, `blog-callout--limit`, `blog-pair`, `blog-checklist`, `blog-scenarios`, `blog-faq`, `blog-faq-q`, `blog-lede`, `blog-pull`, `blog-terms`.
- How-to and checklist rows (`type` H or C): one invented example, labeled `Ein erfundenes Beispiel:` / `A made-up example:`. No fake company name, quote, rating, or result. Rows M00 to M05 use the real case, not an invented example.
- About 800 to 1'300 words. Stop when the next section would repeat. Do not pad.
- Close with `cta_en` or `cta_de`, and put `bodyLink_en` or `bodyLink_de` in the body once.
- `crossLinks_*`: you may link those paths. If the array is empty, do not link a security post.
- `bodyAlso_*` and `portfolio_*`: link those when the row has them. M00 links all seven portfolio pages and the five case posts in `bodyAlso_*`. M01 to M05 each link their own portfolio page (`citysage`, `holist-iq`, `kitchencrew`, `postology`, `do4me`).
- Voice: calm, no hype, no exclamation marks, no em dash (U+2014). En dash only inside a number range. Short paragraphs. No recap section.
- MDX: no raw `{` or `}`. No `<` followed by a letter outside the block HTML. No HTML comments. No `<br>`.

German, de-CH: Sie, never du/ihr/euch. **ss, never ß**. Quotes «so». `CHF 1'900`. «Termin» or «Gespräch», not «Call».

English: British spelling. Same facts, same funnel, Swiss context kept where the query is Swiss. Tool and store articles may lead with the English query. Do not swap keywords and call it a translation.

## How hard the CTA is

| `cta` | EN | DE |
|---|---|---|
| PVP | `/services/mvp-validation` | `/de/services/mvp-validation` |
| VCR | `/services/vibe-code-review` | `/de/services/vibe-code-review` |
| LPP | `/services/landing-page-package` | `/de/services/landing-page-package` |
| CALL | `/contact` | `/de/contact` |

- awareness: one sentence and the link.
- interest: one short closing on when that offer fits.
- consideration: the offer, the conversation on the contact page, and who should not book.

Do not name a price for the 12-week package. Do not name Vibe Code Review or landing-page prices in this wave. None of these articles exist to explain the price list. Link the page.

Blog links to the 16 older studio posts use `/blog/...` and `/de/blog/...` as in `bodyLink_*`. Do not link `/prozess-check`.

## Offer facts you may state

Product validation package, from the service page:

- Weeks 1 to 4: product built and deployed. Azure, React, NestJS. Not a mockup. Not a landing page with a fake button.
- Weeks 5 to 6: positioning, landing page, paid acquisition on Google and LinkedIn.
- Weeks 7 to 10: cost per lead, conversion, drop-off. Up to three pivot iterations.
- Weeks 11 to 12: a Go, Pivot, or Stop recommendation, with what the data does not prove.
- Included: web app plus an iOS and Android app as a native wrap, ready to submit. Landing page, a basic brand, analytics and session recordings from day one.
- The customer owns the code, the designs, the data, and the documentation.
- Payment: cash, equity, or a mix. The split is discussed in the discovery conversation. No percentages.

Vibe Code Review: a review of apps built with Cursor, Lovable, v0, or Claude Code, against OWASP ASVS v5.0. Gap report, 8 hours on architecture and code quality, a P0/P1/P2 action list, a closing conversation, NDA. No prices in the article.

Landing page package: a page to test demand. GA4 and Microsoft Clarity. The customer owns the code. No prices in the article.

Aurum does not build the package with Lovable or Supabase. Tool articles stay neutral: when the tool is enough, and when a review or a production build is the next question.

The internal three-day benchmark (app, landing page, brand, ads, measurement, then feedback rounds) is how Aurum builds its own products. It is not the sold 12-week package. Do not offer customers a three-day build. The do4me 2.5-day build is that one client project, not a general promise.

## Inklets

React app wrapped with Capacitor, released on the iOS App Store and Google Play. Public page: https://inklets.app and `/portfolio/inklets`. You may say that in F02 and E03. No download counts, no review anecdotes, no promise that every wrap passes guideline 4.2. A wrapped app still needs app-like function. Apple rejects a repackaged website.

## Case studies

Source HTML, not the short portfolio blurb when they disagree. Link the portfolio page, where the PDF is requested after an email. Never link `/case-studies/....pdf`.

Portfolio: `/portfolio/{slug}` and `/de/portfolio/{slug}` for `citysage`, `holist-iq`, `do4me`, `postology`, `kitchencrew`, `inklets`, `vemoir`.

**CitySage** (internal). Weekend prototype, late 2024, AI city tours. Mid-2025 overhaul: mobile-first browser product, globe, manual and AI itineraries, Mapbox, sharing. Friends and family used it. A launch, Instagram, Product Hunt, and light Google Ads produced attention, not a repeatable acquisition channel. Pin accuracy needed guardrails. Do **not** publish the impression, spend, like, or signup figures. The HTML says to confirm them on the dashboards first.

**Holist-IQ** (internal). Weekend MVP, early 2025. React, TypeScript, causal-loop diagrams. Constrained agents, not a free chat. Early signals, not revenue, not product-market fit: 11 signups, 5 sessions over four minutes, 3 people came back, 2 hit the free credit limit, nobody bought credits. Campaign on the source screenshot: 5'293 impressions, 299 clicks, CTR 5.65 percent, average CHF 0.65 per click, cost CHF 194.81. Friction: mobile landing page, unclear credit purchase. Strongest early interest: modelling political interrelations.

**KitchenCrew** (internal venture and pilot). GoldCrew backbone. Inventory was taken out of the pilot. What remains: suppliers, articles, chat or speech-to-text, order drafts, email, spend. Built December 2025, pilot since April 2026, free in exchange for feedback. Warmest door: conversations and events in Zurich, not ads. Google Ads CPC in the HTML: CHF 1.80 in Zurich and Zug. 50 emails in a first small test. Do not invent a restaurant count. Ads produced clicks, not enough booked pilot calls yet.

**Postology** (internal). Built in 2024 before the company existed. Text does not belong in the image model. Overlays stay in the app. Instagram's API needed a legal entity, so publishing stayed manual. About 10 waitlist signups, no active ads. Still an internal tool, not a public launch. Ignore the portfolio line that sells it to creators and brands.

**do4me** (client, not an internal product). Zurich everyday help: residents and students. In 2.5 days: landing page, web app, listings, profiles, categories, applications, chat, Google Ads, GTM, Microsoft Clarity, QR and UTM links. Then 4 days of feedback and 1 day of iteration. Left out on purpose: payments, commissions, fixed prices, contracts, KYC, ratings, disputes, insurance. A wrap for iOS and Google Play was prepared and was not the first test. Early signal: 17 students, 4 people posting jobs, mostly friends and family. That did not prove marketplace liquidity. The next bottleneck was the demand side. Holding back payments was a scoping choice, not a legal opinion.

## Facts you may state, with the source

Omit the figure if you do not want to carry the source link. Do not upgrade a secondary write-up into a law.

- CVE-2025-48757: missing or ineffective row level security on Lovable-generated Supabase projects. The public client key allowed queries without login. 170+ apps. Reported March 2025, published 29 May 2025. Link https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Supabase region Zurich (eu-central-2) can be selected. https://supabase.com/docs/guides/platform/regions
- Apple guideline 4.2 Minimum Functionality: more than a repackaged website. 4.2.2: not a pure marketing app or web clipping. https://developer.apple.com/app-store/review/guidelines/
- Google Play: new personal developer accounts created after 13 November 2023 need a closed test, at least 12 testers, 14 days continuous. https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- Cookies in Switzerland: no general opt-in. Consent when profiling is high risk, for specially protected data, when data is passed to a third party for their own purposes, and for cross-site tracking and retargeting. Otherwise information and a way to object (Art. 45c FMG). EDÖB guide, 2025. Link the EDÖB guide if you open it.
- Employee software belongs to the employer (Art. 17 URG). An external author's copyright stays with the author until a written assignment. https://www.rentschpartner.ch/ict-law/schutz-von-software
- Ideas as such cannot be protected. https://www.ige.ch/de/uebersicht-geistiges-eigentum/ein-leitfaden-fuer-innovative-und-kreative/idee/koennen-ideen-geschuetzt-werden
- Trademark filing CHF 450 for one class, 10 years, renewal CHF 550. Recheck https://www.ige.ch/de/etwas-schuetzen/marken/faq
- GmbH: at least CHF 20'000, fully paid in at formation. https://www.kmu.admin.ch/de/gmbh-haftung-stammkapital-gruendung
- VAT duty from CHF 100'000 turnover. Voluntary registration exists. Do not go further without the ESTV page.
- TWINT is available through Stripe. https://stripe.com/en-ch/payment-method/twint
- Innosuisse Initial Coaching: voucher up to CHF 10'000, up to 12 months, start-ups up to 5 years (life science 10) with an innovative, science-based idea. https://www.innosuisse.admin.ch/de/initial-coaching-fur-start-up
- Venture Kick: up to CHF 150'000 in three stages (40'000 / 60'000 / 50'000). Confirm on venturekick.ch before you print the stages. If you cannot open it, say "up to CHF 150'000" only if you found that sentence on their site. Otherwise name the programme and skip the split.
- Swiss VC 2025: CHF 2.95 billion, up 24 percent on 2024, via the CMS note on the Swiss Venture Capital Report 2026. Link that note. Do not invent round sizes.

Do not invent CPC benchmarks, "good" conversion rates, app prices in francs, or pre-seed round sizes.

## Research note

```
# translationKey
## Verified
- fact: URL
## Not verified
- item
## Do not claim
- item from the calendar "apart" field
```

## Hero prompt file

```
translationKey: {translationKey}
path: brands/aurum/images/{translationKey}/hero.jpg (1200x675, JPEG)
prompt: {60–110 words, deep black background, sparse gold #D4AF37, one concrete subject for this article, no letters, no logos, no UI text, no stock handshake}
alt_de: {under 120 characters}
alt_en: {under 120 characters}
```

## Done when

The four files exist, the query is answered in the first paragraph, and the German piece can be read on its own.
