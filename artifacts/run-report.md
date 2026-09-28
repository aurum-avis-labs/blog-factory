# SaaS directory batch run report

- **Batch email:** info@aurum-avis-labs.ch
- **Products:** Do4Me (https://do4me.work/), Postology (https://postology.ai/)
- **Platforms attempted:** 13 (Fazier skipped per brief)
- **Cells (product × platform):** 26
- **Completed at:** 2026-09-28T16:13:25.484Z

## Outcome summary

| Status | Count |
|--------|------:|
| blocked_badge | 8 |
| blocked_captcha | 2 |
| blocked_email_verify | 2 |
| blocked_google_sso | 4 |
| blocked_paid | 2 |
| error | 4 |
| pending_review | 2 |
| submitted | 2 |

## Submitted (free)

- **AI NavHub:** Do4Me and Postology — free submit form accepted (success response).

## Blocked — badge (free tier)

- Twelve Tools, Sumodir, SaaSBison, DodoDirectory — see `badge-asks.md` for exact HTML.

## Blocked — policy / environment

- **Toolpilot:** paid Shopify listing only.
- **Launching Next:** Cloudflare captcha in automation.
- **Turbo0:** registration/submit needs email verification.
- **Smol Launch, What Launched Today:** Google SSO only.

## Incomplete / infra

- **HUNT0:** form prepared; sign-in required (existing account, password reset needed).
- **Launch Llama:** TLS certificate error.
- **Web Review:** site connection failed.

## Artifacts

- `logins.csv` — platform credentials (gitignored)
- `register-delta.csv` — per product×platform status
- `badge-asks.md` — badge HTML for blocked_badge platforms
- `passwords.tsv` — local password map (gitignored)
