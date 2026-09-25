/* ═══════════════════════════════════════════════════════════════
   src/components/PatientReviews.jsx

   Reusable patient-reviews block. Data lives in
   src/constants/reviews.js — never hardcode a review here.

   USAGE
   ─────
   Homepage (headline + rating column + stacked reviews):
     <PatientReviews />

   Service pages (slim header + 3 cards side by side):
     <PatientReviews variant="compact" />

   On a dark section:
     <PatientReviews variant="compact" tone="dark" />

   PROPS
   ─────
   variant       "full" | "compact"        default "full"
   tone          "light" | "dark"          default "light"
   eyebrow       string                    default "Patient Reviews"
   heading       string                    default "Real Patients,"
   headingAccent string (italic gold)      default "Real Results"
   max           max reviews shown         default 3
   showAward     boolean                   default true (needs AWARD_IMG set)
   showDist      star breakdown            default true on full, false on compact
   id            string, for anchor links
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import {
  ZOCDOC_URL,
  ZOC,
  REVIEWS,
  AWARD_IMG,
  AWARD_ALT,
  AWARD_CAPTION,
  REVIEW_DISCLAIMER,
  GOOGLE_URL,
  GOOGLE_SCORE,
  GOOGLE_COUNT,
} from "../constants/reviews";

/* ── Self-contained reveal hook (no dependency on Home.jsx) ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Theme tokens ── */
const TONES = {
  light: {
    sectionBg: "#FDFAF6",
    cardBg: "#F5EEE4",
    border: "#E8D5BE",
    rule: "#E8D5BE",
    gold: "#B8925A",
    goldSoft: "rgba(184,146,90,0.30)",
    starEmpty: "#E3D5BE",
    heading: "#2C1A0E",
    body: "#3D2B1F",
    muted: "#7A6556",
    track: "#E8D5BE",
  },
  dark: {
    sectionBg: "linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)",
    cardBg: "rgba(245,238,228,0.05)",
    border: "rgba(184,146,90,0.20)",
    rule: "rgba(184,146,90,0.20)",
    gold: "#C9A46A",
    goldSoft: "rgba(201,164,106,0.35)",
    starEmpty: "rgba(184,146,90,0.22)",
    heading: "#F0E8DA",
    body: "#E8D5BE",
    muted: "#A89880",
    track: "rgba(184,146,90,0.15)",
  },
};

/* ── Star primitives ───────────────────────────────────────────
   Deterministic markup, no generated gradient IDs, so react-snap
   prerendered HTML matches client hydration exactly.
──────────────────────────────────────────────────────────────*/
function StarSvg({ size = 13, color = "#B8925A" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      style={{ flexShrink: 0, display: "block" }}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

/* Renders fractional ratings: 4.2 becomes 4 gold stars + 20% of the fifth. */
function StarRow({ value, size = 13, gap = 2, label, t }) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100;
  const row = (color) => (
    <span style={{ display: "inline-flex", gap, flexShrink: 0, lineHeight: 0 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarSvg key={i} size={size} color={color} />
      ))}
    </span>
  );
  return (
    <span
      role="img"
      aria-label={label || `${value} out of 5 stars`}
      style={{ position: "relative", display: "inline-flex", lineHeight: 0 }}
    >
      {row(t.starEmpty)}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pct}%`,
          overflow: "hidden",
          display: "inline-flex",
          lineHeight: 0,
        }}
      >
        {row(t.gold)}
      </span>
    </span>
  );
}

function ZocdocMark({ size = 14 }) {
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 font-bold"
      style={{
        width: size + 6,
        height: size + 6,
        background: "#FFF0A0",
        color: "#1A0F08",
        fontSize: size - 3,
        fontFamily: "'Jost', sans-serif",
        letterSpacing: "-0.02em",
      }}
      aria-hidden="true"
    >
      Z
    </span>
  );
}

const KEYFRAMES = `
@keyframes tvcRevIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes tvcAwardIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
@keyframes tvcFadeIn{from{opacity:0}to{opacity:1}}
.tvc-award-modal, .tvc-award-modal * { cursor: default !important; }
.tvc-award-modal button { cursor: pointer !important; }
@media (prefers-reduced-motion: reduce){
  .tvc-rev-anim, .tvc-award-anim { animation: none !important; transition: none !important }
}
`;

/* ══ Award lightbox ═══════════════════════════════════════════
   The overlay itself scrolls, and the caption + close button sit
   INSIDE the panel flow, so nothing is pushed off-screen.
   z-[10000] clears the custom cursor divs at 9998/9999.
──────────────────────────────────────────────────────────────*/
function AwardLightbox({ onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const nodes = panelRef.current?.querySelectorAll("button, [href]");
        if (!nodes || !nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (prevFocus instanceof HTMLElement) prevFocus.focus();
    };
  }, [onClose]);

  return (
    <div
      className="tvc-award-modal tvc-award-anim fixed inset-0 z-[10000] overflow-y-auto"
      style={{
        background: "rgba(10,6,4,0.90)",
        backdropFilter: "blur(3px)",
        animation: "tvcFadeIn 0.22s ease both",
      }}
      onClick={onClose}
    >
      {/* min-h-full centres the panel when it fits and allows scroll when it doesn't */}
      <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Tri-Valley Clinic award plaque"
          className="tvc-award-anim w-full"
          style={{
            maxWidth: 560,
            animation: "tvcAwardIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header bar — in normal flow, never clipped */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="min-w-0">
              <p
                className="text-[9px] tracking-[0.28em] uppercase font-semibold mb-1"
                style={{ color: "#C9A46A" }}
              >
                Recognition
              </p>
              <p
                className="text-[17px] sm:text-[19px] leading-snug"
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  color: "#F0E8DA",
                }}
              >
                {AWARD_CAPTION}
              </p>
            </div>

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close award image"
              className="flex items-center justify-center flex-shrink-0 transition-colors duration-200"
              style={{
                width: 44,
                height: 44,
                border: "1px solid rgba(201,164,106,0.45)",
                color: "#C9A46A",
                background: "rgba(26,15,8,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C9A46A";
                e.currentTarget.style.color = "#1A0F08";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(26,15,8,0.6)";
                e.currentTarget.style.color = "#C9A46A";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <img
            src={AWARD_IMG}
            alt={AWARD_ALT || "Tri-Valley Clinic award plaque"}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: "calc(100vh - 190px)",
              objectFit: "contain",
              border: "1px solid rgba(201,164,106,0.30)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
            }}
          />

          <p className="text-[9px] mt-3 leading-relaxed" style={{ color: "#A89880" }}>
            Press Escape or tap outside the image to close.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Award block ── */
function AwardBlock({ t }) {
  const [open, setOpen] = useState(false);
  if (!AWARD_IMG) return null;

  return (
    <>
      <div
        className="p-5 border flex items-center gap-4"
        style={{ background: t.cardBg, borderColor: t.border }}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="View award image full size"
          className="flex-shrink-0 relative group"
          style={{ lineHeight: 0, border: "none", background: "none", padding: 0 }}
        >
          <img
            src={AWARD_IMG}
            alt={AWARD_ALT || "Tri-Valley Clinic award plaque"}
            style={{ width: 64, height: "auto", display: "block" }}
          />
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(184,146,90,0.25)" }}
          />
        </button>

        <div className="min-w-0">
          <p
            className="text-[9px] tracking-[0.2em] uppercase font-semibold mb-1"
            style={{ color: t.gold }}
          >
            Recognition
          </p>
          <p
            className="text-[14px] leading-snug mb-2"
            style={{ fontFamily: "'Cormorant Garamond',serif", color: t.heading }}
          >
            {AWARD_CAPTION}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2 text-[9px] tracking-[0.18em] uppercase font-semibold"
            style={{ color: t.gold }}
          >
            View Award
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>

      {open && <AwardLightbox onClose={() => setOpen(false)} />}
    </>
  );
}

function GoogleMark({ size = 14 }) {
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 font-bold"
      style={{
        width: size + 6,
        height: size + 6,
        background: "#4285F4",
        color: "#FFFFFF",
        fontSize: size - 3,
        fontFamily: "'Jost', sans-serif",
        letterSpacing: "-0.02em",
      }}
      aria-hidden="true"
    >
      G
    </span>
  );
}

/* ── Outbound Google reviews link ──────────────────────────────
   Shows a rating line only when GOOGLE_SCORE and GOOGLE_COUNT are
   set in reviews.js, so this can never display a number nobody has
   verified. Link-only until then. */
function GoogleLink({ t }) {
  if (!GOOGLE_URL) return null;
  const hasScore = GOOGLE_SCORE != null && GOOGLE_COUNT != null;

  return (
    <a
      href={GOOGLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border px-6 py-3.5 transition-all duration-300 w-full"
      style={{ background: t.cardBg, borderColor: t.border, color: t.muted }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = t.goldSoft;
        e.currentTarget.style.color = t.gold;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.color = t.muted;
      }}
    >
      <span className="flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase">
        <GoogleMark size={12} />
        Read our reviews on Google
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          &rarr;
        </span>
      </span>

      {hasScore && (
        <span className="flex items-center justify-center gap-2 mt-2">
          <span
            className="text-[15px]"
            style={{ fontFamily: "'Cormorant Garamond',serif", color: t.gold }}
          >
            {Number(GOOGLE_SCORE).toFixed(1)}
          </span>
          <StarRow value={Number(GOOGLE_SCORE)} size={10} t={t} />
          <span className="text-[9px] tracking-[0.16em] uppercase" style={{ color: t.muted }}>
            {GOOGLE_COUNT} {GOOGLE_COUNT === 1 ? "review" : "reviews"}
          </span>
        </span>
      )}
    </a>
  );
}

/* ── Outbound Zocdoc link ── */
function ZocdocLink({ t }) {
  return (
    <a
      href={ZOCDOC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-3 border px-6 py-3.5 text-[10px] tracking-widest uppercase transition-all duration-300 w-full"
      style={{ background: t.cardBg, borderColor: t.border, color: t.muted }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = t.goldSoft;
        e.currentTarget.style.color = t.gold;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.color = t.muted;
      }}
    >
      <ZocdocMark size={12} />
      Read all reviews on Zocdoc
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </a>
  );
}

/* ── One review card. Natural height — no forced stretch. ── */
function ReviewCard({ rev, t, equalise = false }) {
  return (
    <div
      className={`border p-6 md:p-7 flex flex-col ${equalise ? "h-full" : ""}`}
      style={{ background: t.cardBg, borderColor: t.border }}
    >
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <StarRow value={rev.stars} t={t} label={`${rev.stars} out of 5 stars`} />
        <span className="w-px h-3" style={{ background: t.goldSoft }} />
        <span
          className="text-[9px] tracking-[0.18em] uppercase"
          style={{ color: t.muted }}
        >
          {rev.provider}
        </span>
      </div>

      <p
        className={`text-[17px] md:text-[18px] leading-relaxed font-light mb-5 ${
          equalise ? "flex-1" : ""
        }`}
        style={{ fontFamily: "'Cormorant Garamond',serif", color: t.body }}
      >
        <span style={{ color: t.goldSoft, marginRight: 2 }}>&ldquo;</span>
        {rev.text}
        <span style={{ color: t.goldSoft, marginLeft: 2 }}>&rdquo;</span>
      </p>

      <div
        className="border-t pt-4 flex items-center justify-between gap-4"
        style={{ borderColor: t.rule }}
      >
        <div>
          <p
            className="text-[17px] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond',serif", color: t.heading }}
          >
            {rev.name}
          </p>
          <p
            className="text-[9px] tracking-[0.18em] uppercase mt-0.5"
            style={{ color: t.muted }}
          >
            Verified Patient{rev.date ? ` · ${rev.date}` : ""}
          </p>
        </div>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          <ZocdocMark size={11} />
          <span
            className="text-[8px] tracking-[0.16em] uppercase"
            style={{ color: t.muted }}
          >
            Zocdoc
          </span>
        </span>
      </div>
    </div>
  );
}

/* ── Rating summary card ── */
function RatingCard({ t, vis, showDist }) {
  return (
    <div className="p-7 border" style={{ background: t.cardBg, borderColor: t.border }}>
      <div
        className="flex items-center gap-2 mb-5 pb-4 border-b"
        style={{ borderColor: t.rule }}
      >
        <ZocdocMark />
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: t.muted }}
        >
          Verified on Zocdoc
        </span>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <span
          className="text-6xl leading-none"
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            color: t.gold,
          }}
        >
          {ZOC.overall.toFixed(1)}
        </span>
        <div className="pb-1.5">
          <div className="mb-1">
            <StarRow
              value={ZOC.overall}
              t={t}
              label={`${ZOC.overall} out of 5 on Zocdoc`}
            />
          </div>
          <p
            className="text-[9px] tracking-[0.18em] uppercase"
            style={{ color: t.muted }}
          >
            {ZOC.count} Verified Reviews
          </p>
        </div>
      </div>

      {showDist &&
        ZOC.dist.map((d) => {
          const pct = Math.round((d.n / ZOC.count) * 100);
          return (
            <div key={d.stars} className="flex items-center gap-3 mb-1.5">
              <span className="text-[10px] w-3 text-right" style={{ color: t.muted }}>
                {d.stars}
              </span>
              <StarSvg size={10} color={t.gold} />
              <div className="flex-1 h-1 overflow-hidden" style={{ background: t.track }}>
                <div
                  className="h-full transition-all duration-1000"
                  style={{ width: `${vis ? pct : 0}%`, background: t.gold }}
                />
              </div>
              <span className="text-[10px] w-7 text-right" style={{ color: t.muted }}>
                {pct}%
              </span>
            </div>
          );
        })}

      <div className="mt-5 pt-4 border-t space-y-2.5" style={{ borderColor: t.rule }}>
        {ZOC.subs.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <span
              className="text-[9px] tracking-[0.16em] uppercase"
              style={{ color: t.muted }}
            >
              {s.label}
            </span>
            <span className="flex items-center gap-2">
              <StarRow
                value={s.value}
                size={10}
                t={t}
                label={`${s.label} ${s.value} out of 5`}
              />
              <span
                className="text-[13px]"
                style={{ fontFamily: "'Cormorant Garamond',serif", color: t.gold }}
              >
                {s.value.toFixed(1)}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function PatientReviews({
  variant = "full",
  tone = "light",
  eyebrow = "Patient Reviews",
  heading = "Real Patients,",
  headingAccent = "Real Results",
  max = 3,
  showAward = true,
  showDist,
  id,
}) {
  const t = TONES[tone] || TONES.light;
  const [ref, vis] = useReveal();

  const items = REVIEWS.slice(0, max);
  if (!items.length) return null;

  const distOn = showDist ?? variant === "full";

  /* ─────────── COMPACT — service pages, 3 across ─────────── */
  if (variant === "compact") {
    return (
      <section id={id} className="py-20 px-5 md:px-10" style={{ background: t.sectionBg }}>
        <style>{KEYFRAMES}</style>
        <div className="mx-auto max-w-7xl">
          <div
            ref={ref}
            className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 transition-all duration-700 ${
              vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: t.gold }} />
                <span
                  className="text-[10px] tracking-[0.28em] uppercase font-semibold"
                  style={{ color: t.gold }}
                >
                  {eyebrow}
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 300,
                  color: t.heading,
                  lineHeight: 1.05,
                }}
              >
                {heading}
                <br />
                <em className="italic" style={{ color: t.gold }}>
                  {headingAccent}
                </em>
              </h2>
            </div>

            <div
              className="flex items-center gap-5 border px-6 py-4 flex-shrink-0"
              style={{ background: t.cardBg, borderColor: t.border }}
            >
              <div className="flex items-end gap-2.5">
                <span
                  className="text-4xl leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 300,
                    color: t.gold,
                  }}
                >
                  {ZOC.overall.toFixed(1)}
                </span>
                <div className="pb-1">
                  <div className="mb-0.5">
                    <StarRow value={ZOC.overall} size={11} t={t} />
                  </div>
                  <p
                    className="text-[8px] tracking-[0.16em] uppercase"
                    style={{ color: t.muted }}
                  >
                    {ZOC.count} reviews
                  </p>
                </div>
              </div>
              <span className="w-px self-stretch" style={{ background: t.rule }} />
              <a
                href={ZOCDOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[9px] tracking-[0.16em] uppercase font-semibold whitespace-nowrap"
                style={{ color: t.gold }}
              >
                <ZocdocMark size={11} />
                On Zocdoc
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
            {items.map((r, i) => (
              <div
                key={r.id}
                className={`tvc-rev-anim transition-all duration-700 ${
                  vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <ReviewCard rev={r} t={t} equalise />
              </div>
            ))}
          </div>

          {showAward && AWARD_IMG && (
            <div className="mt-3 max-w-md">
              <AwardBlock t={t} />
            </div>
          )}

          <p
            className="text-[9px] mt-6 leading-relaxed max-w-2xl"
            style={{ color: t.muted, opacity: 0.75 }}
          >
            {REVIEW_DISCLAIMER}
          </p>
        </div>
      </section>
    );
  }

  /* ─────────── FULL — homepage ───────────
     Headline spans the full width, so both columns start at the same
     baseline with no magic offset. Reviews are stacked rather than in a
     carousel: with 3 reviews a carousel hides two thirds of the proof
     behind a click, and stacking fills the column with real content
     instead of stretching one card over empty space.
  ─────────────────────────────────────────*/
  return (
    <section id={id} className="py-24 px-5 md:px-10" style={{ background: t.sectionBg }}>
      <style>{KEYFRAMES}</style>
      <div className="mx-auto max-w-7xl">
        {/* Header — full width */}
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 transition-all duration-700 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: t.gold }} />
              <span
                className="text-[10px] tracking-[0.28em] uppercase font-semibold"
                style={{ color: t.gold }}
              >
                {eyebrow}
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                color: t.heading,
                lineHeight: 1.05,
              }}
            >
              {heading}
              <br />
              <em className="italic" style={{ color: t.gold }}>
                {headingAccent}
              </em>
            </h2>
          </div>

          <p
            className="text-[13px] font-light leading-relaxed md:text-right md:max-w-xs"
            style={{ color: t.muted }}
          >
            Every review below was collected and verified by Zocdoc after an
            appointment, and is shown exactly as written.
          </p>
        </div>

        {/* Two columns, same top baseline */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
          {/* LEFT — rating, award, link */}
          <div className="flex flex-col gap-3">
            <RatingCard t={t} vis={vis} showDist={distOn} />
            {showAward && <AwardBlock t={t} />}
            <ZocdocLink t={t} />
            <GoogleLink t={t} />
          </div>

          {/* RIGHT — stacked reviews */}
          <div className="flex flex-col gap-3">
            {items.map((r, i) => (
              <div
                key={r.id}
                className={`tvc-rev-anim transition-all duration-700 ${
                  vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${120 + i * 120}ms` }}
              >
                <ReviewCard rev={r} t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer — full width */}
        <p
          className="text-[9px] mt-8 leading-relaxed max-w-2xl"
          style={{ color: t.muted, opacity: 0.75 }}
        >
          {REVIEW_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}