import { useEffect } from "react";
import SEO from '../components/SEO';

export default function LegalPrivacy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6" }}>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Tri-Valley Clinic in Fremont, CA. Learn how we collect, use, and protect your personal information."
        path="/privacy-policy"
      />

      {/* Hero */}
      <section className="bg-[#2C1A0E] py-16 px-5 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold mb-3">Legal</p>
          <h1 className="text-5xl md:text-6xl text-[#F0E8DA] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            Privacy <em className="italic text-[#C9A46A]">Policy</em>
          </h1>
          <p className="text-[#A89880] text-sm font-light">Tri-Valley Clinic &nbsp;·&nbsp; Effective Date: 04/23/2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-5 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="prose-style space-y-10">

            <PolicySection number="1" title="Information We Collect">
              <p>We may collect personal information when you interact with our website, including when you submit forms or request appointments.</p>
              <PolicySubsection label="Personal Information">
                Name, phone number, email address, date of birth, and any information you voluntarily provide.
              </PolicySubsection>
              <PolicySubsection label="Usage Information">
                IP address, browser type, device type, pages visited, and referring URLs.
              </PolicySubsection>
              <PolicySubsection label="Cookies and Tracking Technologies">
                We may use cookies and similar technologies to improve website performance and user experience.
              </PolicySubsection>
              <PolicySubsection label="Communication Information">
                If you opt in to SMS messaging, we collect your phone number and communication preferences.
              </PolicySubsection>
            </PolicySection>

            <PolicySection number="2" title="How We Use Your Information">
              <p>We use your information to:</p>
              <PolicyList items={[
                "Respond to inquiries",
                "Schedule and manage appointments",
                "Provide administrative communications",
                "Improve website functionality",
                "Comply with legal obligations",
              ]} />
            </PolicySection>

            <PolicySection number="3" title="Health Information and HIPAA">
              <p>If you become a patient, your medical information is protected under the HIPAA Privacy Rule and the California Confidentiality of Medical Information Act.</p>
              <p>This Privacy Policy applies only to website data. Medical information is governed by our Notice of Privacy Practices.</p>
            </PolicySection>

            <PolicySection number="4" title="SMS Communications">
              <p>If you opt in, you agree to receive text messages from Tri-Valley Clinic.</p>
              <PolicyList items={[
                "Message frequency may vary",
                "Message and data rates may apply",
                "Reply STOP to opt out",
                "Reply HELP for assistance",
              ]} />
              <p>SMS is not used for emergencies or clinical care.</p>
            </PolicySection>

            <PolicySection number="5" title="Information Sharing">
              <p>We do not sell your personal information.</p>
              <p>We may share information with:</p>
              <PolicyList items={[
                "Service providers supporting operations",
                "Legal authorities when required",
              ]} />
            </PolicySection>

            <PolicySection number="6" title="Cookies and Analytics">
              <p>We may use analytics tools to improve website performance.</p>
            </PolicySection>

            <PolicySection number="7" title="Data Retention">
              <p>We retain data only as long as necessary.</p>
            </PolicySection>

            <PolicySection number="8" title="Data Security">
              <p>We use reasonable safeguards to protect your information.</p>
            </PolicySection>

            <PolicySection number="9" title="California Privacy Rights">
              <p>California residents have rights under the California Consumer Privacy Act, including:</p>
              <PolicyList items={[
                "Right to know",
                "Right to delete",
                "Right to correct",
                "Right to opt out of data sharing (we do not sell data)",
              ]} />
            </PolicySection>

            <PolicySection number="10" title="Contact Information">
              <div className="bg-[#F5EEE4] border border-[#E8D5BE] p-6 space-y-1.5">
                <p className="text-[#2C1A0E] font-semibold">Tri-Valley Clinic</p>
                <p className="text-[#7A6556]">680 Mowry Ave, Fremont, CA 94536</p>
                <p className="text-[#7A6556]">Phone: <a href="tel:5105984921" className="text-[#B8925A] hover:underline">510-598-4921</a></p>
                <p className="text-[#7A6556]">Email: <a href="mailto:contact@trivalleyclinic.com" className="text-[#B8925A] hover:underline">contact@trivalleyclinic.com</a></p>
              </div>
            </PolicySection>

          </div>
        </div>
      </section>
    </main>
  );
}

function PolicySection({ number, title, children }) {
  return (
    <div className="border-b border-[#E8D5BE] pb-8">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-3xl text-[#B8925A]/25 leading-none flex-shrink-0"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          {number.padStart(2, '0')}
        </span>
        <h2 className="text-2xl text-[#2C1A0E]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
          {title}
        </h2>
      </div>
      <div className="ml-10 space-y-3 text-[#7A6556] text-sm leading-relaxed font-light">
        {children}
      </div>
    </div>
  );
}

function PolicySubsection({ label, children }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.18em] uppercase text-[#B8925A] font-semibold mb-1">{label}</p>
      <p>{children}</p>
    </div>
  );
}

function PolicyList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] flex-shrink-0 mt-2" />
          {item}
        </li>
      ))}
    </ul>
  );
}