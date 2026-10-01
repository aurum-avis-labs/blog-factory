# authentication-for-an-mvp

## Verified

- CVE-2025-48757 (missing or ineffective Supabase RLS on Lovable-generated projects; public anon key; 170+ apps; reported March 2025, published 29 May 2025): https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Supabase documents Row Level Security and client vs service role keys in project docs: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Auth (email, OAuth providers, session handling) is described in Supabase guides: https://supabase.com/docs/guides/auth
- OWASP ASVS v5.0 is the standard cited for Aurum Vibe Code Review on the service page (not re-opened here for auth chapter numbers).
- Swiss FADP applies when you store identifiable data such as email addresses in an auth table; general principle from Fedlex FADP, not quoted article-by-article in the post.

## Not verified

- Exact share of Lovable MVPs that ship without RLS today (only the CVE cohort is sourced).
- Whether Apple or Google require a specific auth method for MVPs (only general app guidelines in brief, not tied to login choice).

## Do not claim

- (calendar `apart` field empty)
