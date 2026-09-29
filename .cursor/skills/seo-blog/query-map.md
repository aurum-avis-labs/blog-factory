# Query map

Assign every article exactly one type. The type sets the funnel, the length, and the outline. Mix a batch. A cluster of only comparisons, or only definitions, leaves the rest of the journey empty.

Default mix for a batch that is trying to grow a product: about 35% `awareness`, 40% `interest`, 25% `consideration`. A brand strategy file wins if it sets a different mix.

Length is useful material that finishes the query. Google does not rank by word count. A page that does not finish the query still fails, in every language.

Each band is **floor–ceiling**:

- **Floor:** the post is not done. Expand it. A 1–2 minute read (~200–400 words) sits under every type except a barely-scraping glossary, and even that glossary has a 400-word floor.
- **Ceiling:** stop. Do not pad to a 10-minute quota. The next section that repeats a point does not ship.

Prefer a substantial post that answers the search query over a short one that only names it. A 400-word glossary that defines the thing, the audience, and the one mistake can ship. A 300-word comparison, alternative, or how-to cannot.

Count body words only: strip frontmatter and HTML tags. Every locale of the same `translationKey` must meet the same floor. A 1,200-word English file plus a 90-word German stub is two failures (the stub, and a locale that exists only so another language code is in the URL).

| Type | `funnelStage` | Floor–ceiling | The page must do this |
|---|---|---|---|
| What it is / glossary | `awareness` | 400–800 | Define the thing, who it is for, and the one mistake people make. Stop. |
| Problem or cost | `awareness` | 700–1,200 | Name the situation, why the usual fix fails, what "better" looks like. No product tour. |
| How to do the job | `interest` | 900–1,600 | Steps, a tradeoff, and when to stop. One worked example. |
| Checklist, template, audit | `interest` | 800–1,400 | Something the reader can apply the same day. |
| Category vs category | `interest` | 1,200–2,000 | Two approaches, who each fits, a table only if the rows differ. |
| Best {category} for {audience} | `interest` | 1,200–2,000 | Inclusion rules first. A few options. Who should pass on each. |
| {Tool} alternative | `consideration` | 1,200–2,000 | What the incumbent is good at, where it stops, who should stay on it. |
| {A} vs {B} vs {C} | `consideration` | 1,400–2,200 | Same jobs compared. No single winner unless the audience is that narrow. |
| Is {product} worth it / when not | `consideration` | 900–1,600 | Limits, setup, and the reader who should not buy. |
| Workflow with named features | `consideration` | 1,000–1,800 | How the job actually runs in this product. Claims only from the product. |

Pillar pages are rare. Use one only when the brand has no page that already owns the category, and keep it under 2,500 words of distinct sections. Spokes link to it. It links to spokes. Do not write a second pillar for a synonym.

## Outline

1. Opening: the query, the answer, who this is for.
2. One H2 per adjacent question (People Also Ask style): limits, cost, who it fails for, how it differs from the next option.
3. Under each of those H2s, a short direct answer before any detail.
4. A practical close: what to do next, plus one internal link.
5. No "in today's world" intro and no recap that adds nothing.

## Cluster shape

For one product job, plan spokes across the types above instead of twenty "best tools" variants.

Example for a scheduling product:

- awareness: why the calendar and the published feed diverge
- interest: how to audit click-heavy posting; category of automation vs a scheduler
- consideration: Buffer alternative; Later vs Buffer vs a third tool; when this product is the wrong buy

Each row gets its own primary query. "Best scheduler", "top scheduler", and "best scheduling software" are one article, not three.

## Internal links

Plan the graph in the batch file before writing.

- Awareness may link to interest or consideration.
- Interest links sideways or down, never back to a pure definition as the "next step".
- Consideration links to other decision pages.
- Body hrefs follow the brand's existing pattern. Aurum German uses `/de/blog/{slug}`. Several product blogs use `/blog/{slug}` on the default locale.
