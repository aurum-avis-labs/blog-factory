#!/usr/bin/env python3
"""Build the security-blog calendar. One article per calendar day from 2026-10-01."""
import json
import re
from datetime import date, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
PLAN = Path(__file__).resolve().parent
EN = REPO / "brands" / "aurum" / "en"
DE = REPO / "brands" / "aurum" / "de"

# owner, type, funnel, floor, ceiling, query_de, query_en, en_slug, de_slug, cta, apart
Row = tuple

FIRST: list[Row] = [
    ("A2", "howto", "interest", 900, 1600, "Phishing Mail geklickt was tun", "clicked a phishing link at work, what now", "clicked-a-phishing-link-at-work", "phishing-link-geklickt", "security", "Erste 30 Minuten für Mitarbeitende und Vorgesetzte. Nicht die Merkmalliste."),
    ("A1", "howto", "interest", 900, 1600, "Phishing Simulation erlaubt", "are phishing simulations allowed in Switzerland", "phishing-simulations-allowed-switzerland", "phishing-simulation-erlaubt", "security", "ArGV 3 und OR 328b, nicht deutsches BetrVG. Den Zusatz Phishing-Test zu CHF 600 nicht nennen."),
    ("A1", "checklist", "interest", 800, 1400, "Security Awareness Training Inhalte", "security awareness training topics", "security-awareness-training-topics", "security-awareness-training-inhalte", "security", "Welche Themen in die Schulung gehören. Nicht die Anbieterwahl."),
    ("A1", "problem", "awareness", 700, 1200, "Security Awareness Schulung Pflicht Schweiz", "is security awareness training mandatory in Switzerland", "is-security-awareness-training-mandatory-switzerland", "security-awareness-schulung-pflicht", "security", "Gesetz, Versicherung, Kunde. Keine erfundenen Versicherer-Pflichten."),
    ("A3", "problem", "awareness", 700, 1200, "CEO Fraud", "CEO fraud Switzerland", "ceo-fraud-switzerland", "ceo-fraud-erkennen", "security", "Ablauf und Stopp für die Finanzabteilung. Nicht der IBAN-Freigabeprozess."),
    ("A3", "howto", "interest", 900, 1600, "Rechnungsbetrug IBAN geändert", "invoice fraud changed IBAN", "invoice-fraud-changed-iban", "rechnungsbetrug-iban-geaendert", "security", "Freigabeprozess. Vier-Augen-Artikel ist ein anderer Post."),
    ("A2", "problem", "awareness", 700, 1200, "Phishing erkennen", "how to spot phishing emails", "how-to-spot-phishing-emails", "phishing-erkennen", "security", "Merkmale mit Schweizer Beispielen: Post, SBB, eTax, Microsoft 365, Bank. Keine echten Markenlogos behaupten."),
    ("A2", "problem", "awareness", 700, 1200, "KI Phishing erkennen", "spotting AI-generated phishing", "spotting-ai-generated-phishing", "ki-phishing-erkennen", "security", "Kampagne SUPER 2026. Nicht der Deepfake-Anruf."),
    ("A3", "howto", "interest", 900, 1600, "Sicherheitsvorfall melden Mitarbeitende", "internal incident reporting process", "internal-incident-reporting", "sicherheitsvorfall-melden", "security", "Interner Meldeweg. Nicht die gesetzliche Meldepflicht kritischer Infrastrukturen."),
    ("A1", "compare", "interest", 1200, 2000, "Security Awareness E-Learning oder Präsenzschulung", "e-learning vs live security awareness training", "e-learning-vs-live-security-awareness", "security-awareness-e-learning-oder-praesenz", "security", "Wer welches Format braucht. Aurum macht Live, 1 bis 2 Stunden, remote oder vor Ort."),
    ("A1", "checklist", "interest", 800, 1400, "Security Awareness messen", "measuring security awareness", "measuring-security-awareness", "security-awareness-messen", "security", "Klickrate, Meldequote, Wiederholung. Keine erfundenen Klickraten."),
    ("A1", "worth", "consideration", 900, 1600, "Security Awareness Anbieter Schweiz", "choosing a security awareness provider", "choosing-a-security-awareness-provider-switzerland", "security-awareness-anbieter-schweiz", "security", "Inhalte, Nachweis, Preis. Preise nur CHF 1'190 und CHF 2'190. Phishing-Test CHF 600 weglassen."),
    ("A2", "problem", "awareness", 700, 1200, "falscher Microsoft Support Anruf", "fake Microsoft support call at work", "fake-microsoft-support-call-at-work", "falscher-it-support-anruf", "security", "Regeln für Empfang und Team. Nicht die Privatpersonen-Seiten."),
    ("A4", "howto", "interest", 900, 1600, "E-Mail an falschen Empfänger Datenschutz", "email sent to the wrong recipient, data breach", "email-sent-to-the-wrong-recipient", "e-mail-an-falschen-empfaenger", "privacy", "Schweizer Schwelle hohes Risiko, nicht die DSGVO-72-Stunden."),
    ("A4", "howto", "interest", 900, 1600, "Datenpanne melden Schweiz", "report a data breach to the FDPIC", "report-a-data-breach-to-the-fdpic", "datenpanne-an-den-edoeb-melden", "privacy", "EDÖB, so rasch als möglich, Portal databreach.edoeb.admin.ch. Nicht BACS-Meldepflicht."),
    ("A4", "checklist", "interest", 800, 1400, "Datenschutzschulung Mitarbeiter", "data protection training for employees Switzerland", "data-protection-training-for-employees", "datenschutzschulung-mitarbeitende", "privacy", "Pflicht und Inhalte nach DSG. Nicht «konform» schreiben. Schulung nach DSG und DSGVO."),
    ("A4", "checklist", "interest", 800, 1400, "nDSG KMU Checkliste", "Swiss FADP obligations for SMEs", "swiss-fadp-obligations-for-smes", "ndsg-pflichten-fuer-kmu", "privacy", "20 bis 250 Mitarbeitende. Nicht das Verzeichnis für Konzerne."),
    ("A4", "problem", "awareness", 700, 1200, "nDSG Busse persönlich", "FADP fines personal liability", "fadp-fines-and-personal-liability", "dsg-busse-wer-haftet", "privacy", "Bis CHF 250'000 gegen natürliche Personen, Vorsatz. EDÖB-Quelle."),
    ("A5", "howto", "interest", 900, 1600, "Personendaten per E-Mail versenden", "sending personal data by email", "sending-personal-data-by-email", "personendaten-per-e-mail-senden", "privacy", "Wann TLS reicht und wann nicht. Kein Produktvergleich von Verschlüsselungsanbietern."),
    ("A4", "compare", "interest", 1200, 2000, "Unterschied DSG DSGVO", "Swiss FADP vs GDPR", "swiss-fadp-vs-gdpr", "dsg-und-dsgvo-unterschied", "privacy", "Was für welche Firma gilt. Der Artikel «gilt die DSGVO» ist der Nachbar, nicht dieselbe Seite."),
    ("A5", "howto", "interest", 900, 1600, "Bewerbungsunterlagen aufbewahren Schweiz", "how long to keep job applications", "how-long-to-keep-job-applications-switzerland", "bewerbungsunterlagen-aufbewahren", "privacy", "Aufbewahrung und Löschen. Nicht KI-Screening. bewerbungen-vorsortieren-ki nicht verlinken, der Post ist erst 2027-01-12 live."),
    ("A5", "problem", "awareness", 700, 1200, "Mitarbeiterüberwachung Schweiz", "employee monitoring in Switzerland", "employee-monitoring-in-switzerland", "mitarbeitende-ueberwachen-schweiz", "privacy", "EDÖB und ArGV 3. Videoüberwachung ist ein eigener Post."),
    ("A4", "glossary", "awareness", 400, 800, "besonders schützenswerte Personendaten Beispiele", "sensitive personal data under the FADP", "sensitive-personal-data-under-the-fadp", "besonders-schuetzenswerte-personendaten", "privacy", "Beispiele aus dem Büroalltag. Nicht der ganze Pflichtenkatalog."),
    ("A6", "howto", "interest", 900, 1600, "Auftragsbearbeitungsvertrag Schweiz", "data processing agreement under the FADP", "data-processing-agreement-under-the-fadp", "auftragsbearbeitung-vertrag-schweiz", "privacy", "Art. 9 DSG, IT-Partner und Cloud. Nicht die USA-Übermittlung."),
    ("A4", "compare", "interest", 1200, 2000, "Datenschutz und Informationssicherheit Unterschied", "data protection vs information security", "data-protection-vs-information-security", "datenschutz-oder-informationssicherheit", "overview", "Beide Schulungen. Nicht der Jahresplan."),
    ("A1", "checklist", "consideration", 800, 1400, "Schulungsplan Awareness Vorlage", "annual awareness training plan template", "annual-awareness-training-plan", "jahresplan-security-und-datenschutz", "overview", "Security und Datenschutz an einem Tag. Kombinierter Tag ist das auf der Datenschutz-Seite genannte Format."),
]

SEC_REST: list[Row] = [
    ("A1", "checklist", "interest", 800, 1400, "Security Awareness Training wie oft", "how often security awareness training", "how-often-to-run-security-awareness-training", "security-awareness-wie-oft", "security", "Einmal, jährlich, bei Eintritt. Nicht der Pflicht-Artikel."),
    ("A1", "howto", "interest", 900, 1600, "Security Awareness Nachweis ISO 27001", "proof of security awareness training for audits", "proof-of-security-awareness-training", "security-awareness-nachweis", "security", "Teilnahme, Inhalte, Wirkung für Audit und Versicherung. Keine erfundenen Versicherer-Kataloge."),
    ("A2", "howto", "interest", 900, 1600, "Phishing melden Schweiz", "report phishing in Switzerland", "how-to-report-phishing-in-switzerland", "phishing-melden-schweiz", "security", "Intern und extern an BACS. Nicht der Klick-Artikel."),
    ("A3", "checklist", "interest", 800, 1400, "Vier-Augen-Prinzip Zahlungen KMU", "four-eyes principle payments", "four-eyes-principle-for-payments", "vier-augen-prinzip-zahlungen", "security", "Prozess für die Finanzabteilung. Prozess-Check-Post zur Rechnungsfreigabe nur verlinken, wenn das Datum es erlaubt."),
    ("A3", "problem", "awareness", 700, 1200, "Deepfake Anruf Chef", "deepfake CEO voice call fraud", "deepfake-ceo-voice-call-fraud", "deepfake-anruf-vom-chef", "security", "KI-Stimme. Nicht der CEO-Fraud per E-Mail und nicht das KI-Phishing in der Mailbox."),
    ("A2", "problem", "awareness", 700, 1200, "Spear Phishing", "spear phishing examples business", "spear-phishing-against-a-business", "spear-phishing-gegen-die-firma", "security", "Gezieltes Phishing an eine Firma. Nicht die allgemeine Merkmalliste."),
    ("A3", "checklist", "interest", 800, 1400, "Passwortrichtlinie KMU", "password policy small business", "password-policy-for-a-small-business", "passwortrichtlinie-kmu", "security", "Vorlage für 20 bis 250 Personen. Nicht der Passwort-Manager-Vergleich und nicht das geteilte Team-Passwort."),
    ("A2", "glossary", "awareness", 400, 800, "QR-Code Phishing", "QR code phishing", "qr-code-phishing", "qr-code-phishing-quishing", "security", "Quishing, Firmenblick. BACS-Fälle als fremde Meldung zitieren."),
    ("A3", "howto", "interest", 900, 1600, "Zwei-Faktor-Authentifizierung einführen Mitarbeitende", "rolling out MFA to staff", "rolling-out-mfa-to-staff", "mfa-fuer-mitarbeitende-einfuehren", "security", "Einführung und MFA Fatigue. Kein Produktvergleich von Authenticator-Apps."),
    ("A2", "glossary", "awareness", 400, 800, "Smishing", "smishing parcel SMS", "smishing-parcel-text-messages", "smishing-sms-paket", "security", "SMS-Betrug, Paket. Nicht Quishing."),
    ("A3", "checklist", "interest", 800, 1400, "IT-Sicherheit Homeoffice Mitarbeitende", "home office security rules", "home-office-security-rules-for-staff", "it-sicherheit-im-homeoffice", "security", "Regeln, die das Team anwenden kann. Nicht BYOD."),
    ("A2", "glossary", "awareness", 400, 800, "Vishing", "vishing business", "vishing-calls-at-work", "vishing-telefonbetrug-firma", "security", "Telefonbetrug in der Firma. Nicht der falsche Microsoft-Support im Detail und nicht Callback."),
    ("A3", "problem", "awareness", 700, 1200, "privates Handy geschäftlich nutzen Sicherheit", "BYOD security small business", "byod-security-for-a-small-business", "privates-handy-geschaeftlich", "security", "BYOD. Nicht Homeoffice-Regeln und nicht WhatsApp-Datenschutz."),
    ("A2", "glossary", "awareness", 400, 800, "Callback Betrug", "callback phishing", "callback-phishing", "callback-betrug", "security", "Rückruf-Masche. Nicht Vishing allgemein."),
    ("A3", "howto", "interest", 900, 1600, "Ransomware was tun KMU", "ransomware first steps SME", "ransomware-first-steps-for-an-sme", "ransomware-erste-schritte-kmu", "security", "Erste Schritte und Notfallplan. Die meisten KMU haben keine BACS-Meldepflicht."),
    ("A2", "problem", "awareness", 700, 1200, "Social Engineering Beispiele", "social engineering examples office", "social-engineering-at-the-office", "social-engineering-im-buero", "security", "Empfang, Lieferant, Techniker. Nicht nur Phishing-Mails."),
    ("A3", "problem", "awareness", 700, 1200, "Meldepflicht Cyberangriff Schweiz", "cyberattack reporting obligation Switzerland", "cyberattack-reporting-obligation-switzerland", "meldepflicht-cyberangriff-schweiz", "security", "Klarstellen: nur kritische Infrastrukturen seit 1.4.2025, 24 Stunden an BACS. Die meisten KMU nicht."),
    ("A2", "glossary", "awareness", 400, 800, "USB-Stick gefunden was tun", "found a USB stick, tailgating", "found-a-usb-stick-and-tailgating", "usb-stick-gefunden-tailgating", "security", "Gefundener Stick und Tailgating. Ein Artikel, zwei Situationen."),
    ("A3", "glossary", "awareness", 400, 800, "Geschenkkarten Betrug Chef Mail", "gift card scam boss email", "gift-card-scam-boss-email", "geschenkkarten-betrug-chef-mail", "security", "Chef bittet per Mail um Gutscheine. Nicht CEO-Fraud mit Überweisung."),
    ("A1", "problem", "awareness", 700, 1200, "Sicherheitskultur KMU", "security culture and management responsibility", "security-culture-and-management", "sicherheitskultur-und-geschaeftsleitung", "security", "Verantwortung der Geschäftsleitung. Nicht das Mess-Artikel."),
    ("A3", "compare", "interest", 1200, 2000, "Passwort-Manager Firma", "password manager for business", "password-manager-for-a-business", "passwort-manager-fuer-die-firma", "security", "Gemeinsamer Tresor gegen geteiltes Passwort und gegen eine Liste in Excel. Keine Rangliste mit erfundenen Preisen."),
    ("A1", "checklist", "interest", 800, 1400, "Security Onboarding neue Mitarbeitende", "security onboarding checklist", "security-onboarding-for-new-staff", "security-onboarding-neue-mitarbeitende", "security", "Erster Tag. Offboarding ist ein anderer Post."),
    ("A6", "howto", "interest", 900, 1600, "E-Mail Weiterleitungsregeln prüfen", "check mailbox forwarding rules", "check-mailbox-forwarding-rules", "e-mail-weiterleitungsregeln-pruefen", "security", "BACS-Empfehlung bei Business-E-Mail-Compromise. Nicht der IBAN-Artikel."),
    ("A1", "howto", "interest", 900, 1600, "Security Awareness Finanzabteilung HR Empfang", "role-based awareness training", "role-based-security-awareness-training", "security-awareness-nach-rolle", "security", "Ein Artikel, drei Rollen: Finanz, HR, Empfang. Nicht drei Kopien."),
    ("A6", "checklist", "interest", 800, 1400, "Zugänge entziehen wenn jemand geht", "remove access when someone leaves", "remove-access-when-someone-leaves", "zugaenge-entziehen-beim-austritt", "security", "Offboarding. Nicht das Onboarding."),
    ("A1", "problem", "awareness", 700, 1200, "NIS2 Schweizer Zulieferer", "NIS2 for Swiss suppliers", "nis2-for-swiss-suppliers", "nis2-fuer-schweizer-zulieferer", "security", "Gilt nicht direkt. Druck kommt über Verträge. Art. 20 nur nach geprüftem Wortlaut, sonst als Einordnung kennzeichnen."),
    ("A6", "problem", "awareness", 700, 1200, "geteiltes Passwort im Team", "shared team password", "shared-team-passwords", "geteiltes-passwort-im-team", "security", "Ein Passwort für den Shop oder das Postfach. Nicht die Passwortrichtlinie als Vorlage."),
    ("A1", "worth", "consideration", 900, 1600, "Security Awareness Training Kosten", "security awareness training cost Switzerland", "security-awareness-training-cost-switzerland", "security-awareness-training-kosten", "security", "Nur CHF 1'190 Standard bis 25 und CHF 2'190 Plus bis 50, Custom auf Anfrage. Phishing-Test CHF 600 weglassen. Wer nicht buchen sollte."),
]

PRIV_REST: list[Row] = [
    ("A4", "problem", "awareness", 700, 1200, "gilt DSGVO in der Schweiz", "does the GDPR apply to Swiss companies", "does-the-gdpr-apply-to-swiss-companies", "gilt-die-dsgvo-in-der-schweiz", "privacy", "Art. 3 Abs. 2, Angebot an Personen in der EU oder Beobachten. Nicht der ganze Vergleich DSG gegen DSGVO."),
    ("A4", "howto", "interest", 900, 1600, "Laptop verloren Datenschutz", "lost laptop what to do", "lost-laptop-with-personal-data", "laptop-verloren-personendaten", "privacy", "Laptop oder Handy mit Firmendaten. Nicht die allgemeine EDÖB-Meldung als eigener Ablauf, darauf verweisen."),
    ("A4", "checklist", "interest", 800, 1400, "Datenpanne dokumentieren Vorlage", "data breach log template", "data-breach-log-template", "datenpanne-dokumentieren", "privacy", "Interne Dokumentation, mindestens zwei Jahre, auch wenn nicht gemeldet wird."),
    ("A4", "glossary", "awareness", 400, 800, "Datensicherheitsverletzung Beispiele", "what counts as a data security breach", "what-counts-as-a-data-security-breach", "was-ist-eine-datensicherheitsverletzung", "privacy", "Beispiele. Die falsche E-Mail ist der Nachbarartikel."),
    ("A4", "glossary", "awareness", 400, 800, "Datenschutzberater Pflicht Schweiz", "is a data protection adviser required in Switzerland", "is-a-data-protection-adviser-required-in-switzerland", "datenschutzberater-pflicht-schweiz", "privacy", "Keine allgemeine Pflicht wie ein deutscher DSB. Nicht die persönliche Busse."),
    ("A5", "howto", "interest", 900, 1600, "Kundendaten Excel weitergeben", "sharing files with personal data", "sharing-files-that-contain-personal-data", "dateien-mit-personendaten-teilen", "privacy", "Excel, Link, Stick. Nicht der E-Mail-Versand als eigener Artikel."),
    ("A5", "checklist", "interest", 800, 1400, "Clean Desk Datenschutz", "clean desk and disposing of files", "clean-desk-and-disposing-of-files", "clean-desk-und-akten-entsorgen", "privacy", "Schreibtisch und Aktenentsorgung am selben Tag anwendbar."),
    ("A5", "howto", "interest", 900, 1600, "Fotos Mitarbeitende Website Einwilligung", "staff photos on the website", "staff-photos-on-the-website", "mitarbeiterfotos-auf-der-website", "privacy", "Einwilligung, Widerruf, alte Fotos. Kein erfundenes Urteil."),
    ("A5", "howto", "interest", 900, 1600, "Auskunft am Telefon Identität prüfen", "verifying identity on the phone", "verifying-identity-on-the-phone", "identitaet-am-telefon-pruefen", "privacy", "Bevor Personendaten am Telefon herausgegeben werden. ki-telefonassistent nicht verlinken, erst 2027-02-18."),
    ("A5", "problem", "awareness", 700, 1200, "WhatsApp geschäftlich Datenschutz", "WhatsApp for business and data protection", "whatsapp-for-business-and-data-protection", "whatsapp-geschaeftlich-datenschutz", "privacy", "Geschäftsliche Nutzung, nicht die private Familiengruppe. Nicht BYOD allgemein."),
    ("A5", "checklist", "interest", 800, 1400, "Personaldossier was darf rein", "personnel file contents and retention", "personnel-file-contents-and-retention", "personaldossier-inhalt-und-fristen", "privacy", "Inhalt und Fristen. Bewerbungsunterlagen sind der Nachbar, nicht dieselbe Liste."),
    ("A5", "howto", "interest", 900, 1600, "Arztzeugnis Datenschutz Arbeitgeber", "medical certificates and the employer", "medical-certificates-and-the-employer", "arztzeugnis-und-datenschutz", "privacy", "Was der Arbeitgeber sehen darf. Nicht die Praxis als Branche."),
    ("A5", "problem", "awareness", 700, 1200, "Videoüberwachung Arbeitsplatz Schweiz", "CCTV at work in Switzerland", "cctv-at-work-in-switzerland", "video-ueberwachung-am-arbeitsplatz", "privacy", "Arbeitsplatz, nicht das Ladenlokal als eigener Ratgeber. Überwachung allgemein ist der Nachbar."),
    ("A5", "howto", "interest", 900, 1600, "Recht auf Löschung Schweiz", "right to erasure under the FADP", "right-to-erasure-under-the-fadp", "recht-auf-loeschung-schweiz", "privacy", "Kunde will Daten löschen. Auskunftsbegehren nicht neu schreiben und nicht verlinken, der Post ist erst 2027-01-21 live."),
    ("A5", "howto", "interest", 900, 1600, "Datenschutzerklärung Pflicht Schweiz", "privacy notice requirement Switzerland", "privacy-notice-requirement-switzerland", "datenschutzerklaerung-pflicht-schweiz", "privacy", "Was eine Erklärung leisten muss. Keine Mustervorlage zum Kopieren als Rechtsprodukt."),
    ("A5", "howto", "interest", 900, 1600, "Newsletter Einwilligung Schweiz", "newsletter consent Switzerland", "newsletter-consent-in-switzerland", "newsletter-einwilligung-schweiz", "privacy", "UWG Art. 3 Abs. 1 lit. o. Nicht DSGVO-Newsletter aus Deutschland."),
    ("A5", "checklist", "interest", 800, 1400, "Aufbewahrungsfristen Kundendaten", "retention periods and a deletion concept", "retention-periods-and-a-deletion-concept", "aufbewahrung-und-loeschkonzept", "privacy", "Löschkonzept für Kundendaten. HR-Fristen bleiben im Personaldossier-Artikel."),
    ("A6", "problem", "awareness", 700, 1200, "Datenübermittlung USA Schweiz", "transferring personal data to the United States", "transferring-personal-data-to-the-united-states", "daten-in-die-usa-uebermitteln", "privacy", "Swiss-U.S. Data Privacy Framework nur für zertifizierte US-Firmen. ki-datenstandort-schweiz ist erst 2026-12-11 live, nur verlinken wenn pubDate das erlaubt."),
    ("A6", "problem", "awareness", 700, 1200, "Microsoft 365 Datenschutz Schweiz", "Microsoft 365 and Swiss data protection", "microsoft-365-and-swiss-data-protection", "microsoft-365-datenschutz-schweiz", "privacy", "Was eine Firma mit M365 klären muss. Keine erfundenen Microsoft-Zusagen. AVV ist der Nachbar."),
    ("A6", "howto", "interest", 900, 1600, "Datenschutz-Folgenabschätzung wann", "when a DPIA is required", "when-a-dpia-is-required-in-switzerland", "datenschutz-folgenabschaetzung-wann", "privacy", "Wann, nicht eine vollständige DSFA schreiben. Besonders schützenswerte Daten sind der Nachbar."),
    ("A6", "checklist", "interest", 800, 1400, "Datenschutz und Security in der Arztpraxis", "data protection and security for a medical practice", "data-protection-and-security-for-a-medical-practice", "datenschutz-und-security-in-der-praxis", "overview", "Gesundheitsdaten und Berufsgeheimnis, eigene Fälle. ki-in-der-arztpraxis nur verlinken, wenn das Datum es erlaubt. Kein Keyword-Tausch der anderen Branchen."),
    ("A6", "checklist", "interest", 800, 1400, "Datenschutz Treuhand und Anwaltskanzlei", "data protection for fiduciaries and law firms", "data-protection-for-fiduciaries-and-law-firms", "datenschutz-treuhand-und-kanzlei", "overview", "Ein Artikel, zwei Berufe, Mandantengeheimnis. ki-in-der-anwaltskanzlei ist erst 2026-12-23 live, nicht verlinken."),
    ("A6", "checklist", "interest", 800, 1400, "Datenschutz Immobilienverwaltung", "data protection for property managers", "data-protection-for-property-managers", "datenschutz-in-der-immobilienverwaltung", "overview", "Mieter- und Bewerberdossiers. Nicht die Personalvermittlung."),
    ("A6", "checklist", "interest", 800, 1400, "Datenschutz Personalvermittlung", "data protection for recruitment agencies", "data-protection-for-recruitment-agencies", "datenschutz-in-der-personalvermittlung", "overview", "Kandidatendaten. Nicht die Aufbewahrung von Bewerbungen im eigenen Betrieb."),
    ("A6", "checklist", "interest", 800, 1400, "Datenschutz Schulen und Kursanbieter", "data protection for schools and course providers", "data-protection-for-schools-and-course-providers", "datenschutz-schulen-und-kursanbieter", "overview", "Daten von Minderjährigen. Nicht ein allgemeiner KMU-Artikel mit ausgetauschtem Wort."),
    ("A4", "problem", "awareness", 700, 1200, "Datenpanne durch ein KI-Tool", "data breach through an AI tool", "data-breach-through-an-ai-tool", "datenpanne-durch-ein-ki-tool", "privacy", "Eigene Frage: jemand hat Personendaten in ein KI-Tool eingefügt. chatgpt-kundendaten nicht wiederholen. Verlinken nur wenn das Datum es erlaubt."),
]

# translationKey -> note. Generator attaches paths only when the target pubDate is on or before this post.
CROSS = {
    "four-eyes-principle-for-payments": ["invoice-approval-workflow"],
    "data-breach-through-an-ai-tool": ["chatgpt-customer-data-swiss-dsg", "shadow-ai-in-the-office", "approve-ai-tools-allow-list"],
    "transferring-personal-data-to-the-united-states": ["ai-data-location-switzerland"],
    "data-protection-and-security-for-a-medical-practice": ["ai-in-medical-practices"],
}


def load_existing():
    en_slugs = {p.stem for p in EN.glob("*.mdx")}
    de_slugs = {p.stem for p in DE.glob("*.mdx")}
    by_key = {}
    for p in EN.glob("*.mdx"):
        text = p.read_text(encoding="utf-8")
        key = re.search(r"^translationKey:\s*(\S+)", text, re.M)
        pub = re.search(r"^pubDate:\s*(\S+)", text, re.M)
        if key and pub:
            by_key[key.group(1)] = {"en": p.stem, "pubDate": pub.group(1)}
    for p in DE.glob("*.mdx"):
        text = p.read_text(encoding="utf-8")
        key = re.search(r"^translationKey:\s*(\S+)", text, re.M)
        if key and key.group(1) in by_key:
            by_key[key.group(1)]["de"] = p.stem
    return en_slugs, de_slugs, by_key


def rows():
    out = list(FIRST)
    for i, priv in enumerate(PRIV_REST):
        out.append(priv)
        out.append(SEC_REST[i])
    out.append(SEC_REST[26])
    out.append(SEC_REST[27])
    return out


def related(items):
    by_funnel = {"awareness": [], "interest": [], "consideration": []}
    for it in items:
        by_funnel[it["funnelStage"]].append(it)
    for it in items:
        if it["funnelStage"] == "consideration":
            pool = [o for o in by_funnel["consideration"] if o["translationKey"] != it["translationKey"]]
        elif it["funnelStage"] == "interest":
            same = [o for o in by_funnel["interest"] if o["owner"] == it["owner"] and o["translationKey"] != it["translationKey"]]
            other = [o for o in by_funnel["interest"] if o["owner"] != it["owner"]]
            higher = by_funnel["consideration"]
            pool = same + other + higher
        else:
            same = [o for o in by_funnel["awareness"] if o["owner"] == it["owner"] and o["translationKey"] != it["translationKey"]]
            pool = same + by_funnel["interest"]
        picked = []
        for o in pool:
            if o["translationKey"] in picked:
                continue
            picked.append(o["translationKey"])
            if len(picked) == 3:
                break
        it["relatedKeys"] = picked
        it["relatedPosts_en"] = [next(x["en_slug"] for x in items if x["translationKey"] == k) for k in picked]
        it["relatedPosts_de"] = [next(x["de_slug"] for x in items if x["translationKey"] == k) for k in picked]


def body_link(items):
    rank = {"awareness": 0, "interest": 1, "consideration": 2}
    for it in items:
        chosen = None
        for prev in reversed(items):
            if prev["seq"] >= it["seq"]:
                continue
            if rank[prev["funnelStage"]] >= rank[it["funnelStage"]] or it["funnelStage"] == "awareness":
                chosen = prev
                break
        it["bodyLink_en"] = None if not chosen else f"/security/blog/{chosen['en_slug']}"
        it["bodyLink_de"] = None if not chosen else f"/de/security/blog/{chosen['de_slug']}"


def main():
    en_slugs, de_slugs, existing = load_existing()
    raw = rows()
    assert len(raw) == 80, len(raw)
    assert len(FIRST) == 26 and len(SEC_REST) == 28 and len(PRIV_REST) == 26
    start = date(2026, 10, 1)
    items = []
    seen_en, seen_de = set(), set()
    for i, row in enumerate(raw):
        owner, typ, funnel, floor, ceiling, qde, qen, en_slug, de_slug, cta, apart = row
        if en_slug in seen_en or de_slug in seen_de:
            raise SystemExit(f"duplicate slug {en_slug} / {de_slug}")
        if en_slug in en_slugs or de_slug in de_slugs:
            raise SystemExit(f"slug collides with an existing post: {en_slug} / {de_slug}")
        seen_en.add(en_slug)
        seen_de.add(de_slug)
        pub = (start + timedelta(days=i)).isoformat()
        items.append({
            "seq": i + 1,
            "pubDate": pub,
            "owner": owner,
            "type": typ,
            "funnelStage": funnel,
            "query_de": qde,
            "query_en": qen,
            "translationKey": en_slug,
            "en_slug": en_slug,
            "de_slug": de_slug,
            "cta": cta,
            "apart": apart,
            "status": "planned",
        })
    related(items)
    body_link(items)
    for it in items:
        links = []
        for key in CROSS.get(it["translationKey"], []):
            meta = existing.get(key)
            if not meta or "de" not in meta:
                continue
            if meta["pubDate"] <= it["pubDate"]:
                links.append({
                    "translationKey": key,
                    "pubDate": meta["pubDate"],
                    "en": f"/prozess-check/blog/{meta['en']}",
                    "de": f"/de/prozess-check/blog/{meta['de']}",
                })
        it["crossLinks"] = links
    (PLAN / "calendar.json").write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = [
        "# Aurum security batch — 2026-09-30",
        "",
        "Audience: Swiss companies with 20–250 staff, German-speaking Switzerland first, no in-house security or privacy team.",
        "Offer URLs: `/de/security/security-awareness`, `/de/security/datenschutz`, `/de/security` (EN without `/de`).",
        "Languages: en, de. One article per calendar day. Both locales share `pubDate`.",
        "Seq 1 = 2026-10-01. Seq 80 = 2026-12-19.",
        "Mix follows the research: the first 26 rows are the priority list, then privacy and security alternate.",
        "",
        "| Seq | Date | Owner | Type | Funnel | EN slug | DE slug | CTA |",
        "|-----|------|-------|------|--------|---------|---------|-----|",
    ]
    for it in items:
        lines.append(
            f"| {it['seq']} | {it['pubDate']} | {it['owner']} | {it['type']} | {it['funnelStage']} | `{it['en_slug']}` | `{it['de_slug']}` | {it['cta']} |"
        )
    lines.append("")
    (REPO / "context/aurum/batches/2026-09-30-security.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    from collections import Counter
    print(Counter(it["owner"] for it in items))
    print("last", items[-1]["pubDate"], items[-1]["en_slug"])
    print("consideration", [it["en_slug"] for it in items if it["funnelStage"] == "consideration"])


if __name__ == "__main__":
    main()
