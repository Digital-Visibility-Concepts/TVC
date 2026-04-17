import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";

const P={hero:"/src/assets/dr j gill 2.jpg",drGill:"/src/assets/Gill_Japsharan.jpg",drGillIn:"/src/assets/dr J gill-inside.jpg",interior:"/src/assets/inetrioir clinic.jpg",inside:"/src/assets/inside clinic1.jpg",table:"/src/assets/emptytabel.jpg"};

function useReveal(t=0.12){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});o.observe(el);return()=>o.disconnect();},[t]);return[ref,v];}
function Cursor(){const d=useRef(null),r=useRef(null),p=useRef({x:0,y:0}),f=useRef(null);useEffect(()=>{const mv=e=>{p.current={x:e.clientX,y:e.clientY};};const tk=()=>{if(d.current)d.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;if(r.current)r.current.style.transform=`translate(${p.current.x-16}px,${p.current.y-16}px)`;f.current=requestAnimationFrame(tk);};window.addEventListener("mousemove",mv);f.current=requestAnimationFrame(tk);return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(f.current);};},[]);return(<><div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}}/><div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}}/></>);}

export default function WeightLoss(){
  return(<main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none"}}><style>{CSS}</style><Cursor/><Hero/><Marquee/><WhatAreGLP1s/><HowProgramWorks/><CompareSection/><EligibilitySection/><FAQSection/><CTA/></main>);
}

function Hero(){
  const[on,sOn]=useState(false);useEffect(()=>{setTimeout(()=>sOn(true),80);},[]);
  return(
    <section className="relative min-h-[88vh] flex items-end overflow-hidden" style={{background:"linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}/>
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden">
        <img src={P.hero} alt="Dr. Gill" className="w-full h-full object-cover object-top opacity-35" style={{filter:"saturate(0.7)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,#2C1A0E 0%,transparent 55%)"}}/>
      </div>
      {[{t:"10%",l:"52%",s:400,o:0.12,d:"0s"},{t:"60%",l:"5%",s:260,o:0.08,d:"5s"}].map((o,i)=>(
        <div key={i} className="absolute rounded-full pointer-events-none" style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}}/>
      ))}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{writingMode:"vertical-rl",animation:"fadeUp 1s ease 0.8s both"}}>
        <span className="w-px h-16 bg-[#B8925A]/40"/><span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A]/50">GLP-1 · Semaglutide · Physician-Supervised</span><span className="w-px h-16 bg-[#B8925A]/40"/>
      </div>
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/8 px-4 py-2 mb-7 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"100ms"}}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] animate-pulse"/><span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Now Available · Physician-Supervised</span>
          </div>
          <h1 className={`text-[48px] md:text-[64px] xl:text-[76px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"200ms"}}>
            Real Weight Loss.<br/><em className="italic text-[#C9A46A]">Physician</em><br/>Supervised.
          </h1>
          <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"370ms"}}>
            <span className="w-10 h-px bg-[#B8925A]/60"/><span className="text-[10px] tracking-[0.22em] uppercase text-[#A89880] font-light">GLP-1 / Semaglutide · Medical Weight Loss Program</span>
          </div>
          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"440ms"}}>
            Dr. Gill now offers FDA-approved GLP-1 medication programs including Semaglutide and Tirzepatide — monitored personally by a physician, not a med spa. Safe, effective, and science-backed.
          </p>
          <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"540ms"}}>
            <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Free Consultation <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
            <a href="#how-it-works" className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">How It Works ↓</a>
          </div>
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"640ms"}}>
            {["FDA-Approved Medications","Physician-Monitored","Insurance May Cover","No Contracts"].map(t=>(
              <span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"380ms"}}>
          {[{val:"FDA",lab:"Approved Medications",sub:"Semaglutide & Tirzepatide"},{val:"MD",lab:"Supervised Program",sub:"Dr. Gill personally monitors"},{val:"Real",lab:"Clinical Results",sub:"Evidence-based approach"}].map((c,i)=>(
            <div key={c.lab} className="bg-[#FDFAF6]/8 border border-[#E8D5BE]/15 px-6 py-5 flex items-center gap-5 w-full max-w-xs" style={{animation:`fadeUp 0.8s ease ${0.5+i*0.12}s both`}}>
              <p className="text-3xl text-[#C9A46A] flex-shrink-0" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{c.val}</p>
              <div><p className="text-[#F0E8DA] text-sm font-medium">{c.lab}</p><p className="text-[#A89880] text-xs font-light mt-0.5">{c.sub}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{background:"linear-gradient(to top,#FDFAF6,transparent)"}}/>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{animation:"fadeUp 1s ease 1.2s both"}}>
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-12 overflow-hidden"><div className="w-full h-full bg-gradient-to-b from-[#B8925A]/70 to-transparent" style={{animation:"scrollLine 2s ease-in-out infinite"}}/></div>
      </div>
    </section>
  );
}

function Marquee(){
  const items=["GLP-1 Therapy","Semaglutide","Tirzepatide","Physician-Supervised","Medical Weight Loss","FDA-Approved","Ozempic Alternative","Wegovy Program","Weight Loss Fremont","Insurance May Cover","Free Consultation"];
  const rep=[...items,...items];
  return(<div className="bg-[#2C1A0E] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{animation:"marquee 36s linear infinite",width:"max-content"}}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<Dm/></span>)}</div></div>);
}

function WhatAreGLP1s(){
  const[ref,v]=useReveal();
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`transition-all duration-800 ${v?"opacity-100 translate-x-0":"opacity-0 -translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">The Science</span></div>
            <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-6" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.1}}>What Are <em className="italic text-[#B8925A]">GLP-1</em><br/>Medications?</h2>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-4">GLP-1 (glucagon-like peptide-1) receptor agonists are a class of FDA-approved medications that work by mimicking a hormone your body naturally produces after eating. They signal your brain that you're full, slow stomach emptying, and regulate blood sugar — resulting in significant, sustained weight loss when combined with lifestyle changes.</p>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-8">The most well-known GLP-1 medications — Semaglutide (brand names Ozempic, Wegovy) and Tirzepatide (Mounjaro, Zepbound) — have demonstrated 15–22% body weight reduction in clinical trials, making them the most effective non-surgical weight loss treatments ever studied.</p>
            <div className="grid grid-cols-2 gap-4">
              {[["Semaglutide","Ozempic / Wegovy"],["Tirzepatide","Mounjaro / Zepbound"],["Physician Prescribed","Dr. Gill monitors all patients"],["Monthly Check-ins","Ongoing safety & dosage review"]].map(([t,s])=>(
                <div key={t} className="border border-[#E8D5BE] bg-[#F5EEE4] p-4">
                  <p className="text-[#2C1A0E] font-medium text-sm mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>{t}</p>
                  <p className="text-[#7A6556] text-xs font-light">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative transition-all duration-800 delay-200 ${v?"opacity-100 translate-x-0":"opacity-0 translate-x-10"}`}>
            <div className="absolute top-8 -right-4 left-8 bottom-0 bg-[#F0E8DA] -z-10"/>
            <div className="absolute top-0 right-0 w-[3px] h-24 bg-[#B8925A]"/>
            <div className="overflow-hidden" style={{height:"460px"}}>
              <img src={P.interior} alt="Tri-Valley Clinic" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"/>
            </div>
            <div className="absolute -bottom-6 -left-4 bg-[#B8925A] text-[#FDFAF6] px-6 py-5 shadow-xl" style={{animation:"floatBadge 5s ease-in-out infinite"}}>
              <p className="text-4xl font-light mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>15–22%</p>
              <p className="text-[9px] tracking-[0.2em] uppercase opacity-80">Avg. Weight Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowProgramWorks(){
  const[ref,v]=useReveal();
  const steps=[
    {n:"01",t:"Free Consultation",   d:"Call Dr. Gill's office for a free 15-minute consultation to discuss your weight loss goals and medical history. We'll verify your insurance and determine if you're a candidate."},
    {n:"02",t:"Medical Evaluation",  d:"A comprehensive in-person or telehealth evaluation with Dr. Gill — reviewing your health history, current medications, weight history, and any contraindications for GLP-1 therapy."},
    {n:"03",t:"Personalized Plan",   d:"Dr. Gill creates your individualized treatment plan — selecting the right medication, starting dose, and titration schedule based on your unique physiology and goals."},
    {n:"04",t:"Ongoing Monitoring",  d:"Monthly follow-ups to review your progress, adjust dosage as needed, monitor for side effects, and provide ongoing support throughout your weight loss journey."},
  ];
  return(
    <section id="how-it-works" className="py-24 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>How the Program <em className="italic text-[#C9A46A]">Works</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#B8925A]/20 via-[#B8925A]/50 to-[#B8925A]/20"/>
          {steps.map((s,i)=>(
            <div key={s.n} className={`group text-center transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*140}ms`,transitionDuration:"700ms"}}>
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/30 group-hover:border-[#B8925A] transition-colors duration-500"/>
                <div className="absolute inset-[6px] rounded-full bg-[#B8925A]/8 group-hover:bg-[#B8925A]/15 transition-all duration-500"/>
                <span className="text-2xl text-[#C9A46A]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{s.n}</span>
              </div>
              <h3 className="text-xl text-[#F0E8DA] mb-3 group-hover:text-[#C9A46A] transition-colors duration-300" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{s.t}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light max-w-[210px] mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
        <div className={`mt-14 text-center transition-all duration-700 delay-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <a href="tel:5105984921" className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Start Your Journey <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
        </div>
      </div>
    </section>
  );
}

function CompareSection(){
  const[ref,v]=useReveal();
  const rows=[
    {f:"Medical Supervision",  doc:"Dr. Gill personally",    spa:"Often an NP/PA",   diy:"None"},
    {f:"Medication Type",      doc:"FDA-approved RX",        spa:"Varies / compound",diy:"OTC supplements"},
    {f:"Safety Monitoring",    doc:"Monthly labs & check-ins",spa:"Minimal",          diy:"None"},
    {f:"Dosage Adjustments",   doc:"Physician-directed",     spa:"Limited",           diy:"None"},
    {f:"Insurance Coverage",   doc:"May apply",              spa:"Usually cash-pay",  diy:"No"},
    {f:"Psychiatric Co-care",  doc:"Integrated at TVC",      spa:"Not available",     diy:"Not available"},
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Physician vs. <em className="italic text-[#B8925A]">Med Spa</em></h2>
          <p className={`text-[#7A6556] text-base font-light mt-4 max-w-lg mx-auto transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>Not all GLP-1 programs are equal. Here's why physician supervision matters.</p>
        </div>
        <div className={`overflow-hidden border border-[#E8D5BE] transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-4 bg-[#2C1A0E]">
            {["Feature","Dr. Gill (TVC) ★","Med Spa","DIY / Online"].map((h,i)=>(
              <div key={h} className={`px-4 py-4 text-[10px] tracking-[0.18em] uppercase font-semibold ${i===1?"text-[#C9A46A]":"text-[#E8D5BE]/60"}`}>{h}</div>
            ))}
          </div>
          {rows.map((r,i)=>(
            <div key={r.f} className={`grid grid-cols-4 border-t border-[#E8D5BE] hover:bg-[#F0E8DA] transition-colors ${i%2===0?"bg-[#FDFAF6]":"bg-[#FAF7F2]"}`}>
              <div className="px-4 py-4 text-sm text-[#7A6556] font-medium">{r.f}</div>
              <div className="px-4 py-4 text-sm text-[#2C1A0E] font-medium flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0"/>{r.doc}</div>
              <div className="px-4 py-4 text-sm text-[#7A6556] font-light">{r.spa}</div>
              <div className="px-4 py-4 text-sm text-[#7A6556] font-light">{r.diy}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EligibilitySection(){
  const[ref,v]=useReveal();
  const yes=["BMI ≥ 30 (obesity classification)","BMI ≥ 27 with a weight-related condition (hypertension, diabetes, sleep apnea)","History of struggling to lose weight through diet and exercise alone","No contraindicated medications or medical conditions","Committed to ongoing monitoring and follow-up visits"];
  const no=["Personal or family history of MEN2 or thyroid cancer","Active pancreatitis","Pregnancy or planning pregnancy","Severe gastrointestinal disease","Allergy to GLP-1 medication components"];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Are You a <em className="italic text-[#B8925A]">Candidate?</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border border-[#E8D5BE] bg-[#F5EEE4] p-8 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#6B7C5E]/15 border border-[#6B7C5E]/40 flex items-center justify-center text-[#6B7C5E]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="text-xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>You May Qualify If...</h3></div>
            <ul className="space-y-3">{yes.map(t=><li key={t} className="flex items-start gap-3 text-sm text-[#7A6556] font-light"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] flex-shrink-0 mt-2"/>{t}</li>)}</ul>
          </div>
          <div className={`border border-[#E8D5BE] bg-[#F5EEE4] p-8 transition-all duration-700 delay-150 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#B8925A]/15 border border-[#B8925A]/40 flex items-center justify-center text-[#B8925A]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div><h3 className="text-xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>May Not Be Suitable If...</h3></div>
            <ul className="space-y-3">{no.map(t=><li key={t} className="flex items-start gap-3 text-sm text-[#7A6556] font-light"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A]/50 flex-shrink-0 mt-2"/>{t}</li>)}</ul>
          </div>
        </div>
        <div className={`mt-8 text-center transition-all duration-700 delay-400 ${v?"opacity-100":"opacity-0"}`}>
          <p className="text-[#7A6556] text-sm font-light mb-5">Not sure if you qualify? Dr. Gill will assess your eligibility during your free consultation.</p>
          <a href="tel:5105984921" className="inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Check Your Eligibility — Free</a>
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  const[ref,v]=useReveal();const[open,sOpen]=useState(null);
  const faqs=[
    {q:"How much weight can I expect to lose?",             a:"Clinical trials show 15–22% total body weight loss over 68–72 weeks with Semaglutide and Tirzepatide respectively. Individual results vary based on adherence, diet, and activity level. Dr. Gill will set realistic expectations during your evaluation."},
    {q:"Does insurance cover GLP-1 medications?",           a:"Coverage varies significantly by plan. Some commercial plans cover GLP-1s when prescribed for obesity with qualifying conditions. Our staff verifies your specific coverage before your first appointment."},
    {q:"What are the common side effects?",                 a:"The most common side effects are gastrointestinal — nausea, vomiting, and diarrhea — especially during dose escalation. These typically improve over time. Dr. Gill monitors all patients closely and adjusts dosing to minimize discomfort."},
    {q:"How is this different from getting Ozempic online?", a:"Obtaining medications from telehealth mills or unregulated online platforms carries significant risks — no in-person evaluation, no monitoring, and no physician relationship. Dr. Gill provides comprehensive medical supervision with monthly check-ins and real accountability."},
    {q:"How long do I need to stay on the medication?",     a:"This varies by individual. GLP-1 therapy is most effective as a long-term commitment — most patients see continued weight management with ongoing treatment. Dr. Gill will discuss your long-term plan during your evaluation."},
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Frequently <em className="italic text-[#B8925A]">Asked</em></h2></div>
        <div className="space-y-3">{faqs.map((f,i)=>(
          <div key={f.q} className={`border transition-all duration-500 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"} ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`,transitionDuration:"600ms"}}>
            <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>sOpen(open===i?null:i)}>
              <span className="text-[15px] font-medium text-[#2C1A0E]">{f.q}</span>
              <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
            </button>
            <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-60 pb-6":"max-h-0"}`}><p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{f.a}</p></div>
          </div>
        ))}</div>
      </div>
    </section>
  );
}

function CTA(){
  const[ref,v]=useReveal();
  return(
    <section className="py-28 px-5 md:px-10 relative overflow-hidden text-center" style={{background:"linear-gradient(160deg,#FDFAF6 0%,#F5EEE4 50%,#EDE5D6 100%)"}}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(184,146,90,0.14) 0%,transparent 70%)"}} />
      <div ref={ref} className="relative mx-auto max-w-2xl">
        {/* BOTH DOCTORS — 50/50 partners, every page */}
        <div className={`transition-all duration-700 ${v?"opacity-100 scale-100":"opacity-0 scale-90"}`}>
          <DoctorAvatars className="mb-10"/>
        </div>
        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="w-16 h-px bg-[#B8925A]/40"/><Dm/><span className="w-16 h-px bg-[#B8925A]/40"/>
        </div>
        <h2 className={`text-5xl md:text-[64px] text-[#2C1A0E] mb-5 transition-all duration-700 delay-150 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.05}}>
          Start Your Weight Loss<br/><em className="italic text-[#B8925A]">Journey Today.</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>Dr. Gill and Dr. Gondara offer a free consultation on your GLP-1 eligibility. Call us and let's talk.</p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400"><Ph/> Call (510) 598-4921 <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
          <a href="/contact" className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">Send a Message</a>
        </div>
        <p className={`mt-7 text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${v?"opacity-100":"opacity-0"}`}>Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA · Telehealth Statewide CA</p>
      </div>
    </section>
  );
}

function Ph(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;}
function Dm({size=8}){return <svg width={size} height={size} viewBox="0 0 10 10" fill="#B8925A"><polygon points="5,0 10,5 5,10 0,5"/></svg>;}
const CSS=`*{cursor:none !important;}@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}@keyframes floatOrb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-30px) scale(1.06)}66%{transform:translate(-14px,18px) scale(0.94)}}@keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`;