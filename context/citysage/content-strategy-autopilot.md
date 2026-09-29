# CitySage — Autopilot content strategy

**Stand:** 2026-09-28 · Owner: Robert (Autopilot) · Status: READY FOR WRITING AGENT  
**ICP source:** `citysage-icp` (2026-09-26, DRAFT)

## 1. Purpose

This document defines how blog-factory should produce CitySage content on autopilot: cadence, funnel mix, SEO boundaries, voice, and honesty rules tied to product maturity. It does **not** contain full articles. The ordered backlog lives in `topic-queue-2026-q4.md`.

## 2. Repo and brand status (gap note)

| Item | Status |
|------|--------|
| `brands/citysage/` | **Missing** — no MDX posts in blog-factory |
| `brands.config.ts` entry | **Missing** — CitySage not registered |
| `context/citysage/` | **Created** by this initiative (strategy + queue only) |
| Existing posts to link | **None** — first posts use `relatedPosts: []` until siblings exist |

**Before first publish PR:** add CitySage to `brands.config.ts` (id, repo, domain, languages) and create `brands/citysage/{lang}/`. Until then, writers may draft against this context; landing-page `fetch-blog` will not run for CitySage.

**Content elsewhere:** No CitySage references were found anywhere in this repository (grep 2026-09-28). If marketing copy lives only on a landing repo, treat this queue as the canonical blog plan once the brand folder exists.

## 3. Product snapshot (claims writers may make)

CitySage helps **travel enthusiasts** plan trip itineraries with AI and **share** those plans for social and travel-community use.

**Job-to-be-done:** Plan an itinerary with AI → optionally share or discover plans.

**North-star (growth):** Itineraries created and shared; influencer adoption is exploratory, not guaranteed.

**Honesty bar (maturity):** Position as an evolving social travel planning product. Describe AI itinerary generation and sharing as core value. Do **not** invent feature depth (live booking, expense reporting, offline maps, verified POI databases, “millions of users”) unless product confirms in writing.

## 4. ICP and anti-ICP

**Primary ICP:** Travel-passionate, younger, social-media-active people; includes **travel creators** who plan trips and want shareable, presentable itineraries.

**Anti-ICP (do not optimize content for):** Corporate expense / T&E tools; generic hotel or flight meta-search “booking engines”; bleisure expense policy content.

**Geo:** International, social-first (English-first queue; localize when `brands.config.ts` lists additional languages).

## 5. Autopilot operating model

| Parameter | Value |
|-----------|--------|
| Cadence | **2–3 quality posts per week** (not daily thin posts) |
| Horizon | **~8 weeks** → **16–24** queued topics (see queue file) |
| Release | **Wave 1:** six topics; **publish order** `#1→#2→#3` (Top-3 GO; #2+#3 P0 cluster), then **#4 Compare P0**, then #5 (PRODUCT) → #6 — see queue table; remainder drips unless search data reprioritizes |
| Output | One PR per article when writing starts (four locales only if brand config lists them; **start with EN only** until languages are confirmed) |
| Review | Human review before merge to `main`; autopilot does not merge |
| Quality gate | **Yaps bar:** no listicles without structure, no 800-word fluff, every post must teach a concrete workflow or decision |

## 6. SEO and intent themes (honest to product)

Primary theme clusters:

1. **AI itinerary / AI trip planning** — how it works, limits, when human curation still matters  
2. **Shareable travel plans** — groups, couples, creators, link-in-bio use cases  
3. **Itinerary structure** — days, pacing, neighborhoods, “one base vs multi-city” (evergreen, product-agnostic)  
4. **Creator / social angle** — planning content trips, reusable templates (light product tie-in)  
5. **Consideration** — category comparisons and “plan + share” workflows where CitySage is one honest option

**Avoid (thin or misleading):** “Best AI travel agent 2026” without sources; fake pricing tables; ranking booking sites; visa/legal advice; claiming SEO keywords the product does not support (e.g. “corporate travel policy template”).

Keywords in the queue are **starting hypotheses**, not measured volumes. Replace with Search Console / Keyword Planner / competitor SERP gaps when data exists; note changes in the PR description.

## 7. Funnel mix (GA4 / GTM)

Use only: `awareness` | `interest` | `consideration` (same value on every locale file of one article).

**Target mix for Q4 Wave 1 + drip (~20 topics):**

| Stage | Share | Role |
|-------|-------|------|
| `awareness` | ~35% | Category education, trip-planning literacy, social sharing culture |
| `interest` | ~45% | Problem + approach, AI planning workflows, creator/group use cases |
| `consideration` | ~20% | Honest comparisons, “plan and share” product fit, implementation-style guides |

When unsure between two stages, pick the **higher-intent** stage only if the draft truly earns it (named workflows, real tradeoffs). Otherwise stay lower to avoid thin consideration posts.

**relatedPosts:** Per blog-factory rules, link 1–3 same-language slugs with equal or higher funnel intent. With zero published posts, use `[]` for the first wave; update downstream posts as the catalog grows.

## 8. Voice and format

- **Voice:** Upbeat but grounded; peer-to-peer (travel friend, not corporate travel desk). Short paragraphs, concrete examples (city names, day splits), no hype (“revolutionary”, “game-changer”, “seamless”).
- **Structure:** Problem in the first screen; scannable H2/H3; one primary keyword; FAQ only when it adds real answers (not padding).
- **CTA:** Soft — try planning a sample trip, share with a friend, follow for the next guide. No fake urgency.
- **Images:** When brand folder exists, hero at `brands/citysage/images/{slug}/` per AGENTS.md; travel photography or clean itinerary mockups, no stock cliché overload.
- **Compliance:** No guaranteed prices, opening hours, or visa rules without citing official sources and “check before you go”.

## 9. Internal linking (future)

When posts exist, chain awareness → interest → consideration:

- Awareness posts link forward to interest guides (same trip theme).  
- Interest posts link to one consideration piece where CitySage “plan + share” is relevant.  
- Consideration posts link only to `consideration` (or `interest` if no peer consideration exists).

Document cross-links in each writing PR until a formal link map is added here.

## 10. Success signals (8-week window)

- **Publishing:** 16–20 live EN posts (2–3/week), Wave 1 six within weeks 1–2  
- **SEO:** Indexed URLs for primary cluster terms; impressions on “AI itinerary”, “shareable trip itinerary”, “AI trip planning” variants  
- **Product:** Track itinerary creates/shares (product analytics), not blog vanity metrics alone  
- **Quality:** Reviewer rejects &lt;10% for thin content; no compliance corrections on booking/expense claims

## 11. Dependencies and gates

| Gate | Action |
|------|--------|
| **GATE: BRAND** | Register CitySage in `brands.config.ts` + create `brands/citysage/en/` before first merge to `main` |
| **GATE: PRODUCT** | Any post naming a CitySage feature flag or roadmap item needs product owner ack in PR |
| **GATE: COMPARISON** | Competitor/alternative posts need feature claims verified on official sites (date in PR) |

## 12. Related files

- Topic backlog: `context/citysage/topic-queue-2026-q4.md`  
- ICP: attached `citysage-icp` (Robert, 2026-09-26)  
- Post schema and funnel rules: `.cursor/skills/seo-blog/SKILL.md` (this brief overrides the skill when they conflict)

## 13. Autopilot handoff (for the writing agent)

1. Read this strategy and the queue top to bottom.  
2. Confirm no duplicate topic in `brands/citysage/` (empty today).  
3. Write Wave 1 items 1–6 first, 2–3 PRs per week.  
4. Each PR: valid MDX frontmatter, `funnelStage` set, `relatedPosts` per rules, description &lt;160 chars.  
5. Mention `@rob-aalabs` on strategy/queue PRs; per-article PRs follow normal review.
