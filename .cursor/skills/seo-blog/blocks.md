# Editorial blocks

Use these HTML blocks inside MDX instead of extra photos. They make a post visually appealing and easy to scan, so use the ones the article needs: a limit, a sequence, a comparison, a set of facts, a sourced number. Give each block its own content, not a restatement of the prose. Do not invent a new class.

The page still makes sense if the stylesheet is missing: the text stays, the layout just gets flatter.

## When to use which

| Block | Use when the section is |
|---|---|
| Fact row | Three or four hard facts (a limit, a number, a yes or no) |
| Stat | One sourced number with a caption. Never an unsourced boast |
| Steps | A sequence the reader should follow, or a numbered set of options |
| Flow | Three to five short stages in one job (idea, draft, schedule) |
| Callout | A note, a correction, or a limit that must not be skipped |
| Pair | Two sides: does / does not, who it is for / who should skip, usual way / this way |
| Checklist | Things the reader can do the same day |
| Scenario | Up to three "if you are X, do Y" cases |
| Table | A comparison with the same rows for each option |
| Quote | A short line worth pulling out. Use a markdown blockquote |
| FAQ | A question a searcher actually asks, with a direct answer |
| Opening | The first paragraph only. Larger type, one or two sentences |
| Pull | One sentence from this article, set larger. At most one per article |
| Terms | Short definitions: the word, then one sentence |

A comparison can have a table plus a pair. An FAQ at the end is normal when the questions are real searches, and it does not license a block under every heading. The Showcase brand (`brands/showcase`) is the specimen of every block. It is not a template for a normal article.

Opening, pull, and terms are styled in the Showcase preview. On brand sites they read as ordinary text until that stylesheet is copied over. Do not invent further classes.

## Markup

Copy these shapes. Translate the words. Keep the class names.

### Fact row

```html
<ul class="blog-facts">
  <li><span class="blog-kicker">Mobile app</span><strong>None</strong><p>Fathom does not record a room.</p></li>
  <li><span class="blog-kicker">Record cap</span><strong>120 min</strong><p>Copilot stops at two hours.</p></li>
</ul>
```

### Stat

```html
<div class="blog-stat">
  <strong>34%</strong>
  <p>AXA, cited by DeepCloud: Swiss SMEs that used AI in 2025. Not our survey.</p>
</div>
```

### Steps

```html
<ol class="blog-steps">
  <li data-step="1"><h3>Put the laptop in the middle</h3><p>The microphones sit under the deck, not in front of one person.</p></li>
  <li data-step="2"><h3>Turn sleep off</h3><p>A locked machine ends the recording.</p></li>
</ol>
```

`data-step` is the visible number. Keep it in sync with the order.

### Flow

```html
<ol class="blog-flow">
  <li><strong>Idea</strong><p>One line in a note.</p></li>
  <li><strong>Draft</strong><p>Caption in the same tool.</p></li>
  <li><strong>Schedule</strong><p>One queue, several networks.</p></li>
</ol>
```

### Callout

```html
<aside class="blog-callout">
  <span class="blog-kicker">Note</span>
  <p>Fireflies can record in a room. Many comparison pages still say it cannot.</p>
</aside>
```

Kickers: `Note`, `Correction`, or `Limit`. Add `blog-callout--limit` on the aside when the point is a hard restriction.

### Pair

```html
<div class="blog-pair">
  <div>
    <h3>Who this is for</h3>
    <ul>
      <li>A solo creator who already writes captions</li>
    </ul>
  </div>
  <div>
    <h3>Who should skip it</h3>
    <ul>
      <li>A team that needs approvals in the scheduler</li>
    </ul>
  </div>
</div>
```

Same shape for does / does not and for usual way / this product.

### Checklist

```html
<ul class="blog-checklist">
  <li>Write the answer in the first paragraph</li>
  <li>Name who should not use the tool</li>
</ul>
```

### Scenario

```html
<ul class="blog-scenarios">
  <li><h3>If you only need Instagram</h3><p>The native scheduler is enough.</p></li>
  <li><h3>If you post the same idea on four networks</h3><p>A third-party queue saves the copy-paste.</p></li>
</ul>
```

Three items at most.

### Table

Use a markdown table. Keep the same columns for every row. Yes or no cells are fine.

### Quote

```md
> The bot needs a meeting link. A room does not have one.
```

### FAQ

Render the question and answer in full. The question is an `h3`, so it stays in the heading outline. Do not use `<details>` or any other collapse. The landing page turns each `div.blog-faq` into FAQ schema.

```html
<div class="blog-faq">
  <h3>Can Fathom record an in-person meeting?</h3>
  <p>No. It needs a meeting link on a computer. There is no microphone-only mode.</p>
</div>
```

A brand context may instead require a localized H2 (`Frequently asked questions`, `Häufige Fragen`, `Questions fréquentes`, `Domande frequenti`) and each question as a markdown `###`. That form is also read as FAQ schema. Do not mix both in one article, and keep the same form in every locale. When the `div.blog-faq` form is used, the div still sits under its own localized FAQ H2.

### Opening

The first paragraph of the article, before the first H2. One or two sentences that answer the query. Not a second deck under the title.

```html
<p class="blog-lede">Fathom needs a meeting link. It does not record a room.</p>
```

### Pull

One sentence already earned by the article, set larger so the eye can rest. At most one. It is the writer's sentence, not a quotation, so do not also use a markdown blockquote in the same article.

```html
<p class="blog-pull">A room does not have a meeting link.</p>
```

### Terms

Three or four words a reader might mix up. The term is short. The definition is one sentence.

```html
<dl class="blog-terms">
  <div>
    <dt>Seat</dt>
    <dd>You pay for a person who can log in.</dd>
  </div>
  <div>
    <dt>Minutes</dt>
    <dd>The call spends the pool, not the monthly price.</dd>
  </div>
</dl>
```

## Rules

- One H2 still introduces the section. The block sits under it. Do not put an H2 inside a block except the `h3` titles shown above.
- Same structure in every locale. Translate labels (`Note`, `Correction`, `Limit`, column titles).
- No images, icons, or inline styles inside a block.
- Readable without color: the kicker and the heading carry the meaning.
