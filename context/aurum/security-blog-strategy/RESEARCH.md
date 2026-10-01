# Aurum Security-Blog: Meta-Recherche Security Awareness & Datenschutz

**Stand:** 2026-09-30 · **Für:** Koordinator-Agent und Blog-Writer · **Brand:** `aurum`, Site `security` (Blog unter `/security/blog`, DE `/de/security/blog`)

Diese Datei ist die Recherchebasis, keine Sammlung fertiger Posts. Sie beschreibt den ICP, die Fragen und Suchanfragen, die Themenblöcke, den rechtlichen Rahmen mit Quellen, die Lage in den Suchergebnissen und einen Vorschlag für die erste Welle. Die einzelnen Topic-Briefs, das Schreiben und die Planung macht der Koordinator. Frontmatter, Blocks und Prüfung stehen in `.cursor/skills/seo-blog/` und in `context/aurum/batches/security-2026-09-30/WRITER-BRIEF.md`.

**Wichtig:** Suchvolumen wurde nicht gemessen, weil in dieser Session kein Keyword-Tool zur Verfügung stand. Die Queries sind aus Nutzerfragen abgeleitet und gegen die aktuellen Suchergebnisse geprüft. Vor der Priorisierung mit Google Keyword Planner, Search Console oder einem SEO-Tool validieren.

---

## 1. Kurzfassung

1. **ICP:** Schweizer Unternehmen mit 20–250 Mitarbeitenden, Deutschschweiz zuerst, ohne eigene Security- oder Datenschutzabteilung. Die IT ist oft extern (Managed Service Provider). Sie wissen, dass sie schulen sollten, aber nicht was, wie oft, ob es Pflicht ist und wie man es nachweist.
2. **Auslöser** sind fast nie die Neugier, sondern ein Vorfall oder Beinahe-Vorfall (Phishing, CEO-Fraud, geänderte IBAN), der Fragebogen der Cyberversicherung, die Anforderung eines Kunden oder Konzerns (Lieferantenaudit, ISO 27001, NIS2 über Verträge) oder das revidierte DSG.
3. **Lage:** Betrug ist mit 52 % die grösste Kategorie der Meldungen beim BACS. CEO-Fraud stieg von 719 (2024) auf 971 Fälle (2025). In mittleren KMU schulen laut Deloitte 82 % regelmässig, in kleinen 65 %. Die Lücke liegt also weniger beim «ob» als beim «was, wie gut, mit welchem Nachweis».
4. **SERP-Lücken:** Viele konkrete Fragen werden heute von deutschen Seiten beantwortet, mit deutschem Recht (BetrVG, DSGVO-72-Stunden-Frist, deutsche Bussgelder). Beispiele sind «Phishing-Simulation erlaubt?», «Phishing geklickt, was tun?» und «E-Mail an falschen Empfänger». Schweizer Antworten nach DSG, OR und ArGV 3 fehlen oder stehen auf Anbieterseiten.
5. **Vorschlag:** zwei gleich gewichtete Cluster (Security Awareness, Datenschutz) mit je 12 Topics in der ersten Welle, dazu 2 Brückenthemen. Alle Topics führen zur passenden Schulungsseite und zum Discovery Call mit Riccardo Conti.

---

## 2. Angebot und Ziel-URLs (nur diese Fakten verwenden)

Quelle: Live-Seiten `aurum-landing-page` (`src/i18n/de.json` → `security`, `src/data/services/de/security-awareness.ts`, `datenschutz-awareness.ts`). Vor dem Schreiben erneut prüfen.

| | Security Awareness | Datenschutz Awareness |
|---|---|---|
| Seite DE / EN | `/de/security/security-awareness` · `/security/security-awareness` | `/de/security/datenschutz` · `/security/datenschutz` |
| Übersicht | `/de/security` · `/security` | |
| Inhalt laut Seite | Phishing, Smishing, Vishing erkennen; Passwörter und Authentifizierung; Vorfälle melden; branchenspezifische Angriffswege | DSG und DSGVO im Alltag; was darf ich, was nicht; Umgang mit Personendaten; Meldepflichten bei Datenpannen |
| Ablauf | Vorbereitungsanalyse, Live-Training 1–2 h, Follow-up-Call nach einigen Wochen | Bedarfsanalyse 30 Min., Live-Schulung 1–2 h, Follow-up-Call |
| Preise | Standard CHF 1'190 (bis 25 TN), Plus CHF 2'190 (bis 50 TN), Custom auf Anfrage | gleich |
| Extras | Vorgelagerter Phishing-Test CHF 600; Mapping auf ISO/IEC 27001:2022 A 6.3, NIST SP 800-50, NIST CSF PR.AT auf Anfrage | kombinierter Tag mit Security möglich |
| Format | remote oder vor Ort in der Schweiz (Anreise inklusive), Deutsch und Englisch | gleich |
| Ansprechperson | Riccardo Conti, Mitgründer und Cybersicherheitsspezialist | gleich |
| CTA | «Discovery Call buchen» | gleich |

**Für Robert zu klären, bevor Writer Preise und Leistungen nennen:**
- Das Standard-Paket listet «Phishing-Simulationen mit echten Szenarien», das FAQ nennt den vorgelagerten Phishing-Test als Zusatz für CHF 600. Was gilt?
- Die Datenschutz-Seite sagt «DSGVO- und DSG-konforme Datenschutzschulung». In Blogposts besser «Schulung nach DSG und DSGVO» schreiben: eine Schulung macht niemanden «konform».

---

## 3. ICP

### Wer

| Merkmal | Beschreibung |
|---|---|
| Grösse | 20–250 Mitarbeitende. Das passt zu Standard (bis 25) und Plus (bis 50) und ist gross genug für ein Schulungsbudget. |
| Region | Deutschschweiz zuerst; EN-Zwilling für hreflang, gemischtsprachige Teams und internationale Firmen in Zug und Zürich |
| IT | Häufig ausgelagert an einen IT-Partner oder eine Person «macht IT nebenbei». Kein CISO, kein Awareness-Programm, keine Lernplattform. |
| Entscheider | Geschäftsleitung/Inhaber, HR-Leitung, Finanzleitung, IT-Verantwortliche. Beim Datenschutz oft eine nebenamtlich verantwortliche Person oder ein externer Berater. |
| Typische Branchen | Treuhand und Anwaltskanzleien (Berufsgeheimnis), Arzt- und Therapiepraxen (Gesundheitsdaten), Immobilienverwaltung, Personalvermittlung, Handel und Produktion mit Zahlungsverkehr, Zulieferer von EU-Kunden, kantonsnahe Betriebe |

### Warum jetzt (Auslöser)

1. **Vorfall oder Beinahe-Vorfall:** eine Phishing-Mail, auf die jemand geklickt hat, eine CEO-Fraud-Mail an die Buchhaltung, eine Rechnung mit geänderter IBAN, ein verlorener Laptop, eine E-Mail an den falschen Empfänger.
2. **Cyberversicherung:** Antrag oder Erneuerung fragt nach Schulung, MFA und Backups. Welche Punkte ein bestimmter Versicherer verlangt, wurde hier nicht verifiziert; das muss pro Versicherer an dessen eigener Seite oder im Antrag geprüft werden.
3. **Kunde oder Konzern verlangt einen Nachweis:** Lieferantenaudit, ISO-27001-zertifizierte Kunden (Control A 6.3), EU-Kunden unter NIS2, die Pflichten vertraglich weitergeben.
4. **Revidiertes DSG seit 1.9.2023:** Unsicherheit, was «Datensicherheit» und «Meldung von Datenpannen» im Alltag heisst, und die Angst vor persönlichen Bussen.
5. **Verwaltungsrat, Revisionsstelle oder Geschäftsleitung** fragt, was die Firma gegen Cyberrisiken tut.
6. **Wachstum:** neue Mitarbeitende, Homeoffice, ein zweiter Standort.

### Was sie nicht wissen (die Fragen hinter den Queries)

- Welche Themen gehören in eine Schulung, und welche sind für uns relevant?
- Ist Schulung Pflicht? Wer verlangt sie (Gesetz, Versicherung, Kunde)?
- Wie oft? Einmal, jährlich, bei Eintritt?
- E-Learning oder live? Was bringt mehr?
- Wie weisen wir die Schulung nach (Audit, Versicherung)?
- Dürfen wir unsere Leute mit Phishing-Tests prüfen?
- Was tun, wenn jemand geklickt oder bezahlt hat?
- Ist eine falsch versendete Mail eine meldepflichtige Datenpanne?
- Wer haftet persönlich?
- Was dürfen wir mit Bewerber-, Mitarbeiter- und Kundendaten, wie lange aufbewahren?

### Anti-ICP (nicht dafür schreiben)

Konzerne mit CISO, Lernplattform und eigenem Awareness-Team. Privatpersonen (die bedienen BACS, iBarry, S-U-P-E-R.ch). Technikerinnen, die Pentests oder Red Teaming suchen. Leute, die eine Zertifizierung zum Datenschutzbeauftragten wollen. Anwälte, die Kommentarliteratur suchen.

---

## 4. Lage in Zahlen (Referenzen, jeweils als fremde Messung zitieren)

| Befund | Quelle |
|---|---|
| H2 2025: **29'006 freiwillige Meldungen** plus 145 Meldungen aus der Meldepflicht; **52 % Betrug**; 57 Ransomware-Fälle; SMS-Blaster umgehen seit Sommer 2025 die SMS-Filter der Provider | [BACS Halbjahresbericht 2025/2](https://www.bacs.admin.ch/de/hjb-25-2-de) (publiziert 30.3.2026) |
| **CEO-Fraud:** 719 Meldungen 2024, **971 im Jahr 2025**; Täter recherchieren über LinkedIn, Website und Handelsregister; zunehmend KI-Texte und Deepfake-Audio; teils als Schweizer Anwaltskanzlei getarnt | [BACS Wochenrückblick Woche 4/2026 «Dringende Überweisung»](https://www.bacs.admin.ch/de/26w4-de) |
| **Rechnungsmanipulation (BEC):** Täter übernehmen ein Mailkonto und schicken echte Rechnungen mit neuer IBAN; BACS empfiehlt telefonische Rückfrage, Sensibilisierung besonders der Finanzabteilung, 2FA, klare Zahlungsprozesse, Prüfung von Weiterleitungsregeln | [BACS: Business E-Mail Compromise](https://www.bacs.admin.ch/de/business-email-compromise-de) |
| Nationale Kampagne 2026 «SUPER, oder?» zu **KI-generiertem Phishing**, mit SKP, Polizei, SBB, Post, SVV; 13.4.–10.5.2026 | [BACS: «SUPER, oder?»](https://www.bacs.admin.ch/de/26super-1-de), [s-u-p-e-r.ch](https://www.s-u-p-e-r.ch/de/ueber-uns/) |
| Deepfake-Varianten (KI-Bilder und -Videos) in Betrugsfällen | [BACS Woche 30/2026](https://www.bacs.admin.ch/de/26w30-de) |
| QR-Code-Phishing an Parkuhren | [BACS Woche 43/2024](https://www.bacs.admin.ch/de/24w43-de), [Woche 31/2024](https://www.bacs.admin.ch/de/24w31-de) |
| **Deloitte 2026, Firmen unter 250 MA (924 Mitarbeitende befragt):** regelmässige Cyber-Schulung bei 32 % (Mikro), **65 % (klein), 82 % (mittel)**; häufigste Angriffe Phishing 25 %, Malware 13 %, CEO-Fraud 8 %; Cyberversicherung bei nur 11,5 % der Schweizer Firmen; 86 % finden Schulungen hilfreich | [Deloitte: «Unterschätzt, ungeschützt, unterversichert»](https://www.allnews.ch/sites/default/files/ckfinder/userfiles/Deloitte%20Cyber%20Studie%202026_0.pdf) |
| **KMU-Cyberstudie 2025 (515 KMU mit 1–49 MA):** nur 30 % haben Sicherheitskonzept, Schulung oder Notfallplan; für 28 % hat Cybersicherheit keine Priorität (Vorjahr 18 %); 42 % halten ihren Schutz für ausreichend (Vorjahr 55 %) | [cyberstudie.ch](https://cyberstudie.ch/) (Mobiliar, digitalswitzerland, FHNW, SATW u. a.) |
| Mobiliar-Studie 2024: 32 % der KMU schulen regelmässig; 57 % fühlen sich sicher, nur 12 % halten einen Angriff in 2–3 Jahren für wahrscheinlich | [Mobiliar: Cybersicherheit Schweiz](https://www.mobiliar.ch/studie/cybersicherheit-schweiz) |
| KMU-Portal des Bundes: verweist auf BACS, Schnelltest, CyberSeal, Cyber-Safe-Label; Sensibilisierung der Mitarbeitenden als Kernmassnahme | [kmu.admin.ch Cybersicherheit](https://www.kmu.admin.ch/de/cybersicherheit) |

**Einordnung:** Die KMU-Cyberstudie misst 1–49 MA, Deloitte unter 250 MA mit Aufteilung nach Grösse. Für den ICP mit 20–250 MA ist Deloitte die passendere Zahl. Nicht vermischen.

---

## 5. Rechtlicher und normativer Rahmen

Praktisch einordnen, keine Rechtsberatung. Gesetzestexte über fedlex, EDÖB oder BACS verlinken. Die Einordnungen unten sind geprüft, sofern eine Quelle angegeben ist; sonst stehen sie unter «prüfen».

| Thema | Was Writer sagen dürfen | Quelle |
|---|---|---|
| Schulungspflicht | Das DSG schreibt Schulungen nicht ausdrücklich vor. Es verlangt aber angemessene technische und **organisatorische** Massnahmen für die Datensicherheit (Art. 8 DSG, Art. 1–3 DSV). Schulung ist eine der üblichsten organisatorischen Massnahmen. | prüfen: [fedlex DSG](https://www.fedlex.admin.ch/eli/cc/2022/491/de), [DSV](https://www.fedlex.admin.ch/eli/cc/2022/568/de) |
| Strafbestimmungen | Bussen bis **CHF 250'000**, gegen **natürliche Personen**, nur bei **Vorsatz**; Art. 61 DSG umfasst Sorgfaltspflichten inkl. Datensicherheit; verfolgt von kantonalen Staatsanwaltschaften. **Nuance:** Ob die DSV überhaupt konkrete «Mindestanforderungen an die Datensicherheit» festlegt, deren Verletzung strafbar wäre, ist umstritten (datenrecht.ch argumentiert: nein). Bussen also korrekt, aber nüchtern darstellen, keine Angstmache. | [EDÖB Strafbestimmungen](https://www.edoeb.admin.ch/de/strafbestimmungen), [datenrecht.ch zur DSV (2022)](https://datenrecht.ch/en/dsv-keine-mindestanforderungen-an-die-datensicherheit-keine-entsprechende-strafbarkeit-weitere-anmerkungen/) |
| Datenpanne | Meldung an den EDÖB nur bei **voraussichtlich hohem Risiko**, **«so rasch als möglich»** (keine 72 Stunden wie in der DSGVO), über das Portal databreach.edoeb.admin.ch; Betroffene informieren, wenn sie etwas tun müssen; Verletzungen intern dokumentieren (Tatsachen, Auswirkungen, Massnahmen), die Dokumentation ab der Meldung mindestens 2 Jahre aufbewahren | Art. 24 DSG; [EDÖB-Leitfaden zur Meldung](https://www.edoeb.admin.ch/dam/de/sd-web/T64CAUyvAMcF/1_2%20Leitfaden%20des%20ED%C3%96B%20betreffend%20die%20Meldung%20von%20Datensicherheitsverletzungen%20und%20Information%20der%20Betroffenen%20nach%20Art.%2024%20DSG_DE.pdf); Art. 15 Abs. 4 DSV ([Wortlaut bei activemind](https://www.activemind.ch/gesetze/dsv/artikel-15/)) |
| Verzeichnis der Bearbeitungstätigkeiten | Befreit sind Firmen mit **weniger als 250 Mitarbeitenden** am 1. Januar, ausser sie bearbeiten besonders schützenswerte Daten in grossem Umfang oder machen Profiling mit hohem Risiko | Art. 24 DSV ([activemind Wortlaut](https://www.activemind.ch/gesetze/dsv/artikel-24/)); fedlex prüfen |
| DSGVO für Schweizer Firmen | Gilt, wenn eine Schweizer Firma Personen in der EU Waren oder Dienstleistungen anbietet oder ihr Verhalten beobachtet (Art. 3 Abs. 2 DSGVO) | [KMU-Portal: EU-Regelung](https://www.kmu.admin.ch/de/eu-regelung-zum-datenschutz-neue-eu-verordnung); EUR-Lex prüfen |
| Überwachung von Mitarbeitenden, Phishing-Tests | Überwachungssysteme, die das **Verhalten** kontrollieren sollen, sind verboten (Art. 26 ArGV 3). Bearbeitung von Mitarbeiterdaten nur soweit arbeitsbezogen (Art. 328b OR). Mitarbeitende **vorgängig informieren**, verhältnismässig bleiben, E-Mail-Auswertungen möglichst anonymisiert oder pseudonymisiert. Daraus folgt für Phishing-Simulationen: ankündigen und nicht zur Leistungsbeurteilung einzelner Personen nutzen. Das ist eine Einordnung, keine Rechtsauskunft. | [EDÖB: Technische Überwachung am Arbeitsplatz](https://www.edoeb.admin.ch/de/technische-mittel-zur-uberwachung-am-arbeitsplatz), [SECO Wegleitung Art. 26 ArGV 3](https://www.seco.admin.ch/dam/seco/de/dokumente/Arbeit/Arbeitsbedingungen/Arbeitsgesetz%20und%20Verordnungen/Wegleitungen/Wegleitungen%203/ArGV3_art26.pdf.download.pdf/ArGV3_art26_de.pdf) |
| Meldepflicht Cyberangriffe | Seit 1.4.2025 für **Betreiber kritischer Infrastrukturen** (u. a. Energie, Trinkwasser, Transport, kantonale und kommunale Verwaltungen): Meldung ans BACS innert **24 Stunden**; Sanktionen ab 1.10.2025. Für die meisten KMU gilt sie **nicht**, klar so schreiben. | [BACS Meldepflicht](https://www.bacs.admin.ch/de/25-mp-de), [Informationen zur Meldepflicht](https://www.bacs.admin.ch/de/informationen-zur-meldepflicht) |
| NIS2 (EU) | Gilt nicht direkt in der Schweiz. Schweizer Zulieferer spüren es über Verträge mit EU-Kunden. Art. 20 NIS2 verlangt Schulungen für Leitungsorgane und dass Einrichtungen Mitarbeitenden regelmässig ähnliche Schulungen anbieten. | Wortlaut von Art. 20 auf EUR-Lex prüfen; Einordnung z. B. [InfoGuard NIS2-Leitfaden](https://www.infoguard.ch/de/blog/nis2-leitfaden-so-gelingt-die-umsetzung) |
| ISO/IEC 27001:2022 | Control A 6.3 verlangt ein formales, laufendes Awareness-, Ausbildungs- und Trainingsprogramm für alle Mitarbeitenden und relevanten Dritten; Auditoren wollen Nachweise (Teilnahme, Inhalte, Wirkung) | [UpGuard zu A 6.3](https://www.upguard.com/compliance/iso-27001/6-3/) (Sekundärquelle; Normtext ist kostenpflichtig) |
| Newsletter und Werbung | Massenwerbung ohne Einwilligung ist unlauter (Art. 3 Abs. 1 lit. o UWG) | prüfen: fedlex UWG |
| Datenübermittlung USA | Swiss-U.S. Data Privacy Framework für zertifizierte US-Firmen | prüfen: EDÖB, Länderliste des Bundesrats |

---

## 6. Themenblöcke, Fragen und Queries

**Legende:** Funnel A = awareness, I = interest, C = consideration. Typen nach `.cursor/skills/seo-blog/query-map.md` (G glossary, P problem, H how-to, C checklist, V category vs category, W worth it/when not). DE ist die SEO-Query; EN ist die Zwillings-Query.

### Security Awareness

#### S1 · Grundlagen und Entscheid (führt direkt zur Schulung)

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| Security Awareness Training: welche Inhalte? «Security Awareness Training Inhalte» | security awareness training topics | C | I |
| Ist Security Awareness Training Pflicht? «Security Awareness Schulung Pflicht Schweiz» | is security awareness training mandatory in Switzerland | P | A |
| Wie oft schulen? «Security Awareness Training wie oft» | how often security awareness training | C | I |
| E-Learning oder Live-Schulung? «Security Awareness E-Learning oder Präsenzschulung» | e-learning vs live security awareness training | V | I |
| Was kostet es? «Security Awareness Training Kosten» | security awareness training cost Switzerland | W | C |
| Anbieter auswählen «Security Awareness Anbieter Schweiz» | choosing a security awareness provider | W | C |
| Nachweis für Audit und Versicherung «Security Awareness Nachweis ISO 27001», «Cyberversicherung Schulung Voraussetzung» | proof of security awareness training for audits and insurers | H | I |

**SERP-Befund:** «Security Awareness Training Schweiz» ist kommerziell besetzt: Zurich Versicherung, IT-Dienstleister wie zurichnetgroup, digilan, it-safety.ch und SIDD. Für die Kopf-Query ist die Chance klein. Die Chance liegt bei den Entscheidungsfragen (Inhalte, Pflicht, Häufigkeit, Nachweis), die dort nur am Rand beantwortet werden.

#### S2 · Phishing und E-Mail

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Phishing erkennen» (Merkmale mit Schweizer Beispielen: Post, SBB, eTax, Microsoft 365, Bank) | how to spot phishing emails | G/P | A |
| «Phishing Mail geklickt was tun» (Mitarbeitende und Vorgesetzte, die ersten 30 Minuten) | clicked a phishing link at work, what now | H | I |
| «Phishing melden Schweiz» (intern, und extern ans BACS; aktuelle Meldeadresse und das Formular vor dem Schreiben auf bacs.admin.ch prüfen) | report phishing in Switzerland | H | I |
| «Spear Phishing» / «gezieltes Phishing Firma» | spear phishing examples business | P | A |
| «KI Phishing erkennen» (Kampagne SUPER 2026) | spotting AI-generated phishing | P | A |
| «QR-Code Phishing» / «Quishing» | QR code phishing | G | A |
| «Smishing» / «SMS Betrug Paket» | smishing parcel SMS | G | A |

**SERP-Befund:** «Phishing Mail geklickt was tun» liefert fast nur deutsche Seiten (Vodafone.de, anwalt.de, it-forensik.de) und kleine Schweizer IT-Anbieter. Das ist eine klare Lücke für eine Schweizer Antwort mit Meldeweg und DSG-Bezug. Zu Quishing gibt es BACS und cybercrimepolice.ch; wir ergänzen den Firmenblick.

#### S3 · Betrug im Zahlungsverkehr

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «CEO Fraud» / «CEO Fraud erkennen» | CEO fraud Switzerland | P | A |
| «Rechnungsbetrug IBAN geändert» / «Business Email Compromise» | invoice fraud changed IBAN | H | I |
| «Vier-Augen-Prinzip Zahlungen KMU» / «Zahlungsfreigabe Betrug verhindern» | four-eyes principle payments | C | I |
| «Deepfake Anruf Chef» / «KI Stimme Betrug Firma» | deepfake CEO voice call fraud | P | A |
| «Geschenkkarten Betrug Chef Mail» | gift card scam boss email | G | A |

**SERP-Befund:** BACS, UBS und deutsche Kanzleien (Haftungsfragen) ranken. Es fehlt ein Prozess-Guide für die Finanzabteilung eines Schweizer KMU. Dazu passt eine Brücke zum KI-Cluster, `invoice-approval-workflow`.

#### S4 · Telefon und vor Ort (Social Engineering)

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Vishing» / «Telefonbetrug Firma» | vishing business | G | A |
| «falscher Microsoft Support Anruf» / «Fernwartung Betrug» | fake Microsoft support call at work | P | A |
| «Callback Betrug» | callback phishing | G | A |
| «Social Engineering Beispiele» (Empfang, Lieferant, Techniker) | social engineering examples office | P | A |
| «USB-Stick gefunden was tun» / «Tailgating» | found a USB stick, tailgating | G | A |

**SERP-Befund:** Zum Support-Anruf ranken Verbraucherzentralen aus Deutschland und der Blog der Kantonspolizei Bern, alles mit Privatpersonen-Fokus. Die Firmenperspektive (Helpdesk-Regeln, Rückruf über bekannte Nummer) fehlt.

#### S5 · Konten, Geräte, Homeoffice

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Passwortrichtlinie KMU» / «Passwortrichtlinie Vorlage» | password policy small business | C | I |
| «Passwort-Manager Firma» | password manager for business | V | I |
| «Zwei-Faktor-Authentifizierung einführen Mitarbeitende» / «MFA Fatigue» | rolling out MFA to staff, MFA fatigue | H | I |
| «IT-Sicherheit Homeoffice Mitarbeitende» | home office security rules | C | I |
| «privates Handy geschäftlich nutzen Sicherheit» (BYOD) | BYOD security small business | P | A |

#### S6 · Vorfall und Meldeweg

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Sicherheitsvorfall melden Mitarbeitende» / «Meldeweg IT-Vorfall» | internal incident reporting process | H | I |
| «Ransomware was tun KMU» / «Notfallplan Cyberangriff KMU» | ransomware first steps SME | H | I |
| «Meldepflicht Cyberangriff Schweiz» (klarstellen: nur kritische Infrastrukturen) | cyberattack reporting obligation Switzerland | P | A |

#### S7 · Programm und Kultur

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Phishing Simulation erlaubt» / «Phishing Test Mitarbeiter Schweiz» | are phishing simulations allowed in Switzerland | H | I |
| «Phishing Test Klickrate» / «Awareness messen» | measuring security awareness | C | I |
| «Sicherheitskultur KMU» / «Geschäftsleitung Cybersecurity Verantwortung» | security culture, management responsibility | P | A |
| «Security Onboarding neue Mitarbeitende» | security onboarding checklist | C | I |
| «Security Awareness Finanzabteilung», «… HR», «… Empfang» | role-based awareness training | H | I |
| «NIS2 Schweizer Zulieferer» / «Lieferant verlangt Security-Nachweis» | NIS2 Swiss suppliers, customer security questionnaire | P | A |

**SERP-Befund:** «Phishing-Simulation erlaubt» ist vollständig von deutschem Recht besetzt (BetrVG, Betriebsrat, DSGVO). Eine Schweizer Antwort mit ArGV 3, OR 328b und der EDÖB-Seite wäre einzigartig und passt direkt zum Zusatzangebot Phishing-Test. NIS2 für Schweizer Firmen wird schon von InfoGuard, SIDD und ncloud abgedeckt; nur mit eigenem Blick (KMU, Nachweis für den Kunden) angehen.

### Datenschutz

#### P1 · Grundlagen und Pflichten

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Datenschutzschulung Mitarbeiter» / «Datenschutzschulung Pflicht Schweiz» | data protection training for employees Switzerland | C | I |
| «nDSG KMU Checkliste» / «neues Datenschutzgesetz Pflichten KMU» | Swiss FADP obligations for SMEs | C | I |
| «Unterschied DSG DSGVO» | Swiss FADP vs GDPR | V | I |
| «DSGVO Schweizer Unternehmen» / «gilt DSGVO in der Schweiz» | does the GDPR apply to Swiss companies | P | A |
| «nDSG Busse persönlich» / «wer haftet Datenschutz Schweiz» | FADP fines personal liability | P | A |
| «Datenschutzberater Pflicht Schweiz» | is a data protection officer required in Switzerland | G | A |
| «besonders schützenswerte Personendaten Beispiele» | sensitive personal data under the FADP | G | A |

**SERP-Befund:** «Datenschutzschulung Mitarbeiter» ist von E-Learning-Anbietern (easylearn, elearning.ch, lernzentrale, datenschutz-schulung.ch) und deutschen Seiten (legiscope) besetzt. Die Lücke ist eine neutrale Antwort auf «was muss rein, wie oft, live oder E-Learning» aus Sicht eines 20–250-MA-Betriebs. «DSGVO für Schweizer Firmen» ist stark umkämpft (KMU-Portal, datenschutz.law, Infosec); nur mit konkreten Fällen angehen.

#### P2 · Datenpannen

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «E-Mail an falschen Empfänger Datenschutz» / «falsch versendete E-Mail Datenpanne» | email sent to the wrong recipient, data breach? | H | I |
| «Datenpanne melden Schweiz» / «EDÖB Meldung Datenpanne» | report a data breach to the FDPIC | H | I |
| «Datensicherheitsverletzung Beispiele» | what counts as a data security breach | G | A |
| «Laptop verloren Datenschutz» / «Handy verloren Firmendaten» | lost laptop, what to do | H | I |
| «Datenpanne dokumentieren Vorlage» | data breach log template | C | I |

**SERP-Befund:** «E-Mail an falschen Empfänger» liefert nur deutsche Seiten, die mit DSGVO-72-Stunden-Frist und deutschen Bussgeldern arbeiten. Das ist die klarste Lücke der ganzen Recherche: Schweizer Schwelle «hohes Risiko», «so rasch als möglich», EDÖB-Portal, interne Dokumentation.

#### P3 · Alltag mit Personendaten

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Personendaten per E-Mail versenden» / «E-Mail verschlüsseln Datenschutz» | sending personal data by email | H | I |
| «Kundendaten Excel weitergeben» / «Datei mit Personendaten teilen» | sharing files with personal data | H | I |
| «Clean Desk Datenschutz» / «Akten entsorgen Datenschutz» | clean desk, disposing of files | C | I |
| «Fotos Mitarbeitende Website Einwilligung» | staff photos on the website | H | I |
| «Auskunft am Telefon Identität prüfen» | verifying identity on the phone | H | I |
| «WhatsApp geschäftlich Datenschutz» | WhatsApp for business, data protection | P | A |

**SERP-Befund:** Zur E-Mail-Verschlüsselung schreiben vor allem Anbieter (SEPPmail, HIN, Reseller). Ein neutraler Entscheidungs-Guide («wann reicht TLS, wann braucht es Verschlüsselung») fehlt.

#### P4 · HR und Mitarbeitende

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Bewerbungsunterlagen aufbewahren Schweiz» | how long to keep job applications | H | I |
| «Personaldossier was darf rein» / «Aufbewahrungsfristen HR» | personnel file contents and retention | C | I |
| «Arztzeugnis Datenschutz Arbeitgeber» | medical certificates and the employer | H | I |
| «Mitarbeiterüberwachung Schweiz erlaubt» | employee monitoring in Switzerland | P | A |
| «Videoüberwachung Arbeitsplatz Schweiz» | CCTV at work Switzerland | P | A |

**SERP-Befund:** WEKA dominiert die HR-Aufbewahrung, die EDÖB-Seite die Überwachung. Nur mit praktischen Checklisten für kleine HR-Teams angehen und die Überschneidung mit `screen-job-applications-ai` beachten.

#### P5 · Rechte und Anfragen

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Recht auf Löschung Schweiz» / «Kunde will Daten löschen» | right to erasure under the FADP | H | I |
| «Datenschutzerklärung Pflicht Schweiz» | privacy notice requirement | H | I |
| «Newsletter Einwilligung Schweiz» | newsletter consent Switzerland | H | I |
| «Aufbewahrungsfristen Kundendaten» / «Löschkonzept KMU» | retention periods, deletion concept | C | I |

Das Auskunftsbegehren existiert schon im KI-Cluster (`data-subject-access-requests`): verlinken, nicht neu schreiben.

#### P6 · Dienstleister, Cloud, Ausland

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Auftragsbearbeitungsvertrag Schweiz» / «AVV DSG» | data processing agreement under the FADP | H | I |
| «Datenübermittlung USA Schweiz» / «Swiss-US Data Privacy Framework» | transferring data to the US | P | A |
| «Microsoft 365 Datenschutz Schweiz» | Microsoft 365 and Swiss data protection | P | A |
| «Datenschutz-Folgenabschätzung wann» | when a DPIA is required | H | I |

Mit dem KI-Cluster abstimmen: `ai-data-location-switzerland` und `chatgpt-customer-data-swiss-dsg` decken Datenstandort und KI-Tools ab.

### Brückenthemen (beide Schulungen)

| Frage / DE-Query | EN-Query | Typ | Funnel |
|---|---|---|---|
| «Datenschutz und Informationssicherheit Unterschied» | data protection vs information security | V | I |
| «Schulungsplan Awareness Jahresplan Vorlage» (Security und Datenschutz in einem Tag, laut Seite das beliebteste Format) | annual awareness training plan template | C | C |

### Branchen-Spokes (spätere Welle, mit dem KI-Cluster verzahnen)

Arzt- und Therapiepraxen (Gesundheitsdaten, Berufsgeheimnis), Treuhand und Anwaltskanzleien (Berufsgeheimnis, Mandantendaten), Immobilienverwaltung (Mieter- und Bewerberdossiers), Personalvermittlung (Kandidatendaten), Schulen und Kursanbieter (Daten von Minderjährigen). Jeweils nur mit branchentypischen Fällen, kein Keyword-Tausch.

---

## 7. Abgrenzung und Querverlinkung zum KI-Cluster (Site `prozess-check`)

Diese Posts existieren schon: nicht neu schreiben, sondern verlinken (Pfade `/de/prozess-check/blog/{slug}`, EN `/prozess-check/blog/{slug}`).

| Bestehender Post (EN-Key) | Berührung | Regel für den Security-Blog |
|---|---|---|
| `chatgpt-customer-data-swiss-dsg` | Kundendaten in KI-Tools | verlinken, eigenen Post nur zu «Datenpanne durch KI-Tool» |
| `shadow-ai-in-the-office`, `approve-ai-tools-allow-list`, `ai-policy-template-sme`, `ai-training-for-employees` | KI-Regeln im Team | verlinken; Security-Posts behandeln Phishing, Betrug und Datenschutz, nicht die KI-Nutzung |
| `data-subject-access-requests` | Auskunftsrecht | nicht duplizieren |
| `ai-data-location-switzerland` | Datenstandort, Übermittlung ins Ausland | P6 nur ergänzend (AVV, DPF), nicht dieselbe Frage |
| `screen-job-applications-ai` | Bewerberdaten | P4 fokussiert auf Aufbewahrung und Zugriff, nicht auf KI-Screening |
| `ai-phone-assistant` | Aufnahme von Telefonaten | S4 verlinkt ihn für Aufnahme und Einwilligung |
| `invoice-approval-workflow` | Zahlungsfreigabe | S3 verlinkt ihn als Umsetzung des Vier-Augen-Prinzips |
| `ai-in-medical-practices`, `ai-for-law-firms` | Berufsgeheimnis | Branchen-Spokes verlinken sie |

Ob Body-Links zwischen den Sites `security` und `prozess-check` gewünscht sind, entscheidet Robert. Der Validator erlaubt heute nur die Pfade des KI-Clusters und muss für `site: security` erweitert werden (erlaubte Seiten `/de/security`, `/de/security/security-awareness`, `/de/security/datenschutz` und `/de/security/blog/...`).

---

## 8. Funnel und CTA

| Funnel | Ziel | CTA |
|---|---|---|
| awareness | Problem verstehen (Phishing, CEO-Fraud, Busse, Datenpanne) | leicht: Link zur passenden Schulungsseite |
| interest | Aufgabe erledigen (Meldeweg, Prozess, Checkliste) | Schulungsseite, dazu ein Satz, was die Schulung abdeckt |
| consideration | Schulung wählen (Inhalte, Kosten, Format, Anbieter, Nachweis) | Discovery Call mit Riccardo Conti plus Schulungsseite |

- Security-Themen führen zu `/de/security/security-awareness`, Datenschutz-Themen zu `/de/security/datenschutz`. Brückenthemen führen zu `/de/security` mit dem Hinweis auf den kombinierten Tag.
- Vorgeschlagener Mix für die erste Welle: etwa 35 % awareness, 45 % interest, 20 % consideration. Mehr Awareness als im KI-Cluster, weil viele Fragen (Phishing, CEO-Fraud, Bussen) informativ sind.

**Autorenschaft (E-E-A-T):** Für Security und Datenschutz zählt die fachliche Person. Robert sollte entscheiden, ob Posts als Autor «Riccardo Conti» tragen oder von ihm geprüft werden («fachlich geprüft von …»). Das Frontmatter hat heute nur `author: "Aurum Avis Labs"`.

---

## 9. Vorschlag erste Welle (26 Topics)

Priorität nach Lücke in den Suchergebnissen, Nähe zum Kauf und Schweizer Eigenheit. Die Slugs sind Vorschläge; der Koordinator legt sie im Plan fest.

| # | Cluster | Arbeitstitel DE | DE-Query | Typ | Funnel | Warum |
|---|---|---|---|---|---|---|
| 1 | S2 | Auf einen Phishing-Link geklickt: die ersten 30 Minuten | Phishing Mail geklickt was tun | H | I | Lücke, hohe Dringlichkeit |
| 2 | S7 | Phishing-Simulation im Betrieb: was in der Schweiz erlaubt ist | Phishing Simulation erlaubt | H | I | Lücke (nur DE-Recht), passt zum Phishing-Test |
| 3 | S1 | Security Awareness Training: welche Themen hineingehören | Security Awareness Training Inhalte | C | I | Kernfrage des ICP |
| 4 | S1 | Ist Security Awareness Training Pflicht? Gesetz, Versicherung, Kunden | Security Awareness Schulung Pflicht Schweiz | P | A | Auslöser |
| 5 | S3 | CEO-Fraud: wie er abläuft und wie Sie ihn stoppen | CEO Fraud | P | A | BACS-Zahlen, Finanzabteilung |
| 6 | S3 | Rechnung mit geänderter IBAN: der Freigabeprozess, der schützt | Rechnungsbetrug IBAN geändert | H | I | BEC, Prozess-Lücke |
| 7 | S2 | Phishing erkennen: die Merkmale, mit Schweizer Beispielen | Phishing erkennen | G/P | A | Volumen, Einstieg |
| 8 | S2 | KI-Phishing und Deepfakes: was sich geändert hat | KI Phishing erkennen | P | A | SUPER 2026, Aktualität |
| 9 | S6 | Meldeweg für Sicherheitsvorfälle: wer wen wann anruft | Sicherheitsvorfall melden Mitarbeitende | H | I | Schulungsinhalt, Vorlage |
| 10 | S1 | E-Learning oder Live-Schulung: was bei 20–250 Mitarbeitenden wirkt | Security Awareness E-Learning oder Präsenz | V | I | Entscheid gegen Plattform-Anbieter |
| 11 | S7 | Awareness messen: Klickrate, Meldequote, Wiederholung | Security Awareness messen | C | I | Nachweis |
| 12 | S1 | Security-Awareness-Anbieter wählen: Inhalte, Nachweis, Preis | Security Awareness Anbieter Schweiz | W | C | Kaufnah |
| 13 | S4 | Falscher IT-Support am Telefon: Regeln für Empfang und Team | falscher Microsoft Support Anruf | P | A | Lücke (Firmenblick) |
| 14 | P2 | E-Mail an den falschen Empfänger: ist das eine Datenpanne? | E-Mail an falschen Empfänger Datenschutz | H | I | klarste Lücke |
| 15 | P2 | Datenpanne melden: wann an den EDÖB, wie, wie schnell | Datenpanne melden Schweiz | H | I | Pflicht, EDÖB-Leitfaden 2025 |
| 16 | P1 | Datenschutzschulung für Mitarbeitende: Pflicht und Inhalte nach DSG | Datenschutzschulung Mitarbeiter | C | I | Kernfrage |
| 17 | P1 | nDSG-Pflichten für KMU mit 20–250 Mitarbeitenden (Checkliste) | nDSG KMU Checkliste | C | I | Einstieg |
| 18 | P1 | Bussen nach DSG: wer persönlich haftet und wofür | nDSG Busse persönlich | P | A | Angst-Treiber, EDÖB-Quelle |
| 19 | P3 | Personendaten per E-Mail: was geht, was nicht | Personendaten per E-Mail versenden | H | I | neutraler Guide fehlt |
| 20 | P1 | DSG oder DSGVO: was für Ihre Firma gilt | Unterschied DSG DSGVO | V | I | häufige Verwechslung |
| 21 | P4 | Bewerbungsunterlagen und Personaldossier: aufbewahren und löschen | Bewerbungsunterlagen aufbewahren Schweiz | H | I | HR-Alltag |
| 22 | P4 | Mitarbeitende überwachen: was Arbeitgeber dürfen | Mitarbeiterüberwachung Schweiz | P | A | EDÖB, ArGV 3 |
| 23 | P1 | Besonders schützenswerte Personendaten im Büroalltag | besonders schützenswerte Personendaten Beispiele | G | A | Grundlagenbegriff |
| 24 | P6 | Auftragsbearbeitung: wann Sie mit IT-Partner und Cloud einen Vertrag brauchen | Auftragsbearbeitungsvertrag Schweiz | H | I | Art. 9 DSG, MSP-Realität |
| 25 | Brücke | Datenschutz und Informationssicherheit: der Unterschied, und was geschult werden muss | Datenschutz Informationssicherheit Unterschied | V | I | verbindet beide Schulungen |
| 26 | Brücke | Jahresplan Awareness: Security und Datenschutz an einem Tag | Schulungsplan Awareness Vorlage | C | C | kombinierter Tag |

Die Reserve für die zweite Welle ist alles andere aus Abschnitt 6: Passwortrichtlinie, MFA, Homeoffice, QR-Code, Ransomware-Notfallplan, Onboarding, Finanzabteilung, NIS2-Zulieferer, Clean Desk, Fotos, Newsletter, Löschkonzept, Datenschutzerklärung, DSFA, US-Übermittlung, Videoüberwachung, Datenschutzberater und die Branchen-Spokes.

---

## 10. Offene Punkte

1. **Suchvolumen messen** (Keyword Planner, Search Console, SEO-Tool) und die Reihenfolge in Abschnitt 9 danach anpassen.
2. **Robert entscheidet:**
   - Autorenschaft durch Riccardo Conti
   - Phishing-Test inklusive oder Zusatz (Widerspruch auf der Seite)
   - Wortlaut «konform»
   - Kadenz des Security-Blogs
   - Querlinks zwischen den Sites
3. **Vor dem Schreiben verifizieren**, weil nur über Sekundärquellen oder gar nicht geprüft:
   - fedlex-Texte zu Art. 8 und Art. 61 DSG, Art. 1–3 DSV, Art. 3 Abs. 1 lit. o UWG
   - Wortlaut von Art. 20 NIS2 auf EUR-Lex
   - Swiss-U.S. DPF beim EDÖB
   - Versicherer-Anforderungen pro Versicherer
4. **Validator erweitern** für `site: security` (erlaubte Pfade) und die Topic-Tabelle in einen `calendar.json`-Plan überführen, wie beim KI-Cluster.
5. **Nicht versprechen:** «konform», «rechtssicher», garantierte Wirkung, Prozentsätze zu Klickraten ohne eigene Messung, erfundene Vorfälle von Kunden.

---

## 11. Referenzen

**Bund und Behörden**
- BACS Halbjahresbericht 2025/2: https://www.bacs.admin.ch/de/hjb-25-2-de
- BACS Lageberichte: https://www.bacs.admin.ch/de/lageberichte
- BACS Woche 4/2026 «Dringende Überweisung» (CEO-Fraud): https://www.bacs.admin.ch/de/26w4-de
- BACS Business E-Mail Compromise: https://www.bacs.admin.ch/de/business-email-compromise-de
- BACS Woche 30/2026 (KI-Bilder und -Videos): https://www.bacs.admin.ch/de/26w30-de
- BACS Woche 43/2024 und 31/2024 (QR-Codes): https://www.bacs.admin.ch/de/24w43-de · https://www.bacs.admin.ch/de/24w31-de
- BACS Kampagne «SUPER, oder?» 2026: https://www.bacs.admin.ch/de/26super-1-de · https://www.s-u-p-e-r.ch/de/ueber-uns/
- BACS Meldepflicht kritische Infrastrukturen: https://www.bacs.admin.ch/de/25-mp-de · https://www.bacs.admin.ch/de/informationen-zur-meldepflicht
- EDÖB Strafbestimmungen: https://www.edoeb.admin.ch/de/strafbestimmungen
- EDÖB Leitfaden Meldung von Datensicherheitsverletzungen: https://www.edoeb.admin.ch/dam/de/sd-web/T64CAUyvAMcF/1_2%20Leitfaden%20des%20ED%C3%96B%20betreffend%20die%20Meldung%20von%20Datensicherheitsverletzungen%20und%20Information%20der%20Betroffenen%20nach%20Art.%2024%20DSG_DE.pdf
- EDÖB Technische Überwachung am Arbeitsplatz: https://www.edoeb.admin.ch/de/technische-mittel-zur-uberwachung-am-arbeitsplatz
- SECO Wegleitung Art. 26 ArGV 3: https://www.seco.admin.ch/dam/seco/de/dokumente/Arbeit/Arbeitsbedingungen/Arbeitsgesetz%20und%20Verordnungen/Wegleitungen/Wegleitungen%203/ArGV3_art26.pdf.download.pdf/ArGV3_art26_de.pdf
- KMU-Portal Cybersicherheit: https://www.kmu.admin.ch/de/cybersicherheit
- KMU-Portal EU-Datenschutz: https://www.kmu.admin.ch/de/eu-regelung-zum-datenschutz-neue-eu-verordnung
- fedlex DSG: https://www.fedlex.admin.ch/eli/cc/2022/491/de · DSV: https://www.fedlex.admin.ch/eli/cc/2022/568/de

**Studien**
- Deloitte 2026 «Unterschätzt, ungeschützt, unterversichert»: https://www.allnews.ch/sites/default/files/ckfinder/userfiles/Deloitte%20Cyber%20Studie%202026_0.pdf
- KMU-Cybersicherheit 2025: https://cyberstudie.ch/ · Zusammenfassung: https://www.digitalsecurityswitzerland.ch/hubfs/Summary-KMU-Cybersicherheit-2025.pdf
- Mobiliar Cybersicherheit Schweiz 2024: https://www.mobiliar.ch/studie/cybersicherheit-schweiz

**Normen und Einordnungen (Sekundärquellen)**
- ISO 27001 A 6.3: https://www.upguard.com/compliance/iso-27001/6-3/
- Art. 24 DSV (Wortlaut): https://www.activemind.ch/gesetze/dsv/artikel-24/
- NIS2 und die Schweiz: https://www.infoguard.ch/de/blog/nis2-leitfaden-so-gelingt-die-umsetzung

**Wettbewerb in den Suchergebnissen (Stand 30.9.2026, zur Einordnung, nicht zitieren)**
- Security Awareness: Zurich Versicherung, zurichnetgroup, digilan, it-safety.ch, SIDD
- Datenschutzschulung: easylearn, elearning.ch, lernzentrale, datenschutz-schulung.ch, datenschutzkonform.ch, legiscope (DE)
- HR-Datenschutz: WEKA
- E-Mail-Verschlüsselung: SEPPmail, HIN
- NIS2: InfoGuard, SIDD, ncloud
