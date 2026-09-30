# Backlink directories: what we did and how

Written 2026-09-30 after the first full run: nine products, about 46 platforms, about 280 register rows, done with Claude in Chrome driven from Claude (Cowork / Claude Code). This file is the story and the lessons. The operating instructions for a new product are in the skill `.claude/skills/backlink-directories/SKILL.md`; per-platform details are in its `reference/platforms.md`.

## Goal

Get every Aurum Avis Labs product (CitySage, Do4Me, GoldCrew, Holist-IQ, Inklets, KitchenCrew, Oblifinder, Postology, Vemoir) onto free directories and launch sites for backlinks and discovery, without paying, without sending mail, and with a register that always shows where each product stands.

## Roles

- **Agent (Claude in Chrome):** fills forms, uploads assets, verifies, records, reports.
- **User:** signs in where a password or Google OAuth is needed, approves public actions (upvotes, comments), decides on paid offers (default no), solves CAPTCHAs if they want to.
- **Dev:** deploys badges on the product sites from a written task file; never the agent.

## What data exists and where

All private and gitignored under `backlinks/data/` (this repository is public):

- `register/aal-directory-backlinks.csv` + `.xlsx`: one row per product x platform (source of truth), `master-platforms.tsv`, overview workbooks.
- `brands/<slug>/`: `product-kit.md` (copy, tags, contact, assets list), `inventory.md` (platform-by-platform checklist for some products), `ICP.md`, and `assets/` (square logo, 16:9 cover, UI screenshots).
- `tasks/`: dev task files (`BADGE-TASKS-*.md`) and the running status note for the user.
- `shared/`: sign-in cheat sheet (which platform uses which login lane; no passwords) and the handoff text.

Passwords were never stored in the repo or typed by the agent; they live in the user's password manager.

## Timeline of the first run

1. **Kits and first submissions (2026-09-25 to 28).** Product kits and assets were prepared; platforms with no account or simple forms went first (Wired Business, TheSaaSDir, AI NavHub, Sumodir, SaaSBison, DodoDirectory, Twelve Tools, InstantLaunch, Startup Fame, Nick Launches). Cloud sessions later had to be taken over, so the register and the master platform list became the single source of truth.
2. **Takeover and sweep (09-28/29).** The user signed in on the Google-SSO and password platforms in Chrome tabs the agent had opened. The agent went through every blocked row and unblocked what could be unblocked without paying or mailing: Smol Launch, Turbo0, BetterLaunch, ScrollLaunch, StartupBase, SaaSCity, What Launched Today, Fazier, HUNT0, TinyLaunch.
3. **Badge waves 1-5 (09-28 to 09-30).** Many free plans require the platform's badge on the product site. The agent collected each platform's exact snippet, wrote one task file per wave for the dev, and re-verified the raw served HTML after every deploy before clicking Verify. Wave 5b fixed the last cases and removed 14 badges that had no listing behind them.
4. **Late platforms (09-29/30).** Daily Pings and findly.tools (all products), Navs.site (three live, six waiting for the daily image quota), aat.ee (all nine scheduled on the Free Launch, one per day 26 Nov - 4 Dec 2026), Firsto (no free dates).
5. **Final overview (09-29, refreshed 09-30).** A workbook listing every platform where at least one product has a real listing, for all products, with the blocker per gap; platforms where nothing was ever submitted went to a "dropped" sheet with the reason.

State at the last check (2026-09-30): 78 rows live, 42 scheduled, 67 in review, 6 planned (Navs.site), 35 blocked, 42 not attempted on partial platforms; 30 platforms kept, 16 dropped.

## Decisions that shaped the process

- **Free only, always.** Premium, skip-the-line, Fast Track, "we submit for you", promo codes: declined and noted. If the free path does not exist, the row is `blocked_paid`.
- **One flagship per scarce slot.** Uneed and Launch Llama give one free slot per account: it goes to the flagship product (Vemoir), the rest are recorded as `blocked_paid`.
- **A product whose root route is the app** (CitySage) can only carry badges on a subpage (`/help`). It is listed only where no root-URL verification is required (Fazier, Daily Pings, Nick Launches accept the subpage URL; Startup Fame does not). Platforms that never worked for it stay blocked.
- **Orphan badges are removed.** A badge without a listing gives nothing; after the waves the agent compared badges on each site with the register and the user approved a removal list for the dev.
- **Dropped is fine.** Platforms with only blockers (Cloudflare, reCAPTCHA, paid-only, bot loops, vendor bugs) were dropped from the final overview with their reasons instead of being chased.
- **No support contact, no emails.** Anything that would need the vendor is listed for the user.

## Lessons learned (short)

1. **Raw HTML is what verifiers read.** Badges added client-side, inside a JS-rendered root, or only after hydration fail verification or vanish for visitors. Always compare raw HTML with the DOM (`scripts/check_badges.js`).
2. **Footers can silently cap the list.** One footer rendered only the first ~10 badges after load; the newest vanished. A pre-rendered page that differs from the client bundle is the usual cause.
3. **Duplicates are the main way to break a listing.** Sumodir, SaaSBison, Neeed, Web Review and Turbo0 all refused or created duplicates. Open the profile/dashboard before submitting; never submit twice.
4. **"Try again later" errors are often real limits.** An HTTP 500/503 on aat.ee was a fully booked launch date; Navs upload errors were a signed-out session or the 5-images-per-24-h quota.
5. **Drafts carry over.** Forms restore the previous product's categories, tags, pricing and date. Overwrite everything and read the review step.
6. **Pre-checked upsells are common.** Verify that every paid checkbox is off and the total is $0 before the final click.
7. **Wait for hydration.** Some wizards lose early typing (aat.ee needs 20-60 s).
8. **Write the register row immediately**, with evidence. It is what lets a new session (or a different agent) continue without re-checking everything.
9. **Quotas reset on their own clock.** Note the reset, plan the retry, do not probe repeatedly.
10. **Assets matter.** Wrong stock logos in a kit (mountain photos) and a Kickstarter sticker on a cover both reached public listings. Check every logo and cover once, and keep the files that are actually correct in the kit.

## How the agent drove the browser

Claude in Chrome (extension tools: tabs, navigate, computer, read_page, form_input, find, javascript_tool, browser_batch, file_upload). Details and workarounds are in `.claude/skills/backlink-directories/reference/browser-playbook.md`. The pattern per platform was always: open own tab, confirm login, fill step by step with batched actions, check the review step, submit once, open the public page or dashboard as proof, write the register row, close the tab.

## Repeating it for a new product

Say: "New product X, list it on the free directories." The skill takes it from there: intake questions (name, URL, copy, assets, dev/repo), kit file, `add_product.py`, Wave A (no badge), badge task file for the dev, verification, register updates, overview workbook, and an open-items list split by user / dev / agent. Expect about two days of calendar time, mostly waiting for the dev deploy, image quotas and vendor reviews. Check again after 2-4 weeks for reviews and after the scheduled launch dates.

## Open items at the time of writing

- Navs.site: six products to submit once the image quota resets (two per day).
- Firsto: re-check for free dates.
- Dev: footers on a few sites still lose the newest badges after client load (Do4Me German root, KitchenCrew, Postology).
- Optional: English version of the German-only site (Fazier requires it), cover images for two Findly listings, a StartupBase badge for the priority queue.
