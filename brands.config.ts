export interface BrandConfig {
  /** Internal identifier — matches folder name under brands/ */
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
    id: "beauty-corner",
    displayName: "Beauty Corner",
    repo: "aurum-avis-labs/beauty-corner-landing-page",
    domain: "https://www.kosmetik-wettswil.ch",
    languages: ["de", "en"],
    defaultLanguage: "de",
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
