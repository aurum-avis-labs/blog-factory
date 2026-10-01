# lovable-supabase-row-level-security

## Verified

- CVE-2025-48757: missing or ineffective row level security on Lovable-generated Supabase projects; the public client key allowed queries without login; 170+ apps; reported March 2025, published 29 May 2025: https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Supabase project region Zurich (eu-central-2) can be selected: https://supabase.com/docs/guides/platform/regions
- Supabase documents Row Level Security for Postgres tables and the `anon` / `authenticated` roles used by the client SDK: https://supabase.com/docs/guides/database/postgres/row-level-security

## Not verified

- Whether a specific Lovable template in 2026 still ships with RLS disabled by default on new tables (vendor docs change; we describe the class of risk, not a live audit of every export).

## Do not claim

- CVE-2025-48757 only as stated in the brief (no extra victim counts, no named companies, no claim that every Lovable app is affected today).
