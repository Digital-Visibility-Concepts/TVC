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
      <SpotlightSection />
      <DrGillSection />
      <ClinicStripSection />
      <DoctorSpotlight />
      <ConsultBand />
      <WhyUsSection />
      <ServiceMiniSpotlight />
      <TestimonialsSection />
      <InsuranceSection />
      <TelehealthSection />
      <FinalCTA />
    </main>
  );
}

function HeroSection() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2100),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Gold particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const GOLD = [[184,146,90],[201,164,106],[232,213,190]];
    const N = window.innerWidth < 768 ? 45 : 90;
    const P = Array.from({length:N}, () => ({
      x:Math.random()*(canvas.width||400), y:Math.random()*(canvas.height||700),
      r:Math.random()*1.6+0.3, a:Math.random()*0.55+0.08,
      vx:(Math.random()-0.5)*0.22, vy:-(Math.random()*0.45+0.1),
      ph:Math.random()*Math.PI*2, col:GOLD[Math.floor(Math.random()*3)],
    }));
    const draw = () => {
      const w=canvas.width, h=canvas.height;
      ctx.clearRect(0,0,w,h);
      P.forEach(p=>{
        p.ph+=0.022; p.x+=p.vx; p.y+=p.vy;
        if(p.y<-4){p.y=h+4;p.x=Math.random()*w;}
        if(p.x<-4) p.x=w+4; if(p.x>w+4) p.x=-4;
        const a=p.a*(0.6+0.4*Math.sin(p.ph));
        const r=p.r*(0.85+0.15*Math.sin(p.ph*1.3));
        ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.col[0]},${p.col[1]},${p.col[2]},${a})`;
        ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  }, []);

  const words = ["Where","Healing","Meets","Luxury."];

  return (
    <section className="relative overflow-hidden" style={{height:"100svh",minHeight:620}}>

      {/* ── BLACK CURTAIN ── */}
      <div className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-700"
        style={{background:"#0A0604",opacity:phase>=2?0:1}}/>

      {/* ── GOLD SCAN LINE ── */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        <div style={{
          position:"absolute",left:0,right:0,height:2,
          background:"linear-gradient(to right,transparent,#C9A46A,#F0E8DA,#C9A46A,transparent)",
          top:0,opacity:phase>=2?0:1,
          transform:phase===1?"translateY(100vh)":"translateY(-8px)",
          transition:phase===1?"transform 0.5s cubic-bezier(0.4,0,0.6,1)":"none",
        }}/>
      </div>

      {/* ══════════════════════════════
          MOBILE  (< lg)
          Full-screen photo hero — luxury magazine cover style
          Text anchored at BOTTOM over heavy gradient
      ══════════════════════════════ */}
      <div className="lg:hidden absolute inset-0">

        {/* Full bleed photo */}
        <div className="absolute inset-0">
          <img src={IMAGES.BOTH_OUTDOOR}
            alt="Dr. Japsharan Gill & Dr. Shabeg Gondara"
            className="w-full h-full object-cover"
            style={{objectPosition:"center 12%"}}/>
        </div>

        {/* Wipe-in reveal — slides up */}
        <div className="absolute inset-0 bg-[#0A0604] z-10 pointer-events-none"
          style={{
            transform:phase>=2?"translateY(-100%)":"translateY(0)",
            transition:"transform 0.9s cubic-bezier(0.77,0,0.18,1)",
          }}/>

        {/* Canvas particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{opacity:phase>=3?0.45:0,transition:"opacity 1.2s ease"}}/>

        {/* GRADIENT — heavy at bottom, light at top so faces are clear */}
        <div className="absolute inset-0 z-20 pointer-events-none"
          style={{background:"linear-gradient(to top, rgba(26,15,8,0.98) 0%, rgba(26,15,8,0.82) 28%, rgba(26,15,8,0.3) 52%, rgba(26,15,8,0.08) 75%, transparent 100%)"}}/>
        {/* Subtle side vignettes */}
        <div className="absolute inset-0 z-20 pointer-events-none"
          style={{background:"linear-gradient(to right,rgba(26,15,8,0.35) 0%,transparent 25%,transparent 75%,rgba(26,15,8,0.35) 100%)"}}/>

        {/* CONTENT — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-8">

          {/* Accepting badge */}
          <div className={`flex items-center gap-2 mb-4 transition-all duration-700 ${phase>=3?"opacity-100 translate-y-0":"opacity-0 translate-y-3"}`}
            style={{transitionDelay:"0ms"}}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse flex-shrink-0"/>
            <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7C5E] font-semibold">Accepting New Patients · Fremont, CA</span>
          </div>

          {/* Headline — word by word drop */}
          <h1 className="mb-2" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:0.97}}>
            {words.map((word,i)=>(
              <span key={word} className="block overflow-hidden">
                <span className="block transition-all duration-600"
                  style={{
                    transitionDelay:`${90+i*90}ms`,
                    transform:phase>=3?"translateY(0)":"translateY(110%)",
                    opacity:phase>=3?1:0,
                    fontSize:"clamp(46px,12vw,68px)",
                    color:i===1?"#C9A46A":"#F0E8DA",
                    fontStyle:i===1?"italic":"normal",
                  }}>{word}</span>
              </span>
            ))}
          </h1>

          {/* Gold divider */}
          <div className={`flex items-center gap-3 mb-4 transition-all duration-700 ${phase>=3?"opacity-100":"opacity-0"}`}
            style={{transitionDelay:"480ms"}}>
            <div className="h-px bg-[#B8925A]" style={{width:phase>=4?40:0,transition:"width 0.7s ease 0.5s"}}/>
            <Dm size={5}/>
            <div className="h-px bg-[#B8925A]/20" style={{width:80}}/>
          </div>

          {/* Sub */}
          <p className={`text-[#A89880] text-sm font-light leading-relaxed mb-5 transition-all duration-700 ${phase>=3?"opacity-100 translate-y-0":"opacity-0 translate-y-3"}`}
            style={{transitionDelay:"560ms",maxWidth:300}}>
            Psychiatry · Weight Loss · IV Hydration · TMS · Telehealth
          </p>

          {/* CTAs */}
          <div className={`flex gap-2.5 transition-all duration-700 ${phase>=3?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}
            style={{transitionDelay:"680ms"}}>
            <a href="tel:5105984921"
              className="flex items-center gap-2 bg-[#B8925A] text-[#1A0F08] px-5 py-3.5 text-[9px] font-bold tracking-[0.22em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 flex-1 justify-center">
              <Ph/> Call Now
            </a>
            <a href="/contact"
              className="flex items-center justify-center gap-2 border border-[#B8925A]/50 text-[#C9A46A] px-5 py-3.5 text-[9px] font-bold tracking-[0.22em] uppercase hover:border-[#B8925A] transition-colors duration-300 flex-1">
              Free Consult
            </a>
          </div>

          {/* Trust row */}
          <div className={`flex gap-5 mt-4 pt-4 border-t border-[#B8925A]/15 transition-all duration-700 ${phase>=4?"opacity-100":"opacity-0"}`}
            style={{transitionDelay:"850ms"}}>
            {[{n:"15+",l:"Yrs"},{n:"Free",l:"Consult"},{n:"5★",l:"Rating"},{n:"CA",l:"Telehealth"}].map(t=>(
              <div key={t.l} className="flex items-baseline gap-1">
                <span className="text-base text-[#B8925A]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{t.n}</span>
                <span className="text-[7px] tracking-[0.14em] uppercase text-[#7A6556]">{t.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next-day pill — top right corner */}
        <div className={`absolute top-16 right-4 z-30 transition-all duration-700 ${phase>=4?"opacity-100 translate-x-0":"opacity-0 translate-x-4"}`}
          style={{transitionDelay:"1000ms",animation:phase>=4?"floatBadge 4s ease-in-out infinite":undefined}}>
          <div className="bg-[#FDFAF6]/95 shadow-lg px-4 py-2.5 border-l-2 border-[#B8925A]">
            <p className="text-[7px] tracking-[0.2em] uppercase text-[#B8925A] font-bold mb-0.5">Next-Day Available</p>
            <p className="text-[#2C1A0E] text-xs" style={{fontFamily:"'Cormorant Garamond',serif"}}>Book Appointment</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          DESKTOP  (≥ lg)
          Split: dark text left / photo right
      ══════════════════════════════ */}
      <div className="hidden lg:flex absolute inset-0">

        {/* LEFT dark panel */}
        <div className="relative flex flex-col justify-center w-[46%]"
          style={{background:"linear-gradient(135deg,#1A0F08 0%,#2C1A0E 65%,#3D2B1F 100%)",padding:"clamp(40px,5vw,80px)"}}>
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}/>
          <div className="absolute left-0 top-16 bottom-16 w-[2px]"
            style={{background:"linear-gradient(to bottom,transparent,#B8925A 30%,#B8925A 70%,transparent)"}}/>

          <div className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${phase>=3?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/>
            <span className="text-[8px] tracking-[0.32em] uppercase text-[#6B7C5E] font-semibold">Accepting New Patients · Fremont, CA</span>
          </div>

          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:0.97,letterSpacing:"-0.01em"}}>
            {words.map((word,i)=>(
              <span key={word} className="block overflow-hidden">
                <span className="block transition-all duration-700"
                  style={{
                    transitionDelay:`${i*120}ms`,
                    transform:phase>=3?"translateY(0) rotate(0deg)":"translateY(110%) rotate(2deg)",
                    opacity:phase>=3?1:0,
                    fontSize:"clamp(52px,5.6vw,92px)",
                    color:i===1?"#C9A46A":"#F0E8DA",
                    fontStyle:i===1?"italic":"normal",
                  }}>{word}</span>
              </span>
            ))}
          </h1>

          <div className={`flex items-center gap-3 my-6 transition-all duration-700 ${phase>=3?"opacity-100":"opacity-0"}`}
            style={{transitionDelay:"580ms"}}>
            <div className="h-px bg-[#B8925A]" style={{width:phase>=4?56:0,transition:"width 0.8s ease 0.6s"}}/>
            <Dm size={6}/>
            <div className="h-px bg-[#B8925A]/25 flex-1" style={{maxWidth:160}}/>
          </div>

          <p className={`text-[#A89880] font-light leading-relaxed mb-8 transition-all duration-700 ${phase>=3?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}
            style={{transitionDelay:"700ms",fontSize:"clamp(13px,1.4vw,17px)",maxWidth:380}}>
            Psychiatry, weight management, IV hydration, TMS, and longevity-focused wellness — in one beautifully designed clinic.
          </p>

          <div className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 ${phase>=3?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}
            style={{transitionDelay:"850ms"}}>
            <a href="tel:5105984921"
              className="group flex items-center gap-2.5 bg-[#B8925A] text-[#1A0F08] px-7 py-3.5 text-[10px] font-bold tracking-[0.22em] uppercase hover:bg-[#C9A46A] transition-all duration-300">
              <Ph/> Call (510) 598-4921 <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </a>
            <a href="/contact"
              className="flex items-center gap-2 border border-[#B8925A]/40 text-[#C9A46A] px-7 py-3.5 text-[10px] font-bold tracking-[0.22em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/8 transition-all duration-300">
              Free Consultation
            </a>
          </div>

          <div className={`flex flex-wrap gap-5 transition-all duration-700 ${phase>=4?"opacity-100":"opacity-0"}`}
            style={{transitionDelay:"1000ms"}}>
            {[{n:"15+",l:"Yrs Exp"},{n:"Free",l:"Consult"},{n:"5★",l:"Rating"},{n:"CA",l:"Telehealth"}].map(t=>(
              <div key={t.l} className="flex items-baseline gap-1.5">
                <p className="text-xl text-[#B8925A]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{t.n}</p>
                <p className="text-[8px] tracking-[0.16em] uppercase text-[#7A6556]">{t.l}</p>
              </div>
            ))}
          </div>

          <div className={`absolute bottom-8 left-8 transition-all duration-700 ${phase>=4?"opacity-100":"opacity-0"}`}
            style={{transitionDelay:"1100ms"}}>
            <p className="text-[8px] tracking-[0.22em] uppercase text-[#B8925A]/40">Dr. Japsharan Gill, MD · Dr. Shabeg Gondara, MD</p>
          </div>
        </div>

        {/* RIGHT photo panel */}
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{
              clipPath:phase>=2?"inset(0 0% 0 0)":"inset(0 100% 0 0)",
              transition:"clip-path 0.9s cubic-bezier(0.77,0,0.18,1)",
            }}>
            <div style={{position:"absolute",inset:0,transform:`translateY(${scrollY*0.22}px)`,willChange:"transform"}}>
              <img src={IMAGES.BOTH_OUTDOOR} alt="Dr. Japsharan Gill & Dr. Shabeg Gondara"
                className="w-full h-full object-cover" style={{objectPosition:"center 20%"}}/>
            </div>
            <div className="absolute inset-0 pointer-events-none"
              style={{background:"linear-gradient(to right,rgba(26,15,8,0.35) 0%,transparent 30%)"}}/>
            <div className="absolute inset-0 pointer-events-none"
              style={{background:"linear-gradient(to top,rgba(26,15,8,0.55) 0%,transparent 40%)"}}/>
          </div>

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            style={{opacity:phase>=3?0.6:0,transition:"opacity 1s ease"}}/>

          <div className={`absolute bottom-10 right-6 z-30 transition-all duration-700 ${phase>=4?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
            style={{transitionDelay:"1200ms",animation:phase>=4?"floatBadge 5s ease-in-out infinite":undefined}}>
            <div className="border-[3px] border-[#FDFAF6]/90 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
              style={{width:190,height:230}}>
              <img src={IMAGES.BOTH_ARMS_CROSSED} alt="Both doctors"
                className="w-full h-full object-cover object-top"/>
              <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(26,15,8,0.85) 0%,transparent 55%)"}}/>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/>
                  <span className="text-[8px] tracking-[0.18em] uppercase text-[#6B7C5E] font-semibold">Available Today</span>
                </div>
                <p className="text-[#F0E8DA] text-[11px]" style={{fontFamily:"'Cormorant Garamond',serif"}}>Dr. Japsharan Gill</p>
                <p className="text-[#F0E8DA] text-[11px]" style={{fontFamily:"'Cormorant Garamond',serif"}}>&amp; Dr. Shabeg Gondara</p>
              </div>
            </div>
          </div>

          <div className={`absolute top-10 right-6 z-30 transition-all duration-700 ${phase>=4?"opacity-100 translate-x-0":"opacity-0 translate-x-6"}`}
            style={{transitionDelay:"1350ms",animation:phase>=4?"floatBadge 4.5s ease-in-out 1s infinite":undefined}}>
            <div className="bg-[#FDFAF6]/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(26,15,8,0.3)] px-5 py-3.5 border-l-2 border-[#B8925A]">
              <p className="text-[8px] tracking-[0.22em] uppercase text-[#B8925A] font-bold mb-0.5">Next-Day Available</p>
              <p className="text-[#2C1A0E] text-sm" style={{fontFamily:"'Cormorant Garamond',serif"}}>Book Your Appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-30 lg:flex hidden flex-col items-center gap-2 transition-all duration-700 ${phase>=4?"opacity-100":"opacity-0"}`}
        style={{transitionDelay:"1600ms"}}>
        <span className="text-[7px] tracking-[0.32em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-9 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#B8925A]/50 to-transparent"
            style={{animation:"scrollLine 2s ease-in-out infinite"}}/>
        </div>
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
    { title:"Medical Weight Loss",     sub:"GLP-1 / Semaglutide Programs",      img:IMAGES.DR_GILL_HERO_2,   tag:"Now Available", href:"/weight-loss",  desc:"Physician-supervised weight loss with FDA-approved GLP-1 medications, monitored by Dr. Gill or Dr. Gondara personally.", accent:"#B8925A" },
    { title:"IV Hydration Therapy",    sub:"Restore · Revive · Rehydrate",      img:IMAGES.CLINIC_TABLE,     tag:"Unique",        href:"/iv-hydration", desc:"Premium IV nutrient therapy in a spa-like setting — tailored formulas for energy, immunity, and wellness.", accent:"#A8C59A" },
    { title:"TMS Therapy",             sub:"Non-Invasive · No Side Effects",    img:IMAGES.CLINIC_CHAIRS,    tag:"Coming Soon",   href:"/tms",          desc:"FDA-cleared transcranial magnetic stimulation for treatment-resistant depression. Launching soon.",          accent:"#C9A46A" },
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

/* ══ SPOTLIGHT — Service Showcase (Dark Editorial) ══ */
function SpotlightSection() {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState(0);
  const [prog, setP] = useState(0);
  const INTERVAL = 5200;

  const SVCS = [
    { n:"01", title:"Psychiatric Care",    tag:"Mental Health",     sub:"Anxiety · Depression · ADHD · PTSD · Bipolar · OCD",           stat:"Free Consult",    href:"/psychiatric",  img: IMAGES.DR_GONDARA_WORKING, imgPos:"center 15%", color:"#C9A46A" },
    { n:"02", title:"Medical Weight Loss", tag:"GLP-1 Therapy",     sub:"Physician-Supervised · Semaglutide & Tirzepatide",              stat:"Now Available",   href:"/weight-loss",  img: IMAGES.BOTH_OUTDOOR,       imgPos:"center 10%", color:"#B8925A" },
    { n:"03", title:"IV Hydration",        tag:"Wellness Infusion", sub:"12 Custom Drip Formulas · Energy · Immunity · Glow · Recovery", stat:"Walk-In Welcome", href:"/iv-hydration", img: "/assets/iv-img.jpg",      imgPos:"center 30%", color:"#A8C59A" },
    { n:"04", title:"TMS Therapy",         tag:"Brain Stimulation", sub:"FDA-Cleared · Non-Invasive · No Medication · No Side Effects",  stat:"Join Waitlist",   href:"/tms",          img: "/assets/tms-img.jpg",     imgPos:"center 40%", color:"#C9A46A" },
    { n:"05", title:"Telehealth",          tag:"Virtual Care",      sub:"Secure HIPAA Video · All Psychiatric Services · All of CA",    stat:"Available Today", href:"/telehealth",   img: IMAGES.BOTH_ARMS_CROSSED,  imgPos:"center top",  color:"#B8925A" },
  ];

  useEffect(() => {
    setP(0);
    const tick = 40, steps = INTERVAL / tick;
    let cur = 0;
    const id = setInterval(() => {
      cur++;
      setP((cur / steps) * 100);
      if (cur >= steps) { cur = 0; setActive(a => (a + 1) % SVCS.length); }
    }, tick);
    return () => clearInterval(id);
  }, [active]);

  const svc = SVCS[active];

  return (
    <section ref={ref} className="relative flex flex-col lg:flex-row overflow-hidden" style={{minHeight:560}}>

      {/* ─── LEFT 60% — DARK photo panel (continues from ServicesSection above) ─── */}
      <div className="relative lg:w-[60%] overflow-hidden" style={{minHeight:460}}>
        {SVCS.map((s, i) => (
          <div key={s.n} className="absolute inset-0 transition-opacity duration-700"
            style={{opacity: active === i ? 1 : 0}}>
            <img src={s.img} alt={s.title}
              className="w-full h-full object-cover transition-transform duration-[7000ms]"
              style={{objectPosition: s.imgPos, transform: active === i ? "scale(1.05)" : "scale(1)"}}/>
            <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(26,15,8,0.96) 0%,rgba(26,15,8,0.2) 55%,rgba(26,15,8,0.05) 100%)"}}/>
          </div>
        ))}

        {/* Corner marks */}
        <span className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#B8925A] z-10"/>
        <span className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#B8925A]/30 z-10"/>

        {/* Active service number watermark */}
        <div key={"wm"+active} className="absolute -right-2 top-2 pointer-events-none select-none z-[1]"
          style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:180,lineHeight:1,
            color:"rgba(184,146,90,0.05)",animation:"fadeSlideIn 0.5s ease both"}}>
          {svc.n}
        </div>

        {/* Bottom overlay — title + cta */}
        <div key={"info"+active} className="absolute bottom-0 left-0 right-0 p-8 z-10"
          style={{animation:"fadeSlideIn 0.4s ease both"}}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:svc.color}}/>
            <span className="text-[8px] tracking-[0.28em] uppercase font-bold" style={{color:svc.color}}>{svc.stat}</span>
            <span className="w-px h-3 bg-[#B8925A]/30 mx-1"/>
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#7A6556]">{svc.tag}</span>
          </div>
          <h2 className="text-[#F0E8DA] leading-[1.0] mb-2"
            style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:clamp(36,5,52)}}>
            {svc.title}
          </h2>
          <p className="text-[#A89880] text-xs font-light mb-5 max-w-xs leading-relaxed">{svc.sub}</p>
          <a href={svc.href}
            className="group inline-flex items-center gap-3 px-7 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:brightness-110"
            style={{background:svc.color,color:"#1A0F08"}}>
            Explore <span className="group-hover:translate-x-1.5 transition-transform">→</span>
          </a>
        </div>

        {/* Progress bar edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#120A05] z-20">
          <div style={{width:`${prog}%`,height:"100%",background:`linear-gradient(to right,${svc.color},#C9A46A)`,transition:"none"}}/>
        </div>
      </div>

      {/* ─── RIGHT 40% — LIGHT ivory panel (transitions to DrGillSection) ─── */}
      <div className="lg:w-[40%] flex flex-col px-8 py-10 md:px-10 md:py-12 relative"
        style={{background:"linear-gradient(160deg,#F5EEE4 0%,#EDE5D6 100%)"}}>

        {/* Gold vertical divider line visible on desktop */}
        <div className="hidden lg:block absolute left-0 top-8 bottom-8 w-px"
          style={{background:"linear-gradient(to bottom,transparent,#B8925A,transparent)"}}/>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-px bg-[#B8925A]"/>
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#B8925A] font-semibold">Five Services</span>
        </div>

        <h3 className="text-4xl md:text-[42px] text-[#2C1A0E] mb-8 leading-tight"
          style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
          Everything<br/>in <em className="italic text-[#B8925A]">One Clinic.</em>
        </h3>

        {/* Numbered list */}
        <div className="space-y-px flex-1">
          {SVCS.map((s, i) => (
            <button key={s.n}
              className="w-full text-left relative overflow-hidden transition-all duration-300 group"
              style={{
                borderLeft: active===i ? `3px solid ${s.color}` : "3px solid transparent",
                background: active===i ? "rgba(184,146,90,0.07)" : "rgba(255,255,255,0.4)",
              }}
              onClick={() => setActive(i)}>
              {active===i && <div className="absolute inset-0 pointer-events-none" style={{background:`linear-gradient(to right,${s.color}06,transparent)`}}/>}
              <div className="flex items-center gap-4 px-4 py-3.5">
                <span className="text-2xl w-8 flex-shrink-0 font-light transition-colors duration-300"
                  style={{fontFamily:"'Cormorant Garamond',serif",color:active===i?s.color:"#C9B99A"}}>{s.n}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate transition-colors duration-300"
                    style={{color:active===i?"#2C1A0E":"#7A6556"}}>{s.title}</p>
                  {active===i && <p className="text-[9px] tracking-[0.14em] uppercase mt-0.5" style={{color:s.color,animation:"fadeSlideIn 0.3s ease both"}}>{s.tag}</p>}
                </div>
                {/* Mini progress only on active */}
                {active===i && (
                  <div className="w-10 h-1 bg-[#E8D5BE] overflow-hidden flex-shrink-0 rounded-full">
                    <div style={{width:`${prog}%`,height:"100%",background:s.color,transition:"none",borderRadius:"9999px"}}/>
                  </div>
                )}
                <span className="text-xs flex-shrink-0 transition-all duration-300"
                  style={{color:active===i?s.color:"#C9B99A",opacity:active===i?1:0.5}}>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-7 pt-5 border-t border-[#E8D5BE]">
          <a href="/contact"
            className="group flex items-center justify-center gap-3 w-full bg-[#2C1A0E] text-[#F0E8DA] py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400 mb-2">
            <Ph/> Free Consultation <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
          <p className="text-[8px] text-center text-[#7A6556]/50 tracking-wider mt-2">Next-day available · Most insurance accepted</p>
        </div>
      </div>
    </section>
  );
}

function clamp(a,b,c){return a;}



function DrGillSection() {
  const [ref,vis]=useReveal();
  const [quoteVis,setQuoteVis]=useReveal();
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — photo with floating badges */}
          <div ref={ref} className={`relative transition-all duration-1000 ${vis?"opacity-100 translate-x-0":"opacity-0 -translate-x-12"}`}>
            <div className="absolute top-10 left-10 right-0 bottom-0 bg-[#F0E8DA] -z-10"/>
            <div className="relative">
              <span className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#B8925A] z-10"/>
              <span className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#B8925A] z-10"/>
              <div className="overflow-hidden" style={{height:"500px",maxWidth:"380px"}}>
                <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.04]"/>
              </div>

              {/* Floating credential pills — left side */}
              <div className="absolute -left-6 top-16 flex flex-col gap-2.5" style={{animation:"fadeUp 0.8s ease 0.6s both"}}>
                {["Board-Eligible","Psychiatry & Wellness","GLP-1 Certified"].map((t,i)=>(
                  <div key={t} className="bg-[#2C1A0E] text-[#C9A46A] text-[8px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 border-l-2 border-[#B8925A] shadow-lg whitespace-nowrap"
                    style={{animationDelay:`${i*0.1}s`}}>{t}</div>
                ))}
              </div>
            </div>

            {/* Floating both-doctors card */}
            <div className="absolute -bottom-10 right-0 md:-right-6 w-[180px] md:w-[210px] overflow-hidden border-[3px] border-[#FDFAF6] shadow-[0_20px_60px_rgba(44,26,14,0.18)] z-10"
              style={{height:"250px",animation:"floatBadge 5s ease-in-out infinite"}}>
              <img src={IMAGES.BOTH_OUTDOOR} alt="Dr. Japsharan Gill and Dr. Shabeg Gondara"
                className="w-full h-full object-cover object-top"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#E8D5BE]/80">Dr. Japsharan Gill & Dr. Shabeg Gondara</p>
              </div>
            </div>

            {/* 15+ badge */}
            <div className="absolute -bottom-4 -left-4 md:-left-6 bg-[#B8925A] text-[#FDFAF6] px-6 py-5 shadow-xl z-20">
              <p className="text-4xl font-light mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                {vis?<Counter to={15} suffix="+"/>:"0+"}
              </p>
              <p className="text-[9px] tracking-[0.22em] uppercase opacity-80">Years of Practice</p>
            </div>
          </div>

          {/* RIGHT — bio + animated quote */}
          <div className={`transition-all duration-1000 delay-200 ${vis?"opacity-100 translate-x-0":"opacity-0 translate-x-12"}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#B8925A]"/>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Meet the Team</span>
            </div>
            <h2 className="text-[#2C1A0E] text-5xl md:text-6xl leading-[1.08] mb-2" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
              Dr. Japsharan<br/><em className="italic text-[#B8925A]">Gill, MD</em>
            </h2>
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#7A6556] mb-1 font-medium">Founder & CEO</p>
            <p className="text-[11px] tracking-[0.24em] uppercase text-[#7A6556]/60 mb-8 font-medium">& Dr. Shabeg Gondara · President</p>

            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-4">
              I built Tri-Valley Clinic for people who wanted more than a quick appointment and a prescription — for people who wanted a physician who actually listens.
            </p>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-6">
              I specialize in psychiatry, medical weight management, and advanced wellness. These areas are deeply connected — your mental health, your weight, your energy, and your sense of self. Most practices treat them separately. We don't.
            </p>

            {/* Animated pull quote */}
            <div ref={quoteVis} className={`my-7 border-l-2 border-[#B8925A] pl-6 transition-all duration-700 ${quoteVis?"opacity-100 translate-x-0":"opacity-0 -translate-x-4"}`}>
              <p style={{fontFamily:"'Cormorant Garamond',serif"}} className="text-2xl text-[#2C1A0E] font-light italic leading-relaxed">
                "Most practices treat mental health, weight, and wellness separately. We don't."
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8925A] mt-3">— Dr. Japsharan Gill, Founder & CEO</p>
            </div>

            {/* Quick credential pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Psychiatry","GLP-1 Programs","IV Hydration","TMS Therapy","Telehealth CA"].map(t=>(
                <span key={t} className="text-[9px] tracking-[0.16em] uppercase border border-[#E8D5BE] bg-[#F5EEE4] text-[#7A6556] px-3 py-1.5 hover:border-[#B8925A]/50 hover:text-[#B8925A] transition-all duration-200">{t}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="group inline-flex items-center gap-3 border border-[#B8925A] text-[#B8925A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] hover:text-[#FDFAF6] transition-all duration-300">
                <Ph/> Free Consultation <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="/about" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#7A6556] hover:text-[#B8925A] transition-colors duration-300 px-4 py-4">
                Meet the Team ↗
              </a>
            </div>
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
    
    { src:IMAGES.BOTH_ARMS_CROSSED, label:"Dr. Gill & Dr. Gondara"  },
     { src:IMAGES.CLINIC_INDOOR,    label:"Front Office"            },
    { src:IMAGES.CLINIC_MAGAZINES, label:"Waiting Lounge"          },
    /* 🔄 Photo 15 — both doctors inside clinic */
    // { src:IMAGES.BOTH_CLINIC,      label:"Our Physicians",  pos:"center 15%"  },
    /* 🔄 Photo 11 — both doctors outdoor */
    { src:IMAGES.BOTH_OUTDOOR,     label:"Dr. Gill & Dr. Gondara", pos:"center 12%" },
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
            <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{objectPosition: p.pos || "center center"}}/>
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

function DoctorSpotlight() {
  const [ref, vis] = useReveal();
  const [who, setWho] = useState(0);
  const DOCS = [
    {
      name:"Dr. Japsharan Gill, MD", role:"Founder & CEO", tag:"Psychiatry & Wellness",
      img:IMAGES.DR_GILL_HERO, imgPos:"center 8%",
      quote:"I built Tri-Valley Clinic for people who wanted more than a quick appointment and a prescription — for people who wanted a physician who actually listens.",
      pills:["Psychiatry","GLP-1 Weight Loss","IV Hydration","TMS Therapy","Telehealth CA"],
      color:"#C9A46A", href:"/about#dr-gill",
    },
    {
      name:"Dr. Shabeg Gondara, MD", role:"President", tag:"Adult Psychiatry",
      img:IMAGES.DR_GONDARA_CARD, imgPos:"center 5%",
      quote:"My approach emphasizes clarity, collaboration, and long-term stability — helping patients achieve functional improvement and genuine emotional well-being.",
      pills:["Psychiatric Evaluations","Medication Management","Evidence-Based Care","Telehealth Statewide"],
      color:"#B8925A", href:"/about#dr-gondara",
    },
  ];
  const doc = DOCS[who];
  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{background:"linear-gradient(135deg,#FDFAF6 0%,#F5EEE4 60%,#EDE5D6 100%)"}}>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent"/>
      <div className={`mx-auto max-w-7xl px-5 md:px-10 xl:px-16 py-16 transition-all duration-700 ${vis?"opacity-100":"opacity-0"}`}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-[#B8925A]"/>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A] font-semibold">Your Physicians</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
              Two Doctors.<br/><em className="italic text-[#B8925A]">One Mission.</em>
            </h2>
          </div>
          <div className="flex border border-[#E8D5BE] overflow-hidden flex-shrink-0">
            {DOCS.map((d,i)=>(
              <button key={i} onClick={()=>setWho(i)}
                className="px-6 py-3 text-[9px] tracking-[0.18em] uppercase font-semibold transition-all duration-300"
                style={{background:who===i?d.color:"transparent",color:who===i?"#1A0F08":d.color}}>
                {i===0?"Dr. Japsharan Gill":"Dr. Shabeg Gondara"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div key={who} className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 items-center"
          style={{animation:"fadeSlideIn 0.45s ease both"}}>

          <div className="relative overflow-hidden" style={{height:500}}>
            <img src={doc.img} alt={doc.name} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              style={{objectPosition:doc.imgPos}}/>
            <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(44,26,14,0.75) 0%,transparent 55%)"}}/>
            <span className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#B8925A]"/>
            <span className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#B8925A]"/>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block text-[8px] tracking-[0.2em] uppercase px-2 py-1 mb-2 font-bold"
                style={{color:doc.color,border:`1px solid ${doc.color}40`,background:"rgba(26,15,8,0.7)"}}>{doc.tag}</span>
              <p className="text-[#F0E8DA]" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18}}>{doc.name}</p>
              <p className="text-[9px] tracking-[0.2em] uppercase mt-0.5" style={{color:doc.color}}>{doc.role}</p>
            </div>
          </div>

          <div>
            <div className="border-l-2 border-[#B8925A] pl-7 mb-8">
              <div className="text-5xl text-[#B8925A]/20 leading-none -mb-2" style={{fontFamily:"'Cormorant Garamond',serif"}}>"</div>
              <p className="text-2xl md:text-3xl text-[#2C1A0E] font-light leading-relaxed"
                style={{fontFamily:"'Cormorant Garamond',serif"}}>{doc.quote}"</p>
              <p className="text-[9px] tracking-[0.2em] uppercase mt-4" style={{color:doc.color}}>— {doc.name}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {doc.pills.map(p=>(
                <span key={p} className="text-[9px] tracking-[0.14em] uppercase border border-[#E8D5BE] bg-[#FDFAF6]/60 px-3 py-1.5 text-[#7A6556] hover:border-[#B8925A]/50 hover:text-[#B8925A] transition-all duration-200">{p}</span>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href={doc.href} className="group inline-flex items-center gap-3 px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:brightness-110"
                style={{background:doc.color,color:"#1A0F08"}}>
                Full Biography <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A]/5 hover:border-[#B8925A] transition-all duration-300">
                <Ph/> Book Free Consult
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A]/25 to-transparent"/>
    </section>
  );
}



function ConsultBand() {
  const [ref,vis]=useReveal();
  const [slot,setSlot]=useState(3);
  // Simulate "spots" countdown for urgency
  useEffect(()=>{
    const id=setInterval(()=>setSlot(s=>s>1?s-1:3),8000);
    return()=>clearInterval(id);
  },[]);
  return(
    <section className="relative py-20 px-5 md:px-10 overflow-hidden" style={{background:"linear-gradient(110deg,#2C1A0E 0%,#3D2B1F 55%,#B8925A 150%)"}}>
      <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B8925A'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`}}/>

      <div ref={ref} className={`mx-auto max-w-7xl transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>

        {/* Top availability strip */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[#B8925A]/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6B7C5E] animate-pulse"/>
            <span className="text-[9px] tracking-[0.24em] uppercase text-[#6B7C5E] font-semibold">Available Today</span>
          </div>
          <span className="w-px h-3 bg-[#B8925A]/30"/>
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#C9A46A]">
              {slot} consultation slot{slot!==1?"s":""} remaining today
            </span>
          </div>
          <span className="w-px h-3 bg-[#B8925A]/30 hidden sm:block"/>
          <span className="hidden sm:block text-[9px] tracking-[0.2em] uppercase text-[#7A6556]">Mon–Fri · 9:30 AM – 5:30 PM</span>
          <span className="hidden md:block w-px h-3 bg-[#B8925A]/30"/>
          <span className="hidden md:block text-[9px] tracking-[0.2em] uppercase text-[#7A6556]">Telehealth Available Statewide CA</span>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#C9A46A]/60 mb-4">No Commitment · Completely Free</p>
            <h2 className="text-[#F0E8DA] text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-4" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
              Your healing journey begins<br/>with a single <em className="italic text-[#C9A46A]">phone call.</em>
            </h2>
            <p className="text-[#A89880] text-base font-light mb-0">
              Dr. Japsharan Gill and Dr. Shabeg Gondara offer a free 15-minute consultation to every new patient — a genuine conversation, not a sales pitch.
            </p>
          </div>

          {/* CTA block */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
            <a href="tel:5105984921" className="group flex items-center justify-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 whitespace-nowrap">
              <Ph/> Call (510) 598-4921 →
            </a>
            <a href="/contact" className="flex items-center justify-center border border-[#B8925A]/40 text-[#C9A46A] px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">
              Send a Message
            </a>
            <p className="text-[9px] text-[#7A6556] text-center tracking-wide">Most insurance accepted · Cherry financing available</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const [ref,vis]=useReveal();
  const items=[
    { icon:"💬", num:"Free",  numSub:"Consultation",  title:"15-Minute Free Call",   text:"A genuine consultation before you commit — no pressure, no obligation. We want to ensure we're the right fit for you.",    cta:"Book Free Call",href:"/contact" },
    { icon:"📅", num:"Next",  numSub:"Day Available",  title:"Next-Day Scheduling",   text:"Once insurance is verified, next-day availability for in-person and telehealth visits. No waitlists. No months of delay.",  cta:"Check Availability",href:"tel:5105984921" },
    { icon:"💳", num:"Most",  numSub:"Plans Accepted", title:"Insurance Accepted",    text:"We accept most major insurance plans. Cherry financing also available for out-of-pocket needs — apply in 60 seconds.",      cta:"Verify Insurance",href:"/insurance" },
    { icon:"📍", num:"1",     numSub:"Dedicated Clinic",title:"One Beautiful Location",text:"680 Mowry Ave, Fremont — one dedicated space where every resource is focused entirely on your care and comfort.",           cta:"Get Directions",href:"https://maps.google.com/?q=680+Mowry+Ave+Fremont+CA" },
    { icon:"🖥️", num:"58+",  numSub:"CA Cities",       title:"Statewide Telehealth",  text:"Secure, HIPAA-compliant video visits available to all California residents. Same expert care from wherever you are.",       cta:"Book Telehealth",href:"/telehealth" },
    { icon:"👥", num:"2",     numSub:"Physicians",      title:"Two Doctors, One Mission",text:"Dr. Japsharan Gill and Dr. Shabeg Gondara — both board-eligible, both accepting new patients, both personally invested.", cta:"Meet the Team",href:"/about" },
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/>
          </div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] mb-4 transition-all duration-700 delay-100 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
            style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
            The Difference Is <em className="italic text-[#B8925A]">You</em>
          </h2>
          <p className={`text-[#7A6556] text-base font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${vis?"opacity-100":"opacity-0"}`}>
            We built Tri-Valley Clinic around one idea — care that is genuinely personal.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it,i)=>(
            <a href={it.href} key={it.title}
              className={`group relative bg-[#FDFAF6] border border-[#E8D5BE] p-8 flex flex-col transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(184,146,90,0.15)] hover:border-[#B8925A]/60 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
              style={{transitionDelay:`${i*100}ms`,transitionDuration:"700ms"}}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B8925A] to-[#C9A46A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>

              {/* Icon + number row */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{it.icon}</span>
                <div className="text-right">
                  <p className="text-3xl text-[#B8925A]/20 leading-none group-hover:text-[#B8925A]/40 transition-colors duration-500"
                    style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{it.num}</p>
                  <p className="text-[8px] tracking-[0.14em] uppercase text-[#B8925A]/30 group-hover:text-[#B8925A]/50 transition-colors duration-500 leading-tight">{it.numSub}</p>
                </div>
              </div>

              <h3 className="text-xl text-[#2C1A0E] mb-3 group-hover:text-[#B8925A] transition-colors duration-300"
                style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{it.title}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light flex-1 mb-6">{it.text}</p>

              {/* CTA arrow */}
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B8925A]/50 group-hover:text-[#B8925A] transition-colors duration-300">
                {it.cta} <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${vis?"opacity-100":"opacity-0"}`}>
          <a href="/contact" className="group inline-flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400">
            <Ph/> Book Your Free Consultation <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceMiniSpotlight() {
  const [ref, vis] = useReveal();
  const [hover, setHover] = useState(null);
  const CARDS = [
    {
      title:"IV Hydration Therapy",
      headline:"12 Custom Drip|Formulas.",
      sub:"Energy · Immunity · Skin Brightening · Recovery · Hangover · Migraine",
      badge:"Unique to Tri-Valley",
      img:"/assets/iv-img.jpg",
      imgPos:"center 30%",
      color:"#A8C59A",
      href:"/iv-hydration",
      detail:"The only psychiatric clinic in Fremont offering premium IV nutrient therapy — supervised by Dr. Japsharan Gill or Dr. Shabeg Gondara.",
    },
    {
      title:"Medical Weight Loss",
      headline:"GLP-1 Programs.|Physician-Led.",
      sub:"Semaglutide · Tirzepatide · Monthly Check-ins · No Contracts",
      badge:"Now Available",
      img:IMAGES.BOTH_OUTDOOR,
      imgPos:"center 12%",
      color:"#C9A46A",
      href:"/weight-loss",
      detail:"Not a med spa. Not an online service. A real physician — Dr. Japsharan Gill or Dr. Shabeg Gondara — supervising your entire weight loss program.",
    },
    {
      title:"TMS Therapy",
      headline:"No Medication.|No Side Effects.",
      sub:"FDA-Cleared · Non-Invasive · Treatment-Resistant Depression",
      badge:"Launching Soon",
      img:"/assets/tms-img.jpg",
      imgPos:"center 40%",
      color:"#B8925A",
      href:"/tms",
      detail:"Transcranial Magnetic Stimulation — the most advanced non-medication treatment for depression. Join the waitlist today.",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{background:"linear-gradient(160deg,#2C1A0E 0%,#1A0F08 100%)"}}>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent"/>

      <div className={`mx-auto max-w-7xl px-5 md:px-10 xl:px-16 py-16 transition-all duration-700 ${vis?"opacity-100":"opacity-0"}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#B8925A]"/><span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A] font-semibold">Beyond Psychiatry</span>
            </div>
            <h2 className="text-5xl md:text-6xl text-[#F0E8DA]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
              Services You Won't Find <em className="italic text-[#C9A46A]">Everywhere</em>
            </h2>
          </div>
          <a href="/iv-hydration" className="hidden md:inline-flex items-center gap-2 border border-[#B8925A]/30 text-[#B8925A] px-6 py-3 text-[10px] tracking-[0.2em] uppercase hover:border-[#B8925A] transition-colors whitespace-nowrap">
            View All Services →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CARDS.map((card,i)=>(
            <a href={card.href} key={card.title}
              className={`group relative overflow-hidden flex flex-col transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-12"}`}
              style={{height:440,transitionDelay:`${i*120}ms`,transitionDuration:"700ms"}}
              onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>

              {/* Photo */}
              <img src={card.img} alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                style={{objectPosition:card.imgPos}}/>

              {/* Gradient */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{background:"linear-gradient(to top,rgba(26,15,8,0.97) 0%,rgba(26,15,8,0.45) 55%,rgba(26,15,8,0.15) 100%)"}}/>

              {/* Top scan line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"
                style={{background:card.color}}/>

              {/* Badge top-left */}
              <div className="relative z-10 p-6">
                <span className="inline-flex items-center gap-1.5 text-[8px] tracking-[0.22em] uppercase font-bold px-2.5 py-1"
                  style={{color:card.color,border:`1px solid ${card.color}45`,background:"rgba(26,15,8,0.6)"}}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:card.color}}/>
                  {card.badge}
                </span>
              </div>

              {/* Content bottom */}
              <div className="relative z-10 p-6 mt-auto">
                {/* Headline — newline-split for dramatic typography */}
                <h3 className="text-[#F0E8DA] mb-2 leading-[1.05]"
                  style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:38}}>
                  {card.headline.split("|").map((line,j)=>(
                    <span key={j}>{j>0&&<br/>}{j===1?<em className="italic" style={{color:card.color}}>{line}</em>:line}</span>
                  ))}
                </h3>

                {/* Detail text — slides up on hover */}
                <div className={`overflow-hidden transition-all duration-400 ${hover===i?"max-h-20 mb-3 opacity-100":"max-h-0 mb-0 opacity-0"}`}>
                  <p className="text-[#A89880] text-xs font-light leading-relaxed">{card.detail}</p>
                </div>

                <p className="text-[#7A6556] text-[10px] font-light mb-4 leading-relaxed">{card.sub}</p>

                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 group-hover:gap-3"
                  style={{color:card.color}}>
                  Learn More <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Right-side service number */}
              <div className="absolute top-4 right-5 text-[80px] leading-none pointer-events-none select-none"
                style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
                  color:"rgba(255,255,255,0.04)"}}>
                {String(i+1).padStart(2,"0")}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent"/>
    </section>
  );
}



function TestimonialsSection() {
  const [ref,vis]=useReveal();
  const [idx,setIdx]=useState(0);
  const revs=[
    { name:"Sarah M.", role:"Fremont",    stars:5, text:"Dr. Japsharan Gill is genuinely one of the most caring physicians I have ever met. She takes her time, listens completely, and the office is absolutely beautiful. I've never felt so comfortable at a medical appointment." },
    { name:"James T.", role:"Union City", stars:5, text:"I've been struggling with ADHD for years and couldn't find a psychiatrist who truly understood. Dr. Japsharan Gill was different from my very first visit — she created a plan that actually works for my life." },
    { name:"Priya K.", role:"Newark",     stars:5, text:"The GLP-1 weight loss program has been life-changing. Dr. Japsharan Gill supervises every step personally. The clinic feels like a luxury spa — nothing like your typical doctor's office." },
    { name:"Marcus D.", role:"Hayward",   stars:5, text:"After trying multiple psychiatrists with no real improvement, Dr. Shabeg Gondara took a completely different approach. Within 6 weeks I felt like myself again. This clinic is exceptional." },
    { name:"Anita R.", role:"Fremont",    stars:5, text:"The IV hydration therapy here is a completely different experience. The space is calm, the staff are professional, and I feel the difference for days. I come back every two weeks now." },
  ];
  const prev=()=>setIdx(i=>(i-1+revs.length)%revs.length);
  const next=()=>setIdx(i=>(i+1)%revs.length);

  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-14 items-start transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>

          {/* LEFT — rating summary */}
          <div>
            <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Patient Reviews</span></div>
            <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-8" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
              Real Patients,<br/><em className="italic text-[#B8925A]">Real Results</em>
            </h2>

            {/* Big rating display */}
            <div className="border border-[#E8D5BE] bg-[#F5EEE4] p-8 mb-6">
              <div className="flex items-end gap-3 mb-3">
                <span className="text-7xl text-[#B8925A] leading-none" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>5.0</span>
                <div className="pb-2">
                  <div className="flex gap-1 mb-1">{Array(5).fill(0).map((_,i)=><St key={i}/>)}</div>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-[#7A6556]">Google Rating</p>
                </div>
              </div>
              {/* Rating bars */}
              {[[5,100],[4,0],[3,0],[2,0],[1,0]].map(([stars,pct])=>(
                <div key={stars} className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] text-[#7A6556] w-4 text-right">{stars}</span>
                  <St/>
                  <div className="flex-1 h-1.5 bg-[#E8D5BE] overflow-hidden">
                    <div className="h-full bg-[#B8925A] transition-all duration-1000" style={{width:`${vis?pct:0}%`}}/>
                  </div>
                  <span className="text-[10px] text-[#7A6556] w-8">{pct}%</span>
                </div>
              ))}
              <p className="text-[9px] text-[#7A6556]/60 mt-3 text-center">Based on verified Google reviews</p>
            </div>

            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 border border-[#E8D5BE] bg-[#F5EEE4] px-6 py-3.5 text-[10px] tracking-widest uppercase text-[#7A6556] hover:border-[#B8925A]/40 hover:text-[#B8925A] transition-all duration-300 w-full">
              <span className="flex gap-0.5">{Array(5).fill(0).map((_,j)=><St key={j}/>)}</span>
              Read All Reviews →
            </a>
          </div>

          {/* RIGHT — testimonial carousel */}
          <div>
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#7A6556]">{idx+1} of {revs.length}</p>
              <div className="flex gap-2">
                <button onClick={prev} className="w-10 h-10 border border-[#E8D5BE] flex items-center justify-center text-[#7A6556] hover:border-[#B8925A] hover:text-[#B8925A] transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button onClick={next} className="w-10 h-10 border border-[#E8D5BE] flex items-center justify-center text-[#7A6556] hover:border-[#B8925A] hover:text-[#B8925A] transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>

            {/* Active review */}
            <div key={idx} className="border border-[#E8D5BE] bg-[#F5EEE4] p-8 md:p-10 mb-4" style={{animation:"fadeSlideIn 0.4s ease both"}}>
              <div className="text-[100px] text-[#B8925A]/10 leading-none -mt-4 -ml-2 mb-2 pointer-events-none select-none"
                style={{fontFamily:"'Cormorant Garamond',serif"}}>"</div>
              <div className="flex gap-0.5 mb-5">{Array(revs[idx].stars).fill(0).map((_,j)=><St key={j}/>)}</div>
              <p className="text-[#3D2B1F] text-[17px] leading-relaxed font-light mb-6 relative z-10" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                "{revs[idx].text}"
              </p>
              <div className="border-t border-[#E8D5BE] pt-5 flex items-center justify-between">
                <div>
                  <p className="text-[#2C1A0E] text-lg" style={{fontFamily:"'Cormorant Garamond',serif"}}>{revs[idx].name}</p>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-[#B8925A]/60 mt-0.5">Verified Patient · {revs[idx].role}</p>
                </div>
                <div className="flex gap-0.5">{Array(revs[idx].stars).fill(0).map((_,j)=><St key={j}/>)}</div>
              </div>
            </div>

            {/* Dot strip */}
            <div className="flex gap-2">
              {revs.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{width:idx===i?24:6,height:6,background:idx===i?"#B8925A":"#E8D5BE"}}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsuranceSection() {
  const [ref,vis]=useReveal();
  const plans=[
    {name:"Aetna",tier:"top"},{name:"Blue Shield",tier:"top"},{name:"United Healthcare",tier:"top"},
    {name:"Cigna",tier:"top"},{name:"Medicare",tier:"top"},{name:"Medi-Cal",tier:"top"},
    {name:"Anthem",tier:""},{name:"Kaiser",tier:""},{name:"Magellan",tier:""},
    {name:"Optum",tier:""},{name:"Beacon Health",tier:""},{name:"Tricare",tier:""},
  ];
  return(
    <section className="py-20 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-center transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>

          {/* LEFT — plans grid */}
          <div>
            <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Insurance Accepted</span></div>
            <h2 className="text-5xl md:text-6xl text-[#F0E8DA] mb-8" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
              We Accept<br/><em className="italic text-[#C9A46A]">Most Major Plans</em>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-5">
              {plans.map((p,i)=>(
                <div key={p.name}
                  className={`border flex items-center justify-center py-3.5 px-2 text-[9px] tracking-[0.14em] uppercase text-center font-semibold transition-all duration-300 hover:-translate-y-0.5 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}
                  style={{
                    transitionDelay:`${i*40}ms`,transitionDuration:"500ms",
                    borderColor:p.tier==="top"?"rgba(184,146,90,0.45)":"rgba(184,146,90,0.15)",
                    background:p.tier==="top"?"rgba(184,146,90,0.08)":"rgba(255,255,255,0.03)",
                    color:p.tier==="top"?"#C9A46A":"#7A6556",
                  }}>
                  {p.name}
                </div>
              ))}
            </div>
            <p className="text-[#7A6556] text-sm font-light">
              Don't see your plan? <a href="tel:5105984921" className="text-[#B8925A] hover:text-[#C9A46A] transition-colors underline underline-offset-2">Call us</a> — we verify coverage before your first visit at no charge.
            </p>
          </div>

          {/* RIGHT — verification CTA */}
          <div className="border border-[#B8925A]/25 p-8 bg-[#F5EEE4]/4">
            <div className="h-[2px] -mt-8 mb-6 bg-gradient-to-r from-[#B8925A] to-transparent"/>
            <div className="w-12 h-12 border border-[#B8925A]/40 flex items-center justify-center text-[#B8925A] mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-2xl text-[#F0E8DA] mb-2" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Free Insurance Verification</h3>
            <p className="text-[#A89880] text-sm font-light leading-relaxed mb-6">
              Not sure if you're covered? Call us before your first appointment. We'll verify your benefits at no charge — so you know exactly what to expect.
            </p>
            <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-7 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 mb-3">
              <Ph/> Call to Verify Coverage
            </a>
            <a href="/financing" className="flex items-center justify-center border border-[#B8925A]/30 text-[#B8925A] px-7 py-3 text-[10px] tracking-[0.18em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/8 transition-all duration-300">
              Cherry Financing Available →
            </a>
            <p className="text-[#7A6556]/50 text-[9px] mt-4 text-center tracking-wide">Mon–Fri · 9:30 AM – 5:30 PM</p>
          </div>
        </div>
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
          <a href="/contact" className="inline-flex items-center gap-3 bg-[#6B7C5E] text-[#F0EDE8] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#7D9170] transition-colors duration-300">
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
    <section className="relative overflow-hidden" style={{background:"linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)"}}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(184,146,90,0.18) 0%,transparent 70%)"}}/>

      {/* Main CTA block */}
      <div className="relative py-24 px-5 md:px-10 text-center">
        <div ref={ref} className="relative mx-auto max-w-3xl">

          {/* Both doctor avatars */}
          <div className={`mb-8 flex justify-center gap-4 transition-all duration-700 ${vis?"opacity-100 scale-100":"opacity-0 scale-90"}`}>
            {[
              {src:IMAGES.DR_GILL_CARD,   alt:"Dr. Japsharan Gill",   name:"Dr. Japsharan Gill",  role:"Founder & CEO"},
              {src:"/assets/dr-gondara-white.jpg",alt:"Dr. Shabeg Gondara",name:"Dr. Shabeg Gondara",role:"President"},
            ].map((d,i)=>(
              <div key={d.name} className="relative flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B8925A]/60 shadow-[0_8px_32px_rgba(184,146,90,0.2)]">
                    <img src={d.src} alt={d.alt} className="w-full h-full object-cover" style={{objectPosition:"center 15%"}}/>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]"/>
                </div>
                <div className="text-center">
                  <p className="text-[9px] tracking-[0.14em] uppercase text-[#2C1A0E] font-semibold">{d.name}</p>
                  <p className="text-[8px] text-[#B8925A] tracking-wider">{d.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`flex items-center justify-center gap-3 mb-7 transition-all duration-700 delay-100 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <span className="w-16 h-px bg-[#B8925A]/40"/><Dm/><span className="w-16 h-px bg-[#B8925A]/40"/>
          </div>
          <h2 className={`text-[#2C1A0E] text-5xl md:text-7xl leading-[1.02] mb-6 transition-all duration-700 delay-150 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
            style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
            Begin Your Journey<br/><em className="italic text-[#B8925A]">Today.</em>
          </h2>
          <p className={`text-[#7A6556] text-lg leading-relaxed mb-10 font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            Your first consultation is completely free. A 15-minute conversation with Dr. Japsharan Gill or Dr. Shabeg Gondara — no commitment, no pressure.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 transition-all duration-700 delay-300 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400">
              <Ph/> Call (510) 598-4921 <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
            <a href="/contact" className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">
              Send a Message
            </a>
          </div>
          <p className={`text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${vis?"opacity-100":"opacity-0"}`}>
            Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA · Telehealth Statewide CA
          </p>
        </div>
      </div>

      {/* Contact info strip at very bottom */}
      <div className="border-t border-[#E8D5BE] bg-[#F0E8DA]/60">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-[#E8D5BE]">
          {[
            {icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,label:"Phone",val:"(510) 598-4921",href:"tel:5105984921"},
            {icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,label:"Email",val:"contact@trivalleyclinic.com",href:"mailto:contact@trivalleyclinic.com"},
            {icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,label:"Location",val:"680 Mowry Ave, Fremont CA",href:"https://maps.google.com/?q=680+Mowry+Ave+Fremont+CA"},
            {icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,label:"Hours",val:"Mon–Fri · 9:30 AM – 5:30 PM",href:null},
          ].map(row=>(
            <div key={row.label} className="flex items-start gap-3 md:px-6">
              <div className="text-[#B8925A] mt-0.5 flex-shrink-0">{row.icon}</div>
              <div>
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#B8925A]/60 mb-0.5">{row.label}</p>
                {row.href
                  ? <a href={row.href} className="text-[12px] text-[#3D2B1F] hover:text-[#B8925A] transition-colors font-medium">{row.val}</a>
                  : <p className="text-[12px] text-[#3D2B1F] font-medium">{row.val}</p>
                }
              </div>
            </div>
          ))}
        </div>
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