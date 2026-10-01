# vibe-coding-security-checklist

## Verified

- CVE-2025-48757: missing or ineffective row level security on Lovable-generated Supabase projects; public client key allowed queries without login; 170+ apps; reported March 2025, published 29 May 2025: https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Supabase region Zurich (eu-central-2) can be selected: https://supabase.com/docs/guides/platform/regions
- Vibe Code Review (Aurum service page facts via WRITER-BRIEF): review against OWASP ASVS v5.0; gap report; 8 hours on architecture and code quality; P0/P1/P2 action list; closing conversation; NDA; tools named include Cursor, Lovable, v0, Claude Code
- Aurum does not build the 12-week validation package with Lovable or Supabase (WRITER-BRIEF); tool articles stay neutral

## Not verified

- Whether every vibe-coded stack exposes the same default Supabase policy gaps as in CVE-2025-48757 (article treats RLS review as general practice, cites CVE as one documented case)

## Do not claim

- Neutral checklist only; do not imply every vibe-coded app is insecure or that only Aurum can fix it
- No Vibe Code Review prices
- No invented conversion or breach statistics beyond sourced CVE scope
