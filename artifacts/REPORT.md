# Oblifinder — Wave B Core + Wave A quick (free-only)

**Product:** [Oblifinder / Schiesspflicht-Termine](https://schiesspflicht-termine.ch/)  
**Run date:** 2026-09-28  
**Artifacts:** `register-delta.csv`, `logins.csv`, `assets/`, `screenshots/`, `thesaasdir-badge.html`

## Summary

| Platform | Status | Listing |
|----------|--------|---------|
| Neeed | blocked_captcha | — |
| Fazier | needs_robert_handoff | — |
| Wired Business | review | — |
| TheSaaSDir | **live** | [Product page](https://thesaasdir.com/product/oblifinder/) |
| AI NavHub | submitted | API success (free path) |
| Launching Next | blocked_captcha | — |

**2/6** progressed to live or submitted without paid upgrades. **4/6** stopped on captcha, existing-account auth, or incomplete Wired submit in automation.

## Per platform

### Neeed
- Free plan selected path requires sign-in; **Cloudflare Turnstile** on auth (`blocked_captcha`).
- Credentials prepared in `logins.csv` (not used to create account).

### Fazier
- Email signup: **Email has already been taken** for `info@aurum-avis-labs.ch`.
- Login with run-generated password: **Email or Password is invalid**.
- **needs_robert_handoff:** reset password or supply existing Fazier password, then complete free listing (watch gallery/topicsList).

### Wired Business
- Step 1–3 completed (URL analyze, screenshot, review) with Oblifinder copy and `info@aurum-avis-labs.ch`.
- **Submit for verification** did not advance in headless runs; likely needs manual click or follow-up in a normal browser session before badge step.

### TheSaaSDir
- **Live** listing; published 2026-09-26. Free Standard tier; dofollow requires badge on site.
- Vendor badge HTML saved to `thesaasdir-badge.html`.

### AI NavHub
- Free submit fields: `website`, `url`, `email`. POST `https://ainavhub.com/api/submit` → `{"message":"Success"}`.

### Launching Next
- Submit URL shows **Cloudflare bot/security verification** (`blocked_captcha`).

## Next actions (human)
1. **Fazier:** password reset / login → free submit + badge if required.
2. **Neeed:** complete Turnstile in browser → free + badge plan.
3. **Wired Business:** finish Submit for verification → add Wired badge.
4. **Launching Next:** complete CF check in browser if desired (~4 month review queue).
5. **Badges:** deploy TheSaaSDir (and other) badge HTML on `schiesspflicht-termine.ch` when ready.
