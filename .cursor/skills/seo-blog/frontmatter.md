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

`funnelStage` maps to the landing-page funnel: `awareness` (top), `interest` (middle), `consideration` (bottom). No other values.

Brand context may require extra fields. Vemoir posts include `tool:` after `draft`. Add those fields. Do not invent new ones.

## Body images

Place imports immediately after the frontmatter. Hero attribution sits near the top. Inline images sit at a real break in the argument.

```mdx
import { Image } from 'astro:assets';
import inline1 from '@/assets/blog/english-slug/inline1.jpg';

<Image src={inline1} alt="..." width={700} quality={80} class="w-full" />
```

Alt text is in the post's language and describes the image. One hero (`hero.jpg`, 1200×675) and up to two inline images (`inline1.jpg`, `inline2.jpg`, 1200×800) unless the brand file sets a different crop (Vemoir hero is 1200×900).

Unsplash attribution HTML comes from `sources.json` and sits next to the image. Do not strip the photographer credit.

## Files

| What | Path |
|---|---|
| MDX | `brands/{brand}/{lang}/{localized-slug}.mdx` |
| Images | `brands/{brand}/images/{translationKey}/` |

Older posts may use `img1.png`. New posts use `hero.jpg` and `inline1.jpg`.
