# Blog Images

Each subfolder corresponds to a blog post slug. Place images inside the matching folder.

## Naming convention

- `img1.png` — hero/cover image (used in frontmatter `image` field and blog cards)
- `img2.png`, `img3.png`, … — inline images used throughout the post body

## How to use in MDX

**Frontmatter** (hero image for cards/OG):

```yaml
image: "@/assets/blog/systems-thinking-in-business/img1.png"
```

**Body** (inline images):

```mdx
import { Image } from 'astro:assets';
import img1 from '@/assets/blog/systems-thinking-in-business/img1.png';
import img2 from '@/assets/blog/systems-thinking-in-business/img2.png';

<Image src={img1} alt="Descriptive alt text" width={800} quality={80} class="w-full" />
```

## Current posts

| Folder | Post |
|---|---|
| `why-the-same-business-problems-keep-coming-back/` | Awareness (entry) |
| `systems-thinking-in-business/` | Awareness (method) |
| `systems-thinking-tool-checklist/` | Consideration |
| `causal-loop-diagram-software/` | Decision |
| `holist-iq/` | Conversion (product) |
| `holist-iq-tutorial/` | Conversion (tutorial) |
