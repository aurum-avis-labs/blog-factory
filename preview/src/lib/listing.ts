import type { PaginateFunction } from "astro";
import type { CollectionEntry } from "astro:content";
import { brands, liveSites, worldIdFromSite } from "@/lib/brands";

type BlogEntry = CollectionEntry<"blog">;

export function postsForListing(
  allPosts: BlogEntry[],
  brandId: string,
  lang: string,
  siteId?: string,
): BlogEntry[] {
  return allPosts
    .filter((post) => post.id.startsWith(`${brandId}/${lang}/`))
    .filter((post) => !siteId || worldIdFromSite(post.data.site) === siteId)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Static paths for a brand listing.
 * `scopedSite` builds one page per live world, including worlds with no posts yet.
 */
export function listingPaths(
  paginate: PaginateFunction,
  allPosts: BlogEntry[],
  options: { defaultLanguageOnly: boolean; scopedSite: boolean },
) {
  return brands.flatMap((brand) => {
    const langs = options.defaultLanguageOnly
      ? [brand.defaultLanguage]
      : brand.languages.filter((lang) => lang !== brand.defaultLanguage);
    const sites = options.scopedSite ? liveSites(brand) : [undefined];

    return langs.flatMap((lang) =>
      sites.flatMap((site) => {
        const posts = postsForListing(allPosts, brand.id, lang, site?.id);
        const params: Record<string, string | undefined> = { brand: brand.id };
        if (!options.defaultLanguageOnly) params.lang = lang;
        if (site) params.site = site.id;

        return paginate(posts, {
          params,
          props: {
            brandId: brand.id,
            brandName: brand.displayName,
            lang,
            siteId: site?.id,
          },
          pageSize: 10,
        });
      }),
    );
  });
}
