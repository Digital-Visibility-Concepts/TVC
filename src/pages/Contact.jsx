/* eslint-disable react-hooks/static-components */
import { useEffect, useRef, useState } from "react";
import IMAGES from "../constants/images";

const REASONS=["Psychiatric Evaluation","ADHD Evaluation & Treatment","Anxiety or Depression","PTSD / Trauma","Bipolar Disorder","OCD","Insomnia","Medication Management","Medical Weight Loss / GLP-1","IV Hydration Therapy","TMS Therapy","Telehealth Appointment","Insurance Question","Financing / Cherry","General Inquiry"];

function useReveal(t=0.12){const ref=useRef(null);const[v,sv]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});o.observe(el);return()=>o.disconnect();},[t]);return[ref,v];}
function Cursor(){const d=useRef(null),r=useRef(null),p=useRef({x:0,y:0}),f=useRef(null);useEffect(()=>{const mv=e=>{p.current={x:e.clientX,y:e.clientY};};const tk=()=>{if(d.current)d.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;if(r.current)r.current.style.transform=`translate(${p.current.x-16}px,${p.current.y-16}px)`;f.current=requestAnimationFrame(tk);};window.addEventListener("mousemove",mv);f.current=requestAnimationFrame(tk);return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(f.current);};},[]);return(<><div ref={d} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}}/><div ref={r} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}}/></>);}

export default function Contact(){
  return(<main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none"}}><style>{CSS}</style><Cursor/><Hero/><Marquee/><MainSection/><PhotoRow/><MapSection/><FAQ/><CTA/></main>);
}

function Hero(){
  const[on,sOn]=useState(false);useEffect(()=>{setTimeout(()=>sOn(true),80);},[]);
  return(
    <section className="relative min-h-[80vh] flex items-end overflow-hidden" style={{background:"linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}/>
      {/* BG — use both-doctors-clinic NOT receptionist */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] overflow-hidden">
        {/* 🔄 Photo 15 → both-doctors-clinic.jpg (NOT receptionist) */}
        <img src={IMAGES.DR_GILL_HERO} alt="Dr. Japsharan Gill" className="w-full h-full object-cover opacity-35" style={{filter:"saturate(0.70)", objectPosition:"center 12%"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,#2C1A0E 0%,#2C1A0E 12%,transparent 58%)"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,#2C1A0E 0%,transparent 50%)"}}/>
      </div>
      {[{t:"8%",l:"52%",s:440,o:0.12,d:"0s"},{t:"62%",l:"6%",s:260,o:0.08,d:"4s"}].map((o,i)=>(
        <div key={i} className="absolute rounded-full pointer-events-none" style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}}/>
      ))}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{writingMode:"vertical-rl",animation:"fadeUp 1s ease 0.8s both"}}>
        <span className="w-px h-16 bg-[#B8925A]/40"/><span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A]/50">We're Here to Help</span><span className="w-px h-16 bg-[#B8925A]/40"/>
      </div>
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <div>
          <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/8 px-4 py-2 mb-7 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"100ms"}}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/><span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Mon–Fri · 9:30 AM–5:30 PM · Same-Day Response</span>
          </div>
          <h1 className={`text-[50px] md:text-[66px] xl:text-[78px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"200ms"}}>
            Let's Start<br/><em className="italic text-[#C9A46A]">Your Journey.</em>
          </h1>
          <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"440ms"}}>
            Reach out by phone, email, or form below. Dr. Gill and Dr. Gondara's team responds same-day. Your first consultation is completely free.
          </p>
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`} style={{transitionDelay:"560ms"}}>
            {[
              {icon:<Ph/>,  val:"(510) 598-4921",             lab:"Call Us",  href:"tel:5105984921"},
              {icon:<Mail/>, val:"contact@trivalleyclinic.com",lab:"Email Us", href:"mailto:contact@trivalleyclinic.com"},
              {icon:<Clock/>,val:"Mon–Fri 9:30–5:30",         lab:"Hours",    href:"#map"},
            ].map(i=>(
              <a key={i.lab} href={i.href} className="group flex items-center gap-3 bg-[#FDFAF6]/8 border border-[#E8D5BE]/15 px-4 py-3.5 hover:bg-[#FDFAF6]/15 hover:border-[#B8925A]/30 transition-all duration-300">
                <div className="text-[#B8925A] flex-shrink-0">{i.icon}</div>
                <div><p className="text-[8px] tracking-[0.18em] uppercase text-[#A89880]/60">{i.lab}</p><p className="text-[#E8D5BE] text-xs font-medium truncate">{i.val}</p></div>
              </a>
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

function Marquee(){
  const items=["Free Consultation","Same-Day Response","Next-Day Appointments","Accepting New Patients","Telehealth Statewide CA","Insurance Verified Free","Cherry Financing Available","Mon–Fri 9:30–5:30 PM","680 Mowry Ave · Fremont","Dr. Gill & Dr. Gondara"];
  const rep=[...items,...items];
  return(<div className="bg-[#2C1A0E] py-3.5 overflow-hidden"><div className="flex whitespace-nowrap" style={{animation:"marquee 36s linear infinite",width:"max-content"}}>{rep.map((t,i)=><span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">{t}<Dm/></span>)}</div></div>);
}

function MainSection(){
  const[ref,v]=useReveal();
  const[form,setForm]=useState({name:"",phone:"",email:"",reason:"",message:""});
  const[sent,sSent]=useState(false);
  const[errors,setErrors]=useState({});
  const validate=()=>{const e={};if(!form.name.trim())e.name="Name is required";if(!form.phone.trim())e.phone="Phone number is required";if(!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email))e.email="Valid email is required";if(!form.reason)e.reason="Please select a reason";if(!form.message.trim())e.message="Message is required";return e;};
  const handleSubmit=e=>{e.preventDefault();const errs=validate();if(Object.keys(errs).length){setErrors(errs);return;}sSent(true);};
  const Field=({label,error,children})=>(<div><label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/80 font-semibold block mb-2">{label}</label>{children}{error&&<p className="text-red-400 text-[10px] mt-1">{error}</p>}</div>);
  const ic=`w-full bg-[#FDFAF6] border border-[#E8D5BE] px-4 py-3.5 text-sm text-[#2C1A0E] placeholder-[#7A6556]/40 focus:outline-none focus:border-[#B8925A] transition-colors duration-300 rounded-none`;
  return(
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 xl:gap-20">
          {/* Info cards */}
          <div ref={ref} className={`transition-all duration-800 ${v?"opacity-100 translate-x-0":"opacity-0 -translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-6"><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Get in Touch</span></div>
            <h2 className="text-5xl md:text-[56px] text-[#2C1A0E] mb-4" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.08}}>
              We'd Love to<br/><em className="italic text-[#B8925A]">Hear From You.</em>
            </h2>
            <p className="text-[#7A6556] text-base font-light leading-relaxed mb-10">Dr. Gill and Dr. Gondara's team responds same-day during business hours.</p>
            <div className="space-y-4">
              <InfoCard icon={<Ph/>} label="Phone"><a href="tel:5105984921" className="text-[#2C1A0E] font-medium hover:text-[#B8925A] transition-colors">(510) 598-4921</a><p className="text-[#7A6556] text-xs font-light mt-0.5">Mon–Fri · 9:30 AM – 5:30 PM</p></InfoCard>
              <InfoCard icon={<Mail/>} label="Email"><a href="mailto:contact@trivalleyclinic.com" className="text-[#2C1A0E] font-medium hover:text-[#B8925A] transition-colors text-sm">contact@trivalleyclinic.com</a><p className="text-[#7A6556] text-xs font-light mt-0.5">We respond within one business day</p></InfoCard>
              <InfoCard icon={<Location/>} label="Location"><a href="https://maps.google.com/?q=680+Mowry+Ave+Fremont+CA+94536" target="_blank" rel="noopener noreferrer" className="text-[#2C1A0E] font-medium hover:text-[#B8925A] transition-colors">680 Mowry Ave, Fremont, CA 94536</a><p className="text-[#7A6556] text-xs font-light mt-0.5">Free parking available on-site</p></InfoCard>
              <InfoCard icon={<Clock/>} label="Office Hours">
                <div className="space-y-1.5">
                  {[["Monday – Friday","9:30 AM – 5:30 PM"],["Saturday – Sunday","Closed"]].map(([d,t])=>(
                    <div key={d} className="flex justify-between gap-4"><span className="text-sm text-[#7A6556] font-light">{d}</span><span className="text-sm text-[#2C1A0E] font-medium">{t}</span></div>
                  ))}
                  <div className="flex items-center gap-2 pt-2 mt-1 border-t border-[#E8D5BE]"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7C5E] animate-pulse"/><span className="text-xs text-[#6B7C5E]">Telehealth available statewide CA</span></div>
                </div>
              </InfoCard>
            </div>
          </div>
          {/* Form */}
          <div className={`transition-all duration-800 delay-200 ${v?"opacity-100 translate-x-0":"opacity-0 translate-x-10"}`}>
            <div className="relative border border-[#E8D5BE] bg-[#FDFAF6]">
              <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent"/>
              <div className="p-8 md:p-12">
                {sent?(
                  <div className="text-center py-16">
                    <div className="w-20 h-20 border-2 border-[#B8925A]/40 flex items-center justify-center text-[#B8925A] mx-auto mb-6"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <h3 className="text-4xl text-[#2C1A0E] mb-3" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Message Received!</h3>
                    <p className="text-[#7A6556] font-light mb-2">Thank you for reaching out to Tri-Valley Clinic.</p>
                    <p className="text-[#7A6556] text-sm font-light">Our team will respond within one business day. For urgent needs, call <a href="tel:5105984921" className="text-[#B8925A] underline">(510) 598-4921</a>.</p>
                  </div>
                ):(
                  <>
                    <div className="mb-8"><h3 className="text-3xl text-[#2C1A0E] mb-1" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Send Us a Message</h3><p className="text-[#7A6556] text-sm font-light">Fill in the details below and we'll get back to you the same business day.</p></div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Full Name *" error={errors.name}><input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={`${ic} ${errors.name?"border-red-400":""}`}/></Field>
                        <Field label="Phone Number *" error={errors.phone}><input type="tel" placeholder="(510) 000-0000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={`${ic} ${errors.phone?"border-red-400":""}`}/></Field>
                      </div>
                      <Field label="Email Address *" error={errors.email}><input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={`${ic} ${errors.email?"border-red-400":""}`}/></Field>
                      <Field label="Reason for Contact *" error={errors.reason}>
                        <div className="relative">
                          <select value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} className={`${ic} appearance-none pr-10 ${errors.reason?"border-red-400":""} ${!form.reason?"text-[#7A6556]/40":""}`}>
                            <option value="">Select a reason...</option>
                            {REASONS.map(r=><option key={r} value={r}>{r}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B8925A]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                        </div>
                      </Field>
                      <Field label="Message *" error={errors.message}><textarea placeholder="Tell us a bit about what you're looking for..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className={`${ic} resize-none ${errors.message?"border-red-400":""}`}/></Field>
                      <div className="flex items-start gap-3 bg-[#F5EEE4] border border-[#E8D5BE] p-4">
                        <input type="checkbox" id="telehealth" className="mt-1 accent-[#B8925A]"/>
                        <label htmlFor="telehealth" className="text-sm text-[#7A6556] font-light cursor-pointer">I'm interested in <span className="text-[#2C1A0E] font-medium">telehealth / virtual appointments</span> (available statewide in California)</label>
                      </div>
                      <button type="submit" className="group w-full bg-[#2C1A0E] text-[#F0E8DA] py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400 flex items-center justify-center gap-3">
                        Send Message <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                      </button>
                      <p className="text-[9px] text-[#7A6556]/50 text-center tracking-wider">By submitting you agree to be contacted by Tri-Valley Clinic. This form does not constitute a medical consultation.</p>
                    </form>
                  </>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4"><span className="flex-1 h-px bg-[#E8D5BE]"/><span className="text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/50 flex-shrink-0">or call directly</span><span className="flex-1 h-px bg-[#E8D5BE]"/></div>
            <a href="tel:5105984921" className="group mt-5 flex items-center justify-center gap-3 border-2 border-[#B8925A] text-[#B8925A] py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] hover:text-[#FDFAF6] transition-all duration-300"><Ph/> (510) 598-4921 — Free Consultation</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({icon,label,children}){
  return(
    <div className="group flex items-start gap-4 border border-[#E8D5BE] bg-[#F5EEE4] p-5 hover:border-[#B8925A]/40 hover:bg-[#FDFAF6] transition-all duration-300">
      <div className="w-10 h-10 border border-[#B8925A]/40 flex items-center justify-center text-[#B8925A] flex-shrink-0 group-hover:bg-[#B8925A] group-hover:text-[#FDFAF6] group-hover:border-[#B8925A] transition-all duration-300">{icon}</div>
      <div className="flex-1"><p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-1.5 text-[#B8925A]">{label}</p>{children}</div>
    </div>
  );
}

function PhotoRow(){
  const[ref,v]=useReveal();
  /* ❌ reciptent.jpg REMOVED */
  const photos=[
    {src:IMAGES.CLINIC_INSIDE,       label:"Reception & Waiting"},
    {src:IMAGES.DR_GONDARA_WORKING,  label:"Patient Consultation"},
    {src:IMAGES.BOTH_CLINIC,         label:"Dr. Gill & Dr. Gondara"},
    {src:IMAGES.CLINIC_EXTERIOR,     label:"680 Mowry Ave · Fremont"},
  ];
  return(
    <section className="py-16 px-5 md:px-10 bg-[#F5EEE4]">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Our Clinic</span>
          <span className="flex-1 h-px bg-[#E8D5BE]"/><a href="/about" className="text-[10px] tracking-[0.18em] uppercase text-[#7A6556] hover:text-[#B8925A] transition-colors">Full Gallery →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((p,i)=>(
            <div key={p.label} className={`group relative overflow-hidden transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{height:"240px",transitionDelay:`${i*90}ms`}}>
              <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"><p className="text-[9px] tracking-[0.2em] uppercase text-[#E8D5BE] font-medium">{p.label}</p></div>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapSection(){
  const[ref,v]=useReveal();
  return(
    <section id="map" className="py-20 px-5 md:px-10 bg-[#FDFAF6]">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-8 h-px bg-[#B8925A]"/><span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Find Us</span></div>
        <div className={`border border-[#E8D5BE] overflow-hidden transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent"/>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
            <div style={{height:"440px"}} className="relative">
              <iframe title="Tri-Valley Clinic" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.6!2d-121.9886!3d37.5485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc3b3b3b3b3b3%3A0x0!2s680+Mowry+Ave%2C+Fremont%2C+CA+94536!5e0!3m2!1sen!2sus!4v1234567890" width="100%" height="100%" style={{border:0,filter:"saturate(0.85)"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
            <div className="bg-[#2C1A0E] p-8 flex flex-col justify-between">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold mb-5">Our Only Location</p>
                <h3 className="text-3xl text-[#F0E8DA] mb-2" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Tri-Valley Clinic</h3>
                <p className="text-[#A89880] text-sm font-light mb-8 leading-relaxed">680 Mowry Ave<br/>Fremont, CA 94536</p>
                <div className="space-y-4">
                  {[{icon:<Clock/>,txt:"Mon–Fri · 9:30 AM – 5:30 PM"},{icon:<Ph/>,txt:"(510) 598-4921"},{icon:<Mail/>,txt:"contact@trivalleyclinic.com"}].map(i=>(
                    <div key={i.txt} className="flex items-center gap-3 text-sm text-[#A89880] font-light"><span className="text-[#B8925A] flex-shrink-0">{i.icon}</span>{i.txt}</div>
                  ))}
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <a href="https://maps.google.com/?q=680+Mowry+Ave+Fremont+CA+94536" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#B8925A] text-[#FDFAF6] py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300">Get Directions →</a>
                <a href="tel:5105984921" className="flex items-center justify-center gap-2 border border-[#B8925A]/40 text-[#C9A46A] py-3 text-[10px] tracking-[0.2em] uppercase hover:border-[#B8925A] transition-colors duration-300"><Ph/> Call Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ(){
  const[ref,v]=useReveal();const[open,sOpen]=useState(null);
  const faqs=[
    {q:"How do I book my first appointment?",              a:"Call us at (510) 598-4921 or submit the contact form above. Our front desk team will verify your insurance, discuss your needs, and schedule your first appointment — next-day availability for most patients."},
    {q:"Is my first consultation really free?",            a:"Yes. Dr. Gill offers a complimentary 15-minute phone consultation to all new patients. This is a genuine conversation about your needs — no sales pitch, no obligation to book."},
    {q:"How long does a typical appointment last?",        a:"Initial psychiatric evaluations are typically 45–60 minutes. Follow-up appointments for medication management are usually 20–30 minutes. IV Hydration sessions take approximately 45–60 minutes."},
    {q:"Do you accept walk-ins?",                          a:"We operate by appointment only to ensure every patient receives Dr. Gill's and Dr. Gondara's full attention. We offer next-day appointments and same-day scheduling when availability permits."},
    {q:"Do you offer telehealth appointments?",            a:"Yes. Dr. Gill and Dr. Gondara offer secure telehealth appointments for all psychiatric services, available to patients anywhere in California."},
    {q:"What should I bring to my first appointment?",     a:"Please bring a valid photo ID, your insurance card, a list of any current medications, and any prior psychiatric or medical records you feel are relevant. Arrive 10 minutes early to complete intake forms."},
    {q:"How quickly will someone respond to my message?",  a:"Our team responds to all contact form submissions within one business day. For same-day responses, call us directly at (510) 598-4921 during business hours."},
  ];
  return(
    <section className="py-24 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-5"><span className="w-12 h-px bg-[#B8925A]/50"/><Dm size={7}/><span className="w-12 h-px bg-[#B8925A]/50"/></div>
          <h2 className="text-5xl md:text-6xl text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Common <em className="italic text-[#B8925A]">Questions</em></h2>
        </div>
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
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(184,146,90,0.14) 0%,transparent 70%)"}}/>
      <div ref={ref} className="relative mx-auto max-w-2xl">
        <div className={`flex justify-center gap-4 mb-8 transition-all duration-700 ${v?"opacity-100 scale-100":"opacity-0 scale-90"}`}>
          <div className="relative"><div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B8925A]/60 shadow-lg">{/* 🔄 Photo 18 */}<img src={IMAGES.DR_GILL_CARD} alt="Dr. Gill" className="w-full h-full object-cover object-top"/></div><span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]"/></div>
          <div className="relative"><div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B8925A]/40 shadow-lg">{/* 🔄 Photo 19 */}<img src={IMAGES.DR_GONDARA_CARD} alt="Dr. Gondara" className="w-full h-full object-cover object-top"/></div><span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]"/></div>
        </div>
        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 delay-100 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}><span className="w-16 h-px bg-[#B8925A]/40"/><Dm/><span className="w-16 h-px bg-[#B8925A]/40"/></div>
        <h2 className={`text-5xl md:text-[64px] text-[#2C1A0E] mb-5 transition-all duration-700 delay-150 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.05}}>Your First Call<br/><em className="italic text-[#B8925A]">Is Always Free.</em></h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>15 minutes with Dr. Gill — no commitment, no pressure. Just a genuine conversation about how Tri-Valley Clinic can help you.</p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <a href="tel:5105984921" className="group flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-400"><Ph/> Call (510) 598-4921 <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span></a>
          <a href="#form" className="flex items-center gap-2 border border-[#B8925A]/50 text-[#B8925A] px-10 py-[18px] text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">Use the Form Above ↑</a>
        </div>
        <p className={`mt-7 text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/45 transition-all duration-700 delay-400 ${v?"opacity-100":"opacity-0"}`}>Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA</p>
      </div>
    </section>
  );
}

function Ph(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;}
function Mail(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;}
function Location(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;}
function Clock(){return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;}
function Dm({size=8}){return <svg width={size} height={size} viewBox="0 0 10 10" fill="#B8925A"><polygon points="5,0 10,5 5,10 0,5"/></svg>;}
const CSS=`*{cursor:none !important;}@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}@keyframes floatOrb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-30px) scale(1.06)}66%{transform:translate(-14px,18px) scale(0.94)}}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`;