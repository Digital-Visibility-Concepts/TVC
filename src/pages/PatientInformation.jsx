/* ═══════════════════════════════════════════════════════════════
   src/pages/PatientInformation.jsx

   UNLISTED PAGE — reachable by direct URL only.

   Deliberately NOT linked from Navbar, Footer, or any other page,
   and deliberately NOT in sitemap.xml. Anyone who needs it gets the
   URL directly.

   Contains the full detail set from Dr. Gill's chatbot script:
   services, insurance, IV menu and pricing, GLP-1 pricing, TMS
   course details, financing, sliding-scale policy, office info.

   ⚠ noindex is set via the SEO component below. If SEO.jsx does not
   support a `noindex` prop, see the note in that block — it must be
   added, or this page will end up in Google.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";

/* ── Content ──────────────────────────────────────────────────
   All copy taken from the client's chatbot script. Keep the
   sliding-scale and insurance-list wording identical to the
   Insurance page so the two never contradict each other.
──────────────────────────────────────────────────────────────*/

const INSURANCE_LIST =
  "Aetna, Blue Cross, Blue Shield, Medicare, Tricare, and Alameda Alliance";

const SLIDING_SCALE =
  "We do not offer sliding-scale fees at this time for any of our services. We ask that patients complete their payments in full at the time of their visit. For our wellness services we offer financing options — please see our Financing page for more information.";

const SECTIONS = [
  {
    id: "appointments",
    title: "Appointments",
    intro:
      "Tri-Valley Clinic provides comprehensive psychiatric care through both in-person and telehealth appointments, TMS therapy, medical weight-loss services, and IV hydration therapy.",
    items: [
      {
        q: "How do I request an appointment?",
        a: "You can request a visit anytime through our contact page, or call us at (510) 598-4921. We do not use online booking — every appointment is confirmed by our front desk.",
      },
      {
        q: "How soon can I be seen?",
        a: "Next-day appointments are often available once insurance is verified, for both in-person and telehealth visits.",
      },
      {
        q: "Do I need a referral?",
        a: "No referral is required to establish care with our office.",
      },
    ],
  },
  {
    id: "psychiatric",
    title: "Psychiatric Services",
    intro:
      "We offer full-spectrum psychiatric care including evaluations, diagnosis, medication management, and telehealth visits.",
    items: [
      {
        q: "What conditions do you treat?",
        a: "Our providers support patients with conditions including anxiety, depression, ADHD, bipolar disorder, PTSD, OCD, insomnia, and substance use concerns.",
      },
      {
        q: "Do you offer telehealth?",
        a: "Yes. Telehealth is offered to patients statewide in California for most conditions. Secure, HIPAA-compliant video visits cover psychiatric evaluations, medication management, and follow-up care.",
      },
      {
        q: "Do you take insurance for psychiatric services?",
        a: "Yes. We accept insurance for our psychiatric services, both in-person and telehealth, as well as for TMS therapy.",
      },
      {
        q: "What insurances do you take?",
        a: `We are in network with ${INSURANCE_LIST}. We perform a complimentary insurance benefits verification before you establish care with our office. Otherwise it is the patient's responsibility to understand their own health insurance policies. If you will be checking with insurance yourself, please inquire about behavioral or mental health outpatient/office visit benefits. If you are out of network but have a PPO plan, we can submit a superbill after each visit for possible reimbursement. If you do not see your insurance listed, or have further questions, please call us at (510) 598-4921.`,
      },
      {
        q: "Do you offer a sliding-scale fee?",
        a: SLIDING_SCALE,
      },
    ],
  },
  {
    id: "iv-hydration",
    title: "IV Hydration Therapy",
    intro:
      "Our IV hydration therapy provides medical-grade vitamin and electrolyte infusions designed to support energy, immunity, and recovery. Sessions are administered in-office by trained clinical staff.",
    items: [
      {
        q: "What IV drips do you offer?",
        a: "We offer 12 physician-curated drips. These include the Ignite Drip for metabolism support, the Lumière Drip for glow and skin brightening, the Shield Drip for immunity defense, and the Rescue Drip for hangover recovery.",
      },
      {
        q: "What do IV drips cost?",
        a: "Our physician-curated IV drips start at $229. For pricing on a specific formula, please call our office at (510) 598-4921.",
      },
      {
        q: "Do you take insurance for IV hydration?",
        a: "Insurance does not cover these wellness services. Financing options are available to help with the cost — please see our Financing page for more information.",
      },
      {
        q: "How often can I receive IV therapy?",
        a: "This depends on your health goals and the formula chosen. Most wellness patients receive IV therapy every two to four weeks. Our clinical staff can recommend a schedule based on your needs.",
      },
    ],
  },
  {
    id: "weight-loss",
    title: "Medical Weight Loss",
    intro:
      "Our medical weight-loss program uses GLP-1 medications such as semaglutide or tirzepatide, combined with clinical monitoring and personalised support. We offer a free 15-minute initial consultation to discuss whether the program is right for you.",
    items: [
      {
        q: "What can I expect?",
        a: "We offer a free 15-minute initial consultation to cover any concerns you may have and to confirm you are eligible for the program. We may ask you to complete routine blood work before starting. Once your medical history is reviewed, we may be able to start medication the same day.",
      },
      {
        q: "Do you take insurance for the weight-loss program?",
        a: "Our program is not covered by insurance. Financing options are available to help with the cost — please see our Financing page for more information.",
      },
      {
        q: "How much does the program cost?",
        a: "Pricing depends on the medication and dose. See the pricing table below for current monthly and weekly rates.",
      },
    ],
  },
  {
    id: "tms",
    title: "TMS Therapy",
    intro:
      "TMS therapy is an FDA-cleared, non-invasive treatment for depression that uses gentle magnetic pulses to stimulate mood-regulating areas of the brain. It is performed in-office and can be an effective option when medications alone have not been enough.",
    items: [
      {
        q: "What can I expect?",
        a: "Your first appointment is a consultation to determine whether you qualify for TMS therapy. If you qualify, we submit a prior authorization to your insurance provider before treatment begins. Once authorization is received, your first session includes brain mapping completed by a provider, followed by your first treatment.",
      },
      {
        q: "How long is the therapy?",
        a: "The full course is 36 treatments over approximately 6 weeks, on a schedule of 5 days per week. Each session runs about 20–40 minutes; the initial session takes approximately one hour. Five sessions per week is recommended for best results, though the schedule can be flexible.",
      },
      {
        q: "Is TMS covered by insurance?",
        a: "Yes, TMS is covered by insurance, but a prior authorization must be submitted and approved before treatment begins. Timing varies depending on your plan.",
      },
      {
        q: "What about maintenance sessions?",
        a: "Some patients maintain their improvement after the initial course, while others benefit from maintenance sessions. Maintenance treatment requires a new prior authorization from your insurance provider. If it is not covered, please contact us for out-of-pocket pricing.",
      },
      {
        q: "Does TMS hurt?",
        a: "Most patients describe the sensation as a light tapping or clicking on the scalp. It is generally well tolerated, though mild discomfort or sensitivity may occur during the first few sessions. This usually improves as you adjust to treatment.",
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    intro:
      "We accept insurance for our psychiatric and TMS services. Wellness services such as our medical weight-loss program and IV therapy are not generally covered by insurance.",
    items: [
      {
        q: "What insurances do you take?",
        a: `We are in network with ${INSURANCE_LIST}. We perform a complimentary insurance benefits verification before you establish care. If you are out of network but have a PPO plan, we can submit a superbill after each visit for possible reimbursement.`,
      },
      {
        q: "How do I know if my insurance is accepted?",
        a: "We verify your insurance before your first visit as a courtesy to our patients. Otherwise insurance verification is the patient's responsibility. If you have any questions specifically regarding insurance, please call the member services number on the back of your insurance card.",
      },
      {
        q: "What is my copay or deductible?",
        a: "Copays and deductibles vary by insurance. We verify your insurance before your first visit as a courtesy to our patients. Otherwise insurance verification is the patient's responsibility. If you have any questions specifically regarding insurance, please call the member services number on the back of your insurance card.",
      },
      {
        q: "What if I don't have insurance?",
        a: "We offer self-pay options for our psychiatric services. We do not accept insurance for our wellness services, however we do offer financing options. Please visit our Financing page for more information.",
      },
      {
        q: "Do you offer a sliding-scale fee?",
        a: SLIDING_SCALE,
      },
    ],
  },
  {
    id: "financing",
    title: "Financing",
    intro:
      "Our clinic offers flexible payment options including self-pay rates, financing programs, and third-party payment plans for our wellness services.",
    items: [
      {
        q: "What financing is available?",
        a: "We offer financing through Cherry, with approvals up to $3,000, so there may be flexible payment options available to you. Cherry can be used for our medical weight-loss program and IV hydration therapy. Please see our Financing page for more information.",
      },
      {
        q: "Does applying affect my credit score?",
        a: "Cherry uses a soft credit pull for their initial application, which does not affect your credit score. Only certain plan types may involve a hard pull, and Cherry will inform you before that happens.",
      },
      {
        q: "Can financing be used for psychiatry?",
        a: "No. Cherry financing applies to our weight-loss and IV hydration therapy services only. We offer self-pay rates for psychiatric services.",
      },
      {
        q: "Do you offer sliding-scale fees?",
        a: SLIDING_SCALE,
      },
    ],
  },
  {
    id: "office",
    title: "Office Information",
    intro:
      "We are located at 680 Mowry Ave, Fremont, CA 94536, open Monday to Friday, 9:30 AM to 5:30 PM, closed weekends.",
    items: [
      {
        q: "Where are you located?",
        a: "680 Mowry Ave, Fremont, CA 94536. This is our only location.",
      },
      {
        q: "What are your hours?",
        a: "Monday to Friday, 9:30 AM to 5:30 PM. We are closed on weekends. Telehealth appointments are available to patients statewide in California during the same hours.",
      },
      {
        q: "How do I contact the clinic?",
        a: "Call (510) 598-4921 or reach us through our contact page. For a medical or psychiatric emergency, call 911 or dial 988 for the Suicide & Crisis Lifeline.",
      },
    ],
  },
];

/* GLP-1 pricing — figures supplied by the client */
const GLP1 = [
  {
    drug: "Tirzepatide",
    rows: [
      { dose: "2.5 mg", month: "$299", week: "$79" },
      { dose: "5 mg", month: "$359", week: "$99" },
      { dose: "7.5 mg", month: "$439", week: "$119" },
      { dose: "10 mg", month: "$499", week: "$134" },
      { dose: "12.5 mg", month: "$549", week: "$149" },
      { dose: "15 mg", month: "$598", week: "$159" },
    ],
  },
  {
    drug: "Semaglutide",
    rows: [
      { dose: "0.25 mg", month: "$259", week: "$68" },
      { dose: "0.5 mg", month: "$259", week: "$68" },
      { dose: "1 mg", month: "$374", week: "$98" },
      { dose: "2 mg", month: "$449", week: "$119" },
    ],
  },
];

/* ── Reveal hook ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

export default function PatientInformation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6" }}>
      {/* ⚠ If SEO.jsx has no `noindex` prop, add one that renders
          <meta name="robots" content="noindex, nofollow" />.
          Without it this page can be indexed by Google. */}
      <SEO
        title="Patient Information"
        description="Detailed patient information for Tri-Valley Clinic — services, insurance, pricing, and office details."
        path="/patient-information"
        noindex
      />

      <Hero />
      {SECTIONS.map((s, i) => (
        <Section key={s.id} section={s} alt={i % 2 === 1} />
      ))}
      <PricingSection />
      <ClosingNote />
    </main>
  );
}

/* ══ HERO ══ */
function Hero() {
  return (
    <section className="px-5 md:px-10 py-16 md:py-20" style={{ background: "#2C1A0E" }}>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-[#B8925A]" />
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">
            Tri-Valley Clinic
          </span>
        </div>

        <h1
          className="text-[#F0E8DA] text-5xl md:text-6xl mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.05 }}
        >
          Patient <em className="italic text-[#C9A46A]">Information</em>
        </h1>

        <p className="text-[#A89880] text-base font-light leading-relaxed max-w-2xl mb-7">
          Detailed answers about our services, insurance, pricing, and office
          information — collected in one place. For anything not covered here,
          call us and our team will help.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="tel:5105984921"
            className="inline-flex items-center gap-2.5 bg-[#B8925A] text-[#FDFAF6] px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C9A46A] transition-colors duration-300"
          >
            <PhoneIcon /> (510) 598-4921
          </a>
          <a
            href="/contact"
            className="inline-flex items-center border border-[#B8925A]/50 text-[#C9A46A] px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/10 transition-all duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* On-page nav */}
        <div className="mt-9 pt-7 border-t border-[#B8925A]/20 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[9px] tracking-[0.16em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/75 px-3 py-1.5 hover:border-[#B8925A] hover:text-[#C9A46A] transition-colors duration-200"
            >
              {s.title}
            </a>
          ))}
          <a
            href="#pricing"
            className="text-[9px] tracking-[0.16em] uppercase border border-[#B8925A]/25 text-[#C9A46A]/75 px-3 py-1.5 hover:border-[#B8925A] hover:text-[#C9A46A] transition-colors duration-200"
          >
            GLP-1 Pricing
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══ SECTION ══ */
function Section({ section, alt }) {
  const [ref, vis] = useReveal();
  const [open, setOpen] = useState(null);

  return (
    <section
      id={section.id}
      className="px-5 md:px-10 py-16"
      style={{ background: alt ? "#F5EEE4" : "#FDFAF6", scrollMarginTop: "24px" }}
    >
      <div className="mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`mb-8 transition-all duration-700 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#B8925A]" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">
              {section.title}
            </span>
          </div>

          <p className="text-[#7A6556] text-base font-light leading-[1.85] max-w-2xl">
            {section.intro}
          </p>
        </div>

        <div className="space-y-3">
          {section.items.map((f, i) => (
            <div
              key={f.q}
              className={`border transition-all duration-500 ${
                open === i
                  ? "border-[#B8925A]/50 bg-[#FDFAF6]"
                  : "border-[#E8D5BE] bg-[#FDFAF6]/70 hover:border-[#B8925A]/30"
              } ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ transitionDelay: `${i * 55}ms`, transitionDuration: "600ms" }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-[15px] font-medium text-[#2C1A0E]">{f.q}</span>
                <span
                  className={`flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300 ${
                    open === i
                      ? "border-[#B8925A] bg-[#B8925A] text-[#FDFAF6] rotate-45"
                      : "border-[#E8D5BE] text-[#B8925A]"
                  }`}
                >
                  <PlusIcon />
                </span>
              </button>

              {/* max-h-[600px] — the insurance answers are long and would
                  clip at the max-h-48 used elsewhere on the site */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  open === i ? "max-h-[600px] pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-[#7A6556] text-sm leading-relaxed font-light">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ GLP-1 PRICING ══ */
function PricingSection() {
  const [ref, vis] = useReveal();

  return (
    <section
      id="pricing"
      className="px-5 md:px-10 py-16"
      style={{ background: "#FDFAF6", scrollMarginTop: "24px" }}
    >
      <div className="mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`mb-8 transition-all duration-700 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#B8925A]" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold">
              GLP-1 Pricing
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl text-[#2C1A0E] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Medication <em className="italic text-[#B8925A]">Pricing</em>
          </h2>
          <p className="text-[#7A6556] text-base font-light leading-[1.85] max-w-2xl">
            Pricing depends on the medication and the dose prescribed. Monthly
            pricing covers four weekly injections. Your provider will confirm the
            right dose for you at your consultation.
          </p>
        </div>

        <div className="space-y-6">
          {GLP1.map((g) => (
            <div key={g.drug} className="border border-[#E8D5BE] bg-[#F5EEE4] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E8D5BE] bg-[#FDFAF6]">
                <h3
                  className="text-xl text-[#2C1A0E]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {g.drug}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Dose", "Monthly (4 weekly injections)", "Per weekly dose"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-6 py-3 text-[9px] tracking-[0.18em] uppercase font-semibold text-[#B8925A] border-b border-[#E8D5BE]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map((r) => (
                      <tr key={r.dose}>
                        <td className="px-6 py-3 text-[#2C1A0E] font-medium border-b border-[#E8D5BE]/60">
                          {r.dose}
                        </td>
                        <td className="px-6 py-3 text-[#7A6556] border-b border-[#E8D5BE]/60">
                          {r.month}
                        </td>
                        <td className="px-6 py-3 text-[#7A6556] border-b border-[#E8D5BE]/60">
                          {r.week}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#7A6556]/70 font-light mt-5 leading-relaxed">
          Pricing is subject to change. Our medical weight-loss program is not
          covered by insurance; financing options are available. Call
          (510) 598-4921 to confirm current pricing.
        </p>
      </div>
    </section>
  );
}

/* ══ CLOSING ══ */
function ClosingNote() {
  return (
    <section className="px-5 md:px-10 py-16" style={{ background: "#F5EEE4" }}>
      <div className="mx-auto max-w-4xl">
        <div className="border-l-2 border-[#B8925A] pl-6 mb-8">
          <p className="text-[#7A6556] text-base font-light leading-[1.9]">
            If your question isn't answered here, we want to make sure you get
            accurate information rather than a guess. Reach out to our care team
            directly and we'll help — we're here to support your health and
            wellness.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="tel:5105984921"
            className="inline-flex items-center gap-2.5 bg-[#2C1A0E] text-[#F0E8DA] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#B8925A] transition-colors duration-300"
          >
            <PhoneIcon /> Call (510) 598-4921
          </a>
          <a
            href="/contact"
            className="inline-flex items-center border border-[#B8925A]/50 text-[#B8925A] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-[#B8925A] hover:bg-[#B8925A]/5 transition-all duration-300"
          >
            Send a Message
          </a>
        </div>

        <div className="border-t border-[#E8D5BE] pt-6 space-y-3">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#7A6556]/60">
            Mon – Fri · 9:30 AM – 5:30 PM · 680 Mowry Ave, Fremont, CA 94536 ·
            Telehealth statewide in California
          </p>
          <p className="text-[11px] text-[#7A6556]/60 font-light leading-relaxed max-w-3xl">
            The information on this page is for general informational purposes
            only and does not constitute medical advice. If you are experiencing
            a medical or psychiatric emergency, call 911 or dial 988 for the
            Suicide &amp; Crisis Lifeline.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══ ICONS ══ */
function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}