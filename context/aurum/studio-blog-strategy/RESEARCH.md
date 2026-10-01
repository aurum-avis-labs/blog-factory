# Aurum Studio-Blog: Meta-Recherche Produktvalidierung & MVP

**Stand:** 2026-09-30 · **Für:** Koordinator-Agent und Blog-Writer · **Brand:** `aurum`, Site `studio` (Blog unter `/blog`, DE `/de/blog`), Frontmatter `site: studio`

Diese Datei ist die Recherchebasis für rund **100 Blogposts** rund um das **Produktvalidierungs-Paket (Product Validation Package)** und die angrenzenden Studio-Angebote. Sie enthält keine fertigen Posts, sondern:
- den ICP in vier Segmenten
- die Fragen und Suchanfragen
- 12 Themencluster mit 100 Topics plus Reserve
- geprüfte Fakten mit Quellen
- was in den Suchergebnissen steht
- Abgrenzung zu bestehenden Posts
- CTAs und offene Entscheide

Für Brief, Schreiben, Validator und Planung gilt der Prozess aus `context/aurum/company-blog-strategy/RETRO-AND-NEXT-BATCH.md`.

**Wichtig:** Suchvolumen wurde nicht gemessen, weil kein Keyword-Tool verfügbar war. Queries sind aus den Fragen der Zielgruppe abgeleitet und gegen die Suchergebnisse vom 30.9.2026 geprüft. Die einzigen echten Volumendaten stammen aus der eigenen Search Console (März 2026, Abschnitt 4). Vor der Priorisierung mit Keyword Planner oder Search Console validieren.

---

## 1. Kurzfassung

1. **Vier Segmente:**
   - Gründer in der Ideen- oder Pre-Seed-Phase
   - KMU mit einer Produktidee (App, SaaS, Kundenportal)
   - Innovationsteams in Unternehmen
   - «Vibe-Coder», die mit Lovable, Bolt, Cursor oder Supabase schon etwas gebaut haben und an Grenzen stossen
   
   Alle wollen eine Idee mit echten Daten prüfen, bevor sie viel Geld oder Zeit investieren.
2. **Angebot:** In 12 Wochen wird ein produktionsreifes MVP gebaut (Azure, React, NestJS; Web plus gewrappte iOS- und Android-App). Es wird mit bezahlten Ads auf Google und LinkedIn getestet, dann folgt eine Go-, Pivot- oder Stop-Empfehlung. Bezahlung in Cash, Equity oder gemischt. Daneben gibt es Vibe Code Review (OWASP ASVS) und das Landing Page Paket.
3. **Chancen in den Suchergebnissen:**
   - Deutschsprachige Anleitungen zu Validierungsmethoden (Fake-Door-Test, Smoke-Test, Kundeninterviews) sind rar; die Suchergebnisse sind englisch.
   - Zu Schweizer Eigenheiten (Förderung, Rechte am Code, Hosting in der Schweiz, Cookies nach EDÖB, TWINT) gibt es wenige neutrale Antworten.
   - Zu Sicherheit und Store-Einreichung von KI-gebauten Apps gibt es noch kaum etwas auf Deutsch (Lovable-RLS-Lücke, Apple 4.2, Google-Play-Testpflicht).
4. **Vorsicht:** Das Angebot baut nicht mit Lovable oder Supabase und lehnt Fake-Door-Tests für die eigene Validierung ab. Posts zu diesen Themen müssen ehrlich und neutral sein und sagen, wann ein Tool oder Test reicht und wann nicht (Abschnitt 8).
5. **Empfehlung:** 100 Topics in 12 Clustern, erste Welle 25 Topics (Abschnitt 7). DE und EN beide voll ausgeschrieben. Bei Tool- und Tech-Themen ist die englische Query oft die wichtigere.

---

## 2. Angebot und Ziel-URLs (nur diese Fakten verwenden)

Quelle: `aurum-landing-page/src/data/services/de/mvp-validation.ts`, `vibe-code-review.ts`, `landing-page-package.ts`. Vor dem Schreiben erneut prüfen; die Website wurde gerade umgebaut.

**Produktvalidierungs-Paket** (`/de/services/mvp-validation` · `/services/mvp-validation`)

| Woche | Was passiert (laut Seite) |
|---|---|
| 1–4 | Produkt wird gebaut und deployt (Azure, React, NestJS). «Kein Mockup, keine Landing Page mit Fake-Button.» |
| 5–6 | Positionierung, conversion-optimierte Landing Page, bezahlte Akquise auf **Google und LinkedIn**, echter Traffic bis Ende Woche 6 |
| 7–10 | Kosten pro Lead, Conversion Rate, Absprungverhalten; bis zu drei Pivot-Iterationen |
| 11–12 | Ehrliche Empfehlung **Go / Pivot / Stop** mit Daten, Begründung und dem, was die Daten nicht beweisen |

Weitere Fakten laut Seite:
- **Enthalten:** Web-App plus iOS- und Android-App (Native-Wrap) einreichungsbereit, Landing Page, Branding-Basis, Analytics und Session Recordings ab Tag 1.
- **Eigentum:** Code, Designs, Daten und Dokumentation gehören vollständig dem Kunden.
- **Bezahlung:** Cash, Equity oder Mix. Die Aufteilung wird im Discovery-Call besprochen.
- **Preis:** keiner öffentlich (`showPricing: false`). **Writer nennen keinen Preis.**
- **Zielgruppen auf der Seite:** Pre-Seed-Gründer, Innovationsteams in Konzernen, Web3-Teams.

**Vibe Code Review** (EN `/services/vibe-code-review`; die DE-Route unter `[lang]/services` fehlte zum Recherchezeitpunkt, prüfen)

| | |
|---|---|
| Wofür | Prüfung von Apps, die mit Cursor, Lovable, v0 oder Claude Code gebaut wurden, gegen OWASP ASVS v5.0 |
| Enthalten | Gap Report, 8 Std. Architektur und Codequalität, Massnahmenplan P0/P1/P2, Ergebnisgespräch, NDA |
| Preise | Level 1 CHF 3'600 (statt 7'200), Level 2 CHF 7'200 (statt 14'400), Einführungsrabatt «solange Slots frei» |

**Landing Page Paket** (`/de/services/landing-page-package`): Starter CHF 1'900, Launch CHF 3'500, Growth CHF 6'500 (mit A/B-Test-Setup), GA4 plus Microsoft Clarity, Code gehört dem Kunden.

**Weitere Studio-Seiten:**
- `/de/services/agentic-coding`: Workshop für Engineering-Teams
- `/web3`: Web3-Beratung
- `/de/portfolio/{slug}`: Case Studies zu **CitySage, Holist-IQ, Do4Me, Postology, Inklets, KitchenCrew, Vemoir**

---

## 3. ICP

### Vier Segmente

| Segment | Wer | Auslöser | Was sie suchen | Passendes Angebot |
|---|---|---|---|---|
| **G · Gründer (Idee / Pre-Seed)** | Einzelne oder kleines Team, oft ohne technischen Mitgründer, wenig Cash | Idee vorhanden; will raisen oder kündigen und braucht vorher Belege | Idee validieren, erste Nutzer, Kosten, Förderung, Pitch mit Zahlen, Equity statt Cash | PVP, Landing Page Paket |
| **K · KMU mit Produktidee** | Etabliertes Schweizer KMU (Treuhand, Handwerk, Handel, Dienstleister), das aus Know-how ein digitales Produkt oder eine App machen will | Kunden fragen danach, Konkurrenz hat eine App, Idee aus dem Alltag | App entwickeln lassen, Kosten, wem gehört der Code, Risiko begrenzen, Markttest ohne das Kerngeschäft zu gefährden | PVP, Landing Page Paket |
| **I · Innovationsteams** | Innovationsabteilung, Corporate Venture Team, Digital-Lead in einem mittelgrossen oder grossen Unternehmen | Budget und Frist für neue Geschäftsideen, muss dem Board Fortschritt zeigen | Implementierungspartner, Experiment statt Business Case, Innovation Accounting, interne Hürden (IT-Sicherheit, Einkauf, Datenschutz) | PVP |
| **V · Vibe-Coder** | Gründer oder Fachleute, die mit Lovable, Bolt, v0, Replit, Cursor oder Claude Code schon ein Produkt gebaut haben | Erste Nutzer, erste Daten, Due Diligence, App-Store-Einreichung, Sicherheitsfrage | Ist meine App sicher und produktionsreif, wie komme ich in den Store, weiterbauen oder neu | Vibe Code Review, PVP |

Nebensegment **Web3-Teams** (auf der PVP-Seite genannt): nur 2 Topics in der Reserve.

### Fragen hinter den Queries

- Wie prüfe ich, ob jemand das will, bevor ich baue?
- Was ist ein sinnvoller Test? Reicht eine Landing Page? Wie viel Werbebudget braucht es?
- PoC, Prototyp oder MVP: was brauche ich?
- Mit welchem Tool baue ich? Lovable, Bolt, Supabase? Ist das sicher?
- Wie komme ich in den App Store? Warum wurde ich abgelehnt?
- Wie finde ich die ersten Nutzer? Welche Zahlen zeigen, dass es funktioniert?
- Wann pivotieren, wann aufhören?
- Wem gehört der Code? Kann ich meine Idee schützen? GmbH oder AG?
- Was kostet das in der Schweiz? Welche Förderung gibt es? Kann ich in Equity bezahlen?
- Wie bekomme ich intern Budget und Freigaben für einen Markttest?

### Anti-ICP

- Leute, die eine Agentur für ein fertig spezifiziertes Grossprojekt suchen (Ausschreibung, Pflichtenheft).
- Konzern-IT mit eigenem Entwicklerteam, das nur Kapazität will.
- Studierende, die eine Seminararbeit über Lean Startup schreiben.
- Hobby-Projekte ohne Geschäftsziel.
- Krypto-Spekulation.

---

## 4. Eigene Daten und bestehende Posts

**Search Console (Export März 2026, aus `aurum-landing-page/SEO-ROADMAP.md`):**

| Query | Impressionen (12 Mt.) | Position |
|---|---|---|
| mvp entwicklung schweiz | 133 | 12,3 |
| mvp entwickeln lassen | 110 | 52 |
| mvp development switzerland | 69 | 55 |
| ki mvp | 40 | 63 |

«MVP Entwicklung Schweiz» steht knapp vor Seite 1, die richtige Landingpage (in der Roadmap `/de/mvp-entwicklung`) plus stützende Posts sind der schnellste Hebel.

**Bestehende Studio-Posts (16, nicht duplizieren, verlinken oder auffrischen):**

| EN-Slug | Thema |
|---|---|
| `what-is-an-mvp` | Was ist ein MVP |
| `how-to-validate-a-startup-idea` | Idee validieren vor dem Bau |
| `mvp-cost-switzerland` | Kosten MVP-Entwicklung Schweiz |
| `the-hidden-costs-of-building-without-validation` | Kosten ohne Validierung |
| `venture-studio-vs-agency` | Studio vs Agentur vs Accelerator |
| `vibe-coding-vs-agentic-coding` | Vibe Coding vs Agentic Coding |
| `product-market-fit-how-to-find-it` | Product-Market-Fit (inkl. Sean-Ellis-Test) |
| `why-we-build-production-quality-mvps` | Produktionsqualität statt Prototyp |
| `ai-assisted-mvp-development` | KI-Tools je Phase |
| `is-your-vibe-coded-app-production-ready` | Ist die vibe-codierte App produktionsreif |
| `when-to-get-a-real-tech-partner` | No-Code-App braucht Tech-Partner |
| `how-aurum-avis-validates-mvps` | Unsere 12 Wochen |
| `validated-mvp-fundraising` | Validierte MVPs und Funding |
| `mvp-development-switzerland` | MVP-Entwicklung Zürich/Schweiz |
| `getting-an-mvp-built-for-you` | Partner für den MVP wählen |
| `startup-software-development-switzerland` | Startup-Softwareentwicklung Schweiz |

Diese Posts stammen von Feb.–Apr. 2026 und sind vor den heutigen Regeln entstanden (Du-Form im DE, ohne die heutige Faktenprüfung). **Empfehlung:** Vor der neuen Welle auffrischen: Sie-Form, Validator, Links auf die neuen Posts.

**Eigene Erfahrung, die Posts glaubwürdig macht** (von Robert vor der Verwendung bestätigen lassen):
- Sieben eigene Produkte mit Case Studies im Portfolio, Do4Me als MVP für einen Kunden
- Veröffentlichungen im App Store, im Mac App Store und bei Google Play, inkl. US-Steuerformular W-8BEN-E und einer langen Review-Wartezeit
- Hook-A/B-Test mit drei Varianten und GA4-Funnel auf der Prozess-Check-Seite
- Landing Pages mit GA4 plus Clarity
- Vibe Code Review nach OWASP ASVS
- Laufende Einträge in Verzeichnissen und auf Launch-Plattformen

Keine Kennzahlen erfinden. Nur verwenden, was das Team belegen kann.

---

## 5. Geprüfte Fakten und Rahmen (mit Quellen)

| Thema | Was Writer sagen dürfen | Quelle |
|---|---|---|
| Lovable-Sicherheitslücke | CVE-2025-48757: fehlende oder unwirksame Row Level Security in Lovable-generierten Supabase-Projekten; der öffentliche Key im Client erlaubte Abfragen ohne Login; 170+ Apps betroffen; gemeldet März 2025, publiziert 29.5.2025 | [NVD CVE-2025-48757](https://nvd.nist.gov/vuln/detail/CVE-2025-48757); Einordnung: [Superblocks](https://www.superblocks.com/blog/lovable-vulnerabilities) |
| Supabase in der Schweiz | Region **Zürich (eu-central-2)** ist wählbar | [Supabase Regions](https://supabase.com/docs/guides/platform/regions) |
| Apple App Store | Richtlinie **4.2 Minimum Functionality**: Apps müssen «beyond a repackaged website» gehen; 4.2.2: keine reinen Marketing-Apps oder Web-Clippings | [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| Google Play | Neue **persönliche** Entwicklerkonten (erstellt nach 13.11.2023) brauchen einen geschlossenen Test mit **mind. 12 Testern, 14 Tage durchgehend** | [Play Console Help](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en); ob Organisationskonten ausgenommen sind, prüfen |
| Cookies / Tracking CH | Kein generelles Opt-in. Einwilligung nötig bei Profiling mit hohem Risiko, besonders schützenswerten Daten, Weitergabe an Dritte zu deren Zwecken, Cross-Site-Tracking und Retargeting. Sonst Information und Widerspruchsmöglichkeit (Art. 45c FMG). EDÖB-Leitfaden Cookies, Stand 2025. | [LezziLegal Wegleitung (Stand EDÖB-Leitfaden 06.10.2025)](https://www.lezzilegal.ch/knowhow/wegleitung-cookies-dos-amp-donts-nach-schweizer-recht-fmgdsgdsv-stand-edb-leitfaden-06102025); EDÖB-Leitfaden selbst verlinken |
| Rechte am Code | Software von Angestellten gehört dem Arbeitgeber (Art. 17 URG). Bei externen Entwicklern entsteht das Urheberrecht beim Urheber; für den Kunden braucht es eine **schriftliche Übertragung** im Vertrag. | [Rentsch Partner: Schutz von Software](https://www.rentschpartner.ch/ict-law/schutz-von-software) |
| Ideen schützen | «Ideen als solche können nicht geschützt werden», nur ihre Ausgestaltung (Patent, Marke, Design, Urheberrecht); Geheimhaltung als erster Schritt | [IGE](https://www.ige.ch/de/uebersicht-geistiges-eigentum/ein-leitfaden-fuer-innovative-und-kreative/idee/koennen-ideen-geschuetzt-werden) |
| Marke | Anmeldegebühr CHF 450 (eine Klasse), Schutz jeweils 10 Jahre, Verlängerung CHF 550; Rabatt bei Online-Anmeldung laut FAQ | [IGE Marken-FAQ](https://www.ige.ch/de/etwas-schuetzen/marken/faq) (Beträge vor Publikation prüfen) |
| GmbH | Stammkapital mind. **CHF 20'000**, bei Gründung voll einbezahlt | [KMU-Portal GmbH](https://www.kmu.admin.ch/de/gmbh-haftung-stammkapital-gruendung); AG (CHF 100'000, davon 50'000 einbezahlt) prüfen |
| MWST | Pflicht ab CHF 100'000 Umsatz, freiwillige Unterstellung möglich | ESTV prüfen, z. B. [Kanton Zürich Unternehmensportal](https://www.zh.ch/de/wirtschaft-arbeit/unternehmensportal/opu/firma-leiten/steuern-und-finanzen-regeln/mwst.html) |
| TWINT | Über Stripe als Zahlungsmethode verfügbar | [Stripe TWINT](https://stripe.com/en-ch/payment-method/twint) |
| Innosuisse | Initial Coaching: Gutschein bis **CHF 10'000** für Coaching über max. 12 Monate, für Start-ups bis 5 Jahre (Life Science 10) mit innovativer, wissenschaftsbasierter Idee | [Innosuisse Initial Coaching](https://www.innosuisse.admin.ch/de/initial-coaching-fur-start-up), [Core Coaching](https://www.innosuisse.admin.ch/de/core-coaching-fur-start-up) |
| Venture Kick | Bis **CHF 150'000** in drei Stufen (40'000 / 60'000 / 50'000) plus Coaching | Sekundär: [startupschwiiz.ch (17.5.2026)](https://www.startupschwiiz.ch/finanzierung/startup-foerderung-schweiz); auf venturekick.ch prüfen |
| VC-Markt CH | 2025: **CHF 2,95 Mrd.** investiert, +24 % gegenüber 2024; Series A auf Rekordniveau; ICT mit den stärksten relativen Zuwächsen | [CMS zum Swiss Venture Capital Report 2026](https://cms.law/en/che/legal-updates/swiss-venture-capital-report-2026-shows-strong-rebound-in-swiss-vc-market); Originalbericht (startupticker/SECA) verlinken |
| Kundeninterviews | «The Mom Test» (Rob Fitzpatrick): über das Leben und vergangenes Verhalten der Leute fragen, nicht über die Idee | Buch; Zusammenfassungen nur als Sekundärquelle |
| PMF-Umfrage | Sean-Ellis-Test: Anteil «sehr enttäuscht», Richtwert 40 % | Sekundär, z. B. [Kromatic](https://kromatic.com/real-startup-book/4-evaluative-product-experiments/survey-product-market-fit/); Richtwert als Heuristik, nicht als Gesetz |

Nicht belegt und deshalb nicht verwenden, ohne selbst zu prüfen:
- Klickpreise (CPC) in der Schweiz
- «gute» Conversion Rates
- Kosten einer App in Franken
- Rundengrössen im Pre-Seed
- Preise von Tools
- Vergleichswerte von Werbeagenturen

---

## 6. Themencluster und 100 Topics

**Legende:**

| Spalte | Werte |
|---|---|
| Typ (nach `query-map.md`) | G glossary · P problem · H how-to · C checklist/template · V category vs category · W worth it / when not |
| F (Funnel) | A awareness · I interest · C consideration |
| Seg (Segment) | G Gründer · K KMU · I Innovationsteam · V Vibe-Coder |
| CTA | PVP Produktvalidierungs-Paket · VCR Vibe Code Review · LPP Landing Page Paket · CALL Discovery Call · W3 Web3 |

DE-Query = SEO-Query im Deutschen, EN-Query = Zwilling.

### A · Idee und Problem validieren (9)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| A01 | Kundeninterviews nach «The Mom Test»: Fragen, die ehrliche Antworten bringen | Kundeninterviews Fragen Startup | customer interview questions mom test | H | I | G,I | PVP |
| A02 | Das Problem validieren, bevor Sie die Lösung bauen | Problem validieren Startup | problem validation before building | H | I | G | PVP |
| A03 | Jobs to be Done: das Problem in der Sprache der Kunden | Jobs to be Done Methode | jobs to be done for founders | G | A | G,I | PVP |
| A04 | Marktgrösse in der Schweiz schätzen: TAM, SAM, SOM ohne Fantasiezahlen | TAM SAM SOM berechnen | TAM SAM SOM for a Swiss market | C | I | G,I | PVP |
| A05 | Wettbewerbsanalyse für ein MVP: was «keine Konkurrenz» bedeutet | Wettbewerbsanalyse Startup | competitor analysis for an MVP | H | I | G | PVP |
| A06 | Warum Umfragen eine Idee nicht validieren | Umfrage Produktidee validieren | why surveys don't validate an idea | P | A | alle | PVP |
| A07 | Zahlungsbereitschaft testen, bevor es ein Produkt gibt | Zahlungsbereitschaft testen | test willingness to pay | H | I | G,K | PVP |
| A08 | Letter of Intent und Vorverkauf als Beleg im B2B | Letter of Intent Startup | letters of intent and pre-sales as validation | H | I | G,K | PVP |
| A09 | Die riskanteste Annahme zuerst: Hypothesen richtig formulieren | Hypothesen testen Startup | riskiest assumption test | H | I | G,I | PVP |

**SERP:** Viele englische Guides und DE-Beiträge von Hochschulen und Beratern; wenige Schweizer Beispiele. `how-to-validate-a-startup-idea` existiert schon; A01–A09 sind die Vertiefungen, die dort nur angerissen sind.

### B · Validierungs-Experimente und Paid Ads (13)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| B01 | Fake-Door-Test: Nachfrage messen, bevor es das Produkt gibt | Fake Door Test | fake door test | H | I | G,I,K | LPP |
| B02 | Smoke-Test mit Landing Page und Warteliste | Landingpage Nachfrage testen | smoke test landing page | H | I | G | LPP |
| B03 | Fake-Door-Test oder echtes MVP: was welcher Test beweist | Fake Door Test oder MVP | fake door test vs real MVP | V | C | G,I | PVP |
| B04 | Google Ads zur Validierung: Keywords, Budget, was ein Klick beweist | Google Ads Idee testen | validate an idea with Google Ads | H | I | G,K | PVP |
| B05 | LinkedIn Ads für die B2B-Validierung | LinkedIn Ads B2B testen | LinkedIn ads for B2B validation | H | I | G,I | PVP |
| B06 | Meta Ads für B2C-Tests | Instagram Ads Produkt testen | test a B2C idea with Meta ads | H | I | G | PVP |
| B07 | Wie viel Werbebudget ein Validierungstest braucht | Budget Validierung Ads | ad budget to validate an idea | C | I | alle | PVP |
| B08 | Die Kennzahlen eines Tests: CTR, Kosten pro Lead, Conversion | Conversion Rate Landingpage | validation test metrics | C | I | alle | PVP |
| B09 | Wann ein Test aussagekräftig ist: Stichprobe, Dauer, Zufall | Test aussagekräftig Stichprobe | when a validation test is significant | P | I | alle | PVP |
| B10 | Concierge- und Wizard-of-Oz-MVP: von Hand liefern, was später automatisch läuft | Concierge MVP | concierge and wizard of oz MVP | G | A | G,K | PVP |
| B11 | Preis testen im MVP: Preisseite, Pakete, Vorbestellung | Preis testen Startup | pricing test for an MVP | H | I | G,K | PVP |
| B12 | A/B-Test auf der Landing Page: Headline, Angebot, Preis | A/B Test Landingpage | A/B test a landing page | H | I | G,K | LPP |
| B13 | Eine Warteliste aufbauen, die mehr als E-Mail-Adressen ist | Warteliste aufbauen | build a meaningful waitlist | H | I | G | LPP |

**SERP:** «Fake Door Test» und «Smoke Test» liefern auch auf Deutsch fast nur englische Guides (learningloop, data36, dowhatmatter). Das ist eine klare DE-Lücke. B03 verbindet ehrlich die Position des Pakets («kein Fake-Button») mit dem Nutzen früher Tests. B12 kann den realen Hook-Test der Prozess-Check-Seite als Beispiel nutzen, ohne Zahlen.

### C · MVP definieren und schneiden (7)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| C01 | Proof of Concept, Prototyp oder MVP: was Sie wann brauchen | Unterschied PoC Prototyp MVP | PoC vs prototype vs MVP | V | I | I,K | PVP |
| C02 | MVP-Features priorisieren: MoSCoW und RICE in der Praxis | MVP Features priorisieren | prioritize MVP features | H | I | alle | PVP |
| C03 | Klickbarer Prototyp: wann er reicht und wann nicht | Klickdummy erstellen | clickable prototype, when enough | H | I | G,I | PVP |
| C04 | MVP im B2B und im B2C: was sich unterscheidet | MVP B2B | B2B vs B2C MVP | V | I | G,K | PVP |
| C05 | Sieben Anzeichen, dass Ihr MVP zu gross geworden ist | MVP zu gross | signs your MVP is too big | P | A | alle | PVP |
| C06 | User Stories und Akzeptanzkriterien für Nicht-Techniker | User Stories schreiben | user stories for non-technical founders | H | I | G,K,I | PVP |
| C07 | Ein MVP-Briefing, mit dem ein Partner ein seriöses Angebot machen kann | Briefing App Entwicklung Vorlage | MVP brief template | C | C | K,I,G | CALL |

**SERP:** «PoC vs Prototyp vs MVP» ist von deutschen Agenturen besetzt (weptun, minimum-code); der Innovations- und Schweiz-Blickwinkel fehlt.

### D · Bauen mit KI und Vibe Coding (13)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| D01 | Ein MVP mit Lovable bauen: was geht, wo es aufhört | Lovable MVP | building an MVP with Lovable | H | I | V,G | VCR |
| D02 | Lovable und Supabase: Row Level Security richtig einrichten | Lovable Supabase RLS | Lovable Supabase row level security | H | I | V | VCR |
| D03 | Sicherheits-Checkliste für vibe-codierte Apps vor dem Launch | Vibe Coding Sicherheit | vibe coding security checklist | C | I | V | VCR |
| D04 | Lovable, Bolt, v0 oder Replit: welches Tool für welches MVP | Lovable vs Bolt | Lovable vs Bolt vs v0 vs Replit | V | I | V,G | VCR |
| D05 | Cursor oder Claude Code für Gründer ohne Entwicklerteam | Cursor Claude Code Gründer | Cursor or Claude Code for founders | V | I | V | VCR |
| D06 | Supabase oder Firebase für ein MVP | Supabase vs Firebase | Supabase vs Firebase for an MVP | V | I | V,G | VCR |
| D07 | No-Code-Tools wie Bubble oder FlutterFlow: wann sie reichen | No Code App erstellen | no-code MVP, when it is enough | V | I | G,K | PVP |
| D08 | Von Lovable zu produktivem Code: Migration ohne Neustart | Lovable Code exportieren | move a Lovable app to production code | H | C | V | VCR |
| D09 | API-Keys und Secrets in KI-gebauten Apps | API Key Frontend Sicherheit | API keys and secrets in AI-built apps | H | I | V | VCR |
| D10 | Tests für KI-generierten Code: die Minimalversion | KI Code testen | testing AI-generated code | H | I | V | VCR |
| D11 | Codequalität beurteilen, ohne Entwickler zu sein | Code Qualität prüfen | judging code quality as a non-developer | C | I | V,G | VCR |
| D12 | Technische Due Diligence für ein KI-gebautes MVP | technische Due Diligence Startup | tech due diligence for an AI-built MVP | H | C | V,G | VCR |
| D13 | KI-Funktionen im MVP: was ein Sprachmodell pro Nutzer kostet | LLM Kosten App | cost of AI features in an MVP | C | I | G,K | PVP |

**SERP:**
- Tool-Vergleiche (D04, D06) sind international und von Anbietern besetzt, auch von lovable.dev selbst. Nur mit eigenem Winkel angehen: Datenstandort Schweiz, Übergabe an Produktion, was ein Review typischerweise findet.
- D02 und D03 sind auf Englisch umkämpft (Scanner-Anbieter), auf Deutsch kaum vorhanden. Sie passen direkt zu Vibe Code Review.
- Bestehend und zu verlinken: `vibe-coding-vs-agentic-coding`, `ai-assisted-mvp-development`, `is-your-vibe-coded-app-production-ready`, `when-to-get-a-real-tech-partner`.

### E · Technik-Entscheide und Skalierbarkeit (8)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| E01 | Ein skalierbares MVP bauen: was «skalierbar» am Anfang wirklich heisst | skalierbares MVP | how to build a scalable MVP | H | I | G,I | PVP |
| E02 | Den Tech-Stack wählen: die Entscheide, die später teuer werden | Tech Stack Startup | choosing a startup tech stack | V | I | G,K | PVP |
| E03 | Web-App, native App, PWA oder gewrappte App? | Web App oder native App | web app vs native app vs PWA | V | I | alle | PVP |
| E04 | Hosting in der Schweiz für ein MVP: Azure, AWS und Supabase in Zürich | Hosting Schweiz App | Swiss hosting for an MVP | V | I | I,K | PVP |
| E05 | Login und Benutzerkonten im MVP: selbst bauen oder Dienst nutzen | Authentifizierung App | authentication for an MVP | V | I | G | PVP |
| E06 | Zahlungen im Schweizer MVP: Stripe, TWINT, Rechnung | Stripe TWINT integrieren | payments in a Swiss MVP | H | I | G,K | PVP |
| E07 | Technische Schulden im MVP: welche sich lohnen | technische Schulden Startup | technical debt in an MVP | P | A | G,I | PVP |
| E08 | Neu bauen oder weiterbauen: wann sich ein Rebuild lohnt | App neu entwickeln | rebuild or refactor an MVP | W | C | G,V | VCR |

Regionen von Azure (Switzerland North/West) und AWS (Zürich) vor dem Schreiben auf den Anbieterseiten prüfen; Supabase Zürich ist belegt. E01 und E03 stützen `why-we-build-production-quality-mvps`, nicht wiederholen.

### F · Launch und App Stores (8)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| F01 | Eine App im App Store veröffentlichen: Ablauf und Stolpersteine | App im App Store veröffentlichen | publish an app on the App Store | H | I | alle | PVP |
| F02 | Apple-Richtlinie 4.2: warum Web-Wrapper abgelehnt werden und was hilft | App Store abgelehnt 4.2 | App Store guideline 4.2 rejection | H | I | V,G | PVP |
| F03 | Google Play: 12 Tester, 14 Tage und wie Sie das organisieren | Google Play 12 Tester | Google Play 12 testers 14 days | H | I | V,G | PVP |
| F04 | Entwicklerkonto als Firma: Organisation, Verifizierung, Kosten | Apple Developer Account Firma | developer account as a company | H | I | alle | PVP |
| F05 | TestFlight und Beta-Tests vor dem Launch | TestFlight Beta Test | TestFlight beta testing | H | I | alle | PVP |
| F06 | Launch-Checkliste für ein MVP | MVP Launch Checkliste | MVP launch checklist | C | I | alle | PVP |
| F07 | Einnahmen aus App Store und Google Play: Auszahlung und Steuerformulare für Schweizer Firmen | App Store Einnahmen Steuern Schweiz | App Store payouts and tax forms for Swiss companies | H | I | G,K | CALL |
| F08 | Product Hunt und Launch-Verzeichnisse: was ein Launch bringt | Product Hunt Launch | Product Hunt launch for an MVP | P | A | G | PVP |

**Hinweise:**
- F02 muss ehrlich zur eigenen Praxis passen, denn das Paket liefert «gewrappte» Apps (Abschnitt 8).
- F04: ob Apple und Google für Organisationen eine D-U-N-S-Nummer verlangen und was die Konten kosten, auf den Seiten der Anbieter prüfen.
- F07 ist Erfahrungswissen (W-8BEN-E) und keine Steuerberatung.
- F08 kann die eigene Arbeit mit Verzeichnissen nutzen.

### G · Messen und entscheiden (9)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| G01 | Analytics für ein MVP einrichten: GA4, PostHog, Clarity | Analytics MVP einrichten | analytics setup for an MVP | H | I | alle | PVP |
| G02 | Tracking-Plan: welche Events ein MVP wirklich braucht | Tracking Plan Events | event tracking plan for an MVP | C | I | G,I | PVP |
| G03 | Aktivierung und Retention: die zwei Zahlen, die zählen | Retention messen App | measure activation and retention | H | I | alle | PVP |
| G04 | Kohortenanalyse für Gründer ohne Datenteam | Kohortenanalyse | cohort analysis for founders | H | I | G,I | PVP |
| G05 | Session Recordings und Schweizer Datenschutz | Session Recording Datenschutz | session recordings and Swiss privacy | P | I | alle | PVP |
| G06 | NPS im MVP: warum er wenig über Product-Market-Fit sagt | NPS Startup | is NPS useful for an MVP | P | A | G | PVP |
| G07 | Go, Pivot oder Stop: eine Entscheidungsvorlage | Pivot oder weitermachen | go, pivot or stop decision | C | C | G,I | PVP |
| G08 | Innovation Accounting: Fortschritt zeigen, bevor es Umsatz gibt | Innovation Accounting | innovation accounting | H | I | I | PVP |
| G09 | Validierungsergebnisse dem Board vorlegen | KPI Innovationsprojekt | reporting validation results to a board | C | C | I | PVP |

Der Sean-Ellis-Test steckt in `product-market-fit-how-to-find-it`; dort verlinken statt neu schreiben. G05 verweist auf die Datenschutz-Posts der Site `security`.

### H · Erste Nutzer und Markteintritt (7)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| H01 | Die ersten 100 Nutzer in der Schweiz gewinnen | erste Nutzer finden | get your first 100 users | H | I | G | PVP |
| H02 | Beta-Tester finden, die ehrlich sind | Beta Tester finden | find honest beta testers | H | I | G,V | PVP |
| H03 | Design-Partner für ein B2B-MVP gewinnen | Design Partner B2B | design partners for a B2B MVP | H | I | G,K | PVP |
| H04 | Kaltakquise zur Validierung, nicht zum Verkaufen | Kaltakquise Startup | cold outreach for validation | H | I | G | PVP |
| H05 | Das Schweizer Startup-Ökosystem: Communities, Events, Kanäle | Startup Community Schweiz | Swiss startup communities | P | A | G | PVP |
| H06 | Pilotkunden aus dem eigenen KMU-Netzwerk: Chancen und Grenzen | Pilotkunden finden | pilot customers from your own network | H | I | K | PVP |
| H07 | Positionierung eines neuen Produkts: der Satz, der die Ads trägt | Positionierung Startup | positioning a new product | H | I | G,K | PVP |

H04 muss die Schweizer Regeln für Werbe-E-Mails beachten (Art. 3 Abs. 1 lit. o UWG, vor dem Schreiben prüfen). H05 nur mit Organisationen, die auf ihren eigenen Seiten geprüft wurden.

### J · Recht, Datenschutz und Firma (9)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| J01 | Datenschutz im MVP: was das DSG ab dem ersten Nutzer verlangt | Datenschutz App Startup Schweiz | privacy requirements for a Swiss MVP | C | I | alle | PVP |
| J02 | App-Store-Datenschutzangaben und Google «Data Safety» richtig ausfüllen | App Datenschutz Angaben App Store | App Store privacy labels and Google Play data safety | H | I | alle | PVP |
| J03 | Cookies und Tracking auf der Landing Page: was in der Schweiz gilt | Cookie Banner Schweiz Pflicht | cookie rules for a landing page in Switzerland | H | I | alle | LPP |
| J04 | Wem gehört der Code? Rechte an Software mit Agentur und Freelancer | Rechte an Software Agentur | who owns the code when an agency builds it | H | C | alle | PVP |
| J05 | Kann ich meine Geschäftsidee schützen? NDA, Geheimhaltung, IGE | Geschäftsidee schützen | can I protect my startup idea in Switzerland | P | A | G,K | PVP |
| J06 | Marke anmelden beim IGE: Kosten und Ablauf | Marke anmelden Schweiz Kosten | register a trademark in Switzerland | H | I | G | CALL |
| J07 | GmbH oder AG für ein Startup | GmbH oder AG Startup | GmbH vs AG for a Swiss startup | V | I | G | CALL |
| J08 | AGB und Nutzungsbedingungen für ein MVP | AGB App erstellen | terms of use for an MVP | H | I | G | PVP |
| J09 | EU-Nutzer im Schweizer MVP: wann DSGVO und AI Act dazukommen | DSGVO Startup Schweiz EU Kunden | Swiss MVP with EU users | P | A | G,I | PVP |

Querverweis auf die Site `security`: `privacy-notice-requirement-switzerland`, `swiss-fadp-obligations-for-smes`, `data-processing-agreement-under-the-fadp`, `does-the-gdpr-apply-to-swiss-companies`. J01 und J03 fokussieren auf das Produkt (App, Landing Page, Analytics), nicht auf das Büro. Keine Rechtsberatung, fedlex, EDÖB und IGE verlinken.

### K · Finanzierung, Kosten und Partner (8)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| K01 | Startup-Förderung in der Schweiz: Venture Kick, Innosuisse, Kantone | Startup Förderung Schweiz | Swiss startup funding programmes | C | I | G | PVP |
| K02 | Innosuisse Start-up Coaching: für wen, was es bringt | Innosuisse Coaching Startup | Innosuisse start-up coaching | H | I | G | PVP |
| K03 | Pre-Seed in der Schweiz: Business Angels, Instrumente, was vorher belegt sein muss | Pre-Seed Finanzierung Schweiz | pre-seed funding in Switzerland | P | A | G | PVP |
| K04 | Pitch Deck mit Validierungsdaten: welche Folien Zahlen brauchen | Pitch Deck Startup | pitch deck with validation data | H | I | G | PVP |
| K05 | Equity statt Cash für die Entwicklung: Chancen und Fallstricke | Equity gegen Entwicklung | paying a development partner in equity | W | C | G | PVP |
| K06 | Einen technischen Mitgründer finden, oder bewusst darauf verzichten | technischen Mitgründer finden | find a technical co-founder | P | A | G | PVP |
| K07 | Festpreis oder Aufwand: wie Angebote für ein MVP kalkuliert sind | Festpreis Softwareentwicklung | fixed price vs time and materials | V | C | K,I,G | CALL |
| K08 | App entwickeln lassen: was eine App in der Schweiz kostet, über den Launch hinaus | App entwickeln lassen Kosten Schweiz | app development cost in Switzerland | W | C | K | PVP |

**Hinweise:**
- K08 ist die umkämpfteste Query der Liste (tytos, soxes, devedis, gryps, mobilunity) und hat vermutlich hohes Volumen. Abgrenzen von `mvp-cost-switzerland`: App-spezifisch mit Store, Wartung und Betrieb.
- K05 ist das eigene Differenzierungsmerkmal. Keine Prozentzahlen erfinden, das Modell nur so beschreiben, wie es auf der Seite steht.
- K03 darf `validated-mvp-fundraising` nicht wiederholen.

### L · Innovation im Unternehmen und im KMU (9)

| # | Arbeitstitel DE | DE-Query | EN-Query | Typ | F | Seg | CTA |
|---|---|---|---|---|---|---|---|
| L01 | Neue Produktidee im Unternehmen validieren: Experiment statt Business Case | Produktidee validieren Unternehmen | validate a new product idea inside a company | H | I | I | PVP |
| L02 | Stage-Gate oder Lean Startup im Innovationsprozess | Stage Gate Lean Startup | stage-gate vs lean startup | V | I | I | PVP |
| L03 | Budget für ein MVP intern genehmigen lassen | Budget Innovationsprojekt | get budget approved for an MVP | H | C | I | PVP |
| L04 | IT-Sicherheit, Einkauf, Datenschutz: die internen Hürden für einen externen MVP-Partner | Lieferantenbewertung IT Sicherheit | internal approvals for an external MVP partner | C | C | I | PVP |
| L05 | Aus einer Dienstleistung ein digitales Produkt machen | Dienstleistung digitalisieren | turn a service into a digital product | H | I | K | PVP |
| L06 | Ein SaaS aus dem eigenen KMU heraus: Chancen und Risiken | SaaS entwickeln KMU | building a SaaS inside an SME | P | A | K | PVP |
| L07 | Bestehende Kunden als Testpersonen: ja, aber richtig | Kunden als Tester | using existing customers to test a product | H | I | K,I | PVP |
| L08 | Corporate Venture Building: wann ein Studio-Partner Sinn macht | Corporate Venture Building | corporate venture building partner | W | C | I | PVP |
| L09 | Markttest unter der eigenen Marke oder unter einer neuen | Produkt testen neue Marke | test under your brand or a new brand | V | I | I,K | PVP |

**SERP:** Corporate Venture Building ist von Beratern besetzt (PwC DE, bitrock, adaptable-works.ch). Der Schweizer Mittelstand mit kleinem Innovationsbudget ist kaum bedient. L03 und L04 sind Fragen, die Innovationsverantwortliche intern wirklich haben; dazu gibt es kaum Inhalte.

### Total: 100 Topics

A 9 · B 13 · C 7 · D 13 · E 8 · F 8 · G 9 · H 7 · J 9 · K 8 · L 9 = **100**.

**Funnel-Mix:** 13 awareness · 73 interest · 14 consideration. Für mehr Einstiegsreichweite können einzelne Reserve-Themen (awareness) vorgezogen werden.

### Reserve (13, für spätere Wellen)

| Arbeitstitel DE | DE-Query | Typ | F |
|---|---|---|---|
| Minimum Lovable Product: sinnvoll oder Ausrede? | Minimum Lovable Product | G | A |
| Monolith oder Microservices im MVP | Monolith vs Microservices Startup | V | I |
| Multi-Tenant-SaaS von Anfang an? | Multi Tenant SaaS | V | I |
| Barrierefreiheit im MVP: was Pflicht, was sinnvoll | Barrierefreiheit App Schweiz | C | I |
| App Store Optimierung für den Start | App Store Optimierung | C | I |
| Pivot-Arten: Zielgruppe, Problem, Kanal, Preis | Pivot Startup Beispiele | G | A |
| Freemium, Trial oder bezahlt ab Tag 1 | Freemium oder Trial | V | I |
| MWST für Startups: ab wann, was freiwillig geht | MWST Startup Schweiz | G | A |
| Nischen im Schweizer Markt: wann klein genug gross ist | Nischenmarkt Schweiz | P | A |
| Webhooks, E-Mails, Benachrichtigungen: die unsichtbaren Teile eines MVP | E-Mail Versand App | H | I |
| Wer haftet, wenn KI-Code Daten leakt? | KI Code Haftung | P | A |
| Web3-Idee validieren, bevor es einen Token gibt | Web3 Projekt validieren | H | I |
| Braucht mein Projekt eine Blockchain? | braucht mein Projekt Blockchain | P | A |

---

## 7. Vorschlag erste Welle (25 Topics)

Nach eigener Search Console, Lücke in den Suchergebnissen, Nähe zum Kauf und eigener Erfahrung.

| Prio | ID | Warum zuerst |
|---|---|---|
| 1 | K08 | «App entwickeln lassen Kosten Schweiz»: grosses Volumen, kaufnah |
| 2 | C01 | PoC, Prototyp, MVP: Einstieg für Innovationsteams und KMU |
| 3 | B01 | Fake-Door-Test: DE-Lücke |
| 4 | B03 | Fake-Door-Test oder echtes MVP: erklärt die Position des Pakets |
| 5 | D02 | Lovable und Supabase RLS: dokumentierte Lücke, DE fast leer, passt zu VCR |
| 6 | D03 | Sicherheits-Checkliste Vibe Coding: VCR |
| 7 | F02 | Apple 4.2: konkreter Schmerz, eigene Erfahrung |
| 8 | F03 | Google Play 12 Tester: konkreter Schmerz |
| 9 | J04 | Wem gehört der Code: Schweizer Recht, kaufnah |
| 10 | K01 | Startup-Förderung Schweiz: Gründer-Einstieg |
| 11 | B04 | Google Ads zur Validierung: Kern des Pakets |
| 12 | B05 | LinkedIn Ads B2B: Kern des Pakets |
| 13 | G07 | Go, Pivot oder Stop: Kern des Pakets |
| 14 | L01 | Produktidee im Unternehmen validieren: Innovationsteams |
| 15 | L03 | Budget intern genehmigen: Innovationsteams |
| 16 | A01 | Kundeninterviews (Mom Test) |
| 17 | E03 | Web-App, native, PWA, Wrapper |
| 18 | E04 | Hosting in der Schweiz |
| 19 | D04 | Lovable vs Bolt vs v0 vs Replit (EN wichtig) |
| 20 | D08 | Von Lovable zu produktivem Code: VCR, PVP |
| 21 | G01 | Analytics für ein MVP |
| 22 | J03 | Cookies auf der Landing Page (EDÖB 2025) |
| 23 | K05 | Equity statt Cash: eigenes Merkmal |
| 24 | L05 | Dienstleistung zu digitalem Produkt: KMU |
| 25 | H01 | Die ersten 100 Nutzer |

**Parallel dazu** die Landingpage «MVP Entwicklung Schweiz» (`/de/mvp-entwicklung`, SEO-Roadmap) fertigstellen. Sie ist das Ziel der stärksten eigenen Query (Position 12,3).

---

## 8. Ehrlichkeit: wo Inhalt und Angebot auseinanderliegen

1. **Fake-Door-Tests:** Die Paketseite sagt «Kein Mockup, keine Landing Page mit Fake-Button». Posts zu Fake-Door- und Smoke-Tests (B01, B02) sollen die Methode fair erklären (billig, schnell, gut für Nachfrage-Signale). B03 erklärt, was nur ein echtes Produkt misst (Nutzung, Retention). Kein Widerspruch, wenn klar ist: früher Test für Nachfrage, echtes MVP für Verhalten.
2. **Gewrappte Apps und Apple 4.2:** Das Paket liefert «Native-Wrap»-Apps. Apple lehnt Apps ab, die nur eine verpackte Website sind. F02 und E03 müssen sagen, was eine gewrappte App braucht, um durchzukommen (app-typische Funktionen), und dürfen keine Freigabe versprechen. **Robert:** Wie stellt Aurum das in der Praxis sicher? Diese Antwort gehört in F02.
3. **Lovable, Supabase und Co.:** Aurum baut mit Azure, React und NestJS. Tool-Posts (D01–D08) sind neutrale Hilfen. Sie zeigen, wann das Tool reicht, und verweisen auf Vibe Code Review, wenn Sicherheit oder Produktionsreife die Frage ist. Nicht schlechtreden, nicht so tun, als würde Aurum damit bauen.
4. **Kein Preis für das Paket:** Die Seite zeigt keinen. Posts nennen keinen, auch keine Spanne, ausser Robert gibt eine frei. Für das Landing Page Paket und Vibe Code Review gelten die Seitenpreise.
5. **Equity:** Nur beschreiben, wie es auf der Seite steht (Cash, Equity oder Mix, Aufteilung im Discovery-Call). Keine Prozentsätze, keine Bewertungsregeln.
6. **Eigene Produkte:** Case Studies (CitySage, Holist-IQ, Do4Me, Postology, Inklets, KitchenCrew, Vemoir) nur mit Fakten verwenden, die in den Case Studies oder von Robert belegt sind. Keine Nutzerzahlen erfinden.

---

## 9. Sprache, Funnel und CTA

- **Sprachen:** DE und EN voll ausgeschrieben, wie in den anderen Clustern. Studio hat EN als Standard. Bei Tool-, Tech- und Store-Themen (D, E, F, G) ist die englische Query meist die mit mehr Nachfrage; bei Schweizer Themen (J, K, L, K08) die deutsche. Die Primär-Query je Sprache separat wählen, nicht übersetzen.
- **Anrede:** Deutsch mit **Sie**, wie die übrige Website. Die alten Studio-Posts duzen noch (siehe Abschnitt 4, auffrischen).
- **CTA-Mapping:**
  - awareness: leichter Link auf die passende Angebotsseite
  - interest: Abschlussabschnitt, wann das Angebot passt
  - consideration: Discovery Call plus Angebotsseite, und ehrlich sagen, wer es nicht braucht
- **Angebote:**
  - PVP für Validierung und Bau
  - VCR für bestehenden KI-Code
  - LPP für frühe Nachfrage-Tests
  - CALL für Kosten-, Vertrags- und Briefingfragen
- **Querlinks:** Studio-Posts dürfen auf die Datenschutz-Posts der Site `security` verlinken (Robert entscheidet, siehe Security-Recherche). Keine Links in den KI-Cluster `prozess-check`, ausser wo das Thema identisch ist.
- **Frontmatter:** `site: studio`. Der Validator muss die Studio-Pfade (`/blog/…`, `/de/blog/…`, `/services/…`, `/portfolio/…`, `/web3`) als erlaubt kennen.

---

## 10. Offene Punkte für Robert

1. **Suchvolumen messen** (Keyword Planner oder SEO-Tool), vor allem für K08, C01, B01, D04, F01, K01.
2. **Apple 4.2 und die Wrap-Apps:** Wie sieht die Praxis aus? Das braucht es für F02 und E03.
3. **Preisangaben:** Soll es für das Paket eine Spanne oder ein «ab» geben, oder bleibt es ohne Preis?
4. **Autor:** «Aurum Avis Labs» oder Robert Schlittler als Autor, dazu Belege aus eigener Erfahrung (App-Store-Launches, eigene Produkte)?
5. **Alte Studio-Posts:** Vor der neuen Welle auffrischen (Sie-Form, Validator, Querlinks)?
6. **Vibe Code Review DE:** Die Route unter `[lang]/services` fehlte beim Recherchestand. Ist sie gewollt?
7. **Web3:** Nur Reserve oder eigene kleine Reihe?
8. **Kadenz:** 100 Posts nach dem gleichen Muster wie der KI-Cluster (ein Post pro Werktag) oder langsamer, weil der Studio-Blog auf einer anderen Site läuft?

---

## 11. Referenzen

**Plattformen und Tools**
- Apple App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play, Testanforderungen für neue persönliche Konten: https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- Supabase Regionen: https://supabase.com/docs/guides/platform/regions
- Stripe TWINT: https://stripe.com/en-ch/payment-method/twint
- CVE-2025-48757: https://nvd.nist.gov/vuln/detail/CVE-2025-48757 · Einordnung: https://www.superblocks.com/blog/lovable-vulnerabilities

**Recht und Behörden**
- IGE, können Ideen geschützt werden: https://www.ige.ch/de/uebersicht-geistiges-eigentum/ein-leitfaden-fuer-innovative-und-kreative/idee/koennen-ideen-geschuetzt-werden
- IGE Marken-FAQ: https://www.ige.ch/de/etwas-schuetzen/marken/faq
- KMU-Portal GmbH: https://www.kmu.admin.ch/de/gmbh-haftung-stammkapital-gruendung
- Rechte an Software (Rentsch Partner): https://www.rentschpartner.ch/ict-law/schutz-von-software
- Cookies nach Schweizer Recht (LezziLegal, Stand EDÖB-Leitfaden 06.10.2025): https://www.lezzilegal.ch/knowhow/wegleitung-cookies-dos-amp-donts-nach-schweizer-recht-fmgdsgdsv-stand-edb-leitfaden-06102025
- MWST (Kanton Zürich): https://www.zh.ch/de/wirtschaft-arbeit/unternehmensportal/opu/firma-leiten/steuern-und-finanzen-regeln/mwst.html

**Förderung und Markt**
- Innosuisse Initial Coaching: https://www.innosuisse.admin.ch/de/initial-coaching-fur-start-up
- Innosuisse Core Coaching: https://www.innosuisse.admin.ch/de/core-coaching-fur-start-up
- Startup-Förderung Schweiz (Übersicht, Sekundärquelle): https://www.startupschwiiz.ch/finanzierung/startup-foerderung-schweiz
- Swiss Venture Capital Report 2026 (Zusammenfassung CMS): https://cms.law/en/che/legal-updates/swiss-venture-capital-report-2026-shows-strong-rebound-in-swiss-vc-market

**Methoden**
- Sean-Ellis-Test (Kromatic): https://kromatic.com/real-startup-book/4-evaluative-product-experiments/survey-product-market-fit/
- Fake-Door-Test (Learning Loop): https://learningloop.io/plays/fake-door-testing
- The Mom Test (Rob Fitzpatrick): Buch; Zusammenfassungen nur als Sekundärquelle

**Wettbewerb in den Suchergebnissen (Stand 30.9.2026, zur Einordnung, nicht zitieren)**
- «MVP entwickeln lassen Schweiz»: decivo.de, deineseite.at, enacton, webaufbau, stssoftware
- «App entwickeln lassen Kosten Schweiz»: tytos, soxes, devedis, gryps, mobilunity
- «PoC vs Prototyp vs MVP»: weptun, minimum-code, marcelmellor
- «Lovable vs Bolt»: altar.io, lovable.dev, vibecodingacademy, digitalapplied
- «Fake Door Test»: learningloop, data36, dowhatmatter (alle EN)
- «Corporate Venture Building»: PwC DE, bitrock, adaptable-works.ch
- «Startup Förderung Schweiz»: startupschwiiz.ch, HSLU Smart-up
