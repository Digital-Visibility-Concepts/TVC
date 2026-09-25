/* ── SITE LAYERING SCALE ──────────────────────────────────
   The custom cursor MUST stay on top of everything. The page
   CSS sets `*{cursor:none !important}`, so anything painted
   above the cursor leaves the user with no visible pointer.

   Any new overlay goes BELOW 9998. Never above.
────────────────────────────────────────────────────────── */
export const Z = {
  header:          100,
  popupBackdrop:  9000,
  popupPanel:     9001,
  veeraWidget:    9500,   // also set in index.html
  cursorRing:     9998,
  cursorDot:      9999,
};
