# Aurum Company-Blog — Publishing-Gate

**Stand:** 2026-09-30  
**Ship-Modell:** 103 Posts (Welle 1–3), ein Post pro Wochentag von 2026-10-01 bis 2027-02-22 (Europe/Zurich), inklusive 24., 25. und 31. Dezember 2026 und 1. Januar 2027. Die Live-Site filtert mit `isLivePost`. Der Cron (`15 5 * * *`, täglich 05:15 UTC, siehe `.github/workflows/scheduled-publish.yml`) baut Aurum neu, wenn ein Datum fällig ist. Merge nach `main` ist freigegeben, sobald der Validator 0 Fehler meldet.

Kein zweites SEO-Programm auf EN. DE + EN desselben Topics: gleiches `pubDate`, gleicher `translationKey` (EN-Slug).

---

## Cadence

| | |
|---|---|
| Rhythmus | Ein Topic pro Wochentag (Montag–Freitag), 1. Oktober 2026 bis 22. Februar 2027. Feiertage werden nicht ausgelassen. |
| Locales | `brands/aurum/de/{slug}.mdx` + `brands/aurum/en/{en-slug}.mdx` |
| Bilder | `brands/aurum/images/{en-slug}/` · Guide: [`../context-files/aurum_avis_labs_blogpost_image_instructions.md`](../context-files/aurum_avis_labs_blogpost_image_instructions.md) |
| Preview | `npm run preview`, Brand Aurum. Preview zeigt auch zukünftige `pubDate`. |
| Merge | Nach `main`, wenn `validate.py` 0 Fehler hat. Kein `npm version` in blog-factory. |

---

## Kalender

Massgebend ist [`../batches/2026-09-30-wave-3/CALENDAR.md`](../batches/2026-09-30-wave-3/CALENDAR.md) (`seq` 1–103). Erzeugt mit `tools/reschedule.py --start 2026-10-01`. Body-Links nur auf Posts mit kleinerem `seq`. Welle 1 und 2 sind geschrieben (seq 1–48, live ab 1. Oktober). Welle 3 (seq 49–103) startet am 8. Dezember 2026. `draft: false` auf allem, das auf `main` liegt.

---

## relatedPosts

Im selben PR die Matrix aus [`TOPIC-QUEUE.md`](./TOPIC-QUEUE.md) setzen. Die Live-Site zeigt nur Posts mit erreichtem `pubDate`. Kein Follow-up-MR nötig. Keine MVP-Slugs.

---

## Definition of done (Cluster-PR)

- [ ] 103 Topics je DE + EN, Daten wie in CALENDAR.md
- [ ] gleiches `pubDate` und `translationKey` pro Paar
- [ ] Frontmatter komplett, `description` unter 160 Zeichen
- [ ] CTA laut Queue
- [ ] Live-Pfade: `/de/prozess-check`, `/de/prozess-check/buchen` (EN ohne `/de`)
- [ ] Preise nur Onepager ([`STRATEGY.md`](./STRATEGY.md) Abschnitt 2)
- [ ] ein Hero pro Topic unter `brands/aurum/images/{en-slug}/`
- [ ] Validator 0 Fehler, dann Merge nach `main`

---

## Geplantes pubDate (Technik)

Ein zukünftiges `pubDate` darf auf `main` liegen. Der Post bleibt von der Live-Site weg, bis ein Landing-Page-Build an oder nach diesem Kalendertag (Europe/Zurich) läuft. Der tägliche Cron (`15 5 * * *`) dispatcht nur Marken mit einem fälligen Post.

---

## Out of scope

- Nav oder Angebotsseite ändern
- MVP-Cluster umschreiben
- Product-Blogs
- `isLivePost` oder den Cron ändern
