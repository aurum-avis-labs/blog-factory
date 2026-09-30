# Aurum — Topic-Queue (KMU / Prozess-Check)

**Stand:** 2026-09-30 · **16 Topics (Welle 1)**, Welle 2 und 3 im selben Wochenkalender · Locales: **de + en**.  
SEO-Arbeit und Working Titles sind **de-CH**. EN ist hreflang-Zwilling, kein zweites Keyword-Programm.

**Lesen zuerst:** [`STRATEGY.md`](./STRATEGY.md) (URLs, Preise, CTA-Regeln, Cluster-Split). Ship-Regeln: [`PUBLISHING.md`](./PUBLISHING.md).

**Legende**

| Feld | Werte |
|------|--------|
| Funnel | TOFU / MOFU / BOFU |
| `funnelStage` | `awareness` / `interest` / `consideration` (identisch in DE und EN) |
| Priority | P0 erste vier Wochen · P1 danach · P2 erst wenn P0 intern verlinkt |
| CTA | Prozess-Check Angebot · Buchen · Workshop · Fork · none |

`relatedPosts`: nur Cluster-Slugs **derselben Sprache**. Im Cluster-PR die Matrix unten setzen; Live zeigt nur fällige `pubDate`. Alignment: [`AGENTS.md`](../../../AGENTS.md).

## pubDate

Ein Post pro Wochentag, 1. Oktober 2026 bis 22. Februar 2027, Feiertage inklusive. Massgebend ist das `pubDate` im jeweiligen Post unter `brands/aurum/`. Die Topics T01–T16 unten bleiben inhaltlich gültig. Welle 2 und 3 liegen als Posts im selben Ordner.

---

## Übersicht

| ID | Priority | Funnel | `funnelStage` | Slug DE | CTA |
|----|----------|--------|---------------|---------|-----|
| T01 | P0 | TOFU | awareness | `ki-im-betrieb-nichts-greifbares` | Angebot (via Pillar) |
| T02 | P0 | MOFU | interest | `welchen-ablauf-zuerst-automatisieren` | Angebot |
| T03 | P0 | MOFU | interest | `drei-ablaeufe-die-sich-lohnen` | Angebot |
| T04 | P0 | BOFU | consideration | `was-der-prozess-check-ist` | Buchen |
| T05 | P1 | TOFU | awareness | `chatgpt-kundendaten-dsg-schweiz` | Workshop + eine Zeile Check |
| T06 | P1 | TOFU | awareness | `schatten-ki-im-buero` | Workshop + eine Zeile Check |
| T07 | P1 | MOFU | interest | `belege-erfassen-was-software-nicht-uebernimmt` | Angebot |
| T08 | P1 | MOFU | interest | `reporting-aus-fuenf-quellen` | Angebot |
| T09 | P1 | MOFU | interest | `nachfassen-angebote-follow-ups` | Angebot |
| T10 | P1 | MOFU | interest | `excel-als-schatten-system` | Angebot |
| T11 | P1 | MOFU | interest | `copilot-oder-einen-ablauf-bauen` | Angebot |
| T12 | P1 | MOFU | interest | `workshop-oder-umsetzung` | Fork |
| T13 | P1 | BOFU | consideration | `was-automatisierung-kostet-schweiz` | Buchen |
| T14 | P2 | MOFU | interest | `wann-ki-den-ablauf-schlechter-macht` | Angebot |
| T15 | P2 | MOFU | interest | `make-n8n-power-automate` | Angebot |
| T16 | P2 | TOFU | awareness | `eu-ai-act-schweizer-kmu` | none (oder Workshop, siehe Topic) |

---

## T01 — P0 · TOFU

**Working title (DE):** Alle nutzen KI. Im Betrieb landet trotzdem nichts Greifbares.  
**EN title:** Everyone uses AI. Operations still run on copy-paste.

| | |
|---|---|
| Funnel / `funnelStage` | TOFU / `awareness` |
| Primary KW | KI im Unternehmen einsetzen |
| Secondary | ChatGPT im Alltag, KI KMU Schweiz |
| Intent | Informational: Druck und Lücke zwischen Tool-Nutzung und stabilem Ablauf |
| Slug DE | `ki-im-betrieb-nichts-greifbares` |
| Slug EN | `ai-in-operations-nothing-tangible` |
| CTA | Prozess-Check **Angebot**. Weich: Problem benennen, auf T02 (Pillar) und Angebot zeigen. Kein hartes Buchen-Close. |
| Priority | P0 |

**Interne Links**

- `/de/prozess-check` (EN: `/prozess-check`)
- Verwandte Posts: `welchen-ablauf-zuerst-automatisieren`, `was-der-prozess-check-ist`, `schatten-ki-im-buero`

**Outline**

- Der Widerspruch: ChatGPT/Copilot im Tab, derselbe Report oder dasselbe Nachfassen jede Woche von Hand.
- Was «etwas mit KI machen» in KMU meist heisst (Texte, Übersetzung) — und warum das den Betrieb nicht entlastet. Digital Pulse: Marketing-Schreiben ist saturiert; nicht nachmachen.
- Drei Signale, dass Nutzung ohne Hebel bleibt: keine Ownerin, kein wiederkehrender Input, kein messbarer Output.
- Was sich *nicht* als erster Schritt eignet (Strategie-Folie, zehn Pilots, Tool-Abo für alle).
- Nächster Schritt: einen Ablauf filtern (Link T02), optional 60-Minuten-Check.

**Nicht:** MVP, Venture Studio, Prompt-Bibliothek, ROI-Prozente ohne Quelle.

---

## T02 — P0 · MOFU (Pillar)

**Working title (DE):** Welchen Ablauf solltet ihr zuerst automatisieren?  
**EN title:** Which process should you automate first?

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Prozesse automatisieren KMU |
| Secondary | Automatisierungspotenzial, welcher Prozess zuerst |
| Intent | Commercial investigation: Filter, bevor Tools |
| Slug DE | `welchen-ablauf-zuerst-automatisieren` |
| Slug EN | `which-process-to-automate-first` |
| CTA | Prozess-Check **Angebot** |
| Priority | P0 · **Woche 1** |

**Interne Links**

- `/de/prozess-check`
- Verwandte Posts: `drei-ablaeufe-die-sich-lohnen`, `was-der-prozess-check-ist`, `wann-ki-den-ablauf-schlechter-macht` (sobald live)

**Outline**

- Filter in vier Fragen: wiederholt er sich (Frequenz)? Tut er weh (Zeit, Fehler, Flaschenhals-Person)? Ist er begrenzt (ein klarer Start und ein klares Ende)? Liegen die Daten schon vor (Mail, PDF, Tabelle, bestehendes Tool)?
- Explizit: was *nicht* zuerst — einmalige Projekte, hochgradig individuelle Beratung, chaotischer Prozess ohne Owner.
- Mini-Beispiel ohne Firmennamen: «jeden Montag fünf Exports nach Excel» vs. «die schwierige Kundin beruhigen».
- Tool kommt nach dem Ablauf. Copilot-Lizenz kann reichen; das entscheidet der Filter, nicht der Vendor.
- CTA: denselben Filter in 60 Minuten an *eurem* Ablauf — Prozess-Check (Case + Package-Grösse, kein Tool-Pitch).

**Nicht:** Make/n8n-Feature-Liste (das ist T15). Keine 300%-ROI-Claims.

---

## T03 — P0 · MOFU

**Working title (DE):** Drei Abläufe, die sich in einem KMU-Büro oft lohnen  
**EN title:** Three office workflows that are usually worth automating

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Geschäftsprozesse automatisieren |
| Secondary | Belege erfassen, Follow-up Angebote, Reporting automatisieren |
| Intent | Informational + investigation: konkrete Kandidaten |
| Slug DE | `drei-ablaeufe-die-sich-lohnen` |
| Slug EN | `three-workflows-worth-automating` |
| CTA | Prozess-Check **Angebot** |
| Priority | P0 · **Woche 4** |

**Interne Links**

- `/de/prozess-check`
- Tiefere Spokes: `belege-erfassen-was-software-nicht-uebernimmt`, `reporting-aus-fuenf-quellen`, `nachfassen-angebote-follow-ups`
- relatedPosts: diese drei sobald live, sonst T02 + T04

**Outline**

- Kurz an T02-Filter erinnern (nicht den ganzen Pillar wiederholen).
- Ablauf 1: Eingangsbelege / Daten in die Buchhaltung — Lücke *neben* bexio/Abacus, nicht «ersetzt euren Treuhänder».
- Ablauf 2: Offene Offerten und Nachfassen, das in der Inbox stirbt.
- Ablauf 3: Wochenreport aus CRM, Tabelle, Mail, PDF.
- Je ein Satz: wann der Ablauf *kein* Kandidat ist (zu viele Ausnahmen, keine Quelle).
- CTA: einen der drei mitbringen in den Prozess-Check.

---

## T04 — P0 · BOFU

**Working title (DE):** Was der Prozess-Check ist — und was nicht  
**EN title:** What the Process Check is — and what it is not

| | |
|---|---|
| Funnel / `funnelStage` | BOFU / `consideration` |
| Primary KW | Prozess-Check KI |
| Secondary | KI Beratung KMU Schweiz, Automatisierung Erstgespräch |
| Intent | Transactional / offer: niedrige Suche, hohe Conversion |
| Slug DE | `was-der-prozess-check-ist` |
| Slug EN | `what-the-process-check-is` |
| CTA | **Buchen** `/de/prozess-check/buchen` + Angebot |
| Priority | P0 · **Woche 2** |

**Interne Links**

- `/de/prozess-check`, `/de/prozess-check/buchen`
- relatedPosts: `was-automatisierung-kostet-schweiz` (sobald live); bis dahin `welchen-ablauf-zuerst-automatisieren` nur wenn noch keine zweite consideration existiert — Regel: consideration bevorzugt consideration. Solange T13 fehlt, T02 (interest) ist laut AGENTS.md erlaubt.

**Outline**

- 60 Minuten, ein Prozess, Ergebnis: Case (was, wer, wie oft) + Package-Einschätzung.
- Ablauf: Slot → zahlen → Confirm (Teams). Termin erst nach Zahlung.
- Preis: CHF 99 pauschal; Anrechnung auf Package; Geld-zurück nur ohne greifbaren Case, Call muss stattgefunden haben.
- Was es **nicht** ist: Workshop, Tool-Schulung, Studio-Pitch, PVP/MVP, Verpflichtung zum Build.
- Für wen: KMU mit wiederkehrender Handarbeit. Nicht für «wir brauchen eine Produktidee».
- CTA: Slot wählen.

**Nicht:** Small–Max-Tabelle als Hauptinhalt (Angebotsseite verlinken). Keine erfundenen Slot-Zähler.

---

## T05 — P1 · TOFU

**Working title (DE):** ChatGPT und Kundendaten: was das Schweizer DSG von KMU verlangt  
**EN title:** ChatGPT and customer data: what Swiss data protection means for SMEs

| | |
|---|---|
| Funnel / `funnelStage` | TOFU / `awareness` |
| Primary KW | ChatGPT Datenschutz Schweiz |
| Secondary | nDSG KI, Kundendaten ChatGPT, AVV KI |
| Intent | Informational (Compliance-Angst) |
| Slug DE | `chatgpt-kundendaten-dsg-schweiz` |
| Slug EN | `chatgpt-customer-data-swiss-dsg` |
| CTA | **Workshop** `/de/services/ai-in-business`. Eine Zeile: ein einzelner Ablauf → Prozess-Check. |
| Priority | P1 |

**Interne Links**

- `/de/services/ai-in-business`
- `/de/prozess-check` (ein Satz)
- relatedPosts: `schatten-ki-im-buero`, `workshop-oder-umsetzung`

**Outline**

- Frage, die GL stellt: dürfen Mitarbeitende Mandanten- oder Kundendaten in ChatGPT tippen?
- Praktisch: Free/Plus vs. Business mit AVV; Training aus; Verantwortliche bleiben die Firma. Link EDÖB / etablierte Erklärer, keine Rechtsberatung.
- Ampel: öffentlich / intern / Personendaten.
- Richtlinie schlägt Verbot: sonst entsteht Schatten-KI (T06).
- CTA: Team-Regeln und erlaubte Tools → Workshop. Einen konkreten Workflow bauen → Check.

**Nicht:** Anwaltliche Garantie, EU-AI-Act-Tiefe (T16), Tool-Affiliate.

---

## T06 — P1 · TOFU

**Working title (DE):** Schatten-KI im Büro: wenn das Team schon ChatGPT nutzt — ohne Regeln  
**EN title:** Shadow AI at work: your team already uses ChatGPT without rules

| | |
|---|---|
| Funnel / `funnelStage` | TOFU / `awareness` |
| Primary KW | Schatten-IT KI |
| Secondary | ChatGPT privat Unternehmen, KI Richtlinie KMU |
| Intent | Informational: Risiko, das schon da ist |
| Slug DE | `schatten-ki-im-buero` |
| Slug EN | `shadow-ai-in-the-office` |
| CTA | wie T05: **Workshop** primär, Check in einem Satz |
| Priority | P1 |

**Interne Links**

- `/de/services/ai-in-business`, `/de/prozess-check`
- relatedPosts: `chatgpt-kundendaten-dsg-schweiz`, `workshop-oder-umsetzung`

**Outline**

- Symptom: private Accounts, Kundentexte im Prompt, niemand hat eine Positivliste.
- AXA/DeepCloud-Signal: Nutzung steigt, Freigabe intern oft nicht. Nicht als eigene Umfrage ausgeben.
- Was passiert, wenn ihr nur verbietet: der Chat wandert aufs Handy.
- Minimum: erlaubte Tools, Datenklassen, menschliche Prüfung. Kein 40-Seiten-Policy-Theater.
- CTA-Fork: Regeln fürs Team = Workshop; ein wiederkehrender Ablauf raus aus dem Chat = Check.

---

## T07 — P1 · MOFU

**Working title (DE):** Belege erfassen: was Buchhaltungssoftware schon kann — und wo die Lücke bleibt  
**EN title:** Invoice capture: what accounting software already does — and the gap that remains

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Belege automatisch erfassen |
| Secondary | KI Buchhaltung Schweiz, Eingangsrechnungen automatisieren |
| Intent | Investigation: Prozess neben bexio/Abacus/DeepCloud |
| Slug DE | `belege-erfassen-was-software-nicht-uebernimmt` |
| Slug EN | `invoice-capture-what-software-misses` |
| CTA | Prozess-Check **Angebot** |
| Priority | P1 · Treuhand-Flavour (Spoke, nicht ganze ICP) |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `drei-ablaeufe-die-sich-lohnen`, `excel-als-schatten-system`, `was-der-prozess-check-ist`

**Outline**

- Was Standard-Software oft schon tut: OCR, Kontierungsvorschlag, Bankabgleich — Treuhänder bleibt für Abschluss und Sonderfälle.
- Die Lücke: Mail-Anhänge, PDFs aus fünf Portalen, Freigabe, Abgleich mit Bestellung, die nicht im gleichen Tool liegt.
- Human-in-the-loop: Vorschlag vs. Buchung. Keine «KI ersetzt die Treuhand».
- Filter aus T02 auf diesen Ablauf anwenden.
- CTA: diesen Fluss (wer schickt was wohin, wie oft) in den Check mitbringen.

---

## T08 — P1 · MOFU

**Working title (DE):** Der Montagsreport aus fünf Quellen  
**EN title:** The Monday report from five different sources

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Reporting automatisieren |
| Secondary | Excel Report zusammenführen, Management Report KMU |
| Intent | Investigation: klassischer manueller Kandidat |
| Slug DE | `reporting-aus-fuenf-quellen` |
| Slug EN | `reporting-from-five-sources` |
| CTA | Prozess-Check **Angebot** |
| Priority | P1 |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `drei-ablaeufe-die-sich-lohnen`, `excel-als-schatten-system`, `welchen-ablauf-zuerst-automatisieren`

**Outline**

- Bild: CRM-Export, zwei Spreadsheets, ein PDF, eine Mail — jeden Montag dieselbe Klebe.
- Warum Copilot im Dokument den Klebeprozess nicht ersetzt (Quellen, Rechte, stabile Zahlen).
- Was «gut genug» heisst: ein definierter Output, ein Rhythmus, ein Mensch der prüft.
- Wann lassen: wenn jede Woche andere Fragen und andere Dateien.
- CTA: den Report (Quellen + Empfänger + Frequenz) in den Check.

---

## T09 — P1 · MOFU

**Working title (DE):** Offerten nachfassen, ohne dass es in der Inbox stirbt  
**EN title:** Follow up on quotes without losing them in the inbox

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Angebote nachfassen |
| Secondary | Follow-up Automation, Offerten CRM |
| Intent | Investigation |
| Slug DE | `nachfassen-angebote-follow-ups` |
| Slug EN | `quote-follow-ups` |
| CTA | Prozess-Check **Angebot** |
| Priority | P1 |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `drei-ablaeufe-die-sich-lohnen`, `copilot-oder-einen-ablauf-bauen`

**Outline**

- Ablauf: Angebot raus, Erinnerung hängt an einer Person, CRM ist unvollständig.
- Was Automatisierung darf: erinnern, entwurf, Status — nicht den Abschluss erfinden.
- Abgrenzung zu reinem Copilot-Mail-Draft (hilft beim Text, nicht beim Rhythmus).
- nDSG-Hinweis in einem Satz: keine Kundendossiers in Free-Chat (Link T05), nicht der Hauptteil.
- CTA: diesen Follow-up-Prozess in den Check.

---

## T10 — P1 · MOFU

**Working title (DE):** Excel ist euer Betriebssystem — wann das ein Automatisierungsfall ist  
**EN title:** Excel is your operating system — when that is an automation case

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Excel automatisieren Unternehmen |
| Secondary | Schatten-IT Excel, Datenübertragung Systeme |
| Intent | Investigation |
| Slug DE | `excel-als-schatten-system` |
| Slug EN | `excel-as-shadow-system` |
| CTA | Prozess-Check **Angebot** |
| Priority | P1 |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `reporting-aus-fuenf-quellen`, `belege-erfassen-was-software-nicht-uebernimmt`, `welchen-ablauf-zuerst-automatisieren`

**Outline**

- Excel ist oft die ehrliche Wahrheit zwischen zwei Systemen ohne Schnittstelle.
- Kandidat: dieselbe Tabelle, dieselben Spalten, derselbe Import, jede Woche.
- Nicht-Kandidat: das eine Modell, das nur eine Person versteht und jede Woche neu erfindet.
- Ziel ist nicht «Excel verbieten», sondern den Kleber zwischen Systemen zu definieren.
- CTA: die Tabelle und die zwei Systeme in den Check.

---

## T11 — P1 · MOFU

**Working title (DE):** Copilot-Lizenz — oder einen Ablauf bauen?  
**EN title:** A Copilot licence — or a built workflow?

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | Microsoft Copilot Unternehmen |
| Secondary | ChatGPT Team vs Automatisierung, KI Lizenz oder Projekt |
| Intent | Comparison |
| Slug DE | `copilot-oder-einen-ablauf-bauen` |
| Slug EN | `copilot-or-build-a-workflow` |
| CTA | Prozess-Check **Angebot** |
| Priority | P1 |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `welchen-ablauf-zuerst-automatisieren`, `workshop-oder-umsetzung`, `was-automatisierung-kostet-schweiz`

**Outline**

- Copilot/ChatGPT Team: gut für Entwurf, Suche, einzelne Aufgaben im bestehenden M365.
- Gebauter Ablauf: wenn Input und Output jede Woche gleich sind und mehrere Systeme kleben.
- Ehrlich: manchmal reicht die Lizenz. Dann keinen Check pushen — Satz «dann braucht ihr uns nicht für den Bau».
- Kosten grob: Lizenz monatlich vs. Festpreis-Package (Zahlen nur Onepager, als Grössenordnung).
- CTA: unsicher, welcher Fall ihr seid → Check (darf «Lizenz reicht» sagen).

---

## T12 — P1 · MOFU (Fork)

**Working title (DE):** Workshop oder Umsetzung — was ihr wirklich braucht  
**EN title:** Workshop or implementation — which one you actually need

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | KI Workshop Unternehmen |
| Secondary | KI Schulung vs Umsetzung, KI Beratung KMU |
| Intent | Comparison / fork |
| Slug DE | `workshop-oder-umsetzung` |
| Slug EN | `workshop-or-implementation` |
| CTA | **Fork:** Workshop *oder* Prozess-Check, nicht beides als denselben Button |
| Priority | P1 |

**Interne Links**

- `/de/services/ai-in-business`
- `/de/prozess-check`
- Agentic Coding nur in einem Satz für Dev-Teams: `/de/services/agentic-coding`
- relatedPosts: `was-der-prozess-check-ist`, `schatten-ki-im-buero`, `copilot-oder-einen-ablauf-bauen`

**Outline**

- Workshop: gemeinsame Sprache, Guardrails, 1–3 Experimente, Team arbeitet danach selbst mit Tools.
- Prozess-Check: ein Ablauf, ein Case, optional Festpreis-Bau. Kein Schulungstag.
- Entscheidungshilfe: «alle sollen dürfen» vs. «dieser Kleber soll laufen».
- Scoping/PVP in einem Satz ausschliessen (Produktidee validieren = anderes Angebot, nicht dieser Cluster).
- Zwei CTAs klar getrennt, Leser wählt.

---

## T13 — P1 · BOFU

**Working title (DE):** Was Automatisierung in der Schweiz ungefähr kostet  
**EN title:** What automation roughly costs in Switzerland

| | |
|---|---|
| Funnel / `funnelStage` | BOFU / `consideration` |
| Primary KW | Prozessautomatisierung Kosten |
| Secondary | KI Projekt Kosten KMU, Festpreis Automatisierung |
| Intent | Commercial: Budget-Klarheit |
| Slug DE | `was-automatisierung-kostet-schweiz` |
| Slug EN | `what-automation-costs-switzerland` |
| CTA | **Buchen** |
| Priority | P1 |

**Interne Links**

- `/de/prozess-check`, `/de/prozess-check/buchen`
- relatedPosts: `was-der-prozess-check-ist` (consideration)

**Outline**

- Check: CHF 99 pauschal, Anrechnung, Geld-zurück-Bedingung.
- Packages Small–Max als **Richtwerte** (Onepager), intern an CHF 200/h angelehnt — nicht als Stundennachlauf verkaufen.
- Laufende Kosten: Token beim Kunden, Hosting CHF 50–150/Monat Richtwert, kündbar.
- Warum Festpreis erst nach definiertem Case Sinn ergibt (Variante C der LP: Klarheit vor Spend).
- CTA: Grössenordnung am eigenen Ablauf — buchen.

**Nicht:** Preise erfinden, die nicht im Onepager stehen. Keine Competitor-ROI-Tabelle.

---

## T14 — P2 · MOFU

**Working title (DE):** Wann KI den Ablauf schlechter macht  
**EN title:** When AI makes the process worse

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | KI Prozesse Risiken |
| Secondary | Automatisierung Fehler, Halluzination Betrieb |
| Intent | Trust / Gegenargument |
| Slug DE | `wann-ki-den-ablauf-schlechter-macht` |
| Slug EN | `when-ai-makes-the-process-worse` |
| CTA | Prozess-Check **Angebot** (Check darf Nein sagen) |
| Priority | P2 · nach internem Linking der P0s |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `welchen-ablauf-zuerst-automatisieren`, `was-der-prozess-check-ist`

**Outline**

- Schlechte Daten, zu viele Ausnahmen, kein Owner, Modell ohne Prüfung ins Kundenmail.
- adesso-Punkt: Hürde ist oft Prozess/Governance, nicht das Modell — als Einordnung, nicht als eigene Studie.
- Human-in-the-loop als Default bei Personendaten und Zahlen, die ins Reporting gehen.
- CTA: lieber im Check hören «diesen nicht», als sechs Wochen falches Tool.

**Erst schreiben**, wenn T02 und T04 live sind (sonst fehlt die Landung).

---

## T15 — P2 · MOFU

**Working title (DE):** Make, n8n, Power Automate — das Tool kommt nach dem Ablauf  
**EN title:** Make, n8n, Power Automate — pick the tool after the process

| | |
|---|---|
| Funnel / `funnelStage` | MOFU / `interest` |
| Primary KW | n8n vs Make vs Power Automate |
| Secondary | Workflow Automatisierung Schweiz, n8n selbst hosten |
| Intent | Comparison, Swiss hosting/nDSG als Winkel |
| Slug DE | `make-n8n-power-automate` |
| Slug EN | `make-n8n-power-automate` |
| CTA | Prozess-Check **Angebot** («Tool nach dem Prozess») |
| Priority | P2 |

**Interne Links**

- `/de/prozess-check`
- relatedPosts: `welchen-ablauf-zuerst-automatisieren`, `copilot-oder-einen-ablauf-bauen`

**Outline**

- Drei Sätze pro Tool: Make (schnell, Cloud), n8n (selbst hosten, Kontrolle), Power Automate (wenn schon M365).
- Schweiz: Datenort, AVV, keine Affiliate-Ranking-Liste.
- Kein «wir zertifizieren Vendor X». Entscheidung hängt am Ablauf und an der bestehenden Landschaft.
- CTA: erst den Ablauf klären (Check), dann das Werkzeug.

**Nicht:** Tutorial mit Screenshots für jeden Connector. Nicht vor T02 live.

---

## T16 — P2 · TOFU

**Working title (DE):** EU AI Act und Schweizer KMU — was praktisch zählt  
**EN title:** The EU AI Act and Swiss SMEs — what actually matters in practice

| | |
|---|---|
| Funnel / `funnelStage` | TOFU / `awareness` |
| Primary KW | EU AI Act Schweiz KMU |
| Secondary | KI Regulierung Schweiz |
| Intent | Informational, kurz |
| Slug DE | `eu-ai-act-schweizer-kmu` |
| Slug EN | `eu-ai-act-swiss-smes` |
| CTA | **none**, ausser der Text bleibt bei Team-Regeln — dann Workshop wie T05 |
| Priority | P2 · **skippen**, sobald es Rechtskommentar wird |

**Interne Links**

- Optional `/de/services/ai-in-business` nur bei Policy-Winkel
- relatedPosts: `chatgpt-kundendaten-dsg-schweiz` (awareness)

**Outline**

- Für rein in der Schweiz tätige KMU: AI Act nicht der erste Hebel; nDSG und bestehende Cloud-Verträge sind der Alltag (T05).
- Wann der Act dennoch relevant wird (EU-Kunden, Hochrisiko-Systeme) — ein Absatz, Link auf Primärquelle, keine Auslegung als Kanzlei.
- Praktischer Takeaway: Positivliste, keine Kundendaten in Free-Tools, Owner.
- Wenn der Entwurf länger als ~800 Wörter Rechtslage wird: **nicht publizieren**, Topic streichen.

---

## relatedPosts — Schnellmatrix (sobald live)

Vorschlag, Funnel-konform. Writer passt an, wenn Reihenfolge anders ist.

| Von | Nach (1–3) |
|-----|------------|
| T01 awareness | T02, T04, T06 |
| T02 interest | T03, T04, T14 |
| T03 interest | T07, T08, T09 |
| T04 consideration | T13; sonst T02 |
| T05 awareness | T06, T12 |
| T06 awareness | T05, T12 |
| T07–T11 interest | T02 oder T03 + T04 |
| T12 interest | T04, T11 |
| T13 consideration | T04 |
| T14–T15 interest | T02, T04 |
| T16 awareness | T05 |

Nie MVP-Slugs aus Abschnitt 6 in [`STRATEGY.md`](./STRATEGY.md).

---

## Tags (Vorschlag, 2–3 pro Post)

`ki kmu` · `prozessautomatisierung` · `prozess-check` · `datenschutz` · `buchhaltung` · `reporting` · `microsoft copilot` — je nach Topic, nicht alle auf jeden Post.
