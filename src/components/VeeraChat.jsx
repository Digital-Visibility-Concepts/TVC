// src/components/VeeraChat.jsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const EXCLUDED = ['/privacy-policy', '/terms-of-use', '/blog'];

export default function VeeraChat() {
  const { pathname } = useLocation();
  const loaded = useRef(false);
  const excluded = EXCLUDED.some(p => pathname.startsWith(p));

  // Inject script once — only on first visit to an allowed page
  useEffect(() => {
    if (excluded || loaded.current) return;
    loaded.current = true;

    const script = document.createElement('script');
    script.src = 'https://www.veeraai.in/static/veera/chat_widget.js';
    script.setAttribute('data-site-key', 'sk_8750132b0d574e00');
    script.setAttribute('data-agent-url', 'https://www.veeraai.in');
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