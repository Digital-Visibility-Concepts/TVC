import { useEffect, useRef, useState } from "react";
import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";

function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: t, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, vis];
}

function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), raf = useRef(null);
  useEffect(() => {
    const mv = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const tk = () => {
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${pos.current.x - 16}px,${pos.current.y - 16}px)`;
      raf.current = requestAnimationFrame(tk);
    };
    window.addEventListener("mousemove", mv);
    raf.current = requestAnimationFrame(tk);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <>
      <div ref={dot}  className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{ transition: "none" }} />
      <div ref={ring} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{ transition: "transform 0.12s ease-out" }} />
    </>
  );
}

export default function Financing() {
  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6", cursor: "none" }}>
      <style>{CSS}</style>
      <Cursor />
      <Hero />
      <Marquee />
      <HowCherry />
      <CherryEmbed />
      <Compare />
      <FAQSection />
      <CTA />
    </main>
  );
}

/* ══ HERO — NO doctor avatars here, just headline + CTAs ══ */
function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  return (
    <section
      className="relative min-h-[88vh] flex items-end overflow-hidden"
      style={{ background: "linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)" }}
    >
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />

      {/* Background photo */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden">
        <img src={IMAGES.BOTH_CLINIC} alt="Tri-Valley Clinic"
          className="w-full h-full object-cover opacity-28" style={{ filter: "saturate(0.65)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#2C1A0E 0%,transparent 55%)" }} />
      </div>

      {/* Gold orbs */}
      {[{ t: "10%", l: "52%", s: 400, o: 0.12, d: "0s" }, { t: "60%", l: "5%", s: 260, o: 0.08, d: "5s" }].map((orb, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: orb.s, height: orb.s, top: orb.t, left: orb.l,
            background: `radial-gradient(circle,rgba(184,146,90,${orb.o}) 0%,transparent 70%)`,
            animation: `floatOrb ${11 + i * 4}s ease-in-out infinite ${orb.d}` }} />
      ))}

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">

        {/* LEFT — copy only, no avatars */}
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/8 px-4 py-2 mb-7 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] animate-pulse" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Cherry Financing · Apply in 60 Seconds</span>
          </div>

          <h1 className={`text-[48px] md:text-[64px] xl:text-[76px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, transitionDelay: "200ms" }}>
            Your Care<br />Shouldn't Wait<br /><em className="italic text-[#C9A46A]">for Finances.</em>
          </h1>

          <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${on ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "370ms" }}>
            <span className="w-10 h-px bg-[#B8925A]/60" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#A89880] font-light">0% APR Available · No Hard Credit Pull · Instant Decision</span>
          </div>

          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "440ms" }}>
            We believe cost should never stand between you and feeling better. Cherry financing makes care accessible with flexible monthly payment plans — apply in 60 seconds with no impact to your credit score.
          </p>

          <div className={`flex flex-wrap gap-4 mb-10 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "540ms" }}>
            <a href="https://www.withcherry.com" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">
              Apply Now — 60 Seconds
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
            <a href="tel:5105984921"
              className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">
              <Ph /> Call Us First
            </a>
          </div>

          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "640ms" }}>
            {["0% APR Options", "Instant Approval", "No Hard Pull", "All Services Covered"].map((t) => (
              <span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — stat cards */}
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "380ms" }}>
          {[
            { val: "60",     lab: "Seconds to Apply",     sub: "Instant approval decision" },
            { val: "0%",     lab: "APR Available",        sub: "Qualifying patients"       },
            { val: "3–24",   lab: "Month Plans",          sub: "Flexible payment terms"    },
          ].map((c, i) => (
            <div key={c.lab} className="bg-[#FDFAF6]/8 border border-[#E8D5BE]/15 px-6 py-5 flex items-center gap-5 w-full max-w-xs"
              style={{ animation: `fadeUp 0.8s ease ${0.5 + i * 0.12}s both` }}>
              <p className="text-3xl text-[#C9A46A] flex-shrink-0"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{c.val}</p>
              <div>
                <p className="text-[#F0E8DA] text-sm font-medium">{c.lab}</p>
                <p className="text-[#A89880] text-xs font-light mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top,#FDFAF6,transparent)" }} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "fadeUp 1s ease 1.2s both" }}>
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#B8925A]/70 to-transparent"
            style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ══ MARQUEE ══ */
function Marquee() {
  const items = ["Cherry Financing", "0% APR Available", "Apply in 60 Seconds", "No Hard Credit Pull", "Monthly Payment Plans", "Psychiatry · Weight Loss · IV Hydration", "Instant Approval", "Tri-Valley Clinic · Fremont CA"];
  const rep = [...items, ...items];
  return (
    <div className="bg-[#2C1A0E] py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 36s linear infinite", width: "max-content" }}>
        {rep.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">
            {t}<Dm />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══ HOW CHERRY WORKS ══ */
function HowCherry() {
  const [ref, vis] = useReveal();
  const steps = [
    { n: "01", t: "Apply Online",      d: "Visit withcherry.com or tap the button. The application takes 60 seconds and won't impact your credit score." },
    { n: "02", t: "Instant Decision",  d: "Cherry provides an instant approval decision with flexible payment plan options tailored to your budget." },
    { n: "03", t: "Choose Your Plan",  d: "Select from 0% APR or extended plans. Plans range from 3 to 24 months depending on approval." },
    { n: "04", t: "Begin Your Care",   d: "Use your Cherry approval for any Tri-Valley Clinic service — psychiatry, weight loss, IV hydration, or TMS." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            How <em className="italic text-[#B8925A]">Cherry Works</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#B8925A]/20 via-[#B8925A]/50 to-[#B8925A]/20" />
          {steps.map((s, i) => (
            <div key={s.n}
              className={`group text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 140}ms`, transitionDuration: "700ms" }}>
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/30 group-hover:border-[#B8925A] transition-colors duration-500" />
                <div className="absolute inset-[6px] rounded-full bg-[#B8925A]/8 group-hover:bg-[#B8925A]/15 transition-all duration-500" />
                <span className="text-2xl text-[#B8925A]" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{s.n}</span>
              </div>
              <h3 className="text-xl text-[#2C1A0E] mb-3 group-hover:text-[#B8925A] transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500 }}>{s.t}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light max-w-[210px] mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
        <div className={`mt-14 text-center transition-all duration-700 delay-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a href="https://www.withcherry.com" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">
            Apply for Cherry Financing
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══ CHERRY EMBED PLACEHOLDER ══ */
function CherryEmbed() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-24 px-5 md:px-10" style={{ background: "linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)" }}>
      <div className="mx-auto max-w-3xl">
        <div ref={ref} className="text-center mb-10">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] mb-4 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            Apply <em className="italic text-[#C9A46A]">Right Here</em>
          </h2>
          <p className={`text-[#A89880] font-light transition-all duration-700 delay-200 ${vis ? "opacity-100" : "opacity-0"}`}>
            60-second application. No hard credit pull. Instant decision.
          </p>
        </div>

        {/* ─── Cherry embed button placeholder ───
            Replace this div with your actual Cherry embed code:
            <div id="cherry-checkout-button"></div>
            ─────────────────────────────────── */}
        <div className={`border border-[#E8D5BE]/15 bg-[#F5EEE4]/5 p-12 text-center transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent mb-10" />
          {/* ← PASTE CHERRY EMBED CODE HERE */}
          <div id="cherry-checkout-button" className="mb-8">
            <a href="https://www.withcherry.com" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 text-lg">
              Apply with Cherry
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
          <p className="text-[#7A6556] text-xs font-light">
            Prefer to talk first?{" "}
            <a href="tel:5105984921" className="text-[#B8925A] underline underline-offset-2 hover:text-[#C9A46A] transition-colors">(510) 598-4921</a>
            {" "}— our team will walk you through your options.
          </p>
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent mt-10" />
        </div>
      </div>
    </section>
  );
}

/* ══ COMPARE TABLE ══ */
function Compare() {
  const [ref, vis] = useReveal();
  const rows = [
    { f: "Credit Check",         cherry: "Soft pull only",        cc: "Hard pull",           cash: "None"        },
    { f: "Interest",             cherry: "0% APR options",        cc: "18–29% APR typical",  cash: "None"        },
    { f: "Monthly Payments",     cherry: "Flexible 3–24 months",  cc: "Minimum payments",    cash: "Full upfront"},
    { f: "Approval Speed",       cherry: "60 seconds",            cc: "Instant",             cash: "Instant"     },
    { f: "Use for Medical Care", cherry: "Yes — all services",    cc: "Yes",                 cash: "Yes"         },
    { f: "Affects Credit Score", cherry: "No hard pull",          cc: "Yes",                 cash: "No"          },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            Cherry vs. <em className="italic text-[#B8925A]">Other Options</em>
          </h2>
        </div>
        <div className={`overflow-hidden border border-[#E8D5BE] transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-4 bg-[#2C1A0E]">
            {["Feature", "Cherry ★", "Credit Card", "Pay Cash"].map((h, i) => (
              <div key={h} className={`px-4 py-4 text-[10px] tracking-[0.18em] uppercase font-semibold ${i === 1 ? "text-[#C9A46A]" : "text-[#E8D5BE]/60"}`}>{h}</div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={r.f} className={`grid grid-cols-4 border-t border-[#E8D5BE] hover:bg-[#F0E8DA] transition-colors ${i % 2 === 0 ? "bg-[#FDFAF6]" : "bg-[#FAF7F2]"}`}>
              <div className="px-4 py-4 text-sm text-[#7A6556] font-medium">{r.f}</div>
              <div className="px-4 py-4 text-sm text-[#2C1A0E] font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0" />{r.cherry}
              </div>
              <div className="px-4 py-4 text-sm text-[#7A6556] font-light">{r.cc}</div>
              <div className="px-4 py-4 text-sm text-[#7A6556] font-light">{r.cash}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ FAQ ══ */
function FAQSection() {
  const [ref, vis] = useReveal();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Will applying for Cherry affect my credit score?",         a: "Cherry uses a soft credit pull for their initial application, which does not affect your credit score. Only if you proceed with certain plan types may a hard pull occur — Cherry will inform you before this happens." },
    { q: "What services at Tri-Valley Clinic can I use Cherry for?", a: "Cherry can be used for any service at Tri-Valley Clinic, including psychiatric evaluations, medication management, medical weight loss programs, IV hydration therapy, and TMS therapy when it launches." },
    { q: "What if my insurance covers part of the cost?",            a: "Cherry can be used alongside your insurance to cover any remaining out-of-pocket balance. Call us to discuss how to coordinate your insurance benefits with Cherry financing." },
    { q: "How quickly will I find out if I'm approved?",             a: "Cherry provides an approval decision in approximately 60 seconds after you submit your application." },
    { q: "Is Cherry available for telehealth appointments?",         a: "Yes. Cherry financing can be applied to any Tri-Valley Clinic service, including telehealth psychiatric appointments for patients anywhere in California." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            Financing <em className="italic text-[#B8925A]">Questions</em>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q}
              className={`border transition-all duration-500 ${open === i ? "border-[#B8925A]/50 bg-[#FDFAF6]" : "border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 55}ms`, transitionDuration: "600ms" }}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[15px] font-medium text-[#2C1A0E]">{f.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open === i ? "border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45" : "border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open === i ? "max-h-48 pb-6" : "max-h-0"}`}>
                <p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ CTA — BOTH DOCTORS appear ONLY HERE, once ══ */
function CTA() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-28 px-5 md:px-10 relative overflow-hidden text-center"
      style={{ background: "linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(184,146,90,0.14) 0%,transparent 70%)" }} />

      <div ref={ref} className="relative mx-auto max-w-2xl">

        {/* BOTH DOCTORS — appears ONCE, here only */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <DoctorAvatars className="mb-10" />
        </div>

        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="w-16 h-px bg-[#B8925A]/40" /><Dm /><span className="w-16 h-px bg-[#B8925A]/40" />
        </div>

        <h2 className={`text-5xl md:text-[64px] text-[#2C1A0E] mb-5 transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.05 }}>
          Start Your Care<br /><em className="italic text-[#B8925A]">Today.</em>
        </h2>

        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Cost should never stand between you and feeling better. Apply for Cherry in 60 seconds or call Dr. Gill and Dr. Gondara's office directly.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a href="https://www.withcherry.com" target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400">
            Apply for Cherry →
          </a>
          <a href="tel:5105984921"
            className="flex items-center gap-3 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">
            <Ph /> (510) 598-4921
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══ ICONS ══ */
function Ph() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>; }
function Dm({ size = 8 }) { return <svg width={size} height={size} viewBox="0 0 10 10" fill="#B8925A"><polygon points="5,0 10,5 5,10 0,5" /></svg>; }

const CSS = `
  * { cursor: none !important; }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatOrb   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-30px) scale(1.06)} 66%{transform:translate(-14px,18px) scale(0.94)} }
  @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
`;