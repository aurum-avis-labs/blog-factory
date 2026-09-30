# Aurum company blog: what we built, why, and where to go next

**Stand:** 2026-09-30 · **Written for:** the agent who plans the next batch after the last scheduled post (22 Feb 2027) · **Repo:** `blog-factory`, brand `aurum`

Read this first, then `STRATEGY.md` in this folder and `.cursor/skills/seo-blog/`. This file explains the reasoning behind the 103 posts on `main`, how they were made, what is still open and which areas are worth the next batch.

---

## 1. In five lines

1. Until September 2026 the Aurum blog only talked to startup founders (16 MVP posts). The company now sells to **Swiss SMEs**: the 60-minute **Prozess-Check** (CHF 99), the **KI im Unternehmen** workshop, and **KI-Integration**.
2. We built an SME cluster of **103 posts, German (SEO target, Sie) + English twin**, published **one per weekday from 1 Oct 2026 to 22 Feb 2027**.
3. The cluster covers concrete office workflows, 15 industries, governance/data protection, Microsoft 365 and Google Workspace, and decision posts that lead to the Prozess-Check.
4. Every post was researched with linked sources and checked by a validator. It invents no customers or numbers, and it makes no integration claims Aurum can't back.
5. The next batch should start from **data** (Search Console, GA4 bookings), not from more topics by default. See section 7 for the areas we would dive into.

---

## 2. Why we did it

**Starting point (29 Sep 2026)**
- Live: 16 founder/MVP posts (Feb–Apr 2026), which the SME buyer doesn't care about.
- Queued: 16 SME posts, one a week until January.
- There were no industry pages and no pages on the systems SMEs use. The workshop funnel was thin, there was no proof content and there was nothing reusable.
- Search Console (March 2026 export) showed a small domain: about 2,700 impressions and 122 clicks in 12 months, mostly on MVP queries.

**Who we write for:** owners, managing directors, office, ops and finance leads of Swiss SMEs with 5–80 people and little or no in-house IT. They type data by hand, chase quotes and receipts, build reports from five sources, and hear "AI" everywhere without seeing anything change in daily operations. Full ICP and anti-ICP: `STRATEGY.md` §1.

**Where the posts send the reader**

| Reader intent | Offer | URL (DE / EN) |
|---|---|---|
| One recurring manual task, "is this worth automating, what does it cost?" | **Prozess-Check**, 60 min Teams, CHF 99, money back if no case | `/de/prozess-check`, `/de/prozess-check/buchen` · `/prozess-check`, `/prozess-check/buchen` |
| "Our team uses AI without rules / needs a shared basis" | **KI im Unternehmen Workshop** | `/de/services/ai-in-business` · `/services/ai-in-business` |
| Larger or connected builds, AI in a product, running it | **KI-Integration** | `/de/services/ai-implementation-consulting` · `/services/ai-implementation-consulting` |

**Why this content strategy:** Swiss search volume on these long-tail queries is small, and head terms ("KI KMU") belong to BDO, Swisscom, fiduciary firms and tool vendors. The gap we fill is **the decision before the tool**: which task, for which trade, with which Swiss constraints (nDSG, professional secrecy, bexio/Abacus already doing part of it), and an honest price. Each post answers one real query well and ends at the offer that matches the reader's situation.

---

## 3. What is on `main` now

| | |
|---|---|
| SME posts | **103 topics × DE + EN = 206 MDX files** in `brands/aurum/{de,en}/`, all `draft: false`, all with a hero image |
| Schedule | One per weekday, 1 Oct 2026 → 22 Feb 2027, holidays included. Oct 22 · Nov 21 · Dec 23 · Jan 21 · Feb 16 |
| Funnel mix | 25 awareness · 68 interest · 10 consideration |
| Publishing | `.github/workflows/scheduled-publish.yml` runs daily at 05:15 UTC and rebuilds when a post is due. The site filters future posts with `isLivePost`. |
| Old cluster | 16 MVP/founder posts, untouched and not linked from the SME cluster |

**The three waves**

| Wave | Topics | What it covers |
|---|---|---|
| 1 | 16 | The pillar (which task first), three typical workflows, invoice capture, reporting, quote follow-ups, Excel as a shadow system, Copilot vs a built workflow, Make/n8n/Power Automate, when AI makes a process worse, ChatGPT and customer data, shadow AI, EU AI Act, what the Check is, what automation costs |
| 2 | 32 | Glossary (digitalisation/automation/AI, AI agent), proof cases (after the Check, **our own booking flow**, **KitchenCrew**, who runs it, choosing a partner), workshop funnel (AI policy template, tool allow-list, staff training, AI strategy), industries (fiduciaries, property management, trades, medical practices), systems (Microsoft 365, Google Workspace with **our own download gate** as the example), shared inbox, double entry, templates, onboarding, documenting processes, multilingual communication, when automation pays off, benefit calculation, skills shortage |
| 3 | 55 | 23 concrete workflows (dunning, expenses, delivery note vs invoice, eBill, VAT return, year-end documents, payroll inputs, stocktake, email orders, reorder, price lists, supplier quotes, complaints, maintenance, dispatch, leave requests, contract deadlines, paper mail, filing, job applications, access requests, web form to CRM, survey free text, AI phone assistant); 11 industries with an overview post plus one workflow post each (hospitality, garages, law firms, insurance brokers, recruitment, retail/e-commerce, architects/engineers, logistics, course providers, real-estate agents, manufacturing); 10 decision/technical posts (internal hourly rate, AI running costs, data location, website chatbot, searchable internal knowledge, measuring success, replacing Access, API integration cost, customer portal) |

To avoid duplicates, list the existing slugs and titles yourself: `ls brands/aurum/de` and the `title:` lines. Wave-1 briefs remain in `TOPIC-QUEUE.md`.

**Decisions made on the way (they still apply)**
- **Sie** in German. Swiss reviewers of the Prozess-Check page found «du/ihr» from a stranger un-Swiss. All German posts were converted. Use «Umsetzung», not «Bau», and «Termin», not «Call».
- **CHF 99 flat** for the Check. The old "CHF 49 launch price" was removed everywhere.
- **KI-Integration** was added as a third CTA next to the Check and the workshop.
- **Weekdays** instead of weekly. Google does not limit cadence; the risk is thin or overlapping pages. We accepted a daily rhythm only because each post answers a different question with its own sources.
- **No bexio/Abacus/vertical-software integration claims.** Aurum has built Microsoft 365 (Graph, Bookings, Teams), Google Workspace (Apps Script, Sheets, Drive) and Stripe work, and nothing else yet.

---

## 4. How we worked (reuse this)

1. **Analyse:** existing posts, strategy, landing-page offers and copy, services, the Prozess-Check review report ("what stops buyers: a real case and paying by invoice").
2. **Plan topics:** one primary query per topic, a query type from `query-map.md` (sets the length floor and ceiling), a funnel stage and a CTA code. We rejected topics that duplicated an existing URL, swapped only a keyword or industry, or sat outside the ICP.
3. **Order and link rule:** every post got a `seq` (publication position). **Body links go only to posts with a lower seq**, because future posts return 404. `relatedPosts` may point forward; the site hides them until they are live.
4. **Brief:** one writer brief (voice, frontmatter, blocks, CTAs, the Aurum facts writers may state, MDX safety) plus one brief per topic (angle, "verify before stating", "keep apart from").
5. **Research, then write:** each writer saved a research note per topic (verified facts with URLs, what couldn't be verified), then wrote EN, then DE (written as German, not translated), then a hero prompt.
6. **Validate:** a script checked frontmatter order, description under 160 characters, funnel rules for relatedPosts, the seq link rule, allowed internal paths, block classes, em dash, ß, du/ihr, length floors, and MDX compilation.
7. **QA:** an editor agent read every pair, spot-checked about a third of the sources, and kept a risk list (REVIEW.md).
8. **Heroes:** one Higgsfield image per topic from the prompt file (black and gold, no text), added to the post only once the file existed.
9. **Schedule:** a script assigned one weekday per post in seq order and rewrote the `pubDate` lines.

**The tooling was removed from `main`** in commit `c7a533e` ("remove the batches folder"). It is still in git history at **`1e47fe0`**:

```bash
git show 1e47fe0 --stat
git checkout 1e47fe0 -- context/aurum/batches/2026-09-30-wave-3   # restores plan, tools, research, REVIEW.md
```

That folder contains the `tools/` scripts (`validate.py`, `reschedule.py`, `mdxcheck.mjs`), `WRITER-BRIEF.md`, `TOPICS.md`, `calendar.json` with the seq order, `REVIEW.md` with risk flags per post, and **55 research notes with sources**. The wave-2 plan and hero prompts are in the same commit under `context/aurum/batches/`. Before the next batch, restore the tools into a permanent place (e.g. `scripts/aurum/`) and update `calendar.json` from the real `pubDate`s.

**Lessons**
- Ten agents in parallel hit the usage limit twice. Run at most four at once, one topic at a time, and write to disk after each topic.
- Persist research separately from writing. It was the most expensive part, and the only part we could recover from interrupted sessions.
- Forward links were the most common silent bug: 15 in wave 1 alone. Keep the seq rule until every post is live.
- Prices and offer details drift. Take them only from the live landing page (`aurum-landing-page/src/i18n/de.json`, `prozessCheck`) at write time.
- When research contradicts the brief, write what the source says. Example: the skills-shortage post found a *surplus* of office staff in the Adecco/UZH index and argued from the task instead.

---

## 5. Open items and dated facts to re-check

Checked facts get old. Revisit these before or after they go live.

| Post (EN slug) | Goes live | What to re-check |
|---|---|---|
| `skills-shortage-office-automation` | 2026-12-02 | Adecco/UZH skills-shortage index 2026 (published around November) |
| `internal-hourly-rate-switzerland` | 2026-12-18 | Social-insurance rates and ceilings for 2027 (AHV/IV/EO, ALV, BVG, UVG) |
| `ai-running-costs-per-month` | 2027-01-05 | Model prices (they change often; the post states its date) |
| `expense-claims` | 2027-01-14 | 2027 mileage and allowance guidance |
| `vat-return-preparation` | 2027-01-29 | ESTV deadlines and ePortal wording |
| `course-registration-to-invoice` | 2027-02-08 | SIX gives two dates for the structured-address rule on QR-bills; the post reports both |
| `approve-ai-tools-allow-list`, `automate-microsoft-365`, `automate-google-workspace` | Oct–Nov 2026 | Plan names and included features (Microsoft Copilot, Gemini, ChatGPT Business, Power Automate) |
| `eu-ai-act-swiss-smes`, `ai-data-location-switzerland` | Dec 2026 | AI Act obligations that apply in 2027; the Swiss implementation of the Council of Europe AI Convention; the Federal Council's country list |
| `ai-in-medical-practices`, `practice-admin-automation` | Nov 2026 | TARDOC and outpatient flat-rate changes |

Also open:
- **Internal-linking pass after 22 Feb 2027.** Once everything is live, the seq rule no longer applies. Add links from early posts to the later ones that go deeper: the pillar to each industry overview, each overview to its workflow post, the costs post to the hourly-rate and API-cost posts.
- **The REVIEW.md risk list** at `1e47fe0` flags posts with zero external sources (e.g. `delivery-note-invoice-matching`, `compare-supplier-quotes`, `ai-for-course-providers`, `ai-for-logistics-transport`, `project-hours-fee-invoice`). They are fine as written but are the first candidates for a refresh with real data.
- **PUBLISHING.md** still refers to a relatedPosts matrix in `TOPIC-QUEUE.md` that only covers wave 1. Update it when you touch the file.

---

## 6. Before you plan the next batch: measure

Let at least 8–12 weeks of the cluster be live before deciding volume.

1. **Search Console:** impressions, clicks and average position per URL and query. Look for posts on positions 8–20 (refresh candidates), queries that bring impressions without a matching post (new topics), and industries that get impressions and those that get none.
2. **GA4:** the Prozess-Check funnel is tracked per landing-page variant, including the paid booking (see `aurum-landing-page/docs/prozess-check-analytics.md`). Find which posts send visitors to `/prozess-check` and which of those book.
3. **Bookings themselves:** which tasks and industries do real Prozess-Check clients bring? That is the best topic source there is.
4. Decide the cadence from this. Refreshing and consolidating what works can beat another 50 posts.

---

## 7. Where to dive next (in the order we would do it)

1. **Real client cases (highest value).** The review report said the missing proof is "a real client case". With client consent, write up Prozess-Check outcomes: task, frequency, what was built, package size, what changed. Anonymise if needed, invent nothing. Start with one per industry that brought a booking.
2. **Free tools plus their pages.** Build them in `aurum-landing-page` so they run in the browser and no data leaves the visitor's computer. Link them from existing posts.
   - Ablauf-Steckbrief: describe one workflow; it pre-fills the Prozess-Check booking note.
   - Hourly-cost and automation-benefit calculator: embed it in `internal-hourly-rate-switzerland` and `calculate-automation-benefit`.
   - AI-policy generator: `ai-policy-template-sme`.
   - «Darf das in ChatGPT?» data check: `chatgpt-customer-data-swiss-dsg`.
   
   Add the tool URLs to the validator's allowed pages.
3. **Refresh what ranks.** Posts on page 2 get updated facts, a clearer first paragraph and new internal links. Set `updatedDate` only when the body changes materially.
4. **Depth where the data shows traction.** Add second-level workflow posts in the industries that get impressions or bookings, for example:
   - fiduciaries: payroll for clients, VAT clients
   - property management: tenant changeover, service-charge statements
   - practices: recall and no-shows
   - trades: quotes to NPK-style positions, only if verified
   - hospitality: staff scheduling
   
   Each new post needs that industry's own workflow and vocabulary, not a keyword swap.
5. **New industries not covered yet**, only if the data or bookings point there: facility services/cleaning, agencies and consultancies (partly covered by project hours), printing and media production, associations and federations, care services (health data, high bar), foundations/NPOs.
6. **Hub pages on the landing page.** A «Branchen» overview linking the industry posts, and a workflow index. These are landing-page work, not blog posts. They help internal linking and give sales a page to send.
7. **French for Romandie.** `brands.config.ts` has `en`, `de` for Aurum. French would open a second Swiss market but needs site support, a French-speaking reviewer and its own query research (not translation). It's a strategy decision for Robert.
8. **Regulatory and seasonal calendar 2027.** Year-end topics come round again (stocktake, year-end documents, VAT, payroll rates). Watch the Swiss AI regulation (implementation of the Council of Europe convention), AI Act milestones, e-invoicing developments and TARDOC updates. Refresh existing posts before writing new ones on the same topic.
9. **The old MVP cluster.** 16 founder posts from Feb–Apr 2026 with a different ICP. Decide whether to refresh them, merge thin ones or leave them as they are. They are not linked from the SME cluster, and shouldn't be.
10. **Beyond Google.** Repurpose the strongest posts for LinkedIn (Robert's profile is on the Prozess-Check page), Swiss SME media and newsletters. This does not depend on rankings.

**Not worth doing:** tool listicles, prompt collections, marketing-copy tips, city or industry keyword swaps, posts that exist only to add a language code, and invented cases or ROI percentages. These are the exact patterns `seo-2026.md` and Google's scaled-content policy warn about.

---

## 8. Checklist to start the next batch

1. Pull Search Console and GA4 data (section 6) and list the Prozess-Check topics that clients actually brought.
2. Restore the tooling from `1e47fe0` into `scripts/aurum/` and rebuild `calendar.json` from the real `pubDate`s (seq 1–103 = the current publication order).
3. Re-read `STRATEGY.md`, `.cursor/skills/seo-blog/` and the live `prozessCheck` copy on the landing page. Take prices and offer facts from there.
4. Write a batch plan file with one row per topic: query, type, floor, funnel, CTA, owner, "verify", "keep apart from". Include refresh rows next to new topics.
5. Run research, then writing, then validation, then QA, then heroes, then scheduling, with at most four writers at a time and a research note per topic.
6. Continue the calendar after 22 Feb 2027 with `reschedule.py` so the seq order and the link rule hold.
