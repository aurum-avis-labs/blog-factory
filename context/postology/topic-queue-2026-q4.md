# Postology — Topic queue (2026 Q4 autopilot)

**Cadence:** ~2–3 posts/week · **Slots:** 20 (~8 weeks) · **Wave 1:** #1–6 (publish first) · **Locale default:** `en` (localize to de/fr/it after Wave 1)

**Strategy:** [`content-strategy-autopilot.md`](./content-strategy-autopilot.md)

**Existing posts:** None under `brands/postology/` (2026-09-28). All slugs below are unused.

---

## Queue

| # | Title | slug | primary keyword | funnelStage | locale | intent | notes |
|---|--------|------|-----------------|-------------|--------|--------|-------|
| 1 | Why You Still Click Too Much After Buying AI Writing Tools | `too-much-clicking-after-ai-tools` | AI writing tools manual scheduling | awareness | en | Informational | **Wave 1.** Anchor post; map Cluster A; CTA: checklist placeholder |
| 2 | From Idea to Post: Where Manual Work Hides in Creator Workflows | `idea-to-post-manual-bottlenecks` | idea to published post workflow | awareness | en | Informational | **Wave 1.** Journey diagram; link forward to #5, #16 |
| 3 | Content Automation vs Scheduling Tools: What Actually Saves Time? | `content-automation-vs-scheduling-tools` | content automation vs scheduling | interest | en | Commercial investigation | **Wave 1.** Define categories honestly; light Postology mention |
| 4 | The Hidden Work of Posting One Idea to Five Platforms | `multi-platform-posting-hidden-work` | multi-platform social media posting | awareness | en | Informational | **Wave 1.** Cluster C; avoid enterprise stack jargon |
| 5 | How Solo Creators Design a One-Flow Posting System | `solo-creator-one-flow-posting` | social media workflow creators | interest | en | Informational | **Wave 1.** Actionable steps; relatedPosts → #3, #6 when live |
| 6 | What End-to-End Social Content Automation Looks Like in 2026 | `end-to-end-social-content-automation` | social content automation | consideration | en | Commercial investigation | **Wave 1.** Category definition + evaluation criteria; not a feature dump |
| 7 | Best Social Media Scheduling Tools for Creators (2026) | `best-social-media-scheduling-tools-creators-2026` | best social media scheduling tools creators | interest | en | Commercial investigation | Honest roundup; inclusion rubric; refresh pricing at publish |
| 8 | Why Batch Scheduling Day Is Not the Same as Automation | `batch-scheduling-not-automation` | batch scheduling vs automation | awareness | en | Informational | Contrarian; supports “still clicking” narrative |
| 9 | Buffer vs Later vs Publer: Which Fits Solo Creators and Small Teams? | `buffer-vs-later-vs-publer-comparison` | Buffer vs Later vs Publer | interest | en | Commercial investigation | Three-way compare; state tradeoffs; verify features at publish |
| 10 | Creator Efficiency: Metrics Beyond Follower Count | `creator-efficiency-metrics` | creator efficiency content | awareness | en | Informational | Tie metrics to time/clicks saved, not vanity |
| 11 | How to Schedule Cross-Platform Without Copy-Pasting Every Caption | `cross-platform-scheduling-without-duplication` | cross platform social media scheduling | interest | en | Informational | Platform-specific caveats (aspect ratio, links, char limits) |
| 12 | Buffer Alternative When You Want Creation and Scheduling in One Flow | `buffer-alternative-creation-and-scheduling` | Buffer alternative creators | consideration | en | Transactional | Alternative-style; when to stay on Buffer; honest limits |
| 13 | Your Content Calendar Is Full—So Why Does Publishing Still Feel Manual? | `content-calendar-manual-publishing-gap` | content calendar manual publishing | awareness | en | Informational | Cluster A; bridge to automation cluster |
| 14 | AI Content Tools Won’t Fix a Broken Posting Workflow | `ai-content-tools-broken-workflows` | AI content tools workflow | interest | en | Informational | Pairs with #1; stack diagram (writer → scheduler → platforms) |
| 15 | Later Alternative: When Scheduling-Only Tools Leave Work on the Table | `later-alternative-scheduling-only-limits` | Later alternative scheduling | consideration | en | Transactional | Scheduling-only limits; last-mile handoffs |
| 16 | A Practical Audit to Reduce Clicks in Your Social Media Workflow | `reduce-clicks-social-media-workflow-audit` | reduce clicks social media workflow | interest | en | Informational | Checklist asset; strong internal link hub |
| 17 | Multi-Platform Social Strategy Without an Enterprise Team | `multi-platform-social-without-enterprise-team` | multi platform social media strategy small business | awareness | en | Informational | Anti-enterprise tone; fits ICP |
| 18 | How to Evaluate Social Content Automation Platforms | `evaluate-social-content-automation-platforms` | social content automation software | consideration | en | Commercial investigation | Buyer checklist; comparison to #6, #12, #15 |
| 19 | Native Platform Schedulers vs Third-Party Tools (2026 Tradeoffs) | `native-vs-third-party-social-schedulers` | native vs third party social scheduler | interest | en | Commercial investigation | Per-platform notes; when native is enough |
| 20 | From ChatGPT Drafts to Scheduled Posts: Closing the Last-Mile Gap | `chatgpt-to-scheduled-posts-last-mile` | ChatGPT to scheduled social posts | consideration | en | Commercial investigation | Last-mile automation; verify integrations at publish |

---

## Funnel totals (this queue)

| funnelStage | Count | IDs |
|-------------|-------|-----|
| awareness | 7 | 1, 2, 4, 8, 10, 13, 17 |
| interest | 8 | 3, 5, 7, 9, 11, 14, 16, 19 |
| consideration | 5 | 6, 12, 15, 18, 20 |

---

## Wave 1 detail (#1–6)

Publish in order unless analytics or product launch shifts priority.

1. **#1** — Sets SEO narrative for “still too much clicking”; highest share potential for Cluster A.
2. **#2** — Supports #1 with journey-stage vocabulary for internal linking.
3. **#3** — Moves readers to interest; required before heavy comparison traffic (#7, #9).
4. **#4** — Multi-platform awareness; feeds #11 later.
5. **#5** — First “how to” interest piece; practical tone.
6. **#6** — Single consideration pillar for the first 6 weeks; anchors `relatedPosts` for later posts.

**After Wave 1:** Prioritize #7 and #9 for comparison search demand; slot #12/#15 when signup CTA URLs are confirmed in strategy doc.

---

## Slug & dedup policy

- Slugs are **English, kebab-case**, localized slugs when translating (per repo guidelines).
- Before writing MDX, re-check `brands/postology/en/*.mdx` for new files on `main`.
- If two queue items overlap after drafting, merge angles and mark the loser `deferred` in a PR comment—do not publish both.

---

## MDX handoff checklist (when drafting)

- [ ] `funnelStage` matches this table for EN and all translations
- [ ] `description` ≤ 160 characters
- [ ] `relatedPosts`: 1–3 slugs, same language, funnel alignment per `AGENTS.md`
- [ ] Hero path: `brands/postology/images/{slug}/` + `@/assets/blog/...` in frontmatter
- [ ] Comparison posts: @rob-aalabs review
