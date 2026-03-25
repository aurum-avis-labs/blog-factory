import { brands, type BrandConfig } from "@brands-config";

export { brands, type BrandConfig };

export function getBrand(id: string): BrandConfig | undefined {
  return brands.find((b) => b.id === id);
}

export function getBrandIds(): string[] {
  return brands.map((b) => b.id);
}
