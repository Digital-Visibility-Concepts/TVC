/* ═══════════════════════════════════════════════════════════════
   src/constants/reviews.js
   SINGLE SOURCE OF TRUTH for patient reviews across the whole site.

   Source: Google Business Profile — Tri-Valley Clinic, Fremont CA
   Last verified: 30 September 2026
   Overall 5.0 · 21 Google reviews
     14 shown below (written text, shown verbatim)
      6 star-only reviews (no text — counted in GOOGLE_COUNT, nothing to show)
      1 written review deliberately NOT shown (it describes the
        reviewer's own clients as patients — third-party information)

   ⚠ RULES
   1. Only reviews that are on the live Google profile. Text is copied
      exactly as written (typos included). Never edit, merge or "fix" it.
   2. Names are shortened to "First L." Never show phone numbers, emails
      or full surnames. (One reviewer's Google display name contains a
      phone number — it must never appear on the site.)
   3. `stars` is null on purpose: the copied review text does not include
      each review's star value. Only set it to a number after checking
      that review on Google.
   4. `excerpt: true` = the review was cut off in the copy ("… More").
      Only the first complete sentence is shown, followed by " …", and
      the card links to the full review on Google.
   5. When you re-check the profile, update GOOGLE_SCORE, GOOGLE_COUNT
      and LAST_VERIFIED together.
   6. Do NOT add aggregateRating / Review structured data (JSON-LD).
      Google does not allow self-served review markup.
   ═══════════════════════════════════════════════════════════════ */

/* Canonical CID link built from the reviews deep-link supplied on
   30 Sep 2026:
     ...google.com/search?q=trivalleyclinic#lrd=0x808fc14d29f2f159:0x3a68495184db4547
   cid = the second hex value (0x3a68495184db4547) in decimal.
   The previous link (cid=16361608611692016573, lrd 0x879e4eb3fdf7146b:
   0xe3101c5845dff3bd) had a different place ID and is REPLACED.
   After deploying, click it once and confirm it opens
   "Tri-Valley Clinic — 680 Mowry Ave, Fremont". */
export const GOOGLE_URL = "https://www.google.com/maps?cid=4208694466247869767";
export const GOOGLE_SCORE = 5.0;
export const GOOGLE_COUNT = 21;

export const LAST_VERIFIED = "30 September 2026";

/* Award plaque (client change #12).
   File lives at public/assets/award-plaque-BR591300.png
   Set to null to hide the award block everywhere. */
export const AWARD_IMG = "/assets/award-plaque-BR591300.png";
export const AWARD_ALT =
  "BusinessRate June 2026 award plaque for Tri-Valley Clinic, Fremont, California";
export const AWARD_CAPTION = "BusinessRate Award Winner · June 2026";

/* Display order = priority (the homepage shows the first 3). */
export const REVIEWS = [
  {
    id: "g-adrian-h",
    name: "Adrian H.",
    stars: null,
    text:
      "Dr. Gondara has demonstrated great patience, compassion, and understanding since I've started meeting with him. I am greeted kindly every time I walk through the door by the nice young woman at the front desk, and then reassured that I'm in the right place when Dr. Gondara shakes my hand and feels like an old friend.",
  },
  {
    id: "g-eunice-t",
    name: "Eunice T.",
    stars: null,
    text:
      "Veronica at the front desk was very professional and friendly. Dr Gill took the time to explain all the services I will be receiving and made me Feel completely comfortable throughout the visit. No judgment at all—-just professionalism, kindness, and great care! Highly recommended.",
  },
  {
    id: "g-bhaglal-k",
    name: "Bhaglal K.",
    stars: null,
    text:
      "I highly recommend this clinic, Dr. Gondara is a great doctor who cares about his patient and provide quality care. The clinic staff is very responsive and helpful. Thank you very much!",
  },
  {
    id: "g-fay-l",
    name: "Fay L.",
    stars: null,
    excerpt: true,
    text:
      "Dr. Gill truly listens, shows deep empathy, and takes the time to ensure I feel heard and cared for as a whole person. …",
  },
  {
    id: "g-don-h",
    name: "Don H.",
    stars: null,
    text:
      "Amazing doctors and staff. I feel that I am in good hands at Tri-Valley Clinic. I highly recommend this clinic.",
  },
  {
    id: "g-eric-d",
    name: "Eric D.",
    stars: null,
    text:
      "Staff is very nice and accommodating. The clinic is very tranquil and serene. Felt like a spa. Veronica is great and very enthusiastic about what services are provided. She’s a great guide as you step into the clinic!",
  },
  {
    id: "g-jessica-s",
    name: "Jessica S.",
    stars: null,
    text:
      "Scheduling was super easy and the front desk was great to work with. Dr. Gondara was very calm and helpful, which was nice. Overall great experience",
  },
  {
    id: "g-ken-g",
    name: "Ken G.",
    stars: null,
    text: "Very attentive, Non judgmental and very relaxed atmosphere",
  },
  {
    id: "g-jib-k",
    name: "Jib K.",
    stars: null,
    excerpt: true,
    text:
      "I was really nervous going into my first IV service experience, but Veronica helped me feel comfortable and reassured throughout the entire process. …",
  },
  {
    id: "g-sydney-p",
    name: "Sydney P.",
    stars: null,
    text:
      "Veronica is the best!! Super quick service and they really care about their patients!",
  },
  {
    id: "g-antonisha-b",
    name: "Antonisha B.",
    stars: null,
    text: "This place is amazing and the people who works here are so welcoming.",
  },
  {
    id: "g-dlg-g",
    name: "Dlg G.",
    stars: null,
    text:
      "The doctors here are AWESOME. And the front desk staff is a wonderful person!!!",
  },
  {
    id: "g-tyler-h",
    name: "Tyler H.",
    stars: null,
    text: "Quick appt. Good Doctor",
  },
  {
    id: "g-qinwu-x",
    name: "Qinwu X.",
    stars: null,
    text:
      "I met Dr. Gondara, he is very professional and silled and sympathic, the front desk is very friendly. I highly recommended!",
  },
];

/* Short ones used in the site footer (must exist in REVIEWS above). */
export const FOOTER_REVIEW_IDS = ["g-don-h", "g-ken-g"];

export const REVIEW_DISCLAIMER =
  "Reviews are posted by patients on Google and shown as written. Names are shortened for privacy. Rating and review count reflect the practice's Google Business Profile.";
