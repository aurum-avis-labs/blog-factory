# Badge tasks WAVE N - <one-line summary>

Written YYYY-MM-DD by the directory agent after re-reading the live HTML of all sites.
ADDITIONAL to earlier waves. Do not redo or change anything from those waves except what is listed here.
Repos/sites: <site / repo list>

## Rules
- `git fetch origin` first; work from the newest release/main state of each repo (local clones go stale).
- Reuse the existing footer / "As seen on" component. State special cases (e.g. "Product X: ONLY https://x.example/help, the root route is the app").
- Do not add `rel="nofollow"` / `sponsored`. Deploy, then check the RAW served HTML with curl (not the rendered DOM). If CI is red, report it instead of forcing.
- Touch nothing else in the footers: every badge not named below stays exactly as it is.

## Status of earlier waves (context, nothing to do here)
<what is live and verified>

## A. Add / fix

### A1. <site>: <what>
Why: <one sentence, e.g. "verifiers fetch raw HTML; the badge only exists after client render">
```html
<exact snippet copied from the platform's page>
```
Check: `curl -s https://site | grep -io '<host>/<slug>'` must print the host.

(Repeat per site. Include locale routes such as /de and /en where they exist.)

## B. Remove unused badges (no listing exists behind them)

| Site | Remove these badges (host of the link/img) |
|---|---|
| | |

KEEP (do NOT remove): <list, with the reason each is kept>

Check per site (each must print 0 after deploy): `curl -s <url> | grep -ic '<host>'`

## Report back
Per site: commit / deploy status and the curl lines. The directory agent then verifies in the platform tools and re-counts the badges.
