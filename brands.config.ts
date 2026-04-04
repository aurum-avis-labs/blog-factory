export interface BrandConfig {
  /**
   * Folder name under `brands/{id}/`. Landing-site `fetch-blog` resolves the same id by
   * stripping a `-landing…` suffix from the git remote or directory name (e.g. `do-for-me-landingpage`
   * and `gold-crew-landing-page` both map to `do-for-me` / `gold-crew`), so the id here must match
   * that stem, not the full repo name.
   */
  id: string;
  /** Display name for preview UI */
  displayName: string;
  /** GitHub repo (owner/repo format) */
  repo: string;
  /** Production domain */
  domain: string;
  /** Supported languages for this brand */
  languages: string[];
  /** Default language (determines URL prefix behavior) */
  defaultLanguage: string;
}

export const brands: BrandConfig[] = [
  {
    id: "aurum",
    displayName: "Aurum Avis Labs",
    repo: "aurum-avis-labs/aurum-landing-page",
    domain: "https://aurum-avis-labs.ch",
    languages: ["en", "de"],
    defaultLanguage: "en",
  },
  {
    id: "do-for-me",
    displayName: "DO-4-ME",
    repo: "aurum-avis-labs/do-for-me-landingpage",
    domain: "https://do4me.work",
    languages: ["en", "de", "fr", "it"],
    defaultLanguage: "de",
  },
  {
    id: "gold-crew",
    displayName: "Gold Crew",
    repo: "aurum-avis-labs/gold-crew-landing-page",
    domain: "https://goldcrew.ai",
    languages: ["en", "de"],
    defaultLanguage: "en",
  },
  {
    id: "postology",
    displayName: "Postology",
    repo: "aurum-avis-labs/postology-landing-page",
    domain: "https://postology.ai",
    languages: ["en", "de", "fr", "it"],
    defaultLanguage: "en",
  },
  {
    id: "holist-iq",
    displayName: "Holist-IQ",
    repo: "aurum-avis-labs/holist-iq-landing-page",
    domain: "https://holist-iq.ch",
    languages: ["en", "de"],
    defaultLanguage: "en",
  },
  {
    id: "kitchen-crew",
    displayName: "Kitchen Crew",
    repo: "aurum-avis-labs/kitchen-crew-landing-page",
    domain: "https://kitchen-crew.com",
    languages: ["en", "de", "fr"],
    defaultLanguage: "en",
  },
];
