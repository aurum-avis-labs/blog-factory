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
| W3-I20 | property-enquiries-viewings | 1484 / 1439 | 1 | Body links the web-form post (seq 96), still with Writer C. That post publishes before this one. |
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
| W3-O5 | complaints-warranty-claims | 1640 / 1525 | 2 | OR Arts. 197, 201, 210, 367, 371 from fedlex. Flags that ch.ch's one-year used-goods line and the ban on shortening apply only when all three consumer conditions in Art. 210 para. 4 are met. Not legal advice. Body links shop returns (Writer E, seq 78), which publishes first. |
| W3-O6 | maintenance-service-reminders | 1330 / 1228 | 1 | No legal annual heating service. VKF Art. 20 only. Daily dispatch is not linked in the body. |
| W3-O7 | technician-dispatch-planning | 1448 / 1397 | 0 | No named field-service product and no GPS or route-saving figures. Says when a dedicated product is the better buy. |
