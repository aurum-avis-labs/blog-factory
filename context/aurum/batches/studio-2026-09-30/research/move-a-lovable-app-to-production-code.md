# move-a-lovable-app-to-production-code

## Verified

- Lovable can export and two-way sync project code to GitHub via Settings → Integrations → GitHub; one project links to one repository; you cannot import an existing GitHub repo into Lovable: https://docs.lovable.dev/integrations/github
- Git sync is available on all Lovable plans; direct ZIP download of the full codebase is on paid plans (Project settings → Git, or Download codebase in the code editor): https://docs.lovable.dev/integrations/github (and Lovable code editor / download documentation mirrored in search results)
- Typical Lovable stack: generated React front end with Supabase for auth and data (consistent with existing Aurum studio posts and writer brief).
- CVE-2025-48757: missing or ineffective row level security on some Lovable-generated Supabase projects; public client key allowed queries without login; 170+ apps; reported March 2025, published 29 May 2025: https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Supabase region Zurich (eu-central-2) can be selected: https://supabase.com/docs/guides/platform/regions
- Vibe Code Review facts from writer brief (OWASP ASVS v5.0, gap report, 8 hours architecture/code, P0/P1/P2 list, closing conversation, NDA; no prices).
- Aurum does not build customer validation packages with Lovable or Supabase (writer brief).

## Not verified

- Exact current Lovable plan names and which tier unlocks ZIP download (documented as paid plans; tier names not copied).
- Whether GitLab sync differs in steps from GitHub (docs mention GitLab; article focuses on GitHub as primary export path).
- Step-by-step Supabase project transfer between organisations (described conceptually only).

## Do not claim

- That exporting code alone makes an app production-ready or passes due diligence.
- Download counts, store approval guarantees, or CPC/conversion benchmarks.
- That Aurum rebuilds customer products inside Lovable.
