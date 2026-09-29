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
