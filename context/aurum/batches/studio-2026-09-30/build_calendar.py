#!/usr/bin/env python3
"""Build calendar.json and the batch table for the studio MVP wave."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[3]
# G glossary, P problem, H how-to, C checklist, V compare, W worth-it
# funnel: awareness, interest, consideration
# (id, type, funnel, cta, en_slug, de_slug, query_en, query_de, apart)
ROWS = [
("A01","H","interest","PVP","customer-interview-questions","kundeninterviews-fragen-startup","customer interview questions mom test","Kundeninterviews Fragen Startup","Deeper than how-to-validate-a-startup-idea. Do not rewrite that post."),
("A02","H","interest","PVP","problem-validation-before-building","problem-validieren-startup","problem validation before building","Problem validieren Startup","Do not rewrite how-to-validate-a-startup-idea."),
("A03","G","awareness","PVP","jobs-to-be-done-for-founders","jobs-to-be-done-methode","jobs to be done for founders","Jobs to be Done Methode",""),
("A04","C","interest","PVP","tam-sam-som-swiss-market","tam-sam-som-berechnen","TAM SAM SOM for a Swiss market","TAM SAM SOM berechnen","No invented market sizes."),
("A05","H","interest","PVP","competitor-analysis-for-an-mvp","wettbewerbsanalyse-startup","competitor analysis for an MVP","Wettbewerbsanalyse Startup",""),
("A06","P","awareness","PVP","why-surveys-dont-validate-an-idea","umfrage-produktidee-validieren","why surveys don't validate an idea","Umfrage Produktidee validieren","Do not rewrite how-to-validate-a-startup-idea."),
("A07","H","interest","PVP","test-willingness-to-pay","zahlungsbereitschaft-testen","test willingness to pay","Zahlungsbereitschaft testen",""),
("A08","H","interest","PVP","letters-of-intent-and-pre-sales","letter-of-intent-startup","letters of intent and pre-sales as validation","Letter of Intent Startup",""),
("A09","H","interest","PVP","riskiest-assumption-test","hypothesen-testen-startup","riskiest assumption test","Hypothesen testen Startup",""),
("B01","H","interest","LPP","fake-door-test","fake-door-test","fake door test","Fake Door Test","Explain the method fairly. The package page refuses a fake button for its own test. Say when a fake door is enough."),
("B02","H","interest","LPP","smoke-test-landing-page","landingpage-nachfrage-testen","smoke test landing page","Landingpage Nachfrage testen","Same honesty as B01."),
("B03","V","consideration","PVP","fake-door-test-vs-mvp","fake-door-test-oder-mvp","fake door test vs real MVP","Fake Door Test oder MVP","Demand signal vs behaviour. No contradiction with the package if that split is explicit."),
("B04","H","interest","PVP","validate-an-idea-with-google-ads","google-ads-idee-testen","validate an idea with Google Ads","Google Ads Idee testen","No invented CPC or conversion rates. Holist-IQ and CitySage rules in the brief apply if you use them."),
("B05","H","interest","PVP","linkedin-ads-for-b2b-validation","linkedin-ads-b2b-testen","LinkedIn ads for B2B validation","LinkedIn Ads B2B testen","No invented CPC."),
("B06","H","interest","PVP","test-a-b2c-idea-with-meta-ads","instagram-ads-produkt-testen","test a B2C idea with Meta ads","Instagram Ads Produkt testen","No invented CPC. Do not publish the CitySage ad figures."),
("B07","C","interest","PVP","ad-budget-to-validate-an-idea","budget-validierung-ads","ad budget to validate an idea","Budget Validierung Ads","No invented budget. Say what the spend has to buy (enough clicks to learn), not a franc figure."),
("B08","C","interest","PVP","validation-test-metrics","conversion-rate-landingpage","validation test metrics","Conversion Rate Landingpage","No invented benchmark conversion rate."),
("B09","P","interest","PVP","when-a-validation-test-is-significant","test-aussagekraeftig-stichprobe","when a validation test is significant","Test aussagekraeftig Stichprobe","Title uses ss. People search aussagekräftig. No fake significance formula presented as law."),
("B10","G","awareness","PVP","concierge-and-wizard-of-oz-mvp","concierge-mvp","concierge and wizard of oz MVP","Concierge MVP",""),
("B11","H","interest","PVP","pricing-test-for-an-mvp","preis-testen-startup","pricing test for an MVP","Preis testen Startup","No package price."),
("B12","H","interest","LPP","ab-test-a-landing-page","ab-test-landingpage","A/B test a landing page","A/B Test Landingpage","You may mention the Prozess-Check hook test as a method, with no numbers."),
("B13","H","interest","LPP","build-a-meaningful-waitlist","warteliste-aufbauen","build a meaningful waitlist","Warteliste aufbauen",""),
("C01","V","interest","PVP","poc-vs-prototype-vs-mvp","unterschied-poc-prototyp-mvp","PoC vs prototype vs MVP","Unterschied PoC Prototyp MVP","Do not rewrite what-is-an-mvp."),
("C02","H","interest","PVP","prioritize-mvp-features","mvp-features-priorisieren","prioritize MVP features","MVP Features priorisieren",""),
("C03","H","interest","PVP","clickable-prototype-when-enough","klickdummy-erstellen","clickable prototype, when enough","Klickdummy erstellen",""),
("C04","V","interest","PVP","b2b-vs-b2c-mvp","mvp-b2b","B2B vs B2C MVP","MVP B2B",""),
("C05","P","awareness","PVP","signs-your-mvp-is-too-big","mvp-zu-gross","signs your MVP is too big","MVP zu gross","KitchenCrew may be the worked example of a smaller pilot. Do not invent restaurant counts."),
("C06","H","interest","PVP","user-stories-for-non-technical-founders","user-stories-schreiben","user stories for non-technical founders","User Stories schreiben",""),
("C07","C","consideration","CALL","mvp-brief-template","briefing-app-entwicklung-vorlage","MVP brief template","Briefing App Entwicklung Vorlage",""),
("D01","H","interest","VCR","building-an-mvp-with-lovable","lovable-mvp","building an MVP with Lovable","Lovable MVP","Neutral. Aurum does not build customer products with Lovable."),
("D02","H","interest","VCR","lovable-supabase-row-level-security","lovable-supabase-rls","Lovable Supabase row level security","Lovable Supabase RLS","CVE-2025-48757 only as stated in the brief."),
("D03","C","interest","VCR","vibe-coding-security-checklist","vibe-coding-sicherheit","vibe coding security checklist","Vibe Coding Sicherheit","Neutral checklist. CTA is Vibe Code Review."),
("D04","V","interest","VCR","lovable-vs-bolt-vs-v0-vs-replit","lovable-vs-bolt","Lovable vs Bolt vs v0 vs Replit","Lovable vs Bolt","Angle is Swiss data location, handoff to production, what a review finds. Not a feature matrix copied from vendors."),
("D05","V","interest","VCR","cursor-or-claude-code-for-founders","cursor-claude-code-gruender","Cursor or Claude Code for founders","Cursor Claude Code Gruender","Title uses ss. Search spelling is Gründer."),
("D06","V","interest","VCR","supabase-vs-firebase-for-an-mvp","supabase-vs-firebase","Supabase vs Firebase for an MVP","Supabase vs Firebase","Supabase region Zurich is allowed. Do not invent other region claims."),
("D07","V","interest","PVP","no-code-mvp-when-it-is-enough","no-code-app-erstellen","no-code MVP, when it is enough","No Code App erstellen","Link when-to-get-a-real-tech-partner. Do not rewrite it."),
("D08","H","consideration","VCR","move-a-lovable-app-to-production-code","lovable-code-exportieren","move a Lovable app to production code","Lovable Code exportieren",""),
("D09","H","interest","VCR","api-keys-and-secrets-in-ai-built-apps","api-key-frontend-sicherheit","API keys and secrets in AI-built apps","API Key Frontend Sicherheit",""),
("D10","H","interest","VCR","testing-ai-generated-code","ki-code-testen","testing AI-generated code","KI Code testen",""),
("D11","C","interest","VCR","judging-code-quality-as-a-non-developer","code-qualitaet-pruefen","judging code quality as a non-developer","Code Qualitaet pruefen","Title uses ss. Search spelling is Qualität prüfen."),
("D12","H","consideration","VCR","tech-due-diligence-for-an-ai-built-mvp","technische-due-diligence-startup","tech due diligence for an AI-built MVP","technische Due Diligence Startup",""),
("D13","C","interest","PVP","cost-of-ai-features-in-an-mvp","llm-kosten-app","cost of AI features in an MVP","LLM Kosten App","No invented model prices. Say prices move and must be read on the vendor page the week you build."),
("E01","H","interest","PVP","how-to-build-a-scalable-mvp","skalierbares-mvp","how to build a scalable MVP","skalierbares MVP","Do not rewrite why-we-build-production-quality-mvps."),
("E02","V","interest","PVP","choosing-a-startup-tech-stack","tech-stack-startup","choosing a startup tech stack","Tech Stack Startup","Aurum's own stack for the package is Azure, React, NestJS. Do not present it as the only serious stack."),
("E03","V","interest","PVP","web-app-vs-native-app-vs-pwa","web-app-oder-native-app","web app vs native app vs PWA","Web App oder native App","Inklets and the do4me wrap rules in the brief. No store-approval promise."),
("E04","V","interest","PVP","swiss-hosting-for-an-mvp","hosting-schweiz-app","Swiss hosting for an MVP","Hosting Schweiz App","Supabase Zurich is sourced. Azure and AWS region names only if you open the vendor page and cite it. Otherwise omit the region name."),
("E05","V","interest","PVP","authentication-for-an-mvp","authentifizierung-app","authentication for an MVP","Authentifizierung App",""),
("E06","H","interest","PVP","payments-in-a-swiss-mvp","stripe-twint-integrieren","payments in a Swiss MVP","Stripe TWINT integrieren","TWINT via Stripe is sourced. No fee percentages unless you open Stripe and cite them."),
("E07","P","awareness","PVP","technical-debt-in-an-mvp","technische-schulden-startup","technical debt in an MVP","technische Schulden Startup",""),
("E08","W","consideration","VCR","rebuild-or-refactor-an-mvp","app-neu-entwickeln","rebuild or refactor an MVP","App neu entwickeln",""),
("F01","H","interest","PVP","publish-an-app-on-the-app-store","app-im-app-store-veroeffentlichen","publish an app on the App Store","App im App Store veroeffentlichen","Title uses ss. Search spelling is veröffentlichen. No approval promise."),
("F02","H","interest","PVP","app-store-guideline-4-2","app-store-abgelehnt-4-2","App Store guideline 4.2 rejection","App Store abgelehnt 4.2","Inklets shipped as Capacitor. Apple 4.2 still rejects a thin website wrapper. Do not promise a pass."),
("F03","H","interest","PVP","google-play-12-testers-14-days","google-play-12-tester","Google Play 12 testers 14 days","Google Play 12 Tester","Personal accounts created after 13 Nov 2023. Check whether organisation accounts are exempt before you state that they are."),
("F04","H","interest","PVP","developer-account-as-a-company","apple-developer-account-firma","developer account as a company","Apple Developer Account Firma","D-U-N-S and fees only if you open Apple and Google pages. Otherwise say what to check, not the fee."),
("F05","H","interest","PVP","testflight-beta-testing","testflight-beta-test","TestFlight beta testing","TestFlight Beta Test",""),
("F06","C","interest","PVP","mvp-launch-checklist","mvp-launch-checkliste","MVP launch checklist","MVP Launch Checkliste",""),
("F07","H","interest","CALL","app-store-payouts-swiss-tax-forms","app-store-einnahmen-steuern-schweiz","App Store payouts and tax forms for Swiss companies","App Store Einnahmen Steuern Schweiz","W-8BEN-E is experience, not tax advice. Say so."),
("F08","P","awareness","PVP","product-hunt-launch-for-an-mvp","product-hunt-launch","Product Hunt launch for an MVP","Product Hunt Launch","CitySage ran a Product Hunt launch. No CitySage ad or signup figures."),
("G01","H","interest","PVP","analytics-setup-for-an-mvp","analytics-mvp-einrichten","analytics setup for an MVP","Analytics MVP einrichten","GA4, PostHog, Clarity as options. Package uses analytics and session recordings from day one. Do not claim PostHog is what Aurum installs unless the service page says so."),
("G02","C","interest","PVP","event-tracking-plan-for-an-mvp","tracking-plan-events","event tracking plan for an MVP","Tracking Plan Events",""),
("G03","H","interest","PVP","measure-activation-and-retention","retention-messen-app","measure activation and retention","Retention messen App",""),
("G04","H","interest","PVP","cohort-analysis-for-founders","kohortenanalyse","cohort analysis for founders","Kohortenanalyse",""),
("G05","P","interest","PVP","session-recordings-and-swiss-privacy","session-recording-datenschutz","session recordings and Swiss privacy","Session Recording Datenschutz","Orientation, not legal advice. You may link the security posts in crossLinks."),
("G06","P","awareness","PVP","is-nps-useful-for-an-mvp","nps-startup","is NPS useful for an MVP","NPS Startup","Sean Ellis lives in product-market-fit-how-to-find-it. Link it. Do not rewrite that post."),
("G07","C","consideration","PVP","go-pivot-or-stop-decision","pivot-oder-weitermachen","go, pivot or stop decision","Pivot oder weitermachen","This is the package's week 11 to 12. Do not invent a scoring formula."),
("G08","H","interest","PVP","innovation-accounting","innovation-accounting","innovation accounting","Innovation Accounting",""),
("G09","C","consideration","PVP","reporting-validation-to-a-board","kpi-innovationsprojekt","reporting validation results to a board","KPI Innovationsprojekt",""),
("H01","H","interest","PVP","get-your-first-100-users","erste-nutzer-finden","get your first 100 users","erste Nutzer finden","Switzerland context. No invented channel benchmarks."),
("H02","H","interest","PVP","find-honest-beta-testers","beta-tester-finden","find honest beta testers","Beta Tester finden",""),
("H03","H","interest","PVP","design-partners-for-a-b2b-mvp","design-partner-b2b","design partners for a B2B MVP","Design Partner B2B",""),
("H04","H","interest","PVP","cold-outreach-for-validation","kaltakquise-startup","cold outreach for validation","Kaltakquise Startup","Swiss rules on advertising email. If you cannot open the statute, say consent is the safe default and do not quote an article number."),
("H05","P","awareness","PVP","swiss-startup-communities","startup-community-schweiz","Swiss startup communities","Startup Community Schweiz","Name only organisations whose own site you opened."),
("H06","H","interest","PVP","pilot-customers-from-your-network","pilotkunden-finden","pilot customers from your own network","Pilotkunden finden","do4me: 4 job offerers were mostly friends and family, and that did not prove liquidity."),
("H07","H","interest","PVP","positioning-a-new-product","positionierung-startup","positioning a new product","Positionierung Startup",""),
("J01","C","interest","PVP","privacy-requirements-swiss-mvp","datenschutz-app-startup-schweiz","privacy requirements for a Swiss MVP","Datenschutz App Startup Schweiz","Product side, not the office. Not legal advice. crossLinks allowed."),
("J02","H","interest","PVP","app-store-privacy-labels","app-datenschutz-angaben-app-store","App Store privacy labels and Google Play data safety","App Datenschutz Angaben App Store",""),
("J03","H","interest","LPP","cookie-rules-swiss-landing-page","cookie-banner-schweiz-pflicht","cookie rules for a landing page in Switzerland","Cookie Banner Schweiz Pflicht","No general opt-in. Facts in the brief. Not legal advice."),
("J04","H","consideration","PVP","who-owns-the-code","rechte-an-software-agentur","who owns the code when an agency builds it","Rechte an Software Agentur","Package: code, designs, data, and documentation belong to the customer. Still explain the written assignment for external authors."),
("J05","P","awareness","PVP","protect-a-startup-idea-switzerland","geschaeftsidee-schuetzen","can I protect my startup idea in Switzerland","Geschaeftsidee schuetzen","Title uses ss. Ideas as such are not protected. IGE link."),
("J06","H","interest","CALL","register-a-trademark-switzerland","marke-anmelden-schweiz-kosten","register a trademark in Switzerland","Marke anmelden Schweiz Kosten","IGE fees only as in the brief, and say to recheck the IGE page."),
("J07","V","interest","CALL","gmbh-vs-ag-swiss-startup","gmbh-oder-ag-startup","GmbH vs AG for a Swiss startup","GmbH oder AG Startup","GmbH CHF 20'000 fully paid in. AG only if you recheck the KMU portal before stating the figures."),
("J08","H","interest","PVP","terms-of-use-for-an-mvp","agb-app-erstellen","terms of use for an MVP","AGB App erstellen","Not a template that pretends to be legal advice."),
("J09","P","awareness","PVP","swiss-mvp-with-eu-users","dsgvo-startup-schweiz-eu-kunden","Swiss MVP with EU users","DSGVO Startup Schweiz EU Kunden","crossLinks allowed. Not legal advice."),
("K01","C","interest","PVP","swiss-startup-funding-programmes","startup-foerderung-schweiz","Swiss startup funding programmes","Startup Förderung Schweiz","Innosuisse and Venture Kick only as in the brief. Re-open the official page if you add a canton scheme, or omit that canton."),
("K02","H","interest","PVP","innosuisse-start-up-coaching","innosuisse-coaching-startup","Innosuisse start-up coaching","Innosuisse Coaching Startup",""),
("K03","P","awareness","PVP","pre-seed-funding-switzerland","pre-seed-finanzierung-schweiz","pre-seed funding in Switzerland","Pre-Seed Finanzierung Schweiz","Do not rewrite validated-mvp-fundraising. No invented round sizes. VC market figure only as in the brief."),
("K04","H","interest","PVP","pitch-deck-with-validation-data","pitch-deck-startup","pitch deck with validation data","Pitch Deck Startup",""),
("K05","W","consideration","PVP","paying-a-partner-in-equity","equity-gegen-entwicklung","paying a development partner in equity","Equity gegen Entwicklung","Cash, equity, or mix. Split is discussed in the discovery conversation. No percentages."),
("K06","P","awareness","PVP","find-a-technical-co-founder","technischen-mitgruender-finden","find a technical co-founder","technischen Mitgruender finden","Title uses ss."),
("K07","V","consideration","CALL","fixed-price-vs-time-and-materials","festpreis-softwareentwicklung","fixed price vs time and materials","Festpreis Softwareentwicklung","No package price."),
("K08","W","consideration","PVP","app-development-cost-switzerland","app-entwickeln-lassen-kosten-schweiz","app development cost in Switzerland","App entwickeln lassen Kosten Schweiz","Apart from mvp-cost-switzerland: app, stores, maintenance, running cost. No invented franc ranges."),
("L01","H","interest","PVP","validate-a-product-idea-inside-a-company","produktidee-validieren-unternehmen","validate a new product idea inside a company","Produktidee validieren Unternehmen",""),
("L02","V","interest","PVP","stage-gate-vs-lean-startup","stage-gate-lean-startup","stage-gate vs lean startup","Stage Gate Lean Startup",""),
("L03","H","consideration","PVP","get-budget-approved-for-an-mvp","budget-innovationsprojekt","get budget approved for an MVP","Budget Innovationsprojekt",""),
("L04","C","consideration","PVP","internal-approvals-external-mvp-partner","lieferantenbewertung-it-sicherheit","internal approvals for an external MVP partner","Lieferantenbewertung IT Sicherheit",""),
("L05","H","interest","PVP","turn-a-service-into-a-digital-product","dienstleistung-digitalisieren","turn a service into a digital product","Dienstleistung digitalisieren",""),
("L06","P","awareness","PVP","building-a-saas-inside-an-sme","saas-entwickeln-kmu","building a SaaS inside an SME","SaaS entwickeln KMU",""),
("L07","H","interest","PVP","using-existing-customers-as-testers","kunden-als-tester","using existing customers to test a product","Kunden als Tester",""),
("L08","W","consideration","PVP","corporate-venture-building-partner","corporate-venture-building","corporate venture building partner","Corporate Venture Building","Swiss mid-market, small innovation budget. Not a PwC rewrite."),
("L09","V","interest","PVP","test-under-your-brand-or-a-new-one","produkt-testen-neue-marke","test under your brand or a new brand","Produkt testen neue Marke",""),
("M01","P","interest","PVP","a-launch-is-not-validated-demand","produktlaunch-ohne-validierte-nachfrage","a product launch is not validated demand","Produktlaunch ohne validierte Nachfrage","CitySage HTML only, minus the ad and signup figures."),
("M02","P","interest","PVP","testing-a-niche-product-before-revenue","nischenprodukt-testen-vor-umsatz","testing a niche product before revenue","Nischenprodukt testen vor Umsatz","Holist-IQ HTML. Early signals, not product-market fit, not revenue."),
("M03","H","interest","PVP","cutting-pilot-scope","pilot-kleiner-schneiden","cutting pilot scope","Pilot kleiner schneiden","KitchenCrew HTML. No invented restaurant count."),
("M04","H","interest","PVP","when-the-model-cannot-finish-the-job","wenn-das-modell-den-letzten-schritt-nicht-kann","when the AI model cannot finish the last step","Wenn das KI-Modell den letzten Schritt nicht kann","Postology HTML. Internal tool, not a public launch. Ignore the shorter portfolio line about creators and brands."),
("M05","H","interest","PVP","marketplace-mvp-demand-side","marktplatz-mvp-nachfrageseite","marketplace MVP and the demand side","Marktplatz-MVP Nachfrageseite","do4me HTML. Client project. Payments deferral is a scoping choice, not a legal opinion."),
("M00","P","awareness","PVP","what-our-launches-showed","was-eigene-launches-zeigen","what our own launches showed about a market test","Was eigene Launches über Validierung zeigen","Hub. Link the five posts and seven portfolio pages. No template percentages."),
]

BODY = {
"A": ("how-to-validate-a-startup-idea", "startup-idee-validieren"),
"B": ("how-to-validate-a-startup-idea", "startup-idee-validieren"),
"C": ("what-is-an-mvp", "was-ist-ein-mvp"),
"D": ("is-your-vibe-coded-app-production-ready", "ist-deine-vibe-coded-app-produktionsreif"),
"E": ("why-we-build-production-quality-mvps", "warum-produktionsqualitative-mvps"),
"F": ("why-we-build-production-quality-mvps", "warum-produktionsqualitative-mvps"),
"G": ("product-market-fit-how-to-find-it", "product-market-fit-erreichen"),
"H": ("how-to-validate-a-startup-idea", "startup-idee-validieren"),
"J": ("startup-software-development-switzerland", "startup-software-entwicklung-schweiz"),
"K": ("mvp-cost-switzerland", "mvp-kosten-schweiz"),
"L": ("getting-an-mvp-built-for-you", "mvp-entwickeln-lassen-partnerwahl"),
"M": ("how-aurum-avis-validates-mvps", "wie-aurum-avis-mvps-validiert"),
}
BODY_OVERRIDE = {
"B03": ("why-we-build-production-quality-mvps", "warum-produktionsqualitative-mvps"),
"C05": ("why-we-build-production-quality-mvps", "warum-produktionsqualitative-mvps"),
"D01": ("ai-assisted-mvp-development", "ki-mvp-entwicklung"),
"D04": ("ai-assisted-mvp-development", "ki-mvp-entwicklung"),
"D05": ("vibe-coding-vs-agentic-coding", "vibe-coding-vs-agentic-coding"),
"D07": ("when-to-get-a-real-tech-partner", "wann-brauchst-du-einen-tech-partner"),
"G06": ("product-market-fit-how-to-find-it", "product-market-fit-erreichen"),
"K03": ("validated-mvp-fundraising", "validiertes-mvp-mehr-funding"),
"K05": ("venture-studio-vs-agency", "venture-studio-vs-agentur"),
"K08": ("mvp-cost-switzerland", "mvp-kosten-schweiz"),
}

CTA = {
"PVP": ("/services/mvp-validation", "/de/services/mvp-validation"),
"VCR": ("/services/vibe-code-review", "/de/services/vibe-code-review"),
"LPP": ("/services/landing-page-package", "/de/services/landing-page-package"),
"CALL": ("/contact", "/de/contact"),
}

HTML = {
"M01": "citysage-case-study/index.html",
"M02": "holist-iq-case-study/index.html",
"M03": "kitchencrew-case-study/index.html",
"M04": "postology-case-study/index.html",
"M05": "do4me-case-study/index.html",
}
HTML_ROOT = "/Users/robertschlittler/Downloads/05 - Branded Artifacts/Aurum-Avis-Labs/Case-Studies"

CROSS = {
"G05": (
    ["/security/blog/privacy-notice-requirement-switzerland"],
    ["/de/security/blog/datenschutzerklaerung-pflicht-schweiz"],
),
"J01": (
    ["/security/blog/swiss-fadp-obligations-for-smes", "/security/blog/privacy-notice-requirement-switzerland", "/security/blog/data-processing-agreement-under-the-fadp"],
    ["/de/security/blog/ndsg-pflichten-fuer-kmu", "/de/security/blog/datenschutzerklaerung-pflicht-schweiz", "/de/security/blog/auftragsbearbeitung-vertrag-schweiz"],
),
"J03": (
    ["/security/blog/privacy-notice-requirement-switzerland"],
    ["/de/security/blog/datenschutzerklaerung-pflicht-schweiz"],
),
"J09": (
    ["/security/blog/does-the-gdpr-apply-to-swiss-companies"],
    ["/de/security/blog/gilt-die-dsgvo-in-der-schweiz"],
),
}

PORTFOLIO = ["citysage", "holist-iq", "do4me", "postology", "kitchencrew", "inklets", "vemoir"]


def main():
    assert len(ROWS) == 106, len(ROWS)
    en_slugs = [r[4] for r in ROWS]
    de_slugs = [r[5] for r in ROWS]
    assert len(set(en_slugs)) == 106
    assert len(set(de_slugs)) == 106
    existing_en = {p.stem for p in (REPO / "brands/aurum/en").glob("*.mdx")}
    existing_de = {p.stem for p in (REPO / "brands/aurum/de").glob("*.mdx")}
    clash_en = sorted(set(en_slugs) & existing_en)
    clash_de = sorted(set(de_slugs) & existing_de)
    if clash_en or clash_de:
        raise SystemExit(f"slug clash en={clash_en} de={clash_de}")

    items = []
    for seq, row in enumerate(ROWS, start=1):
        id_, typ, funnel, cta, en_slug, de_slug, q_en, q_de, apart = row
        be, bd = BODY_OVERRIDE.get(id_, BODY[id_[0]])
        ce, cd = CTA[cta]
        item = {
            "id": id_,
            "seq": seq,
            "owner": id_,
            "site": "studio",
            "type": typ,
            "funnelStage": funnel,
            "cta": cta,
            "cta_en": ce,
            "cta_de": cd,
            "en_slug": en_slug,
            "de_slug": de_slug,
            "translationKey": en_slug,
            "query_en": q_en,
            "query_de": q_de,
            "pubDate": "2027-09-01",
            "draft": True,
            "bodyLink_en": f"/blog/{be}",
            "bodyLink_de": f"/de/blog/{bd}",
            "apart": apart,
            "crossLinks_en": CROSS.get(id_, ([],))[0],
            "crossLinks_de": CROSS.get(id_, ([], []))[1],
        }
        if id_ in HTML:
            item["html"] = f"{HTML_ROOT}/{HTML[id_]}"
        if id_.startswith("M"):
            item["portfolio_en"] = [f"/portfolio/{s}" for s in PORTFOLIO]
            item["portfolio_de"] = [f"/de/portfolio/{s}" for s in PORTFOLIO]
        items.append(item)

    rank = {"awareness": 0, "interest": 1, "consideration": 2}
    by_cluster = {}
    for it in items:
        by_cluster.setdefault(it["id"][0], []).append(it)

    def ok(src, dst):
        if src["funnelStage"] == "interest" and dst["funnelStage"] == "awareness":
            return False
        if src["funnelStage"] == "consideration" and dst["funnelStage"] != "consideration":
            return False
        return True

    for it in items:
        pool = [x for x in by_cluster[it["id"][0]] if x["id"] != it["id"] and ok(it, x)]
        if len(pool) < 2:
            pool += [x for x in items if x["id"] != it["id"] and ok(it, x) and x not in pool]
        chosen = pool[:2]
        if len(chosen) < 1:
            raise SystemExit(f"no related for {it['id']}")
        it["relatedPosts_en"] = [c["en_slug"] for c in chosen]
        it["relatedPosts_de"] = [c["de_slug"] for c in chosen]

    # Hub may body-link the five case posts (lower seq).
    hub = items[-1]
    assert hub["id"] == "M00"
    five = [x for x in items if x["id"] in {"M01", "M02", "M03", "M04", "M05"}]
    assert all(x["seq"] < hub["seq"] for x in five)
    hub["bodyAlso_en"] = [f"/blog/{x['en_slug']}" for x in five]
    hub["bodyAlso_de"] = [f"/de/blog/{x['de_slug']}" for x in five]

    (HERE / "calendar.json").write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Aurum studio batch — 2026-09-30",
        "",
        "Audience: founders, Swiss SMEs with a product idea, innovation teams, and people who already built with Lovable, Bolt, Cursor, or similar.",
        "Offer URLs: /services/mvp-validation, /services/vibe-code-review, /services/landing-page-package, /contact. German prefixes /de.",
        "Languages: en, de. Site: studio. All rows draft. pubDate 2027-09-01 is a placeholder, not a schedule.",
        "Mix: see calendar.json funnelStage counts.",
        "",
        "| ID | Type | funnelStage | Primary query | EN slug | DE slug | Status |",
        "|----|------|-------------|---------------|---------|---------|--------|",
    ]
    for it in items:
        lines.append(
            f"| {it['id']} | {it['type']} | {it['funnelStage']} | {it['query_en']} | {it['en_slug']} | {it['de_slug']} | planned |"
        )
    lines.append("")
    plan = REPO / "context/aurum/batches/2026-09-30-studio-mvp.md"
    plan.write_text("\n".join(lines), encoding="utf-8")
    print(f"rows={len(items)} plan={plan}")


if __name__ == "__main__":
    main()
