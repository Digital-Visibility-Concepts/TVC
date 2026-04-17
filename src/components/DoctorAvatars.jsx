// src/components/DoctorAvatars.jsx
// Import this in EVERY page — both doctors shown equally everywhere
// 50/50 partners — no exceptions

import IMAGES from "../constants/images";

export default function DoctorAvatars({ className = "" }) {
  return (
    <div className={`flex justify-center gap-8 ${className}`}>
      {[
        { img: IMAGES.DR_GILL_CARD,    alt: "Dr. Japsharan Gill", name: "Dr. Gill",    role: "Founder & CEO"     },
        { img: IMAGES.DR_GONDARA_CARD, alt: "Dr. Gondara",         name: "Dr. Gondara", role: "President" },
      ].map((d) => (
        <div key={d.name} className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B8925A]/60 shadow-[0_8px_32px_rgba(184,146,90,0.2)]">
              {/* 🔄 Replace with Photo 18 (Dr. Gill) / Photo 19 (Dr. Gondara) once purchased */}
              <img src={d.img} alt={d.alt} className="w-full h-full object-cover object-top" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6B7C5E] border-2 border-[#F5EEE4]" />
          </div>
          <div className="text-center">
            <p className="text-[10px] tracking-[0.14em] uppercase text-[#2C1A0E] font-semibold">{d.name}</p>
            <p className="text-[9px] text-[#B8925A] tracking-wider">{d.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}