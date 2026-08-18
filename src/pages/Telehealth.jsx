/* eslint-disable react-hooks/set-state-in-effect */
import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";
import SEO from '../components/SEO';

const P={drGill:"/assets/dr-gill-outdoor.jpg",drGillIn:"/assets/dr J gill-inside.jpg",consult1:"/assets/indoor1.jpg"              /* ✅ clean clinic interior */,consult2:"/assets/both-doctors-clinic.jpg"  /* ✅ both doctors in clinic */,inside:"/assets/inside clinic1.jpg"};
function useReveal(t=0.12){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});o.observe(el);return()=>o.disconnect();},[t]);return[ref,v];}
/* ⚠ z-9998/9999 is the top of the site. Nothing may render above it
   or the pointer vanishes (see src/constants/zIndex.js). */
function Cursor(){const[en,setEn]=useState(false);const d=useRef(null),r=useRef(null),p=useRef({x:0,y:0}),f=useRef(null);useEffect(()=>{setEn(window.matchMedia("(pointer: fine)").matches);},[]);useEffect(()=>{if(!en)return;const mv=e=>{p.current={x:e.clientX,y:e.clientY};};const tk=()=>{if(d.current)d.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;if(r.current)r.current.style.transform=`translate(${p.current.x-16}px,${p.current.y-16}px)`;f.current=requestAnimationFrame(tk);};window.addEventListener("mousemove",mv);f.current=requestAnimationFrame(tk);return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(f.current);};},[en]);if(!en)return null;return(<><div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}}/><div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}}/></>);}
export default function Telehealth(){
  return(<main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none"}}>
    <SEO
  title="Telehealth Psychiatry"
  description="HIPAA-compliant telehealth psychiatry appointments available throughout California. See Dr. Gill or Dr. Gondara from the comfort of your home. Insurance accepted. Next-day appointments available."
  path="/telehealth"
/>
<style>{CSS}</style><Cursor/><Hero/><Mq/><WhatWeTreat/><HowWorks/><CASection/><WhyCover/><FAQSec/><CTA/></main>);
}
function Hero(){
  const[on,sOn]=useState(false);useEffect(()=>{setTimeout(()=>sOn(true),80);},[]);
  return(
    <section className="relative min-h-[88vh] flex items-end overflow-hidden" style={{background:"linear-gradient(140deg,#263320 0%,#1E2B1C 55%,#192417 100%)"}}>
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden"><img src={P.consult1} alt="Telehealth" className="w-full h-full object-cover opacity-35" style={{filter:"saturate(0.6)"}}/><div className="absolute inset-0" style={{background:"linear-gradient(to right,#1E2B1C 0%,#1E2B1C 12%,transparent 58%)"}}/><div className="absolute inset-0" style={{background:"linear-gradient(to top,#1E2B1C 0%,transparent 55%)"}}/></div>
      {[{t:"10%",l:"52%",s:400,o:0.10,d:"0s"},{t:"60%",l:"5%",s:260,o:0.07,d:"5s"}].map((o,i)=>(<div key={i} className="absolute rounded-full pointer-events-none" style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(168,197,154,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}}/>))}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{writingMode:"vertical-rl",animation:"fadeUp 1s ease 0.8s both"}}><span className="w-px h-16 bg-[#A8C59A]/40"/><span className="text-[9px] tracking-[0.3em] uppercase text-[#A8C59A]/50">Available · All of California</span><span className="w-px h-16 bg-[#A8C59A]/40"/></div>
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#A8C59A]/40 bg-[#A8C59A]/8 px-4 py-2 mb-7 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"100ms"}}><span className="w-1.5 h-1.5 rounded-full bg-[#A8C59A] animate-pulse"/><span className="text-[10px] tracking-[0.24em] uppercase text-[#A8C59A] font-semibold">Available Statewide · All of California</span></div>
          <h1 className={`text-[48px] md:text-[62px] xl:text-[74px] text-[#F0EDE8] leading-[0.98] mb-5 transition-all duration-900 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"200ms"}}>Your Psychiatrist.<br/><em className="italic text-[#A8C59A]">Wherever</em><br/>You Are.</h1>
          <p className={`text-[#A8B89E] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"440ms"}}>Access HIPAA-compliant telehealth appointments with our providers from anywhere in California. The same level of care and attention—delivered conveniently from your home, office, or wherever you're most comfortable.</p>
          <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"540ms"}}>
            <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#6B7C5E] text-[#F0EDE8] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#7D9170] transition-colors duration-300"><Ph/> Book Telehealth Visit <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
            <a href="#how-it-works" className="flex items-center gap-3 border border-[#A8C59A]/40 text-[#A8C59A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#A8C59A] hover:bg-[#A8C59A]/10 transition-all duration-300">How It Works ↓</a>
          </div>
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"640ms"}}>
            {["All of California","HIPAA-Compliant","Insurance Covered","Next-Day Available"].map(t=>(<span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#A8C59A]/25 text-[#A8C59A]/60 px-3 py-1.5">{t}</span>))}
          </div>
        </div>
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"380ms"}}>
          {[{val:"All of California",lab:"No location restrictions",sub:""},{val:"HIPAA Compliant",lab:"Secure, Private Visits",sub:""},{val:"Same Quality",lab:"Consistent with in-person visits",sub:""}].map((c,i)=>(<div key={c.lab} className="bg-[#1E2B1C]/60 border border-[#A8C59A]/20 px-6 py-5 flex items-center gap-5 w-full max-w-xs" style={{animation:`fadeUp 0.8s ease ${0.5+i*0.12}s both`}}><p className="text-3xl text-[#A8C59A] flex-shrink-0" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{c.val}</p><div><p className="text-[#F0EDE8] text-sm font-medium">{c.lab}</p><p className="text-[#A8B89E] text-xs font-light mt-0.5">{c.sub}</p></div></div>))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{background:"linear-gradient(to top,#FDFAF6,transparent)"}}/>
    </section>
  );
}
function Mq(){const items=["Telehealth Psychiatry","Virtual Appointments","All of California","HIPAA-Compliant","Anxiety","Depression","ADHD","PTSD","Bipolar Disorder","Medication Management","Insurance Covered","Next-Day Scheduling"];const rep=[...items,...items];return(<div className="bg-[#1E2B1C] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{animation:"marquee 38s linear infinite",width:"max-content"}}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#A8B89E]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<svg width="6" height="6" viewBox="0 0 10 10" fill="#6B7C5E"><polygon points="5,0 10,5 5,10 0,5"/></svg></span>)}</div></div>);}
const TELEHEALTH_CONDITIONS=[
  {id:"anxiety",label:"Anxiety",sub:"GAD · Social · Panic",desc:"Anxiety disorders are common mental health conditions that can cause ongoing feelings of worry, fear, or unease, even when there is no immediate danger present. These feelings may occur occasionally or become more persistent over time.\n\nPeople may experience excessive worry, restlessness, difficulty relaxing, or a sense of being \"on edge.\" Anxiety can also show up physically, such as a racing heart, muscle tension, or trouble sleeping.\n\nThere are several types of anxiety disorders, including generalized anxiety disorder, social anxiety, panic disorder, and specific phobias. Each can affect people in different ways.\n\nSymptoms may become more noticeable during times of stress or uncertainty and can impact daily routines, relationships, and overall well-being."},
  {id:"psychosis",label:"Psychosis",sub:"Hallucinations · Delusions",desc:"Psychosis is a mental health condition that affects how a person perceives reality. It can make it difficult to distinguish what is real from what is not.\n\nPeople may experience hallucinations, delusions, or confused thinking. It may also affect insight, making it harder to recognize that symptoms are part of a health condition.\n\nSymptoms can significantly impact daily functioning, relationships, and safety, and tend to require professional evaluation and support."},
  {id:"depression",label:"Depression",sub:"MDD · Persistent · Postpartum",desc:"Depression is a common mental health condition that affects how a person thinks, feels, and functions in daily life. Symptoms can range from mild to severe.\n\nPeople may experience persistent sadness, loss of interest in activities they once enjoyed, or a general sense of emotional heaviness.\n\nCommon symptoms include feelings of guilt or worthlessness, hopelessness, low energy, changes in sleep or appetite, and difficulty concentrating."},
  {id:"adhd",label:"ADHD",sub:"Adult Diagnosis & Management",desc:"ADHD is a neurodevelopmental condition that begins in childhood and can continue into adulthood. It can affect attention, energy levels, and impulse control in daily life.\n\nPeople with ADHD may find it harder to stay focused, follow through on tasks, or stay organized. Forgetfulness and procrastination are also common.\n\nADHD symptoms often become more noticeable during times of stress, lack of sleep, or when daily demands feel overwhelming."},
  {id:"ptsd",label:"PTSD and Trauma",sub:"Complex · Single-Event",desc:"Trauma and chronic stress can change how a person thinks, feels, and responds in everyday life. People may feel more anxious than usual, get startled easily, or feel like they are always on edge.\n\nIt is also common to avoid certain people, places, or situations that bring up reminders of what happened. Some people may also experience intrusive memories or trouble sleeping."},
  {id:"bipolar",label:"Bipolar Disorder",sub:"Type I · Type II",desc:"Bipolar disorder is characterized by significant shifts in mood, energy, and activity levels. Individuals may experience periods of elevated mood or mania, followed by depressive episodes.\n\nThese mood shifts can affect decision-making, relationships, and overall functioning. Without appropriate treatment, bipolar disorder may be associated with increased risk of substance use or self-harm."},
  {id:"ocd",label:"OCD",sub:"Obsessive-Compulsive Disorder",desc:"OCD is characterized by unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) that a person feels driven to repeat. These patterns can be distressing and interfere with daily life.\n\nSymptoms can feel more intense during periods of stress and may affect relationships, work, and daily functioning."},
  {id:"insomnia",label:"Insomnia",sub:"Chronic · Acute",desc:"Insomnia makes it difficult to fall asleep, stay asleep, or get restful sleep on a regular basis. It can affect energy, mood, and overall functioning during the day.\n\nInsomnia can be influenced by stress, anxiety, medical conditions, or lifestyle factors."},
  {id:"medmgmt",label:"Medication Management",sub:"Monitoring · Adjustment",desc:"Medication management involves the careful evaluation, prescription, and ongoing monitoring of psychiatric medications to support mental health treatment.\n\nTreatment plans are personalized and adjusted based on response and side effects. Ongoing follow-up may include monitoring effectiveness, making dosage adjustments, or changing medications when needed."},
];

function TelehealthCondAccordion({conditions,visible}){
  const[open,setOpen]=useState(null);
  return(
    <div className="space-y-2">
      {conditions.map((cond,i)=>(
        <div key={cond.id} className={`border transition-all duration-500 ${open===i?"border-[#6B7C5E]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#F5EEE4] hover:border-[#6B7C5E]/30"} ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`,transitionDuration:"600ms"}}>
          <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>setOpen(open===i?null:i)}>
            <div className="flex items-center gap-4">
              <span className="text-2xl flex-shrink-0">{cond.icon}</span>
              <div>
                <h3 className="text-[17px] font-medium text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{cond.label}</h3>
                <p className="text-[10px] tracking-[0.16em] uppercase text-[#6B7C5E] font-semibold mt-0.5">{cond.sub}</p>
              </div>
            </div>
            <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#6B7C5E] bg-[#6B7C5E] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#6B7C5E]"}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-[500px] pb-6":"max-h-0"}`}>
            <div className="px-6 pb-1">
              {cond.desc.split("\n\n").map((para,pi)=>(
                <p key={pi} className="text-[#7A6556] text-sm leading-relaxed font-light mb-3 last:mb-0">{para}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WhatWeTreat(){
  const[ref,v]=useReveal();
  return(<section className="py-24 px-5 md:px-10 bg-[#FDFAF6]"><div className="mx-auto max-w-7xl">
    <div ref={ref} className="text-center mb-14"><div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#6B7C5E]/50"/><svg width="7" height="7" viewBox="0 0 10 10" fill="#6B7C5E"><polygon points="5,0 10,5 5,10 0,5"/></svg><span className="w-12 h-px bg-[#6B7C5E]/50"/></div><h2 className={`text-5xl md:text-6xl text-[#2C1A0E] mb-4 transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>What We Treat <em className="italic text-[#6B7C5E]">via Telehealth</em></h2><p className={`text-[#7A6556] text-lg font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>Most conditions we treat in person can also be managed through telehealth for patients across California.</p></div>
    <TelehealthCondAccordion conditions={TELEHEALTH_CONDITIONS} visible={v}/>
    <div className={`mt-8 text-center transition-all duration-700 delay-700 ${v?"opacity-100":"opacity-0"}`}><p className="text-[#7A6556] text-sm font-light">Don't see your condition listed? <a href="/contact" className="text-[#6B7C5E] underline underline-offset-2 hover:text-[#B8925A] transition-colors">Contact us</a> — our clinical team treats a wide range of concerns through telehealth.</p></div>
  </div></section>);
}

function HowWorks(){
  const[ref,v]=useReveal();
  const steps=[{n:"01",t:"Call or Contact Us",d:"Reach out by phone or the contact form. We'll verify your insurance and schedule your telehealth appointment."},{n:"02",t:"Receive Secure Link",d:"A HIPAA-compliant video link is sent to your email before your session. No app download required — works in your browser."},{n:"03",t:"Meet Dr. Japsharan Gill or Dr. Shabeg Gondara",d:"Join from anywhere in California — home, office, or anywhere private. Your appointment runs exactly like an in-person visit."},{n:"04",t:"Ongoing Care",d:"Follow-up appointments, prescription management, and medication refills — all handled via telehealth without interruption."}];
  return(<section id="how-it-works" className="py-24 px-5 md:px-10" style={{background:"linear-gradient(140deg,#263320 0%,#1E2B1C 100%)"}}><div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
  <div className="relative mx-auto max-w-7xl">
    <div ref={ref} className="text-center mb-16"><div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#A8C59A]/40"/><svg width="7" height="7" viewBox="0 0 10 10" fill="#A8C59A"><polygon points="5,0 10,5 5,10 0,5"/></svg><span className="w-12 h-px bg-[#A8C59A]/40"/></div><h2 className={`text-5xl md:text-6xl text-[#F0EDE8] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>How Telehealth <em className="italic text-[#A8C59A]">Works</em></h2></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative"><div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#A8C59A]/20 via-[#A8C59A]/50 to-[#A8C59A]/20"/>
    {steps.map((s,i)=>(<div key={s.n} className={`group text-center transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*140}ms`,transitionDuration:"700ms"}}><div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto"><div className="absolute inset-0 rounded-full border-2 border-[#A8C59A]/30 group-hover:border-[#A8C59A] transition-colors duration-500"/><div className="absolute inset-[6px] rounded-full bg-[#A8C59A]/8 group-hover:bg-[#A8C59A]/15 transition-all duration-500"/><span className="text-2xl text-[#A8C59A]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{s.n}</span></div><h3 className="text-xl text-[#F0EDE8] mb-3 group-hover:text-[#A8C59A] transition-colors duration-300" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{s.t}</h3><p className="text-[#A8B89E] text-sm leading-relaxed font-light max-w-[210px] mx-auto">{s.d}</p></div>))}
    </div>
    <div className={`mt-14 text-center transition-all duration-700 delay-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}><a href="tel:5105984921" className="group inline-flex items-center gap-3 bg-[#6B7C5E] text-[#F0EDE8] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#7D9170] transition-colors duration-300"><Ph/> Schedule Your Telehealth Visit <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a></div>
  </div></section>);
}
function CASection(){
  const[ref,v]=useReveal();
  const cities=["Los Angeles","San Diego","San Francisco","Sacramento","San Jose","Oakland","Fresno","Bakersfield","Long Beach","Anaheim","Santa Ana","Riverside","Stockton","Chula Vista","Irvine","Fremont","San Bernardino","Modesto","Fontana","Moreno Valley","Glendale","Huntington Beach","Santa Clarita","Garden Grove","Santa Rosa","Oceanside","Rancho Cucamonga","Ontario","Lancaster","Elk Grove","Corona","Palmdale","Salinas","Pomona","Hayward","Sunnyvale","Escondido","Torrance","Pasadena","Orange"];
  return(<section className="py-24 px-5 md:px-10 bg-[#F5EEE4]"><div className="mx-auto max-w-7xl">
    <div ref={ref} className="text-center mb-14"><div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#6B7C5E]/50"/><svg width="7" height="7" viewBox="0 0 10 10" fill="#6B7C5E"><polygon points="5,0 10,5 5,10 0,5"/></svg><span className="w-12 h-px bg-[#6B7C5E]/50"/></div><h2 className={`text-5xl md:text-6xl text-[#2C1A0E] mb-4 transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Serving All of <em className="italic text-[#6B7C5E]">California</em></h2><p className={`text-[#7A6556] text-base font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>If you're located in California, our clinical team can see you—no matter where you are in the state.</p></div>
    <div className={`flex flex-wrap gap-2 justify-center transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
      {cities.map((c,i)=>(<span key={c} className="text-[10px] tracking-widest uppercase border border-[#6B7C5E]/25 text-[#6B7C5E] px-3 py-1.5 hover:bg-[#6B7C5E]/10 transition-colors duration-200" style={{transitionDelay:`${i*20}ms`}}>{c}</span>))}
      <span className="text-[10px] tracking-widest uppercase border border-[#B8925A]/30 text-[#B8925A] px-3 py-1.5 bg-[#B8925A]/5">+ All Other CA Cities</span>
    </div>
  </div></section>);
}
function WhyCover(){
  const[ref,v]=useReveal();
  const items=[{t:"01 | Same Clinical Care",d:"Evidence-based, structured treatment — the same standard of care as in-person appointments, delivered via secure video."},{t:"02 | Access",d:"Insurance accepted + appointment availability confirmed before your visit. We'll help you understand your coverage."},{t:"03 | Experience",d:"Private, comfortable, and secure. Attend your appointment from anywhere you feel at ease."},{t:"04 | Convenience",d:"No travel required. Flexible access for patients across all of California."}];
  return(<section className="py-24 px-5 md:px-10 bg-[#FDFAF6]"><div className="mx-auto max-w-7xl">
    <div ref={ref} className="text-center mb-14"><div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div><h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>What to Expect from <em className="italic text-[#B8925A]">Telehealth</em></h2><p className={`text-[#7A6556] text-base font-light mt-4 transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>Care That Meets You Where You Are</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((it,i)=>(<div key={it.t} className={`group bg-[#F5EEE4] border border-[#E8D5BE] p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_14px_48px_rgba(184,146,90,0.13)] hover:border-[#B8925A]/50 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*110}ms`,transitionDuration:"700ms"}}><div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left relative"/><p className="text-[32px] text-[#B8925A]/20 leading-none mb-4" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{String(i+1).padStart(2,"0")}</p><h3 className="text-xl text-[#2C1A0E] mb-3" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{it.t}</h3><p className="text-[#7A6556] text-sm leading-relaxed font-light">{it.d}</p></div>))}
    </div>
  </div></section>);
}
function FAQSec(){
  const[ref,v]=useReveal();const[open,sOpen]=useState(null);
  const faqs=[
    {q:"Can I be seen if I'm new to psychiatry?",a:"Yes. We provide full psychiatric evaluations for both new and existing patients."},
    {q:"What if telehealth isn't right for me?",a:"Your provider will determine the best fit and discuss other options if needed."},
    {q:"How soon can I be seen?",a:"Appointment availability varies, but telehealth visits are offered across California as scheduling allows."},
    {q:"What happens after my first visit?",a:"Your provider will create a treatment plan, which may include follow-ups or ongoing care."},
    {q:"Can I switch between telehealth and in-person visits?",a:"Yes. In many cases, patients can move between virtual and in-person care."},
    {q:"Is telehealth private?",a:"Yes. Sessions are confidential. We recommend a private space for your visit."},
    {q:"Do I need special technology?",a:"No. A phone, tablet, or computer with internet access is all you need."},
  ];
  return(<section className="py-24 px-5 md:px-10 bg-[#F5EEE4]"><div className="mx-auto max-w-4xl"><div ref={ref} className={`text-center mb-12 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Telehealth <em className="italic text-[#B8925A]">FAQs</em></h2></div>
  <div className="space-y-3">{faqs.map((f,i)=>(<div key={f.q} className={`border transition-all duration-500 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"} ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`,transitionDuration:"600ms"}}><button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>sOpen(open===i?null:i)}><span className="text-[15px] font-medium text-[#2C1A0E]">{f.q}</span><span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button><div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-48 pb-6":"max-h-0"}`}><p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{f.a}</p></div></div>))}</div></div></section>);
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
          Ready for<br/><em className="italic text-[#B8925A]">Telehealth?</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>Schedule your telehealth visit with our clinical team today.</p>
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
const CSS=`@media (pointer: fine){*{cursor:none !important;}}@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}@keyframes floatOrb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-30px) scale(1.06)}66%{transform:translate(-14px,18px) scale(0.94)}}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`;