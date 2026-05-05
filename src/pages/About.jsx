import { useEffect, useRef, useState } from "react";
import IMAGES from "../constants/images";
import SEO from '../components/SEO';

/* ─── HOOKS ─── */
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

function Counter({ to, suffix = "", ms = 1800 }) {
  const [v, setV] = useState(0);
  const [ref, vis] = useReveal(0.5);
  useEffect(() => {
    if (!vis) return;
    let t0 = null;
    const f = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / ms, 1);
      setV(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, [vis, to, ms]);
  return <span ref={ref}>{v}{suffix}</span>;
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

/* ─── SHARED BOTH-DOCTOR AVATARS ─── */
function DoctorAvatars() {
  return (
    <div className="flex justify-center gap-8 mb-10">
      {[
        { img: IMAGES.DR_GILL_CARD,    alt: "Dr. Japsharan Gill",  name: "Dr. Japsharan Gill",  role: "Founder & CEO" },
        { img: "/assets/dr-gondara-white.jpg", alt: "Dr. Shabeg Gondara", name: "Dr. Shabeg Gondara", role: "President" },
      ].map((d) => (
        <div key={d.name} className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B8925A]/60 shadow-[0_8px_32px_rgba(184,146,90,0.2)]">
              <img src={d.img} alt={d.alt} className="w-full h-full object-cover" style={{ objectPosition: "center 8%" }} />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]" />
          </div>
          <div className="text-center">
            <p className="text-[10px] tracking-[0.14em] uppercase text-[#2C1A0E] font-semibold">{d.name}</p>
            <p className="text-[9px] text-[#B8925A] tracking-wider">{d.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════
   ABOUT PAGE
═══════════════════════════ */
export default function About() {
  return (
    /* overflow-x-hidden prevents any child from creating horizontal scroll */
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6", cursor: "none" }}
      className="overflow-x-hidden">
      <SEO
        title="About Us"
        description="Meet Dr. Japsharan Gill and Dr. Shabeg Gondara, board-certified psychiatrists leading Tri-Valley Clinic in Fremont, CA. 15+ years of combined experience in psychiatry, wellness, and integrative care."
        path="/about"
      />
      <style>{CSS}</style>
      <Cursor />
      <HeroSection />
      <MarqueeStrip />
      <MissionSection />
      <DrGillBioSection />
      <DrGondaraBioSection />
      <ClinicGallerySection />
      <CredentialsSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}

/* ══ 1. HERO ══ */
function HeroSection() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FDFAF6 0%,#F5EEE4 45%,#EDE5D6 100%)" }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />

      {/* Gold orbs */}
      {[{ s: 500, t: "5%",  l: "55%", o: 0.16, d: "0s" },
        { s: 300, t: "60%", l: "8%",  o: 0.10, d: "4s" },
        { s: 220, t: "25%", l: "32%", o: 0.07, d: "8s" }
      ].map((orb, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: orb.s, height: orb.s, top: orb.t, left: orb.l,
            background: `radial-gradient(circle,rgba(184,146,90,${orb.o}) 0%,transparent 70%)`,
            animation: `floatOrb ${12 + i * 3}s ease-in-out infinite ${orb.d}` }} />
      ))}

      {/* Vertical accent — desktop only */}
      <div className="hidden xl:flex absolute left-7 top-1/2 -translate-y-1/2 flex-col items-center gap-3"
        style={{ animation: "fadeUp 1s ease 1s both" }}>
        <span className="w-px h-20 bg-gradient-to-b from-transparent to-[#B8925A]/60" />
        <span className="text-[8px] tracking-[0.35em] uppercase text-[#B8925A]/50 font-medium"
          style={{ writingMode: "vertical-rl" }}>Fremont · California</span>
        <span className="w-px h-20 bg-gradient-to-t from-transparent to-[#B8925A]/60" />
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — Text */}
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/5 px-4 py-2 mb-8 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Tri-Valley Clinic · Fremont, CA</span>
          </div>

          <h1 className={`text-[44px] sm:text-[56px] md:text-[68px] xl:text-[80px] text-[#2C1A0E] leading-[0.97] mb-6 transition-all duration-900 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, transitionDelay: "220ms" }}>
            Meet<br />
            <em className="italic" style={{ color: "#B8925A" }}>Our Physicians</em>
          </h1>

          <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${on ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "400ms" }}>
            <span className="w-12 h-px bg-[#B8925A]/50 hidden sm:block" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#7A6556] font-medium leading-relaxed">
              Dr. Japsharan Gill · Founder & CEO <span className="hidden sm:inline">&nbsp;|&nbsp;</span><br className="sm:hidden" /> Dr. Shabeg Gondara · President
            </span>
          </div>

          <p className={`text-[#7A6556] text-[15px] sm:text-[17px] leading-relaxed max-w-[440px] font-light mb-10 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "480ms" }}>
            Physician-led clinic experience integrating psychiatry, weight management, IV hydration, TMS, and longevity-focused care to support lasting, whole-body health.
          </p>

          <div className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "580ms" }}>
            <a href="/contact"
              className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-6 sm:px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-all duration-400">
              <Ph /> Schedule Today
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
            <a href="#dr-gill"
              className="group flex items-center gap-3 border border-[#B8925A] text-[#B8925A] px-6 sm:px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] hover:text-[#FDFAF6] transition-all duration-300">
              Meet the Team ↓
            </a>
          </div>

          {/* Trust row */}
          <div className={`flex flex-wrap items-center gap-5 sm:gap-6 transition-all duration-700 ${on ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "700ms" }}>
            {[
              { n: "15+",  l: "Yrs Experience" },
              { n: "2",    l: "Physicians"     },
              { n: "CA",   l: "Telehealth"     },
            ].map((t) => (
              <div key={t.l} className="flex items-center gap-2">
                <p className="text-[20px] sm:text-[22px] text-[#B8925A]"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500 }}>{t.n}</p>
                <p className="text-[9px] tracking-[0.18em] uppercase text-[#7A6556]/70 leading-tight">{t.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — BOTH DOCTORS
            Mobile:  clean vertical stacked cards (full-width each)
            lg+:     side-by-side portrait layout                    */}
        <div className={`relative pt-6 lg:pt-0 transition-all duration-1000 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "300ms" }}>

          {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
          <div className="flex flex-col gap-4 lg:hidden">

            {/* Gold divider label */}
            <div className="flex items-center gap-3 mb-1">
              <span className="flex-1 h-px bg-[#B8925A]/30" />
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Our Physicians</span>
              <span className="flex-1 h-px bg-[#B8925A]/30" />
            </div>

            {/* DR. GILL — horizontal card */}
            <a href="#dr-gill" className="flex items-center gap-4 border border-[#E8D5BE] bg-white p-3 hover:border-[#B8925A]/50 transition-colors duration-300">
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill"
                  className="w-full h-full object-cover" style={{ objectPosition: "50% 8%" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#2C1A0E] text-lg font-light italic leading-tight">Dr. Japsharan Gill</p>
                <p className="text-[#B8925A] text-[9px] tracking-[0.2em] uppercase font-semibold mt-0.5">Founder & CEO</p>
                <p className="text-[#7A6556] text-[11px] mt-1.5 leading-relaxed">Psychiatry · Weight Management · IV Hydration</p>
              </div>
              <span className="text-[#B8925A]/40 text-lg flex-shrink-0">→</span>
            </a>

            {/* DR. GONDARA — horizontal card */}
            <a href="#dr-gondara" className="flex items-center gap-4 border border-[#E8D5BE] bg-white p-3 hover:border-[#B8925A]/50 transition-colors duration-300">
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                <img src={IMAGES.DR_GONDARA_CARD} alt="Dr. Shabeg Gondara"
                  className="w-full h-full object-cover" style={{ objectPosition: "center 5%" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#2C1A0E] text-lg font-light italic leading-tight">Dr. Shabeg Gondara</p>
                <p className="text-[#B8925A] text-[9px] tracking-[0.2em] uppercase font-semibold mt-0.5">President</p>
                <p className="text-[#7A6556] text-[11px] mt-1.5 leading-relaxed">Adult Psychiatry · Medication Management</p>
              </div>
              <span className="text-[#B8925A]/40 text-lg flex-shrink-0">→</span>
            </a>

            {/* "Two Physicians · One Mission" tag */}
            <div className="flex items-center gap-3 bg-[#2C1A0E] px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-[#6B7C5E] animate-pulse flex-shrink-0" />
              <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#C9A46A] text-base font-light italic">Two Physicians · One Mission</p>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
          <div className="hidden lg:flex justify-end items-end gap-4">

            {/* DR. GILL — primary portrait */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#B8925A]/20 -z-10" />
              <span className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#B8925A] z-20" />
              <span className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#B8925A] z-20" />
              <div className="w-[220px] xl:w-[250px] overflow-hidden bg-white" style={{ height: "440px" }}>
                <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div className="bg-[#2C1A0E] px-4 py-3">
                <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#C9A46A] text-sm font-light italic">Dr. Japsharan Gill</p>
                <p className="text-[#E8D5BE]/60 text-[8px] tracking-[0.2em] uppercase mt-0.5">Founder & CEO</p>
              </div>
            </div>

            {/* DR. GONDARA — offset portrait */}
            <div className="relative flex-shrink-0 mt-10">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#B8925A]/15 -z-10" />
              <span className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#B8925A] z-20" />
              <span className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#B8925A] z-20" />
              <div className="w-[220px] xl:w-[250px] overflow-hidden" style={{ height: "440px" }}>
                <img src={IMAGES.DR_GONDARA_CARD} alt="Dr. Shabeg Gondara"
                  className="w-full h-full" style={{ objectFit: "cover", objectPosition: "center 5%" }} />
              </div>
              <div className="bg-[#2C1A0E] px-4 py-3">
                <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#C9A46A] text-sm font-light italic">Dr. Shabeg Gondara</p>
                <p className="text-[#E8D5BE]/60 text-[8px] tracking-[0.2em] uppercase mt-0.5">President</p>
              </div>
            </div>
          </div>

          {/* Floating badge — desktop only, positioned BELOW portraits not overlapping */}
          <div className="hidden lg:block mt-6"
            style={{ animation: "floatBadge 4s ease-in-out infinite" }}>
            <div className="inline-flex items-center gap-3 bg-[#FDFAF6] border border-[#E8D5BE] shadow-xl px-5 py-3.5">
              <span className="w-2 h-2 rounded-full bg-[#6B7C5E] animate-pulse" />
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#6B7C5E] font-semibold block mb-0.5">Founders · Tri-Valley Clinic</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#2C1A0E] text-base font-normal">Two Physicians · One Mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "fadeUp 1s ease 1.4s both" }}>
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#B8925A]/70 to-transparent"
            style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ══ 2. MARQUEE ══ */
function MarqueeStrip() {
  const items = ["Dr. Japsharan Gill · Founder & CEO", "Dr. Shabeg Gondara · President", "Psychiatry & Wellness", "15+ Years Experience", "Fremont, CA", "Schedule Today", "Next-Day Appointments", "Telehealth · Statewide CA", "GLP-1 Weight Loss", "IV Hydration", "TMS Therapy · Coming Soon"];
  const rep = [...items, ...items];
  return (
    <div className="bg-[#2C1A0E] py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 44s linear infinite", width: "max-content" }}>
        {rep.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">
            {t}<Dm />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══ 3. MISSION ══ */
function MissionSection() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-20 sm:py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <div className={`flex items-center justify-center gap-4 mb-10 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-[#B8925A]/50" />
          <Dm size={9} />
          <span className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-[#B8925A]/50" />
        </div>
        <p className={`text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold mb-6 transition-all duration-700 delay-100 ${vis ? "opacity-100" : "opacity-0"}`}>
          Our Mission
        </p>
        <blockquote
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2C1A0E] mb-8 transition-all duration-900 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.25 }}
        >
          "Physician-led clinic experience integrating psychiatry, weight management, IV hydration, TMS, and longevity-focused care to support lasting, whole-body health."
        </blockquote>
        <p className={`text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold transition-all duration-700 delay-300 ${vis ? "opacity-100" : "opacity-0"}`}>
          — Dr. Japsharan Gill & Dr. Shabeg Gondara · Tri-Valley Clinic
        </p>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 transition-all duration-700 delay-400 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {["Psychiatry", "Weight Management", "IV Hydration", "TMS Therapy"].map((p, i) => (
            <div key={p} className="border border-[#E8D5BE] bg-[#F5EEE4] px-3 py-4 text-center hover:border-[#B8925A]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="text-2xl text-[#B8925A]/25 block mb-1"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* tracking-tight on mobile so text stays inside card */}
              <p className="text-[9px] tracking-[0.06em] sm:text-[10px] sm:tracking-[0.14em] lg:text-[11px] lg:tracking-[0.18em] uppercase text-[#3D2B1F] font-semibold leading-tight break-words">{p}</p>
            </div>
          ))}
        </div>
        <div className={`flex items-center justify-center gap-4 mt-12 transition-all duration-700 delay-500 ${vis ? "opacity-100" : "opacity-0"}`}>
          <span className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-[#B8925A]/50" />
          <Dm size={9} />
          <span className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-[#B8925A]/50" />
        </div>
      </div>
    </section>
  );
}

/* ══ 4. DR. GILL — Full biography ══ */
function DrGillBioSection() {
  const [ref, vis] = useReveal();
  return (
    <section id="dr-gill" className="py-20 sm:py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start">

          {/* LEFT — portrait block */}
          <div ref={ref} className={`relative transition-all duration-1000 ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute top-4 sm:top-5 -left-3 sm:-left-5 right-3 sm:right-5 bottom-0 bg-[#E8D5BE]/50 -z-10" />
                <div className="absolute top-0 left-0 w-[3px] h-20 sm:h-24 bg-[#B8925A]" />
                {/* Portrait — tall enough to align with bio content */}
                <div className="overflow-hidden" style={{ height: "clamp(360px, 70vw, 580px)" }}>
                  <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    style={{ objectPosition: "50% 10%" }} />
                </div>
                <div className="bg-[#2C1A0E] px-5 py-4">
                  <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#C9A46A] text-base sm:text-lg font-light italic">Dr. Japsharan Gill, MD</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#8A7E78] mt-0.5">Founder & CEO · Tri-Valley Clinic</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — Dr. Gill bio */}
          <div className={`transition-all duration-1000 delay-200 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#B8925A]" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Founder & CEO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#2C1A0E] mb-2"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.1 }}>
              Dr. Japsharan<br /><em className="italic text-[#B8925A]">Gill, MD</em>
            </h2>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#B8925A] font-bold mb-8 sm:mb-10">Founder and CEO</p>

            <div className="space-y-5 text-[#7A6556] text-[14px] sm:text-[15px] leading-[1.95] font-light">
              <p>I built Tri-Valley Clinic for people who wanted more than a quick appointment and a prescription — for people who wanted a physician who actually listens.</p>
              <p>I specialize in psychiatry, medical weight management, and advanced wellness. Over the years, I've found that these areas are deeply connected — your mental health, your weight, your energy, and your sense of self. Most practices treat them separately. I don't.</p>
              <p>When you come in, we take the time to understand what's really going on — not just your symptoms, but your life, your goals, and what you've already tried. From there, we create a plan that is specific to you.</p>
            </div>

            <div className="my-8 sm:my-9 border-l-2 border-[#B8925A] pl-5 sm:pl-6">
              <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-xl sm:text-2xl text-[#2C1A0E] font-light italic leading-relaxed">
                "Most practices treat mental health, weight, and wellness separately. I don't."
              </p>
            </div>

            <ul className="space-y-3 mb-8 sm:mb-10">
              {[
                "Founder & CEO of Tri-Valley Clinic",
                "Psychiatry, GLP-1, IV Hydration, TMS Therapy",
                "Medical Weight Management · Advanced Wellness",
                "GLP-1 / Semaglutide Physician-Supervised Programs",
                "IV Hydration & TMS Therapy (launching soon)",
                "Telehealth — Available Statewide in California",
              ].map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-[#7A6556]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2" />{c}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a href="/contact"
                className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-6 sm:px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#2C1A0E] transition-colors duration-300">
                <Ph /> Book with Dr. Japsharan Gill
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="#dr-gondara"
                className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-6 sm:px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] transition-colors duration-300">
                Meet Dr. Shabeg Gondara ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 5. DR. GONDARA — Full biography ══ */
function DrGondaraBioSection() {
  const [ref, vis] = useReveal();
  return (
    <section id="dr-gondara" className="py-20 sm:py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        {/* Flipped layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start">

          {/* On mobile: bio first, then photo below */}
          {/* LEFT — Dr. Gondara bio */}
          <div ref={ref} className={`transition-all duration-1000 ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#B8925A]" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">President</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#2C1A0E] mb-2"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.1 }}>
              Dr. Shabeg<br /><em className="italic text-[#B8925A]">Gondara, MD</em>
            </h2>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#B8925A] font-bold mb-8 sm:mb-10">President</p>

            <div className="space-y-5 text-[#7A6556] text-[14px] sm:text-[15px] leading-[1.95] font-light">
              <p>Dr. Shabeg Gondara is a physician specializing in psychiatry, known for his thoughtful, compassionate, and patient-centered approach to care. He is dedicated to providing individualized, evidence-based treatment in a supportive and structured clinical environment.</p>
              <p>He conducts comprehensive psychiatric evaluations and offers medication management with careful attention to each patient's unique presentation and goals. His approach emphasizes clarity, collaboration, and long-term stability, with a focus on helping patients achieve functional improvement and emotional well-being.</p>
              <p>Dr. Shabeg Gondara values building strong therapeutic relationships and creating a space where patients feel comfortable, understood, and supported. He is committed to delivering high-quality psychiatric care with professionalism, empathy, and attention to detail.</p>
            </div>

            <div className="my-8 sm:my-9 border-l-2 border-[#B8925A] pl-5 sm:pl-6">
              <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-xl sm:text-2xl text-[#2C1A0E] font-light italic leading-relaxed">
                "Clarity, collaboration, and long-term stability — these are the pillars of every treatment plan."
              </p>
            </div>

            <ul className="space-y-3 mb-8 sm:mb-10">
              {[
                "Physician Specializing in Adult Psychiatry",
                "Comprehensive Psychiatric Evaluations",
                "Medication Management & Ongoing Care",
                "Thoughtful, Patient-Centered Approach",
                "Evidence-Based Treatment",
                "Telehealth — Available Statewide in California",
              ].map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-[#7A6556]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2" />{c}
                </li>
              ))}
            </ul>

            <a href="/contact"
              className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-6 sm:px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#2C1A0E] transition-colors duration-300">
              <Ph /> Book with Dr. Shabeg Gondara
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>

          {/* RIGHT — Dr. Gondara portrait */}
          <div className={`relative transition-all duration-1000 delay-200 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute top-4 sm:top-5 -right-3 sm:-right-5 left-3 sm:left-5 bottom-0 bg-[#E8D5BE]/50 -z-10" />
                <div className="absolute top-0 right-0 w-[3px] h-20 sm:h-24 bg-[#B8925A]" />
                {/* Tall portrait — matches bio content height */}
                <div className="overflow-hidden" style={{ height: "clamp(380px, 70vw, 600px)" }}>
                  <img src={IMAGES.DR_GONDARA_CARD} alt="Dr. Shabeg Gondara"
                    className="w-full h-full transition-transform duration-700 hover:scale-[1.02]"
                    style={{ objectFit: "cover", objectPosition: "center 5%" }} />
                </div>
                <div className="bg-[#2C1A0E] px-5 py-4">
                  <p style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[#C9A46A] text-base sm:text-lg font-light italic">Dr. Shabeg Gondara, MD</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#8A7E78] mt-0.5">President · Tri-Valley Clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 6. CLINIC GALLERY ══ */
function ClinicGallerySection() {
  const [ref, vis] = useReveal();
  const photos = [
    { src: IMAGES.CLINIC_INSIDE,       label: "Reception & Waiting Area",               span: "lg:col-span-2 lg:row-span-2", pos: "object-top"    },
    { src: IMAGES.BOTH_OUTDOOR,        label: "Dr. Japsharan Gill & Dr. Shabeg Gondara", span: "",                            pos: "object-[center_12%]" },
    { src: IMAGES.DR_GONDARA_WORKING,  label: "Patient Consultation",                   span: "",                            pos: "object-center" },
    { src: IMAGES.DR_GILL_HERO,        label: "Dr. Japsharan Gill, MD",                 span: "",                            pos: "object-[center_5%]" },
    { src: IMAGES.CLINIC_EXTERIOR,     label: "680 Mowry Ave · Fremont",               span: "",                            pos: "object-center" },
  ];
  return (
    <section className="py-16 sm:py-20 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#2C1A0E]"
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            A Space Designed for <em className="italic text-[#B8925A]">Healing</em>
          </h2>
        </div>
        {/* Grid: 2-col on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[210px] lg:auto-rows-[220px] gap-2 sm:gap-3">
          {photos.map((p, i) => (
            <div key={p.label}
              className={`relative overflow-hidden group cursor-default ${p.span} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transition: "all 700ms ease", transitionDelay: `${i * 100}ms` }}>
              <img src={p.src} alt={p.label}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${p.pos || "object-center"}`} />
              {/* Overlay — @media(hover:hover) ensures it never sticks on touch/mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-transparent to-transparent opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 transition-all duration-400">
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#E8D5BE] font-medium">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 7. CREDENTIALS ══ */
function CredentialsSection() {
  const [ref, vis] = useReveal();
  const cols = [
    { cat: "Dr. Japsharan Gill",  items: ["Founder & CEO of Tri-Valley Clinic", "Specializes in: Psychiatry, GLP-1, IV Hydration, TMS Therapy", "Licensed Physician — State of California", "California Licensed Physician", "Adult Psychiatry · GLP-1 · IV Hydration · TMS"] },
    { cat: "Dr. Shabeg Gondara",  items: ["President, Tri-Valley Clinic", "Comprehensive Psychiatric Evaluations", "Medication Management — Adult Psychiatry", "Patient-Centered Evidence-Based Treatment", "Telehealth — Available Statewide CA"] },
    { cat: "Conditions",          items: ["Anxiety Disorders (GAD, Social, Panic)", "Major Depressive Disorder", "ADHD — Adult Diagnosis & Management", "PTSD & Trauma-Related Disorders", "Bipolar I & II · OCD · Insomnia · Substance Abuse"] },
    { cat: "Telehealth",          items: ["HIPAA-Compliant Secure Video Visits", "Available Statewide — All of California", "Same-Day & Next-Day Scheduling", "Prescription Management Included"] },
  ];
  return (
    <section className="py-20 sm:py-24 px-5 md:px-10" style={{ background: "linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-12 sm:mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            Expertise You Can <em className="italic text-[#C9A46A]">Trust</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cols.map((c, i) => (
            <div key={c.cat}
              className={`border border-[#E8D5BE]/12 p-6 sm:p-8 bg-[#F5EEE4]/5 hover:bg-[#F5EEE4]/10 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 130}ms`, transitionDuration: "700ms" }}>
              <div className="flex items-center gap-2 mb-5 sm:mb-6">
                <span className="w-5 h-px bg-[#B8925A]" />
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8925A] font-semibold">{c.cat}</p>
              </div>
              <ul className="space-y-3.5">
                {c.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#A89880] font-light leading-relaxed">
                    <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full bg-[#B8925A]/60" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 8. STATS ══ */
function StatsSection() {
  const [ref, vis] = useReveal();
  const stats = [
    { to: 15,  s: "+", label: "Years of Practice"        },
    { to: 2,   s: "",  label: "Physicians on Staff"      },
    { to: 5,   s: "",  label: "Specialty Services"       },
    { to: 58,  s: "+", label: "CA Cities via Telehealth" },
  ];
  return (
    <section ref={ref} className="py-14 sm:py-16 px-5 md:px-10 bg-[#F0E8DA] border-y border-[#E8D5BE]">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-[#E8D5BE]">
        {stats.map((s, i) => (
          <div key={s.label}
            className={`text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 100}ms` }}>
            <p className="text-5xl sm:text-6xl md:text-7xl text-[#B8925A] mb-2 leading-none"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
              {vis ? <Counter to={s.to} suffix={s.s} /> : `0${s.s}`}
            </p>
            <p className="text-[9px] tracking-[0.22em] uppercase text-[#7A6556] font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══ 9. WHY US ══ */
function WhySection() {
  const [ref, vis] = useReveal();
  const reasons = [
    { n: "01", title: "Both Physicians Listen First",   text: "Dr. Japsharan Gill and Dr. Shabeg Gondara both share one commitment — listening completely before prescribing anything. Diagnosis comes after understanding." },
    { n: "02", title: "Whole-Body Approach",            text: "Psychiatry, weight management, IV hydration, and TMS — deeply connected and treated together, not in isolation." },
    { n: "03", title: "Schedule Today",                 text: "Call our office to schedule your initial appointment. Same-day and next-day options may be available." },
    { n: "04", title: "No Double-Booking",              text: "Your time is yours. We never overbook or rush. Personalized care is our practice, not just a promise." },
    { n: "05", title: "Two Physicians · One Mission",   text: "Dr. Japsharan Gill and Dr. Shabeg Gondara share one mission — delivering the highest standard of psychiatric care with precision, compassion, and clinical excellence." },
    { n: "06", title: "Statewide Telehealth",           text: "Available to all California residents via secure video — same expert care, anywhere in the state." },
  ];
  return (
    <section className="py-20 sm:py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-12 sm:mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
            The Care That Sets Us <em className="italic text-[#B8925A]">Apart</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((r, i) => (
            <div key={r.n}
              className={`group relative border border-[#E8D5BE] bg-[#F5EEE4] p-6 sm:p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(184,146,90,0.12)] hover:border-[#B8925A]/50 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "700ms" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="text-4xl sm:text-5xl text-[#B8925A]/15 font-light leading-none block mb-4 group-hover:text-[#B8925A]/25 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}>{r.n}</span>
              <h3 className="text-xl sm:text-2xl text-[#2C1A0E] mb-3"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500 }}>{r.title}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 10. CTA ══ */
function CTASection() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-20 sm:py-28 px-5 md:px-10 relative overflow-hidden text-center"
      style={{ background: "linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(184,146,90,0.16) 0%,transparent 70%)" }} />
      <div ref={ref} className="relative mx-auto max-w-3xl">

        <div className={`transition-all duration-700 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <DoctorAvatars />
        </div>

        <div className={`flex items-center justify-center gap-3 mb-7 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="w-16 h-px bg-[#B8925A]/40" /><Dm /><span className="w-16 h-px bg-[#B8925A]/40" />
        </div>
        <h2 className={`text-4xl sm:text-5xl md:text-[68px] text-[#2C1A0E] mb-6 transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.05 }}>
          Ready to Meet<br /><em className="italic text-[#B8925A]">the Team?</em>
        </h2>
        <p className={`text-[#7A6556] text-base sm:text-lg font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
Our team is always here to assist you. We're just a call away to answer any questions or help you schedule your consultation, no pressure, just genuine care and support.        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="tel:5105984921"
            className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-8 sm:px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400 w-full sm:w-auto justify-center">
            <Ph /> Call (510) 598-4921
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a href="/contact"
            className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-8 sm:px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300 w-full sm:w-auto justify-center">
            Send a Message
          </a>
        </div>
        <p className={`text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${vis ? "opacity-100" : "opacity-0"}`}>
          Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA · Telehealth Statewide CA
        </p>
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
  @keyframes floatOrb   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-34px) scale(1.06)} 66%{transform:translate(-16px,20px) scale(0.94)} }
  @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
`;