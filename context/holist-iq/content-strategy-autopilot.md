# Holist-IQ — Autopilot content strategy

**Status:** Active (Robert autopilot, 2026-09-28)  
**Brand slug:** `holist-iq` (`brands/holist-iq/`, `brands.config.ts`)  
**Locales:** `en`, `de` (default `en`)  
**Cadence:** ~2–3 quality posts per week; ~8 weeks → queue **16–24** topics (drip unpublished slots later)

---

## Purpose

Holist-IQ content supports **B2B thought leadership** for people who must explain **structure and feedback loops**, not just symptoms. Posts should earn trust with **analytical clarity**—no hype—and move readers through **`awareness` → `interest` → `consideration`** without thin SEO filler.

This document governs **what** we publish in autopilot; full MDX drafts live in `brands/holist-iq/{en,de}/` per [AGENTS.md](../../AGENTS.md).

---

## ICP alignment (from ICP draft 2026-09-26)

| Segment | Content job |
|--------|----------------|
| **Executives** | Decision framing: second-order effects, leverage, shared maps for alignment |
| **Policy / public sector** | Complex interventions, unintended consequences, stakeholder-readable structure |
| **Media / communicators** | Explain “what was left out” of a narrative with a defensible diagram (exploratory angle) |

**Anti-ICP:** Pure diagram aesthetics, consumer edutainment, “systems thinking” without decision context.

**Geo / language:** EN-first with **DE parity** for CH/DACH; policy and business examples may skew Swiss/EU where natural.

**North-star metrics:** Engagement with maps, qualified signups; organic demand around **systems thinking**, **causal loops**, **decision support**.

---

## Positioning & tone

- **Professional, analytical, credible** ([brand-context.md](./brand-context.md)).
- Holist-IQ is **decision support** that makes loops and leverage visible—not a generic whiteboard.
- **Honest alternatives:** Name Miro, Lucid, Stella, kumu, pen-and-paper, and internal spreadsheets where relevant; state trade-offs (collaboration vs loop semantics, speed vs rigor).
- **No thin content:** Every post must deliver a **repeatable insight** (framework, checklist, worked pattern, or evaluation lens), not a glossary stub.

---

## SEO & topic pillars

Primary keyword clusters (one primary per post; 2–3 tags in frontmatter):

1. **Systems thinking** — foundations, business/policy application, vs linear planning  
2. **Causal loop diagrams (CLDs)** — notation, building blocks, quality bar, facilitation  
3. **Decision support** — leverage points, scenarios, executive briefs, alignment  
4. **Domain lenses** (secondary) — economics, ops, climate/energy, media literacy, org change  

Intent mix: **informational** and **commercial investigation**; avoid pure navigational “Holist-IQ login” style.

---

## Funnel strategy

Use only: `awareness` | `interest` | `consideration` (same stage across all locales of one article).

| Stage | Share of queue (target) | Role |
|-------|-------------------------|------|
| `awareness` | ~45% | Category education, ICP pain, patterns (loops, delays, fixes that fail) |
| `interest` | ~40% | Methods, comparisons, evaluation, domain workflows |
| `consideration` | ~15% | Product-shaped workflows, implementation patterns (not duplicate of existing tutorial/product posts) |

**Rules:**

- Same `funnelStage` on every locale file of one slug.  
- When drafting, set `relatedPosts` per AGENTS.md (same language; same-or-higher funnel intent).  
- If unsure between two stages, pick the **higher-intent** stage.

---

## Existing catalog — do not duplicate

Skim completed before drafting (2026-09-28 inventory):

| Slug (en) | funnelStage | Notes |
|-----------|-------------|--------|
| `why-the-same-business-problems-keep-coming-back` | awareness | Recurring fixes / symptoms |
| `systems-thinking-in-business` | awareness | Business loops workflow |
| `systems-thinking-for-public-policy-designing-better-political-decisions-in-compl` | awareness | Policy |
| `causal-loop-diagram-software` | interest | Buyer's guide |
| `systems-thinking-tool-checklist` | interest | Tool evaluation |
| `economic-systems-modeling-mapping-policies-interest-rates-and-market-feedback-lo` | interest | Economics |
| `holist-iq` | consideration | Product overview |
| `holist-iq-tutorial` | consideration | First map tutorial |

DE mirrors exist for all of the above. **New queue items must use new slugs and angles**, not rewrites of these titles.

---

## Autopilot operating model

1. **Pull next item** from [topic-queue-2026-q4.md](./topic-queue-2026-q4.md) (Wave order).  
2. **Draft EN + DE** in one PR when possible; localized slugs for DE.  
3. **Quality gate (Yaps bar):**  
   - ≥1 concrete example or mini case (anonymous composite ok)  
   - ≥1 visual-worthy structure (loop sketch, table, or checklist)—use [imagery guide](./context-files/holist_iq_blog_support_imagery_guide.md)  
   - Description **&lt;160 chars**; h2/h3 hierarchy only  
   - Explicit “when not to use CLDs” or limitation where honest  
4. **Preview:** `npm run preview` before merge to main.  
5. **Publish:** merge to main triggers brand publish workflow.

**Waves:** Wave 1 (~6 topics) validates pillar mix and funnel balance; **publish order** is by queue **Slot** (01 → 02 → 03 → **05 Compare** → 04 → 06). Waves 2–4 fill the 8-week runway. Unpublished queue rows are **backlog**, not commitments to ship verbatim—refine titles/slugs at draft time if SERP or news context shifts.

---

## Content formats (rotate)

- **Pattern library:** “Fixes that fail”, delay structures, escalation loops  
- **Comparison / buyer education:** notation tools vs decision maps (extend but don’t clone existing buyer guide)  
- **Facilitation guides:** workshops, exec readouts, policy briefs  
- **Domain spotlights:** media, ops, sustainability—one idea per post  
- **Consideration:** workflow posts that complement (not replace) `holist-iq-tutorial`

---

## Risks & guardrails

- **Politics / misinformation:** Analytical, structural—“what the argument omits”—not partisan fact-check branding.  
- **AI hype:** If mentioning AI, tie to **mapping quality and decision traceability**, not magic automation.  
- **Cannibalization:** One primary keyword per post; internal links via `relatedPosts`, not duplicate H1 topics. **W1-01 Primer** = CLD definition/notation only—link to live `/blog/causal-loop-diagram-software` for template/maker/buyer intent; do not rewrite the Software Guide.

---

## Ownership & PR convention

- Strategy/queue updates: `context/holist-iq/` docs in dedicated PRs (e.g. `holist-iq: autopilot content strategy + topic queue`).  
- Post drafts: separate PRs referencing queue row ID.  
- Review: @rob-aalabs for positioning and ICP fit.
