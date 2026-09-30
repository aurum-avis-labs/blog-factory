# Aurum Company-Blog — Publishing-Gate

**Stand:** 2026-09-30  
**Ship-Modell:** Ein PR mit dem ganzen Prozess-Check-Cluster (Welle 1 und Welle 2). Jedes Topic hat ein zukünftiges `pubDate` (ungerader Kalendertag, Europe/Zurich). Merge nach Roberts Nod. Die Live-Site filtert mit `isLivePost`; der Cron (`15 5 */2 * *`) baut Aurum neu, wenn ein Datum fällig ist.

Kein zweites SEO-Programm auf EN. DE + EN desselben Topics: gleiches `pubDate`, gleicher `translationKey` (EN-Slug).

---

## Cadence

| | |
|---|---|
| Rhythmus | Etwa 3–4 Topics / Woche bis 31.12.2026, gestaffelt an ungeraden Tagen (nicht 48 URLs am Merge-Tag) |
| Locales | `brands/aurum/de/{slug}.mdx` + `brands/aurum/en/{en-slug}.mdx` im selben PR |
| Bilder | `brands/aurum/images/{en-slug}/` · Guide: [`../context-files/aurum_avis_labs_blogpost_image_instructions.md`](../context-files/aurum_avis_labs_blogpost_image_instructions.md) |
| Preview | `npm run preview`, Brand Aurum. Preview zeigt auch zukünftige `pubDate`. |
| Merge | ein PR, Nod Robert. Kein `npm version` in blog-factory. |

---

## Kalender (ungerade Tage, alles in Q4 2026)

Stand 2026-09-30: 16 bestehende Topics (T01–T16) plus 32 neue aus Welle 2 (N01–N32, Plan: [`../batches/2026-09-30-sme-cluster-wave-2.md`](../batches/2026-09-30-sme-cluster-wave-2.md)). Reihenfolge wie geplant, Daten auf 5. Oktober bis 31. Dezember verdichtet. An drei Tagen gehen zwei Posts live. Body-Links zeigen nur auf Posts mit gleichem oder früherem `pubDate`.

| pubDate | ID | Funnel | Slug DE | Slug EN / image folder |
|---------|-----|--------|---------|------------------------|
| 2026-10-05 | N01 | awareness | `unterschied-digitalisierung-automatisierung-ki` | `digitalisation-automation-ai-difference` |
| 2026-10-07 | T02 | interest | `welchen-ablauf-zuerst-automatisieren` | `which-process-to-automate-first` |
| 2026-10-09 | N02 | awareness | `was-ist-ein-ki-agent` | `what-is-an-ai-agent` |
| 2026-10-11 | T04 | consideration | `was-der-prozess-check-ist` | `what-the-process-check-is` |
| 2026-10-13 | N03 | consideration | `nach-dem-prozess-check` | `after-the-process-check` |
| 2026-10-15 | N04 | consideration | `terminbuchung-mit-zahlung-automatisieren` | `booking-with-payment-case` |
| 2026-10-17 | N05 | interest | `ki-richtlinie-vorlage-kmu` | `ai-policy-template-sme` |
| 2026-10-19 | T01 | awareness | `ki-im-betrieb-nichts-greifbares` | `ai-in-operations-nothing-tangible` |
| 2026-10-19 | N06 | consideration | `kitchencrew-bestellungen-per-chat` | `kitchencrew-supplier-ordering-case` |
| 2026-10-21 | T03 | interest | `drei-ablaeufe-die-sich-lohnen` | `three-workflows-worth-automating` |
| 2026-10-23 | N07 | awareness | `ki-in-der-treuhand` | `ai-for-swiss-fiduciaries` |
| 2026-10-25 | N08 | interest | `treuhand-mandantenpostfach-fehlende-belege` | `fiduciary-client-inbox-missing-receipts` |
| 2026-10-27 | T12 | interest | `workshop-oder-umsetzung` | `workshop-or-implementation` |
| 2026-10-29 | N09 | awareness | `ki-in-der-immobilienverwaltung` | `ai-in-property-management` |
| 2026-10-31 | N10 | interest | `mieteranfragen-schadenmeldungen-zuordnen` | `tenant-requests-damage-reports` |
| 2026-11-01 | N11 | interest | `sammelpostfach-e-mails-zuordnen` | `shared-inbox-sort-emails` |
| 2026-11-03 | T05 | awareness | `chatgpt-kundendaten-dsg-schweiz` | `chatgpt-customer-data-swiss-dsg` |
| 2026-11-05 | N12 | interest | `ki-tools-freigeben-positivliste` | `approve-ai-tools-allow-list` |
| 2026-11-07 | T06 | awareness | `schatten-ki-im-buero` | `shadow-ai-in-the-office` |
| 2026-11-09 | N13 | awareness | `ki-im-handwerksbetrieb` | `ai-for-trades-businesses` |
| 2026-11-11 | N14 | interest | `regierapport-zur-rechnung` | `daywork-report-to-invoice` |
| 2026-11-13 | T07 | interest | `belege-erfassen-was-software-nicht-uebernimmt` | `invoice-capture-what-software-misses` |
| 2026-11-15 | N15 | interest | `rechnungsfreigabe-automatisieren` | `invoice-approval-workflow` |
| 2026-11-17 | N16 | awareness | `ki-strategie-kmu` | `ai-strategy-sme-three-use-cases` |
| 2026-11-17 | T08 | interest | `reporting-aus-fuenf-quellen` | `reporting-from-five-sources` |
| 2026-11-19 | N17 | awareness | `ki-in-der-arztpraxis` | `ai-in-medical-practices` |
| 2026-11-21 | N18 | interest | `praxisadministration-automatisieren` | `practice-admin-automation` |
| 2026-11-23 | T09 | interest | `nachfassen-angebote-follow-ups` | `quote-follow-ups` |
| 2026-11-25 | N19 | interest | `doppelerfassung-vermeiden` | `stop-double-data-entry` |
| 2026-11-27 | N20 | interest | `ki-schulung-mitarbeitende` | `ai-training-for-employees` |
| 2026-11-29 | T10 | interest | `excel-als-schatten-system` | `excel-as-shadow-system` |
| 2026-12-01 | N21 | interest | `ki-agent-oder-workflow` | `ai-agent-or-workflow-automation` |
| 2026-12-03 | N22 | interest | `dokumente-aus-vorlagen-erstellen` | `generate-documents-from-templates` |
| 2026-12-05 | T11 | interest | `copilot-oder-einen-ablauf-bauen` | `copilot-or-build-a-workflow` |
| 2026-12-07 | N23 | interest | `microsoft-365-automatisieren` | `automate-microsoft-365` |
| 2026-12-09 | N24 | interest | `google-workspace-automatisieren` | `automate-google-workspace` |
| 2026-12-11 | T13 | consideration | `was-automatisierung-kostet-schweiz` | `what-automation-costs-switzerland` |
| 2026-12-13 | N25 | awareness | `ab-wann-lohnt-sich-automatisierung` | `when-automation-pays-off-small-business` |
| 2026-12-15 | N26 | interest | `automatisierung-nutzen-berechnen` | `calculate-automation-benefit` |
| 2026-12-17 | T14 | interest | `wann-ki-den-ablauf-schlechter-macht` | `when-ai-makes-the-process-worse` |
| 2026-12-17 | N27 | interest | `ablaeufe-dokumentieren` | `document-processes-before-automating` |
| 2026-12-19 | N28 | interest | `onboarding-automatisieren` | `automate-employee-onboarding` |
| 2026-12-21 | T15 | interest | `make-n8n-power-automate` | `make-n8n-power-automate` |
| 2026-12-23 | N29 | consideration | `automatisierung-betrieb-wartung` | `who-runs-the-automation` |
| 2026-12-25 | N30 | awareness | `fachkraeftemangel-buero-automatisieren` | `skills-shortage-office-automation` |
| 2026-12-27 | T16 | awareness | `eu-ai-act-schweizer-kmu` | `eu-ai-act-swiss-smes` |
| 2026-12-29 | N31 | interest | `mehrsprachige-kundenkommunikation` | `multilingual-customer-communication` |
| 2026-12-31 | N32 | consideration | `automatisierungspartner-auswaehlen` | `choosing-an-automation-partner` |

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
