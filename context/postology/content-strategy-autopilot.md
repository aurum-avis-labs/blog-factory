# Postology — Autopilot content strategy

**Status:** DRAFT · **Owner:** Robert · **Mode:** Autopilot (~2–3 quality posts/week, EN-first drip) · **Horizon:** ~8 weeks (~16–24 publish slots) · **Queue doc:** [`topic-queue-2026-q4.md`](./topic-queue-2026-q4.md)

## Positioning anchor

**One-liner:** Social content automation — despite many AI tools, creators still click too much between idea, draft, schedule, and multi-platform publish.

Every article should tie back to **fewer clicks in one flow** (idea → post → schedule → multi-platform), not generic “AI social media tips.”

---

## ICP (primary)

| Dimension | Definition |
|-----------|------------|
| **Who** | Brands, solo creators, niche page operators, affiliate marketers, small businesses with a real posting rhythm |
| **Job** | Automate creation **and** publishing with less tab-switching and fewer manual handoffs |
| **Pain** | Stack of AI writers + separate schedulers + per-platform uploads; workflow stays manual |
| **Geo / language** | International; **EN-first** for product and Wave 1 queue (`brands.config.ts`: en, de, fr, it — localize after EN validates) |
| **North-star (growth)** | Signups and accounts actively scheduling; capture **brand + workflow** search intent |

### Anti-ICP (do not optimize content for)

- Enterprise social suites with large in-house teams and approval chains
- Audiences with **no content rhythm** (one-off posters, “I’ll start someday”)
- Pure thought-leadership with no path to workflow/scheduling problems
- SEO bait unrelated to automation, scheduling, or creator ops

---

## Funnel mix (8-week target)

Posts use only `awareness` \| `interest` \| `consideration` (same value on all locale variants when translated).

| Stage | Share of queue | Role |
|-------|----------------|------|
| **awareness** | ~35% (7/20) | Name the “still too much clicking” problem, category education, cost of fragmented stacks — **no product deep dive** |
| **interest** | ~40% (8/20) | Solution framing, workflow audits, **honest** tool/category comparisons, multi-platform efficiency — Postology as *one* option where natural |
| **consideration** | ~25% (5/20) | Evaluation frameworks, last-mile automation, **named** alternative/alternative-style pieces toward a decision — feature truth, tradeoffs, when *not* to use Postology |

**Cadence:** 2–3 posts/week → **20 queued topics** (midpoint of 16–24). Rebalance funnel counts if slots are added or cut.

**Quality bar:** No thin listicles, no duplicate angles, no comparison posts that hide downsides. Prefer one strong angle per URL over keyword stuffing.

---

## Keyword clusters

Lead with the **manual-clicking / fragmented workflow** narrative; support with scheduling and multi-platform terms.

### Cluster A — Problem / “still clicking” (awareness + interest)

- too much manual work social media posting
- AI writing tools still manual scheduling
- idea to published post workflow
- content calendar vs actual publishing gap
- tab switching social media tools
- creator time spent scheduling

### Cluster B — Content automation & efficiency (interest + consideration)

- social content automation
- end-to-end social content workflow
- creator efficiency / content ops
- batch scheduling vs automation
- reduce clicks social media workflow
- last mile content publishing

### Cluster C — Scheduling & multi-platform (interest)

- social media scheduling tools [creators / small business / 2026]
- cross-platform social media posting
- schedule Instagram TikTok LinkedIn same content
- multi-platform posting without copy paste
- native scheduler vs third party

### Cluster D — Comparisons & alternatives (interest + consideration)

- best social media scheduling tools (honest roundup)
- Buffer vs Later vs Publer (and similar — fit-for-use, not winner-take-all)
- Buffer alternative (creation + scheduling)
- Later alternative (scheduling-only limits)
- evaluate social content automation platform

### Cluster E — Brand / workflow queries (consideration + BOFU support)

- Postology workflow (only when product is ready to support claims in post)
- social media automation for creators / small brands

**Internal linking rule (when MDX exists):** `relatedPosts` same language; funnel targets **same or higher** intent than the current post (see repo `AGENTS.md`).

---

## Comparison & alternative slots

Reserve **honest** comparison/alternative angles — not every slot is “Postology wins.”

| Slot type | Queue # | Intent |
|-----------|---------|--------|
| Category roundup | 7 | Best scheduling tools for creators — inclusion criteria, gaps, who each tool fits |
| Three-way scheduling | 9 | Buffer vs Later vs Publer — scheduling depth, creation, pricing honesty |
| Buffer alternative | 12 | When scheduling-only + separate AI is enough vs unified flow |
| Later alternative | 15 | Scheduling-only limits; last-mile creation handoffs |
| Native vs third-party | 19 | Tradeoffs per platform; when native is enough |
| Evaluation framework | 18 | How to buy automation (checklist, not a pitch deck) |

**Comparison principles**

- State **who each option is for** and **who should pass**
- Pricing/feature claims: verify at publish time; mark `updatedDate` when refreshed
- Postology mention: proportionate to article stage (lighter in awareness, clearer in consideration)

---

## Anti-topics (do not queue)

- Generic “50 social media hacks” or trend-chasing without workflow tie-in
- Platform algorithm speculation as primary angle (unless tied to scheduling consistency)
- Enterprise-only topics (Sprinklr-scale governance, global legal/comms)
- Crypto/NFT/engagement-pod growth hacks
- Duplicate slugs or near-duplicate titles vs existing or queued posts
- Full product tutorials before landing page + product claims are stable
- DE/FR/IT **first** drafts before EN Wave 1 is published (unless explicitly reprioritized)

---

## CTA & link map (placeholders)

Update URLs when landing CTAs are final. Use UTM placeholders consistently.

| Funnel stage | Primary CTA | Secondary | Notes |
|--------------|-------------|-----------|--------|
| awareness | `[TBD: /blog → soft homepage]` | Newsletter / “workflow checklist” lead magnet `[TBD]` | No hard product demo CTA |
| interest | `[TBD: /signup?utm_source=blog&utm_medium=organic&utm_campaign=interest]` | Related comparison or audit post | Link to 1–2 same-or-higher funnel posts |
| consideration | `[TBD: /signup?utm_source=blog&utm_medium=organic&utm_campaign=consideration]` | `[TBD: pricing / features / docs]` | Optional “talk to us” for teams `[TBD]` |

**In-post patterns (MDX phase)**

- awareness: problem recap + one next-step link (interest post or checklist)
- interest: CTA after methodology section; relatedPosts → consideration where available
- consideration: evaluation summary + signup; link back to one interest “comparison” post

**Site map placeholders:** `/blog`, `/features`, `/pricing`, `/docs`, `/signup` on `https://postology.ai` — confirm paths in landing repo before publish.

---

## Existing blog inventory & gaps

**Skim date:** 2026-09-28 · **Path checked:** `brands/postology/` on `main`

| Finding | Detail |
|---------|--------|
| **Published MDX** | **None** — no `brands/postology/{lang}/` folder yet |
| **Slug collisions** | None with live posts; queue slugs are net-new |
| **Context only** | `context/postology/brand-context.md`, image styleguide under `context-files/` |

**Gaps this queue closes first**

1. No owned URLs for core clusters (automation, scheduling, multi-platform, “too much clicking”)
2. No comparison/alternative content for creator scheduling stack
3. No consideration-stage evaluation content for automation buyers
4. No localized posts (acceptable for Wave 1 EN-only; plan de/fr/it after EN #1–6 perform)

When the first MDX ships, add a row here: slug, `funnelStage`, pubDate, and retire or defer any queue item that overlaps >60% in angle.

---

## Wave plan (summary)

| Wave | Queue items | Goal |
|------|-------------|------|
| **Wave 1** | #1–6 | Establish problem narrative + category frame + one consideration north-star |
| **Wave 2** | #7–12 | Comparisons and cross-platform interest depth |
| **Wave 3** | #13–20 | Calendar gap, audits, alternatives, evaluation, last-mile consideration |

Full numbered titles, slugs, and keywords: [`topic-queue-2026-q4.md`](./topic-queue-2026-q4.md).

---

## Autopilot operating notes

- **Drafting:** Full MDX only when pulled from queue; keep `description` < 160 chars; explicit `funnelStage` on every locale file
- **Images:** Follow `context/postology/context-files/Postology-imagege-brand-styleguide.md`
- **Publish:** `npm run preview` with brand switcher once `brands/postology/en/` exists; auto-publish on merge to `main` per repo workflow
- **Review:** @rob-aalabs sign-off on comparison posts before publish
