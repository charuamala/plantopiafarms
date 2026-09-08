import EnquiryForm from "../src/components/EnquiryForm";

export default function InvestorsPage() {
  return (
    <main className="page-shell">
      <section className="biz-hero">
        <span className="eyebrow">For Investors</span>
        <h1>Investor Relations</h1>
        <p className="lead">
          Learn more about the opportunity behind Plantopia&apos;s berry
          business.
        </p>
      </section>

      <section className="biz-notice">
        <p>
          [Placeholder content — this page intentionally contains no
          financial figures, valuations, or production numbers. Replace the
          sections below with real, approved investor content.]
        </p>
      </section>

      <section className="biz-sections">
        <div className="biz-section-card">
          <h3>The Opportunity</h3>
          <p>
            [Placeholder.] Describe the berry market opportunity and why
            Plantopia is positioned to serve it — replace with real,
            approved content.
          </p>
        </div>
        <div className="biz-section-card">
          <h3>Our Approach</h3>
          <p>
            [Placeholder.] Describe the farm-to-market model, quality focus,
            and what differentiates Plantopia&apos;s approach.
          </p>
        </div>
        <div className="biz-section-card">
          <h3>Growth Plans</h3>
          <p>
            [Placeholder.] Describe future plans and direction at a level
            appropriate for public disclosure.
          </p>
        </div>
      </section>

      <section className="biz-form-section">
        <h2>Investor Enquiry</h2>
        <p>Share a few details and our team will follow up directly.</p>
        <EnquiryForm
          type="investor"
          companyLabel="Organization (optional)"
          messageLabel="Your enquiry"
          messagePlaceholder="Tell us about your interest..."
        />
      </section>
    </main>
  );
}
