/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState, useCallback } from "react";
import IMAGES from "../constants/images";

/* ─── IMAGE ASSIGNMENTS FOR THIS PAGE ─────────────────────
   Hero right portrait      → DR_GILL_HERO     (Photo 1 outdoor)
   Hero floating card       → BOTH_CLINIC      (Photo 15 inside clinic)
   Hero floating badge      → stays text only
   Dr. Gill section left    → DR_GILL_INSIDE   (inside clinic, approved)
   Dr. Gill section float   → BOTH_OUTDOOR     (Photo 11 both together)
   CTA mini avatar          → DR_GILL_CARD     (Photo 18 white bg)
   Services bg reveal       → clinic photos
──────────────────────────────────────────────────────────*/

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
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

export default function Home() {
  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6", cursor: "none" }}>
      <style>{CSS}</style>
      <Cursor />
      <HeroSection />
      <MarqueeTicker />
      <StatsSection />
      <ExperienceSection />
      <ServicesSection />
      <DrGillSection />
      <ClinicStripSection />
      <ConsultBand />
      <WhyUsSection />
      <TestimonialsSection />
      <InsuranceSection />
      <TelehealthSection />
      <FinalCTA />
    </main>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FDFAF6 0%,#F5EEE4 45%,#EDE5D6 100%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />
      {[{ s:520,t:"5%", l:"55%",o:0.16,d:"0s"},{ s:320,t:"55%",l:"10%",o:0.11,d:"4s"},{ s:240,t:"20%",l:"35%",o:0.08,d:"8s"}].map((o,i)=>(
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:o.s,height:o.s,top:o.t,left:o.l,
            background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,
            animation:`floatOrb ${12+i*3}s ease-in-out infinite ${o.d}` }}/>
      ))}
      <div className="hidden xl:flex absolute left-7 top-1/2 -translate-y-1/2 flex-col items-center gap-3"
        style={{ animation:"fadeUp 1s ease 1s both" }}>
        <span className="w-px h-20 bg-gradient-to-b from-transparent to-[#B8925A]/60"/>
        <span className="text-[8px] tracking-[0.35em] uppercase text-[#B8925A]/50 font-medium" style={{ writingMode:"vertical-rl" }}>Fremont · California</span>
        <span className="w-px h-20 bg-gradient-to-t from-transparent to-[#B8925A]/60"/>
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 py-20 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
        {/* LEFT */}
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/5 px-4 py-2 mb-8 transition-all duration-700 ${loaded?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{ transitionDelay:"100ms" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/>
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Accepting New Patients · Fremont, CA</span>
          </div>
          <h1 className={`text-[52px] md:text-[68px] xl:text-[82px] text-[#2C1A0E] leading-[0.98] mb-6 transition-all duration-900 ${loaded?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
            style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"220ms" }}>
            Where<br/><em className="italic" style={{ color:"#B8925A" }}>Healing</em><br/>Meets<br/>
            <span style={{ fontWeight:300,color:"#7A6556" }}>Luxury.</span>
          </h1>
          <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${loaded?"opacity-100":"opacity-0"}`} style={{ transitionDelay:"400ms" }}>
            <span className="w-12 h-px bg-[#B8925A]/50"/>
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#7A6556] font-medium">Dr. Japsharan Gill & Dr. Gondara · Psychiatry & Wellness</span>
          </div>
          <p className={`text-[#7A6556] text-[17px] leading-relaxed max-w-[440px] font-light mb-10 transition-all duration-700 ${loaded?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{ transitionDelay:"480ms" }}>
            Physician-led clinic integrating psychiatry, weight management, IV hydration, TMS, and longevity-focused care to support lasting, whole-body health.
          </p>
          <div className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${loaded?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{ transitionDelay:"580ms" }}>
            <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-all duration-400">
              <Ph/> Free Consultation <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
            <a href="/about" className="group flex items-center gap-3 border border-[#B8925A] text-[#B8925A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] hover:text-[#FDFAF6] transition-all duration-300">
              Meet the Team
            </a>
          </div>
          <div className={`flex flex-wrap gap-6 transition-all duration-700 ${loaded?"opacity-100":"opacity-0"}`} style={{ transitionDelay:"700ms" }}>
            {[{n:"15+",l:"Yrs Experience"},{n:"5★",l:"Google Rating"},{n:"Free",l:"Consultation"},{n:"CA",l:"Telehealth"}].map((t)=>(
              <div key={t.l} className="flex items-center gap-2">
                <p className="text-[22px] text-[#B8925A]" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:500 }}>{t.n}</p>
                <p className="text-[9px] tracking-[0.18em] uppercase text-[#7A6556]/70 leading-tight">{t.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — TWO OVERLAPPING PHOTOS */}
        <div className={`relative flex justify-center lg:justify-end pr-0 lg:pr-6 pt-10 lg:pt-0 transition-all duration-1000 ${loaded?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{ transitionDelay:"300ms" }}>
          {/* PHOTO 1 — Dr. Gill outdoor portrait (Photo 1 of 19) */}
          <div className="relative">
            <div className="absolute inset-0 translate-x-5 translate-y-5 bg-[#B8925A]/20 -z-10"/>
            {["-top-3 -left-3 border-t-2 border-l-2","-top-3 -right-3 border-t-2 border-r-2","-bottom-3 -left-3 border-b-2 border-l-2","-bottom-3 -right-3 border-b-2 border-r-2"].map((c,i)=>(
              <span key={i} className={`absolute w-10 h-10 border-[#B8925A] z-20 ${c}`}/>
            ))}
            <div className="w-[300px] md:w-[370px] overflow-hidden" style={{ height:"490px" }}>
              {/* 🔄 REPLACE src with: /assets/dr-gill-outdoor.jpg (Photo 1 of 19) */}
              <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"/>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C1A0E]/70 to-transparent px-6 py-5 z-10">
                <p style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-[#C9A46A] text-xl font-light italic">Dr. Japsharan Gill, MD</p>
                <p className="text-[#E8D5BE]/60 text-[9px] tracking-[0.2em] uppercase mt-0.5">Founder & CEO · Psychiatry & Wellness</p>
              </div>
            </div>
          </div>

          {/* PHOTO 2 — Both doctors arms crossed (white bg — both fully visible in small card) */}
          <div className="absolute -bottom-8 -right-2 md:-right-8 w-[175px] md:w-[210px] overflow-hidden border-[3px] border-[#FDFAF6] shadow-[0_20px_60px_rgba(44,26,14,0.25)]"
            style={{ height:"220px",animation:"floatBadge 5s ease-in-out infinite",zIndex:15 }}>
            <img src={IMAGES.BOTH_ARMS_CROSSED} alt="Dr. Gill and Dr. Gondara"
              className="w-full h-full object-cover object-top"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[8px] tracking-[0.18em] uppercase text-[#C9A46A] font-semibold">Founders · Tri-Valley Clinic</p>
              <p className="text-[10px] text-[#E8D5BE]/80" style={{ fontFamily:"'Cormorant Garamond',serif" }}>Dr. Gill & Dr. Gondara, MD</p>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-6 left-4 md:-left-8 bg-[#FDFAF6] border border-[#E8D5BE] shadow-xl px-5 py-3.5"
            style={{ animation:"floatBadge 4s ease-in-out infinite 1.5s" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#6B7C5E] animate-pulse"/>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#6B7C5E] font-semibold">Available Today</span>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-[#2C1A0E] text-lg font-normal">Next-Day Appointments</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation:"fadeUp 1s ease 1.4s both" }}>
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-12 overflow-hidden"><div className="w-full h-full bg-gradient-to-b from-[#B8925A]/70 to-transparent" style={{ animation:"scrollLine 2s ease-in-out infinite" }}/></div>
      </div>
    </section>
  );
}

function MarqueeTicker() {
  const items=["Psychiatric Care","Medical Weight Loss","GLP-1 Therapy","IV Hydration","TMS Therapy","Telehealth · Statewide CA","ADHD","Anxiety & Depression","Free 15-Min Consultation","Next-Day Appointments","Dr. Gill & Dr. Gondara","Fremont, California"];
  const rep=[...items,...items];
  return(<div className="bg-[#2C1A0E] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{ animation:"marquee 38s linear infinite",width:"max-content" }}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/70 text-[10px] tracking-[0.22em] uppercase font-medium px-2">{t}<Dm/></span>)}</div></div>);
}

function StatsSection() {
  const [ref,vis]=useReveal();
  const stats=[{to:15,s:"+",label:"Years of Practice"},{to:5,s:"",label:"Specialty Services"},{to:2,s:"",label:"Physicians on Staff"},{to:58,s:"+",label:"CA Cities via Telehealth"}];
  return(
    <section ref={ref} className="bg-[#F0E8DA] border-y border-[#E8D5BE] py-14 px-5 md:px-10">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-[#E8D5BE]">
        {stats.map((s,i)=>(
          <div key={s.label} className={`text-center transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{ transitionDelay:`${i*100}ms` }}>
            <p className="text-6xl md:text-7xl text-[#B8925A] mb-2 leading-none" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
              {vis?<Counter to={s.to} suffix={s.s}/>:`0${s.s}`}
            </p>
            <p className="text-[9px] tracking-[0.22em] uppercase text-[#7A6556] font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref,vis]=useReveal();
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6] overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Section label */}
        <div ref={ref} className={`flex items-center gap-4 mb-8 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="w-12 h-px bg-[#B8925A]/50"/>
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">The Tri-Valley Experience</span>
          <span className="flex-1 h-px bg-[#E8D5BE]/60"/>
        </div>

        {/* ── ROW 1 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">

          {/* 1. BIG clinic interior — luxury space hero */}
          <div className={`lg:col-span-7 relative overflow-hidden group transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
            style={{height:"540px",transitionDelay:"0ms"}}>
            <img src={IMAGES.CLINIC_INSIDE} alt="Tri-Valley Clinic Interior"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"/>
            <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(44,26,14,0.88) 0%,rgba(44,26,14,0.22) 45%,transparent 100%)"}}/>
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B8925A] via-[#C9A46A] to-transparent"/>
            <span className="absolute top-5 right-5 w-8 h-8 border-t border-r border-[#B8925A]/60"/>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A46A] font-semibold mb-3">A Space Designed for Healing</p>
              <h2 className="text-[#F0E8DA] text-4xl md:text-[44px] leading-[1.08] mb-3"
                style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
                Luxury Care<br/><em className="italic text-[#C9A46A]">Reimagined</em>
              </h2>
              <p className="text-[#A89880] text-sm leading-relaxed max-w-[340px] font-light">
                A clinic designed like a sanctuary — where the environment itself is part of the healing.
              </p>
            </div>
          </div>

          {/* 2. RIGHT COLUMN — stats block + Dr. Gill portrait */}
          <div className={`lg:col-span-5 flex flex-col gap-3 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
            style={{transitionDelay:"120ms"}}>

            {/* Stats dark card */}
            <div className="bg-[#2C1A0E] p-8 flex flex-col justify-between" style={{flex:"0 0 220px"}}>
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold mb-5">By the Numbers</p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  {n:"15+",  l:"Years of Practice"},
                  {n:"2",    l:"Physicians on Staff"},
                  {n:"Free", l:"First Consultation"},
                  {n:"CA",   l:"Telehealth Statewide"},
                ].map((s)=>(
                  <div key={s.l}>
                    <p className="text-3xl text-[#C9A46A] leading-none mb-1"
                      style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{s.n}</p>
                    <p className="text-[9px] tracking-[0.16em] uppercase text-[#7A6556] leading-tight">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-[#E8D5BE]/12 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#6B7C5E]">Accepting New Patients</span>
              </div>
            </div>

            {/* Dr. Gill outdoor portrait */}
            <div className="relative overflow-hidden group flex-1" style={{minHeight:"305px"}}>
              <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill, MD"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/75 via-transparent to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[8px] tracking-[0.22em] uppercase text-[#C9A46A] font-semibold">Dr. Japsharan Gill, MD</p>
                <p className="text-[#E8D5BE]/55 text-[8px] tracking-wider mt-0.5">Founder & CEO · Psychiatry & Wellness</p>
              </div>
              <span className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#B8925A]/0 group-hover:border-[#B8925A] transition-colors duration-400"/>
            </div>
          </div>
        </div>

        {/* ── ROW 2 — three equal cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Dr. Gondara consulting */}
          <div className={`relative overflow-hidden group transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
            style={{height:"290px",transitionDelay:"220ms"}}>
            <img src={IMAGES.DR_GONDARA_WORKING} alt="Dr. Gondara"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{objectPosition:"center 20%"}}/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-transparent to-transparent"/>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[8px] tracking-[0.22em] uppercase text-[#C9A46A] font-semibold">Dr. Gondara, MD</p>
              <p className="text-[#E8D5BE]/55 text-[8px] tracking-wider mt-0.5">President</p>
            </div>
            <span className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#B8925A]/0 group-hover:border-[#B8925A] transition-colors duration-400"/>
          </div>

          {/* Clean reception — different angle from main hero */}
          <div className={`relative overflow-hidden group transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
            style={{height:"290px",transitionDelay:"320ms"}}>
            <img src={IMAGES.CLINIC_INDOOR} alt="Tri-Valley Clinic Reception"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{objectPosition:"center 30%"}}/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-transparent to-transparent"/>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[8px] tracking-[0.22em] uppercase text-[#C9A46A] font-semibold">Tri-Valley Clinic</p>
              <p className="text-[#E8D5BE]/55 text-[8px] tracking-wider mt-0.5">680 Mowry Ave · Fremont, CA</p>
            </div>
          </div>

          {/* Clinic exterior */}
          <div className={`relative overflow-hidden group transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
            style={{height:"290px",transitionDelay:"420ms"}}>
            <img src={IMAGES.CLINIC_EXTERIOR} alt="680 Mowry Ave, Fremont"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-transparent to-transparent"/>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[8px] tracking-[0.22em] uppercase text-[#C9A46A] font-semibold">Our Location</p>
              <p className="text-[#E8D5BE]/55 text-[8px] tracking-wider mt-0.5">680 Mowry Ave · Fremont, CA 94536</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [ref,vis]=useReveal();
  const svcs=[
    { title:"Psychiatric Services",    sub:"Comprehensive Mental Health Care",  img:IMAGES.DR_GILL_CARD,     tag:"Core",         href:"/psychiatric",  desc:"Anxiety, depression, ADHD, PTSD, bipolar disorder — precise diagnosis and personalized treatment.",          accent:"#C9A46A" },
    { title:"Medical Weight Loss",     sub:"GLP-1 / Semaglutide Programs",      img:IMAGES.DR_GILL_HERO_2,   tag:"Now Available", href:"/weight-loss",  desc:"Physician-supervised weight loss with FDA-approved GLP-1 medications, monitored by Dr. Gill personally.", accent:"#B8925A" },
    { title:"IV Hydration Therapy",    sub:"Restore · Revive · Rehydrate",      img:IMAGES.CLINIC_TABLE,     tag:"Unique",        href:"/iv-hydration", desc:"Premium IV nutrient therapy in a spa-like setting — tailored formulas for energy, immunity, and wellness.", accent:"#A8C59A" },
    { title:"TMS Therapy",             sub:"Non-Invasive · No Side Effects",    img:IMAGES.CLINIC_INTERIOR,  tag:"Coming Soon",   href:"/tms",          desc:"FDA-cleared transcranial magnetic stimulation for treatment-resistant depression. Launching soon.",          accent:"#C9A46A" },
  ];
  return(
    <section className="py-24 px-5 md:px-10" style={{ background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">What We Offer</span></div>
            <h2 className={`text-[#F0E8DA] text-5xl md:text-6xl leading-[1.05] transition-all duration-700 delay-100 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
              Our <em className="italic text-[#C9A46A]">Signature</em><br/>Services
            </h2>
          </div>
          <a href="/psychiatric" className={`inline-flex items-center gap-2 border border-[#B8925A]/40 text-[#C9A46A] px-6 py-3 text-[10px] tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300 ${vis?"opacity-100":"opacity-0"}`}>View All Services →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {svcs.map((s,i)=><ServiceCard key={s.title} {...s} delay={i*130} vis={vis}/>)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title,sub,img,tag,href,desc,accent,delay,vis }) {
  const [hov,setHov]=useState(false);
  return(
    <a href={href}
      className={`group relative flex flex-col overflow-hidden border border-[#E8D5BE]/12 bg-[#F5EEE4]/5 transition-all duration-700 hover:-translate-y-1.5 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-12"}`}
      style={{ transitionDelay:`${delay}ms`,transitionDuration:"700ms",minHeight:"400px" }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div className="absolute inset-0 transition-opacity duration-600" style={{ opacity:hov?0.22:0 }}>
        <img src={img} alt={title} className="w-full h-full object-cover object-center"/>
      </div>
      <div className="absolute inset-0 transition-opacity duration-400" style={{ opacity:hov?1:0,boxShadow:`inset 0 0 0 1px ${accent}` }}/>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background:accent }}/>
      <div className="absolute top-0 left-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" style={{ background:accent }}/>
      <div className="relative p-7 flex flex-col flex-1">
        <span className="inline-block text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 mb-6 w-fit border font-semibold" style={{ color:accent,borderColor:`${accent}40` }}>{tag}</span>
        <h3 className="text-2xl text-[#F0E8DA] mb-2 leading-tight group-hover:text-[#E8D5BE] transition-colors duration-300" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:400 }}>{title}</h3>
        <p className="text-[10px] tracking-[0.18em] uppercase mb-4 font-medium" style={{ color:accent }}>{sub}</p>
        <p className="text-[#7A6556] text-sm leading-relaxed font-light flex-1">{desc}</p>
        <div className="flex items-center gap-2 mt-7 text-[11px] tracking-widest font-medium transition-all duration-300" style={{ color:accent }}>
          Learn More <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </div>
      </div>
    </a>
  );
}

function DrGillSection() {
  const [ref,vis]=useReveal();
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`relative transition-all duration-1000 ${vis?"opacity-100 translate-x-0":"opacity-0 -translate-x-12"}`}>
            <div className="absolute top-10 left-10 right-0 bottom-0 bg-[#F0E8DA] -z-10"/>
            <div className="relative">
              <span className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#B8925A] z-10"/>
              <span className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#B8925A] z-10"/>

              <div className="overflow-hidden" style={{ height:"500px",maxWidth:"380px" }}>
                {/* ✅ Approved inside clinic photo — not red face */}
                <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.04]"/>
              </div>
            </div>

            {/* SECOND floating photo — both doctors outdoor (Photo 11) */}
            <div className="absolute -bottom-10 right-0 md:-right-6 w-[180px] md:w-[210px] overflow-hidden border-[3px] border-[#FDFAF6] shadow-[0_20px_60px_rgba(44,26,14,0.18)] z-10"
              style={{ height:"250px",animation:"floatBadge 5s ease-in-out infinite" }}>
              {/* 🔄 REPLACE with: /assets/both-doctors-outdoor.jpg (Photo 11 of 19) */}
              <img src={IMAGES.BOTH_OUTDOOR} alt="Dr. Gill and Dr. Gondara"
                className="w-full h-full object-cover object-top"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#E8D5BE]/80">Dr. Gill & Dr. Gondara</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 md:-left-6 bg-[#B8925A] text-[#FDFAF6] px-6 py-5 shadow-xl z-20">
              <p className="text-4xl font-light mb-0.5" style={{ fontFamily:"'Cormorant Garamond',serif" }}>
                {vis?<Counter to={15} suffix="+"/>:"0+"}
              </p>
              <p className="text-[9px] tracking-[0.22em] uppercase opacity-80">Years of Practice</p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${vis?"opacity-100 translate-x-0":"opacity-0 translate-x-12"}`}>
            <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Meet the Team</span></div>
            <h2 className="text-[#2C1A0E] text-5xl md:text-6xl leading-[1.08] mb-3" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
              Dr. Japsharan<br/><em className="italic text-[#B8925A]">Gill, MD</em>
            </h2>
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#7A6556] mb-1 font-medium">Founder & CEO</p>
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#7A6556]/60 mb-8 font-medium">& Dr. Gondara · President</p>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-4">
              I built Tri-Valley Clinic for people who wanted more than a quick appointment and a prescription — for people who wanted a physician who actually listens.
            </p>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-8">
              I specialize in psychiatry, medical weight management, and advanced wellness. These areas are deeply connected — your mental health, your weight, your energy, and your sense of self. Most practices treat them separately. We don't.
            </p>
            <ul className="space-y-3 mb-10">
              {["Board-Eligible Psychiatry & Wellness","Founder & CEO, Tri-Valley Clinic","Dr. Gondara — President","GLP-1 · IV Hydration · TMS Launching Soon","Telehealth — Statewide California","Free 15-Min Consultation for all new patients"].map((c)=>(
                <li key={c} className="flex items-start gap-3 text-sm text-[#7A6556]"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2"/>{c}</li>
              ))}
            </ul>
            <a href="/about" className="group inline-flex items-center gap-3 border border-[#B8925A] text-[#B8925A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] hover:text-[#FDFAF6] transition-all duration-300">
              Meet the Team <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClinicStripSection() {
  const [ref,vis]=useReveal();
  const photos=[
    /* ❌ reciptent.jpg REMOVED per Dr. Gill */
   
    { src:IMAGES.CLINIC_INSIDE,    label:"Reception & Waiting"     },
    
    { src:IMAGES.CLINIC_INTERIOR,  label:"Clinic Interior"         },
     { src:IMAGES.CLINIC_INDOOR,    label:"Front Office"            },
    { src:IMAGES.CLINIC_MAGAZINES, label:"Waiting Lounge"          },
    /* 🔄 Photo 15 — both doctors inside clinic */
    { src:IMAGES.BOTH_CLINIC,      label:"Our Physicians"          },
    /* 🔄 Photo 11 — both doctors outdoor */
    { src:IMAGES.BOTH_OUTDOOR,     label:"Dr. Gill & Dr. Gondara"  },
    { src:IMAGES.CLINIC_EXTERIOR,  label:"680 Mowry Ave · Fremont" },
  ];
  return(
    <section className="py-20 bg-[#F5EEE4]">
      <div ref={ref} className={`mx-auto max-w-7xl px-5 md:px-10 mb-10 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Clinic Tour</span></div>
            <h2 className="text-4xl md:text-5xl text-[#2C1A0E]" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
              A Space Designed for <em className="italic text-[#B8925A]">Healing</em>
            </h2>
          </div>
          <p className="hidden md:block text-[10px] tracking-[0.18em] uppercase text-[#7A6556]/60">← Scroll →</p>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto px-5 md:px-10 pb-6" style={{ scrollSnapType:"x mandatory",msOverflowStyle:"none",scrollbarWidth:"none" }}>
        {photos.map((p,i)=>(
          <div key={p.label}
            className={`group relative flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
            style={{ width:"280px",height:"360px",scrollSnapAlign:"start",transitionDelay:`${i*80}ms` }}>
            <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"/>
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#E8D5BE] font-medium">{p.label}</p>
            </div>
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConsultBand() {
  const [ref,vis]=useReveal();
  return(
    <section className="relative py-20 px-5 md:px-10 overflow-hidden" style={{ background:"linear-gradient(110deg,#2C1A0E 0%,#3D2B1F 55%,#B8925A 150%)" }}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B8925A'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }}/>
      <div ref={ref} className={`mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#C9A46A]/60 mb-4">No Commitment · Completely Free</p>
          <h2 className="text-[#F0E8DA] text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-4" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
            Your healing journey begins<br/>with a single <em className="italic text-[#C9A46A]">phone call.</em>
          </h2>
          <p className="text-[#A89880] text-base font-light">Dr. Gill and Dr. Gondara offer a free 15-minute consultation to every new patient — a genuine conversation, not a sales pitch.</p>
        </div>
        <div className="flex flex-col gap-3 flex-shrink-0">
          <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 whitespace-nowrap">
            <Ph/> Call (510) 598-4921 →
          </a>
          <a href="/contact" className="flex items-center justify-center border border-[#B8925A]/40 text-[#C9A46A] px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase hover:border-[#B8925A] transition-colors duration-300">Send a Message</a>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const [ref,vis]=useReveal();
  const items=[
    { icon:"👤", num:"Free",  lab:"First Consultation",  text:"A genuine 15-minute call before you commit — we want to ensure we're the right fit for you." },
    { icon:"📅", num:"Next",  lab:"Day Appointments",    text:"Once insurance is verified, next-day availability for in-person and telehealth visits." },
    { icon:"💳", num:"Most",  lab:"Insurance Accepted",  text:"We accept most major plans. Cherry financing also available for out-of-pocket needs." },
    { icon:"📍", num:"1",     lab:"Clinic · Fremont",   text:"One beautiful, dedicated location — every resource focused entirely on your care." },
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
            The Difference Is <em className="italic text-[#B8925A]">You</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it,i)=>(
            <div key={it.lab}
              className={`group relative bg-[#FDFAF6] border border-[#E8D5BE] p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(184,146,90,0.14)] hover:border-[#B8925A]/50 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
              style={{ transitionDelay:`${i*120}ms`,transitionDuration:"700ms" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
              <div className="text-3xl mb-4">{it.icon}</div>
              <p className="text-3xl text-[#B8925A] font-light mb-0.5" style={{ fontFamily:"'Cormorant Garamond',serif" }}>{it.num}</p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#3D2B1F] font-semibold mb-3">{it.lab}</p>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [ref,vis]=useReveal();
  const revs=[
    { name:"Sarah M.", role:"Fremont",   stars:5, text:"Dr. Gill is genuinely one of the most caring physicians I have ever met. She takes her time, listens completely, and the office is absolutely beautiful. I've never felt so comfortable at a medical appointment." },
    { name:"James T.", role:"Union City",stars:5, text:"I've been struggling with ADHD for years and couldn't find a psychiatrist who truly understood. Dr. Gill was different from my very first visit — she created a plan that actually works for my life." },
    { name:"Priya K.", role:"Newark",    stars:5, text:"The GLP-1 weight loss program has been life-changing. Dr. Gill supervises every step personally. The clinic feels like a luxury spa — nothing like your typical doctor's office." },
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
            Real Patients, <em className="italic text-[#B8925A]">Real Results</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {revs.map((r,i)=>(
            <div key={r.name}
              className={`group relative bg-[#F5EEE4] border border-[#E8D5BE] p-8 transition-all duration-700 hover:shadow-[0_12px_40px_rgba(184,146,90,0.10)] hover:border-[#B8925A]/40 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
              style={{ transitionDelay:`${i*130}ms`,transitionDuration:"700ms" }}>
              <div className="text-[90px] text-[#B8925A]/12 leading-none absolute top-2 left-5 pointer-events-none select-none" style={{ fontFamily:"'Cormorant Garamond',serif" }}>"</div>
              <div className="flex gap-0.5 mb-5">{Array(r.stars).fill(0).map((_,j)=><St key={j}/>)}</div>
              <p className="text-[#7A6556] text-[14px] leading-relaxed italic font-light mb-6 relative z-10">"{r.text}"</p>
              <div className="border-t border-[#E8D5BE] pt-4 flex items-center justify-between">
                <div>
                  <p className="text-[#2C1A0E] text-lg" style={{ fontFamily:"'Cormorant Garamond',serif" }}>{r.name}</p>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-[#B8925A]/60 mt-0.5">Patient · {r.role}</p>
                </div>
                <div className="flex gap-0.5">{Array(r.stars).fill(0).map((_,j)=><St key={j}/>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-10 text-center transition-all duration-700 delay-500 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#E8D5BE] bg-[#F5EEE4] px-7 py-3.5 text-[10px] tracking-widest uppercase text-[#7A6556] hover:border-[#B8925A]/40 hover:text-[#B8925A] transition-all duration-300">
            <span className="flex gap-0.5">{Array(5).fill(0).map((_,j)=><St key={j}/>)}</span>
            Read All Google Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

function InsuranceSection() {
  const [ref,vis]=useReveal();
  const plans=["Aetna","Blue Shield","United Healthcare","Cigna","Medicare","Medi-Cal","Anthem","Kaiser","Magellan","Optum","Beacon Health","Tricare"];
  return(
    <section className="py-20 px-5 md:px-10 bg-[#F0E8DA] border-y border-[#E8D5BE]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={`text-center mb-10 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-4"><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className="text-4xl md:text-5xl text-[#2C1A0E]" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>We Accept Most Major Plans</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-7">
          {plans.map((p,i)=>(
            <div key={p}
              className={`bg-[#FDFAF6] border border-[#E8D5BE] flex items-center justify-center py-4 px-2 text-[10px] tracking-widest uppercase text-[#7A6556] text-center font-medium hover:border-[#B8925A]/50 hover:text-[#B8925A] hover:bg-[#F5EEE4] transition-all duration-300 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
              style={{ transitionDelay:`${i*45}ms`,transitionDuration:"600ms" }}>
              {p}
            </div>
          ))}
        </div>
        <p className={`text-center text-sm text-[#7A6556] font-light transition-all duration-700 delay-700 ${vis?"opacity-100":"opacity-0"}`}>
          Don't see your plan? <a href="tel:5105984921" className="text-[#B8925A] underline underline-offset-2 hover:text-[#C9A46A] transition-colors">Call us</a> — we verify coverage before your first visit at no charge.
        </p>
      </div>
    </section>
  );
}

function TelehealthSection() {
  const [ref,vis]=useReveal();
  const steps=[
    { n:"01",title:"Call or Contact Us",      desc:"Reach out by phone or contact form. We'll verify your insurance and confirm your appointment." },
    { n:"02",title:"Receive Your Secure Link", desc:"We'll send a private, HIPAA-compliant video link ahead of your scheduled session." },
    { n:"03",title:"Meet Your Physician",      desc:"Connect from anywhere in California — full psychiatric care via secure video." },
    { n:"04",title:"Ongoing Support",          desc:"Follow-ups, prescription management, and continued care — all handled via telehealth." },
  ];
  return(
    <section className="py-24 px-5 md:px-10 relative overflow-hidden" style={{ background:"linear-gradient(140deg,#263320 0%,#1E2B1C 60%,#192417 100%)" }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"32px 32px" }}/>
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={ref} className={`transition-all duration-900 ${vis?"opacity-100 translate-x-0":"opacity-0 -translate-x-10"}`}>
          <div className="flex items-center gap-2 mb-6"><span className="w-2 h-2 rounded-full bg-[#A8C59A] animate-pulse"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#A8C59A] font-semibold">Available · All of California</span></div>
          <h2 className="text-[#F0EDE8] text-5xl md:text-6xl leading-[1.05] mb-6" style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
            Your Psychiatrist.<br/><em className="italic text-[#A8C59A]">Wherever</em> You Are.
          </h2>
          <p className="text-[#A8B89E] text-base leading-relaxed mb-8 font-light">Secure, HIPAA-compliant telehealth appointments for all psychiatric services — available to every patient in California. Same expert care. Same personal attention. From home.</p>
          <ul className="space-y-3 mb-10">
            {["Psychiatric evaluations via secure video","Medication management & refills","ADHD, anxiety, depression & more","All California residents welcome","Same next-day scheduling as in-person"].map((t)=>(
              <li key={t} className="flex items-center gap-3 text-[#A8B89E] text-sm font-light"><span className="w-1.5 h-1.5 rounded-full bg-[#A8C59A] flex-shrink-0"/>{t}</li>
            ))}
          </ul>
          <a href="tel:5105984921" className="inline-flex items-center gap-3 bg-[#6B7C5E] text-[#F0EDE8] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#7D9170] transition-colors duration-300">
            <Ph/> Book Telehealth Visit
          </a>
        </div>
        <div className={`flex flex-col gap-4 transition-all duration-900 delay-200 ${vis?"opacity-100 translate-x-0":"opacity-0 translate-x-10"}`}>
          {steps.map((s)=>(
            <div key={s.n} className="flex gap-5 border border-[#6B7C5E]/35 p-5 bg-[#1E2B1C]/50 hover:bg-[#1E2B1C] transition-colors duration-300 group">
              <span className="text-3xl text-[#6B7C5E] font-light flex-shrink-0 leading-none mt-0.5" style={{ fontFamily:"'Cormorant Garamond',serif" }}>{s.n}</span>
              <div>
                <p className="text-[#F0EDE8] font-medium text-sm mb-1.5 group-hover:text-[#A8C59A] transition-colors duration-300">{s.title}</p>
                <p className="text-[#A8B89E] text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [ref,vis]=useReveal();
  return(
    <section className="relative py-28 px-5 md:px-10 text-center overflow-hidden" style={{ background:"linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(184,146,90,0.18) 0%,transparent 70%)" }}/>
      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* Both doctor avatars */}
        <div className={`mb-8 flex justify-center gap-4 transition-all duration-700 ${vis?"opacity-100 scale-100":"opacity-0 scale-90"}`}>
          <div className="relative">
            {/* 🔄 REPLACE with: /assets/dr-gill-white.jpg (Photo 18 white bg) */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B8925A]/60 shadow-[0_8px_32px_rgba(184,146,90,0.2)]">
              <img src={IMAGES.DR_GILL_CARD} alt="Dr. Gill" className="w-full h-full object-cover object-top"/>
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]"/>
          </div>
          <div className="relative">
            {/* 🔄 REPLACE with: /assets/dr-gondara-white.jpg (Photo 19 white bg) */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B8925A]/40 shadow-lg">
              <img src={IMAGES.DR_GONDARA_CARD} alt="Dr. Gondara" className="w-full h-full object-cover object-top"/>
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]"/>
          </div>
        </div>

        <div className={`flex items-center justify-center gap-3 mb-7 transition-all duration-700 delay-100 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-16 h-px bg-[#B8925A]/40"/><Dm/><span className="w-16 h-px bg-[#B8925A]/40"/></div>
        <h2 className={`text-[#2C1A0E] text-5xl md:text-7xl leading-[1.02] mb-6 transition-all duration-700 delay-150 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>
          Begin Your Journey<br/><em className="italic text-[#B8925A]">Today.</em>
        </h2>
        <p className={`text-[#7A6556] text-lg leading-relaxed mb-10 font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          Your first consultation is completely free. A 15-minute conversation with Dr. Gill — no commitment, no pressure. Just the first step toward feeling better.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 transition-all duration-700 delay-300 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400">
            <Ph/> Call (510) 598-4921 <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <a href="/contact" className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">Send a Message</a>
        </div>
        <p className={`text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${vis?"opacity-100":"opacity-0"}`}>
          Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA · Telehealth Statewide CA
        </p>
      </div>
    </section>
  );
}

function Ph(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;}
function Dm({size=8}){return <svg width={size} height={size} viewBox="0 0 10 10" fill="#B8925A"><polygon points="5,0 10,5 5,10 0,5"/></svg>;}
function St(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="#B8925A"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;}

const CSS=`
  *{cursor:none !important;}
  .hide-scrollbar::-webkit-scrollbar{display:none;}
  .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes floatOrb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-34px) scale(1.06)}66%{transform:translate(-16px,20px) scale(0.94)}}
  @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}
`;