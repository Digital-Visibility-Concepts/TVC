/* eslint-disable react-refresh/only-export-components */
/* ═══════════════════════════════════════════════════════════════
   src/components/SitePopups.jsx

   Mounted ONCE in App.jsx. Decides which popup to show from the
   current route, and remembers what the visitor has dismissed.

   RULES
   ─────
   1. Homepage        → GLP-1 first, then TMS 0.5s after it closes
   2. Any other page  → TMS only
   3. Dismissed once  → never shown again for the rest of the session
   4. Hard cap        → each popup is seen at most ONCE, so a visitor
                        gets at most 2 popups in total, ever

   Rule 3 uses sessionStorage, one flag per popup, so a dismissal
   carries across page loads, refreshes, and the round-trip to the
   WordPress blog. Flags clear when the tab closes, so a genuine
   return visit sees the promo again.

   The component lives in App.jsx so it does not remount on
   client-side navigation, but it DOES watch the route. A visitor who
   lands on /psychiatry (TMS only) and later reaches the homepage
   still gets the GLP-1 promo — once. The flags make more than once
   impossible.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

/* ── Config ──────────────────────────────────────────────────── */

const FIRST_DELAY = 4000;   // ms before the first popup on a page
const GAP_DELAY   = 500;    // ms between closing one and opening the next

/* The GLP-1 promo is homepage-only. */
const GLP1_ROUTES = ["/"];

/* Routes where the TMS popup is pointless or unwanted.
   /tms-therapy is excluded because the popup's Book Now button links
   to that same page. Set to [] to show it on every page. */
const TMS_EXCLUDE = ["/tms-therapy", "/privacy-policy", "/terms-of-use"];

/* Switch to "localStorage" if the client wants a dismissal to stick
   permanently instead of for the browsing session only. */
const STORE = "sessionStorage";

const SEEN_KEY = {
  glp1: "tvc_popup_glp1_seen",
  tms:  "tvc_popup_tms_seen",
};

/* ── Storage — never throws, private browsing blocks these ───── */

function hasSeen(key) {
  try { return window[STORE].getItem(SEEN_KEY[key]) === "1"; }
  catch { return false; }
}

function markSeen(key) {
  try { window[STORE].setItem(SEEN_KEY[key], "1"); }
  catch { /* storage blocked — popup may reappear on a later load */ }
}

/* ── Shell ───────────────────────────────────────────────────── */

function PopupShell({ titleId, onClose, children }) {
  const closeRef = useRef(null);
  const boxRef = useRef(null);
  const [show, setShow] = useState(false);
  const [reduceMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && boxRef.current) {
        const focusables = boxRef.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-[#1A0F08]/70" onClick={onClose} />
      <div ref={boxRef} role="dialog" aria-modal="true" aria-labelledby={titleId}
        className={`relative z-[9001] w-full max-w-md bg-[#FDFAF6] border border-[#E8D5BE] shadow-2xl ${reduceMotion ? "" : "transition-all duration-400"} ${show || reduceMotion ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
        <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent" />
        <button ref={closeRef} onClick={onClose} aria-label="Close"
          className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center text-[#7A6556] hover:text-[#B8925A] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div className="p-8 md:p-10">{children}</div>
      </div>
    </div>
  );
}

/* ── Popup bodies ────────────────────────────────────────────── */

function Glp1Popup({ onClose }) {
  return (
    <PopupShell titleId="glp1-popup-heading" onClose={onClose}>
      <div className="flex items-center gap-2 mb-4"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse" /><span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Limited-Time Offer</span></div>
      <h2 id="glp1-popup-heading" className="text-3xl md:text-4xl text-[#2C1A0E] mb-7" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>15% Off <em className="italic text-[#B8925A]">GLP-1 Treatment.</em></h2>
      <a href="/medical-weight-loss#glp1-form" className="group flex items-center justify-center gap-3 bg-[#B8925A] text-[#FDFAF6] py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">See If I Qualify <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
    </PopupShell>
  );
}

function TmsPopup({ onClose }) {
  return (
    <PopupShell titleId="tms-popup-heading" onClose={onClose}>
      <div className="flex items-center gap-2 mb-4"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse" /><span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Now Available</span></div>
      <h2 id="tms-popup-heading" className="text-3xl md:text-4xl text-[#2C1A0E] mb-4" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>TMS Therapy Is Now <em className="italic text-[#B8925A]">Available.</em></h2>
      <p className="text-[#7A6556] text-sm leading-relaxed font-light mb-7">TMS Therapy is now available at Tri-Valley Clinic. A non-invasive, FDA-approved treatment for depression. Schedule your consultation today.</p>
      <a href="/tms-therapy#consultation" className="group flex items-center justify-center gap-3 bg-[#B8925A] text-[#FDFAF6] py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">Book Now <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
    </PopupShell>
  );
}

/* ── Coordinator ─────────────────────────────────────────────── */

/* Normalise "/psychiatry/" and "/Psychiatry" to "/psychiatry" so the
   exclude list can't be defeated by a trailing slash or casing. */
function normalise(pathname) {
  const p = (pathname || "/").toLowerCase().replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function getSequence(pathname) {
  const path = normalise(pathname);
  const seq = [];
  if (GLP1_ROUTES.map(normalise).includes(path)) seq.push("glp1");
  if (!TMS_EXCLUDE.map(normalise).includes(path)) seq.push("tms");
  return seq;
}

/** What this route should show right now, given what's been dismissed. */
export function getPending(pathname) {
  return getSequence(pathname).filter((k) => !hasSeen(k));
}

export default function SitePopups() { 
  const { pathname } = useLocation();
  const [active, setActive] = useState(null);   // "glp1" | "tms" | null
  const [round, setRound] = useState(0);        // bumped on close, re-runs the queue
  const chained = useRef(false);                // true = opening straight after a close
  const lastPath = useRef(pathname);

  useEffect(() => {
    /* A route change ends any chain, so the next popup on a fresh page
       waits the full delay instead of appearing in 500ms. */
    if (lastPath.current !== pathname) {
      chained.current = false;
      lastPath.current = pathname;
    }

    if (active) return;                          // only ever one at a time

    const pending = getPending(pathname);
    if (!pending.length) return;

    const delay = chained.current ? GAP_DELAY : FIRST_DELAY;
    const t = setTimeout(() => setActive(pending[0]), delay);
    return () => clearTimeout(t);                // cancels if they navigate away first
  }, [pathname, active, round]);

  const close = useCallback(() => {
    setActive((current) => {
      if (current) markSeen(current);
      return null;
    });
    chained.current = true;
    setRound((r) => r + 1);
  }, []);

  if (!active) return null;

  /* key forces a fresh mount so the fade-in and focus replay for the
     second popup instead of the shell being reused. */
  return active === "glp1"
    ? <Glp1Popup key="glp1" onClose={close} />
    : <TmsPopup key="tms" onClose={close} />;
}