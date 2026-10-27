import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Full SERP `<title>` when it must differ from the H1. ≤60 characters, used as-is (no brand suffix). H1 stays `title`. */
      seoTitle: z.string().max(60).optional(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional().default(false),
      funnelStage: z.string().optional(),
      relatedPosts: z.array(z.string()).optional(),
      /** Aurum world. `ki` is the old id for prozess-check. Other brands omit it. */
      site: z.enum(["studio", "ki", "prozess-check", "workshops", "security", "web3"]).optional(),
    }),
});

export const collections = { blog };
