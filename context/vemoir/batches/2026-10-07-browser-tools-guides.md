# Vemoir batch — 2026-10-07 (browser tools guides)

Audience: professionals who join calls, rehearse short updates, clean transcripts, or publish short clips, and who care that audio never leaves the device.
Offer URLs: browser tools on vemoir.ch (`/tools/...`), Mac app only as the longer-call path.
Languages: en, de, fr, it
Mix: 0 / 100 / 0 (wave 1 = four interest how-tos for new browser tools)
Calendar: one post per day starting 2026-11-19 (after the existing queue ends 2026-11-18)

Honesty (from TOPIC-QUEUE + live tool copy): browser only; nothing uploaded; no invented speaker labels; no Swiss German dialect output; no HIPAA/GDPR-certified claims. Model tools (subtitle generator, and any Whisper path): files up to 15 minutes; 3 successful model runs in a rolling 7-week window, shared across transcription tools. Mic test, speaking-speed test, and filler cleaner do not spend a model run.

| ID | Wave | Type | funnelStage | Primary query (EN) | EN slug | DE slug | FR slug | IT slug | tool | Image | Status |
|----|------|------|-------------|--------------------|---------|---------|---------|---------|------|-------|--------|
Heroes: Higgsfield gpt_image_2_5 saved as hero.jpg (1200×900) for all four translationKeys; draft: false.
| 2 | 1 | how-to | interest | speaking speed test words per minute | speaking-speed-test-words-per-minute | sprechtempo-test-woerter-pro-minute | test-debit-de-parole-mots-par-minute | test-velocita-parlato-parole-al-minuto | speaking-speed-test | unsplash pending | drafted |
| 3 | 1 | how-to | interest | remove filler words from transcript | remove-filler-words-from-transcript | fuellwoerter-aus-transkript-entfernen | retirer-mots-de-remplissage-transcription | rimuovere-intercalari-dalla-trascrizione | filler-word-cleaner | unsplash pending | drafted |
| 4 | 1 | how-to | interest | free subtitle generator SRT VTT | free-subtitle-generator-srt-vtt | kostenloser-untertitel-generator-srt-vtt | generateur-sous-titres-gratuit-srt-vtt | generatore-sottotitoli-gratuito-srt-vtt | subtitle-generator | unsplash pending | drafted |

## Left out (and why)

- "Best mic for Zoom" hardware roundups: different intent; would need retailer sources.
- Live browser recording / tab capture: not shipped; honesty rules forbid it.
- Dialect subtitle or Swiss German filler lists: not shipped.
- Accuracy % or WPM grade claims: brand forbids unsourced benchmarks.

## Internal links (planned)

- Mic → `microphone-noise-suppression`, `meeting-recording-no-sound-mac`; related may include wave peer `speaking-speed-test-words-per-minute`.
- Pace → `who-spoke-most-in-meeting`, wave peer mic; body prefers live peers.
- Fillers → `messy-meeting-transcript`, `who-spoke-most-in-meeting`.
- Subtitles → `zoom-vtt-to-plain-text`, `meeting-longer-than-15-minutes`, `zoom-local-recording-transcript`.

## NOTE: heroes still need fetching

`UNSPLASH_ACCESS_KEY` was not available in this environment. Created empty dirs:

- `brands/vemoir/images/test-microphone-online-before-call/`
- `brands/vemoir/images/speaking-speed-test-words-per-minute/`
- `brands/vemoir/images/remove-filler-words-from-transcript/`
- `brands/vemoir/images/free-subtitle-generator-srt-vtt/`

Suggested Unsplash queries (1200×900 `hero.jpg`):

1. headset microphone desk before video call, no logos
2. person rehearsing notes aloud at desk, screen turned away
3. printed transcript pages and pen on clean desk
4. video editor timeline on laptop, screen text unreadable / no UI chrome

When keys are present:

```bash
python3 scripts/fetch-unsplash-images.py --jobs scripts/unsplash-jobs-vemoir-browser-tools-guides.json
```

MDX files omit the `image:` frontmatter line until `hero.jpg` exists (per `images.md`). Add `image: "@/assets/blog/{translationKey}/hero.jpg"` and the Unsplash credit after fetch.

## Wave status

- draft: true on all 16 MDX files
- pubDate set to TOPIC-QUEUE dates
- PR / draft:false left for human approval
