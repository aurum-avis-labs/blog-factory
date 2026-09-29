# Aurum Company-Blog — Publishing-Gate

**Stand:** 2026-09-29  
**Ship-Modell:** Ein PR mit dem ganzen Prozess-Check-Cluster. Jedes Topic hat ein zukünftiges `pubDate` (ungerader Kalendertag, Europe/Zurich). Merge nach Roberts Nod. Die Live-Site filtert mit `isLivePost`; der Cron (`15 5 */2 * *`) baut Aurum neu, wenn ein Datum fällig ist.

Kein zweites SEO-Programm auf EN. DE + EN desselben Topics: gleiches `pubDate`, gleicher `translationKey` (EN-Slug).

---

## Cadence

| | |
|---|---|
| Rhythmus | 1 Topic / Woche auf der Live-Site (nicht 16 URLs am Merge-Tag) |
| Locales | `brands/aurum/de/{slug}.mdx` + `brands/aurum/en/{en-slug}.mdx` im selben PR |
| Bilder | `brands/aurum/images/{en-slug}/` · Guide: [`../context-files/aurum_avis_labs_blogpost_image_instructions.md`](../context-files/aurum_avis_labs_blogpost_image_instructions.md) |
| Preview | `npm run preview`, Brand Aurum. Preview zeigt auch zukünftige `pubDate`. |
| Merge | ein PR, Nod Robert. Kein `npm version` in blog-factory. |

---

## Kalender (ungerade Tage)

Odd-day Cron: ein Dienstag auf einem geraden Datum wartet bis zum nächsten ungeraden Rebuild. Deshalb liegen die Daten auf ungeraden `YYYY-MM-DD`.

| pubDate | ID | Slug DE | Slug EN / image folder |
|---------|-----|---------|------------------------|
| 2026-10-07 | T02 | `welchen-ablauf-zuerst-automatisieren` | `which-process-to-automate-first` |
| 2026-10-13 | T04 | `was-der-prozess-check-ist` | `what-the-process-check-is` |
| 2026-10-21 | T01 | `ki-im-betrieb-nichts-greifbares` | `ai-in-operations-nothing-tangible` |
| 2026-10-27 | T03 | `drei-ablaeufe-die-sich-lohnen` | `three-workflows-worth-automating` |
| 2026-11-03 | T12 | `workshop-oder-umsetzung` | `workshop-or-implementation` |
| 2026-11-11 | T05 | `chatgpt-kundendaten-dsg-schweiz` | `chatgpt-customer-data-swiss-dsg` |
| 2026-11-17 | T06 | `schatten-ki-im-buero` | `shadow-ai-in-the-office` |
| 2026-11-23 | T07 | `belege-erfassen-was-software-nicht-uebernimmt` | `invoice-capture-what-software-misses` |
| 2026-12-01 | T08 | `reporting-aus-fuenf-quellen` | `reporting-from-five-sources` |
| 2026-12-07 | T09 | `nachfassen-angebote-follow-ups` | `quote-follow-ups` |
| 2026-12-15 | T10 | `excel-als-schatten-system` | `excel-as-shadow-system` |
| 2026-12-21 | T11 | `copilot-oder-einen-ablauf-bauen` | `copilot-or-build-a-workflow` |
| 2026-12-29 | T13 | `was-automatisierung-kostet-schweiz` | `what-automation-costs-switzerland` |
| 2027-01-05 | T14 | `wann-ki-den-ablauf-schlechter-macht` | `when-ai-makes-the-process-worse` |
| 2027-01-11 | T15 | `make-n8n-power-automate` | `make-n8n-power-automate` |
| 2027-01-19 | T16 | `eu-ai-act-schweizer-kmu` | `eu-ai-act-swiss-smes` |

T16 nur wenn der Text praktisch bleibt. `draft: false` auf allem, das im PR landet.

---

## relatedPosts

Im selben PR die Matrix aus [`TOPIC-QUEUE.md`](./TOPIC-QUEUE.md) setzen. Die Live-Site zeigt nur Posts mit erreichtem `pubDate`. Kein Follow-up-MR nötig. Keine MVP-Slugs.

---

## Definition of done (Cluster-PR)

- [ ] 16 Topics (oder 15 ohne T16) je DE + EN
- [ ] gleiches `pubDate` und `translationKey` pro Paar
- [ ] Frontmatter komplett, `description` unter 160 Zeichen
- [ ] CTA laut Queue
- [ ] Live-Pfade: `/de/prozess-check`, `/de/prozess-check/buchen` (EN ohne `/de`)
- [ ] Preise nur Onepager ([`STRATEGY.md`](./STRATEGY.md) Abschnitt 2)
- [ ] ein Hero pro Topic unter `brands/aurum/images/{en-slug}/`
- [ ] Preview mindestens P0 DE + EN
- [ ] PR-Titel mit Datumsrange, Merge nur nach Nod

---

## Geplantes pubDate (Technik)

Ein zukünftiges `pubDate` darf gemerged werden. Der Post bleibt von der Live-Site weg, bis ein Landing-Page-Build an oder nach diesem Kalendertag (Europe/Zurich) läuft. Der Cron an ungeraden Tagen (`15 5 */2 * *`) dispatcht nur Marken mit einem fälligen Post.

---

## Out of scope

- Nav oder Angebotsseite ändern
- MVP-Cluster umschreiben
- Product-Blogs
- `isLivePost` oder den Cron ändern
