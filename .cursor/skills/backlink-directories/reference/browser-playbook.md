# Driving the browser (Claude in Chrome / Cowork)

Hard-won notes from ~280 register rows of form filling. Read once per session.

## Session setup

- The Chrome tools (`mcp__claude-in-chrome__*`) are often deferred: load them in ONE `ToolSearch` call (`select:` with the comma-separated list: `tabs_context_mcp, navigate, computer, read_page, form_input, find, javascript_tool, browser_batch, get_page_text, file_upload, tabs_create_mcp, tabs_close_mcp`).
- Start with `tabs_context_mcp` (`createIfEmpty: true`). Create your own tab per task; never reuse tab IDs from an earlier session. If a call says the tab does not exist, call `tabs_context_mcp` again (the tab group can be lost when the extension restarts).
- Close the tabs you opened when you finish (leave tabs the user opened for sign-in).
- Sign-ins: the user signs in (Google SSO etc.) in a tab you opened; you never type passwords or click through OAuth. Ask, wait, then continue in the same profile. A signed-out session shows up as odd errors ("Media HTTP 400", "Sign in before uploading"): check the login first.
- Files on the user's computer: images for uploads must exist in the cloud workspace (`device_stage_files` copies them to `/mnt/user-data/uploads/...`); `file_upload` reads from there.
- Tools on the user's computer (`mcp__remote-devices__*`) can disconnect and reconnect mid-session; reload them via ToolSearch and continue. Shell arguments have a size limit: write long files in pieces or build them in the cloud workspace and commit them.

## Efficiency

- Prefer `browser_batch` for any sequence you can predict (navigate, click, type, screenshot). Coordinates in a batch refer to the screenshot taken before the batch.
- Read with `get_page_text` / `read_page` (filter `interactive`) instead of screenshots when you need text or refs; use a screenshot when layout matters. `scale: 0.5` screenshots are enough for most checks; coordinates stay in the full frame the result reports (e.g. 1270x952 or 1568x726, it varies, use what the tool reports).
- `find` (natural-language element search) can hit a rate limit (HTTP 429). Fall back to `read_page` with `filter: interactive` and use refs, or query the DOM with JavaScript.
- Tell the user what you are doing every few minutes during long runs.

## JavaScript tool

- REPL semantics: top-level `await` works, the value of the last expression is returned (no `return`).
- Hard 45 s limit per call: loops must stay under ~40 s. Split waits across calls.
- Output containing URL-like text with `?`, `&` or `=` can be blocked ("[BLOCKED: Cookie/query string data]"): build the result string and `.replace(/[?&=]/g, '~')`.
- Raw HTML check for a page you are on: `await (await fetch(location.href, {cache: 'no-store'})).text()`, then regex/`split(host).length - 1`. Compare with `document.querySelectorAll('a[href*="host"]')` (see `scripts/check_badges.js`).
- React buttons that ignore real and synthetic clicks (seen on Findly "Verify badge now"): call the handler directly:
  `const b=[...document.querySelectorAll('button')].find(x=>/Verify badge now/i.test(x.innerText)); const k=Object.keys(b).find(x=>x.startsWith('__reactProps$')); b[k].onClick({preventDefault(){},stopPropagation(){},target:b,currentTarget:b});`
- Native `<select>` that `form_input` cannot set: use the prototype setter and dispatch events:
  `Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set.call(sel, value); sel.dispatchEvent(new Event('input',{bubbles:true})); sel.dispatchEvent(new Event('change',{bubbles:true}));`
- Rich-text editors: focus the editor through JS, then use the `type` action; select-all with `cmd+a` before retyping when a draft was restored.
- **Audit on a cache-busted load.** Open the page as `URL?cb=<timestamp>` before comparing raw HTML with the DOM. A tab served from the HTTP cache (`performance.getEntriesByType('navigation')[0].transferSize === 0`) shows an older deploy and fakes "badge vanished after load" (see `reference/badges-and-dev-handoff.md`, Cache trap).

## Forms

- Dismiss cookie banners first (before any screenshot or cover capture; choose the most privacy-preserving option). Never upload an image that shows a cookie overlay.
- Upload with `file_upload` on the **file input** ref (`type="file"`, often named "Logo file" / "Screenshots file"), not on the visible label or drop zone ("Element is not a file input" otherwise). Remove stale previews first if the form restored a draft.
- Many forms restore the previous product's draft (categories, tags, pricing, date). Overwrite every field, uncheck stale items (respect "max 3 categories": uncheck before checking), and read the review step before the final click.
- Dates: pick the first date with free slots. A full date can cause an HTTP 500/503 on submit that looks like a vendor outage (aat.ee).
- Upsells are often pre-checked (Premium, newsletter, "50+ directories"). Uncheck them and verify the values before submitting; the total must read $0.
- Final submit buttons are irreversible: confirm once from the review step, click once, then wait and open the public page or dashboard as evidence. Do not click twice; many vendors refuse duplicates ("This website already has a listing") and some create duplicate records.
- After any state change, write the register row before moving on.

## Limits and quotas

Record and stop; never work around: upload limits (Navs: five images per rolling 24 h; Findly: "Too many uploads"), one-free-slot-per-account rules (Uneed, Launch Llama), free-date queues (Firsto, aat.ee: 5 slots per day), browser tool usage limits (wait for the reset).

## Never

Type passwords or API keys; complete OAuth; solve/bypass CAPTCHA, Turnstile or bot interstitials; contact support; send email; pay or accept a trial that needs a card; delete permanently; touch badges on product sites; use curl/python to fetch pages the browser tools were refused.
