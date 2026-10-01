import { brands, type BrandConfig } from "@brands-config";

export { brands, type BrandConfig };

export function getBrand(id: string): BrandConfig | undefined {
  return brands.find((b) => b.id === id);
}

export function getBrandIds(): string[] {
  return brands.map((b) => b.id);
}

/** Canonical preview URL. Default language omits the locale segment. */
export function blogPostUrl(brandId: string, lang: string, slug: string): string {
  const brand = getBrand(brandId);
  if (brand && lang === brand.defaultLanguage) {
    return `/${brandId}/blog/${slug}`;
  }
  return `/${brandId}/${lang}/blog/${slug}`;
}

/** Live worlds for a brand. Brands without `sites` return nothing. */
export function liveSites(brand: BrandConfig | undefined) {
  return (brand?.sites ?? []).filter((site) => site.status === "live");
}

/**
 * Aurum frontmatter `site: ki` is the old id for the Process Check world.
 * Posts without `site` belong to the studio blog.
 */
export function worldIdFromSite(site: string | undefined): string {
  if (site === "ki" || site === "prozess-check") return "prozess-check";
  if (site === "workshops" || site === "security" || site === "web3") return site;
  return "studio";
}

export function siteLabel(brand: BrandConfig | undefined, siteId: string): string {
  return brand?.sites?.find((site) => site.id === siteId)?.label ?? siteId;
}

/** Listing for one language. `siteId` narrows to one Aurum blog. */
export function blogListingUrl(brandId: string, lang: string, siteId?: string): string {
  const brand = getBrand(brandId);
  const localized =
    brand && lang !== brand.defaultLanguage
      ? `/${brandId}/${lang}`
      : `/${brandId}`;
  if (!siteId) return `${localized}/blog`;
  return `${localized}/sites/${siteId}/blog`;
}

/** Reads brand, language, and optional Aurum blog out of a preview pathname. */
export function parsePreviewBlogPath(pathname: string): {
  brandId?: string;
  lang?: string;
  siteId?: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return {};

  const brand = getBrand(parts[0]);
  if (!brand) return { brandId: parts[0] };

  let index = 1;
  let lang = brand.defaultLanguage;
  if (parts[1] && brand.languages.includes(parts[1])) {
    lang = parts[1];
    index = 2;
  }

  if (parts[index] === "sites" && parts[index + 2] === "blog") {
    return { brandId: brand.id, lang, siteId: parts[index + 1] };
  }

  return { brandId: brand.id, lang };
}
