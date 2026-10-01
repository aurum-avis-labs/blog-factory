# api-keys-and-secrets-in-ai-built-apps

## Verified

- Supabase anon (publishable) keys are intended for client apps; data access must be enforced with Row Level Security policies, not by hiding the key: https://supabase.com/docs/guides/api/api-keys
- Supabase service role key bypasses RLS and must not ship in browser code: https://supabase.com/docs/guides/api/api-keys
- CVE-2025-48757: missing or ineffective RLS on Lovable-generated Supabase projects; public client key allowed queries without login; 170+ apps; reported March 2025, published 29 May 2025: https://nvd.nist.gov/vuln/detail/CVE-2025-48757
- Vite exposes variables prefixed with VITE_ to the client bundle: https://vitejs.dev/guide/env-and-mode.html
- Next.js exposes NEXT_PUBLIC_ variables to the browser: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- Aurum Vibe Code Review: gap review against OWASP ASVS v5.0 (from WRITER-BRIEF service facts)

## Not verified

- Exact count of Lovable projects still shipping service role keys in frontend (beyond CVE report scope)
- Whether a specific AI builder always labels Supabase keys correctly in exported env files

## Do not claim

- (calendar `apart` field empty)
