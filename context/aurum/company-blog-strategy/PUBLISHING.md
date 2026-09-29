# Aurum Company-Blog — Publishing-Gate

**Stand:** 2026-09-29  
**Prinzip:** Qualität und Roberts Nod vor jedem Write und vor jedem Merge. **Keine** Autopilot-Massenpublikation, kein ungefragtes Batch von 16 Posts.

Company-Aurum ist nicht Postology-Autopilot. Ein Topic pro Woche, DE + EN im **selben PR**, nachdem der Topic genickt ist.

---

## Cadence

| | |
|---|---|
| Rhythmus | 1 Artikel-Konzept / Woche |
| Locales | `brands/aurum/de/{slug}.mdx` + `brands/aurum/en/{en-slug}.mdx` zusammen |
| Bilder | `brands/aurum/images/{slug}/` · Guide: [`../context-files/aurum_avis_labs_blogpost_image_instructions.md`](../context-files/aurum_avis_labs_blogpost_image_instructions.md) |
| Preview | `npm run preview` im blog-factory, Brand Aurum, DE- und EN-Pfad prüfen |
| Merge | nur nach Roberts PR-Nod → auto-publish wie üblich |

Kein zweites SEO-Programm auf EN: gleiche Argumente, gleiche `funnelStage`, lokalisierter Slug.

---

## Gate (unverhandelbar)

```
Dienstag  Topic-Ping (nächster Eintrag laut Reihenfolge unten)
    ↓
Robert nodet  — oder tauscht Priority / streicht / ersetzt Title
    ↓
Writer schreibt  DE + EN + Bilder + relatedPosts gemäss STRATEGY
    ↓
PR  (ein Topic, beide Sprachen)
    ↓
Robert nodet den PR
    ↓
Merge
```

- Ohne Dienstag-Nod: **nicht** schreiben.
- Ohne PR-Nod: **nicht** mergen.
- Writer eröffnet nicht von sich aus die ganze Queue.
- `draft: true` nur wenn Robert das explizit will; Default der Queue ist publish-ready nach Nod.

Dienstag-Ping (kurz, an Robert), Vorlage:

> Nächste Woche, Prozess-Check-Cluster: **{Working title DE}** (`{slug}`, {TOFU/MOFU/BOFU}, CTA {Angebot/Buchen/Fork/Workshop}). Outline steht in TOPIC-QUEUE {ID}. Nod, tauschen oder skip?

---

## Reihenfolge Wochen 1–4 (P0)

Nicht die T-Nummer, diese Reihenfolge — damit der BOFU-Post existiert, bevor alle Spokes darauf zeigen.

| Woche | ID | Slug DE | Warum zuerst |
|-------|-----|---------|----------------|
| 1 | T02 | `welchen-ablauf-zuerst-automatisieren` | Pillar: Filter, intern später Ziel aller MOFU-Links |
| 2 | T04 | `was-der-prozess-check-ist` | BOFU live, CTA buchen, relatedPosts-Ziel |
| 3 | T01 | `ki-im-betrieb-nichts-greifbares` | USP-Essay, kann auf T02 + T04 zeigen |
| 4 | T03 | `drei-ablaeufe-die-sich-lohnen` | Spokes vorbereiten; T07–T09 noch nicht nötig |

Ab Woche 5: nächstes **P1** nach Roberts Nod. Vorschlag, wenn er nicht umpriorisiert: T12 (Fork, entlastet CTA-Verwirrung) → T05 oder T07 (Datenschutz vs. Belege, je nach Outreach) → restliche P1 → P2 nur wenn P0 intern verlinkt sind.

T16 skippen, wenn der Entwurf zum Rechtskommentar wird ([`TOPIC-QUEUE.md`](./TOPIC-QUEUE.md) T16).

---

## relatedPosts beim Wachsen

| Nach Merge von | relatedPosts in älteren Posts nachziehen |
|----------------|------------------------------------------|
| Woche 1 (nur T02) | `relatedPosts: []` erlaubt (einziges Cluster-Peer) |
| Woche 2 (T04) | T02 → T04; T04 → T02 (interest, solange keine zweite consideration) |
| Woche 3+ | Matrix in TOPIC-QUEUE; **keine** MVP-Slugs |

---

## Definition of done (pro Topic)

- [ ] Robert hat den Topic am Dienstag genickt
- [ ] Frontmatter komplett (`title`, `description` unter 160 Zeichen, `pubDate`, `funnelStage`, `relatedPosts`, `tags`)
- [ ] CTA entspricht Queue-Zeile (MOFU/BOFU → Prozess-Check oder dokumentierte Ausnahme)
- [ ] Live-Pfade: `/de/prozess-check` bzw. `/de/prozess-check/buchen`, nicht `/de/buchen`
- [ ] Preise nur Onepager ([`STRATEGY.md`](./STRATEGY.md) Abschnitt 2)
- [ ] EN-Zwilling gleiche `funnelStage`, lokalisierter Slug
- [ ] Preview DE + EN
- [ ] PR-Nod Robert

---

## Geplantes pubDate

Ein zukünftiges `pubDate` darf gemerged werden. Der Post bleibt von der Live-Site weg, bis ein Landing-Page-Build an oder nach diesem Kalendertag (Europe/Zurich) läuft. Der Cron an ungeraden Tagen (`15 5 */2 * *`) baut nur die Marken neu, die einen solchen Post haben.

---

## Out of scope dieses Gates

- Nav oder Angebotsseite ändern
- MVP-Cluster umschreiben
- Product-Blogs
- Mehr als ein neues Topic ohne Nod
