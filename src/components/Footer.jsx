import { Link } from "react-router-dom";

const SERVICES = [
  { label: "Psychiatric Care",            to: "/psychiatric"  },
  { label: "Medical Weight Loss / GLP-1", to: "/weight-loss"  },
  { label: "IV Hydration Therapy",        to: "/iv-hydration" },
  { label: "TMS Therapy",                 to: "/tms"          },
  { label: "Telehealth",                  to: "/telehealth"   },
  { label: "Medication Management",       to: "/psychiatric"  },
];

const QUICK_LINKS = [
  { label: "About",              to: "/about"      },
  { label: "Insurance Accepted", to: "/insurance"  },
  { label: "Financing Options",  to: "/financing"  },
  { label: "Blog & Resources",   to: "/blog"       },
  { label: "Contact Us",         to: "/contact"    },
];

const CONDITIONS = [
  "Anxiety", "Depression", "ADHD",
  "PTSD & Trauma", "Bipolar Disorder", "OCD",
  "Insomnia", "Substance Abuse",
];

const REVIEWS = [
  {
    text: "Dr. Gill truly listens — I felt heard from the very first visit.",
    label: "Google Review · 5 Stars · Dr. Gill",
  },
  {
    text: "Dr. Gondara is incredibly compassionate. He took his time and explained everything clearly.",
    label: "Google Review · 5 Stars · Dr. Gondara",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ fontFamily: "'Jost', sans-serif" }}>

      {/* ══ CONSULT BAND ══ */}
      <div className="bg-[#B8925A] px-5 md:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#FDFAF6]/70 mb-1">No Commitment Needed</p>
          <p className="text-[#FDFAF6] text-lg md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Ready to take the first step? Your first consultation is completely free.
          </p>
        </div>
        <a
          href="tel:5105984921"
          className="flex-shrink-0 flex items-center gap-2.5 bg-[#FDFAF6] text-[#B8925A] px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#F5EEE4] transition-colors duration-200 whitespace-nowrap"
        >
          <PhoneIcon /> Call (510) 598-4921
        </a>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      {/* ══ MAIN FOOTER BODY ══ */}
      <div className="bg-[#F0E8DA]">
        <div className="mx-auto max-w-7xl px-5 md:px-10 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* ── Brand column ── */}
            <div className="space-y-5 lg:col-span-1">
              <Link to="/">
                <img
                  src="/assets/tri-valley-logo-header.png"
                  alt="Tri-Valley Clinic"
                  className="h-12 w-auto object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </Link>
              <p className="text-sm leading-relaxed text-[#7A6556] max-w-[240px]">
                Board-certified psychiatric and wellness care in Fremont, CA — in a space as beautiful as the care itself.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#E8D5BE]/50 border border-[#E8D5BE] px-3 py-2">
                <CheckIcon />
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#7A6556]">Board-Certified Psychiatrist</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { label: "Facebook",  icon: <FBIcon />     },
                  { label: "Instagram", icon: <IGIcon />     },
                  { label: "Google",    icon: <GoogleIcon /> },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-9 h-9 border border-[#E8D5BE] bg-[#FDFAF6]/60 flex items-center justify-center text-[#7A6556] hover:border-[#B8925A] hover:text-[#B8925A] hover:bg-[#FDFAF6] transition-all duration-300">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Services + Conditions ── */}
            <div>
              <SectionHeading>Our Services</SectionHeading>
              <ul className="space-y-2.5 mb-8">
                {SERVICES.map((s) => (
                  <li key={s.label}>
                    <Link to={s.to} className="flex items-center gap-2.5 text-sm text-[#7A6556] hover:text-[#B8925A] transition-colors duration-200 group">
                      <span className="w-[5px] h-[5px] rounded-full border border-[#B8925A]/40 group-hover:bg-[#B8925A] group-hover:border-[#B8925A] transition-all duration-200 flex-shrink-0" />
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <SectionHeading>Conditions We Treat</SectionHeading>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                {CONDITIONS.map((c) => (
                  <span key={c} className="text-xs text-[#7A6556]/80 leading-relaxed">{c}</span>
                ))}
              </div>
            </div>

            {/* ── Quick links + TWO reviews ── */}
            <div>
              <SectionHeading>Quick Links</SectionHeading>
              <ul className="space-y-2.5 mb-8">
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="flex items-center gap-2.5 text-sm text-[#7A6556] hover:text-[#B8925A] transition-colors duration-200 group">
                      <span className="w-[5px] h-[5px] rounded-full border border-[#B8925A]/40 group-hover:bg-[#B8925A] group-hover:border-[#B8925A] transition-all duration-200 flex-shrink-0" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Two review badges — Dr. Gill + Dr. Gondara */}
              <div className="space-y-3">
                {REVIEWS.map((r) => (
                  <div key={r.label} className="border border-[#E8D5BE] bg-[#FDFAF6]/70 p-4 space-y-2">
                    <div className="flex gap-0.5">
                      {Array(5).fill(0).map((_, i) => <StarIcon key={i} />)}
                    </div>
                    <p className="text-xs text-[#7A6556] leading-relaxed italic">"{r.text}"</p>
                    <p className="text-[10px] tracking-wider uppercase text-[#B8925A]">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Contact & Hours ── */}
            <div>
              <SectionHeading>Contact</SectionHeading>
              <ul className="space-y-5">
                <ContactRow icon={<LocationIcon />} label="Location">
                  <a href="https://maps.google.com/?q=680+Mowry+Ave+Fremont+CA+94536" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#7A6556] hover:text-[#B8925A] transition-colors leading-relaxed">
                    680 Mowry Ave<br />Fremont, CA 94536
                  </a>
                </ContactRow>
                <ContactRow icon={<PhoneIcon />} label="Phone">
                  <a href="tel:5105984921" className="text-sm text-[#7A6556] hover:text-[#B8925A] transition-colors">
                    (510) 598-4921
                  </a>
                </ContactRow>
                <ContactRow icon={<MailIcon />} label="Email">
                  <a href="mailto:contact@trivalleyclinic.com" className="text-sm text-[#7A6556] hover:text-[#B8925A] transition-colors">
                    contact@trivalleyclinic.com
                  </a>
                </ContactRow>
                <ContactRow icon={<ClockIcon />} label="Hours">
                  <div className="space-y-1.5">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-[#7A6556]/70">Mon – Fri</span>
                      <span className="text-[#3D2B1F]">9:30 AM – 5:30 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-[#7A6556]/70">Weekends</span>
                      <span className="text-[#7A6556]/50 italic text-xs">Closed</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-[#E8D5BE] mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse" />
                      <span className="text-xs text-[#6B7C5E]">Telehealth · Statewide CA</span>
                    </div>
                  </div>
                </ContactRow>
              </ul>
            </div>
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-[#B8925A]/25 to-transparent" />

          <div className="mt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7A6556]/60">
            <p>© {year} Tri-Valley Clinic · All rights reserved · Fremont, CA</p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Use", "Sitemap"].map((t, i) => (
                <span key={t} className="flex items-center gap-4">
                  {i > 0 && <span className="w-px h-3 bg-[#E8D5BE]" />}
                  <Link to="#" className="hover:text-[#B8925A] transition-colors duration-200">{t}</Link>
                </span>
              ))}
            </div>
            <p className="text-[#7A6556]/40">
              Designed by{" "}
              <a href="https://digitalvisibilityconcepts.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-[#B8925A]/60 transition-colors">
                Digital Visibility Concepts
              </a>
            </p>
          </div>

          <p className="mt-5 text-[10px] text-[#7A6556]/40 text-center leading-relaxed max-w-3xl mx-auto">
            Information on this website is for general informational purposes only and does not constitute medical advice.
            If you are experiencing a mental health emergency, please call 911 or the 988 Suicide & Crisis Lifeline.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#3D2B1F] mb-5 pb-3 border-b border-[#E8D5BE] relative"
      style={{ fontFamily: "'Jost', sans-serif" }}>
      {children}
      <span className="absolute bottom-[-1px] left-0 w-7 h-px bg-[#B8925A]" />
    </h3>
  );
}

function ContactRow({ icon, label, children }) {
  return (
    <li className="flex gap-3">
      <div className="flex-shrink-0 mt-0.5 text-[#B8925A]/70">{icon}</div>
      <div>
        <p className="text-[10px] tracking-[0.16em] uppercase text-[#B8925A]/60 mb-1">{label}</p>
        {children}
      </div>
    </li>
  );
}

function PhoneIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>; }
function LocationIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function MailIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function ClockIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function CheckIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8925A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function StarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="#B8925A" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>; }
function FBIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>; }
function IGIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>; }
function GoogleIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>; }