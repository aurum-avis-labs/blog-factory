# Platforms: paths, conditions, traps

State of knowledge as of **2026-09-30**. Vendors change their free tiers, queues and verifiers without notice; treat every line as a starting point and trust what the page shows today. Free plan only, always. "User" = the person who signs in.

How to read an entry: **Lane** = how you get in. **Free** = what the free plan needs. **Traps** = things that cost time.

## Quick table

| Platform | Lane | Badge | Free tier in short |
|---|---|---|---|
| aat.ee | user signed in | no | Free Launch, 5 slots per day, dates fill up |
| Navs.site | Google | no | listing live at once, 5 image uploads / 24 h |
| Daily Pings | user signed in | yes | free "with badge" plan |
| findly.tools | user signed in | yes | free listing, hidden until badge verified |
| Fazier | email + password (user) | yes | free launch needs badge, English site, comments |
| What Launched Today | Google | no | free launch, date ~40 days out, lifetime dofollow |
| Smol Launch | email/Google | yes | Free Verified needs badge + community unlock |
| TinyLaunch | Google | no | free plan, dofollow only for top 3 + badge |
| HUNT0 | email + password | no | Free Community Queue |
| Turbo0 | email + password | yes | free plan needs badge, ~2 weeks |
| Neeed | email + password | yes | free with badge, dofollow after verify |
| Wired Business | no account | yes | free form, badge in static HTML |
| TheSaaSDir | no account | yes | free tier needs badge for dofollow |
| Twelve Tools | email + password | yes | free flow verifies badge automatically |
| Sumodir / SaaSBison / DodoDirectory | email + password | yes | free with badge, review up to 2 weeks |
| InstantLaunch | Google | yes | free tier, dofollow after badge verify |
| Startup Fame | Google | yes (root URL) | free verified, review <= 7 days |
| Nick Launches | Google | yes | free launch week, badge = product page link |
| Toolpilot | form + hCaptcha | yes | free with backlink, hCaptcha gate |
| Launch Llama | Google | yes | 1 tool per account on free plan |
| Uneed | Google | no | ONE scheduled launch at a time |
| PitchWall | Google | no | free launch, review 30+ days |
| AI NavHub | form | no | editorial review |
| Launching Next | form | no | ~4 month queue, bot check |
| BetterLaunch, ScrollLaunch, SaaSCity, StartupBase | Google | badge for dofollow / scheduling | see entries |
| Firsto | Google | conditional | Free Launch, queue ~180 days |
| Product Hunt | personal account | no | user handles gallery + schedule |

## Entries

### aat.ee
- Lane: user signed in. Wizard at `https://www.aat.ee/projects/submit`, 4 steps, Free Launch is the default plan. Never touch Basic/Plus/Pro/Ultra/Premium/Fast Track or the AAT15 promo code. Free Launch needs no badge, so products with badge restrictions (CitySage) can use the root URL.
- Traps: the page hydrates slowly (20-60 s); text typed before hydration is lost (wait until the editor exists). Uploads persist, typed text may not. A draft from the previous submission is restored: overwrite/clear every field, categories (max 3), tags, pricing and date. Labels need 600-700 ms between clicks; tags: click field, type, Return. The launch date is a native select: set it with the prototype setter + events. Next/Submit sometimes need a JS click. A full date makes the final POST fail with HTTP 500/503 (React error #441) although it looks like an outage: choose the first date with free slots (5 per day). Verify on the review step, click "Submit Project", wait ~8 s, expect `/projects/<slug>` with "scheduled for launch" and the dashboard showing Upcoming.
- Result: nine products scheduled 26 Nov - 4 Dec 2026, one per day.

### Navs.site
- Lane: Google sign-in by the user (`/auth/login`). 7-step form at `https://navs.site/submit`. The listing is live immediately ("Your listing is now live"), public URL `/website/<slug>` (may 404 until republish).
- Step 1: URL, name, one-line description, up to 5 categories, **AI type** (Core AI functionality / AI-assisted features / Non-AI tool: pick honestly), platforms, product languages (match the site; Oblifinder is German-only), optional support email. Step 2: 1-3 real screenshots (required), logo (recommended, <= 1 MB), YouTube optional. Later steps include key features, pricing, and **at least one genuinely similar published tool as "alternative"** (pick the closest match, even a loose one).
- Traps: **five image uploads per rolling 24 h** (message: "You can upload up to five images every 24 hours."). Plan for about two products per day (logo + 1-2 screenshots each). A signed-out session fails uploads with "Sign in before uploading" / HTTP 400. Missing images can be added later via "Edit and resubmit".

### Daily Pings
- Lane: user signed in. Submit on the free plan "with badge" (Premium $19 never). Every listing waits for its badge; then `badge-install/<ID>` > Verify badge (see badges doc). URL field: the page that carries the badge (CitySage: `/help`).

### findly.tools
- Lane: user signed in. Free draft listing per product (logo, app image, details, pricing model, account requirement, alternatives). Hidden ("Not published") until the badge verifies. Edit URL `profile/tools/<toolId>/edit?tab=listing`; tabs Listing / Details / Pricing / Alternatives / Features / Images.
- Traps: an upload limiter ("Too many uploads") can leave a listing without a cover: add it later on the Images tab. Fields that had to be guessed (free vs freemium, account required, model) should be checked once the listing is public. Never use "We submit for you from $59" or Premium.

### Fazier
- Lane: email + password account (the user signs in). Free launch conditions (2026-09): the Fazier badge on the product site (embed snippet is shown on the launch step 3 after the product link is entered; image `badges/launch_badges.svg`), a required checkbox "website has an English version" (do not tick it for a German-only site), DR > 0, and 3 comments on other launches (a public action: ask the user first).
- Traps: upsells are pre-checked (Premium $49, Newsletter $39, 50+ Directories $79): uncheck all and verify. Earliest free date was about four weeks out. A vendor-side JS error ("topicsList is not an array") blocked the topic selector for a while: retry later. The launch page can show a Kickstarter-style sticker if the first gallery image has one: check covers before uploading.

### What Launched Today
- Lane: Google sign-in (an emailed magic link expired; do not chase it). Free launch: $0, date about 40 days out (several products may share a date), lifetime dofollow backlink, review 2-4 business days, no badge.
- Trap: abandoned "Untitled Product" drafts pile up in the account (harmless).

### Smol Launch
- Lane: one account for all products. Free Verified plan ($0): badge on the site plus a **community unlock** (upvote three other makers' launches: public action, needs the user's OK, done once per account). Reserved week starts Monday 9am PT, review within about a day. Premium $19 jump-the-line declined.
- Trap: if the badge cannot be detected (e.g. a subpage, Cloudflare in front), do not use "ask us to check by hand" (contacts support); report the options instead.

### TinyLaunch
- Lane: Google. Create the startup (category, square logo, 16:9 cover, tagline <= 60 chars), choose the free plan with "Continue with free launch" (decline the $39 Premium upsell), launch Mondays, pending review (<24 h). The free dofollow backlink only applies to the top 3 of a launch day and needs the badge. Duplicate startups are easy to create; check the dashboard first.

### HUNT0
- Lane: email + password (verification token expired once; password login still worked). Free Community Queue $0, launch week about three months out, badge optional (queue skip only). Submitting needs a signed-in session.

### Turbo0
- Lane: email + password; the account email must be verified. Free plan needs the "Listed on Turbo0" badge linking to `https://turbo0.com/item/<slug>` on the product site. Create the draft, put the badge live, verify ("Backlink verification successful"), submit; dashboard shows Pending, listed within ~2 weeks. Paid plans (Basic $29.9, Pro $99.9, review blog) declined.
- Trap: duplicate drafts when a product is started twice.

### Neeed
- Lane: email + password (the user signs in). Free with badge; "Verify Badge" gives a dofollow link; "Go Premium $19" declined. Before submitting always open the profile: a second submission created a duplicate listing (`/products/<slug>-2`, unverified, cannot be deleted from the edit page).

### Wired Business
- Lane: no account; free form with email. The verifier wants the badge in the **static HTML outside `#root`** (a server-rendered image inside the prerendered root failed, a static footer outside the app shell passed). Public page is marked Verified; Pro $29 declined. A vendor error page (`ERR_HTTP_RESPONSE_CODE_FAILURE`) blocked one product for days: nothing to do but wait.

### TheSaaSDir
- Lane: no account, email for updates. Free tier needs the vendor's exact badge HTML for a dofollow link; "Verify" passes once the raw HTML has it. Resubmits answer "Already Submitted".

### Twelve Tools
- Lane: email + password. The free flow verifies the badge automatically, then asks for a cover (own 16:9), category, confirmation "Your website is live". If a stale draft session blocks a fresh start, use `www.twelve.tools`. A "restricted keyword" rejection hit a product whose subject is shooting practice, even after rephrasing: a content filter, not fixable by us.

### Sumodir, SaaSBison, DodoDirectory
- Lane: email + password. Free listing needs the platform badge on the homepage/footer; paid tiers skip it (Premium $149 on SaaSBison, not used). The message "This website already has a listing" means the record exists; the item page stays 404 until the vendor approves (up to 2 weeks). Do not resubmit.

### InstantLaunch
- Lane: Google; start at `submit?tier=free`. Dofollow only after the badge verifies ("Badge verified. Your link is now dofollow."). The vendor check failed twice with HTTP 400 while the badge was fine, then passed: retry after a few hours before blaming the site.

### Startup Fame
- Lane: Google. The bot checks the **root URL** for a startupfa.me link; the URL field is locked to the root. A product whose badges can only live on a subpage therefore cannot pass (verification fails, status blocked_badge). Free Verified reviews take up to 7 days. The login page rendered blank in one Chrome profile: use another tab/profile.

### Nick Launches
- Lane: Google (email + password is broken). The badge href is the **product's listing URL on Nick Launches plus UTM**, so the dev cannot add it until the listing/slug exists; the listing page 404s until approved. Free launch weeks are assigned after review.

### Toolpilot
- Lane: Jotform; free plan needs a footer backlink to `https://www.toolpilot.ai/`. The final submit sits behind hCaptcha for most products (never bypassed); paid options $99/$199 never used. One submission went through without the gate.

### Launch Llama
- Real host is `https://tools.launchllama.co` (launchllama.com is a different site with a TLS error). Google sign-in. The free plan allows exactly one tool per account; "Add another tool" shows "Upgrade to Featured" (paid). Use the slot for the flagship product only.

### Uneed
- Google or email sign-in. The free plan allows ONE scheduled launch at a time, launches are booked months out. Keep the slot for one product; the others wait or go paid (not paying).

### PitchWall, AI NavHub, Launching Next
- PitchWall: Google; "Under Review" can take 30+ days (status page per product).
- AI NavHub: plain form, POST `/api/submit` returns success, editorial review, backlink encouraged.
- Launching Next: long queue (~4 months); `/submit/` showed a JavaScript bot-check then a 404 (not bypassed); the user can submit by hand in normal Chrome.

### BetterLaunch, ScrollLaunch, SaaSCity, StartupBase
- BetterLaunch: free $0 plan, launch on a Monday after approval; dofollow only after the badge verifies ("Badge found! Your dofollow backlink has been activated"); skip-the-line $9 and Starter $19 declined.
- ScrollLaunch: Google; product saved as Draft; scheduling needs the badge verified (edit page > Verify Now > Verify Badge > Schedule Product); free weeks are limited (earlier ones full); Premium+ $39 and directory upsells declined.
- SaaSCity: free listing needs the SaaSCity badge live first; one listing per domain; Quick Pass $19.99 declined; status pending review.
- StartupBase: free standard queue 10+ weeks; joining needed 3 upvotes and 1 comment on other launches (public actions, user OK); skip-the-line $39 declined; a badge would move it to the priority queue.

### Firsto
- Lane: Google. Wizard `https://firsto.co/projects/submit`: name + URL (an AI draft is generated in ~15 s), details (short description <= 160 chars, logo 400x400 <= 512 KB, cover 1200x630 <= 512 KB), then Launch Settings. Free Launch: 5 slots daily, queue about 180 days; Premium $19.9 and Pro $59.9 never. On 2026-09-30 every October date showed "Full" and no later month was offered: re-check every few weeks (you can stop at the launch-settings step without submitting).

### Product Hunt
- Personal account. The agent can prepare a draft; the user adds the gallery and schedules the launch.

## Dropped or blocked (and why)

| Platform | Why |
|---|---|
| Alternative.tools | Free listing needs DR 25+ (we had DR 10) |
| AlternativeTo | Account creation failed (signup error), email + password |
| alternative.me | Account email verification never arrived; dropped |
| SaaSHub | Submissions from the info address are blocked |
| SideProjectors | Email signup refused the password; needs a manual account |
| SoftwareWorld, Startup Buffer | Cloudflare challenge on the form |
| Promote Project | reCAPTCHA required on signup |
| Tiny Startups | Listing goes live only after a post on X (user) |
| MicroLaunch | Only with a paid Pro credit |
| Shipybara | Google/GitHub only, 0 free slots when checked; dropped |
| Boost Domain Rating | Free listing needs DR >= 20 |
| LaunchLeague | 503 maintenance page, Google only; dropped |
| Web Review | 503, then "already has a listing" for every domain (vendor side); dropped |
| Firsto | No free dates (see above); kept as "re-check" |

## Adding a platform

Add a row to `master-platforms.tsv` (platform, auth lane, free dofollow?, badge needed?, submit URL, master yes/trial/no, notes) and a short entry here after the first real attempt: lane, free conditions, traps, and what proved the listing was live.
