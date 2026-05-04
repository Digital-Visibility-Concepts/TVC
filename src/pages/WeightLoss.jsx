/* eslint-disable no-unused-vars */
import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";
import SEO from '../components/SEO';

const P={hero:"/assets/weightloss-bg.jpg",drGill:"/assets/dr-gill-white.jpg",drGillIn:"/assets/dr J gill-inside.jpg",interior:"/assets/inetrioir clinic.jpg",inside:"/assets/inside clinic1.jpg",table:"/assets/emptytabel.jpg"};

function useReveal(t=0.12){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});o.observe(el);return()=>o.disconnect();},[t]);return[ref,v];}
function Cursor(){const d=useRef(null),r=useRef(null),p=useRef({x:0,y:0}),f=useRef(null);useEffect(()=>{const mv=e=>{p.current={x:e.clientX,y:e.clientY};};const tk=()=>{if(d.current)d.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;if(r.current)r.current.style.transform=`translate(${p.current.x-16}px,${p.current.y-16}px)`;f.current=requestAnimationFrame(tk);};window.addEventListener("mousemove",mv);f.current=requestAnimationFrame(tk);return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(f.current);};},[]);return(<><div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}}/><div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}}/></>);}

export default function WeightLoss(){
  return(<main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none",overflowX:"hidden"}}>
    <SEO
  title="Medical Weight Loss"
  description="Physician-supervised GLP-1 weight loss program with Semaglutide and Tirzepatide in Fremont, CA. Personalized treatment plans by Dr. Gill. Evidence-based, safe, and effective."
  path="/medical-weight-loss"
/>
<style>{CSS}</style><Cursor/><Hero/><Marquee/><WhatAreGLP1s/><HowProgramWorks/><OurProgram/><WhatSetsApartSection/><EligibilitySection/><FAQSection/><CTA/></main>);
}

function Hero(){
  const[on,sOn]=useState(false);useEffect(()=>{setTimeout(()=>sOn(true),80);},[]);
  return(
    <section className="relative min-h-[88vh] flex items-end overflow-hidden" style={{background:"linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}/>
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden">
        <img src={P.hero} alt="Dr. Japsharan Gill" className="w-full h-full object-cover object-top opacity-35" style={{filter:"saturate(0.7)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,#2C1A0E 0%,transparent 55%)"}}/>
      </div>
      {[{t:"10%",l:"52%",s:400,o:0.12,d:"0s"},{t:"60%",l:"5%",s:260,o:0.08,d:"5s"}].map((o,i)=>(
        <div key={i} className="absolute rounded-full pointer-events-none" style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}}/>
      ))}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{writingMode:"vertical-rl",animation:"fadeUp 1s ease 0.8s both"}}>
        <span className="w-px h-16 bg-[#B8925A]/40"/><span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A]/50">GLP-1 · Physician-Supervised · Evidence-Based</span><span className="w-px h-16 bg-[#B8925A]/40"/>
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
            <span className="w-10 h-px bg-[#B8925A]/60"/><span className="text-[10px] tracking-[0.22em] uppercase text-[#A89880] font-light">GLP-1 Therapy · Physician-Supervised Weight Loss Program</span>
          </div>
          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"440ms"}}>
            Tri-Valley Clinic now offers a unique, structured GLP-1 program designed to support both physical and behavioral change—guided by licensed clinicians and built around your individual needs. Safe, effective and science-backed.
          </p>
          <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"540ms"}}>
            <a href="/contact" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Free Consultation <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
            <a href="#how-it-works" className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">How It Works ↓</a>
          </div>
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"640ms"}}>
            {["Physician-Led","Compounded GLP-1","No Contracts","Free Consultation"].map(t=>(
              <span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"380ms"}}>
          {[{val:"GLP-1",lab:"Personalized GLP-1 Therapy",sub:"Semaglutide & tirzepatide, tailored to your response"},{val:"MD",lab:"Physician-Led Program",sub:"Medical oversight with dedicated clinical support"},{val:"01",lab:"Structured Evidence-Based Care",sub:"Ongoing monitoring to support safe, sustainable progress"}].map((c,i)=>(
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
  const items=["GLP-1 Therapy","Semaglutide","Tirzepatide","Physician-Supervised","Medical Weight Loss","Weight Loss Fremont","Cherry Financing Available","Free Consultation"];
  const rep=[...items,...items];
  return(<div className="bg-[#2C1A0E] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{animation:"marquee 36s linear infinite",width:"max-content"}}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<Dm/></span>)}</div></div>);
}

function WhatAreGLP1s(){
  const[ref,v]=useReveal();
  const[glpOpen,setGlpOpen]=useState(false);
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`transition-all duration-800 ${v?"opacity-100 translate-x-0":"opacity-0 -translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Physician-Guided. Personalized. Sustainable.</span></div>
            <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-6" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.1}}>What Are <em className="italic text-[#B8925A]">GLP-1</em><br/>Medications?</h2>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-4">GLP-1 medications — including Semaglutide and Tirzepatide — are a class of medications that work by mimicking natural gut hormones. These hormones help regulate appetite, slow digestion, and support blood sugar control, leading to reduced calorie intake and gradual, meaningful weight loss.</p>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-6">At Tri-Valley Clinic, our program uses pharmacy-compounded GLP-1 medications prescribed and monitored by our physicians. Compounded versions allow for individualized dosing and are not the same as retail branded products. Our approach is physician-led from start to finish — no online questionnaires, no auto-shipments, just structured clinical care.</p>

            {/* GLP-1 How It Works accordion */}
            <div className={`border transition-all duration-300 mb-6 ${glpOpen?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#F5EEE4] hover:border-[#B8925A]/30"}`}>
              <button className="w-full flex items-center justify-between px-6 py-4 text-left gap-4" onClick={()=>setGlpOpen(!glpOpen)}>
                <span className="text-[15px] font-medium text-[#2C1A0E]">How GLP-1 Medications Work</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${glpOpen?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${glpOpen?"max-h-60 pb-5":"max-h-0"}`}>
                <ul className="px-6 space-y-2">
                  {["Reduce hunger and food cravings","Promote fullness by slowing digestion","Support stable blood sugar levels","Encourage healthier portion control"].map(item=>(
                    <li key={item} className="flex items-start gap-2 text-sm text-[#7A6556] font-light"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2"/>{item}</li>
                  ))}
                </ul>
                <p className="px-6 pt-3 text-[#7A6556] text-sm leading-relaxed font-light">This physiological support allows for gradual, steady progress without extreme or restrictive approaches.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[["Semaglutide","GLP-1 receptor agonist for weight loss"],["Tirzepatide","Dual GIP/GLP-1 receptor agonist"],["Physician-Led","One-on-one monitoring throughout your program"],["Structured Check-ins","Ongoing safety & dosage review"]].map(([t,s])=>(
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
              <img src="/assets/weightloss-bg.jpg" alt="Weight Loss Program at Tri-Valley Clinic" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" style={{objectPosition:"center 40%"}}/>
            </div>
            <div className="absolute -bottom-6 -left-4 bg-[#B8925A] text-[#FDFAF6] px-6 py-5 shadow-xl" style={{animation:"floatBadge 5s ease-in-out infinite"}}>
              <p className="text-4xl font-light mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>GLP-1</p>
              <p className="text-[9px] tracking-[0.2em] uppercase opacity-80">Physician-Supervised</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurProgram(){
  const[ref,v]=useReveal();
  const[open,setOpen]=useState(null);
  const steps=[
    {t:"Consultation",d:"Your care begins with a comprehensive medical evaluation. We review your health history, goals, and current health status to determine if GLP-1 therapy is appropriate for you. If it is, we create a personalized treatment plan and submit for any required insurance authorization."},
    {t:"Weekly Care",d:"Once your program begins, you receive your compounded GLP-1 medication with clear instructions. Our team checks in with you regularly to review how you are responding, address any questions, and adjust your dosing as needed."},
    {t:"Ongoing Support",d:"Your progress is monitored throughout the program. We track your results, make clinical adjustments, and provide guidance on maintaining long-term success — not just during treatment, but beyond it."},
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>How the Program <em className="italic text-[#B8925A]">Works</em></h2>
        </div>
        <div className={`space-y-2 transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          {steps.map((s,i)=>(
            <div key={s.t} className={`border transition-all duration-300 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"}`}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>setOpen(open===i?null:i)}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-[#B8925A]/30" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{String(i+1).padStart(2,"0")}</span>
                  <span className="text-[15px] font-medium text-[#2C1A0E]">{s.t}</span>
                </div>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-48 pb-6":"max-h-0"}`}>
                <p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GLP1Accordion(){
  const[ref,v]=useReveal();
  const[open,setOpen]=useState(null);
  const items=[
    {t:"How GLP-1 Medications Work",body:"GLP-1 medications support weight loss by working with your body's natural systems:\n\n● Reduce hunger and food cravings\n● Promote fullness by slowing digestion\n● Support stable blood sugar levels\n● Encourage healthier portion control\n\nThis physiological support allows for gradual, steady progress without extreme or restrictive approaches."},
  ];
  return(
    <section className="py-12 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-3">
          {items.map((s,i)=>(
            <div key={s.t} className={`border transition-all duration-500 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#F5EEE4] hover:border-[#B8925A]/30"} ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`}}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>setOpen(open===i?null:i)}>
                <span className="text-[17px] font-medium text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif"}}>{s.t}</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-96 pb-6":"max-h-0"}`}>
                <div className="px-6 space-y-2">
                  {s.body.split("\n").map((line,j)=>(
                    line.trim()===""?<div key={j} className="h-2"/>:<p key={j} className={`text-[#7A6556] text-sm leading-relaxed font-light ${line.startsWith("●")?"pl-3":""}`}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramAccordion(){
  const[ref,v]=useReveal();
  const[open,setOpen]=useState(null);
  const items=[
    {t:"Initial Consultation",      body:"Your care begins with a comprehensive medical evaluation to understand your health history, goals, and any underlying factors affecting weight. We take into account metabolic health, lifestyle patterns, and emotional factors to build a plan that is realistic, effective, and sustainable."},
    {t:"Personalized Treatment Plan",body:"Based on your assessment, we create a personalized plan that may include GLP-1 therapy, nutrition guidance, and lifestyle recommendations — tailored to your body, your health history, and your goals."},
    {t:"Ongoing Monitoring & Adjustments",body:"Regular follow-ups allow us to monitor your progress, adjust treatment as needed, and ensure safe, effective results over time. We provide regular structured check-ins and clinical monitoring to track progress and adjust dosing as needed."},
    {t:"Lifestyle & Behavioral Support",body:"At Tri-Valley Clinic, we view weight management as part of your overall health — not just a number on a scale. Our approach integrates physical health, mental well-being, and sustainable habit-building to support long-term success."},
  ];
  return(
    <section className="py-16 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="text-center mb-10">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-4xl md:text-5xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Our Program: <em className="italic text-[#B8925A]">What to Expect</em></h2>
        </div>
        <div className="space-y-3">
          {items.map((s,i)=>(
            <div key={s.t} className={`border transition-all duration-500 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"} ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`}}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>setOpen(open===i?null:i)}>
                <span className="text-[16px] font-medium text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif"}}>{s.t}</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-60 pb-6":"max-h-0"}`}>
                <p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function HowProgramWorks(){
  const[ref,v]=useReveal();
  const steps=[
    {n:"01",t:"Consultation",     d:"Your care begins with a medical evaluation to review your health history and goals, and determine if GLP-1 therapy is appropriate for you."},
    {n:"02",t:"Personalized Plan",d:"We review your health history and create a treatment plan tailored to you, including the right GLP-1 and dosing approach."},
    {n:"03",t:"Ongoing Support",  d:"Regular structured check-ins and clinical monitoring to track progress, adjust dose as needed, and support you along the way."},
  ];
  return(
    <section id="how-it-works" className="py-24 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>How the Program <em className="italic text-[#C9A46A]">Works</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#B8925A]/20 via-[#B8925A]/50 to-[#B8925A]/20"/>
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
          <a href="/contact" className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Start Your Journey <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
          <p className="mt-6 text-[10px] text-[#7A6556]/50 max-w-2xl mx-auto leading-relaxed">This program is a medically supervised GLP-1 weight loss program with structured support supervised by licensed clinicians. Treatment may include pharmacy-compounded GLP-1 medications when clinically appropriate. Individual results vary and are not guaranteed.</p>
        </div>
      </div>
    </section>
  );
}

function WhatSetsApartSection(){
  const[ref,v]=useReveal();
  const cards=[
    {n:"01",t:"A Whole-Person Approach",d:"We treat weight as a health issue — not a willpower issue. Our program considers your medical history, metabolic health, and lifestyle to build a plan that is realistic and sustainable for you."},
    {n:"02",t:"Physician-Led From Start to Finish",d:"Every patient is seen and managed by a licensed physician. We do not delegate care to non-physician staff for prescribing or medical decision-making."},
    {n:"03",t:"Structured Clinical Monitoring",d:"Regular check-ins allow us to track your progress, adjust dosing as needed, and ensure you are responding well to treatment. Safety and effectiveness are monitored throughout."},
    {n:"04",t:"Integrated Care When Appropriate",d:"As a psychiatric and wellness clinic, we are uniquely positioned to address both the physical and emotional aspects of weight management when relevant to your care."},
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>What Sets Our Program <em className="italic text-[#B8925A]">Apart</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card,i)=>(
            <div key={card.n} className={`group border border-[#E8D5BE] bg-[#FDFAF6] p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(184,146,90,0.12)] hover:border-[#B8925A]/50 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*100}ms`,transitionDuration:"700ms"}}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left relative"/>
              <span className="text-4xl text-[#B8925A]/15 font-light leading-none block mb-4 group-hover:text-[#B8925A]/30 transition-colors duration-300" style={{fontFamily:"'Cormorant Garamond',serif"}}>{card.n}</span>
              <h3 className="text-xl text-[#2C1A0E] mb-3" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{card.t}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light">{card.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EligibilitySection(){
  const[ref,v]=useReveal();
  const[open,setOpen]=useState(false);
  const criteria=["Have struggled with weight loss despite diet and exercise","Are looking for medically supervised, sustainable results","May have weight-related health concerns","Want a structured, supportive approach to long-term change"];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Is This Program <em className="italic text-[#B8925A]">Right for You?</em></h2>
        </div>
        <div className={`transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <div className={`border transition-all duration-300 ${open?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#F5EEE4] hover:border-[#B8925A]/30"}`}>
            <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>setOpen(!open)}>
              <span className="text-[15px] font-medium text-[#2C1A0E]">Medical weight loss with GLP-1 therapy may be appropriate for individuals who...</span>
              <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-400 ${open?"max-h-72 pb-6":"max-h-0"}`}>
              <ul className="px-6 space-y-3 mb-4">
                {criteria.map(t=><li key={t} className="flex items-start gap-3 text-sm text-[#7A6556] font-light"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2"/>{t}</li>)}
              </ul>
              <p className="px-6 text-[#7A6556] text-sm font-light">A consultation with our provider will help determine if this treatment is appropriate for you.</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="tel:5105984921" className="inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Check Your Eligibility — Free</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  const[ref,v]=useReveal();const[open,sOpen]=useState(null);
  const faqs=[
    {q:"How much weight can I expect to lose?",a:"Results vary based on individual factors including starting weight, adherence, and overall health. Our program is designed to support meaningful, sustained progress — not a quick fix. Your provider will give you a realistic picture of what to expect at your consultation."},
    {q:"Does insurance cover this program?",a:"GLP-1 medications used in our program are compounded and are not covered by insurance. We can review all costs with you during your consultation. Cherry financing is available for this service."},
    {q:"What are the side effects?",a:"The most common side effects of GLP-1 medications are gastrointestinal, including nausea, reduced appetite, and occasional mild digestive discomfort. These effects are typically most noticeable when starting or increasing the dose and tend to improve over time. Your provider will discuss what to expect and how to manage symptoms at each stage of your treatment."},
    {q:"Why should I choose Tri-Valley Clinic for this program?",a:"Our GLP-1 program is offered within a licensed medical practice — not a med spa or online service. Every patient is seen by a physician, not a non-physician provider. We provide in-person care, structured monitoring, and the ability to coordinate treatment alongside any psychiatric or other health needs you may have."},
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
            <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-48 pb-6":"max-h-0"}`}><p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{f.a}</p></div>
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
          Start Your Weight Loss<br/><em className="italic text-[#B8925A]">Journey.</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>We offer a free initial consultation to see if our program is right for you. Call us to get started today.</p>
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