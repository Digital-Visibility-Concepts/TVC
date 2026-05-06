import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";
import SEO from '../components/SEO';

const P = { hero: "/assets/emptytabel.jpg", drGill: "/assets/Gill_Japsharan.jpg", inside: "/assets/inside clinic1.jpg", interior: "/assets/inetrioir clinic.jpg", office: "/assets/office.jpg" };

function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sv(true); o.unobserve(el); } }, { threshold: t, rootMargin: "0px 0px -60px 0px" });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

function Cursor() {
  const d = useRef(null), r = useRef(null), p = useRef({ x: 0, y: 0 }), f = useRef(null);
  useEffect(() => {
    const mv = e => { p.current = { x: e.clientX, y: e.clientY }; };
    const tk = () => {
      if (d.current) d.current.style.transform = `translate(${p.current.x - 4}px,${p.current.y - 4}px)`;
      if (r.current) r.current.style.transform = `translate(${p.current.x - 16}px,${p.current.y - 16}px)`;
      f.current = requestAnimationFrame(tk);
    };
    window.addEventListener("mousemove", mv);
    f.current = requestAnimationFrame(tk);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(f.current); };
  }, []);
  return (
    <>
      <div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{ transition: "none" }} />
      <div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{ transition: "transform 0.12s ease-out" }} />
    </>
  );
}

/* ─── 12 DRIPS — full data ─── */
const DRIPS = [
  {
    name: "The Pure Revival Drip",
    tag: "Hydration",
    desc: "Simple, clean rehydration to restore your body's fluid balance and replenish what daily life depletes.",
    benefits: ["Restores hydration at the cellular level", "Replenishes electrolytes", "Supports overall body function"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)"],
  },
  {
    name: "The Ignite Drip",
    tag: "Metabolism Support",
    desc: "A powerful combination of nutrients designed to support your body's natural breakdown of fats, carbohydrates, and proteins. Supports liver detoxification and helps improve insulin sensitivity.",
    benefits: ["Supports fat and carbohydrate metabolism", "Aids liver detoxification", "Improves insulin sensitivity", "Boosts sustained energy production", "Replenishes essential vitamins"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Vitamin C", "Magnesium Chloride", "Calcium Gluconate", "B-Complex Vitamins (B1, B2, B3, B5, B6)", "Cyanocobalamin (B12)"],
  },
  {
    name: "The Ultimate Wellness Revive Drip",
    tag: "Myers / Energy",
    desc: "A comprehensive blend of B vitamins, Vitamin C, Magnesium, and Calcium to increase metabolism, replace electrolytes, and support adrenal function. Ideal for fatigue, stress, and burnout recovery.",
    benefits: ["Increases energy & reduces fatigue", "Supports adrenal function", "Replaces electrolytes", "Boosts metabolism", "Ideal for stress and burnout recovery"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Vitamin C", "Magnesium Chloride", "Calcium Gluconate", "B-Complex Vitamins (B1, B2, B3, B5, B6)"],
  },
  {
    name: "The Shield Drip",
    tag: "Immune Defense",
    desc: "Contains Zinc to support immune cell function and high-dose Vitamin C to boost lymphocyte and phagocyte production — a powerful antioxidant that supports the body's natural healing.",
    benefits: ["Boosts immune cell function", "High-dose Vitamin C for antioxidant protection", "Supports lymphocyte & phagocyte production", "Reduces oxidative stress", "Aids recovery from illness"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Ascorbic Acid — high dose", "Magnesium Chloride"],
  },
  {
    name: "The Lumière Drip",
    tag: "Glow & Skin Brightening",
    desc: "A powerful antioxidant infusion that breaks down free radicals, reduces inflammation at the cellular level, and supports skin brightness by inhibiting enzymes responsible for pigment production.",
    benefits: ["Brightens and evens skin tone", "Reduces oxidative cellular damage", "Inhibits melanin-producing enzymes", "Anti-inflammatory effects", "Supports radiant, youthful appearance"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Glutathione 200mg/ml"],
  },
  {
    name: "The Apex Drip",
    tag: "Men's HRT Support",
    desc: "Formulated to support men's hormonal health at the cellular level. Trace minerals and magnesium support mitochondrial function, muscle recovery, nitric oxide production, and healthy blood flow.",
    benefits: ["Supports mitochondrial energy production", "Aids muscle recovery & strength", "Supports healthy testosterone metabolism", "Promotes nitric oxide and blood flow", "Replenishes key trace minerals"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Copper", "Manganese", "Zinc", "Selenium", "Magnesium Chloride"],
  },
  {
    name: "The Balance Drip",
    tag: "Women's HRT Support",
    desc: "Crafted to support women's hormonal balance with key cofactors involved in hormone conversion pathways. Vitamin C protects cells from oxidative stress and supports energy metabolism.",
    benefits: ["Supports hormonal balance", "Antioxidant & cellular protection", "Supports energy metabolism", "Aids in hormone conversion pathways", "Supports bone & cardiovascular health"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Vitamin C", "Zinc"],
  },
  {
    name: "The Warrior Drip",
    tag: "Muscle Recovery",
    desc: "Helps build muscle mass, reduces fatigue, and improves muscular endurance through a combination of amino acids, vitamins, and minerals. Reduces inflammatory responses and aids the body's natural rebuilding processes.",
    benefits: ["Boosts endurance & performance", "Supports muscle conditioning & repair", "Reduces post-workout fatigue", "Aids cell reproduction & growth", "Supports electrolyte balance"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Vitamin C", "Magnesium Chloride", "Arginine", "Glutamine", "Lysine", "Proline", "L-Taurine", "L-Carnitine", "Vitamin B12"],
  },
  {
    name: "The Slim Drip",
    tag: "Slim & Trim",
    desc: "A targeted blend designed to support fat metabolism, appetite regulation, liver function, and sustained energy production. L-Carnitine facilitates the transport of fatty acids into the mitochondria for energy. MIC+B12 administered as a separate IM injection.",
    benefits: ["Supports fat metabolism", "Aids appetite regulation", "Supports liver detoxification", "Boosts energy production", "Supports mood & serotonin balance"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Vitamin C", "L-Carnitine", "MIC+B12 (Methionine, Inositol, Choline, Cyanocobalamin) — IM injection"],
  },
  {
    name: "The Rescue Drip",
    tag: "Hangover Recovery",
    desc: "Contains essential vitamins and minerals to combat dehydration and reduce oxidative stress on the liver, cardiovascular, and endocrine systems. Reduces nausea and inflammation to cut recovery time significantly.",
    benefits: ["Detoxifies the body", "Reduces nausea quickly", "Reduces inflammation", "Cuts hangover recovery time", "Restores fluid and electrolyte balance"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Magnesium Chloride", "Dexamethasone", "Ketorolac", "Ondansetron"],
  },
  {
    name: "The Relief Drip",
    tag: "Migraine & Headache",
    desc: "This multifaceted infusion works to improve vascular function linked to migraine attacks, reduce associated nausea, and relax blood vessels through double-dose magnesium. Targets the root physiological triggers of migraine for faster, more complete relief.",
    benefits: ["Reduces migraine frequency & severity", "Relaxes blood vessels with double-dose magnesium", "Reduces nausea fast", "Targets root physiological triggers", "Provides rapid headache relief"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Magnesium Chloride (double dose)", "Ketorolac", "Ondansetron"],
  },
  {
    name: "The Clarity Drip",
    tag: "Brain Health & Focus",
    desc: "Targeting cognitive function, mental clarity, and mood support. Great for professionals, students, and anyone experiencing brain fog, burnout, or stress.",
    benefits: ["Sharpens focus & mental clarity", "Supports memory & cognitive function", "Reduces brain fog", "Supports mood balance", "Boosts energy for mental performance"],
    ingredients: ["Normal Saline (Electrolyte Base Solution)", "Glutathione", "Vitamin B12", "Taurine", "B-Complex (B1, B2, B3, B4, B5, B6)"],
  },
];

const BENEFITS = [
  "Bypasses the digestive system for Direct nutrient absorption",
  "Rapid results — most patients feel effects within 30–60 minutes",
  "Administered in our calm, spa-like clinic setting",
  "All formulas curated and supervised by our licensed clinicians. Custom blends available upon request.",
  "Sessions last approximately 45–60 minutes",
  "Available as single sessions or package plans",
];

export default function IVHydration() {
  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6", cursor: "none" }}>
      <SEO
        title="IV Hydration Therapy"
        description="Premium IV hydration therapy in Fremont, CA. Energy, immunity, beauty, and recovery drip formulas. Physician-supervised in a spa-like clinic setting."
        path="/iv-hydration"
      />
      <style>{CSS}</style>
      <Cursor />
      <Hero />
      <Mq />
      <WhatIs />
      <DripsMenu />
      <HowItWorks />
      <WhyChoose />
      <FAQSec />
      <CTA />
    </main>
  );
}

/* ══ HERO ══ */
function Hero() {
  const [on, sOn] = useState(false);
  useEffect(() => { setTimeout(() => sOn(true), 80); }, []);
  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden" style={{ background: "linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden">
        <img src={P.inside} alt="Clinic" className="w-full h-full object-cover opacity-30" style={{ filter: "saturate(0.65)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#2C1A0E 0%,transparent 55%)" }} />
      </div>
      {[{ t: "10%", l: "52%", s: 400, o: 0.12, d: "0s" }, { t: "60%", l: "5%", s: 260, o: 0.08, d: "5s" }].map((orb, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{ width: orb.s, height: orb.s, top: orb.t, left: orb.l, background: `radial-gradient(circle,rgba(184,146,90,${orb.o}) 0%,transparent 70%)`, animation: `floatOrb ${11 + i * 4}s ease-in-out infinite ${orb.d}` }} />
      ))}
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/[8%] px-4 py-2 mb-7 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] animate-pulse" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Available Now · Physician-Supervised</span>
          </div>
          <h1 className={`text-[48px] md:text-[62px] xl:text-[74px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, transitionDelay: "200ms" }}>
            Rehydrate.<br /><em className="italic text-[#C9A46A]">Restore.</em><br />Revive.
          </h1>
          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "440ms" }}>
            IV nutrient therapy delivered in a calm, comfortable setting at Tri-Valley Clinic. Whether you're looking to boost energy, support recovery, enhance immunity, or simply feel your best — our physician-supervised drip formulas are designed to deliver real results, fast.
          </p>
          <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "540ms" }}>
            <a href="/contact" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">
              <Ph /> Book a Session <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
            <a href="#menu" className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">View IV Menu ↓</a>
          </div>
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "640ms" }}>
            {["45–60 Min Sessions", "12 Custom Formulas", "Physician-Monitored", "Cherry Financing Available"].map(t => (
              <span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "380ms" }}>
          {[{ val: "12", lab: "Custom Drip Formulas", sub: "Tailored to your wellness goals" }, { val: "45", lab: "Minute Sessions", sub: "Relax in our spa-like clinic" }, { val: "6", lab: "Specialist Areas", sub: "Hydration · Immunity · Recovery · More" }].map((c, i) => (
            <div key={c.lab} className="bg-[#FDFAF6]/[8%] border border-[#E8D5BE]/15 px-6 py-5 flex items-center gap-5 w-full max-w-xs" style={{ animation: `fadeUp 0.8s ease ${0.5 + i * 0.12}s both` }}>
              <p className="text-3xl text-[#C9A46A] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{c.val}</p>
              <div>
                <p className="text-[#F0E8DA] text-sm font-medium">{c.lab}</p>
                <p className="text-[#A89880] text-xs font-light mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to top,#FDFAF6,transparent)" }} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeUp 1s ease 1.2s both" }}>
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-12 overflow-hidden"><div className="w-full h-full bg-gradient-to-b from-[#B8925A]/70 to-transparent" style={{ animation: "scrollLine 2s ease-in-out infinite" }} /></div>
      </div>
    </section>
  );
}

/* ══ MARQUEE ══ */
function Mq() {
  const items = ["IV Hydration", "Vitamin C Drip", "Glutathione", "B-Complex", "Immune Boost", "Energy Infusion", "Beauty Drip", "Brain Boost", "Amino Acids", "Rehydration", "Wellness Therapy", "Fremont CA"];
  const rep = [...items, ...items];
  return (
    <div className="bg-[#2C1A0E] py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 36s linear infinite", width: "max-content" }}>
        {rep.map((t, i) => <span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<Dm /></span>)}
      </div>
    </div>
  );
}

function IVDripAnimation(){
  return(
    <div className="relative flex items-center justify-center w-full h-full" style={{minHeight:"520px",background:"linear-gradient(135deg,#150c06 0%,#2C1A0E 60%,#150c06 100%)"}}>
      <style>{`
        @keyframes liquidLevel{0%,100%{height:148px;y:115px}50%{height:143px;y:120px}}
        @keyframes chamberPool{0%,100%{height:34px;y:430px}50%{height:40px;y:424px}}
        @keyframes bagSway{0%,100%{transform:rotate(0deg)}40%{transform:rotate(0.35deg)}70%{transform:rotate(-0.28deg)}}
        @keyframes glowPulse{0%,100%{opacity:0.18}50%{opacity:0.42}}
        @keyframes tubeFlow{0%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}
        @keyframes drop1Form{0%{cy:338;r:0;opacity:0}20%{cy:340;r:0;opacity:0}36%{cy:343;r:5.5;opacity:1}54%{cy:349;r:8.5;opacity:1}65%{cy:394;r:4;opacity:0.65}80%{cy:428;r:1.5;opacity:0.15}100%{cy:440;r:0;opacity:0}}
        @keyframes drop2Form{0%{cy:338;r:0;opacity:0}10%{cy:338;r:0;opacity:0}26%{cy:342;r:4.5;opacity:0.9}46%{cy:348;r:7.5;opacity:1}58%{cy:388;r:3.5;opacity:0.55}73%{cy:425;r:1;opacity:0.15}100%{cy:438;r:0;opacity:0}}
        @keyframes splash1{0%,62%{opacity:0;rx:0;ry:0}68%{opacity:1;rx:8;ry:3}80%{opacity:0.3;rx:15;ry:5}90%{opacity:0;rx:19;ry:6}100%{opacity:0}}
        @keyframes splash2{0%,52%{opacity:0;rx:0;ry:0}58%{opacity:0.85;rx:6;ry:2.5}71%{opacity:0.25;rx:12;ry:4}82%{opacity:0;rx:16;ry:5}100%{opacity:0}}
      `}</style>

      {/* Background glow */}
      <div className="absolute" style={{width:280,height:280,top:"0%",left:"50%",transform:"translateX(-50%)",background:"radial-gradient(circle,rgba(184,146,90,0.26) 0%,transparent 68%)",animation:"glowPulse 4s ease-in-out infinite",pointerEvents:"none"}}/>

      <svg viewBox="0 0 240 680" style={{width:"82%",maxWidth:"340px",filter:"drop-shadow(0 24px 64px rgba(184,146,90,0.28))"}}>
        <defs>
          <linearGradient id="bagG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE5D6" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#C9A46A" stopOpacity="0.08"/>
          </linearGradient>
          <linearGradient id="liqG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C9A46A" stopOpacity="0.72"/>
            <stop offset="100%" stopColor="#B8925A" stopOpacity="0.42"/>
          </linearGradient>
          <linearGradient id="chamG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5EEE4" stopOpacity="0.14"/>
            <stop offset="48%" stopColor="#EDE5D6" stopOpacity="0.32"/>
            <stop offset="100%" stopColor="#F5EEE4" stopOpacity="0.08"/>
          </linearGradient>
          <linearGradient id="poolG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AB72" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#B8925A" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="dropG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0BC82" stopOpacity="1"/>
            <stop offset="100%" stopColor="#B8925A" stopOpacity="0.88"/>
          </linearGradient>
          <linearGradient id="bagShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5EEE4" stopOpacity="0.0"/>
            <stop offset="20%" stopColor="#F5EEE4" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#F5EEE4" stopOpacity="0.0"/>
          </linearGradient>
          <clipPath id="bagClip">
            <rect x="46" y="54" width="148" height="226" rx="8"/>
          </clipPath>
          <clipPath id="chamClip">
            <rect x="96" y="330" width="48" height="120" rx="0"/>
          </clipPath>
          <filter id="dGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── HOOK ── */}
        <path d="M120 4 C120 4 120 -2 128 -2 C138 -2 142 6 142 14 C142 22 136 28 128 28 C124 28 120 26 118 23" stroke="#B8925A" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9"/>
        <line x1="120" y1="4" x2="120" y2="20" stroke="#B8925A" strokeWidth="3" strokeLinecap="round" opacity="0.75"/>

        {/* ── BAG ── */}
        <g style={{animation:"bagSway 10s ease-in-out infinite",transformOrigin:"120px 170px"}}>
          {/* Hanger bar */}
          <rect x="94" y="18" width="52" height="9" rx="3" fill="#B8925A" fillOpacity="0.55" stroke="#B8925A" strokeWidth="0.8" strokeOpacity="0.7"/>
          {/* Neck piece connecting hanger to bag */}
          <rect x="113" y="27" width="14" height="28" rx="3" fill="#B8925A" fillOpacity="0.35" stroke="#B8925A" strokeWidth="0.8" strokeOpacity="0.6"/>

          {/* ── STRAIGHT BAG BODY ── */}
          {/* Shadow depth */}
          <rect x="50" y="58" width="148" height="226" rx="8" fill="rgba(0,0,0,0.25)" transform="translate(4,5)"/>
          {/* Main bag */}
          <rect x="46" y="54" width="148" height="226" rx="8" fill="url(#bagG)" stroke="#B8925A" strokeWidth="2" strokeOpacity="0.82"/>
          {/* Shine strip on left */}
          <rect x="46" y="54" width="148" height="226" rx="8" fill="url(#bagShine)"/>
          {/* Left edge highlight */}
          <line x1="52" y1="62" x2="52" y2="272" stroke="#EDE5D6" strokeWidth="1.2" strokeOpacity="0.28"/>

          {/* Fluid fill */}
          <rect x="47" y="115" width="146" rx="0" clipPath="url(#bagClip)" style={{fill:"url(#liqG)",animation:"liquidLevel 4.5s ease-in-out infinite"}}/>
          {/* Fluid surface */}
          <line x1="49" y1="117" x2="191" y2="117" stroke="#D4AB72" strokeWidth="1.2" strokeOpacity="0.65" style={{animation:"liquidLevel 4.5s ease-in-out infinite"}}/>

          {/* Label card */}
          <rect x="70" y="150" width="100" height="96" rx="3" fill="#B8925A" fillOpacity="0.12" stroke="#B8925A" strokeWidth="0.7" strokeOpacity="0.38"/>
          <text x="120" y="174" textAnchor="middle" fill="#C9A46A" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="2.2" fontWeight="600" opacity="0.98">IV HYDRATION</text>
          <line x1="76" y1="180" x2="164" y2="180" stroke="#B8925A" strokeWidth="0.5" strokeOpacity="0.4"/>
          <text x="120" y="192" textAnchor="middle" fill="#E8D5BE" fontSize="5.2" fontFamily="'Jost',sans-serif" letterSpacing="0.8" opacity="0.62">NORMAL SALINE + VITAMINS</text>
          <text x="120" y="228" textAnchor="middle" fill="#C9A46A" fontSize="13" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" opacity="0.78">500 mL</text>

          {/* Measurement ticks on right side of bag */}
          {[80,105,130,155,180,205,230,255].map((y,i)=>(
            <line key={y} x1="192" y1={y} x2={i===3?199:196} y2={y} stroke="#B8925A" strokeWidth="0.7" strokeOpacity="0.42"/>
          ))}

          {/* Bottom port nub */}
          <rect x="112" y="278" width="16" height="13" rx="3.5" fill="#B8925A" fillOpacity="0.55" stroke="#B8925A" strokeWidth="1" strokeOpacity="0.75"/>
          <rect x="116" y="291" width="8" height="7" rx="2" fill="#B8925A" fillOpacity="0.7"/>
        </g>

        {/* ── TUBE: bag → chamber ── */}
        <line x1="120" y1="298" x2="120" y2="328" stroke="#B8925A" strokeWidth="3.2" strokeOpacity="0.52" strokeLinecap="round"/>

        {/* ── DRIP CHAMBER ── */}
        {/* Top ellipse cap */}
        <ellipse cx="120" cy="328" rx="24" ry="7" fill="#B8925A" fillOpacity="0.52" stroke="#B8925A" strokeWidth="1.2" strokeOpacity="0.8"/>
        {/* Chamber walls */}
        <rect x="96" y="328" width="48" height="122" fill="url(#chamG)" stroke="#B8925A" strokeWidth="1.4" strokeOpacity="0.62"/>
        {/* Chamber interior shines */}
        <line x1="99" y1="332" x2="99" y2="448" stroke="#EDE5D6" strokeWidth="1" strokeOpacity="0.24"/>
        <line x1="141" y1="332" x2="141" y2="448" stroke="#B8925A" strokeWidth="0.6" strokeOpacity="0.14"/>
        {/* Bottom ellipse cap */}
        <ellipse cx="120" cy="450" rx="24" ry="7" fill="rgba(184,146,90,0.42)" stroke="#B8925A" strokeWidth="1.2" strokeOpacity="0.7"/>

        {/* Measurement ticks on chamber */}
        {[342,360,378,396,414,432].map((y,i)=>(
          <line key={y} x1="96" y1={y} x2={i===2||i===4?90:93} y2={y} stroke="#B8925A" strokeWidth="0.6" strokeOpacity="0.45"/>
        ))}
        <text x="86" y="398" textAnchor="middle" fill="#B8925A" fontSize="4.8" fontFamily="'Jost',sans-serif" opacity="0.48" transform="rotate(-90,86,398)">DRIP CHAMBER</text>

        {/* Fluid pool in chamber */}
        <rect x="97" y="430" width="46" rx="0" clipPath="url(#chamClip)" style={{fill:"url(#poolG)",animation:"chamberPool 4.5s ease-in-out infinite"}}/>
        <line x1="98" y1="430" x2="143" y2="430" stroke="#D4AB72" strokeWidth="1" strokeOpacity="0.6" style={{animation:"chamberPool 4.5s ease-in-out infinite"}}/>

        {/* Drip entry tube at top of chamber */}
        <line x1="120" y1="326" x2="120" y2="334" stroke="#D4AB72" strokeWidth="1.8" strokeOpacity="0.65"/>

        {/* ── DROP 1 ── */}
        <circle cx="120" cy="338" r="0" fill="url(#dropG)" filter="url(#dGlow)" style={{animation:"drop1Form 3.2s ease-in-out infinite"}}/>
        <ellipse cx="120" cy="430" rx="0" ry="0" fill="none" stroke="#D4AB72" strokeWidth="1.2" strokeOpacity="0" style={{animation:"splash1 3.2s ease-in-out infinite"}}/>

        {/* ── DROP 2 (offset 1.6s) ── */}
        <circle cx="120" cy="338" r="0" fill="url(#dropG)" filter="url(#dGlow)" style={{animation:"drop2Form 3.2s ease-in-out 1.6s infinite"}}/>
        <ellipse cx="120" cy="430" rx="0" ry="0" fill="none" stroke="#D4AB72" strokeWidth="0.9" strokeOpacity="0" style={{animation:"splash2 3.2s ease-in-out 1.6s infinite"}}/>

        {/* ── TUBE: chamber → clamp ── */}
        <line x1="120" y1="457" x2="120" y2="480" stroke="#B8925A" strokeWidth="3.2" strokeOpacity="0.48" strokeLinecap="round"/>

        {/* ── ROLLER CLAMP ── */}
        <rect x="107" y="478" width="26" height="10" rx="3.5" fill="#B8925A" fillOpacity="0.38" stroke="#B8925A" strokeWidth="0.9" strokeOpacity="0.68"/>
        <line x1="120" y1="478" x2="120" y2="488" stroke="#B8925A" strokeWidth="1.8" strokeOpacity="0.55"/>

        {/* ── LONG TUBE ── */}
        <path d="M120 488 Q120 510 136 522 Q150 534 150 556 Q150 590 120 602 Q104 606 104 620" fill="none" stroke="#B8925A" strokeWidth="3.2" strokeOpacity="0.32" strokeLinecap="round" strokeDasharray="9 7" style={{animation:"tubeFlow 2.2s linear infinite"}}/>
        <path d="M120 488 Q120 510 136 522 Q150 534 150 556 Q150 590 120 602 Q104 606 104 620" fill="none" stroke="#C9A46A" strokeWidth="1.3" strokeOpacity="0.42" strokeLinecap="round" strokeDasharray="4 12" style={{animation:"tubeFlow 1.6s linear infinite"}}/>
      </svg>

      {/* Gold accent lines left */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-30">
        {[...Array(5)].map((_,i)=>(<div key={i} className="bg-[#B8925A]" style={{width:i%2===0?20:12,height:1}}/>))}
      </div>
      {/* Gold accent lines right */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-30">
        {[...Array(5)].map((_,i)=>(<div key={i} className="bg-[#B8925A]" style={{width:i%2===0?20:12,height:1}}/>))}
      </div>
    </div>
  );
}


/* ══ WHAT IS IV ══ */
function WhatIs() {
  const [ref, v] = useReveal();
  return (
    <section className="bg-[#FDFAF6] overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 720 }}>
        {/* LEFT */}
        <div ref={ref} className={`flex flex-col justify-center px-6 md:px-10 xl:px-14 py-20 transition-all duration-800 ${v ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#B8925A]" /><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">What Is IV Hydration</span></div>
          <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-6" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.1 }}>Nutrients Delivered<br /><em className="italic text-[#B8925A]">Directly</em> to You.</h2>
          <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-4">IV hydration therapy delivers vitamins, minerals, antioxidants, and fluids directly into your bloodstream — bypassing the digestive system for immediate, full bioavailable absorption. The result: faster, more powerful effects than any oral supplement.</p>
          <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-8">At Tri-Valley Clinic, all IV formulas are medically supervised and administered by trained clinical staff in a calm, comfortable, spa-like environment — a deliberate departure from the sterile clinical settings of most IV centers.</p>
          <ul className="space-y-3 mb-10">{BENEFITS.map(b => (<li key={b} className="flex items-start gap-3 text-sm text-[#7A6556]"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2" />{b}</li>))}</ul>
          <div className="flex items-center gap-6 border-t border-[#E8D5BE] pt-6">
            {[["12", "Drip Formulas"], ["45", "Min Sessions"], ["30", "Min to Feel Effects"]].map(([n, l], i) => (
              <div key={l} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-10 bg-[#E8D5BE]" />}
                <div>
                  <p className="text-3xl text-[#B8925A] font-light leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{n}</p>
                  <p className="text-[8px] tracking-[0.18em] uppercase text-[#7A6556]">{l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT — animated IV */}
        <div className={`relative transition-all duration-800 delay-200 ${v ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} style={{ minHeight: 480 }}>
          <div className="absolute left-0 top-0 bottom-0 w-[3px] z-10" style={{ background: "linear-gradient(to bottom,transparent,#B8925A 20%,#B8925A 80%,transparent)" }} />
          <IVDripAnimation />
        </div>
      </div>
    </section>
  );
}

/* ══ 12-DRIP MENU ══ */
function DripsMenu() {
  const [ref, v] = useReveal();
  const [open, setOpen] = useState(null);

  return (
    <section id="menu" className="py-24 px-5 md:px-10" style={{ background: "linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" /></div>
          <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>Our <em className="italic text-[#C9A46A]">Drip Menu</em></h2>
          <p className={`text-[#A89880] text-base font-light mt-4 max-w-md mx-auto transition-all duration-700 delay-200 ${v ? "opacity-100" : "opacity-0"}`}>All formulas curated and supervised by our clinicians. Custom blends available upon request.</p>
        </div>

        {/* 3-col grid on lg, 2-col md, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DRIPS.map((d, i) => {
            const isOpen = open === i;
            return (
              <div key={d.name}
                className={`group relative border border-[#E8D5BE]/15 bg-[#F5EEE4]/5 transition-all duration-700 hover:bg-[#F5EEE4]/10 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 70}ms`, transitionDuration: "700ms" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Card header — always visible */}
                <div className="p-7">
                  <span className="text-[9px] tracking-[0.2em] uppercase border border-[#B8925A]/30 text-[#B8925A] px-2.5 py-1 font-semibold">{d.tag}</span>
                  <h3 className="text-2xl text-[#F0E8DA] mt-4 mb-2 group-hover:text-[#C9A46A] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400 }}>{d.name}</h3>
                  <p className="text-[#7A6556] text-sm leading-relaxed font-light">{d.desc}</p>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex items-center gap-2 mt-5 text-[10px] tracking-wider text-[#B8925A] hover:text-[#C9A46A] transition-colors duration-200"
                  >
                    {isOpen ? "Hide Details" : "Benefits & Ingredients"}
                    <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>↓</span>
                  </button>
                </div>

                {/* Expandable — benefits + ingredients */}
                <div className={`overflow-hidden transition-all duration-400 ${isOpen ? "max-h-[400px]" : "max-h-0"}`}>
                  <div className="px-7 pb-7 border-t border-[#E8D5BE]/10 pt-5 space-y-5">
                    {d.benefits.length > 0 && (
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8925A] font-semibold mb-3">Benefits</p>
                        <ul className="space-y-2">
                          {d.benefits.map(b => (
                            <li key={b} className="flex items-start gap-2 text-[13px] text-[#A89880] font-light">
                              <span className="w-1 h-1 rounded-full bg-[#B8925A]/60 flex-shrink-0 mt-1.5" />{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8925A] font-semibold mb-3">Ingredients</p>
                      <ul className="space-y-2">
                        {d.ingredients.map(ing => (
                          <li key={ing} className="flex items-start gap-2 text-[13px] text-[#A89880] font-light">
                            <span className="w-1 h-1 rounded-full bg-[#C9A46A]/40 flex-shrink-0 mt-1.5" />{ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Book CTA */}
                <div className="px-7 pb-6">
                  <a href="tel:5105984921" className="flex items-center gap-2 text-[10px] tracking-wider text-[#B8925A] hover:text-[#C9A46A] transition-colors duration-200">
                    <Ph /> Book This Drip <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`mt-10 text-center transition-all duration-700 delay-700 ${v ? "opacity-100" : "opacity-0"}`}>
          <p className="text-[#7A6556] text-sm font-light mb-5">Call for current pricing and custom formula consultations.</p>
          <a href="/contact" className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">
            <Ph /> Book Your IV Session <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══ HOW IT WORKS ══ */
function HowItWorks() {
  const [ref, v] = useReveal();
  const steps = [
    { n: "01", t: "Book Online or Call", d: "Schedule your IV session by calling us or using the contact form. Sessions are 45–60 minutes." },
    { n: "02", t: "Brief Health Review", d: "A quick health history check to confirm your IV formula is appropriate and safe for you." },
    { n: "03", t: "Relax & Receive", d: "Sit back in our comfortable clinic setting while your IV drip is administered by clinical staff." },
    { n: "04", t: "Feel the Difference", d: "Most patients notice effects within 30–60 minutes. Hydration, energy, and clarity — delivered." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" /></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>What to <em className="italic text-[#B8925A]">Expect</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#B8925A]/20 via-[#B8925A]/50 to-[#B8925A]/20" />
          {steps.map((s, i) => (
            <div key={s.n} className={`group text-center transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${i * 140}ms`, transitionDuration: "700ms" }}>
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/30 group-hover:border-[#B8925A] transition-colors duration-500" />
                <div className="absolute inset-[6px] rounded-full bg-[#B8925A]/[8%] group-hover:bg-[#B8925A]/15 transition-all duration-500" />
                <span className="text-2xl text-[#B8925A]" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>{s.n}</span>
              </div>
              <h3 className="text-xl text-[#2C1A0E] mb-3 group-hover:text-[#B8925A] transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500 }}>{s.t}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light max-w-[210px] mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ WHY CHOOSE ══ */
function WhyChoose() {
  const [ref, v] = useReveal();
  const items = [
    { n: "01", t: "Physician Oversight", d: "All IV formulations are overseen by licensed physicians, with clinical review of each treatment plan." },
    { n: "02", t: "Comfortable Clinical Setting", d: "Treatments are administered in a calm, private, spa-inspired environment designed for comfort and relaxation." },
    { n: "03", t: "Personalized Formulas", d: "Standard IV options serve as a starting point, with adjustments made based on your health profile and goals when appropriate." },
    { n: "04", t: "Fast Nutrient Delivery", d: "IV therapy delivers nutrients directly into the bloodstream for rapid absorption. Many patients report feeling effects within 30–60 minutes." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50" /><Dm size={7} /><span className="w-12 h-px bg-[#B8925A]/50" /></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>Why Tri-Valley <em className="italic text-[#B8925A]">Clinic</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div key={item.n} className={`group relative border border-[#E8D5BE] bg-[#F5EEE4] p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(184,146,90,0.12)] hover:border-[#B8925A]/50 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "700ms" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="text-4xl text-[#B8925A]/15 font-light leading-none block mb-4 group-hover:text-[#B8925A]/30 transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{item.n}</span>
              <h3 className="text-xl text-[#2C1A0E] mb-3" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 500 }}>{item.t}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ FAQ ══ */
function FAQSec() {
  const [ref, v] = useReveal();
  const [open, sOpen] = useState(null);
  const faqs = [
    { q: "Is IV hydration therapy safe?", a: "Yes, when administered by trained clinical staff under physician supervision. At Tri-Valley Clinic, all IV formulas are overseen by our licensed physicians and administered in a medical setting with appropriate monitoring." },
    { q: "How often can I get IV therapy?", a: "This depends on your health goals and formula. Most wellness patients receive IV therapy every 2–4 weeks. Our clinical staff can recommend a schedule based on your specific needs." },
    { q: "Does insurance cover IV hydration?", a: "IV hydration therapy is typically a self-pay wellness service and is not covered by most insurance plans. Cherry Financing is available to help spread the cost." },
    { q: "Are there any side effects?", a: "Side effects are rare and minor — occasional mild bruising at the insertion site. Most patients experience no discomfort during the session itself." },
    { q: "Can I get IV therapy if I'm on medications?", a: "A health history review is completed before every session. Please disclose all medications during your booking so our staff can confirm your formula is appropriate." },
  ];
  return (
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>Frequently <em className="italic text-[#B8925A]">Asked</em></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className={`border transition-all duration-500 ${open === i ? "border-[#B8925A]/50 bg-[#FDFAF6]" : "border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"} ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 55}ms`, transitionDuration: "600ms" }}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={() => sOpen(open === i ? null : i)}>
                <span className="text-[15px] font-medium text-[#2C1A0E]">{f.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open === i ? "border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45" : "border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
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

/* ══ CTA ══ */
function CTA() {
  const [ref, v] = useReveal();
  return (
    <section className="py-28 px-5 md:px-10 relative overflow-hidden text-center" style={{ background: "linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(184,146,90,0.14) 0%,transparent 70%)" }} />
      <div ref={ref} className="relative mx-auto max-w-2xl">
        <div className={`transition-all duration-700 ${v ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <DoctorAvatars className="mb-10" />
        </div>
        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="w-16 h-px bg-[#B8925A]/40" /><Dm /><span className="w-16 h-px bg-[#B8925A]/40" />
        </div>
        <h2 className={`text-5xl md:text-[64px] text-[#2C1A0E] mb-5 transition-all duration-700 delay-150 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.05 }}>
          Ready to Feel<br /><em className="italic text-[#B8925A]">Your Best?</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Book your IV hydration session today. Walk in, relax, and walk out feeling renewed.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400 w-full sm:w-auto justify-center">
            <Ph /> Call (510) 598-4921 <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a href="/contact" className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300 w-full sm:w-auto justify-center">
            Send a Message
          </a>
        </div>
        <p className={`mt-7 text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${v ? "opacity-100" : "opacity-0"}`}>
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
  @keyframes floatOrb   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-30px) scale(1.06)} 66%{transform:translate(-14px,18px) scale(0.94)} }
  @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }


`;