import { useEffect } from "react";
import SEO from '../components/SEO';

export default function LegalTerms() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: "#FDFAF6" }}>
      <SEO
        title="Terms of Use"
        description="Terms of Use for Tri-Valley Clinic's website. Informational purposes only — not medical advice. Fremont, CA."
        path="/terms-of-use"
      />

      {/* Hero */}
      <section className="bg-[#2C1A0E] py-16 px-5 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#B8925A] font-semibold mb-3">Legal</p>
          <h1 className="text-5xl md:text-6xl text-[#F0E8DA] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            Terms <em className="italic text-[#C9A46A]">of Use</em>
          </h1>
          <p className="text-[#A89880] text-sm font-light">Tri-Valley Clinic &nbsp;·&nbsp; Effective Date: 04/23/2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-5 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-10">

            <PolicySection number="1" title="Acceptance of Terms">
              <p>By accessing or using this website, you agree to these Terms of Use. If you do not agree, you should not use this website.</p>
            </PolicySection>

            <PolicySection number="2" title="Informational Purpose Only">
              <p>The content on this website is provided for general informational and educational purposes only.</p>
              <p>It is not intended to provide medical advice, diagnosis, or treatment. Do not rely on this website as a substitute for professional medical or mental health care.</p>
            </PolicySection>

            <PolicySection number="3" title="No Provider–Patient Relationship">
              <p>Use of this website does not create a provider–patient relationship between you and Tri-Valley Clinic.</p>
              <p>A formal clinical relationship is only established after completion of appropriate intake, evaluation, and acceptance as a patient by the clinic.</p>
            </PolicySection>

            <PolicySection number="4" title="Emergency and Crisis Situations">
              <p>This website is not intended for emergency or urgent mental health needs.</p>
              <p>If you are experiencing a medical or psychiatric emergency:</p>
              <PolicyList items={[
                "Call 911, or",
                "Dial or text 988 for the Suicide & Crisis Lifeline",
              ]} />
              <div className="bg-[#F5EEE4] border-l-4 border-[#B8925A] px-4 py-3 mt-2">
                <p className="text-[#2C1A0E] text-sm font-medium">Do not use this website or contact forms for emergency communication.</p>
              </div>
            </PolicySection>

            <PolicySection number="5" title="Website Use Restrictions">
              <p>You agree not to:</p>
              <PolicyList items={[
                "Use the website for unlawful purposes",
                "Attempt unauthorized access to systems or data",
                "Interfere with website operation or security",
                "Upload harmful code or attempt to disrupt services",
              ]} />
            </PolicySection>

            <PolicySection number="6" title="Intellectual Property">
              <p>All content on this website, including text, graphics, logos, and design elements, is owned by Tri-Valley Clinic and may not be copied, reproduced, or distributed without written permission.</p>
            </PolicySection>

            <PolicySection number="7" title="Third-Party Links">
              <p>This website may contain links to third-party websites. Tri-Valley Clinic is not responsible for the content, accuracy, or privacy practices of those external sites.</p>
            </PolicySection>

            <PolicySection number="8" title="Disclaimer of Warranties">
              <p>This website is provided on an "as is" and "as available" basis without warranties of any kind, express or implied.</p>
              <p>We do not guarantee that the website will be uninterrupted, error-free, or secure.</p>
            </PolicySection>

            <PolicySection number="9" title="Limitation of Liability">
              <p>To the fullest extent permitted under California law, Tri-Valley Clinic shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of this website.</p>
              <p>This limitation applies even if we have been advised of the possibility of such damages.</p>
            </PolicySection>

            <PolicySection number="10" title="Privacy">
              <p>Your use of this website is also governed by our <a href="/privacy-policy" className="text-[#B8925A] hover:underline">Privacy Policy</a>, which explains how we collect and use personal information.</p>
            </PolicySection>

            <PolicySection number="11" title="SMS and Online Communications">
              <p>Submitting forms or opting into SMS communication does not create an emergency communication channel and is subject to separate consent requirements.</p>
              <p>SMS communication is governed by our SMS Consent Policy and is not intended for clinical or urgent matters.</p>
            </PolicySection>

            <PolicySection number="12" title="Governing Law">
              <p>These Terms are governed by the laws of the State of California, without regard to conflict of law principles.</p>
              <p>Any disputes arising from these Terms shall be resolved in the state or federal courts located in California.</p>
            </PolicySection>

            <PolicySection number="13" title="Changes to These Terms">
              <p>We may update these Terms of Use from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.</p>
            </PolicySection>

            <PolicySection number="14" title="Contact Information">
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