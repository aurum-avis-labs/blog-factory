# Images

One hero per article, stored under `brands/{brand}/images/{translationKey}/` and reused by every locale. Limits, steps, and comparisons go in HTML from [blocks.md](blocks.md).

## Format (WebP preferred)

Prefer **WebP** for hero and any inline rasters you add under `brands/{brand}/images/{translationKey}/` when generating or exporting for landing pages. Typical names: `hero.webp`, `inline1.webp`, `inline2.webp`.

- **JPEG** (`hero.jpg`, etc.) stays acceptable when a post already uses it, when Unsplash or Higgsfield output is saved as JPEG, or when the source is already a photo JPEG. Do not mass-convert the historical tree unless a wave explicitly retouches those assets.
- **PNG** only when you need transparency (logos, UI chrome with alpha). Avoid large PNG for photographs — file size drives up memory during landing-page builds.
- **Why:** Landing pages process blog images through Astro `astro:assets`. Very large decoded rasters (especially full-size PNG photos) inflate build memory; Vemoir’s blog-update runner has been killed by that pressure. WebP keeps quality with much smaller files on disk and at decode time.

The `image` frontmatter path must match the file extension on disk (`hero.webp` or `hero.jpg`, not both).

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

Keep the current hero when a reader who has not opened the article would still guess the topic from the image (whether the file is `hero.webp` or legacy `hero.jpg`).

A generic laptop, desk, city, or handshake shot, an image that could fit three other posts in the same brand, or one that contradicts the brand image guide points to a new Higgsfield image: prompt the actual subject (a closed laptop on a meeting table, a paper calendar next to a phone, a causal-loop sketch), keep the frame free of words, logos, and UI text, and save as **`hero.webp`** (or **`hero.jpg`** if your export path is JPEG-only).

## Unsplash (only when the photo already fits)

Requires `UNSPLASH_ACCESS_KEY` (optional `UNSPLASH_ACCESS_KEY_FALLBACK`).

```bash
python3 scripts/fetch-unsplash-images.py --jobs scripts/unsplash-jobs-{brand}.json
```

`scripts/fetch-unsplash-images.py` encodes to the extension in each job’s `name` (`.webp`, `.jpg`, or `.png`). Prefer `.webp` in new jobs.

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

Read the brand image guide, then generate. Export **WebP** as `hero.webp` when your tool can; otherwise JPEG as `hero.jpg`. Do not default to PNG for photographic heroes.

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

## Legacy paths

Older posts may use `img1.png` (or multiple PNG inline assets). Leave them unless you are already revisiting that article’s images; new waves should not add new large PNG photos.
