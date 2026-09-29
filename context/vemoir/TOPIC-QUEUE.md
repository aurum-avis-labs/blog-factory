# Vemoir topic queue

Writer source of truth for the 2026-09-30 through 2026-11-18 batch. Two posts each morning, 100 posts total. Locales are en, de, fr, and it. The same `pubDate`, `funnelStage`, and `translationKey` belong on every locale file. `draft: false`. Author `Vemoir Team`.

The first 10 rows are already published on main. Their bodies stay as they are. Only `pubDate` was moved. Do not invent a slug. New posts are not in this checkout yet.

`tool` is the frontmatter `tool:` value, `store` when the only CTA is the App Store, or a homepage anchor. `relatedPosts` is a later pass: 1 to 3 posts in the same language, same or higher stage, and only URLs already due on that post's date.

Mac app price (CHF 20 / €24.99 / $22.99) belongs only in consideration posts. Browser tools are after the call, 15 minutes, 3 runs a week, no speaker labels, no Swiss German dialect. Never claim compliant, HIPAA, or GDPR-certified, accuracy percents, or dialect output. Do not publish internal benchmark numbers. No legal advice and no privilege claims.

The shipped permission is System Audio Recording (audio-only Core Audio tap). Do not describe a screen capture. Do not name unshipped work: Swiss German models, in-person recording mode, meeting-detection prompts, MCP/CLI, Microsoft Foundry, Google Gemini, team sharing, PDF/DOCX export.

Do not draft: `swiss-german-transcription`, `record-meeting-legal-switzerland`, `teams-blocks-ai-notetaker-bots`, `meeting-recording-data-protection-switzerland`.

## Calendar

| Date | translationKey | funnelStage | tool | Intent | Status |
|------|----------------|-------------|------|--------|--------|
| 2026-09-30 | `meeting-notes-without-bot` | awareness | `transcribe-recording` | Problem explainer: meeting notes without a bot joining the call. | existing |
| 2026-09-30 | `transcribe-interview-without-upload` | consideration | `transcribe-interview` | Transcribe an interview without uploading the recording. | existing |
| 2026-10-01 | `meeting-minutes-template` | interest | `minutes-sheet` | Copyable meeting-minutes template. The later how-to covers the practice. | existing |
| 2026-10-01 | `record-teams-meeting-mac` | consideration | `recording-to-notes` | Record a Microsoft Teams meeting on a Mac. | existing |
| 2026-10-02 | `zoom-local-recording-transcript` | interest | `transcribe-zoom-recording` | Transcript after you already have a Zoom local recording. The later Zoom post is during the call. EN file stays transcribe-zoom-local-recording.mdx. | existing |
| 2026-10-02 | `otter-ai-alternative` | consideration | `transcribe-recording` | Otter.ai alternative. | existing |
| 2026-10-03 | `is-otter-ai-safe` | interest | `transcribe-recording` | Is Otter.ai safe: storage, training, and the bot. | existing |
| 2026-10-03 | `best-meeting-notes-app-mac` | consideration | `none` | Best meeting-notes app for Mac. The file already on main has no tool field. | existing |
| 2026-10-04 | `fireflies-alternative` | consideration | `transcribe-recording` | Fireflies alternative. | existing |
| 2026-10-04 | `granola-alternative` | consideration | `transcribe-recording` | Granola alternative. | existing |
| 2026-10-05 | `fathom-alternative` | consideration | `transcribe-recording` | Fathom alternative. | new |
| 2026-10-05 | `tldv-alternative` | consideration | `transcribe-recording` | tl;dv alternative. | new |
| 2026-10-06 | `jamie-alternative` | consideration | `transcribe-recording` | Jamie AI alternative. | new |
| 2026-10-06 | `plaud-alternative` | consideration | `transcribe-recording` | Plaud alternative. Plaud is a hardware recorder; Vemoir is Mac software. | new |
| 2026-10-07 | `macwhisper-alternative` | consideration | `transcribe-recording` | MacWhisper alternative. Honest: MacWhisper wins for Finder-only file transcription. | new |
| 2026-10-07 | `toeggl-alternative` | consideration | `transcribe-recording` | Töggl alternative, DE first. Swiss hosting versus a file that is never uploaded. Do not rank them. | new |
| 2026-10-08 | `teams-transcript-not-showing` | interest | `recording-to-notes` | Teams transcript is not showing. | new |
| 2026-10-08 | `remove-ai-bot-from-meeting` | interest | `transcribe-recording` | Remove an AI bot from a meeting. | new |
| 2026-10-09 | `record-zoom-meeting-mac` | consideration | `transcribe-zoom-recording` | Record a Zoom meeting on a Mac during the call. The Zoom post already on main is the after-the-file transcript. | new |
| 2026-10-09 | `record-google-meet-mac` | consideration | `recording-to-notes` | Record a Google Meet call on a Mac. | new |
| 2026-10-10 | `transcribe-voice-memo-mac` | interest | `transcribe-voice-memo` | Transcribe a Voice Memo on a Mac. | new |
| 2026-10-10 | `offline-transcription-mac` | interest | `transcribe-recording` | Offline transcription on a Mac. | new |
| 2026-10-11 | `is-granola-private` | interest | `transcribe-recording` | Is Granola private. Vendor docs only. | new |
| 2026-10-11 | `does-fireflies-train-on-recordings` | interest | `transcribe-recording` | Does Fireflies train on recordings. Vendor docs only. | new |
| 2026-10-12 | `zoom-ai-companion-privacy` | interest | `transcribe-zoom-recording` | Zoom AI Companion privacy. Vendor docs only. | new |
| 2026-10-12 | `teams-copilot-data-location-switzerland` | interest | `recording-to-notes` | Where Teams Copilot stores data, for readers in Switzerland. Vendor docs only. | new |
| 2026-10-13 | `where-swiss-companies-meeting-data-goes` | awareness | `transcribe-recording` | Where meeting data from Swiss companies goes. No legal advice. | new |
| 2026-10-13 | `how-to-take-meeting-minutes` | interest | `minutes-sheet` | How to take meeting minutes. Practice piece. The post already on main is the copyable template. | new |
| 2026-10-14 | `action-items-from-meetings` | interest | `minutes-sheet` | Action items from meetings. | new |
| 2026-10-14 | `best-ai-notetaker-without-bot` | consideration | `transcribe-recording` | List of AI notetakers without a bot. The without-bot post already on main is the problem explainer. | new |
| 2026-10-15 | `minutes-vs-transcript` | awareness | `minutes-sheet` | Minutes versus a transcript. | new |
| 2026-10-15 | `messy-meeting-transcript` | interest | `transcript-cleaner` | Clean up a messy meeting transcript. | new |
| 2026-10-16 | `speaker-labels-missing` | interest | `who-held-the-floor` | Speaker labels are missing. The browser tool cannot invent speakers. | new |
| 2026-10-16 | `turn-transcript-into-meeting-notes` | interest | `meeting-notes-from-transcript` | Turn a transcript into meeting notes. | new |
| 2026-10-17 | `export-teams-transcript` | interest | `transcript-cleaner` | Export a Teams transcript. | new |
| 2026-10-17 | `zoom-vtt-to-plain-text` | interest | `transcript-cleaner` | Turn a Zoom VTT file into plain text. | new |
| 2026-10-18 | `why-meeting-summaries-miss-decisions` | awareness | `minutes-sheet` | Why meeting summaries miss decisions. | new |
| 2026-10-18 | `share-notes-without-the-recording` | interest | `/#exports` | Share the notes without sharing the recording. | new |
| 2026-10-19 | `who-spoke-most-in-meeting` | interest | `who-held-the-floor` | See who spoke most in a meeting. | new |
| 2026-10-19 | `meeting-longer-than-15-minutes` | interest | `store` | Meeting longer than 15 minutes. Browser cap versus the Mac app. | new |
| 2026-10-20 | `cloud-vs-local-meeting-transcription` | awareness | `transcribe-recording` | Cloud versus local meeting transcription. | new |
| 2026-10-20 | `meeting-recording-no-sound-mac` | interest | `/#capture` | Meeting recording has no sound on a Mac. Mic versus system audio. | new |
| 2026-10-21 | `system-audio-recording-mac` | interest | `/#capture` | System audio recording on a Mac. The shipped permission is System Audio Recording, audio-only. People still search the old Screen Recording name. | new |
| 2026-10-21 | `import-audio-file-mac` | interest | `transcribe-recording` | Import an audio file on a Mac. | new |
| 2026-10-22 | `transcribe-german-meeting` | interest | `transcribe-recording` | Transcribe a German meeting. Standard German, DE first. No dialect claim. | new |
| 2026-10-22 | `bilingual-meeting-transcription` | interest | `transcribe-recording` | Bilingual meeting transcription and language switching. State the honest limits. | new |
| 2026-10-23 | `meeting-notes-subscription-cost` | awareness | `meeting-cost` | What a meeting-notes subscription costs. | new |
| 2026-10-23 | `ai-notetaker-pricing` | interest | `/#pricing` | AI notetaker pricing: seat versus usage versus one-time, from vendor pricing pages, marked as of a date. | new |
| 2026-10-24 | `one-time-meeting-notes-app` | consideration | `store` | A meeting-notes app with a one-time price. | new |
| 2026-10-24 | `what-a-meeting-costs` | awareness | `meeting-cost` | What a meeting costs. | new |
| 2026-10-25 | `best-free-transcription-tools` | consideration | `transcribe-recording` | Best free transcription tools. State the 15-minute and 3-runs-a-week limit. | new |
| 2026-10-25 | `record-slack-huddle-mac` | consideration | `store` | Record a Slack huddle on a Mac. | new |
| 2026-10-26 | `record-discord-call-mac` | consideration | `store` | Record a Discord call on a Mac. | new |
| 2026-10-26 | `whatsapp-voice-to-text` | interest | `transcribe-voice-memo` | WhatsApp voice message to text. | new |
| 2026-10-27 | `zoom-cloud-vs-local-recording` | interest | `transcribe-zoom-recording` | Zoom cloud recording versus local recording. | new |
| 2026-10-27 | `meeting-notes-for-lawyers` | interest | `meeting-notes-from-transcript` | Meeting notes for lawyers. No privilege or legal-advice claims. | new |
| 2026-10-28 | `meeting-notes-treuhand` | interest | `minutes-sheet` | Meeting notes for Treuhand and fiduciary firms. | new |
| 2026-10-28 | `hr-interview-transcription` | interest | `transcribe-interview` | HR interview transcription. | new |
| 2026-10-29 | `journalist-interview-transcription` | interest | `transcribe-interview` | Journalist interview transcription. | new |
| 2026-10-29 | `qualitative-research-transcription` | interest | `transcribe-interview` | Qualitative research transcription. | new |
| 2026-10-30 | `verwaltungsrat-protokoll` | interest | `minutes-sheet` | Verwaltungsrat protocol and board minutes. | new |
| 2026-10-30 | `consultant-meeting-notes` | interest | `meeting-notes-from-transcript` | Meeting notes for consultants. | new |
| 2026-10-31 | `client-call-notes-without-upload` | consideration | `recording-to-notes` | Client-call notes without uploading the recording. | new |
| 2026-10-31 | `best-offline-transcription-mac` | consideration | `store` | Best offline transcription on a Mac. | new |
| 2026-11-01 | `best-private-meeting-notes` | consideration | `store` | Best private meeting notes. | new |
| 2026-11-01 | `otter-vs-fireflies` | consideration | `store` | Otter versus Fireflies. | new |
| 2026-11-02 | `granola-vs-otter` | consideration | `store` | Granola versus Otter. | new |
| 2026-11-02 | `is-fathom-private` | interest | `transcribe-recording` | Is Fathom private. Vendor docs only. | new |
| 2026-11-03 | `ask-questions-about-meeting-transcript` | consideration | `/#chat` | Ask questions about a meeting transcript. | new |
| 2026-11-03 | `parakeet-vs-whisper` | interest | `/#capture` | Parakeet v3 (25 European languages) versus Whisper Turbo, Medium, and Large-v3. Choice, download, and storage. No accuracy ranking. | new |
| 2026-11-04 | `qwen-vs-gpt-oss` | interest | `/#capture` | Qwen3 4B on most Macs, gpt-oss-20b on high-memory Macs. These write notes, documents, and Ask Vemoir. They do not transcribe the audio. | new |
| 2026-11-04 | `bring-your-own-api-key` | consideration | `/#capture` | Bring your own OpenAI or Anthropic key. Text only, Keychain, explicit activation. Audio and speaker separation stay on the Mac. No silent fallback. | new |
| 2026-11-05 | `apple-intelligence-meeting-notes` | interest | `/#capture` | Apple Intelligence where the Mac has it, for cleanup and artifacts. Transcription still uses the selected local speech model. | new |
| 2026-11-05 | `local-model-download` | interest | `/#capture` | What the first local-model download is, with resumable progress and no silent model swap. Distinct from the offline how-to. | new |
| 2026-11-06 | `speaker-profiles-mac` | interest | `/#capture` | Remember this speaker is opt-in, encrypted, and deletable. Unknown speakers stay anonymous. | new |
| 2026-11-06 | `fix-wrong-speaker-names` | interest | `/#capture` | Rename a speaker label without creating a profile. Distinct from the unlabeled-export post. | new |
| 2026-11-07 | `project-glossary` | interest | `/#record` | Preferred terms and aliases on a project. The original transcript stays the evidence. | new |
| 2026-11-07 | `notes-while-recording` | interest | `/#record` | Manual notes fold into the minutes and keep their own provenance. | new |
| 2026-11-08 | `meeting-projects` | interest | `/#record` | File a call under a client before you press record. | new |
| 2026-11-08 | `export-to-apple-notes` | interest | `/#exports` | Pick an Apple Notes folder. A later export updates the same note. | new |
| 2026-11-09 | `microphone-noise-suppression` | interest | `/#capture` | Microphone noise suppression: Off, Balanced, or Strong, on the mic, on the Mac. | new |
| 2026-11-09 | `mic-and-system-audio` | awareness | `/#capture` | Two local tracks: you and the call. Not the unshipped in-person mode. | new |
| 2026-11-10 | `delete-a-meeting-recording` | interest | `/#capture` | Keep or drop the audio, purge a finished meeting, or delete a project. | new |
| 2026-11-10 | `search-past-meetings` | interest | `/#chat` | Search meetings, transcripts, actions, and decisions on the Mac. | new |
| 2026-11-11 | `decision-log-from-meetings` | interest | `minutes-sheet` | A decision with a person and a date. Distinct from the action-items post. | new |
| 2026-11-11 | `follow-up-from-meeting-notes` | interest | `/#exports` | A document or a copied note after the call. Distinct from sharing without the recording. | new |
| 2026-11-12 | `evidence-in-meeting-notes` | awareness | `/#chat` | A summary that can point at the line in the transcript. The 2026-11-03 Ask post is the how-to. | new |
| 2026-11-12 | `notta-alternative` | consideration | `transcribe-recording` | Notta alternative. | new |
| 2026-11-13 | `tactiq-alternative` | consideration | `transcribe-recording` | Tactiq alternative. Tactiq is a browser extension, not live-capture parity. | new |
| 2026-11-13 | `bluedot-alternative` | consideration | `transcribe-recording` | Bluedot alternative. Honest where a bot-free team product still wins. | new |
| 2026-11-14 | `notion-ai-meeting-notes` | interest | `store` | Notion AI meeting notes, for people who already pay for Notion. | new |
| 2026-11-14 | `record-webex-on-mac` | consideration | `store` | Record a Webex meeting on a Mac. | new |
| 2026-11-15 | `transcribe-loom-recording` | interest | `transcribe-recording` | Transcribe a Loom recording you already have. | new |
| 2026-11-15 | `in-person-meeting-notes-mac` | interest | `store` | In-person meeting notes on a Mac using the microphone in the room today. Do not describe the unshipped in-person mode. | new |
| 2026-11-16 | `user-interview-notes` | interest | `transcribe-interview` | Product user-interview notes. Distinct from the HR and research posts. | new |
| 2026-11-16 | `sales-call-notes-local` | interest | `recording-to-notes` | Local sales-call notes. Gong and Avoma win when the point is CRM coaching. | new |
| 2026-11-17 | `lecture-transcription-mac` | interest | `transcribe-recording` | Lecture transcription on a Mac. | new |
| 2026-11-17 | `is-tldv-safe` | interest | `transcribe-recording` | Is tl;dv safe. Vendor docs only. | new |
| 2026-11-18 | `is-plaud-private` | interest | `transcribe-recording` | Is Plaud private, from Plaud's own privacy pages. Plaud is hardware. | new |
| 2026-11-18 | `fathom-vs-otter` | consideration | `store` | Fathom versus Otter. | new |

## Existing filenames

Link with these filenames. `translationKey` is shared. The English Zoom file is not the key.

| translationKey | en | de | fr | it |
|----------------|----|----|----|----|
| `meeting-notes-without-bot` | `meeting-notes-without-a-bot.mdx` | `meeting-notizen-ohne-bot.mdx` | `notes-reunion-sans-bot.mdx` | `note-riunione-senza-bot.mdx` |
| `transcribe-interview-without-upload` | `transcribe-interview-without-upload.mdx` | `interview-transkribieren-ohne-upload.mdx` | `transcrire-entretien-sans-envoi.mdx` | `trascrivere-intervista-senza-caricarla.mdx` |
| `meeting-minutes-template` | `meeting-minutes-template.mdx` | `sitzungsprotokoll-vorlage.mdx` | `modele-proces-verbal-reunion.mdx` | `modello-verbale-riunione.mdx` |
| `record-teams-meeting-mac` | `record-teams-meeting-mac.mdx` | `teams-meeting-aufnehmen-mac.mdx` | `enregistrer-reunion-teams-sur-mac.mdx` | `registrare-riunione-teams-su-mac.mdx` |
| `zoom-local-recording-transcript` | `transcribe-zoom-local-recording.mdx` | `zoom-aufnahme-transkribieren.mdx` | `transcrire-enregistrement-zoom.mdx` | `trascrivere-registrazione-zoom.mdx` |
| `otter-ai-alternative` | `otter-ai-alternative.mdx` | `otter-ai-alternative.mdx` | `alternative-a-otter-ai.mdx` | `alternativa-a-otter-ai.mdx` |
| `is-otter-ai-safe` | `is-otter-ai-safe.mdx` | `ist-otter-ai-sicher.mdx` | `otter-ai-est-il-sur.mdx` | `otter-ai-e-sicuro.mdx` |
| `best-meeting-notes-app-mac` | `best-meeting-notes-app-mac.mdx` | `beste-meeting-protokoll-app-mac.mdx` | `meilleure-app-compte-rendu-reunion-mac.mdx` | `migliore-app-verbali-riunione-mac.mdx` |
| `fireflies-alternative` | `fireflies-alternative.mdx` | `fireflies-alternative.mdx` | `alternative-a-fireflies.mdx` | `alternativa-a-fireflies.mdx` |
| `granola-alternative` | `granola-alternative.mdx` | `granola-alternative.mdx` | `alternative-a-granola.mdx` | `alternativa-a-granola.mdx` |
