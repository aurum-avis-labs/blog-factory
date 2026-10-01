# app-store-payouts-swiss-tax-forms

## Verified

- All App Store developers must complete a US tax form to comply with the Paid Apps Agreement; non-US accounts may need W-8BEN, W-8BEN-E, or W-8ECI after App Store Connect questions: https://developer.apple.com/help/app-store-connect/manage-tax-information/provide-tax-information/
- Apple: banking information and tax forms are required to receive payments; some forms cannot be edited in App Store Connect after submit (contact Apple for corrections): https://developer.apple.com/help/app-store-connect/manage-tax-information/provide-tax-information/
- Apple procurement PDF: W-8BEN-E used for foreign entities; can exempt certain payments from 30% US withholding when treaty conditions met; foreign tax identification number required for valid treaty exemption; form valid three years from signature: https://www.apple.com/legal/procurement/docs/USTI.pdf
- IRS: Form W-8BEN-E documents foreign entity status for US withholding and reporting: https://www.irs.gov/forms-pubs/about-form-w-8-ben-e
- Google Play: non-US merchants submit W-8BEN (individual) via payments profile; missing info can lead to withholding or suspended payouts: https://support.google.com/googleplay/android-developer/answer/7163598 and https://support.google.com/googleplay/android-developer/answer/7161649?hl=en
- Google payments center: without valid tax form, backup withholding 24% or chapter 3 withholding 30% may apply on applicable US-source payments; treaty may reduce rate when valid form and claim submitted: https://support.google.com/paymentscenter/answer/10349995?hl=en
- Google Play VAT: developers responsible for determining, charging, and remitting VAT on paid app and in-app purchases by customers in Switzerland: https://support.google.com/googleplay/android-developer/answer/138000
- Google Play: for developers located in Switzerland, Google may apply Swiss VAT on service fees in some circumstances: https://support.google.com/googleplay/android-developer/answer/138000
- VAT registration duty in Switzerland from CHF 100'000 turnover (brief allows mention; recheck ESTV before quoting further): brief writer file only

## Not verified

- Exact US–Switzerland treaty withholding rate on App Store proceeds for a given entity type and income characterisation (treaty article and product counsel question)
- Whether a specific Swiss GmbH should treat all App Store inflows as royalties vs other income categories for Swiss tax
- Apple minimum payout threshold and exact payment calendar for Switzerland (not opened on Finance reports help in this pass)

## Do not claim

- W-8BEN-E field-by-field instructions as tax advice (calendar `apart`: experience only, say so)
- That completing US forms satisfies Swiss direct tax or MWST filing obligations
- Invented CPC, conversion, or «typical» net margin after store fees
