// src/constants/images.js
// MASTER PHOTO REGISTRY — update paths here only, every page updates automatically
// ❌ NEVER USE: reciptent.jpg | Counsalting 2.jpg | counsalting.jpg | dr j gill 2.jpg | Gill_Japsharan.jpg | dr j gill.jpg

const IMAGES = {

  // ── DR. GILL ──────────────────────────────────────────────────────
  DR_GILL_CARD:      "/assets/dr-gill-white.jpg",         // white bg solo (new shoot)
  DR_GILL_HERO:      "/assets/dr-gill-outdoor.jpg",        // outdoor solo hero (new shoot)
  DR_GILL_HERO_2:    "/assets/dr-gill-outdoor.jpg",        // same, secondary use
  DR_GILL_INSIDE:    "/assets/dr J gill-inside.jpg",       // inside clinic — approved, keep

  // ── DR. GONDARA ───────────────────────────────────────────────────
  DR_GONDARA_CARD:    "/assets/dr-gondara-white.jpg",      // white bg solo (new shoot)
  DR_GONDARA_WORKING: "/assets/dr2-consulting.jpg",        // Dr. Gondara with patient (new)

  // ── BOTH DOCTORS ──────────────────────────────────────────────────
  BOTH_OUTDOOR:       "/assets/both-doctors-outdoor.jpg",  // outdoor trees (new shoot)
  BOTH_CLINIC:        "/assets/both-doctors-clinic.jpg",   // inside clinic together (new shoot)
  BOTH_ARMS_CROSSED:  "/assets/both-doctors-arms-crossed.jpg", // white bg arms crossed (new)
  BOTH_RECEPTION:     "/assets/both1.jpg",                 // both at reception desk

  // ── CLINIC SPACES — clean, approved ──────────────────────────────
  // ❌ reciptent.jpg — PERMANENTLY BANNED (per Dr. Gill)
  CLINIC_INSIDE:    "/assets/inside clinic1.jpg",          // waiting area (no receptionist)
  CLINIC_INTERIOR:  "/assets/inetrioir clinic.jpg",        // ⚠️  has old people — use CLINIC_CHAIRS instead
  CLINIC_EXTERIOR:  "/assets/outdoor1.jpg",                // new exterior shot
  CLINIC_OFFICE:    "/assets/indoor1.jpg",                 // front office (indoor1 — office.jpg may not exist)
  CLINIC_TABLE:     "/assets/emptytabel.jpg",              // consultation room
  CLINIC_MAGAZINES: "/assets/magzize.jpg",                 // waiting lounge
  CLINIC_CHAIRS:    "/assets/chairs1.jpg",                 // ✅ clean waiting area — preferred over CLINIC_INTERIOR
  CLINIC_INDOOR:    "/assets/indoor1.jpg",                 // modern indoor — new clean shot
  CLINIC_CONSULT:   "/assets/dr2-consulting.jpg",          // Dr. Gondara consulting

  // ── BLOG POST THUMBNAILS (no red-face, no receptionist) ───────────
  BLOG_PSYCHIATRY:  "/assets/dr-gill-outdoor.jpg",         // Dr. Gill outdoor — psychiatry posts
  BLOG_WEIGHT:      "/assets/dr-gill-white.jpg",           // Dr. Gill white — weight loss posts
  BLOG_ADHD:        "/assets/dr2-consulting.jpg",          // consulting — ADHD posts
  BLOG_TELEHEALTH:  "/assets/indoor1.jpg",                 // clean indoor — telehealth posts
  BLOG_IV:          "/assets/chairs1.jpg",                 // chairs — IV hydration posts
  BLOG_MEDICATION:  "/assets/indoor1.jpg",                 // clean indoor — medication posts
  BLOG_TMS:         "/assets/inetrioir clinic.jpg",        // interior — TMS posts
  BLOG_WELLNESS:    "/assets/dr-gill-outdoor.jpg",         // Dr. Gill outdoor — wellness posts

  // ── RED-FACE — BACKGROUND/SHADOW USE ONLY ────────────────────────
  // Use ONLY as dark overlaid backgrounds — never as visible doctor photos
  BG_SHADOW_1: "/assets/Counsalting 2.jpg",
  BG_SHADOW_2: "/assets/dr j gill 2.jpg",
  BG_SHADOW_3: "/assets/counsalting.jpg",

  // ── LOGO ──────────────────────────────────────────────────────────
  LOGO: "/assets/tri-valley-logo-header.png",
};

export default IMAGES;