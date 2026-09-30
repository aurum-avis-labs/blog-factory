# Badges and the dev hand-off

Many free plans only list a product (or only give a dofollow link) if the platform's badge is on the product's site and the platform's verifier finds it. The verifiers fetch the page once as plain HTML, so the badge must be in the **raw server response**, not only added by client-side JavaScript.

## What "done" means for a badge

1. The raw HTML contains the badge link (check with `scripts/check_badges.js` or `curl -s URL | grep -i <host>`).
2. The rendered page still shows it after the client app loaded (same script: `dom` count equals 1, not 0 and not 2).
3. The platform's own verify step passes and the public listing opens.
4. The register row says `live` with `Badge on site = yes`.

If (1) fails, verification will fail; do not keep clicking Verify. If (1) passes and (2) fails on a cache-busted load, verification works today, but visitors and JS-rendering crawlers do not see the badge and a browser-based daily re-check may fail; put it on the dev list.

## Audit script

`scripts/check_badges.js` compares raw HTML with the DOM for one page and prints `host raw:N dom:N` for every known directory host plus a PROBLEMS list for the hosts you expect. Paste it into the javascript tool on the product's tab (one run per site; for a product whose badges live on a subpage, open that subpage). Output avoids `?`, `&`, `=` because URL-like output can be blocked by the tool.

What the audit found in practice: badges added only client-side, a CSP that blocked the badge image host, a static-HTML verifier that ignored anything inside `#root`, and one false alarm (see Cache trap below).

## Cache trap (false "vanishing badge" alarm)

The audit compares a fresh `fetch(..., {cache: 'no-store'})` of the raw HTML with the DOM of the tab. If the tab itself was opened from the browser's HTTP cache, the DOM belongs to an older deploy and the newest badges look as if they vanished after hydration. This happened on 2026-09-30 (Do4Me German root): the DOM had the first 10 badges, the raw HTML 14; `performance.getEntriesByType('navigation')[0]` showed `transferSize` 0 and a smaller document. Open the page as `URL?cb=<timestamp>` before auditing (the script prints `stale-nav: true` when `transferSize` is 0), and only hand a "vanishes after load" issue to the dev if the cache-busted load still misses the badge.

## Orphan badges

A badge on a site without a real listing behind it gives nothing. After the submission waves, list the badge hosts per site and compare with the register: hosts with no live/submitted/review/scheduled/hidden-until-badge row are candidates for removal. Keep badges of platforms that are merely waiting (review, scheduled, planned, "may come back"). The user decides per group; the dev removes.

## Verify buttons (as of 2026-09-30)

- **Daily Pings** (free "with badge" plan, never Premium): `https://dailypings.com/badge-install/<ID>`, scroll to the bottom, click **Verify badge**; success redirects to `/p/<slug>` ("Badge verified, You're Live"). One install ID per listing (visible in the profile). The platform re-checks daily. Snippet: `<a href="https://dailypings.com/p/SLUG" target="_blank" rel="noopener" title="Featured on DailyPings"><img src="https://dailypings.com/badge.svg" alt="Featured on DailyPings" width="179" height="32" /></a>`.
- **Findly.tools**: the listing stays "Not published" until the badge verifies. Open `https://findly.tools/profile/tools/<toolId>/edit?tab=listing`, click **Verify badge now**. A real mouse click was often ignored; calling the button's React `onClick` from the page works (see browser-playbook). Success redirects to `https://findly.tools/<slug>`. Never click "We submit for you from $59" or the Premium offers. Snippet: `<a href="https://findly.tools/SLUG?utm_source=SLUG" target="_blank" rel="noopener noreferrer"><img src="https://findly.tools/badges/findly-tools-badge-light.svg" alt="Featured on Findly.tools" width="175" height="55" /></a>`.
- Other platforms show their own "Verify" / "Check badge" button in the submit flow or dashboard; platform notes are in `platforms.md`. Copy the exact snippet from the platform's page, do not reconstruct it from memory (hosts, UTM parameters and image paths differ and change).

## Dev task file

Write one file per wave (`backlinks/data/tasks/BADGE-TASKS-WAVE-N.md`, start from `backlinks/templates/badge-tasks.template.md`). Layout that worked:

1. Title with wave number; who wrote it and when; "ADDITIONAL to earlier waves, change only what is listed".
2. Rules: fetch origin first (local clones go stale), reuse the existing footer / "As seen on" component, no `rel="nofollow"`/`sponsored`, check the **raw served HTML** with curl after deploy (not the DOM), if CI is red report it instead of forcing, touch nothing else.
3. Status of earlier waves (context only).
4. Section A: add/fix, one sub-section per site with the exact snippet, the site/repo table, and a one-line curl check that must print the expected host.
5. Section B: removals, as a table (site, hosts to remove) plus a KEEP list so nothing is removed by accident; a curl check that must print 0.
6. "Report back": per site commit / deploy status and the curl output. Then re-verify in the platform tools yourself.

Special cases to state explicitly: a product whose root route is the app (badges only on `/help`), sites with locale routes (`/`, `/de`, `/en`: check each), prerendered vs client-rendered footers, CSP allow-lists for badge image hosts.

## Prompt for the dev (fill in)

> Open `<path or pasted content of BADGE-TASKS-WAVE-N.md>` and do section A, then section B. Work from the newest release/main of each repo, reuse the existing footer component, deploy, and check the raw served HTML with the curl lines in the file. Report per site: commit, deploy status, curl output. If CI fails, stop and tell me instead of forcing it. Do not change anything that is not listed.

When the wave is reported done, re-run the audit on every site before touching the platforms.
