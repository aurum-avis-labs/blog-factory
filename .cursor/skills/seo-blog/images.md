# Images

One image set per article, stored at `brands/{brand}/images/{translationKey}/` and reused by every locale.

Default is **Unsplash**. Use **Higgsfield** when Unsplash cannot show the subject, or when the brand guide below requires generated art.

| Brand | Source |
|---|---|
| `aurum` | Higgsfield. Black and gold, no stock. Guide: `context/aurum/context-files/aurum_avis_labs_blogpost_image_instructions.md` |
| `holist-iq` | Higgsfield. Abstract systems, no stock. Guide: `context/holist-iq/context-files/holist_iq_blog_support_imagery_guide.md` |
| `kitchen-crew` | Higgsfield. Illustrated crew, not photos. Guide: `context/kitchen-crew/context-files/kitchencrew_blog_image_instructions.md` |
| `postology`, `vemoir`, `do-for-me`, `citysage`, `canvas-games`, `gold-crew` | Unsplash first. Higgsfield if search returns nothing that fits, or the scene is a diagram a photo cannot carry. |
| Any other brand | Unsplash first. Read `context/{brand}/` before generating. |

Postology's style guide describes generated SaaS art. Published posts use Unsplash. Keep using Unsplash unless the user asks for generated art on that batch.

Vemoir heroes are 1200×900 and must look like ordinary photographed work. No fake UI, logos, or neon. See `context/vemoir/brand-context.md`.

Do4Me wants ordinary Zürich help: people, tasks, streets. Photos, not illustrations.

## Unsplash

Requires `UNSPLASH_ACCESS_KEY` in the environment (optional `UNSPLASH_ACCESS_KEY_FALLBACK`). The script tracks downloads, skips used photo IDs, and writes attribution.

Write a jobs file, then run:

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
      {"name": "hero.jpg", "hero": true, "width": 1200, "height": 675},
      {"name": "inline1.jpg", "hero": false, "width": 1200, "height": 800},
      {"name": "inline2.jpg", "hero": false, "width": 1200, "height": 800}
    ]
  }
]
```

`slug` is the `translationKey`. Search queries describe a scene (a person at a laptop with a calendar), not the article keyword. If the key is missing or every result is wrong, switch that article to Higgsfield and set `resolvedSource` accordingly.

Copy `attributionHtml` from `sources.json` into each locale next to the image.

## Higgsfield

Read the brand image guide, then the `generate_image` schema, then generate. Save JPEG files into the same folder with the same names. Do not render words, logos, or UI text into the image.

`sources.json`:

```json
{
  "slug": "english-slug",
  "resolvedSource": "higgsfield",
  "model": "the model you actually called"
}
```

## Either source

- Hero plus at most two inline images.
- Do not reuse a photo the script has already recorded.
- Alt text is written in each locale. The file is not.
- Skip the `image` frontmatter line rather than ship a placeholder.
