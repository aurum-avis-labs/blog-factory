# supabase-vs-firebase-for-an-mvp

## Verified

- Supabase projects can be created in region Zurich (eu-central-2): https://supabase.com/docs/guides/platform/regions
- CVE-2025-48757: missing or ineffective row level security on some Lovable-generated Supabase setups; public anon key could query without login; 170+ apps reported; published 29 May 2025: https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Apple App Store Review Guideline 4.2 (minimum functionality, not a repackaged website): https://developer.apple.com/app-store/review/guidelines/
- Aurum product validation package uses Azure, React, and NestJS, not Lovable or Supabase (from WRITER-BRIEF.md service facts)

## Not verified

- Default Firebase/Firestore region for new projects created from Lovable or Bolt (console-dependent; not stated in article)
- Current Supabase and Firebase pricing tiers for a given traffic level (omitted)
- Whether Firebase offers a Zurich-only single-region option equivalent to Supabase eu-central-2 (omitted; only Supabase Zurich is claimed)

## Do not claim

- Other Supabase region claims beyond Zurich selection (calendar `apart` field)
- Invented CPC, conversion, or «good» load benchmarks for either platform
