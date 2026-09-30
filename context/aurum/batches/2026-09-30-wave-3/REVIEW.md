# Wave 3 review

Validator must be 0 errors before a topic is marked written. Risk flags are for a human glance, not automatic failures.

## Writer A (finance and admin)

Merged to main from `aurum/w3-writer-a`. 16 files, 0 validator errors.

| ID | Key | EN / DE | Sources | Risk |
|---|---|---|---|---|
| W3-F8 | year-end-stocktake | 1199 / 1090 | 4 | Count is not the only method OR 958c allows. Valuation left with the fiduciary. |
| W3-F1 | dunning-payment-reminders | 1322 / 1235 | 6 | bexio and Abacus are described from their own help pages, not as Aurum integrations. Betreibung stays manual. No fee or interest amounts. |
| W3-F6 | year-end-documents-for-fiduciary | 1149 / 1049 | 3 | The folder list is labelled as usual office practice, not a statute. |
| W3-F7 | payroll-preparation | 1303 / 1239 | 1 domain (Swissdec) | No contribution rates, tariffs, or ELM version. |
| W3-F2 | expense-claims | 1386 / 1282 | 2 | 2026 mileage guide only (75 rappen). No canton ceilings. |
| W3-F3 | delivery-note-invoice-matching | 1149 / 1108 | 0 | No named ERP feature and no legal tolerance. Body links `capture-email-orders` (seq 51), which is not on main until Writer B is merged. That post publishes 10 Dec 2026, before this one (22 Jan 2027). |
| W3-F5 | vat-return-preparation | 1067 / 1014 | 3 | Quarter table and a 240-day figure were left out. Uses the 60-day rule and ESTV's own Q1 example. |
| W3-F4 | ebill-for-businesses | 1385 / 1312 | 2 | No bank or accounting-software list. 730-day archive line not used as a rule for the receiver. |

## Writer F (data location, chatbot, courses, property, manufacturing)

Merged to main from `aurum/w3-writer-f`. 16 files, 0 validator errors.

| ID | Key | EN / DE | Sources | Risk |
|---|---|---|---|---|
| W3-X3 | ai-data-location-switzerland | 1211 / 1184 | 5 | Says the DSG does not require a Swiss server. OpenAI "Europe (EEA + Switzerland)" is not treated as a Zurich data centre. Microsoft cited for storage at rest only. Not legal advice. |
| W3-X4 | website-chatbot-sme | 1810 / 1702 | 3 | No conversion rates or widget prices. Points at the data-location post for hosting claims. |
| W3-I17 | ai-for-course-providers | 1192 / 1110 | 0 | No eduQua and no named course-software features. Office work, not teaching. |
| W3-I18 | course-registration-to-invoice | 1605 / 1534 | 1 | SIX page states both 22 November 2025 and November 2026 for the structured address. The post reports both and does not pick one. |
| W3-I19 | ai-for-real-estate-agents | 1184 / 1101 | 2 | Brokerage, not property management. Encrypted seeker mail and messenger-only replies left out. |
| W3-I20 | property-enquiries-viewings | 1484 / 1439 | 1 | Body links the web-form post (seq 96), now on main. It publishes before this one. |
| W3-I21 | ai-for-manufacturing-smes | 1120 / 1082 | 0 | No EDI or ISO claims. Body links email-order capture (Writer B, seq 51, 10 Dec 2026). |
| W3-I22 | delivery-date-updates-customers | 1434 / 1403 | 0 | Starts after the order exists. Same email-order link as manufacturing. That target is now on main. |

## Writer B (operations)

Merged to main from `aurum/w3-writer-b`. 14 files, 0 validator errors. Email orders, minimum stock and complaints sit a little over the 1,600-word ceiling and under the validator warning line.

| ID | Key | EN / DE | Sources | Risk |
|---|---|---|---|---|
| W3-O1 | capture-email-orders | 1618 / 1490 | 4 | No vendor savings claims and no named ERP order interface. EDI is only the large-customer path. |
| W3-O2 | reorder-at-minimum-stock | 1609 / 1499 | 3 | No Proffix, bexio or KitchenCrew figures. KitchenCrew is linked as the gastro case. |
| W3-O3 | supplier-price-lists | 1406 / 1289 | 1 | ELDANORM, ZVEHNORM and BMEcat left out. A quote award is not written back as the new list price. |
| W3-O4 | compare-supplier-quotes | 1434 / 1344 | 0 | No public-procurement duty and no rule that three quotes are required. |
| W3-O5 | complaints-warranty-claims | 1640 / 1525 | 2 | OR Arts. 197, 201, 210, 367, 371 from fedlex. Flags that ch.ch's one-year used-goods line and the ban on shortening apply only when all three consumer conditions in Art. 210 para. 4 are met. Not legal advice. Body links shop returns (seq 78), now on main. |

## Writer E (recruitment, retail, architects, logistics)

Merged to main from `aurum/w3-writer-e`. 16 files, 0 validator errors. Recruitment and retail sit just over their 1,200-word ceiling and under the warning line. Timesheets sit just over 1,600.

| ID | Key | EN / DE | Sources | Risk |
|---|---|---|---|---|
| W3-I9 | ai-for-recruitment-agencies | 1316 / 1304 | 2 | AVG and SECO only. The 2018 "6,000 firms" line was dropped; SECO now says over 7,400 and that figure was not used either. Deposit and licence fees left out. In-house screening is a different job and is not repeated. |
| W3-I10 | temp-staff-timesheets | 1644 / 1593 | 2 | No collective-agreement percentages. Five-year retention left out because it was only in a PDF highlight. Links payroll preparation, which is already on main. |
| W3-I11 | ai-for-retail-ecommerce | 1223 / 1176 | 4 | Shopify Help for notifications and languages only. No EU withdrawal right. |
| W3-I12 | returns-customer-enquiries-shop | 1587 / 1515 | 1 | Warranty clock stays in the complaints post. This page is "where is my order" and returns. |
| W3-I13 | ai-for-architects-engineers | 1036 / 984 | 2 | SIA 102 and 103 product pages from 2020 only. No phase percentages or recommended hourly rates. |
| W3-I14 | project-hours-fee-invoice | 1390 / 1319 | 0 | No new rates. Distinguished from a trades daywork sheet. |
| W3-I15 | ai-for-logistics-transport | 943 / 883 | 0 | Shortest awareness post in this set, still above the 700-word floor. LSVA, customs, CMR and ADR left out. |
| W3-I16 | delivery-notes-proof-of-delivery | 1394 / 1355 | 0 | A photographed signature is not called conclusive. Links the purchasing-side match, already on main. |

## Writer C (office, HR, data)

Merged to main from `aurum/w3-writer-c`. 18 files, 0 validator errors. Leave requests sit just over the 1,600-word ceiling and under the warning line.

| ID | Key | EN / DE | Sources | Risk |
|---|---|---|---|---|
| W3-D2 | contract-deadlines | 1379 / 1228 | 2 | OR 266–266d and a SharePoint calendar only. Insurance, leasing and maintenance periods left out. |
| W3-D1 | leave-requests | 1624 / 1558 | 9 | OR 329a, 329c, 329d. No canton calendars, no GAV carry-over formula, no bexio or Abacus module. |
| W3-D8 | analyse-survey-free-text | 1451 / 1321 | 3 | No anonymity threshold and no promise that answers stay anonymous. |
| W3-D3 | digitise-paper-mail | 1223 / 1111 | 3 | Does not say every letter may be shredded. |
| W3-D5 | screen-job-applications-ai | 1453 / 1341 | 5 | No bias percentage and no claim that AI screening is banned. Art. 21 is not applied to a score that was not checked. |
| W3-D6 | data-subject-access-requests | 1435 / 1322 | 2 | No passport-scan rule and no franc threshold for disproportionate effort. |
| W3-D4 | auto-file-documents | 1230 / 1171 | 4 | No claim that a tool files any PDF by itself. |
| W3-D7 | web-form-to-crm | 1237 / 1150 | 1 | DSG Art. 19 only. The two-working-day reminder is labelled a house rule. No CRM product features. |
| W3-D9 | ai-phone-assistant | 1723 / 1631 | 3 | Follows the EDÖB's narrow reading of mass business, not a looser reading of the statute. Not a claim that Aurum built a phone bot. Website chatbot stays the written cousin. |

## Writer D (hospitality, garages, law, insurance)

Merged to main from `aurum/w3-writer-d`. 16 files, 0 validator errors. Hospitality and garages sit just over the 1,200-word ceiling and under the warning line.

| ID | Key | EN / DE | Sources | Risk |
|---|---|---|---|---|
| W3-I1 | ai-in-hospitality | 1316 / 1213 | 4 | KitchenCrew is linked, not retold. No Gastro-GAV and no vendor time-saved figures. |
| W3-I2 | group-event-enquiries | 1521 / 1402 | 0 | No deposit percentage and no cancellation rule. |
| W3-I3 | ai-for-car-garages | 1318 / 1186 | 5 | Intake, wholesaler parts, MFK reminder. No other DMS products. |
| W3-I4 | service-appointment-requests-garage | 1430 / 1351 | 1 | Ramp and courtesy car. Paid booking is the contrast, not the method. |
| W3-I5 | ai-for-law-firms | 1171 / 1089 | 6 | StGB Art. 321 is cited from the Federal Gazette reprint because the consolidated fedlex page did not render the article. Not a product claim of "secrecy-compliant" software. |
| W3-I6 | law-firm-deadlines-incoming-mail | 1280 / 1227 | 2 | No ZPO day counts. The lawyer confirms the date. Contract notice periods point at Writer C's post, now on main. |
| W3-I7 | ai-for-insurance-brokers | 972 / 900 | 2 | Tied vs untied follows FINMA. No commission rates and no CHF 475 levy. |
| W3-I8 | broker-quote-requests | 1226 / 1185 | 1 | One fact sheet to several insurers. Not a purchasing RFQ. |
| W3-O6 | maintenance-service-reminders | 1330 / 1228 | 1 | No legal annual heating service. VKF Art. 20 only. Daily dispatch is not linked in the body. |
| W3-O7 | technician-dispatch-planning | 1448 / 1397 | 0 | No named field-service product and no GPS or route-saving figures. Says when a dedicated product is the better buy. |
