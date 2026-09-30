# leave-requests
Primary query DE / EN: Ferienantrag digital / digital leave requests and approvals
SERP (top results seen, what they cover, the gap we fill): On 2026-09-30 the German results are Teams apps (Veroo365 UrlaubsManager, absentify, Team Absence, timeout). They sell residual balance, overlap warnings and calendar sync. absentify's own blog says Teams Approvals alone is a yes/no and does not keep a leave balance. The gap is the decision for a Swiss office: use the payroll or HR program when it already records request, approval and balance; otherwise a short form in Microsoft 365 or Google Workspace, with the manager's decision and a team calendar. No app ranking.
Verified facts (one per line, each with URL and access date):
- OR Art. 329a para. 1: at least four weeks of holiday per year of service, at least five weeks until the employee has completed their 20th year. https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de accessed 2026-09-30.
- OR Art. 329a para. 3: an incomplete year of service gets a pro-rata entitlement. Same URL and date.
- OR Art. 329c: holidays are generally granted during the service year; at least two weeks must be consecutive. The employer sets the timing and takes the employee's wishes into account insofar as that fits the business. Same URL and date.
- OR Art. 329d para. 2: during the employment relationship, holiday may not be replaced by a money payment or another benefit. Same URL and date.
- Power Automate approvals list "approving vacation time requests" as a typical case. Approvers can respond from an Outlook email, a Teams card, or the approvals action centre when licensed. https://learn.microsoft.com/en-us/power-automate/get-started-approvals accessed 2026-09-30.
- Microsoft's own walkthrough starts a vacation approval from a SharePoint list, emails the approver, writes the decision back. https://learn.microsoft.com/en-us/power-automate/modern-approvals accessed 2026-09-30.
- Forms connector has one trigger, "When a new response is submitted", and one action, "Get response details". https://learn.microsoft.com/en-us/power-automate/forms/overview accessed 2026-09-30.
- A SharePoint list or library with a date column can be shown as a calendar view. https://support.microsoft.com/en-us/sharepoint/lists/create-a-calendar-view-from-a-list accessed 2026-09-30.
- Outlook: an event with Show As set to Out of office is treated like busy; colleagues should not expect the person to be available. https://support.microsoft.com/en-gb/outlook/calendar/add-your-out-of-office-event-to-the-outlook-calendar-of-others accessed 2026-09-30.
- Google Forms: Responses, More, "Get email notifications for new responses". https://support.google.com/docs/answer/139706 accessed 2026-09-30.
- Google Calendar out of office: the calendar automatically declines meetings in that period. Work or school accounts. https://support.google.com/calendar/answer/7638168 accessed 2026-09-30.
- EDÖB: a personnel file may contain holiday data ("Angaben zu Krankschreibungen und Ferien"). Access is for HR and departments whose tasks require it. https://www.edoeb.admin.ch/de/verschiedene-phasen-des-arbeitsverhaeltnisses accessed 2026-09-30.
Vendor / product features used (URL each): Microsoft and Google URLs above. No leave-app prices or feature lists.
Not verifiable, therefore left out: canton public-holiday calendars, any bexio or Abacus leave module, residual-balance formulas beyond the OR minimum, carry-over deals in a specific GAV. Aurum has not built a payroll integration.
Internal links planned (seq-checked): automate-microsoft-365 (seq 35), automate-google-workspace (seq 36). payroll-preparation is seq 67, relatedPosts only.
Flag: Teams-app marketing is not used as fact. The post tells the reader to stay in payroll software when that software already does the job.
