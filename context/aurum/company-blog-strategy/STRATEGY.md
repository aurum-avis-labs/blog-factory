# Aurum Avis Labs — Company-Blog-Strategie (Prozess-Check-Cluster)

**Stand:** 2026-09-30 (Preis CHF 99 pauschal, Anrede Sie, KI-Integration als dritter CTA, Welle 2)  
**Scope:** nur Company-Site [aurum-avis-labs.ch](https://aurum-avis-labs.ch) · Brand `aurum` in blog-factory  
**Nicht:** Product-Blogs (Postology, Inklets, Holist-IQ, CitySage, Vemoir, Kitchen/Gold, …)  
**Nicht in diesem Cluster:** die bestehenden Startup-/MVP-Artikel (siehe unten)

Diese Datei gilt für die **nächsten Wochen Company-Content**. [`../brand-context.md`](../brand-context.md) beschreibt die Venture-/MVP-Stimme und bleibt für den alten Cluster gültig. Neue Posts in diesem Cluster folgen **dieser** Datei.

---

## 1. ICP und Jobs-to-be-done

### Wer kauft den Prozess-Check

| Dimension | Definition |
|-----------|------------|
| **Wer** | Geschäftsleitung, Ops, Finanzen, Büroleitung in Schweizer KMU. Oft 5–80 Personen, wenig oder keine eigene IT. Entscheiden selbst oder mit einer Person. |
| **Wo** | Deutschschweiz zuerst (de-CH). EN-Zwilling nur für hreflang, kein zweites SEO-Programm. |
| **Druck** | «Alle reden über KI / wir tippen schon ChatGPT — im Betrieb landet nichts Greifbares.» Verwaltungsrat, Kundschaft oder Mitarbeitende fragen, was die Firma *tut*. |
| **Alltag** | Wiederkehrende Handarbeit: Belege, Nachfassen, Reports aus mehreren Quellen, Daten von System A nach System B, Excel als echtes Betriebssystem. |
| **Was sie nicht suchen** | Ein neues Startup-Produkt. Eine KI-Strategie-Folie. Eine Tool-Schulung ohne Folge. MVP-Validierung. |

**Treuhand** ist ein Use-Case-Spoke (Cold-Mail-Pilot ZH), nicht die ganze Zielgruppe. Belege/Mandantenprozesse dürfen vorkommen; der Leser bleibt «KMU mit Büroarbeit», nicht «wir ersetzen den Treuhänder».

### Anti-ICP (nicht dafür schreiben)

- Gründer, die ein MVP bauen oder Funding suchen → alter Cluster
- Marketing-Teams, die KI-Texte und Bilder wollen (Markt ist voll, passt nicht zum Check)
- Enterprise mit KI-Abteilung und RFP
- Handwerk-Redesign / Website-Outreach
- Product-User von AAL-eigenen Apps

### Jobs-to-be-done (Prozess-Check)

1. **Klarheit vor Spend:** Welcher *eine* Ablauf lohnt sich — bevor Lizenz, Workshop oder Projekt.
2. **Beweis statt Buzzword:** Ein konkreter Case (was, wer, wie oft) plus Grössenordnung der Umsetzung.
3. **Risiko klein halten:** 60 Minuten, bezahlt, Geld-zurück wenn kein greifbarer Case, Check-Preis wird auf ein Package angerechnet.
4. **Schweizer Rahmen:** nDSG, keine Kundendaten in Free-ChatGPT, bestehende Tools (bexio, Abacus, M365) nicht «ersetzen», sondern Lücken benennen.

### Promise (unverändert, aus Offer-Spec)

In 60 Minuten zeigen wir einen konkreten Case, den wir für euch mit KI sinnvoll automatisieren können — und welches Festpreis-Package dazu passt.

Kein Studio-Pitch. Kein Produktverkauf im Call. Kein «kauft dieses Tool».

---

## 2. Angebote und Live-URLs

Zahlen und Bedingungen **nur** aus dem Prozess-Check-Onepager, nicht aus `src/data/services.ts` (die Services-Karte nennt aktuell nur CHF 99).

### Prozess-Check (Primär-CTA)

| | DE (indexiert) | EN (Default-Locale, ohne Prefix) |
|---|----------------|----------------------------------|
| Angebot | https://aurum-avis-labs.ch/de/prozess-check | https://aurum-avis-labs.ch/prozess-check |
| Buchen | https://aurum-avis-labs.ch/de/prozess-check/buchen | https://aurum-avis-labs.ch/prozess-check/buchen |
| Danke | `/de/prozess-check/danke` — `noindex`, nicht verlinken | analog |

`/de/buchen` existiert nicht. Immer `/prozess-check/buchen`.

**Was der Check ist**

- 60 Min online · Slot → Stripe → Termin bestätigt
- Ein wiederkehrender manueller Prozess
- Ergebnis: greifbarer Automatisierungs-Case + empfohlene Package-Grösse (Small–Max)
- Preis: **CHF 99** pauschal (seit 28.09.2026; kein Launch-Preis mehr)
- Check-Preis wird bei Buchung eines Umsetzungs-Packages **vollständig angerechnet**
- Geld-zurück, wenn im stattgefundenen Call **kein** greifbarer Case entsteht

**Packages (nur erwähnen, nicht im TOFU verkaufen)**

| Package | Dauer | Richtpreis |
|---------|--------|------------|
| Small | 2–3 Tage | CHF 3'200–4'800 |
| Medium | 7 Tage | CHF 14'000 |
| Large | 10 Tage | CHF 20'000 |
| Max | ab ~12 Tage | ab CHF 25'000 |

Betrieb danach: Token-Kosten beim Kunden, Hosting-Richtwert CHF 50–150/Monat, kündbar. Genauigkeit: «Richtwerte, final im Check».

### Workshop (Sekundär, nur bei passendem Job)

| Format | URL DE | URL EN |
|--------|--------|--------|
| KI im Unternehmen | https://aurum-avis-labs.ch/de/services/ai-in-business | https://aurum-avis-labs.ch/services/ai-in-business |
| Agentic Coding | https://aurum-avis-labs.ch/de/services/agentic-coding | https://aurum-avis-labs.ch/services/agentic-coding |

**Workshop**, wenn das Job «gemeinsame Sprache, Guardrails, Team nutzt Tools kontrolliert» ist — nicht «diesen einen Ablauf automatisieren».

**Agentic Coding**, nur wenn der Leser ein Engineering-Team ist. In diesem Cluster selten.

### KI-Integration (Tertiär, grössere oder verbundene Umsetzungen)

| Format | URL DE | URL EN |
|--------|--------|--------|
| KI-Integration | https://aurum-avis-labs.ch/de/services/ai-implementation-consulting | https://aurum-avis-labs.ch/services/ai-implementation-consulting |

**KI-Integration**, wenn der Leser schon weiss, was er umsetzen will, oder mehrere Abläufe beziehungsweise KI im eigenen Produkt plant (Cases wie KitchenCrew, Betrieb und Wartung). Immer mit einem Satz, dass der Prozess-Check der kleine Einstieg für eine einzelne Arbeit ist. Portfolio-Link für den KitchenCrew-Case: `/de/portfolio/kitchencrew`, EN `/portfolio/kitchencrew`.

### Scoping / PVP

**Kein CTA in diesem Cluster.** Founder-Intent decken die bestehenden MVP-Posts.

### Abgrenzung (Writer-Cheat-Sheet)

| Leser will … | Angebot |
|--------------|---------|
| Welchen Prozess zuerst, was kostet ungefähr, einen Case in 60 Min | **Prozess-Check** → Angebot, MOFU/BOFU oft direkt **buchen** |
| Team soll dieselben Regeln und Tools verstehen | **KI-im-Unternehmen-Workshop** |
| Devs sollen Agents im Repo nutzen | **Agentic-Coding-Workshop** |
| Idee validieren / MVP schneiden | nichts aus diesem Cluster (alter Cluster / Scoping-Seite höchstens in einem Satz «nicht hierfür») |
| Tool-Liste, ChatGPT-Prompts, Marketing-Texte | nicht schreiben |

---

## 3. Was die Research sagt (Nachfrage, nicht Keyword-Tool)

Schweizer Suchvolumen auf diesen Long-Tails ist klein. Die Queue ist **Intent + SERP-Lücke + ICP**, keine Volumen-Garantie. Keine Title als «Ranking-Versprechen» behandeln.

### Studien (für Argumente, nicht copy-pasten als eigene Messung)

| Quelle | Was zählt für uns |
|--------|-------------------|
| [AXA KMU-Arbeitsmarktstudie, zitiert DeepCloud](https://www.deepcloud.swiss/newsroom/artikel/ki-in-schweizer-kmu-wir-sind-bereit/) | KI-Nutzung KMU 22 % (2024) → 34 % (2025). Häufig: Übersetzung 52 %, Korrespondenz 47 %. Automatisierung eines Arbeitsschritts 34 % (vorher 23 %). Viele Firmen erlauben Tools intern noch nicht. |
| [adesso GenAI Impact Report 2026 CH](https://www.adesso.ch/adesso-ch/whitepaper/genai-impact-report-2026-ch.pdf) | Grösste Hürden: Datenqualität und fehlende Prozesse/Governance (je 32 %), nicht das Modell. 58 % sehen GenAI als Effizienz/Automation. 47 % messen Prozesseffizienz, 45 % die Nutzungsrate — Nutzung ≠ Wirkung. |
| [BDO AI-Toolkit Switzerland Snapshot, 2026](https://www.bdo.ch/de-ch/medienstelle/2026/ki-adoption-die-kluft-zwischen-grossunternehmen-und-kmu-wachst) | Grosse Firmen integrieren KI in die Wertschöpfung, viele KMU bleiben bei Einzel-Apps. Rat: wenige konkrete Use Cases, Sache der GL, kein IT-Nebenthema. |
| [HSLU / localsearch KMU Digital Pulse 2026](https://zenodo.org/records/22098334) | Im Marketing schreiben 92 % der KI-Nutzenden Texte. **Saturiert, schlechter Fit für den Check.** Nicht als Kern-Topic. |
| [kmu.admin.ch / SATW SAIROP](https://www.kmu.admin.ch/de/wie-schweizer-kmu-kuenstliche-intelligenz-erfolgreich-nutzen) | KMU haben selten eine übergeordnete Strategie; brauchen externe Hilfe beim Finden von Partnern. |

### SERP (de-CH / DACH)

Head-Terms (`KI KMU`, `ChatGPT Datenschutz Schweiz`, `KI Buchhaltung`) gehören BDO, Swisscom/HWZ, digitalswitzerland, Treuhand-Häusern, IT-Shops und Tool-Vendors (bexio, Abacus, DeepCloud).

Generische Guides «KI-Automatisierung für KMU» gibt es lokal schon (u. a. itcompany-zug.ch, iapmesuisse.ch), oft mit ROI-Prozenten ohne Methode.

**Whitespace:** die Entscheidung *vor* dem Tool. Welcher wiederkehrende Büroprozess lohnt sich, welcher nicht, was in der Schweiz ändert (nDSG, Free-Accounts, bexio/Abacus decken einen Teil Buchhaltung), und eine **bezahlte 60-Minuten-Antwort** statt noch einer Tool-Liste.

### Konkurrenz-Zahlen nicht übernehmen

Fremde «300 % ROI», «80 % weniger Aufwand», «52 % automatisieren schon ganze Prozesse» nur zitieren mit Quelle — oder weglassen. Keine erfundenen Kunden, keine eigenen Prozent-Claims ohne Messung.

---

## 4. Funnel-Map und CTA-Regeln

```
TOFU (awareness)  → Problem: ChatGPT ja, Ablauf nein; Schatten-KI; Druck ohne Landkarte
MOFU (interest)   → Filter, Belege/Reporting/Nachfassen/Excel, Copilot vs. Build, Workshop vs. Umsetzung
BOFU (consideration) → Was der Prozess-Check ist; was Automatisierung kostet
         ↓
  /de/prozess-check  →  /de/prozess-check/buchen
```

| Blog-Funnel | `funnelStage` in MDX | CTA |
|-------------|----------------------|-----|
| TOFU | `awareness` | Soft: Link auf **Angebot** Prozess-Check, oft über den P0-Pillar. Ausnahme: Team-Regeln → Workshop. |
| MOFU | `interest` | **Prozess-Check-Angebot.** Ausnahme klar benennen (Workshop-Fork oder «kein CTA»). |
| BOFU | `consideration` | **Buchen** (`…/prozess-check/buchen`). Angebot zusätzlich verlinken. |

**Regel für den Writer:** MOFU und BOFU enden mit Prozess-Check (Angebot und/oder Buchen) **oder** einer klaren Ausnahme im Topic-Queue-Eintrag.

TOFU darf den Check nennen, muss ihn nicht hart closen. Ein Satz «wenn ihr *einen* Ablauf klären wollt» reicht; der harte Close sitzt auf MOFU/BOFU.

### Interne Links (Landing)

Immer relative Pfade wie auf der Company-Site:

- DE: `/de/prozess-check`, `/de/prozess-check/buchen`, `/de/services/ai-in-business`
- EN: `/prozess-check`, `/prozess-check/buchen`, `/services/ai-in-business`

Verwandte Posts: nur **dieser Cluster**, 1–3 `relatedPosts`, gleiche Sprache, Funnel-Alignment laut [AGENTS.md](../../../AGENTS.md):

| Aktuelles `funnelStage` | Erlaubte related |
|-------------------------|------------------|
| `awareness` | awareness, interest, consideration |
| `interest` | interest oder consideration (nie awareness) |
| `consideration` | consideration; nur wenn sonst keine consideration-Peers: interest (nie awareness) |

**Kein Cross-Link** in den MVP-/Startup-Cluster (Liste Abschnitt 6).

---

## 5. Writer-Regeln

- **de-CH:** ss statt ß, «KMU», «Ablauf», «Betrieb». **Anrede Sie** (wie die Prozess-Check-Seite; du/ihr von Fremden wirkt in der Schweiz unhöflich). «Umsetzung» statt «Bau», «Termin» statt «Call». EN-Zwilling: klares Business-Englisch (britische Schreibweise), Schweizer «CHF», gleiche `funnelStage`.
- **Body-Links nur auf Posts, die am eigenen `pubDate` schon live sind.** Zukünftige Posts liefern bis dahin 404. `relatedPosts` dürfen später live gehen (die Seite blendet sie aus).
- Ein h1 = Title. Body ab h2. Semantische Hierarchie, keine h1 im Body.
- `description` unter 160 Zeichen.
- Tags: 3, thematisch (z. B. `ki kmu`, `prozessautomatisierung`, `prozess-check`) — keine Product-Brand-Tags.
- `author`: weglassen oder konsistent mit bestehenden Aurum-Posts; nicht erfinden.
- Bilder: [`../context-files/aurum_avis_labs_blogpost_image_instructions.md`](../context-files/aurum_avis_labs_blogpost_image_instructions.md). Pfade `@/assets/blog/{slug}/…`, Dateien unter `brands/aurum/images/{slug}/`.
- Ton: konkret, ohne Buzzword-Opener («Game-Changer», «revolutioniert», «AI-first»). Priestley-nah: Frustration und Klarheit, nicht US-Hype.
- Rechtliches (nDSG, AI Act): praktisch, mit Link auf EDÖB / etablierte Erklärer. **Kein Anwaltston, keine Rechtsberatung.**
- Preise: nur Onepager-Zahlen. Prozess-Check CHF 99 pauschal, kein Launch-Preis mehr.
- Qualität vor Länge: den Query fertig beantworten, nicht mit Tool-Logos auffüllen. Unter der Floor-Länge in `.cursor/skills/seo-blog/query-map.md` ist der Post nicht fertig. Das gilt für EN und DE.

---

## 6. Zwei Cluster auf demselben Blog

| Cluster | Slugs (DE, Auszug) | CTA |
|---------|--------------------|-----|
| **MVP / Founder** (bestehend, nicht umschreiben) | `was-ist-ein-mvp`, `mvp-entwicklung-schweiz`, `mvp-kosten-schweiz`, `startup-idee-validieren`, `ki-mvp-entwicklung`, `venture-studio-vs-agentur`, … | PVP / Kontakt / MVP-Seiten |
| **KMU / Prozess-Check** (neu, diese Strategie) | Queue in [`TOPIC-QUEUE.md`](./TOPIC-QUEUE.md) | Prozess-Check, selten Workshop |

Bestehende DE-MVP-Slugs (nicht als `relatedPosts` in neuen Posts):  
`mvp-kosten-schweiz`, `wann-brauchst-du-einen-tech-partner`, `wie-aurum-avis-mvps-validiert`, `vibe-coding-vs-agentic-coding`, `ki-mvp-entwicklung`, `venture-studio-vs-agentur`, `startup-idee-validieren`, `warum-produktionsqualitative-mvps`, `die-versteckten-kosten-ohne-validierung`, `validiertes-mvp-mehr-funding`, `product-market-fit-erreichen`, `was-ist-ein-mvp`, `ist-deine-vibe-coded-app-produktionsreif`, `startup-software-entwicklung-schweiz`, `mvp-entwickeln-lassen-partnerwahl`, `mvp-entwicklung-schweiz`.

---

## 7. Anti-Patterns

- Thin SEO-Spam, Keyword-Stuffing, «10 Tools für KMU 2026» ohne Entscheidung
- Product-Brand-Posts (Postology, Holist, Kitchen, …)
- Handwerk-Redesign als Kern
- Jeden Post auf PVP/Scoping/MVP drehen
- Workshop *und* Check als denselben CTA verkaufen (Fork erklären oder weglassen)
- ROI-Prozente von Mitbewerbern als eigene Wahrheit
- Erfundene Case Studies oder Firmennamen
- ChatGPT-Prompt-Listen und Marketing-Content-Tipps als Hauptserie
- Buchhaltungs-Software «ersetzen» / Treuhänder angreifen
- Preise oder Launch-Counter erfinden («noch 3 Slots»), die die Site nicht live zeigt

---

## 8. Dateien für den Writer

| Datei | Rolle |
|-------|--------|
| Diese `STRATEGY.md` | ICP, Funnel, CTAs, Research, Anti-Patterns |
| [`TOPIC-QUEUE.md`](./TOPIC-QUEUE.md) | Welle 1: 16 Topics mit Outline, Priority, Links |
| [`../batches/2026-09-30-sme-cluster-wave-2.md`](../batches/2026-09-30-sme-cluster-wave-2.md) | Welle 2: 32 Topics (Branchen, Systeme, Workshop-Funnel, Cases) |
| [`PUBLISHING.md`](./PUBLISHING.md) | Kalender aller 48 Topics, Reihenfolge, keine Autopilot-Masse |
| [`HANDOFF-TO-BLOG-WRITER.md`](./HANDOFF-TO-BLOG-WRITER.md) | Kurzbrief, erste P0s |
| [`../../../AGENTS.md`](../../../AGENTS.md) | Frontmatter, `relatedPosts`, `funnelStage` |
| [`../../../brands.config.ts`](../../../brands.config.ts) | `aurum`: Sprachen `en`, `de` |

Kein ZIP, keine Shared-Paths. Offer-Zahlen sind in Abschnitt 2 vollständig.
