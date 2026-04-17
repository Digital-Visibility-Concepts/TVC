import { useEffect, useRef, useState } from "react";
import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";

const CONDITIONS=[
  {id:"anxiety",   label:"Anxiety Disorders",    sub:"GAD · Social · Panic",    desc:"Generalized anxiety, social anxiety, panic disorder, and phobias — diagnosed and treated with evidence-based medication management.",icon:"🧠"},
  {id:"depression",label:"Major Depression",      sub:"MDD · Persistent",        desc:"From mild depressive episodes to treatment-resistant depression, our physicians provide thorough evaluations and targeted treatment plans.",icon:"💙"},
  {id:"adhd",      label:"ADHD",                 sub:"Adult Diagnosis",          desc:"Adult ADHD is widely under-diagnosed. We conduct comprehensive evaluations and create management strategies that fit your life.",icon:"⚡"},
  {id:"ptsd",      label:"PTSD & Trauma",         sub:"Complex · Single Event",  desc:"Providers at Tri-Valley Clinic offer compassionate care for individuals coping with trauma. Trauma can make you feel easily frightened, avoidant, and may increase susceptibility to substance abuse. Treatments include psychotherapy and medications.",icon:"🌿"},
  {id:"bipolar",   label:"Bipolar Disorder",      sub:"Type I · Type II",        desc:"These individuals experience periods of mania and depression — emotional highs and extreme lows. Untreated bipolar disorder can lead to risk of substance abuse, self-harm, or suicide. If you are considering self-harm or suicide, call 911 for emergency assistance.",icon:"⚖️"},
  {id:"ocd",       label:"OCD",                   sub:"Obsessive-Compulsive",    desc:"OCD is often mistaken for other conditions. Our physicians accurately diagnose and manage OCD with a treatment approach tailored to the severity and type of your symptoms.",icon:"🔄"},
  {id:"insomnia",  label:"Insomnia",              sub:"Chronic · Acute",         desc:"Sleep disorders have cascading effects on mental and physical health. We address insomnia with a psychiatric lens — often revealing and treating underlying causes.",icon:"🌙"},
  {id:"substance", label:"Substance Abuse",       sub:"Dual Diagnosis",          desc:"Mental health and substance use disorders frequently co-occur. We provide integrated dual-diagnosis treatment that addresses both conditions simultaneously.",icon:"🛡️"},
];

function useReveal(t=0.12){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});o.observe(el);return()=>o.disconnect();},[t]);return[ref,v];}
function Counter({to,suffix="",ms=1800}){const[v,setV]=useState(0);const[ref,vis]=useReveal(0.5);useEffect(()=>{if(!vis)return;let t0=null;const f=(ts)=>{if(!t0)t0=ts;const p=Math.min((ts-t0)/ms,1);setV(Math.floor(p*to));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[vis,to,ms]);return <span ref={ref}>{v}{suffix}</span>;}
function Cursor(){const d=useRef(null),r=useRef(null),p=useRef({x:0,y:0}),f=useRef(null);useEffect(()=>{const mv=e=>{p.current={x:e.clientX,y:e.clientY};};const tk=()=>{if(d.current)d.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;if(r.current)r.current.style.transform=`translate(${p.current.x-16}px,${p.current.y-16}px)`;f.current=requestAnimationFrame(tk);};window.addEventListener("mousemove",mv);f.current=requestAnimationFrame(tk);return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(f.current);};},[]);return(<><div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}}/><div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}}/></>);}

export default function Psychiatric(){
  return(<main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none"}}><style>{CSS}</style><Cursor/><Hero/><Mq/><CondSection/><ProcessSection/><DrSection/><TestSection/><FAQSection/><CTA/></main>);
}

function Hero(){
  const[on,sOn]=useState(false);useEffect(()=>{setTimeout(()=>sOn(true),80);},[]);
  return(
    <section className="relative min-h-[88vh] flex items-end overflow-hidden" style={{background:"linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}/>
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden">
        {/* ✅ dr-gill-outdoor.jpg — clean background, matches WeightLoss style */}
        <img src={IMAGES.DR_GILL_HERO} alt="Dr. Gill" className="w-full h-full object-cover opacity-35" style={{filter:"saturate(0.70)", objectPosition:"center 12%"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,#2C1A0E 0%,transparent 55%)"}}/>
      </div>
      {[{t:"10%",l:"52%",s:400,o:0.12,d:"0s"},{t:"60%",l:"5%",s:260,o:0.08,d:"5s"}].map((o,i)=>(
        <div key={i} className="absolute rounded-full pointer-events-none" style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}}/>
      ))}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{writingMode:"vertical-rl",animation:"fadeUp 1s ease 0.8s both"}}>
        <span className="w-px h-16 bg-[#B8925A]/40"/><span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A]/50">Expert · Compassionate · Evidence-Based</span><span className="w-px h-16 bg-[#B8925A]/40"/>
      </div>
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/8 px-4 py-2 mb-7 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"100ms"}}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/><span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Dr. Gill & Dr. Gondara · Accepting New Patients</span>
          </div>
          <h1 className={`text-[48px] md:text-[64px] xl:text-[76px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"200ms"}}>
            Psychiatric<br/><em className="italic text-[#C9A46A]">Care That</em><br/>Sees You.
          </h1>
          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"440ms"}}>
            Comprehensive adult psychiatric evaluations, precise diagnosis, and personalized medication management — delivered by Dr. Gill and Dr. Gondara with warmth and clinical excellence.
          </p>
          <div className={`flex flex-wrap gap-4 mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"540ms"}}>
            <a href="/contact" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"><Ph/> Free Consultation <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
            <a href="#conditions" className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">View Conditions ↓</a>
          </div>
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"640ms"}}>
            {["Free First Consult","Next-Day Available","All Major Insurance","Telehealth CA-Wide"].map(t=>(
              <span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{t}</span>
            ))}
          </div>
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

function Mq(){
  const items=["Anxiety Disorders","Major Depression","ADHD","PTSD & Trauma","Bipolar Disorder","OCD","Insomnia","Substance Abuse","Medication Management","Psychiatric Evaluations","Next-Day Appointments","Dr. Gill & Dr. Gondara","Free 15-Min Consult"];
  const rep=[...items,...items];
  return(<div className="bg-[#2C1A0E] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{animation:"marquee 38s linear infinite",width:"max-content"}}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<Dm/></span>)}</div></div>);
}

function CondSection(){
  const[ref,v]=useReveal();
  return(
    <section id="conditions" className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-14">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] mb-4 transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Conditions We <em className="italic text-[#B8925A]">Treat</em></h2>
          <p className={`text-[#7A6556] text-lg font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>Every condition is treated with a personalized approach — thorough evaluation first, treatment second.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONDITIONS.map((c,i)=>(
            <div key={c.id} className={`group relative bg-[#F5EEE4] border border-[#E8D5BE] p-7 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_14px_48px_rgba(184,146,90,0.13)] hover:border-[#B8925A]/50 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*90}ms`,transitionDuration:"700ms"}}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="text-xl text-[#2C1A0E] mb-1" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{c.label}</h3>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A] font-semibold mb-3">{c.sub}</p>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light">{c.desc}</p>
            </div>
          ))}
        </div>
        {/* SAMHSA Resource — per Website Fixes doc */}
        <div className={`mt-10 border border-[#E8D5BE] bg-[#F5EEE4] p-6 flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-700 delay-800 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <div>
            <p className="text-sm font-medium text-[#2C1A0E] mb-1">Mental Health Crisis Resources</p>
            <p className="text-[#7A6556] text-sm font-light">If you are experiencing a mental health emergency or considering self-harm or suicide, call 911 immediately.</p>
          </div>
          <a href="https://www.samhsa.gov/mental-health/suicidal-behavior/resources" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300 whitespace-nowrap">
            SAMHSA Resources →
          </a>
        </div>
        <div className={`mt-4 text-center transition-all duration-700 delay-900 ${v?"opacity-100":"opacity-0"}`}>
          <p className="text-[#7A6556] text-sm font-light mb-4">Don't see your condition? Call us — we treat many more.</p>
          <a href="tel:5105984921" className="inline-flex items-center gap-3 border border-[#B8925A]/50 text-[#B8925A] px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300"><Ph/> Call Dr. Gill's Office</a>
        </div>
      </div>
    </section>
  );
}

function ProcessSection(){
  const[ref,v]=useReveal();
  const steps=[
    {n:"01",title:"Free Consultation",       desc:"A complimentary 15-minute call with Dr. Gill or Dr. Gondara to discuss your needs and confirm Tri-Valley Clinic is the right fit."},
    {n:"02",title:"Comprehensive Evaluation", desc:"Your first full appointment — a thorough psychiatric assessment covering history, symptoms, lifestyle, and goals."},
    {n:"03",title:"Personalized Treatment",   desc:"A treatment plan built specifically for you — medication management, monitoring schedule, and adjustments as needed."},
    {n:"04",title:"Ongoing Partnership",      desc:"Regular follow-ups to assess progress, refine treatment, and ensure you feel genuinely supported throughout your care."},
  ];
  return(
    <section className="py-24 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}>
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Your Care <em className="italic text-[#C9A46A]">Journey</em></h2>
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
              <h3 className="text-xl text-[#F0E8DA] mb-3 group-hover:text-[#C9A46A] transition-colors duration-300" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{s.title}</h3>
              <p className="text-[#7A6556] text-sm leading-relaxed font-light max-w-[210px] mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DrSection(){
  const[ref,v]=useReveal();
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`relative transition-all duration-1000 ${v?"opacity-100 translate-x-0":"opacity-0 -translate-x-12"}`}>
            <div className="absolute top-8 -left-4 right-8 bottom-0 bg-[#E8D5BE]/50 -z-10"/>
            <div className="absolute top-0 left-0 w-[3px] h-24 bg-[#B8925A]"/>
            <div className="overflow-hidden" style={{height:"460px"}}>
              {/* ✅ Approved inside clinic photo */}
              <img src={IMAGES.DR_GILL_HERO} alt="Dr. Gill consultation" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" style={{objectPosition:"center 25%"}}/>
            </div>
            {/* 🔄 Photo 11 — both doctors floating */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 w-[170px] overflow-hidden border-[3px] border-[#FDFAF6] shadow-xl z-10" style={{height:"200px",animation:"floatBadge 5s ease-in-out infinite"}}>
              <img src={IMAGES.BOTH_OUTDOOR} alt="Dr. Gill and Dr. Gondara" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 p-3"><p className="text-[8px] tracking-[0.18em] uppercase text-[#E8D5BE]/80">Dr. Gill & Dr. Gondara</p></div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-200 ${v?"opacity-100 translate-x-0":"opacity-0 translate-x-12"}`}>
            <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Why Our Team</span></div>
            <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-6" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.1}}>Psychiatry That <em className="italic text-[#B8925A]">Listens First</em></h2>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-5">
              At Tri-Valley Clinic, Dr. Gill and Dr. Gondara share one commitment: listening completely before prescribing anything. Initial evaluations are longer than the industry standard — because understanding you fully is the first act of treatment.
            </p>
            <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-8">
              Our patients consistently describe feeling genuinely heard. Dr. Gill (Founder & CEO) and Dr. Gondara (Lead Psychiatrist) combine clinical precision with personal warmth in every appointment.
            </p>
            <ul className="space-y-3 mb-10">
              {["No double-booking — your time is yours alone","Free 15-minute consultation for all new patients","Next-day appointments after insurance verification","Telehealth available statewide in California","Most major insurance plans accepted"].map(t=>(
                <li key={t} className="flex items-start gap-3 text-sm text-[#7A6556]"><span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2"/>{t}</li>
              ))}
            </ul>
            <a href="tel:5105984921" className="group inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#2C1A0E] transition-colors duration-300"><Ph/> Book an Evaluation <span className="group-hover:translate-x-1 transition-transform duration-300">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestSection(){
  const[ref,v]=useReveal();
  const revs=[
    {name:"Sarah M.",role:"Fremont",   q:"Dr. Gill finally gave me an ADHD diagnosis after years of being dismissed. She didn't just prescribe — she explained everything."},
    {name:"James T.",role:"Union City",q:"I've seen many psychiatrists. Dr. Gill is the first who made me feel like a person, not a chart."},
    {name:"Priya K.",role:"Newark",    q:"The clinic environment alone made a difference. I actually looked forward to my appointments."},
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Patient <em className="italic text-[#B8925A]">Stories</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {revs.map((r,i)=>(
            <div key={r.name} className={`group relative bg-[#F5EEE4] border border-[#E8D5BE] p-8 transition-all duration-700 hover:shadow-[0_12px_40px_rgba(184,146,90,0.10)] hover:border-[#B8925A]/40 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*130}ms`,transitionDuration:"700ms"}}>
              <div className="text-[80px] text-[#B8925A]/12 leading-none absolute top-2 left-5 pointer-events-none select-none" style={{fontFamily:"'Cormorant Garamond',serif"}}>"</div>
              <div className="flex gap-0.5 mb-5">{Array(5).fill(0).map((_,j)=><St key={j}/>)}</div>
              <p className="text-[#7A6556] text-sm leading-relaxed italic font-light mb-6 relative z-10">"{r.q}"</p>
              <div className="border-t border-[#E8D5BE] pt-4 flex items-center justify-between">
                <div><p className="text-[#2C1A0E] text-lg" style={{fontFamily:"'Cormorant Garamond',serif"}}>{r.name}</p><p className="text-[9px] tracking-[0.18em] uppercase text-[#B8925A]/60 mt-0.5">Patient · {r.role}</p></div>
                <div className="flex gap-0.5">{Array(5).fill(0).map((_,j)=><St key={j}/>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  const[ref,v]=useReveal();const[open,sOpen]=useState(null);
  const faqs=[
    {q:"Do I need a referral to see Dr. Gill or Dr. Gondara?", a:"Most insurance plans do not require a referral for psychiatric care. When you call to verify your insurance, our staff will confirm whether your plan requires one."},
    {q:"How long is the first psychiatric evaluation?",         a:"Initial evaluations are typically 45–60 minutes. This longer appointment allows for a thorough assessment before any treatment decisions are made."},
    {q:"Will I definitely be prescribed medication?",           a:"Not necessarily. Our physicians evaluate each patient individually. Medication management is only recommended when clinically appropriate for your specific situation."},
    {q:"Can you treat children or teenagers?",                 a:"Tri-Valley Clinic currently specializes in adult psychiatry (18+). For minors, we recommend contacting a child and adolescent psychiatrist."},
    {q:"What if my condition isn't listed on this page?",      a:"Call us — we treat many conditions beyond the ones listed here. Dr. Gill or Dr. Gondara will discuss your specific needs during your free consultation."},
    {q:"Is there a crisis resource if I need immediate help?",  a:"If you are experiencing a mental health emergency or considering self-harm or suicide, call 911 for emergency assistance. You can also visit SAMHSA's Suicidal Behavior Resources at samhsa.gov."},
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
          Take the First<br/><em className="italic text-[#B8925A]">Step Today.</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>Dr. Gill and Dr. Gondara offer a free 15-minute consultation — a genuine conversation about how we can help.</p>
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
function St(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="#B8925A"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;}
const CSS=`*{cursor:none !important;}@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}@keyframes floatOrb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-30px) scale(1.06)}66%{transform:translate(-14px,18px) scale(0.94)}}@keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`;