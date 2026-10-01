# Images

One hero per article, stored at `brands/{brand}/images/{translationKey}/hero.jpg` and reused by every locale. No inline photos (`inline1`, `inline2`, `img2`). Limits, steps, and comparisons go in HTML from [blocks.md](blocks.md).

The hero has to show this article's subject. If the same photo could sit on any other post in the batch, replace it. Prefer a targeted Higgsfield image over a generic Unsplash office or laptop shot.

| Brand | Default hero source |
|---|---|
| `aurum` | Higgsfield. Black and gold, no stock. Guide: `context/aurum/context-files/aurum_avis_labs_blogpost_image_instructions.md` |
| `holist-iq` | Higgsfield. Abstract systems, no stock. Guide: `context/holist-iq/context-files/holist_iq_blog_support_imagery_guide.md` |
| `kitchen-crew` | Higgsfield. Illustrated crew, not photos. Guide: `context/kitchen-crew/context-files/kitchencrew_blog_image_instructions.md` |
| `postology`, `vemoir`, `do-for-me`, `citysage`, `canvas-games`, `gold-crew` | Keep an Unsplash hero only if it clearly matches the article. Otherwise Higgsfield. |
| Any other brand | Same rule. Read `context/{brand}/` before generating. |

Vemoir heroes are 1200×900 and must look like ordinary photographed work, or a generated scene that still looks like that. No fake UI, logos, or neon. See `context/vemoir/brand-context.md`.

Do4Me wants ordinary Zürich help: people, tasks, streets.

## Hero challenge

Keep the current `hero.jpg` only when a reader who has not opened the article would still guess the topic from the image.

Replace it when:

- it is a generic laptop, desk, city, or handshake
- it would fit three other posts in the same brand
- it contradicts the brand image guide

Then generate one Higgsfield image. Prompt the actual subject (a closed laptop on a meeting table, a paper calendar next to a phone, a causal-loop sketch). No words, logos, or UI text in the frame. Save as `hero.jpg`.

## Unsplash (only when the photo already fits)

Requires `UNSPLASH_ACCESS_KEY` (optional `UNSPLASH_ACCESS_KEY_FALLBACK`).

```bash
python3 scripts/fetch-unsplash-images.py --jobs scripts/unsplash-jobs-{brand}.json
```

```json
[
  {
    "brand": "postology",
    "slug": "english-slug",
    "query": "specific scene, not the keyword stuffed",
    "files": [
      {"name": "hero.jpg", "hero": true, "width": 1200, "height": 675}
    ]
  }
]
```

`slug` is the `translationKey`. Copy `attributionHtml` from `sources.json` into each locale under the hero, or omit it when the hero is Higgsfield. Put the credit after the lede (before the first H2), translated, not at the end of the article.

## Higgsfield

Read the brand image guide, then generate. Save JPEG as `hero.jpg`.

```json
{
  "slug": "english-slug",
  "resolvedSource": "higgsfield",
  "model": "the model you actually called"
}
```

## Either source

- Hero only. Delete leftover inline files from the article folder when you strip them from the MDX.
- Do not reuse a photo the Unsplash script has already recorded.
- Alt text is written in each locale. The file is not.
- Skip the `image` frontmatter line rather than ship a placeholder.
