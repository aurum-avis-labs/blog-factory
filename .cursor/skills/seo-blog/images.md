# Images

One hero per article, stored at `brands/{brand}/images/{translationKey}/hero.webp` and reused by every locale. Limits, steps, and comparisons go in HTML from [blocks.md](blocks.md).

The hero shows this article's subject. A photo that could sit on any other post in the batch gives way to a targeted Higgsfield image.

| Brand | Default hero source |
|---|---|
| `aurum` | Higgsfield. Black and gold, no stock. Guide: `context/aurum/context-files/aurum_avis_labs_blogpost_image_instructions.md` |
| `holist-iq` | Higgsfield. Abstract systems, no stock. Guide: `context/holist-iq/context-files/holist_iq_blog_support_imagery_guide.md` |
| `kitchen-crew` | Higgsfield. Illustrated crew, not photos. Guide: `context/kitchen-crew/context-files/kitchencrew_blog_image_instructions.md` |
| `postology`, `vemoir`, `do-for-me`, `citysage`, `canvas-games`, `gold-crew` | Keep an Unsplash hero only if it clearly matches the article. Otherwise Higgsfield. |
| Any other brand | Same rule. Read `context/{brand}/` before generating. |

Vemoir heroes are 1200×900 and look like ordinary photographed work, or a generated scene that still looks like that: real light, no fake UI, logos, or neon. See `context/vemoir/brand-context.md`.

Do4Me wants ordinary Zürich help: people, tasks, streets.

## Hero challenge

Keep the current `hero.webp` when a reader who has not opened the article would still guess the topic from the image.

A generic laptop, desk, city, or handshake shot, an image that could fit three other posts in the same brand, or one that contradicts the brand image guide points to a new Higgsfield image: prompt the actual subject (a closed laptop on a meeting table, a paper calendar next to a phone, a causal-loop sketch), keep the frame free of words, logos, and UI text, and save as `hero.webp`.

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
      {"name": "hero.webp", "hero": true, "width": 1200, "height": 675}
    ]
  }
]
```

`slug` is the `translationKey`. Copy `attributionHtml` from `sources.json` into each locale under the hero, or omit it when the hero is Higgsfield. Put the credit after the lede, before the first H2, translated.

## Higgsfield

Read the brand image guide, then generate. You may download or export PNG/JPEG first, then convert before commit (max width 1600px, quality ~80):

```bash
npm run images:webp -- brands/{brand}/images/{translationKey}/hero.jpg
npm run check:images
```

Only `hero.webp` (and optional `inline*.webp`) may remain in the folder; CI runs `npm run check:images` on publish and preview builds.

```json
{
  "slug": "english-slug",
  "resolvedSource": "higgsfield",
  "model": "the model you actually called"
}
```

## Either source

- Hero only. Delete leftover inline files from the article folder when you strip them from the MDX.
- Choose a photo the Unsplash script has not recorded yet.
- Alt text is written in each locale. The file is not.
- When there is no fitting hero, the `image` frontmatter line stays out.
