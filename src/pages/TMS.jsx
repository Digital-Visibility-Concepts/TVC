import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";
import SEO from '../components/SEO';

const P={drGill:"/assets/Gill_Japsharan.jpg",drGillIn:"/assets/dr J gill-inside.jpg",interior:"/assets/inetrioir clinic.jpg",inside:"/assets/inside clinic1.jpg",office:"/assets/office.jpg"};
function useReveal(t=0.12){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});o.observe(el);return()=>o.disconnect();},[t]);return[ref,v];}
function Cursor(){const d=useRef(null),r=useRef(null),p=useRef({x:0,y:0}),f=useRef(null);useEffect(()=>{const mv=e=>{p.current={x:e.clientX,y:e.clientY};};const tk=()=>{if(d.current)d.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;if(r.current)r.current.style.transform=`translate(${p.current.x-16}px,${p.current.y-16}px)`;f.current=requestAnimationFrame(tk);};window.addEventListener("mousemove",mv);f.current=requestAnimationFrame(tk);return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(f.current);};},[]);return(<><div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}}/><div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}}/></>);}
export default function TMS(){
  return(<main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none",overflowX:"hidden"}}>
    <SEO
  title="TMS Therapy"
  description="FDA-cleared Transcranial Magnetic Stimulation (TMS) therapy coming soon to Tri-Valley Clinic in Fremont, CA. Non-invasive treatment for depression. No medication, no side effects. Join the waitlist."
  path="/tms"
/>
<style>{CSS}</style><Cursor/><Hero/><Mq/><WhatIsTMS/><HowWorks/><WaitlistSec/><FAQSec/><CTA/></main>);
}
function Hero(){
  const[on,sOn]=useState(false);useEffect(()=>{setTimeout(()=>sOn(true),80);},[]);
  return(
    <section className="relative min-h-[88vh] flex items-end overflow-hidden" style={{background:"linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}/>
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden"><img src="/assets/tms-img.jpg" alt="Clinic" className="w-full h-full object-cover opacity-28" style={{filter:"saturate(0.65)"}}/><div className="absolute inset-0" style={{background:"linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)"}}/><div className="absolute inset-0" style={{background:"linear-gradient(to top,#2C1A0E 0%,transparent 55%)"}}/></div>
      {[{t:"10%",l:"52%",s:400,o:0.12,d:"0s"},{t:"60%",l:"5%",s:260,o:0.08,d:"5s"}].map((o,i)=>(<div key={i} className="absolute rounded-full pointer-events-none" style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}}/>))}
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#C9A46A]/50 bg-[#C9A46A]/10 px-4 py-2 mb-7 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"100ms"}}>
            <span className="w-2 h-2 rounded-full bg-[#C9A46A] animate-pulse"/><span className="text-[10px] tracking-[0.24em] uppercase text-[#C9A46A] font-bold">Coming Soon to Tri-Valley Clinic</span>
          </div>
          <h1 className={`text-[48px] md:text-[62px] xl:text-[74px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"200ms"}}>
            TMS Therapy:<br/><em className="italic text-[#C9A46A]">When Depression Doesn't</em><br/>Respond to Medication.
          </h1>
          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"440ms"}}>A non-invasive, FDA-cleared treatment for depression when medication alone hasn't been effective. Offered as part of our comprehensive psychiatric care at Tri-Valley Clinic. Available soon at Tri-Valley Clinic – join the waitlist today.</p>
          <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"540ms"}}>
            <a href="#waitlist" className="group flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">Join the Waitlist <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
            <a href="#what-is-tms" className="flex items-center gap-3 border border-[#B8925A]/50 text-[#C9A46A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300">Learn More ↓</a>
          </div>
          <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"640ms"}}>
            {["FDA-Cleared","No Medication Required","No Systemic Side Effects","Covered by Many Insurances"].map(t=>(<span key={t} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{t}</span>))}
          </div>
        </div>
        <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-1000 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:"380ms"}}>
          {[{val:"FDA",lab:"Cleared Treatment",sub:"Approved for MDD since 2008"},{val:"~6wk",lab:"Treatment Course",sub:"~30 min sessions, 5x per week"},{val:"50–60%",lab:"Response Rate",sub:"In treatment-resistant patients"}].map((c,i)=>(<div key={c.lab} className="bg-[#FDFAF6]/8 border border-[#E8D5BE]/15 px-6 py-5 flex items-center gap-5 w-full max-w-xs" style={{animation:`fadeUp 0.8s ease ${0.5+i*0.12}s both`}}><p className="text-3xl text-[#C9A46A] flex-shrink-0" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{c.val}</p><div><p className="text-[#F0E8DA] text-sm font-medium">{c.lab}</p><p className="text-[#A89880] text-xs font-light mt-0.5">{c.sub}</p></div></div>))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{background:"linear-gradient(to top,#FDFAF6,transparent)"}}/>
    </section>
  );
}
function Mq(){const items=["TMS Therapy","Transcranial Magnetic Stimulation","Treatment-Resistant Depression","Non-Invasive","No Medication","FDA-Cleared","Coming Soon","Join the Waitlist","Tri-Valley Clinic · Fremont"];const rep=[...items,...items];return(<div className="bg-[#2C1A0E] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{animation:"marquee 36s linear infinite",width:"max-content"}}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<Dm/></span>)}</div></div>);}
function WhatIsTMS(){
  const[ref,v]=useReveal();
  return(<section id="what-is-tms" className="py-24 px-5 md:px-10 bg-[#FDFAF6]"><div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <div ref={ref} className={`transition-all duration-800 ${v?"opacity-100 translate-x-0":"opacity-0 -translate-x-10"}`}>
      <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">The Science</span></div>
      <h2 className="text-5xl md:text-6xl text-[#2C1A0E] mb-6" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.1}}>What Is <em className="italic text-[#B8925A]">TMS</em><br/>Therapy?</h2>
      <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-4">TMS (Transcranial Magnetic Stimulation) is a non-invasive treatment that uses gentle magnetic pulses to stimulate areas of the brain involved in mood regulation.</p>
      <p className="text-[#7A6556] text-base leading-[1.95] font-light mb-8">Treatments are done in-office while you remain awake and alert—no anesthesia, no downtime.</p>

      {/* Who TMS May Help */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.24em] uppercase text-[#B8925A] font-bold mb-3">Who TMS May Help</p>
        <p className="text-[#7A6556] text-sm font-light mb-3">TMS may be appropriate for individuals experiencing:</p>
        <ul className="space-y-2.5">
          {["Depression that has not improved with medication","Difficulty tolerating antidepressant side effects","Ongoing symptoms despite therapy or treatment","Interest in a non-medication treatment option"].map(t=>(
            <li key={t} className="flex items-start gap-3 text-sm text-[#7A6556] font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2"/>{t}
            </li>
          ))}
        </ul>
      </div>

      {/* Potential Benefits */}
      <div>
        <p className="text-[11px] tracking-[0.24em] uppercase text-[#B8925A] font-bold mb-3">Potential Benefits of TMS</p>
        <ul className="space-y-2.5">
          {["May improve symptoms of depression","Non-medication treatment option","Well tolerated by most patients","No systemic side effects like oral medications","No downtime after sessions"].map(t=>(
            <li key={t} className="flex items-start gap-3 text-sm text-[#7A6556] font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2"/>{t}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className={`relative transition-all duration-800 delay-200 ${v?"opacity-100 translate-x-0":"opacity-0 translate-x-10"}`}>
      <div className="absolute top-8 -right-4 left-8 bottom-0 bg-[#F0E8DA] -z-10"/><div className="absolute top-0 right-0 w-[3px] h-24 bg-[#B8925A]"/>
      <div className="overflow-hidden" style={{height:"460px"}}><img src="/assets/tms-img.jpg" alt="TMS Therapy at Tri-Valley Clinic" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" style={{objectPosition:"center top"}}/></div>
      <div className="absolute -bottom-6 -left-4 bg-[#B8925A] text-[#FDFAF6] px-6 py-5 shadow-xl" style={{animation:"floatBadge 5s ease-in-out infinite"}}><p className="text-2xl font-light mb-0.5" style={{fontFamily:"'Cormorant Garamond',serif"}}>FDA-Cleared</p><p className="text-[9px] tracking-[0.2em] uppercase opacity-80">Since 2008 for MDD</p></div>
    </div>
  </div></section>);
}

function HowWorks(){
  const[ref,v]=useReveal();
  const steps=[
    {n:"01",t:"Consultation & Brain Mapping",d:"A psychiatric evaluation determines whether TMS is appropriate for you. If TMS is recommended, a prior authorization is submitted to your insurance provider before treatment begins. This process can take some time depending on your plan."},
    {n:"02",t:"Treatment Sessions",d:"During the initial visit, a brief brain mapping session identifies the area of the brain targeted for treatment. Each session lasts approximately 20–40 minutes. A treatment coil is placed gently on the head to deliver focused magnetic pulses. You remain awake, alert, and comfortable throughout."},
    {n:"03",t:"Treatment Schedule",d:"TMS is typically administered 5 days per week over about 6 weeks. Patients are able to drive themselves and return to normal activities immediately after each session. If time is of the essence, the frequency of these sessions are flexible to make sure you get the most out of your treatment while accommodating your schedule."},
    {n:"04",t:"Progress & Maintenance",d:"Many patients begin noticing changes within the first few weeks of treatment. In some cases, a maintenance schedule may be recommended based on individual response."},
  ];
  return(<section className="py-24 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}><div className="mx-auto max-w-7xl">
    <div ref={ref} className="text-center mb-16">
      <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
      <h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>What to Expect <em className="italic text-[#C9A46A]">with TMS Therapy</em></h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
      <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#B8925A]/20 via-[#B8925A]/50 to-[#B8925A]/20"/>
      {steps.map((s,i)=>(<div key={s.n} className={`group text-center transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`} style={{transitionDelay:`${i*140}ms`,transitionDuration:"700ms"}}>
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/30 group-hover:border-[#B8925A] transition-colors duration-500"/>
          <div className="absolute inset-[6px] rounded-full bg-[#B8925A]/8 group-hover:bg-[#B8925A]/15 transition-all duration-500"/>
          <span className="text-2xl text-[#C9A46A]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{s.n}</span>
        </div>
        <h3 className="text-xl text-[#F0E8DA] mb-3 group-hover:text-[#C9A46A] transition-colors duration-300" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>{s.t}</h3>
        <p className="text-[#7A6556] text-sm leading-relaxed font-light max-w-[210px] mx-auto">{s.d}</p>
      </div>))}
    </div>
  </div></section>);
}

function TMSAccordionSec(){
  const[ref,v]=useReveal();
  const[open,setOpen]=useState(null);
  const sections=[
    {
      t:"How TMS Works",
      body:`TMS sends gentle magnetic pulses to specific areas of the brain that influence mood and motivation. Most patients notice:

• No anesthesia or sedation
• Minimal side effects  
• Outpatient sessions that fit your schedule

TMS is often used with medications to boost their effects, giving your treatment plan a helpful extra push.`
    },
    {
      t:"What to Expect During TMS",
      body:`We know trying something new can feel daunting. Here's what most patients experience:

First Consultation: We review your medical history, current medications, and treatment goals.

Comfortable Setup: You'll sit in a cozy chair while the TMS device is positioned near your head.

Gentle Pulses: You'll feel a light tapping sensation — you should not be in any pain or discomfort. Most people can read, listen to music, or just relax during sessions.

Structured Treatment Plan: TMS therapy typically involves about 36 sessions, usually spread over several weeks. Each session is short and outpatient, so it fits into your routine.

No Downtime: Sessions usually last 20–40 minutes, and you can return to your day immediately afterward.

Gradual Progress: Changes are usually noticed over several weeks. We check in regularly and adjust your plan to make sure each session is helping.`
    },
    {
      t:"Personalized Brain Care",
      body:`No two brains are alike, so neither is our approach. We focus on what works for you:

Customized Brain Mapping — Your sessions are designed around your brain activity and personal goals, not a one-size-fits-all schedule.

Integrated Support — TMS works best when combined with counseling, lifestyle guidance, and your current medications.

Comfort & Convenience — From relaxing treatment rooms to flexible scheduling, every part of your experience is made to feel easy and supportive.

Progress You Can See — We check in regularly and adjust your treatment so every session helps you move forward.`
    },
    {
      t:"Who Can Benefit",
      body:`TMS is FDA-cleared for treatment-resistant depression and has shown promising results for anxiety, PTSD, and other mood disorders. It's especially helpful when medications alone aren't enough, giving your brain a gentle nudge toward improvement.

You may be a good candidate if you:
• Have been diagnosed with Major Depressive Disorder (MDD)
• Have tried one or more antidepressants without adequate relief
• Prefer to avoid or reduce medication
• Are experiencing medication side effects that affect quality of life
• Are looking for a proven, evidence-based alternative`
    },
    {
      t:"Insurance & Coverage",
      body:`Many insurance plans cover TMS therapy, but approval and timing can vary. Some patients may need prior authorization or a few weeks to coordinate coverage.

At Tri-Valley Clinic, we'll help you navigate the insurance process and answer any questions along the way, so you know what to expect before starting treatment.

Tip: Bringing your insurance information to your consultation can speed up the process.

Call us at (510) 598-4921 and our team will verify your benefits before your first appointment.`
    },
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="text-center mb-12">
          <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>TMS <em className="italic text-[#B8925A]">FAQs</em></h2>
          <p className={`text-[#7A6556] text-base font-light mt-4 max-w-lg mx-auto transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>Click any section to expand.</p>
        </div>
        <div className="space-y-3">
          {sections.map((s,i)=>(
            <div key={s.t} className={`border transition-all duration-500 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#F5EEE4] hover:border-[#B8925A]/30"} ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`,transitionDuration:"600ms"}}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>setOpen(open===i?null:i)}>
                <span className="text-[17px] font-medium text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif"}}>{s.t}</span>
                <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-[600px] pb-6":"max-h-0"}`}>
                <div className="px-6 space-y-2">
                  {s.body.split("\n").map((line,j)=>(
                    line.trim()===""
                      ? <div key={j} className="h-2"/>
                      : <p key={j} className={`text-[#7A6556] text-sm leading-relaxed font-light ${line.startsWith("•")?"pl-3":""}`}>{line}</p>
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


function WhoFor(){
  const[ref,v]=useReveal();
  const yes=["Diagnosed with Major Depressive Disorder (MDD)","Tried 1+ antidepressants without adequate relief","Not a candidate for or prefer to avoid medication","Experiencing medication side effects that affect quality of life","Looking for a proven, evidence-based alternative"];
  return(<section className="py-24 px-5 md:px-10 bg-[#F5EEE4]"><div className="mx-auto max-w-4xl">
    <div ref={ref} className="text-center mb-12"><div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div><h2 className={`text-5xl md:text-6xl text-[#2C1A0E] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Who Is TMS <em className="italic text-[#B8925A]">Right For?</em></h2></div>
    <div className={`border border-[#E8D5BE] bg-[#FDFAF6] p-10 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
      <p className="text-[#7A6556] text-base font-light mb-7 leading-relaxed">TMS is FDA-cleared for adults with Major Depressive Disorder who have not responded to one or more antidepressant medications. You may be a good candidate if you:</p>
      <ul className="space-y-4 mb-8">{yes.map(t=>(<li key={t} className="flex items-start gap-3 text-sm text-[#7A6556]"><div className="w-6 h-6 border border-[#6B7C5E]/40 flex items-center justify-center text-[#6B7C5E] flex-shrink-0 mt-0.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>{t}</li>))}</ul>
      <div className="border-t border-[#E8D5BE] pt-6"><p className="text-[#7A6556] text-sm font-light mb-5">Not sure if TMS is right for you? Dr. Japsharan Gill or Dr. Shabeg Gondara evaluates every patient individually. Join the waitlist and we'll reach out when TMS launches to schedule your consultation.</p><a href="#waitlist" className="inline-flex items-center gap-3 bg-[#B8925A] text-[#FDFAF6] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">Join the TMS Waitlist →</a></div>
    </div>
  </div></section>);
}
function WaitlistSec(){
  const[ref,v]=useReveal();
  const[form,setForm]=useState({name:"",phone:"",email:"",note:""});
  const[sent,sSent]=useState(false);
  const[sending,setSending]=useState(false);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!form.name||!form.email) return;
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({
          access_key:"df5ab724-9bdf-459e-94e1-ebb0fe8d520b",
          name:    form.name,
          phone:   form.phone,
          email:   form.email,
          message: form.note||"No additional notes",
          subject: `TMS Waitlist — ${form.name} | Tri-Valley Clinic`,
          _replyto: form.email,
        }),
      });
      if(res.ok){sSent(true);}
      else{alert("Something went wrong. Please call us at (510) 598-4921.");}
    } catch {
      alert("Network error. Please call us at (510) 598-4921.");
    } finally {
      setSending(false);
    }
  };
  return(<section id="waitlist" className="py-24 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}>
    <div className="mx-auto max-w-4xl">
      <div ref={ref} className="text-center mb-12"><div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-2 h-2 rounded-full bg-[#C9A46A] animate-pulse"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#C9A46A] font-semibold">TMS Launching Soon</span></div><h2 className={`text-5xl md:text-6xl text-[#F0E8DA] transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Join the <em className="italic text-[#C9A46A]">Waitlist</em></h2><p className={`text-[#A89880] text-base font-light mt-4 max-w-md mx-auto transition-all duration-700 delay-200 ${v?"opacity-100":"opacity-0"}`}>Not sure if TMS is right for you? Our clinical team evaluates each patient individually. Join the waitlist and we'll contact you to schedule a consultation when appointments become available.</p></div>
      <div className={`border border-[#E8D5BE]/15 bg-[#F5EEE4]/5 transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent"/>
        <div className="p-8 md:p-12">
          {sent?(<div className="text-center py-10"><div className="w-16 h-16 border border-[#B8925A]/40 flex items-center justify-center text-[#B8925A] mx-auto mb-5"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="text-2xl text-[#F0E8DA] mb-2" style={{fontFamily:"'Cormorant Garamond',serif"}}>You're on the list!</h3><p className="text-[#A89880] text-sm font-light">We'll reach out as soon as TMS launches at Tri-Valley Clinic. Thank you for your interest.</p></div>):(
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/70 font-semibold block mb-2">Full Name *</label><input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="w-full bg-[#FDFAF6]/8 border border-[#E8D5BE]/20 px-4 py-3 text-[#F0E8DA] placeholder-[#7A6556] text-sm focus:outline-none focus:border-[#B8925A] transition-colors duration-300"/></div>
            <div><label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/70 font-semibold block mb-2">Phone Number</label><input type="tel" placeholder="(510) 000-0000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full bg-[#FDFAF6]/8 border border-[#E8D5BE]/20 px-4 py-3 text-[#F0E8DA] placeholder-[#7A6556] text-sm focus:outline-none focus:border-[#B8925A] transition-colors duration-300"/></div>
            <div className="md:col-span-2"><label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/70 font-semibold block mb-2">Email Address *</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required className="w-full bg-[#FDFAF6]/8 border border-[#E8D5BE]/20 px-4 py-3 text-[#F0E8DA] placeholder-[#7A6556] text-sm focus:outline-none focus:border-[#B8925A] transition-colors duration-300"/></div>
            <div className="md:col-span-2"><label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/70 font-semibold block mb-2">Anything You'd Like Us to Know</label><textarea rows={3} placeholder="e.g., medications tried, how long you've had depression..." value={form.note} onChange={e=>setForm({...form,note:e.target.value})} className="w-full bg-[#FDFAF6]/8 border border-[#E8D5BE]/20 px-4 py-3 text-[#F0E8DA] placeholder-[#7A6556] text-sm focus:outline-none focus:border-[#B8925A] transition-colors duration-300 resize-none"/></div>
            <div className="md:col-span-2"><button type="submit" disabled={sending} className="group w-full bg-[#B8925A] text-[#FDFAF6] py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">{sending?"Submitting...":(<>Join Waitlist — No Commitment <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></>)}</button></div>
          </form>)}
        </div>
      </div>
    </div>
  </section>);
}
function FAQSec(){
  const[ref,v]=useReveal();const[open,sOpen]=useState(null);
  const faqs=[
    {q:"Does TMS hurt?",a:"Most patients describe the sensation as a light tapping or clicking on the scalp. It is generally well tolerated, though mild discomfort or sensitivity may occur during the first few sessions. This usually improves as you adjust to treatment."},
    {q:"Can I continue taking my medications during TMS therapy?",a:"Yes. Most patients continue their current psychiatric medications during TMS treatment. Your provider will review your medications during your evaluation and make recommendations based on your individual care plan."},
    {q:"Will insurance cover TMS therapy?",a:"If TMS is recommended, our team will submit a prior authorization request to your insurance provider. Approval is required before treatment begins, and timing varies depending on your plan."},
    {q:"How long does it take to start treatment?",a:"After your evaluation, treatment begins once insurance authorization is approved. The timeline varies depending on your insurance provider."},
    {q:"When will I start to feel results?",a:"Many patients begin noticing improvements within the first few weeks of treatment, though response varies from person to person."},
    {q:"What happens after I finish treatment?",a:"Some patients maintain their improvement after the initial course, while others may benefit from maintenance sessions depending on their response and clinical recommendations."},
  ];
  return(<section className="py-24 px-5 md:px-10 bg-[#F5EEE4]"><div className="mx-auto max-w-4xl">
    <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
      <div className="flex items-center justify-center gap-3 mb-5"><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
      <h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>TMS <em className="italic text-[#B8925A]">FAQs</em></h2>
    </div>
    <div className="space-y-3">{faqs.map((f,i)=>(
      <div key={f.q} className={`border transition-all duration-500 ${open===i?"border-[#B8925A]/50 bg-[#FDFAF6]":"border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"} ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:`${i*55}ms`,transitionDuration:"600ms"}}>
        <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={()=>sOpen(open===i?null:i)}>
          <span className="text-[15px] font-medium text-[#2C1A0E]">{f.q}</span>
          <span className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${open===i?"border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45":"border-[#E8D5BE] text-[#B8925A]"}`}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
        </button>
        <div className={`overflow-hidden transition-all duration-400 ${open===i?"max-h-60 pb-6":"max-h-0"}`}><p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">{f.a}</p></div>
      </div>
    ))}</div>
  </div></section>);
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
          Don't Wait to<br/><em className="italic text-[#B8925A]">Feel Better.</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>TMS is launching soon at Tri-Valley Clinic. Join the waitlist and our team will reach out as soon as appointments open.</p>
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