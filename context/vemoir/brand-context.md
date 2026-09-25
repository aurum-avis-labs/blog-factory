# Part 3: Writer brief and post queue (for the writing agent)

Everything below is written for the agent that writes the posts.

## 3.1 Your job

Each week, write the next 2 or 3 articles from the queue in 3.9. Each article exists in **English, German, French and Italian**: four `.mdx` files, one per language. Open one pull request per article in `aurum-avis-labs/blog-factory`. Never push to `main`; a person reviews and merges. If you cannot open pull requests, output the four files and the pull request description, and a person commits them.

Before writing, read the posts already in `brands/vemoir/` so you do not repeat a topic and can pick real `relatedPosts`.

Where this brief disagrees with `blog-factory/writing-instructions.md`, **this brief wins** for Vemoir. The differences: funnelStage values, author, pricing, and the extra frontmatter fields `translationKey` and `tool`.

## 3.2 Product facts (the only claims you may make)

Vemoir is a Mac app for meeting records, made by Aurum Avis Labs GmbH in Oberägeri, Switzerland.

- **What it does:** records from the Mac menu bar, transcribes on the Mac, and turns each call into minutes, decisions, action items and a follow-up draft. You can ask questions about a meeting ("Ask Vemoir"), and answers link back to the transcript. You share only the parts you choose, through native macOS sharing.
- **No bot:** Vemoir records the Mac's microphone and system audio directly. No bot joins the call and nobody sees an extra participant. The user starts and stops each recording.
- **Works with any meeting app** that plays audio on the Mac: Microsoft Teams, Slack huddles, Zoom, Google Meet, Discord and others. It is not tied to one meeting provider.
- **Local by default:** transcription and summaries run on the Mac with local models. Recordings, transcripts and generated records stay on the Mac unless the user exports them, or chooses a cloud model (for example OpenAI GPT) with their own API key. Cloud models are always opt-in.
- **Offline:** once the chosen models are installed, the whole meeting workflow can run offline. Internet is needed for setup and model downloads.
- **Screen Recording permission:** macOS only lets apps capture other apps' audio through this permission. Vemoir uses it only for meeting audio and never records the screen contents.
- **Import:** MP3, M4A, WAV, AIFF, CAF and FLAC files can be imported and turned into records.
- **Own notes:** notes typed during the meeting become part of the record and are folded into the minutes, decisions and actions.
- **Speakers:** speaker profiles and project glossaries help Vemoir tell who said what and keep names and terms right. Speaker separation runs on the Mac.
- **Languages:** the app interface is in English, German, French, Italian and Dutch. With the Parakeet v3 model, Vemoir transcribes 25 European languages. Other models have their own coverage.
- **Price:** one-time purchase, no subscription, no charge per meeting, no seat count, every feature included. In the Mac App Store: CHF 20 in Switzerland, €24.99 in Germany, Austria, France and Italy, $22.99 in the US. In a German, French or Italian post, say "CHF 20 in Switzerland" and that the App Store shows the local price. You may mention the price in `consideration` posts (this overrides the "no pricing" rule in `writing-instructions.md`).
- **Requirements:** Mac with Apple silicon (M1 or newer), macOS Sonoma 14.2 or later, at least 8 GB of memory and 10 GB of free storage. 16 GB or more is recommended for long meetings. Intel Macs are not supported.
- **App Store:** https://apps.apple.com/app/id6794693630

**Free browser tools** (on vemoir.ch, no install):

- They transcribe a file the user already has, in the browser tab. The file is not uploaded; the model downloads once and later runs can work with the network off. Users can check this in the browser's Network tab.
- Limits: files up to 15 minutes, 3 successful runs per week. MP3, M4A, WAV or MP4.
- They do not separate speakers, and they do not record live meetings. Live recording, speaker separation and stronger models are in the Mac app.
- They use public Whisper models. Swiss German speech usually comes out as Standard German text.

## 3.3 Never claim

- Live meeting recording in the browser, or a browser extension, bot or tab-audio capture.
- Speaker labels or Swiss German dialect output in the browser tools.
- That the Mac app transcribes Swiss German dialect. A dialect path is planned; do not give a date.
- "Compliant", "HIPAA", "GDPR-certified", "privileged", "certified transcript" or any other compliance claim. Consent and retention are the user's responsibility.
- Windows, iPhone, iPad, Android or Intel Mac support.
- Accuracy percentages, speed numbers or benchmark results, unless a source is linked.
- Anything about a competitor that its own documentation, pricing page or reputable press does not say. Never invent numbers, quotes or customer stories.

## 3.4 Audience and voice

**Readers:** professionals who record meetings, calls and interviews and care where the audio goes. Consultants, researchers, journalists, HR and recruiting, product and project leads, founders, fiduciaries and lawyers. First market Switzerland, then Germany and Austria, France, Italy, the US.

**Voice** (all languages): calm, practical, specific. Write like a careful editor who knows the topic, not like marketing.

- Say where competitors or other approaches are the better choice. Fair comparisons are part of the brand.
- Short paragraphs, concrete steps, real file paths and menu names.
- No hype words ("revolutionary", "game-changer", "seamless", "unlock"), no exclamation marks in body copy, no em dash (—). Use a comma, colon, full stop or parentheses.
- No filler openings ("In today's fast-paced world").

**Per language:**

| | Address | Notes |
|---|---|---|
| EN | "you" | International English. US spelling. |
| DE | **du** | Swiss spelling: **ss, never ß** ("standardmässig", "Grösse"). Use Swiss terms where natural: Sitzung, Protokoll, Verwaltungsrat, Treuhand. |
| FR | **vous** | Swiss and French readers. Data protection law is the **nLPD**, not "nDSG". Put a non-breaking space before : ; ? ! as in French typography. |
| IT | **tu** | Ticino and Italy. Data protection law is the **nLPD**. |

**Write each language natively.** Adapt examples and search terms per language, and keep the facts identical. Do not translate sentence by sentence. The primary keyword differs per language (see the queue).

## 3.5 Files and frontmatter

**Paths** in `blog-factory`:

- Article: `brands/vemoir/{en|de|fr|it}/{localized-slug}.mdx`. The filename is the URL: `de/zoom-aufnahme-transkribieren.mdx` becomes `https://www.vemoir.ch/de/blog/zoom-aufnahme-transkribieren`.
- Slugs: lowercase, ASCII, hyphens, localized, 3 to 6 words, built from the primary keyword of that language. No umlauts or accents (ü becomes ue, é becomes e).
- Images: `brands/vemoir/images/{translationKey}/hero.jpg` (shared by all four languages).

**Frontmatter** (this exact set; keep the order):

```yaml
---
title: "How to Transcribe a Local Zoom Recording (No Upload)"
description: "Zoom saves local recordings as audio, not text. Where to find audio_only.m4a on your Mac and how to turn it into a transcript without uploading it."
pubDate: 2026-10-01
author: "Vemoir Team"
tags: ["zoom", "transcription", "privacy"]
funnelStage: "interest"
translationKey: "zoom-local-recording-transcript"
relatedPosts: []
tool: "transcribe-zoom-recording"
image: "@/assets/blog/zoom-local-recording-transcript/hero.jpg"
draft: false
---
```

| Field | Rule |
|---|---|
| `title` | 50 to 65 characters. Contains the primary keyword. Year in the title only for best-of and "alternatives" posts. |
| `description` | 120 to 155 characters, never over 160. Primary keyword in the first 60 characters. |
| `pubDate` | Planned publish date, `YYYY-MM-DD`. Add `updatedDate` only when the content really changed. |
| `author` | `"Vemoir Team"` until a named author is set. |
| `tags` | 2 to 4 short topic tags in the post's language. The first tag is shown as the category. |
| `funnelStage` | **Only** `awareness`, `interest` or `consideration`. Any other value breaks the build. Same value in all four languages. |
| `translationKey` | The English filename without `.mdx`. Same in all four languages. This pairs the translations for hreflang and the language switcher. |
| `relatedPosts` | 1 to 3 **filenames** (without `.mdx`) of existing posts in the **same language**, same or higher funnel stage (`awareness` < `interest` < `consideration`). Use `[]` while no suitable post exists. Never invent a filename. |
| `tool` | Optional. The tool the post sends readers to: `transcribe-recording`, `transcribe-zoom-recording`, `transcribe-interview`, `meeting-notes-from-transcript` or `recording-to-notes`. |
| `image` | Optional but recommended (see 3.8). Omit the line if there is no image. |
| `draft` | `false` to publish. `true` keeps the post out of the site. |

Do not set `slug`; the filename is the slug.

**MDX body rules:** no H1 (the title is the H1); start with H2. Never use `---` in the body. No imports or components except the Astro `Image` for inline images (see `blog-factory/AGENTS.md`). Tables and fenced code blocks are fine (use a code block for copyable templates).

## 3.6 Article structure

1. **Preface** (no heading, the first 2 short paragraphs): answer the reader's question directly, with the primary keyword in the first sentence. Someone who reads only this should get the answer.
2. **Contents** for posts over 1,500 words: a short list of links to the H2s (`[Where Zoom saves the file](#where-zoom-saves-the-file)`). Heading ids are the heading text in lowercase with spaces turned into hyphens (accents are kept).
3. **Body:** H2s that each answer a real sub-question people search for (use the phrasing people type). Steps as numbered lists. File paths and menu names in `code`.
4. **Where the other option is better:** one honest section in every comparison or alternative post.
5. **Mid-article CTA:** one plain sentence with a link, for example "Want this without the file hunt? Vemoir records the next meeting on your Mac." No buttons or components.
6. **Frequently asked questions:** H2 exactly `Frequently asked questions` (DE `Häufige Fragen`, FR `Questions fréquentes`, IT `Domande frequenti`), then each question as an H3 with a 1 to 3 sentence answer. 5 to 10 questions. The site turns this section into FAQ schema, so keep the format.
7. **Next step:** one closing paragraph that links the right tool or the homepage.

**Length:** how-to and troubleshooting posts 1,200 to 2,000 words. Guides and explainers 1,500 to 2,500. Alternatives and best-of posts 2,500 to 3,500. Longer is not better; stop when the question is answered.

**Sources:** link primary sources inline: vendor documentation, pricing and security pages, fedlex.admin.ch for Swiss law, official changelogs. For facts that change (prices, features, policies), write "as of {month year}". List the sources and the date you checked them in the pull request description.

## 3.7 Internal link map

Link with root-relative paths (`/de/tools/...`), never with the full domain. Every post links at least one tool or homepage section, and 1 to 2 other posts once they exist. Only link blog posts that exist in `brands/vemoir/{lang}/`: `/blog/{filename}` in English, `/{lang}/blog/{filename}` otherwise. **Never** use the `/blog/de/...` format that other brands in `blog-factory` use.

**Pages:**

| Page | EN | DE | FR | IT |
|---|---|---|---|---|
| Homepage | `/` | `/de` | `/fr` | `/it` |
| How it works | `/#how` | `/de#how` | `/fr#how` | `/it#how` |
| Capture and models | `/#capture` | `/de#capture` | `/fr#capture` | `/it#capture` |
| Meeting app support | `/#platforms` | `/de#platforms` | `/fr#platforms` | `/it#platforms` |
| Minutes and record | `/#record` | `/de#record` | `/fr#record` | `/it#record` |
| Export and share | `/#exports` | `/de#exports` | `/fr#exports` | `/it#exports` |
| Ask Vemoir (chat) | `/#chat` | `/de#chat` | `/fr#chat` | `/it#chat` |
| Languages | `/#languages` | `/de#languages` | `/fr#languages` | `/it#languages` |
| Use cases | `/#use-cases` | `/de#use-cases` | `/fr#use-cases` | `/it#use-cases` |
| Pricing | `/#pricing` | `/de#pricing` | `/fr#pricing` | `/it#pricing` |
| FAQ | `/faq` | `/de/faq` | `/fr/faq` | `/it/faq` |
| Contact | `/contact` | `/de/contact` | `/fr/contact` | `/it/contact` |
| Blog | `/blog` | `/de/blog` | `/fr/blog` | `/it/blog` |

**Free tools:**

| Tool (`tool:` value) | EN | DE | FR | IT |
|---|---|---|---|---|
| Hub | `/tools` | `/de/tools` | `/fr/outils` | `/it/strumenti` |
| `transcribe-recording` | `/tools/transcribe-recording` | `/de/tools/audio-transkribieren` | `/fr/outils/transcrire-audio` | `/it/strumenti/trascrivere-audio` |
| `transcribe-zoom-recording` | `/tools/transcribe-zoom-recording` | `/de/tools/zoom-aufnahme-transkribieren` | `/fr/outils/transcrire-enregistrement-zoom` | `/it/strumenti/trascrivere-registrazione-zoom` |
| `transcribe-interview` | `/tools/transcribe-interview` | `/de/tools/interview-transkribieren` | `/fr/outils/transcrire-entretien` | `/it/strumenti/trascrivere-intervista` |
| `meeting-notes-from-transcript` | `/tools/meeting-notes-from-transcript` | `/de/tools/notizen-aus-transkript` | `/fr/outils/notes-depuis-transcription` | `/it/strumenti/note-da-trascrizione` |
| `recording-to-notes` | `/tools/recording-to-notes` | `/de/tools/aufnahme-zu-notizen` | `/fr/outils/enregistrement-en-notes` | `/it/strumenti/registrazione-in-note` |

App Store (external): `https://apps.apple.com/app/id6794693630`.

## 3.8 Images

- **Hero image:** one per article, shared by all four languages, at `brands/vemoir/images/{translationKey}/hero.jpg`. 1200 × 900 px (4:3), JPEG, under 300 KB. Keep the subject in the middle band, because link previews crop it to 1.91:1.
- **Style** (from the Vemoir creative brief): a photographed, calm, ordinary work setting. A closed, unbranded laptop; a single professional on a call with the screen turned away; two people in a focused interview at a clean table; or a folded violet and cobalt paper ribbon ("sound") turning into blank cream paper cards ("the record").
- **Never:** holograms, glowing brains, neon, fake dashboards or generated interface text, robot icons, visible brand logos (Apple, Zoom, Microsoft), text inside the image.
- Inline images only where they explain something (for example where Zoom saves a file). Real screenshots only, no generated UI. Every image needs alt text in the post's language.

## 3.9 Post queue

Work top to bottom, 2 or 3 articles per week. Items marked **GATE** need a check before publishing. Keywords are starting points, not measured volumes; if Search Console or Keyword Planner shows a better phrase, use it and say so in the pull request.

Tick an item when its pull request is merged.

### Weeks 1 and 2

- [ ] **1. `zoom-local-recording-transcript`** · `interest` · `tool: transcribe-zoom-recording`
  - Keywords: EN "transcribe zoom recording" · DE "zoom aufnahme transkribieren" · FR "transcrire un enregistrement zoom" · IT "trascrivere una registrazione zoom"
  - Reader: finished a Zoom call, found `Documents/Zoom/.../audio_only.m4a`, has no transcript.
  - Must include: Zoom creates a transcript only for cloud recordings on paid plans; local recording (the default on free accounts) is audio, not text. Where Zoom saves local recordings on Mac and Windows (verify the default paths on Zoom's support site). Cloud VTT vs local M4A/MP4. Steps: keep the local recording, open the dated folder, drop `audio_only.m4a` on the tool. Nothing is uploaded; how to check the Network tab. The 15-minute browser limit; longer meetings and live recording go to the Mac app. No bot joins the call.
  - Do not: promise speaker labels or Swiss German output in the browser; promise live capture in the browser; write a generic "audio to text" article.
- [ ] **2. `meeting-notes-without-bot`** · `awareness` · `tool: transcribe-recording`
  - Keywords: EN "meeting notes without a bot" · DE "meeting notizen ohne bot" · FR "notes de réunion sans bot" · IT "note riunione senza bot"
  - Reader: will not invite Otter or Fireflies into a client call and still needs a record.
  - Must include: bots join from the calendar and sit in the participant list; many client-facing teams and IT departments ban them. The fair case for bots (automatic, shared team records). The alternative: record the Mac's system audio and microphone locally (Vemoir, `/#platforms`). For a file you already have after the call, the browser tool. A factual comparison table: bot joins, where the audio goes, training on data (vendor docs only).
  - Do not: advertise tab-audio capture or a Vemoir bot; lead with minutes or follow-up emails as the product.
- [ ] **3. `transcribe-interview-without-upload`** · `consideration` · `tool: transcribe-interview`
  - Keywords: EN "transcribe interview without uploading" · DE "interview transkribieren ohne upload" · FR "transcrire un entretien sans l'envoyer" · IT "trascrivere un'intervista senza caricarla"
  - Reader: a researcher or consultant with a consent-recorded interview who cannot send it to a cloud service.
  - Must include: in plain words why GDPR, nDSG (FR/IT: nLPD) and ethics boards make cloud upload a problem; the browser tool sends nothing to Vemoir; the first model download, then offline use; how to check the Network tab; consent and retention stay with the interviewer; Swiss German comes out as Standard German; Mac app for long tapes and speaker separation.
  - Do not: call the output a certified transcript; claim a Swiss German model; give legal advice; call any named competitor "worse" (state factual differences only).
- [ ] **4. `swiss-german-transcription`** · `interest` · `tool: transcribe-recording` · write DE first
  - Keywords: DE "schweizerdeutsch transkribieren" · EN "swiss german transcription" · FR "transcrire le suisse allemand" · IT "trascrivere lo svizzero tedesco"
  - Reader: a Swiss professional recorded a meeting in Swiss German and wants usable text.
  - Must include: why public Whisper writes Standard German from Swiss German, and when that is good enough; dialect models exist but are too large for a browser download; what Vemoir for Mac does today (local models, glossaries for names and terms) and that a dialect path is planned; Swiss hosting vs local processing (for example töggl keeps data in Switzerland but processes it on its servers; the Vemoir browser tool never receives the file).
  - Do not: give accuracy numbers; claim dialect output; rank against töggl.
  - **GATE:** confirm the current Swiss German state of the Mac app with the product owner.
- [ ] **5. `meeting-minutes-template`** · `interest`
  - Keywords: EN "meeting minutes template" · DE "sitzungsprotokoll vorlage" · FR "modèle de procès-verbal de réunion" · IT "modello di verbale di riunione"
  - Must include: a copyable template in a code block (date, attendees, agenda, decisions, action items with owner and due date, open questions); filled examples for a team sync, a board (Verwaltungsrat) meeting and a client call; common mistakes (minutes as a transcript, actions without owners); how Vemoir fills the sections from a recording (`/#record`, `/#exports`).
- [ ] **6. `record-teams-meeting-mac`** · `consideration`
  - Keywords: EN "record teams meeting on mac" · DE "teams meeting aufnehmen mac" · FR "enregistrer une réunion teams sur mac" · IT "registrare una riunione teams su mac"
  - Must include: Teams' built-in recording and transcription (licence and organizer rules, where files are stored; Microsoft docs only); why macOS screen recording is a poor fit (video, no transcript); Vemoir recording system audio and microphone, and why it asks for Screen Recording permission; tell participants and get consent.

### Weeks 3 and 4

- [ ] **7. `record-meeting-legal-switzerland`** · `awareness` · **GATE: LEGAL REVIEW**
  - Keywords: DE "gespräch aufzeichnen erlaubt schweiz" · EN "is it legal to record a meeting in switzerland" · FR "enregistrer une réunion est-ce légal en suisse" · IT "registrare una riunione è legale in svizzera"
  - Must include: StGB Art. 179bis and 179ter (link fedlex.admin.ch); consent of every participant; practical steps (announce at the start, note consent in the invite, respect objections); workplace and client contexts; a plain "this is not legal advice" line.
  - Do not: say Vemoir makes a recording lawful or compliant.
- [ ] **8. `teams-blocks-ai-notetaker-bots`** · `interest` · **GATE: primary source**
  - Keywords: EN "teams block ai notetaker bots" · DE "teams ki notetaker blockieren" · FR "teams bloque les bots de prise de notes" · IT "teams blocca i bot per appunti"
  - Must include: what Microsoft changed, only from Microsoft Learn or Message Center, with the date. If you cannot find a primary source, skip this item and say so in the pull request. What admins and participants can do; how local recording works without a participant.
- [ ] **9. `otter-ai-alternative`** · `consideration`
  - Keywords: EN "otter.ai alternative" · DE "otter ai alternative" · FR "alternative à otter.ai" · IT "alternativa a otter.ai"
  - Structure: what Otter does well; 5 to 7 alternatives, each with a "best for" line (Vemoir: best when the audio must stay on the Mac); a comparison table (bot joins, where audio goes, offline, platforms, pricing model); where Otter is the better choice; FAQ.
  - Sources: each vendor's own site, with the date checked. Title may include the year.
- [ ] **10. `is-otter-ai-safe`** · `interest`
  - Keywords: EN "is otter.ai safe" · DE "ist otter ai sicher" · FR "otter.ai est-il sûr" · IT "otter.ai è sicuro"
  - Must include: from Otter's own privacy, security and help pages: where data is stored, whether recordings train models, bot visibility, deletion. A balanced verdict per use case; the local alternative. No speculation.
- [ ] **11. `best-meeting-notes-app-mac`** · `consideration`
  - Keywords: EN "best meeting notes app for mac" · DE "beste meeting protokoll app mac" · FR "meilleure app de compte rendu de réunion mac" · IT "migliore app per verbali di riunione mac"
  - Structure: selection criteria first (bot or not, where audio goes, offline, languages, price model); 6 to 8 apps with honest "best for" lines, Vemoir included; comparison table; FAQ. Verify every app's current features on its own site.
- [ ] **12. `meeting-recording-data-protection-switzerland`** · `awareness` · **GATE: LEGAL REVIEW**
  - Keywords: DE "meeting aufzeichnung datenschutz schweiz" · EN "meeting recording swiss data protection" · FR "enregistrement de réunion nLPD" · IT "registrazione riunione nLPD"
  - Must include: what the revised data protection act means for recordings and transcripts (information duty, purpose, retention, processors abroad); cloud notetakers as processors; local processing as one way to reduce exposure. Link fedlex and the FDPIC (EDÖB / PFPDT / IFPDT).

### Backlog (after week 4, pick by search data)

Alternatives (one article each, same structure as item 9):

- [ ] `fireflies-alternative`
- [ ] `granola-alternative`
- [ ] `fathom-alternative`
- [ ] `tldv-alternative`
- [ ] `jamie-alternative`
- [ ] `plaud-alternative`
- [ ] `macwhisper-alternative`
- [ ] `toeggl-alternative` (DE first; factual difference: Swiss hosting vs local processing)

Troubleshooting and platform how-tos:

- [ ] `teams-transcript-not-showing`
- [ ] `remove-ai-bot-from-meeting`
- [ ] `record-zoom-meeting-mac`
- [ ] `record-google-meet-mac`
- [ ] `transcribe-voice-memo-mac` (Audio Files keywords: "m4a to text mac", DE "sprachnotiz transkribieren mac")
- [ ] `offline-transcription-mac` (Local Private keywords: "offline transcription mac", DE "offline transkription mac")

Privacy and "is X safe":

- [ ] `is-granola-private`
- [ ] `does-fireflies-train-on-recordings`
- [ ] `zoom-ai-companion-privacy`
- [ ] `teams-copilot-data-location-switzerland`
- [ ] `where-swiss-companies-meeting-data-goes`

Guides:

- [ ] `how-to-take-meeting-minutes`
- [ ] `action-items-from-meetings`
- [ ] `best-ai-notetaker-without-bot` (list post; different intent from item 2, which explains the problem)

Standing task:

- [ ] Each week, check the Teams, Zoom and Otter changelogs. When something relevant to recording, bots or transcripts changes, propose a post within 2 weeks (primary source required).

## 3.10 Before you open the pull request

- [ ] Four files, one per language, same `translationKey` and `funnelStage`.
- [ ] `funnelStage` is `awareness`, `interest` or `consideration`.
- [ ] Description under 160 characters in every language.
- [ ] Primary keyword in the title, the first sentence and at least one H2.
- [ ] No H1, no `---` in the body, no em dash, no exclamation marks in body copy.
- [ ] Every claim is in the fact sheet (3.2) or has a linked source. Nothing from 3.3.
- [ ] Internal links come from the link map (3.7) or point to existing posts.
- [ ] `relatedPosts` lists only existing filenames in the same language (or `[]`).
- [ ] FAQ section in the fixed format (3.6).
- [ ] Hero image at `images/{translationKey}/hero.jpg` with alt text, or no `image` line.
- [ ] Pull request title `vemoir: {translationKey}`. The description lists the primary keyword per language, the sources with the date checked, and anything the reviewer should double-check.
