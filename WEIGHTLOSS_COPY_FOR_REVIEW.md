# Medical Weight Loss page: copy changes for clinic / SEO lead review

File: `src/pages/WeightLoss.jsx` (route `/medical-weight-loss`, unchanged).
Source: DVC AI Search Report, 9 Sep 2026. Goal: lead with the physician-led program, keep the medication detail lower down.

## Text strings changed (old → new)

| # | Where | Old | New |
|---|-------|-----|-----|
| 1 | SEO `title` (site appends " \| Tri-Valley Clinic") | GLP-1 Weight Loss Program Fremont CA | Medical Weight Loss Program Fremont, CA |
| 2 | SEO `description` | Physician-supervised GLP-1 weight loss program with Semaglutide and Tirzepatide in Fremont, CA. Personalized treatment plans by Dr. Gill. Evidence-based, safe, and effective. | Physician-led medical weight loss in Fremont, CA: ongoing monitoring, monthly check-ins and GLP-1 options (semaglutide, tirzepatide). Free consultation. |
| 3 | Hero small line | GLP-1 Therapy · Physician-Supervised Weight Loss Program | Medical Weight Loss Program · Fremont, CA |
| 4 | Hero paragraph, first sentence | Tri-Valley Clinic now offers a unique, structured GLP-1 program designed to support both physical and behavioral change—guided by licensed clinicians and built around your individual needs. | Tri-Valley Clinic offers a physician-led medical weight loss program designed to support both physical and behavioral change—built around your individual needs, with regular check-ins and clinical monitoring, and GLP-1 medication (semaglutide, tirzepatide) when clinically appropriate. |
| 5 | `OurProgram` H2 (was a duplicate of `HowProgramWorks`) | How the Program **Works** | What to **Expect** |

Unchanged: H1 "Real Weight Loss. Physician Supervised.", all `WhatAreGLP1s` text, all FAQ text.
"Safe, effective and science-backed." (end of hero paragraph) was kept as is.

## Structure changes (no text)

- Section order is now: Hero → Marquee → WhatSetsApartSection → HowProgramWorks → OurProgram → EligibilitySection → WhatAreGLP1s → PatientReviews (compact) → LeadCaptureSection → FAQSection → CTA.
- New `<PatientReviews variant="compact" />` before the lead form. It shows "5.0 · 21 Google reviews" and Google-only review cards (data from `src/constants/reviews.js`).
- `id="how-it-works"` is still on `HowProgramWorks`, so the hero button works.

## Points for the reviewers

- **"monthly check-ins" (row 2)** is in the meta description as supplied. The page body says "regular check-ins" and never "monthly". Please confirm it is accurate, or change the description to "regular check-ins".
- **"physician-led"** is used in the title/description/hero. This wording is already on the page (hero chip "Physician-Led", "Physician-Led From Start to Finish"). No "board-certified" claim is made for weight-loss care.
- **Hero chip "Compounded GLP-1"** and the `HowProgramWorks` footnote ("pharmacy-compounded GLP-1 medications") were not touched. Flagging them because of the earlier "Compounded" wording question.
- No results, weight-loss numbers, credentials or guarantees were added.
