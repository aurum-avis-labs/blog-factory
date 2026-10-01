# Pre-publish QA

Run this gate on every file of a wave before `draft: false`, and before leaving a wave "ready to schedule". The October 2026 pass over 1,130 posts found that nearly every fix was a rule this skill already stated. The gate is cheaper than the cleanup.

## 1. Locale value (do this first)

- Read each locale on its own. It has to answer the query for a speaker of that language, not paraphrase the English.
- Address form from the brand file: Aurum de-CH `Sie`; Vemoir DE `du`, FR `vous`, IT `tu`, EN `you`; Postology DE `du`.
- Strip translationese: no English word order kept in DE/FR/IT, no Germanisms in EN ("datenschutz training", `« »`, "Geschäftsleitung"), no calques ("record" for compte rendu, "evidence" for Belege).
- de-CH: `ss`, never `ß`. FR body copy: non-breaking space before `: ; ? !`.
- Every locale has the same sections, paragraphs, and FAQ items. A locale missing a paragraph the others have is the bug.

## 2. Claims and sources

- Every number that is not the brand's own has a link and is labelled as someone else's measurement.
- Prices, features, and limits come from the brand context or the vendor's own page, checked at write time. When a number cannot be verified, omit it; do not estimate.
- No superlative the article cannot prove ("most common", "usually legally covered", "often 3-4 weeks").
- No meta commentary in the body: no writer notes, no remarks about the search results, no "still often searched under its old name".

## 3. Blocks

- Budget: one or two blocks; three only when each carries a different job. At most one FAQ section. More blocks is a smell, not thoroughness.
- Only classes from [blocks.md](blocks.md). No inline styles, images, or icons inside a block.
- The FAQ sits under its own localized H2 (`Frequently asked questions`, `Häufige Fragen`, `Questions fréquentes`, `Domande frequenti`). One FAQ form per article, the same form in every locale. Never mix `div.blog-faq` and the H2 + `###` form.
- The block sequence (class order, table count, FAQ presence) is identical in every locale. Labels and kickers are translated.

## 4. Frontmatter

- The brand's field set and order; no new fields.
- `funnelStage` valid and identical in every locale; `translationKey` is the English slug (the default-language slug when there is no English); filenames are localized.
- `description` under 160; `tags` 3-5 topic labels (Vemoir 2-4), not synonyms of the title.
- `author` reuses the brand byline.
- `image` points at `@/assets/blog/{translationKey}/hero.jpg`. An Unsplash credit sits after the lede in every locale, translated.
- No `---` in the body, no H1.

## 5. Links

- Every `relatedPosts` slug exists as a file in that language; 1-3 entries; intent rules from AGENTS.md.
- One related post is linked in the body.
- Body links resolve on disk, and point only at posts whose `pubDate` is already live when this post publishes. `relatedPosts` may point forward; the site hides those until they are live.
- Path pattern per brand (Aurum studio `/blog/...` and `/de/blog/...`; Vemoir `/{lang}/blog/...`, never `/blog/de/...`; Postology `/blog/...` in all locales; Holist-IQ `/blog/...` and `/de/blog/...`).

## 6. Shape

- No em dash (U+2014), no exclamation marks in body copy, headings start at H2.
- Short paragraphs. No "in today's world" opener, no recap that adds nothing.

## Mechanical helpers

- Compile the MDX: `node scripts/aurum/mdxcheck.mjs <file> ...`
- Where a plan has its own validator (for example `scripts/aurum/validate.py` for the security wave), run it and fix everything it reports.

## Known failure modes (October 2026 pass)

- Block overuse: measured averages of 7.5 (aurum) and 9.3 (postology) blocks per post against a budget of one or two.
- FAQ form mixed across locales, or an FAQ block without its own H2.
- `relatedPosts` pointing at a slug that exists only in another language.
- Body links to posts that publish later than the linking article.
- Unverified claims: bearer shares (abolished in Swiss law), invented price and decision-time figures, placeholder domains.
- EN copy carrying German guillemets or German UI words; DE copy carrying English word order.
- The English studio slug not equal to the `translationKey`.
- One locale missing a paragraph, FAQ item, or whole section; block structure drifting apart.

## Wave retro (feedback loop)

After a wave is scheduled, add 5-15 lines to the batch folder, or write `context/{brand}/batches/{yyyy-mm-dd}-retro.md`: what the gate caught, which rows were rejected, which claims were removed, and the one instruction to change for the next batch. Read the last retro before planning the next wave.
