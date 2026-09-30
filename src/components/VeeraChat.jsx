// src/components/VeeraChat.jsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const EXCLUDED = ['/privacy-policy', '/terms-of-use', '/blog'];

/* Embed snippet supplied by Chirasha (Veera dashboard). Values must stay identical:
   <script src="https://www.veeraai.in/static/veera/chat_widget.js"
           data-site-key="sk_8750132b0d574e00"
           data-agent-url="https://www.veeraai.in"></script> */
const WIDGET_SRC = 'https://www.veeraai.in/static/veera/chat_widget.js';
const SITE_KEY   = 'sk_8750132b0d574e00';
const AGENT_URL  = 'https://www.veeraai.in';

export default function VeeraChat() {
  const { pathname } = useLocation();
  const loaded = useRef(false);
  const excluded = EXCLUDED.some(p => pathname.startsWith(p));

  // Inject the widget script exactly once, only on allowed pages.
  useEffect(() => {
    if (excluded || loaded.current) return;

    // react-snap prerenders in a headless browser. Never let it bake the
    // widget <script> into the static HTML (the browser would then load it
    // once from the HTML and once more from this effect).
    if (/ReactSnap/i.test(navigator.userAgent)) return;

    // Already on the page (older cached HTML, or a previous mount)? Don't add another.
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      loaded.current = true;
      return;
    }

    loaded.current = true;
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.setAttribute('data-site-key', SITE_KEY);
    script.setAttribute('data-agent-url', AGENT_URL);
    script.async = true;
    document.body.appendChild(script);
  }, [excluded]);

  // Hide widget on excluded routes, show it everywhere else
  useEffect(() => {
    const toggle = () => {
      ['iframe[src*="veeraai"]', '[class*="veera"]', '[id*="veera"]'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.style.setProperty('display', excluded ? 'none' : '', 'important');
        });
      });
    };

    // Run immediately + after delay (widget renders async)
    toggle();
    const t = setTimeout(toggle, 800);
    return () => clearTimeout(t);
  }, [pathname, excluded]);

  return null;
}
