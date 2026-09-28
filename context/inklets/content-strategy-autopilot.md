# Inklets — Autopilot Content Strategy (Q4 2026)

**Status:** Active · **Owner:** Robert / Inklets Team · **Updated:** 2026-09-28  
**Repo mapping:** Brand id `canvas-games` · Content path `brands/canvas-games/en/` · Domain [inklets.app](https://www.inklets.app)

---

## Big picture

Inklets is a **mobile multiplayer climb** in the Doodle Jump / vertical-jumper genre: three players on one wobbly sketchbook page, rising ink from below, **last Inklet standing** wins. iOS and Android, English marketing, indie tone (Aurum Avis Labs, Zurich). Growth today is strong on paid/GA and **weak on organic** — blog autopilot exists to earn honest genre traffic and route readers to **waitlist / install**, not to publish thin SEO filler.

**North-star metrics:** waitlist signups, installs, sessions (track by `funnelStage` in frontmatter for GA4/GTM).

### ICP reminder (from product brief)

| | |
|---|---|
| **Primary** | Casual mobile gamers (often younger); plus **nostalgia ~30s** who played Doodle Jump-era jumpers and want the genre back — with friends, not alone. |
| **Job to be done** | Short, social, chaotic climbing / last-standing with a **personal Inklet** (AI prompt → sketchbook climber). |
| **Geo / language** | International stores; **EN-only** blog. |
| **Anti-ICP** | Hardcore PC/console-only competitive; B2B; productivity / “serious software” readers. |
| **Positioning** | The **multiplayer, sketchbook-styled** take on vertical jumpers — generous to Lima Sky and cousins; **no hype**, no fake “#1” claims. |

Full product facts and tone live in [`context/canvas-games/brand-context.md`](../canvas-games/brand-context.md).

---

## Autopilot cadence

| Parameter | Target |
|-----------|--------|
| Publish rate | **2–3 posts / week** (quality over volume) |
| Drip spacing | Every **2–3 days** via routine |
| Queue depth | **~16–24** numbered slots (~8 weeks); refresh queue when &lt;8 remain |
| Locale | **EN** only (`brands/canvas-games/en/`) |
| Author | `Inklets Team` |

---

## Funnel mix target

Use only: `awareness` \| `interest` \| `consideration`.

**Portfolio target (live + pipeline combined):** roughly **40% awareness / 35% interest / 25% consideration**.

| Stage | Role | Inklets share |
|-------|------|----------------|
| **Awareness** (~40%) | Genre education, nostalgia, “what is a vertical jumper,” broad **jumping games** / **games like doodle jump** intent. Soft CTA: read next post or try browser demo. |
| **Interest** (~35%) | Multiplayer reality checks, mechanics, comparisons with **honest alternatives**, how-tos that don’t require owning Inklets yet. CTA: [doodle-jump-multiplayer](/blog/doodle-jump-multiplayer), demo, or waitlist. |
| **Consideration** (~25%) | Inklets-specific workflows: waitlist, install, Sketchbook, AI Generator, demo vs app. CTA: [inklets.app](https://www.inklets.app) waitlist/download. |

**As of 2026-09-28 (10 live EN posts):** ~40% awareness / 20% interest / 40% consideration — comparison and product explainers landed early. **Autopilot should lean interest + mid-funnel** until the mix rebalances (see queue).

Rules when drafting:

- Same `funnelStage` on all locales of one article (EN-only today).
- `relatedPosts`: 1–3 slugs, same language, same-or-higher funnel intent (see repo `AGENTS.md`).

---

## Keyword clusters

### Primary (head + high intent)

| Cluster | Example queries | Default stage | Notes |
|---------|-----------------|---------------|--------|
| Doodle Jump adjacency | games like doodle jump, games similar to doodle jump, old games like doodle jump | awareness → interest | **3 list/comparison posts live** — new pieces must use **different angles** (criteria, mood, alternatives, nostalgia), not fourth duplicate listicle. |
| Multiplayer jump | doodle jump multiplayer, multiplayer jumping games, vertical jumper multiplayer | interest | One strong explainer live; expand **what works on mobile**, party-size, last-standing. |
| Jumping games (broad) | jumping games, jumping games mobile, best jumping games | awareness | Top-of-funnel; answer-first, link into Doodle Jump cluster. |
| Endless / vertical jumper | endless jumping games, vertical jumper, one-thumb mobile games | awareness | One design post live; extend with **how-to** and **genre vs runner** clarity. |

### Supporting (long-tail + differentiation)

| Cluster | Example queries | Default stage |
|---------|-----------------|---------------|
| Character creation | AI character creator games, games where you create your own character | interest | One post live; follow with **prompt how-to** (consideration). |
| Last-standing / party | last one standing mobile games, 3 player mobile games, quick party games phone | interest |
| Mechanics | rising ink / floor, platform types vertical jumper, tilt vs tap | interest |
| Nostalgia ICP | doodle jump nostalgia, 2009 iphone games jumper | awareness |
| Inklets branded | what is inklets, download inklets, inklets waitlist, game.inklets.app demo | consideration | Several live — queue adds **waitlist**, **match flow**, **economy loop** without repeating “what is”. |

### Comparison / alternatives slots (standing inventory)

Maintain **2–3 comparison-style posts in pipeline at all times**, rotating competitors and framing:

| Slot type | Purpose | Competitors / frames to rotate |
|-----------|---------|--------------------------------|
| **Genre list (awareness)** | Capture “games like X” | Doodle Jump cousins, Icy Tower lineage, Mega Jump-style — **one list per competitor family max**. |
| **Criteria guide (awareness/interest)** | “How to compare fairly” | Already live as [games-similar-to-doodle-jump](/blog/games-similar-to-doodle-jump); link out, don’t clone. |
| **Head-to-head (interest)** | Solo score vs race vs survival | Doodle Jump Race vs Inklets; solo jumper vs 3P survival. |
| **Honest alternatives box** | Required section in any comparison post | Always include **when not to pick Inklets** (want pure solo high score → Doodle Jump 2; want finish-line race → Doodle Jump Race). |

---

## Content quality bar (Yaps-style)

Every post should:

1. **Answer the query in the first 2–3 sentences** (no throat-clearing).
2. Use **how-to / decision H2s** (“How to choose…”, “How a three-player lobby works…”).
3. Include **Honest alternatives** (or equivalent) on comparison/intent posts.
4. End with **FAQ** (3–5 real questions from search/social).
5. **Soft CTA** matched to stage (next article, demo, waitlist — not aggressive).
6. **No thin scaled content:** one primary keyword, one clear intent, ≥1,200 words equivalent depth for listicles/guides.

**Tone:** Warm indie dev / genre fan; no exclamation spam; never call art “hand-drawn” (use sketchbook-style, inky, doodle-style). Do **not** claim full release if still waitlist/pre-order — match [`brand-context.md`](../canvas-games/brand-context.md).

---

## What NOT to write (anti-topics)

- B2B, ad monetization essays, “mobile game industry report” filler.
- Hardcore esports / PC shooter / gacha deep dives unrelated to vertical jumpers.
- Duplicate **“7 games like Doodle Jump”** variants without a new search intent.
- Fake release news, fake player counts, or “best game 2026” superlatives.
- de-CH / multi-locale copies (not configured for this brand).
- Lore-heavy fiction with no search or funnel job.
- Posts that bash Doodle Jump or competitors (fair critique only).

---

## Internal link & CTA map (placeholders)

Use **relative blog paths** on inklets.app (landing page serves `/blog/{slug}`). External product URLs below.

### Pillar → spoke (recommended)

| Pillar (existing slug) | Funnel | Spokes to add / reinforce |
|------------------------|--------|---------------------------|
| [games-like-doodle-jump](/blog/games-like-doodle-jump) | awareness | jumping games mobile, doodle jump alternatives, nostalgia post |
| [games-similar-to-doodle-jump](/blog/games-similar-to-doodle-jump) | awareness | any new comparison (criteria link mandatory) |
| [doodle-jump-multiplayer](/blog/doodle-jump-multiplayer) | interest | multiplayer jumping games, 3-player party, Inklets match flow |
| [endless-jumping-games-mobile](/blog/endless-jumping-games-mobile) | awareness | vertical jumper vs runner, platform types how-to |
| [what-is-inklets](/blog/what-is-inklets) | consideration | waitlist guide, how matches work |
| [ai-character-creator-games](/blog/ai-character-creator-games) | interest | AI Generator prompt how-to |
| [inklets-sketchbook-guide](/blog/inklets-sketchbook-guide) | consideration | coins/unlocks loop (economy, not repeat tour) |
| [inklets-browser-demo-vs-app](/blog/inklets-browser-demo-vs-app) | consideration | try-before-install genre piece → always link here |
| [download-inklets-ios-android](/blog/download-inklets-ios-android) | consideration | primary install CTA from interest posts |

### CTA destinations by stage

| Stage | Primary CTA | Secondary |
|-------|-------------|-----------|
| Awareness | Next related blog post | [game.inklets.app](https://game.inklets.app) “quick try” |
| Interest | [doodle-jump-multiplayer](/blog/doodle-jump-multiplayer) or demo | [inklets.app](https://www.inklets.app) waitlist |
| Consideration | [inklets.app](https://www.inklets.app) waitlist / download | [download-inklets-ios-android](/blog/download-inklets-ios-android) |

### `relatedPosts` hub (high-traffic nodes)

When in doubt, link forward to: `doodle-jump-multiplayer`, `what-is-inklets`, `download-inklets-ios-android`, `games-like-doodle-jump` — respecting funnel rules.

---

## Existing content snapshot & gaps

**Live EN slugs (do not duplicate):**

| Slug | funnelStage |
|------|-------------|
| `games-like-doodle-jump` | awareness |
| `games-similar-to-doodle-jump` | awareness |
| `old-games-like-doodle-jump` | awareness |
| `endless-jumping-games-mobile` | awareness |
| `doodle-jump-multiplayer` | interest |
| `ai-character-creator-games` | interest |
| `what-is-inklets` | consideration |
| `download-inklets-ios-android` | consideration |
| `inklets-browser-demo-vs-app` | consideration |
| `inklets-sketchbook-guide` | consideration |

**Gaps the Q4 queue fills:**

- Broad **jumping games** head term (not only Doodle Jump wording).
- **Interest-heavy** how-tos (skills, platform types, multiplayer on mobile).
- **Nostalgia ~30s** explicit post (ICP).
- **Last-standing / 3-player party** discovery queries.
- **Inklets waitlist + match flow + economy** without re-writing “what is” / full Sketchbook tour.
- **Head-to-head** Inklets vs Doodle Jump Race (interest comparison).

Operational queue: [`topic-queue-2026-q4.md`](./topic-queue-2026-q4.md).

---

## Reviewer

@rob-aalabs — approve funnel mix shift and Wave 1 before writers run autopilot.
