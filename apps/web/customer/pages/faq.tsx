import FaqAccordion from "../src/components/FaqAccordion";
import { faqItems } from "../lib/faq";

export default function FaqPage() {
  return (
    <main className="page-shell">
      <section className="page-hero simple faq-hero">
        <div>
          <p className="eyebrow">FAQ</p>
          <h1>Questions? We've probably answered it here.</h1>
          <p>
            Everything you need to know about growing, ordering, and
            receiving your berries.
          </p>
        </div>
        <div className="hero-float-image faq-hero-image" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&w=900&q=80"
            alt=""
          />
        </div>
      </section>

      <section className="faq-section">
        <FaqAccordion items={faqItems} />
      </section>

      <section className="faq-cta">
        <h2>Still have a question?</h2>
        <p>Our team is happy to help with anything not covered above.</p>
        <a href="/contact" className="cta-button">
          Contact us
        </a>
      </section>
    </main>
  );
}
