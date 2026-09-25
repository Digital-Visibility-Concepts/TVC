/* ═══════════════════════════════════════════════════════════════
   src/constants/reviews.js
   SINGLE SOURCE OF TRUTH for patient reviews across the whole site.

   Source: https://www.zocdoc.com/practice/tri-valley-clinic-180668
   Last verified: 17 August 2026
   Overall 4.20 · Wait time 5.00 · Bedside manner 5.00 · 5 reviews
   All 5 reviews are for Dr. Shabeg Gondara. 3 have written text.

   ⚠ RULES
   1. Never add a review that is not on the live Zocdoc profile.
   2. If you update REVIEWS, update ZOC.dist and ZOC.count together
      so the displayed average still matches the distribution.
   3. Update LAST_VERIFIED whenever you re-check the profile.
   ═══════════════════════════════════════════════════════════════ */

export const ZOCDOC_URL =
  "https://www.zocdoc.com/practice/tri-valley-clinic-180668?dd_referrer=";

/* ── Google Business Profile ──────────────────────────────────
   Canonical CID link, derived from the reviews deep-link Dr. Gill
   supplied. Preferred over the original
   ...google.com/search?q=Tri-Valley+Clinic#lrd=0x879e4eb3fdf7146b:0xe3101c5845dff3bd
   because that one relies on a #fragment that Google handles in
   JavaScript — shared like that it often lands on a plain search
   page instead of opening the reviews panel. The cid form is stable.

   GOOGLE_SCORE / GOOGLE_COUNT are intentionally null: as of the April
   handoff the profile had a single 5-star review, and an unverified
   "5.0" beside the honest 4.2 from Zocdoc would read as cherry-picked.
   Set both only once someone has confirmed the live numbers, and the
   rating line will start rendering automatically. */
export const GOOGLE_URL = "https://www.google.com/maps?cid=16361608611692016573";
export const GOOGLE_SCORE = null;  // e.g. 5.0
export const GOOGLE_COUNT = null;  // e.g. 1

export const LAST_VERIFIED = "17 August 2026";

/* Award plaque (client change #12).
   File lives at public/assets/award-plaque-BR591300.png
   Set to null to hide the award block everywhere. */
export const AWARD_IMG = "/assets/award-plaque-BR591300.png";
export const AWARD_ALT =
  "BusinessRate June 2026 award plaque for Tri-Valley Clinic, Fremont, California";
export const AWARD_CAPTION = "BusinessRate Award Winner · June 2026";

export const ZOC = {
  overall: 4.2,
  count: 5,
  subs: [
    { label: "Wait Time", value: 5.0 },
    { label: "Bedside Manner", value: 5.0 },
  ],
  /* stars → number of reviews at that rating.
     4×5★ + 1×1★ = 21/5 = 4.20 average ✓ */
  dist: [
    { stars: 5, n: 4 },
    { stars: 4, n: 0 },
    { stars: 3, n: 0 },
    { stars: 2, n: 0 },
    { stars: 1, n: 1 },
  ],
};

/* Only reviews that have written text are listed — the remaining two
   on the profile (one 5★, one 1★) have hidden initials and no body,
   so there is nothing to display. Both are still counted in ZOC. */
export const REVIEWS = [
  {
    id: "zd-danny-o",
    name: "Danny O.",
    date: "June 11, 2026",
    stars: 5,
    provider: "Dr. Shabeg Gondara, MD",
    text:
      "Felt understood, look forward to figuring out what care plan will be best for me.",
  },
  {
    id: "zd-ns",
    name: "N.S.",
    date: null,
    stars: 5,
    provider: "Dr. Shabeg Gondara, MD",
    text:
      "Dr. Gondara was extremely professional and thoughtful during our appointment and took the time to patiently explain everything while addressing all concerns I had. I highly recommend the service and expertise of Dr. Gondara.",
  },
  {
    id: "zd-tyler-h",
    name: "Tyler H.",
    date: "June 2, 2026",
    stars: 5,
    provider: "Dr. Shabeg Gondara, MD",
    text: "Quick appt. Great staff Awesome Doctor.",
  },
];

export const REVIEW_DISCLAIMER =
  "Reviews are collected and verified by Zocdoc after each appointment and are displayed as written. Ratings shown reflect the practice's full Zocdoc profile.";