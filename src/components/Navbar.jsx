/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    label: "Services",
    dropdown: [
      { label: "Psychiatric Services",       to: "/psychiatric"  },
      { label: "Medical Weight Loss / GLP-1",to: "/weight-loss"  },
      { label: "IV Hydration Therapy",       to: "/iv-hydration" },
      { label: "TMS Therapy",                to: "/tms"          },
      { label: "Telehealth",                 to: "/telehealth"   },
    ],
  },
  { label: "About",     to: "/about"     },
  { label: "Insurance", to: "/insurance" },
  { label: "Financing", to: "/financing" },
  { label: "Blog",      to: "/blog"      },
  { label: "Contact",   to: "/contact"   },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownRef = useRef(null);
  const location    = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <>
      {/* ══ ANNOUNCEMENT BAR ══ */}
      <div className="hidden md:flex items-center justify-center gap-6 bg-[#F5EEE4] border-b border-[#E8D5BE] px-6 py-[7px]">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#7A6556] font-light">
          Mon – Fri &nbsp;&nbsp;9:30 AM – 5:30 PM
        </span>
        <Pip />
        <span className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#B8925A] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse inline-block" />
          Accepting New Patients
        </span>
        <Pip />
        <a
          href="tel:5105984921"
          className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#2C1A0E] hover:text-[#B8925A] transition-colors duration-200"
        >
          <PhoneIcon /> (510)&nbsp;598-4921
        </a>
      </div>

      {/* ══ MAIN NAVBAR ══ */}
      <nav
        ref={dropdownRef}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#FDFAF6]/96 backdrop-blur-lg shadow-[0_1px_24px_rgba(44,26,14,0.09)] border-b border-[#E8D5BE]"
            : "bg-[#FDFAF6] border-b border-[#E8D5BE]/70"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10 h-[74px]">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/assets/tri-valley-logo-header.png"
              alt="Tri-Valley Clinic"
              className="h-12 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <DropdownItem
                  key={link.label}
                  link={link}
                  isOpen={activeDropdown === link.label}
                  onToggle={() =>
                    setActiveDropdown(activeDropdown === link.label ? null : link.label)
                  }
                />
              ) : (
                <NavItem key={link.label} link={link} />
              )
            )}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:5105984921"
              className="flex items-center gap-2 text-[13px] font-medium text-[#7A6556] hover:text-[#B8925A] transition-colors duration-200"
            >
              <PhoneIcon /> (510) 598-4921
            </a>
            {/* ✅ Free Consultation → /contact */}
            <Link
              to="/contact"
              className="group relative overflow-hidden px-6 py-[11px] border border-[#B8925A] text-[10px] font-bold tracking-[0.2em] uppercase bg-[#B8925A] text-[#FDFAF6] transition-all duration-300 hover:bg-transparent hover:text-[#B8925A]"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] bg-[#2C1A0E] transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`} />
            <span className={`block h-[1.5px] bg-[#2C1A0E] transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-[1.5px] bg-[#2C1A0E] transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"}`} />
          </button>
        </div>

        {/* gold shimmer underline */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#B8925A]/30 to-transparent" />
      </nav>

      {/* ══ MOBILE DRAWER ══ */}
      <div className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-[#2C1A0E]/30 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[min(340px,90vw)] bg-[#FDFAF6] border-l border-[#E8D5BE] shadow-[−20px_0_60px_rgba(44,26,14,0.15)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8D5BE]">
            <img src="/assets/tri-valley-logo-header.png" alt="Tri-Valley Clinic" className="h-10 w-auto" style={{ mixBlendMode: "multiply" }} />
            <button onClick={() => setMenuOpen(false)} className="text-[#7A6556] hover:text-[#B8925A] transition-colors p-1">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 px-2">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors ${
                      mobileExpanded === link.label ? "text-[#B8925A]" : "text-[#7A6556] hover:text-[#B8925A]"
                    }`}
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronIcon className={`transition-transform duration-300 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.label ? "max-h-96" : "max-h-0"}`}>
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="flex items-center gap-3 pl-8 pr-4 py-2.5 text-sm text-[#7A6556] hover:text-[#B8925A] transition-colors duration-200 border-l-2 border-[#E8D5BE] ml-4 hover:border-[#B8925A] hover:bg-[#F5EEE4]"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#B8925A]/40" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="flex items-center px-4 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#7A6556] hover:text-[#B8925A] hover:bg-[#F5EEE4] transition-all duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="px-6 py-6 border-t border-[#E8D5BE] space-y-3 bg-[#F5EEE4]/50">
            <a
              href="tel:5105984921"
              className="flex items-center justify-center gap-2 w-full py-3 border border-[#B8925A]/50 text-[#B8925A] text-sm tracking-wider hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-200"
            >
              <PhoneIcon /> (510) 598-4921
            </a>
            {/* ✅ Mobile Free Consultation → /contact */}
            <Link
              to="/contact"
              className="flex items-center justify-center w-full py-3.5 bg-[#B8925A] text-[#FDFAF6] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-200"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({ link }) {
  const { pathname } = useLocation();
  const active = pathname === link.to;
  return (
    <li>
      <Link
        to={link.to}
        className={`relative px-[14px] py-2 text-[11px] tracking-[0.14em] uppercase font-semibold block transition-colors duration-200 after:absolute after:bottom-[-1px] after:left-3 after:right-3 after:h-[1.5px] after:bg-[#B8925A] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:text-[#B8925A] hover:after:scale-x-100 ${active ? "text-[#B8925A] after:scale-x-100" : "text-[#7A6556]"}`}
      >
        {link.label}
      </Link>
    </li>
  );
}

function DropdownItem({ link, isOpen, onToggle }) {
  return (
    <li className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-[14px] py-2 text-[11px] tracking-[0.14em] uppercase font-semibold transition-colors duration-200 ${isOpen ? "text-[#B8925A]" : "text-[#7A6556] hover:text-[#B8925A]"}`}
      >
        {link.label}
        <ChevronIcon className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[260px] bg-[#FDFAF6] border border-[#E8D5BE] shadow-[0_16px_48px_rgba(44,26,14,0.12)] transition-all duration-300 origin-top ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
      >
        <div className="h-[2px] bg-gradient-to-r from-[#B8925A]/20 via-[#B8925A] to-[#B8925A]/20" />
        <ul className="py-2">
          {link.dropdown.map((sub) => (
            <li key={sub.to}>
              <Link
                to={sub.to}
                className="flex items-center gap-3 px-5 py-[11px] text-[12px] text-[#7A6556] hover:text-[#B8925A] hover:bg-[#F5EEE4] transition-all duration-200 group"
              >
                <span className="w-[5px] h-[5px] rounded-full border border-[#B8925A]/40 group-hover:bg-[#B8925A] group-hover:border-[#B8925A] transition-all duration-200 flex-shrink-0" />
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Pip() { return <span className="w-px h-3 bg-[#E8D5BE]" />; }
function PhoneIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>; }
function ChevronIcon({ className = "" }) { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>; }
function CloseIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }