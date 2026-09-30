# Register

One row per (product, platform). The CSV is the source of truth; the XLSX next to it is kept in sync row-by-row (same order). Both live in `backlinks/data/register/` (gitignored).

## Columns

| Column | Meaning |
|---|---|
| Product | Product name exactly as used everywhere (CitySage, Do4Me, ...) |
| Platform | Platform name exactly as in `master-platforms.tsv` (e.g. `Daily Pings`, `findly.tools`, `aat.ee`, `Navs.site`) |
| Status | One value from the vocabulary below |
| Listing URL | Public listing (or dashboard/launch URL while it is not public) |
| Submitted (date) | Date of the real submission |
| Last update | Set automatically by `update_register.py` |
| Plan | `Free` unless something else was explicitly approved |
| Badge needed | `yes` / `no` / `Optional` |
| Badge on site | `yes` / `no` - whether the product site currently serves that platform's badge |
| Notes | Newest first: `Agent <date>: <evidence> | older notes` (capped at 900 characters) |

## Status vocabulary

| Status | Use when |
|---|---|
| live | Public listing exists and was opened/verified |
| submitted | Form accepted, vendor has it, no public page yet |
| review / pending_review | Vendor says it is being reviewed (dashboard or mail) |
| scheduled | Launch date booked, goes live on its own |
| draft | Saved but not submitted (something is missing) |
| planned | Not started; we know it is possible |
| parked | Deliberately not pursued for now (eligibility, decision) |
| blocked | Generic blocker; say why in Notes (prefer a specific one below) |
| blocked_badge | Needs the badge on the product site first (or the listing is hidden until the badge verifies) |
| blocked_captcha | CAPTCHA / Turnstile / bot check in the way; never bypassed |
| blocked_paid | Only a paid plan gets us in; not paying |
| blocked_google_sso | Needs the user to complete a Google/GitHub sign-in |
| blocked_other | Vendor-side error, rejection, no free dates, quota, etc. (explain) |
| needs_email_verify | Waiting for a confirmation mail the user must open |
| error | Unexpected failure worth retrying |

Evidence rule: a note says what the page showed and when ("Badge verified, You're Live", "dashboard: Upcoming 1"), plus the URL when there is one. Do not set `live` from a submit confirmation alone; open the public page or dashboard.

## Change files

`update_register.py` takes a JSON list of changes:

```json
[
  ["Oblifinder", "Daily Pings", "live", "Badge verified on the server HTML; listing public.", "https://dailypings.com/p/oblifinder", "yes"],
  ["CitySage", "Navs.site", "planned", "Upload limit still active, retry after the reset.", null]
]
```

Fields: product, platform, status, note, url or null, badge (`yes`/`no`, optional). Unknown (product, platform) pairs are appended. Keep change files small (one batch per topic) and run with `--dry-run` first when unsure. Each write makes a backup in `backlinks/data/register/backup/`.

```bash
python3 .cursor/skills/backlink-directories/scripts/update_register.py changes.json --dry-run
python3 .cursor/skills/backlink-directories/scripts/update_register.py changes.json
python3 .cursor/skills/backlink-directories/scripts/add_product.py "NewProduct"
python3 .cursor/skills/backlink-directories/scripts/build_overview.py
```

Inside Cowork the repo is usually mounted on the user's computer; run these through the device shell so the files are edited in place (do not copy the register into the cloud workspace and back).

## Overview rules (`build_overview.py`)

- Kept platform = at least one product has a real listing (live, submitted, review, pending_review, scheduled, or hidden until badge verification on Daily Pings / findly.tools). Kept platforms show for all products, with the blocker for the missing ones.
- Dropped platform = nothing was ever submitted; listed with the reason.
- Categories: Live, Scheduled, In review, Waiting for badge, Planned, Blocked, Not attempted.
- Extra text (per-platform summaries, rules, owner overrides) goes into `backlinks/data/register/overview-notes.json`.

## Master platform list

`master-platforms.tsv` columns: platform, auth_lane, auth, free_dofollow, badge_needed, submit_url, master, notes. `master` is `yes` (use for every product), `trial` (try), `no` (skip). Keep it current when a platform proves useless or new ones are found.
