/* eslint-disable no-unused-vars */
import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";

/* ── PHOTOS ── */
const P = {
  clinicInside   : "/src/assets/inside clinic1.jpg",
  office         : "/src/assets/office.jpg",
  receptionist   : "/src/assets/reciptent.jpg",
  drGillInside   : "/src/assets/dr J gill-inside.jpg",
  drGillPortrait : "/src/assets/Gill_Japsharan.jpg",
  consulting1    : "/src/assets/counsalting.jpg",
  clinicInterior : "/src/assets/inetrioir clinic.jpg",
};

/* ── INSURANCE PLANS ── */
const PLANS = [
  { name: "Aetna",             type: "Commercial",  color: "#8B1A1A" },
  { name: "Blue Shield of CA", type: "Commercial",  color: "#003087" },
  { name: "United Healthcare", type: "Commercial",  color: "#00539F" },
  { name: "Cigna",             type: "Commercial",  color: "#006DB7" },
  { name: "Anthem Blue Cross", type: "Commercial",  color: "#00539F" },
  { name: "Kaiser Permanente", type: "Commercial",  color: "#00857C" },
  { name: "Medicare",          type: "Government",  color: "#1F5C99" },
  { name: "Medi-Cal",          type: "Government",  color: "#2E7D32" },
  { name: "Magellan Health",   type: "Behavioral",  color: "#5C3566" },
  { name: "Optum / UBH",       type: "Behavioral",  color: "#FF6900" },
  { name: "Beacon Health",     type: "Behavioral",  color: "#1B4F72" },
  { name: "Tricare",           type: "Military",    color: "#1A3A5C" },
  { name: "MHN",               type: "Behavioral",  color: "#006747" },
  { name: "Evernorth",         type: "Commercial",  color: "#005C5C" },
  { name: "Multiplan",         type: "Commercial",  color: "#7B3F00" },
  { name: "Out-of-Pocket",     type: "Self-Pay",    color: "#B8925A" },
];

const FILTER_TABS = ["All", "Commercial", "Government", "Behavioral", "Military", "Self-Pay"];

/* ── SCROLL REVEAL ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── CUSTOM CURSOR ── */
function CustomCursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);
  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const tick = () => {
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${pos.current.x - 16}px,${pos.current.y - 16}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <>
      <div ref={dot}  className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{ transition: "none" }} />
      <div ref={ring} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{ transition: "transform 0.12s ease-out" }} />
    </>
  );
}

/* ════════════════════════════════
   INSURANCE PAGE
════════════════════════════════ */
export default function Insurance() {
  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6", cursor: "none" }}>
      <style>{CSS}</style>
      <CustomCursor />
      <HeroSection />
      <MarqueeStrip />
      <PlansSection />
      <HowItWorksSection />
      <CoverageSection />
      <TelehealthCoverage />
      <FinancingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

/* ══════ 1. HERO ══════ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden"
      style={{ background: "linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)" }}>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />

      {/* Background clinic photo — right half */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] overflow-hidden">
        <img src={P.clinicInside} alt="Tri-Valley Clinic"
          className="w-full h-full object-cover object-center opacity-30"
          style={{ filter: "saturate(0.7)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #2C1A0E 0%, #2C1A0E 10%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #2C1A0E 0%, transparent 60%)" }} />
      </div>

      {/* Gold orbs */}
      <div className="absolute top-[15%] right-[30%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(184,146,90,0.12) 0%,transparent 70%)", animation: "floatOrb 12s ease-in-out infinite" }} />
      <div className="absolute bottom-[20%] left-[10%] w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(184,146,90,0.08) 0%,transparent 70%)", animation: "floatOrb 9s ease-in-out infinite reverse" }} />

      {/* Vertical side text */}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3"
        style={{ writingMode: "vertical-rl", animation: "fadeUp 1s ease 0.8s both" }}>
        <span className="w-px h-16 bg-[#B8925A]/40" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A]/50">680 Mowry Ave · Fremont, CA</span>
        <span className="w-px h-16 bg-[#B8925A]/40" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">

        {/* LEFT */}
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/8 px-4 py-2 mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">We Verify Coverage at No Charge</span>
          </div>

          <h1 className={`text-[50px] md:text-[66px] xl:text-[80px] text-[#F0E8DA] leading-[0.98] mb-6 transition-all duration-900 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, transitionDelay: "200ms" }}>
            Your Care,<br />
            <em className="italic text-[#C9A46A]">Covered.</em>
          </h1>

          <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "380ms" }}>
            <span className="w-10 h-px bg-[#B8925A]/60" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#A89880] font-light">Most Major Insurance Plans Accepted</span>
          </div>

          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "450ms" }}>
            We accept most major insurance plans and work with your provider to make psychiatric care, medical weight loss, and wellness services accessible. Our staff verifies your coverage before your first visit — at no cost to you.
          </p>

          <div className={`flex flex-wrap gap-4 mb-10 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "560ms" }}>
            <a href="tel:5105984921"
              className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">
              <PhoneIcon /> Verify My Insurance
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
            <a href="#plans"
              className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">
              View Accepted Plans ↓
            </a>
          </div>

          {/* Quick trust tags */}
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "680ms" }}>
            {["Free Verification", "Same-Day Callback", "Telehealth Covered", "Cherry Financing Available"].map((t) => (
              <span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — floating info cards */}
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "400ms" }}>
          {[
            { icon: <ShieldIcon />, title: "16+ Plans Accepted",    sub: "Commercial, Government, Behavioral & Military" },
            { icon: <ClockIcon />,  title: "Same-Day Verification", sub: "We confirm your coverage before your visit"     },
            { icon: <CheckIcon />,  title: "No Surprise Billing",   sub: "Full cost transparency before you book"         },
          ].map((c, i) => (
            <div key={c.title}
              className="bg-[#FDFAF6]/8 border border-[#E8D5BE]/15 backdrop-blur-sm px-6 py-5 flex items-center gap-5 w-full max-w-sm"
              style={{ animation: `fadeUp 0.8s ease ${0.5 + i * 0.15}s both` }}>
              <div className="w-10 h-10 border border-[#B8925A]/40 flex items-center justify-center text-[#C9A46A] flex-shrink-0">
                {c.icon}
              </div>
              <div>
                <p className="text-[#F0E8DA] text-sm font-medium mb-0.5">{c.title}</p>
                <p className="text-[#A89880] text-xs font-light">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FDFAF6, transparent)" }} />

      {/* Scroll cue */}
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

/* ══════ 2. MARQUEE STRIP ══════ */
function MarqueeStrip() {
  const items = ["Aetna","Blue Shield","United Healthcare","Cigna","Medicare","Medi-Cal","Anthem","Kaiser","Magellan","Optum","Beacon Health","Tricare","MHN","Evernorth","Cherry Financing"];
  const rep = [...items, ...items];
  return (
    <div className="bg-[#2C1A0E] py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 38s linear infinite", width: "max-content" }}>
        {rep.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">
            {t}<DiamondSvg />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════ 3. PLANS GRID ══════ */
function PlansSection() {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? PLANS : PLANS.filter((p) => p.type === active);

  return (
    <section id="plans" className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><DiamondSvg size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] mb-5 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            Accepted <em className="italic text-[#B8925A]">Insurance Plans</em>
          </h2>
          <p className={`text-[#7A6556] text-lg font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            We partner with a wide range of insurance providers so that quality psychiatric care remains within reach for every patient.
          </p>
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {FILTER_TABS.map((tab) => (
            <button key={tab} onClick={() => setActive(tab)}
              className={`px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold border transition-all duration-300 ${
                active === tab
                  ? "bg-[#B8925A] border-[#B8925A] text-[#FDFAF6]"
                  : "border-[#E8D5BE] text-[#7A6556] hover:border-[#B8925A]/50 hover:text-[#B8925A]"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 60} vis={vis} />
          ))}
        </div>

        {/* Note */}
        <div className={`mt-12 border border-[#E8D5BE] bg-[#F5EEE4] p-6 flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-700 delay-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#B8925A]/40 flex items-center justify-center text-[#B8925A] flex-shrink-0">
              <InfoIcon />
            </div>
            <p className="text-sm text-[#7A6556] font-light">
              <span className="text-[#3D2B1F] font-medium">Don't see your plan?</span> Call us — coverage changes frequently and we may accept your plan. We verify all insurance before your first visit at no cost.
            </p>
          </div>
          <a href="tel:5105984921"
            className="flex-shrink-0 group flex items-center gap-2 bg-[#B8925A] text-[#FDFAF6] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#2C1A0E] transition-colors duration-300 whitespace-nowrap">
            <PhoneIcon /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, delay, vis }) {
  const [hov, setHov] = useState(false);
  const typeColors = {
    "Commercial": "#B8925A", "Government": "#6B7C5E",
    "Behavioral": "#7A6556", "Military": "#5A6E8A", "Self-Pay": "#B8925A",
  };
  const tc = typeColors[plan.type] || "#B8925A";

  return (
    <div
      className={`group relative bg-[#FDFAF6] border border-[#E8D5BE] p-6 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(184,146,90,0.14)] hover:border-[#B8925A]/50 cursor-default ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: "600ms" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* top gold sweep on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: tc }} />

      {/* Insurance initial badge */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 text-[#FDFAF6] text-lg font-semibold"
        style={{ background: hov ? tc : "#F0E8DA", color: hov ? "#FDFAF6" : tc, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.3rem", border: `1.5px solid ${tc}30`, transitionDuration: "300ms" }}>
        {plan.name.charAt(0)}
      </div>

      <h3 className="text-sm font-medium text-[#2C1A0E] mb-1 leading-tight group-hover:text-[#B8925A] transition-colors duration-300"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1rem" }}>
        {plan.name}
      </h3>

      <span className="text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-0.5 mt-2"
        style={{ color: tc, background: `${tc}12`, border: `1px solid ${tc}30` }}>
        {plan.type}
      </span>
    </div>
  );
}

/* ══════ 4. HOW IT WORKS ══════ */
function HowItWorksSection() {
  const [ref, vis] = useReveal();
  const steps = [
    { n: "01", icon: <PhoneIcon />,  title: "Call or Contact Us",      desc: "Reach out by phone or our contact form. Share your insurance card information with our friendly front desk staff." },
    { n: "02", icon: <ShieldIcon />, title: "We Verify Your Coverage",  desc: "Our team contacts your insurance provider directly and confirms your coverage, copay, and any deductibles — at no charge to you." },
    { n: "03", icon: <CalIcon />,    title: "Book Your Appointment",    desc: "Once verified, we schedule your visit — next-day availability for most patients, in-person or via telehealth." },
  ];

  return (
    <section className="py-24 px-5 md:px-10" style={{ background: "linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><DiamondSvg size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            How Insurance <em className="italic text-[#C9A46A]">Verification Works</em>
          </h2>
          <p className={`text-[#A89880] text-base font-light mt-4 max-w-lg mx-auto transition-all duration-700 delay-200 ${vis ? "opacity-100" : "opacity-0"}`}>
            We take the confusion out of insurance. Our staff handles every step — so you can focus on your health.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-[#B8925A]/30 via-[#B8925A]/60 to-[#B8925A]/30" />

          {steps.map((s, i) => (
            <div key={s.n}
              className={`group relative text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 150}ms`, transitionDuration: "700ms" }}>

              {/* Number circle */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/30 group-hover:border-[#B8925A] transition-colors duration-500" />
                <div className="absolute inset-2 rounded-full bg-[#B8925A]/8 group-hover:bg-[#B8925A]/15 transition-colors duration-500" />
                <div className="relative text-center">
                  <div className="text-[#B8925A] mb-0.5 flex justify-center">{s.icon}</div>
                  <span className="text-[10px] tracking-[0.2em] text-[#B8925A]/60 font-semibold uppercase">{s.n}</span>
                </div>
              </div>

              <h3 className="text-xl text-[#F0E8DA] mb-4 group-hover:text-[#C9A46A] transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {s.title}
              </h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light max-w-[260px] mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA inline */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a href="tel:5105984921"
            className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">
            <PhoneIcon /> Call (510) 598-4921 to Verify
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════ 5. WHAT'S COVERED ══════ */
function CoverageSection() {
  const [ref, vis] = useReveal();
  const services = [
    { icon: <BrainIcon />,    title: "Psychiatric Evaluations",     desc: "Initial psychiatric assessments for new patients are typically covered under mental health benefits." },
    { icon: <PillIcon />,     title: "Medication Management",       desc: "Ongoing prescription management and follow-up visits for psychiatric medications." },
    { icon: <HeartIcon />,    title: "ADHD Treatment",              desc: "Diagnosis, evaluation, and ongoing management of ADHD in adults." },
    { icon: <ShieldIcon />,   title: "Anxiety & Depression",        desc: "Treatment for anxiety disorders, major depression, PTSD, OCD, and related conditions." },
    { icon: <VideoIcon />,    title: "Telehealth Visits",           desc: "Most major insurance plans now cover telehealth psychiatry visits statewide in California." },
    { icon: <WeightIcon />,   title: "Medical Weight Loss",         desc: "GLP-1 / Semaglutide programs may be covered — our staff will verify your specific plan." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — clinic photo */}
          <div className={`relative transition-all duration-1000 ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="absolute top-8 -left-4 right-8 bottom-0 bg-[#E8D5BE]/50 -z-10" />
            <div className="absolute top-0 left-0 w-[3px] h-24 bg-[#B8925A]" />

            <div className="overflow-hidden" style={{ height: "480px" }}>
              <img src={P.drGillInside} alt="Dr. Gill at Tri-Valley Clinic"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.04]" />
            </div>

            {/* Floating verified badge */}
            <div className="absolute -bottom-6 -right-4 bg-[#FDFAF6] border border-[#E8D5BE] shadow-xl px-6 py-5"
              style={{ animation: "floatBadge 5s ease-in-out infinite" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B8925A]/10 flex items-center justify-center text-[#B8925A]">
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-[#2C1A0E] text-sm font-medium">Free Verification</p>
                  <p className="text-[9px] tracking-[0.16em] uppercase text-[#B8925A]/70 mt-0.5">Before Your First Visit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — coverage list */}
          <div className={`transition-all duration-1000 delay-200 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#B8925A]" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">What's Typically Covered</span>
            </div>
            <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1 }}>
              Services <em className="italic text-[#B8925A]">Insurance</em><br />Often Covers
            </h2>
            <p className="text-[#7A6556] text-base font-light mb-10 leading-relaxed">
              Coverage varies by plan. Our staff confirms your specific benefits before your appointment — no guessing, no surprises.
            </p>

            <div className="space-y-4">
              {services.map((s, i) => (
                <div key={s.title}
                  className={`group flex items-start gap-4 border border-[#E8D5BE] bg-[#FDFAF6] p-5 transition-all duration-700 hover:border-[#B8925A]/50 hover:shadow-[0_6px_24px_rgba(184,146,90,0.09)] ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${200 + i * 80}ms`, transitionDuration: "600ms" }}>
                  <div className="w-9 h-9 border border-[#B8925A]/30 flex items-center justify-center text-[#B8925A] flex-shrink-0 group-hover:bg-[#B8925A] group-hover:text-[#FDFAF6] group-hover:border-[#B8925A] transition-all duration-300">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2C1A0E] mb-0.5">{s.title}</p>
                    <p className="text-[#7A6556] text-xs leading-relaxed font-light">{s.desc}</p>
                  </div>
                  <div className="ml-auto text-[#B8925A]/0 group-hover:text-[#B8925A]/50 transition-colors duration-300 flex-shrink-0">
                    <ArrowIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ 6. TELEHEALTH COVERAGE ══════ */
function TelehealthCoverage() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-20 px-5 md:px-10 bg-[#FDFAF6]">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#263320 0%,#1E2B1C 100%)" }}>

          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* Two-col layout */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Left — clinic photo */}
            <div className="relative overflow-hidden" style={{ height: "400px" }}>
              <img src={P.consulting1} alt="Telehealth Consultation"
                className="w-full h-full object-cover object-center opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 0%,#1E2B1C 100%)" }} />
            </div>

            {/* Right — text */}
            <div className={`p-10 md:p-16 flex flex-col justify-center transition-all duration-800 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#A8C59A] animate-pulse" />
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#A8C59A] font-semibold">Telehealth Insurance</span>
              </div>
              <h3 className="text-4xl md:text-5xl text-[#F0EDE8] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                Telehealth Is Now<br /><em className="italic text-[#A8C59A]">Widely Covered</em>
              </h3>
              <p className="text-[#A8B89E] text-base font-light leading-relaxed mb-6">
                Following changes to telehealth laws, most major insurance plans now cover psychiatric telehealth visits in California at the same rate as in-person care. Our staff will verify your telehealth benefits when you call.
              </p>
              <ul className="space-y-3 mb-8">
                {["Most plans cover telehealth at in-person rates","Available to all California residents","Secure HIPAA-compliant video platform","Prescription management included"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[#A8B89E] text-sm font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8C59A] flex-shrink-0" />{t}
                  </li>
                ))}
              </ul>
              <a href="tel:5105984921"
                className="inline-flex items-center gap-2 bg-[#6B7C5E] text-[#F0EDE8] px-7 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#7D9170] transition-colors duration-300 self-start">
                <PhoneIcon /> Verify Telehealth Coverage
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ 7. FINANCING ══════ */
function FinancingSection() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-20 px-5 md:px-10 bg-[#F0E8DA] border-y border-[#E8D5BE]">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#B8925A]" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Flexible Financing</span>
            </div>
            <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1 }}>
              No Insurance?<br /><em className="italic text-[#B8925A]">No Problem.</em>
            </h2>
            <p className="text-[#7A6556] text-base font-light leading-relaxed mb-6">
              We've partnered with <strong className="text-[#3D2B1F] font-medium">Cherry Financing</strong> to offer flexible payment plans for patients without insurance or with out-of-pocket costs. Apply in minutes with no hard credit check.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "0% interest plans available",
                "Instant approval in under 60 seconds",
                "No hard credit check to apply",
                "Covers all services at Tri-Valley Clinic",
                "Flexible monthly payment amounts",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-[#7A6556] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a href="/financing"
                className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#2C1A0E] transition-colors duration-300">
                Apply for Cherry Financing
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="tel:5105984921"
                className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] transition-colors duration-300">
                <PhoneIcon /> Call Us
              </a>
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "0%",       lab: "Interest Available",  sub: "On qualifying plans"       },
              { val: "60s",      lab: "Approval Time",       sub: "Fast, easy application"    },
              { val: "No",       lab: "Hard Credit Check",   sub: "Safe to apply anytime"     },
              { val: "All",      lab: "Services Covered",    sub: "Psychiatry · Weight Loss · IV" },
            ].map((c, i) => (
              <div key={c.lab}
                className="bg-[#FDFAF6] border border-[#E8D5BE] p-6 hover:border-[#B8925A]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(184,146,90,0.12)] transition-all duration-300">
                <p className="text-4xl text-[#B8925A] mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{c.val}</p>
                <p className="text-[11px] tracking-[0.14em] uppercase text-[#3D2B1F] font-semibold mb-1">{c.lab}</p>
                <p className="text-[10px] text-[#7A6556]/70 font-light">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ 8. FAQ ══════ */
function FAQSection() {
  const [ref, vis] = useReveal();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How do I know if my insurance is accepted?",            a: "Call us at (510) 598-4921 and our front desk team will verify your insurance within the same business day. We contact your provider directly and confirm your specific mental health benefits, copays, and deductibles — at no cost to you." },
    { q: "Do I need a referral to see Dr. Gill?",                 a: "Most insurance plans do not require a referral for psychiatric care, but this varies by plan. When you call to verify your insurance, we'll confirm whether a referral is needed for your specific coverage." },
    { q: "What is my copay or deductible for psychiatry?",        a: "Copays and deductibles vary widely by insurance plan. Our staff will provide you with a clear breakdown of your expected costs before your first appointment so there are no surprises." },
    { q: "Is telehealth covered by my insurance?",                a: "Most major insurance plans now cover telehealth psychiatric visits in California at the same rate as in-person care. We verify telehealth benefits as part of our standard insurance check." },
    { q: "Is medical weight loss (GLP-1) covered by insurance?",  a: "Coverage for GLP-1 medications and medical weight loss programs varies significantly by plan. Some commercial plans cover physician-supervised weight loss programs. We'll verify your specific benefits when you call." },
    { q: "What if I don't have insurance?",                       a: "We offer Cherry Financing — flexible payment plans with 0% interest options, instant approval, and no hard credit check. You can apply online or in-office. Call us to discuss your options." },
    { q: "Do you offer a sliding-scale fee?",                     a: "We do not offer sliding-scale fees, but Cherry Financing allows you to break up any out-of-pocket costs into manageable monthly payments. Call us to learn more about your options." },
    { q: "Does my insurance cover IV Hydration Therapy?",         a: "IV Hydration Therapy is typically a self-pay service, as most insurance plans do not cover elective wellness infusions. However, Cherry Financing is available for this service." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50" /><DiamondSvg size={7} /><span className="w-12 h-px bg-[#B8925A]/50" />
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            Insurance <em className="italic text-[#B8925A]">Questions</em>
          </h2>
          <p className={`text-[#7A6556] text-base font-light mt-4 transition-all duration-700 delay-200 ${vis ? "opacity-100" : "opacity-0"}`}>
            Everything you need to know about using insurance at Tri-Valley Clinic.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q}
              className={`border transition-all duration-500 ${open === i ? "border-[#B8925A]/50 bg-[#F5EEE4]" : "border-[#E8D5BE] bg-[#FDFAF6] hover:border-[#B8925A]/30"} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 60}ms`, transitionDuration: "600ms" }}>
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[15px] font-medium text-[#2C1A0E]"
                  style={{ fontFamily: "'Jost', sans-serif" }}>{f.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open === i ? "border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45" : "border-[#E8D5BE] text-[#B8925A]"}`}>
                  <PlusIcon />
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ease-in-out ${open === i ? "max-h-48 pb-6" : "max-h-0"}`}>
                <p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════ 9. CTA ══════ */
function CTASection() {
  const [ref, vis] = useReveal();
  return (
    <section className="py-28 px-5 md:px-10 relative overflow-hidden text-center"
      style={{ background: "linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(184,146,90,0.14) 0%,transparent 70%)" }} />
      <div ref={ref} className="relative mx-auto max-w-2xl">
        {/* BOTH DOCTORS — 50/50 partners, shown on every page */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <DoctorAvatars className="mb-10" />
        </div>
        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="w-16 h-px bg-[#B8925A]/40" /><DiamondSvg /><span className="w-16 h-px bg-[#B8925A]/40" />
        </div>
        <h2 className={`text-5xl md:text-[64px] text-[#2C1A0E] mb-5 transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.05 }}>
          Let's Verify Your<br /><em className="italic text-[#B8925A]">Coverage Today.</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>Call us and we will check your insurance in minutes — at no cost, no commitment required.</p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400">
            <PhoneIcon /> Call (510) 598-4921
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a href="/contact" className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">
            Send a Message
          </a>
        </div>
        <p className={`mt-7 text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${vis ? "opacity-100" : "opacity-0"}`}>
          Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA · Telehealth Statewide CA
        </p>
      </div>
    </section>
  );
}

/* ══════ ICONS ══════ */
const ico = (d) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
function PhoneIcon()    { return ico(<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>); }
function ShieldIcon()   { return ico(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>); }
function ClockIcon()    { return ico(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>); }
function CheckIcon()    { return ico(<polyline points="20 6 9 17 4 12"/>); }
function CalIcon()      { return ico(<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>); }
function InfoIcon()     { return ico(<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>); }
function BrainIcon()    { return ico(<path d="M9 3a3 3 0 00-3 3 3 3 0 00-3 3 3 3 0 003 3v3a3 3 0 003 3h6a3 3 0 003-3v-3a3 3 0 003-3 3 3 0 00-3-3 3 3 0 00-3-3H9z"/>); }
function PillIcon()     { return ico(<><path d="M10.5 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v7"/><path d="M16.5 18a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/><path d="M21 21l-1.5-1.5"/></>); }
function HeartIcon()    { return ico(<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>); }
function VideoIcon()    { return ico(<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>); }
function WeightIcon()   { return ico(<><path d="M12 3a3 3 0 100 6 3 3 0 000-6z"/><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><line x1="12" y1="9" x2="12" y2="21"/></>); }
function ArrowIcon()    { return ico(<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>); }
function PlusIcon()     { return ico(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>); }
function DiamondSvg({ size = 8 }) { return <svg width={size} height={size} viewBox="0 0 10 10" fill="#B8925A"><polygon points="5,0 10,5 5,10 0,5"/></svg>; }

/* ══════ CSS ══════ */
const CSS = `
  * { cursor: none !important; }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatOrb  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-30px) scale(1.06)} 66%{transform:translate(-14px,18px) scale(0.94)} }
  @keyframes floatBadge{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes scrollLine{ 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
`;