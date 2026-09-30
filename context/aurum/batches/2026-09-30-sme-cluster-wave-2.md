# Aurum batch — 2026-09-30 · SME cluster wave 2

Audience: Geschäftsleitung, Büro-, Ops- und Finanzleitung in Schweizer KMU (5–80 Personen), dazu Branchenreihen Treuhand, Immobilienverwaltung, Handwerk & Bau (Büro), Arzt- und Therapiepraxen.  
Offer URLs: `/de/prozess-check`, `/de/prozess-check/buchen`, `/de/services/ai-in-business`, `/de/services/ai-implementation-consulting`, `/de/portfolio/kitchencrew` (EN ohne `/de`).  
Languages: de (SEO-Ziel, Anrede Sie), en (hreflang-Zwilling, volle Länge).  
Mix: 9 awareness / 18 interest / 5 consideration (28 / 56 / 16). MOFU-lastig wie Welle 1, weil ehrliche BOFU-Queries rar sind.  
Ship: ein PR zusammen mit Welle 1, `draft: false`, zukünftige `pubDate`, alle 48 Topics zwischen 2026-10-05 und 2026-12-31 (Kalender in `company-blog-strategy/PUBLISHING.md`).  
Heroes: noch keine. Prompts in [`2026-09-30-sme-cluster-wave-2-hero-prompts.txt`](./2026-09-30-sme-cluster-wave-2-hero-prompts.txt). Die MDX haben bewusst keine `image`-Zeile, bis `hero.jpg` existiert (sonst bricht der Astro-Build).

| ID | pubDate | Type | funnelStage | CTA | Title DE | EN slug | DE slug | Floor | Words EN / DE | Status |
|----|---------|------|-------------|-----|----------|---------|---------|-------|---------------|--------|
| N01 | 2026-10-05 | What it is / glossary | awareness | Check (soft) | Der Unterschied zwischen Digitalisierung, Automatisierung und KI | `digitalisation-automation-ai-difference` | `unterschied-digitalisierung-automatisierung-ki` | 400 | 797 / 767 | drafted, hero open |
| N02 | 2026-10-09 | What it is / glossary | awareness | Workshop (soft) | Was ist ein KI-Agent? Einfach erklärt für das KMU-Büro | `what-is-an-ai-agent` | `was-ist-ein-ki-agent` | 400 | 717 / 695 | drafted, hero open |
| N03 | 2026-10-13 | Workflow with named features | consideration | Check buchen | Nach dem Prozess-Check: Festpreis, Umsetzung, Abnahme | `after-the-process-check` | `nach-dem-prozess-check` | 1000 | 1462 / 1367 | drafted, hero open |
| N04 | 2026-10-15 | Workflow with named features | consideration | Check buchen | Terminbuchung mit Zahlung automatisieren: unser eigener Ablauf | `booking-with-payment-case` | `terminbuchung-mit-zahlung-automatisieren` | 1000 | 1363 / 1353 | drafted, hero open |
| N05 | 2026-10-17 | Checklist, template, audit | interest | Workshop | KI-Richtlinie für Unternehmen: Vorlage für KMU zum Kopieren | `ai-policy-template-sme` | `ki-richtlinie-vorlage-kmu` | 800 | 1390 / 1292 | drafted, hero open |
| N06 | 2026-10-19 | Workflow with named features | consideration | KI-Integration | Lieferantenbestellungen in der Gastronomie automatisieren | `kitchencrew-supplier-ordering-case` | `kitchencrew-bestellungen-per-chat` | 1000 | 1304 / 1186 | drafted, hero open |
| N07 | 2026-10-23 | Problem or cost | awareness | Check (soft) | KI in der Treuhand: welche Abläufe sich lohnen | `ai-for-swiss-fiduciaries` | `ki-in-der-treuhand` | 700 | 1231 / 1123 | drafted, hero open |
| N08 | 2026-10-25 | How to do the job | interest | Check | Treuhand: Mandantenpostfach sortieren, fehlende Belege nachfordern | `fiduciary-client-inbox-missing-receipts` | `treuhand-mandantenpostfach-fehlende-belege` | 900 | 1618 / 1518 | drafted, hero open |
| N09 | 2026-10-29 | Problem or cost | awareness | Check (soft) | KI in der Immobilienverwaltung: welche Abläufe sich lohnen | `ai-in-property-management` | `ki-in-der-immobilienverwaltung` | 700 | 1217 / 1092 | drafted, hero open |
| N10 | 2026-10-31 | How to do the job | interest | Check | Mieteranfragen und Schadenmeldungen automatisch zuordnen | `tenant-requests-damage-reports` | `mieteranfragen-schadenmeldungen-zuordnen` | 900 | 1363 / 1238 | drafted, hero open |
| N11 | 2026-11-01 | How to do the job | interest | Check | Sammelpostfach info@: E-Mails automatisch zuordnen | `shared-inbox-sort-emails` | `sammelpostfach-e-mails-zuordnen` | 900 | 1560 / 1455 | drafted, hero open |
| N12 | 2026-11-05 | How to do the job | interest | Workshop | KI-Tools im Unternehmen freigeben: Positivliste in fünf Schritten | `approve-ai-tools-allow-list` | `ki-tools-freigeben-positivliste` | 900 | 1489 / 1418 | drafted, hero open |
| N13 | 2026-11-09 | Problem or cost | awareness | Check (soft) | KI im Handwerksbetrieb: die Büroarbeit automatisieren | `ai-for-trades-businesses` | `ki-im-handwerksbetrieb` | 700 | 1111 / 1005 | drafted, hero open |
| N14 | 2026-11-11 | How to do the job | interest | Check | Vom Regierapport zur Rechnung: Rapporte digital abrechnen | `daywork-report-to-invoice` | `regierapport-zur-rechnung` | 900 | 1588 / 1419 | drafted, hero open |
| N15 | 2026-11-15 | How to do the job | interest | Check | Rechnungsfreigabe automatisieren: Visum und Kreditoren-Workflow | `invoice-approval-workflow` | `rechnungsfreigabe-automatisieren` | 900 | 1541 / 1430 | drafted, hero open |
| N16 | 2026-11-17 | Problem or cost | awareness | Workshop (soft) | KI-Strategie für KMU: drei Anwendungsfälle statt Strategiepapier | `ai-strategy-sme-three-use-cases` | `ki-strategie-kmu` | 700 | 1036 / 1021 | drafted, hero open |
| N17 | 2026-11-19 | Problem or cost | awareness | Check (soft) | KI in der Arztpraxis: was das DSG erlaubt und was sich lohnt | `ai-in-medical-practices` | `ki-in-der-arztpraxis` | 700 | 1223 / 1065 | drafted, hero open |
| N18 | 2026-11-21 | How to do the job | interest | Check | Praxisadministration automatisieren: Termine, Berichte, Gutsprachen | `practice-admin-automation` | `praxisadministration-automatisieren` | 900 | 1340 / 1245 | drafted, hero open |
| N19 | 2026-11-25 | How to do the job | interest | Check | Doppelerfassung vermeiden: Daten übertragen ohne Abtippen | `stop-double-data-entry` | `doppelerfassung-vermeiden` | 900 | 1543 / 1409 | drafted, hero open |
| N20 | 2026-11-27 | Checklist, template, audit | interest | Workshop | KI-Schulung für Mitarbeitende: was das Team danach können muss | `ai-training-for-employees` | `ki-schulung-mitarbeitende` | 800 | 1197 / 1139 | drafted, hero open |
| N21 | 2026-12-01 | Category vs category | interest | Check | KI-Agent oder Workflow-Automatisierung: was Ihr Ablauf braucht | `ai-agent-or-workflow-automation` | `ki-agent-oder-workflow` | 1200 | 1787 / 1728 | drafted, hero open |
| N22 | 2026-12-03 | How to do the job | interest | Check | Dokumente automatisch aus Vorlagen erstellen: Offerten, Briefe | `generate-documents-from-templates` | `dokumente-aus-vorlagen-erstellen` | 900 | 1742 / 1646 | drafted, hero open |
| N23 | 2026-12-07 | How to do the job | interest | Check | Microsoft 365 automatisieren mit dem, was Sie schon haben | `automate-microsoft-365` | `microsoft-365-automatisieren` | 900 | 1531 / 1476 | drafted, hero open |
| N24 | 2026-12-09 | How to do the job | interest | Check | Google Workspace automatisieren: Apps Script, AppSheet, Gemini | `automate-google-workspace` | `google-workspace-automatisieren` | 900 | 1593 / 1595 | drafted, hero open |
| N25 | 2026-12-13 | Problem or cost | awareness | Check (soft) | Ab wann lohnt sich Automatisierung für einen kleinen Betrieb? | `when-automation-pays-off-small-business` | `ab-wann-lohnt-sich-automatisierung` | 700 | 1212 / 1198 | drafted, hero open |
| N26 | 2026-12-15 | Checklist, template, audit | interest | Check | Nutzen einer Automatisierung berechnen: Vorlage zum Selbstrechnen | `calculate-automation-benefit` | `automatisierung-nutzen-berechnen` | 800 | 1406 / 1405 | drafted, hero open |
| N27 | 2026-12-17 | How to do the job | interest | Check | Abläufe dokumentieren, bevor Sie automatisieren: in 30 Minuten | `document-processes-before-automating` | `ablaeufe-dokumentieren` | 900 | 1447 / 1382 | drafted, hero open |
| N28 | 2026-12-19 | Checklist, template, audit | interest | Check | Onboarding neuer Mitarbeitender automatisieren: die Checkliste | `automate-employee-onboarding` | `onboarding-automatisieren` | 800 | 1322 / 1271 | drafted, hero open |
| N29 | 2026-12-23 | Is {product} worth it / when not | consideration | KI-Integration | Betrieb und Wartung: wer die Automatisierung danach betreut | `who-runs-the-automation` | `automatisierung-betrieb-wartung` | 900 | 1270 / 1214 | drafted, hero open |
| N30 | 2026-12-25 | Problem or cost | awareness | Check (soft) | Fachkräftemangel im Büro: automatisieren statt neu einstellen? | `skills-shortage-office-automation` | `fachkraeftemangel-buero-automatisieren` | 700 | 1131 / 1117 | drafted, hero open |
| N31 | 2026-12-29 | How to do the job | interest | Check | Mehrsprachige Kundenkommunikation automatisieren (DE/FR/IT) | `multilingual-customer-communication` | `mehrsprachige-kundenkommunikation` | 900 | 1697 / 1592 | drafted, hero open |
| N32 | 2026-12-31 | Is {product} worth it / when not | consideration | Check buchen | Automatisierungspartner auswählen: worauf KMU achten | `choosing-an-automation-partner` | `automatisierungspartner-auswaehlen` | 900 | 1610 / 1573 | drafted, hero open |

## Also in this PR (wave 1 fixes)

- Prozess-Check-Preis in 3 Topics (6 Dateien) und in STRATEGY/HANDOFF/TOPIC-QUEUE von «CHF 49 Launch, dann 99» auf **CHF 99 pauschal** (Site seit 2026-09-28).
- Die 16 bestehenden DE-Posts von ihr/euch auf **Sie** umgestellt, «Call» → «Termin», «Bau» → «Umsetzung», wo es um Software geht.
- **Vorwärts-Links entfernt:** 15 Body-Links in Welle 1 (DE und EN) zeigten auf Posts, die erst später live gehen und bis dahin 404 liefern. Umformuliert oder auf bereits live Seiten umgelenkt.
- `pubDate` aller 48 Topics in Q4 verdichtet, Reihenfolge unverändert.

## Verified vs. not verified (from writer reports)

- Quellen sind im Text verlinkt (EDÖB, fedlex, BAG, BAKOM, kmu.admin, Microsoft Learn, Google Workspace/Apps Script, Stripe, DeepL, Adecco/UZH, AXA/Sotomo, adesso, BDO, Abacus/bexio-Herstellerseiten).
- Bewusst weggelassen, weil nicht prüfbar: Stripe-Gebührensätze, Seat-Preise von Copilot/ChatGPT/Gemini, Admin-Klickpfade, Google-Preise, Workspace-Editionsdetails zu Gemini, BFS-Arbeitskosten pro Stunde (N25 rechnet mit einer ausgewiesenen Annahme von CHF 60/h), bexio-Serienbrief-Funktion.
- N30 (Fachkräftemangel): Der Adecco/UZH-Index 2025 zeigt bei kaufmännischen/administrativen Berufen ein **Überangebot**. Der Post sagt das offen und argumentiert über die Arbeit, nicht über den Arbeitsmarkt. **Vor dem 2026-12-25 prüfen**, ob der Index 2026 (erscheint ca. November) die Zahlen ändert.
- N23 (Microsoft 365): Lists und Bookings sind nicht in allen Plänen gleich enthalten; der Text sagt das und verweist auf die Microsoft-Seiten.
- Keine erfundenen Kunden, Zahlen oder Zitate. Beispiele sind als erfunden markiert. KitchenCrew und die eigene Buchungs- und Case-Study-Strecke sind die einzigen echten Cases.

## Review focus for Robert

1. Die zwei eigenen Cases (N04 Terminbuchung, N24 Google-Workspace-Gate) und KitchenCrew (N06): stimmen die technischen Details?
2. Branchenposts (N07–N10, N13–N14, N17–N18): Ton gegenüber Treuhand, Verwaltung, Handwerk, Praxen.
3. Rechtliche Einordnungen (N05, N12, N17, N22): praktisch, keine Rechtsberatung, EDÖB/fedlex verlinkt.
