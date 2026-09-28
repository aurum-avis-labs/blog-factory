# Inklets directory batch run report

**Product:** Inklets (https://inklets.app)  
**Batch date:** 2026-09-28  
**Email:** info@aurum-avis-labs.ch  
**Rules:** Free-only; no Google SSO; no payment; no mailbox access.

## Summary counts

| Status | Count |
|--------|------:|
| blocked | 2 |
| blocked_badge | 4 |
| blocked_captcha | 2 |
| blocked_paid | 1 |
| needs_email_verify | 3 |
| submitted | 1 |
| **Total platforms** | **13** |

## Per-platform outcomes

### Twelve Tools
- **Status:** blocked_badge
- **Plan:** Free
- **Badge needed:** Yes
- **Listing URL:** https://twelve.tools/submit-your-tool
- **Notes:** Free flow stops at Badge step; requires homepage/footer backlink to twelve.tools.

### Sumodir
- **Status:** blocked_badge
- **Plan:** Free Launch ($0)
- **Badge needed:** Yes
- **Listing URL:** https://sumodir.com/submit
- **Notes:** $0 plan requires permanent “Featured on SumoDir” badge on site.

### SaaSBison
- **Status:** blocked_badge
- **Plan:** Free Listing
- **Badge needed:** Yes
- **Listing URL:** https://saasbison.com/submit
- **Notes:** Free tier requires site badge/backlink; paid Premium skips badge (not used).

### DodoDirectory
- **Status:** blocked_badge
- **Plan:** Free
- **Badge needed:** Yes
- **Listing URL:** https://dododirectory.com/submit
- **Notes:** $0 plan requires permanent Featured badge on site.

### Toolpilot
- **Status:** blocked_paid
- **Plan:** Paid listing (Shopify)
- **Badge needed:** No
- **Listing URL:** https://www.toolpilot.ai/pages/submit-your-ai-tool
- **Notes:** No free-only submit path; checkout/payment detected.

### AI NavHub
- **Status:** submitted
- **Plan:** Free
- **Badge needed:** Encouraged (backlink)
- **Listing URL:** https://ainavhub.com/submit
- **Notes:** Free submission form completed for Inklets; awaiting review.

### Launching Next
- **Status:** blocked_captcha
- **Plan:** Free
- **Badge needed:** No
- **Listing URL:** https://www.launchingnext.com/submit/
- **Notes:** Cloudflare security verification blocked automated access.

### Turbo0
- **Status:** needs_email_verify
- **Plan:** Free
- **Badge needed:** No
- **Listing URL:** https://turbo0.com/submit
- **Notes:** Email already registered; cannot complete login/submit without inbox access (Google/GitHub SSO skipped).

### Launch Llama
- **Status:** blocked
- **Plan:** Free
- **Badge needed:** No
- **Listing URL:** https://launchllama.com/
- **Notes:** Site TLS error prevented any submit attempt.

### Web Review
- **Status:** blocked
- **Plan:** Free
- **Badge needed:** No
- **Listing URL:** https://webreview.ai/
- **Notes:** Site unreachable (connection closed) from batch environment.

### HUNT0
- **Status:** needs_email_verify
- **Plan:** Free Launch (70 slots/week)
- **Badge needed:** No (optional for Badge Launch queue skip)
- **Listing URL:** https://hunt0.com/submit
- **Notes:** Launch wizard reachable; publish requires Sign in.

### What Launched Today
- **Status:** needs_email_verify
- **Plan:** Free
- **Badge needed:** No
- **Listing URL:** https://whatlaunched.today/auth/signin?returnUrl=%2Fdashboard%2Fsubmit
- **Notes:** Email/password signup attempted; verification required before dashboard submit (Google SSO not used).

### Smol Launch
- **Status:** blocked_captcha
- **Plan:** Free
- **Badge needed:** Optional (Free Verified tier)
- **Listing URL:** https://smollaunch.com/submit
- **Notes:** Email signup path exists at /signup but Cloudflare Turnstile blocked automation; Google SSO not used.

## Skipped (not in TSV)
- **Fazier:** skipped per instructions (known UI bug).

## Credentials
- Attempted signup passwords: `artifacts/logins.csv` (gitignored; do not commit).
