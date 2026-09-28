# SaaS directory batch — run report

**Batch:** Aurum Avis Labs free-only cloud submit  
**Email:** info@aurum-avis-labs.ch  
**Products:** CitySage, Holist-IQ  
**Date (UTC):** 2026-09-28  
**Host repo:** blog-factory (scratch); credentials in `artifacts/logins.csv` (gitignored)

## Summary

| Status | Count (product×platform) |
|--------|--------------------------|
| blocked_badge | 10 |
| needs_email_verify | 8 |
| submitted | 2 |
| blocked_captcha | 2 |
| blocked | 4 |
| **Total** | **26** |

Skipped per instructions: Fazier, Google SSO-only paths, paid tiers, Outlook.

## Highlights

- **Badge-gated (5 platforms × 2 products):** Twelve Tools (`twelve.tools`, not parked `twelvetools.com`), Sumodir, SaaSBison, DodoDirectory, Toolpilot. Exact badge/backlink text in `artifacts/badge-asks.md`.
- **Submitted:** AI NavHub — free submit form completed for both products (no “buy me a coffee” quick path).
- **Auth / mailbox (4 platforms × 2 products):** Turbo0, HUNT0, What Launched Today, Smol Launch — accounts exist or signup blocked; listings not published without email verification / login. Passwords recorded per platform in `logins.csv`.
- **Launching Next:** Cloudflare challenge (`blocked_captcha`).
- **Launch Llama:** TLS certificate mismatch (`blocked`).
- **Web Review:** Host unreachable from batch environment (`blocked`).

## Artifacts

| File | Purpose |
|------|---------|
| `register-delta.csv` | Full 26-row matrix with `Product` column |
| `logins.csv` | Platform credentials (local only — not committed) |
| `badge-asks.md` | Exact HTML / vendor copy for badge gates |
| `assets/` | Logo/cover copies for uploads |

## Next steps (human)

1. Place badges on CitySage `/help` and Holist-IQ root per `badge-asks.md`, then re-run free submit on badge-gated directories.
2. Confirm AI NavHub listing emails / dashboard.
3. Complete email verification and product forms on Turbo0, HUNT0, WLT, Smol Launch using `logins.csv` (Turbo0 may need “Forgot password” if an earlier automation password was set).
4. Retry Launching Next and Web Review manually when Cloudflare / host availability allows.
