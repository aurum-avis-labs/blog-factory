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
| `pubDate` | `YYYY-MM-DD`. Stagger waves. The date changes when the body materially changes. |
| `updatedDate` | Optional. Add only when the body materially changes. |
| `author` | The byline already used on that brand (`Postology Team`, `Aurum Avis Labs`, `Inklets Team`). |
| `tags` | 3–5 topic labels, not synonyms of the title (Vemoir: 2–4; its first tag is the category). |
| `funnelStage` | Exactly `awareness`, `interest`, or `consideration`. Same on every locale. |
| `translationKey` | English slug, shared by every locale. If the brand has no English, use the default-language slug. |
| `relatedPosts` | 1–3 slugs that exist in **this language**. Links travel from lower to higher intent: `awareness` < `interest` < `consideration`. `interest` points to interest or consideration. `consideration` points to consideration, or to interest while that language has no other consideration post. `[]` while that language has no eligible peer yet. Verify each slug as a file on disk before finishing. |
| `image` | `@/assets/blog/{translationKey}/hero.jpg`. Omit the line when there is no hero. Every locale points at the same file. |
| `draft` | `true` until this wave is approved to schedule. |
| `site` | Aurum only. Match the `sites` list in `brands.config.ts` (`studio`, `prozess-check`, `security`, `web3`, `workshops`). Posts use the section they belong to; security posts use `security`. Same value on every locale. |

`funnelStage` maps to the landing-page funnel: `awareness` (top), `interest` (middle), `consideration` (bottom).

The field set and order above; a brand may add one extra field (Vemoir: `tool` after `relatedPosts`).

## Body images

The layout shows the hero from frontmatter. If the hero is Unsplash, put the photographer credit near the top of the body.

Limits, steps, and comparisons use HTML from [blocks.md](blocks.md).

Hero file: `hero.jpg` at 1200×675 (Vemoir 1200×900). Older posts may still use `img1.png` as the hero only.

## Files

| What | Path |
|---|---|
| MDX | `brands/{brand}/{lang}/{localized-slug}.mdx` |
| Images | `brands/{brand}/images/{translationKey}/` |

Older posts may use `img1.png` as the hero. New posts use `hero.jpg` only.
