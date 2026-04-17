import IMAGES from "../constants/images";
import DoctorAvatars from "../components/DoctorAvatars";
import { useEffect, useRef, useState } from "react";

const P = {
  drGillPortrait : "/src/assets/Gill_Japsharan.jpg",
  drGillInside   : "/src/assets/dr J gill-inside.jpg",
  clinicInside   : "/src/assets/inside clinic1.jpg",
  clinicInterior : "/src/assets/inetrioir clinic.jpg",
  consulting1    : "/src/assets/counsalting.jpg",
  consulting2    : "/src/assets/Counsalting 2.jpg",
  office         : "/src/assets/office.jpg",
  emptyTable     : "/src/assets/emptytabel.jpg",
  magazines      : "/src/assets/magzize.jpg",
};

const CATEGORIES = ["All","Psychiatry","Weight Loss","IV Hydration","TMS","Telehealth","Wellness","Medication"];

const POSTS = [
  { id:1, category:"Psychiatry",   readTime:"6 min", date:"April 10, 2026", title:"What to Expect at Your First Psychiatric Evaluation", excerpt:"Walking into a psychiatric evaluation for the first time can feel overwhelming. Dr. Gill explains exactly what happens step by step, and why there is nothing to be nervous about.", img: P.drGillInside,   featured: true  },
  { id:2, category:"Weight Loss",  readTime:"5 min", date:"April 7, 2026",  title:"GLP-1 Medications: What They Are and How They Work",     excerpt:"Semaglutide and Tirzepatide have changed the landscape of medical weight loss. Learn how GLP-1 receptor agonists work and whether you may be a candidate.", img: P.consulting2,   featured: false },
  { id:3, category:"Psychiatry",   readTime:"7 min", date:"April 3, 2026",  title:"ADHD in Adults: Signs You Might Have Missed",            excerpt:"ADHD is widely under-diagnosed in adults, especially women. Discover the often-overlooked symptoms that distinguish adult ADHD from ordinary stress or distraction.", img: P.consulting1,  featured: false },
  { id:4, category:"Telehealth",   readTime:"4 min", date:"March 28, 2026", title:"Telehealth Psychiatry: How It Works in California",      excerpt:"Everything you need to know about accessing psychiatric care from anywhere in California — including what telehealth can and cannot replace.", img: P.clinicInside,  featured: false },
  { id:5, category:"IV Hydration", readTime:"5 min", date:"March 20, 2026", title:"IV Hydration Therapy: Benefits Beyond the Hangover Cure", excerpt:"IV hydration has evolved far beyond its party-recovery reputation. Learn about the science-backed benefits for energy, immunity, and overall wellness.", img: P.emptyTable,    featured: false },
  { id:6, category:"Psychiatry",   readTime:"8 min", date:"March 14, 2026", title:"Anxiety vs. Stress: How to Tell the Difference",         excerpt:"Stress is a normal response to life's demands. Anxiety is something different entirely. Dr. Gill outlines the key distinctions and when to seek professional support.", img: P.clinicInterior,featured: false },
  { id:7, category:"Medication",   readTime:"6 min", date:"March 7, 2026",  title:"Psychiatric Medication Management: Your Questions Answered", excerpt:"Starting a new psychiatric medication raises many questions. Dr. Gill addresses the most common concerns patients bring to their first medication management appointment.", img: P.office,        featured: false },
  { id:8, category:"TMS",          readTime:"5 min", date:"Feb 28, 2026",   title:"TMS Therapy: A Non-Drug Option for Treatment-Resistant Depression", excerpt:"Transcranial magnetic stimulation is FDA-cleared for depression and requires no medication. Here's what the research shows and who it helps most.", img: P.magazines,    featured: false },
  { id:9, category:"Wellness",     readTime:"4 min", date:"Feb 20, 2026",   title:"The Link Between Mental Health and Physical Wellness",    excerpt:"Psychiatric health and physical health are inseparable. Dr. Gill explores how conditions like depression and anxiety manifest physically and what to do about it.", img: P.drGillPortrait, featured: false },
];

function useReveal(t=0.12) {
  const ref=useRef(null); const [vis,setVis]=useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.unobserve(el);}},{threshold:t,rootMargin:"0px 0px -60px 0px"});
    obs.observe(el); return()=>obs.disconnect();
  },[t]);
  return [ref,vis];
}

function CustomCursor() {
  const dot=useRef(null),ring=useRef(null),pos=useRef({x:0,y:0}),raf=useRef(null);
  useEffect(()=>{
    const mv=(e)=>{pos.current={x:e.clientX,y:e.clientY};};
    const tick=()=>{
      if(dot.current)  dot.current.style.transform =`translate(${pos.current.x-4}px,${pos.current.y-4}px)`;
      if(ring.current) ring.current.style.transform=`translate(${pos.current.x-16}px,${pos.current.y-16}px)`;
      raf.current=requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove",mv); raf.current=requestAnimationFrame(tick);
    return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(raf.current);};
  },[]);
  return(<>
    <div ref={dot}  className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8925A] z-[9999] pointer-events-none" style={{transition:"none"}} />
    <div ref={ring} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B8925A]/50 z-[9998] pointer-events-none" style={{transition:"transform 0.12s ease-out"}} />
  </>);
}

export default function Blog() {
  return (
    <main style={{fontFamily:"'Jost',sans-serif",background:"#FDFAF6",cursor:"none"}}>
      <style>{CSS}</style>
      <CustomCursor />
      <HeroSection />
      <MarqueeStrip />
      <FeaturedPost />
      <BlogGrid />
      <NewsletterSection />
      <CTASection />
    </main>
  );
}

/* ══ 1. HERO ══ */
function HeroSection() {
  const [on,setOn]=useState(false);
  useEffect(()=>{setTimeout(()=>setOn(true),80);},[]);
  return (
    <section className="relative min-h-[75vh] flex items-end overflow-hidden"
      style={{background:"linear-gradient(140deg,#2C1A0E 0%,#3D2B1F 55%,#4E3525 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}} />
      {/* BG photo */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%] overflow-hidden">
        <img src={P.magazines} alt="Tri-Valley Clinic reading"
          className="w-full h-full object-cover opacity-25" style={{filter:"saturate(0.6)"}} />
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,#2C1A0E 0%,#2C1A0E 15%,transparent 60%)"}} />
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,#2C1A0E 0%,transparent 55%)"}} />
      </div>
      {/* Orbs */}
      {[{t:"10%",l:"50%",s:400,d:"0s",o:0.12},{t:"60%",l:"5%",s:260,d:"5s",o:0.08}].map((o,i)=>(
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{width:o.s,height:o.s,top:o.t,left:o.l,background:`radial-gradient(circle,rgba(184,146,90,${o.o}) 0%,transparent 70%)`,animation:`floatOrb ${11+i*4}s ease-in-out infinite ${o.d}`}} />
      ))}
      {/* Vertical text */}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3"
        style={{writingMode:"vertical-rl",animation:"fadeUp 1s ease 0.8s both"}}>
        <span className="w-px h-16 bg-[#B8925A]/40" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#B8925A]/50">Health · Insights · Wellness</span>
        <span className="w-px h-16 bg-[#B8925A]/40" />
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 xl:px-16 pb-20 pt-32">
        <div className={`inline-flex items-center gap-2.5 border border-[#B8925A]/40 bg-[#B8925A]/8 px-4 py-2 mb-7 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
          style={{transitionDelay:"100ms"}}>
          <PenIcon />
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#B8925A] font-semibold">Expert Insights from Dr. Gill & Team</span>
        </div>
        <h1 className={`text-[50px] md:text-[66px] xl:text-[80px] text-[#F0E8DA] leading-[0.98] mb-5 transition-all duration-900 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,transitionDelay:"200ms"}}>
          Health, Wellness<br />&amp; <em className="italic text-[#C9A46A]">Insight.</em>
        </h1>
        <div className={`flex items-center gap-4 mb-5 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"370ms"}}>
          <span className="w-10 h-px bg-[#B8925A]/60" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#A89880] font-light">Resources from Tri-Valley Clinic · Fremont, CA</span>
        </div>
        <p className={`text-[#A89880] text-lg leading-relaxed max-w-lg font-light mb-10 transition-all duration-700 ${on?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
          style={{transitionDelay:"440ms"}}>
          Evidence-based articles on mental health, medical weight loss, IV therapy, TMS, and general wellness — written to inform, not overwhelm.
        </p>
        <div className={`flex flex-wrap gap-3 transition-all duration-700 ${on?"opacity-100":"opacity-0"}`} style={{transitionDelay:"580ms"}}>
          {CATEGORIES.slice(1).map((c)=>(
            <span key={c} className="text-[9px] tracking-[0.18em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/60 px-3 py-1.5">{c}</span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{background:"linear-gradient(to top,#FDFAF6,transparent)"}} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{animation:"fadeUp 1s ease 1.2s both"}}>
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8925A]/40">Scroll</span>
        <div className="w-px h-12 overflow-hidden"><div className="w-full h-full bg-gradient-to-b from-[#B8925A]/70 to-transparent" style={{animation:"scrollLine 2s ease-in-out infinite"}} /></div>
      </div>
    </section>
  );
}

/* ══ 2. MARQUEE ══ */
function MarqueeStrip() {
  const items=["Psychiatric Health","Medical Weight Loss","GLP-1 Therapy","ADHD in Adults","Anxiety & Depression","IV Hydration","TMS Therapy","Telehealth Psychiatry","Medication Management","Mental Wellness","California Psychiatry"];
  const rep=[...items,...items];
  return (
    <div className="bg-[#2C1A0E] py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{animation:"marquee 38s linear infinite",width:"max-content"}}>
        {rep.map((t,i)=>(
          <span key={i} className="inline-flex items-center gap-3 text-[#E8D5BE]/60 text-[10px] tracking-[0.22em] uppercase font-medium px-3">
            {t}<DiamondSvg />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══ 3. FEATURED POST ══ */
function FeaturedPost() {
  const [ref,vis]=useReveal();
  const post=POSTS.find(p=>p.featured);
  return (
    <section className="py-24 px-5 md:px-10 bg-[#FDFAF6]">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={`flex items-center gap-3 mb-10 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="w-8 h-px bg-[#B8925A]" />
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Featured Article</span>
        </div>
        <div className={`group grid grid-cols-1 lg:grid-cols-2 border border-[#E8D5BE] overflow-hidden hover:border-[#B8925A]/40 hover:shadow-[0_20px_60px_rgba(184,146,90,0.12)] transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}>
          {/* Image */}
          <div className="relative overflow-hidden" style={{height:"460px"}}>
            <img src={post.img} alt={post.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FDFAF6]/10" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B8925A] to-[#C9A46A]" />
            <div className="absolute top-5 left-5">
              <span className="text-[9px] tracking-[0.22em] uppercase font-semibold px-3 py-1.5 bg-[#B8925A] text-[#FDFAF6]">Featured</span>
            </div>
          </div>
          {/* Content */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-[#FDFAF6]">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-[#B8925A] border border-[#B8925A]/30 px-2.5 py-1">{post.category}</span>
              <span className="w-px h-3 bg-[#E8D5BE]" />
              <span className="text-[10px] text-[#7A6556]/60">{post.readTime} read</span>
              <span className="w-px h-3 bg-[#E8D5BE]" />
              <span className="text-[10px] text-[#7A6556]/60">{post.date}</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#2C1A0E] mb-5 leading-[1.1] group-hover:text-[#B8925A] transition-colors duration-300"
              style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400}}>
              {post.title}
            </h2>
            <p className="text-[#7A6556] text-base font-light leading-relaxed mb-8">{post.excerpt}</p>
            {/* Author */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#E8D5BE]">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8D5BE]">
                <img src={P.drGillPortrait} alt="Dr. Gill" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C1A0E]" style={{fontFamily:"'Cormorant Garamond',serif"}}>Dr. Japsharan Gill, MD</p>
                <p className="text-[10px] tracking-[0.16em] uppercase text-[#B8925A]/70">Founder & CEO · Psychiatry & Wellness</p>
              </div>
            </div>
            <a href={`/blog/${post.id}`}
              className="group/btn inline-flex items-center gap-3 bg-[#2C1A0E] text-[#F0E8DA] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-300 self-start">
              Read Article <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 4. BLOG GRID ══ */
function BlogGrid() {
  const [ref,vis]=useReveal();
  const [active,setActive]=useState("All");
  const [search,setSearch]=useState("");
  const filtered=POSTS.filter(p=>!p.featured).filter(p=>{
    const matchCat=active==="All"||p.category===active;
    const matchSearch=p.title.toLowerCase().includes(search.toLowerCase())||p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat&&matchSearch;
  });

  return (
    <section className="py-20 px-5 md:px-10 bg-[#F5EEE4]">
      <div className="mx-auto max-w-7xl">
        {/* Controls */}
        <div ref={ref} className={`flex flex-col md:flex-row gap-5 items-start md:items-center justify-between mb-10 transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c)=>(
              <button key={c} onClick={()=>setActive(c)}
                className={`px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-semibold border transition-all duration-300 ${active===c?"bg-[#B8925A] border-[#B8925A] text-[#FDFAF6]":"border-[#E8D5BE] text-[#7A6556] hover:border-[#B8925A]/50 hover:text-[#B8925A]"}`}>
                {c}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative flex-shrink-0">
            <input
              type="text" placeholder="Search articles..." value={search} onChange={(e)=>setSearch(e.target.value)}
              className="bg-[#FDFAF6] border border-[#E8D5BE] pl-10 pr-5 py-2.5 text-sm text-[#3D2B1F] placeholder-[#7A6556]/40 focus:outline-none focus:border-[#B8925A] transition-colors duration-300 w-[220px]"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8925A]/50"><SearchIcon /></span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length===0?(
          <div className="text-center py-20">
            <p className="text-[#7A6556] font-light text-lg">No articles found. Try a different search or category.</p>
          </div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post,i)=>(
              <BlogCard key={post.id} post={post} delay={i*90} vis={vis} />
            ))}
          </div>
        )}

        {/* Load more placeholder */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${vis?"opacity-100":"opacity-0"}`}>
          <p className="text-[#7A6556] text-sm font-light mb-5">More articles coming from our SEO team soon.</p>
          <a href="tel:5105984921"
            className="inline-flex items-center gap-3 border border-[#B8925A]/50 text-[#B8925A] px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300">
            <PhoneIcon /> Speak with Dr. Gill Directly
          </a>
        </div>
      </div>
    </section>
  );
}

function BlogCard({post,delay,vis}) {
  return (
    <a href={`/blog/${post.id}`}
      className={`group relative bg-[#FDFAF6] border border-[#E8D5BE] flex flex-col overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(184,146,90,0.14)] hover:border-[#B8925A]/40 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}
      style={{transitionDelay:`${delay}ms`,transitionDuration:"700ms"}}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{height:"220px"}}>
        <img src={post.img} alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 bg-[#FDFAF6]/90 text-[#B8925A]">{post.category}</span>
        </div>
        {/* Gold top border on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8925A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] text-[#7A6556]/60">{post.date}</span>
          <span className="w-px h-2.5 bg-[#E8D5BE]" />
          <span className="text-[9px] text-[#7A6556]/60">{post.readTime} read</span>
        </div>
        <h3 className="text-xl text-[#2C1A0E] mb-3 leading-snug group-hover:text-[#B8925A] transition-colors duration-300 flex-1"
          style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500}}>
          {post.title}
        </h3>
        <p className="text-[#7A6556] text-sm font-light leading-relaxed line-clamp-2 mb-5">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-[#E8D5BE]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#E8D5BE]">
              <img src={P.drGillPortrait} alt="Dr. Gill" className="w-full h-full object-cover object-top" />
            </div>
            <span className="text-[10px] text-[#7A6556]/70">Dr. Japsharan Gill</span>
          </div>
          <span className="text-[#B8925A] text-sm group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </a>
  );
}

/* ══ 5. NEWSLETTER ══ */
function NewsletterSection() {
  const [ref,vis]=useReveal();
  const [email,setEmail]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const handleSubmit=(e)=>{e.preventDefault();if(email){setSubmitted(true);}};
  return (
    <section className="py-24 px-5 md:px-10" style={{background:"linear-gradient(160deg,#2C1A0E 0%,#3D2B1F 100%)"}}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B8925A'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`}} />
      <div ref={ref} className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className={`transition-all duration-800 ${vis?"opacity-100 translate-x-0":"opacity-0 -translate-x-10"}`}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#B8925A]" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">Stay Informed</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-[#F0E8DA] mb-5" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.1}}>
            Wellness Insights<br /><em className="italic text-[#C9A46A]">In Your Inbox.</em>
          </h2>
          <p className="text-[#A89880] text-base font-light leading-relaxed mb-6">
            Subscribe for monthly articles from Dr. Gill on mental health, weight loss, and wellness — written in plain language, designed to help.
          </p>
          <ul className="space-y-3">
            {["No spam — ever","One email per month, maximum","Unsubscribe anytime in one click","Expert-written by Dr. Gill & team"].map((t)=>(
              <li key={t} className="flex items-center gap-3 text-sm text-[#A89880] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0" />{t}
              </li>
            ))}
          </ul>
        </div>
        {/* Right — form */}
        <div className={`transition-all duration-800 delay-200 ${vis?"opacity-100 translate-x-0":"opacity-0 translate-x-10"}`}>
          <div className="border border-[#E8D5BE]/15 bg-[#F5EEE4]/5 p-8 md:p-10">
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#B8925A] to-transparent mb-8 -mt-8 -mx-8 md:-mx-10" />
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 border border-[#B8925A]/40 flex items-center justify-center text-[#B8925A] mx-auto mb-5">
                  <CheckIcon />
                </div>
                <h3 className="text-2xl text-[#F0E8DA] mb-2" style={{fontFamily:"'Cormorant Garamond',serif"}}>You're subscribed!</h3>
                <p className="text-[#A89880] text-sm font-light">Thank you. Watch for your first article from Dr. Gill soon.</p>
              </div>
            ):(
              <>
                <h3 className="text-2xl text-[#F0E8DA] mb-2" style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>Get Monthly Health Insights</h3>
                <p className="text-[#A89880] text-sm font-light mb-7">Enter your email — no spam, no sales. Just useful health content.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/70 font-semibold block mb-2">First Name</label>
                    <input type="text" placeholder="Your first name"
                      className="w-full bg-[#FDFAF6]/8 border border-[#E8D5BE]/20 px-4 py-3 text-[#F0E8DA] placeholder-[#7A6556] text-sm focus:outline-none focus:border-[#B8925A] transition-colors duration-300" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A]/70 font-semibold block mb-2">Email Address</label>
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} required
                      className="w-full bg-[#FDFAF6]/8 border border-[#E8D5BE]/20 px-4 py-3 text-[#F0E8DA] placeholder-[#7A6556] text-sm focus:outline-none focus:border-[#B8925A] transition-colors duration-300" />
                  </div>
                  <button type="submit"
                    className="group w-full bg-[#B8925A] text-[#FDFAF6] py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300 flex items-center justify-center gap-3 mt-2">
                    Subscribe — It's Free <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </button>
                  <p className="text-[9px] text-[#7A6556]/50 text-center tracking-wider">By subscribing you agree to receive email from Tri-Valley Clinic. Unsubscribe anytime.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 6. CTA ══ */
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
          Ready to Start Your<br /><em className="italic text-[#B8925A]">Journey?</em>
        </h2>
        <p className={`text-[#7A6556] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>Your first consultation with Dr. Gill or Dr. Gondara is completely free — no commitment, no pressure.</p>
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

/* ══ ICONS ══ */
const ic=(d,s=16)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
function PhoneIcon(){return ic(<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>);}
function CheckIcon(){return ic(<polyline points="20 6 9 17 4 12"/>);}
function PenIcon(){return ic(<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>);}
function SearchIcon(){return ic(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,14);}
function DiamondSvg({size=8}){return <svg width={size} height={size} viewBox="0 0 10 10" fill="#B8925A"><polygon points="5,0 10,5 5,10 0,5"/></svg>;}

const CSS=`
  * { cursor:none !important; }
  .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
  @keyframes fadeUp    {from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes floatOrb  {0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-30px) scale(1.06)}66%{transform:translate(-14px,18px) scale(0.94)}}
  @keyframes marquee   {from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}
`;