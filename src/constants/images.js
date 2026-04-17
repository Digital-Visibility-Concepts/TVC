/* ═══════════════════════════════════════════════════════════════════
   src/constants/images.js
   MASTER PHOTO REGISTRY — Tri-Valley Clinic
   
   HOW TO UPDATE WHEN NEW PHOTOS ARRIVE:
   1. Download from shop.imagequix.com (Japsharan.gill@gmail.com)
   2. Rename files as shown in the comments below
   3. Drop into public/assets/
   4. Update the path strings in this file ONLY
   5. Every page updates automatically — no other file needs touching
═══════════════════════════════════════════════════════════════════ */
 
const IMAGES = {
 
  /* ─────────────────────────────────────────────────────────────
     DR. GILL — APPROVED PHOTOS
     ✅ KEEP: Gill_Japsharan.jpg + dr j gill.jpg (existing)
     🔄 REPLACE when new shoot arrives (photo numbers from imagequix)
  ───────────────────────────────────────────────────────────────*/
 
  // Photo 18 of 19 — Dr. Gill WHITE BACKGROUND solo
  // → Used for: Doctor card in Meet the Team, About page card
  // → File to add: dr-gill-white.jpg
  DR_GILL_CARD: "/assets/Gill_Japsharan.jpg",           // 🔄 → /assets/dr-gill-white.jpg
 
  // Photo 1 of 19 — Dr. Gill OUTDOOR solo (green bokeh bg)
  // → Used for: Hero sections, biography sticky photo
  // → File to add: dr-gill-outdoor.jpg
  DR_GILL_HERO: "/assets/Gill_Japsharan.jpg",           // 🔄 → /assets/dr-gill-outdoor.jpg
 
  // Photo 7 of 19 — Dr. Gill OUTDOOR closer crop, brighter smile
  // → Used for: CTA sections, secondary bio photo
  // → File to add: dr-gill-outdoor2.jpg
  DR_GILL_HERO_2: "/assets/dr j gill.jpg",              // 🔄 → /assets/dr-gill-outdoor2.jpg
 
  // Existing inside clinic shot — NOT red face, approved
  // → Used for: biography section secondary sticky photo
  DR_GILL_INSIDE: "/assets/dr J gill-inside.jpg",       // ✅ Keep as-is
 
  /* ─────────────────────────────────────────────────────────────
     DR. GONDARA — APPROVED PHOTOS
     🔄 REPLACE when new shoot arrives
  ───────────────────────────────────────────────────────────────*/
 
  // Photo 19 of 19 — Dr. Gondara WHITE BACKGROUND solo
  // → Used for: Doctor card in Meet the Team
  // → File to add: dr-gondara-white.jpg
  DR_GONDARA_CARD: "/assets/dr G ap.jpg",               // 🔄 → /assets/dr-gondara-white.jpg
 
  // Existing Dr. Gondara working photo
  // → Used for: About biography secondary photo
  DR_GONDARA_WORKING: "/assets/dr G working.jpg",       // ✅ Keep as-is
 
  /* ─────────────────────────────────────────────────────────────
     BOTH DOCTORS TOGETHER
     🔄 REPLACE when new shoot arrives
  ───────────────────────────────────────────────────────────────*/
 
  // Photo 11 of 19 — Both doctors OUTDOOR, natural light
  // → Used for: About team section, homepage Meet Dr. Gill floating card
  // → File to add: both-doctors-outdoor.jpg
  BOTH_OUTDOOR: "/assets/dr G ap.jpg",                  // 🔄 → /assets/both-doctors-outdoor.jpg
 
  // Photo 15 of 19 — Both doctors INSIDE CLINIC (Tri-Valley sign bg)
  // → Used for: Homepage hero background shadow, About hero floating card
  // → File to add: both-doctors-clinic.jpg
  BOTH_CLINIC: "/assets/inside clinic1.jpg",            // 🔄 → /assets/both-doctors-clinic.jpg
 
  /* ─────────────────────────────────────────────────────────────
     CLINIC PHOTOS — approved, no changes needed
     ❌ REMOVED: reciptent.jpg (receptionist) — per Dr. Gill
     ❌ REMOVED: red-face photos from cards
  ───────────────────────────────────────────────────────────────*/
 
  CLINIC_INSIDE:    "/assets/inside clinic1.jpg",       // ✅ Reception/waiting area
  CLINIC_INTERIOR:  "/assets/inetrioir clinic.jpg",     // ✅ Interior hallway
  CLINIC_EXTERIOR:  "/assets/clinic1.jpg",              // ✅ Outside building
  CLINIC_OFFICE:    "/assets/office.jpg",               // ✅ Front office
  CLINIC_TABLE:     "/assets/emptytabel.jpg",           // ✅ Consultation room
  CLINIC_MAGAZINES: "/assets/magzize.jpg",              // ✅ Waiting lounge
  CLINIC_WASHROOM:  "/assets/washroom.jpg",             // ✅ Washroom (if needed)
 
  // ❌ NEVER USE THESE IN DOCTOR CARDS:
  // "/assets/reciptent.jpg"         → REMOVED per Dr. Gill
  // "/assets/Counsalting 2.jpg"     → Red face — bg/shadow use ONLY
  // "/assets/dr j gill 2.jpg"       → Red face — bg/shadow use ONLY
  // "/assets/counsalting.jpg"       → Red face — bg/shadow use ONLY
 
  /* ─────────────────────────────────────────────────────────────
     RED-FACE PHOTOS — BACKGROUND / SHADOW USE ONLY
     Per Dr. Gill: "I like my red face pics used as shadow pics for background"
  ───────────────────────────────────────────────────────────────*/
  BG_SHADOW_1: "/assets/Counsalting 2.jpg",             // ✅ Shadow/bg tint only
  BG_SHADOW_2: "/assets/dr j gill 2.jpg",               // ✅ Shadow/bg tint only
  BG_SHADOW_3: "/assets/counsalting.jpg",               // ✅ Shadow/bg tint only
 
  /* ─────────────────────────────────────────────────────────────
     LOGO
  ───────────────────────────────────────────────────────────────*/
  LOGO: "/assets/tri-valley-logo-header.png",           // ✅ PNG with transparent bg
};
 
export default IMAGES;