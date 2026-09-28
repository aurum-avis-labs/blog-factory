# Aurum Avis Labs — free-only SaaS directory batch

**Date:** 2026-09-28 (UTC)  
**Email:** info@aurum-avis-labs.ch  
**Products:** KitchenCrew (`https://kitchen.goldcrew.ai/`) · GoldCrew (`https://goldcrew.ai/`)  
**Platforms:** 13 (Twelve Tools, Sumodir, SaaSBison, DodoDirectory, Toolpilot, AI NavHub, Launching Next, Turbo0, Launch Llama, Web Review, HUNT0, What Launched Today, Smol Launch)

Credentials: `artifacts/logins.csv` (gitignored; unique password per platform).

---

## Summary (26 = 2 products × 13 platforms)

| Status | Count | Meaning |
|--------|------:|---------|
| `pending_review` | 4 | Free submit accepted; awaiting directory review/queue |
| `blocked_badge` | 14 | Free path requires on-site badge/backlink (see `badge-asks.md`) |
| `blocked_email_verify` | 2 | Account created; inbox verification needed before submit |
| `needs_manual` | 2 | Auth/submit lane exists but not completed in batch automation |
| `error` | 4 | Infrastructure/blocker (TLS, unreachable host) |

**Submitted/pending:** AI NavHub (both products), Launching Next (both products).  
**Not completed:** badge-gated directories (7 platforms × 2 products), Turbo0 auth, What Launched Today email verify, Launch Llama TLS, Web Review unreachable.

---

## By platform

| Platform | KitchenCrew | GoldCrew | Notes |
|----------|-------------|----------|-------|
| Twelve Tools | blocked_badge | blocked_badge | Free tier; embed at badge step |
| Sumodir | blocked_badge | blocked_badge | Featured on SumoDir embed |
| SaaSBison | blocked_badge | blocked_badge | Automated badge checks on free tier |
| DodoDirectory | blocked_badge | blocked_badge | Permanent badge monitoring |
| Toolpilot | blocked_badge | blocked_badge | Mandatory link back / logo |
| AI NavHub | pending_review | pending_review | Free email form returned **success** |
| Launching Next | pending_review | pending_review | GUI batch; ~4 month queue cited |
| Turbo0 | needs_manual | needs_manual | `/submit` redirects to email login; Google/GitHub skipped |
| Launch Llama | error | error | `ERR_CERT_COMMON_NAME_INVALID` |
| Web Review | error | error | Trial host `ERR_CONNECTION_CLOSED` from VM |
| HUNT0 | blocked_badge | blocked_badge | Free queue badge required; sign-in to finish |
| What Launched Today | blocked_email_verify | blocked_email_verify | Email signup OK; verify inbox (Google SSO skipped) |
| Smol Launch | blocked_badge | blocked_badge | Badge verification on product site |

---

## Rules applied

- Free tiers only; paid upsells not used.
- Google SSO / X login not used.
- Outlook not used.
- KitchenCrew and GoldCrew kept separate in all listings and notes.

---

## Artifacts

| File | Purpose |
|------|---------|
| `logins.csv` | Platform credentials (local only, gitignored) |
| `register-delta.csv` | One row per product×platform with status |
| `badge-asks.md` | Exact badge HTML where captured |
| `run-report.md` | This report |
| `media/` | Product logos and covers for uploads |
| `screenshots/` | Automation captures (where saved) |

---

## Recommended follow-ups (human)

1. Add required badges per `badge-asks.md` on **each** product domain, then re-run submit wizards for badge-gated platforms.
2. Verify **What Launched Today** email and complete dashboard submit for both products.
3. Complete **Turbo0** email registration/login, then submit both URLs.
4. Retry **Launch Llama** and **Web Review** from a network/browser that passes TLS and can reach the hosts.
5. Monitor **AI NavHub** and **Launching Next** for approval/queue movement.
