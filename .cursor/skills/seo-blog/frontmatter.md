# Frontmatter

Match posts already in the brand. This is the field order used by current posts:

```yaml
---
title: "..."
description: "..."
pubDate: YYYY-MM-DD
author: "..."
tags: ["...", "...", "..."]
funnelStage: "awareness"
translationKey: "english-slug"
relatedPosts: ["same-language-slug"]
image: "@/assets/blog/english-slug/hero.jpg"
draft: true
---
```

| Field | Rule |
|---|---|
| `title` | Specific, credible, contains the primary query. Not a keyword list. |
| `description` | Under 160 characters. Says what the page decides or explains. |
| `pubDate` | `YYYY-MM-DD`. Stagger waves. Do not bump the date without a real update. |
| `updatedDate` | Optional. Add only when the body materially changes. |
| `author` | Reuse the byline already used on that brand (`Postology Team`, `Aurum Avis Labs`, `Inklets Team`). Do not invent a person. |
| `tags` | 3–5. Topic labels, not synonyms of the title. |
| `funnelStage` | Exactly `awareness`, `interest`, or `consideration`. Same on every locale. |
| `translationKey` | English slug, shared by every locale. If the brand has no English, use the default-language slug. |
| `relatedPosts` | 1–3 slugs that exist in **this language**. Same or higher intent: `awareness` < `interest` < `consideration`. `interest` never links to `awareness`. `consideration` links to `consideration`, or to `interest` only when no other `consideration` post exists in that language. `[]` only when that language has no eligible peer yet. |
| `image` | `@/assets/blog/{translationKey}/hero.jpg`. Omit the line when there is no hero. Every locale points at the same file. |
| `draft` | `true` until this wave is approved to schedule. |
| `site` | Aurum only. `studio` or `prozess-check`. Same value on every locale. Planned worlds `workshops` and `security` are reserved and not used yet. |

`funnelStage` maps to the landing-page funnel: `awareness` (top), `interest` (middle), `consideration` (bottom). No other values.

Brand context may require extra fields. Vemoir posts include `tool:` after `draft`. Add those fields. Do not invent new ones.

## Body images

Do not import inline photos. The layout shows the hero from frontmatter. If the hero is Unsplash, put the photographer credit near the top of the body.

Limits, steps, and comparisons use HTML from [blocks.md](blocks.md), not a second photo.

Hero file: `hero.jpg` at 1200×675 (Vemoir 1200×900). Older posts may still use `img1.png` as the hero only.

## Files

| What | Path |
|---|---|
| MDX | `brands/{brand}/{lang}/{localized-slug}.mdx` |
| Images | `brands/{brand}/images/{translationKey}/` |

Older posts may use `img1.png` as the hero. New posts use `hero.jpg` only.
