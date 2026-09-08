import EnquiryForm from "../src/components/EnquiryForm";

export default function GrowersPage() {
  return (
    <main className="page-shell">
      <section className="biz-hero">
        <span className="eyebrow">For Growers</span>
        <h1>Become a Plantopia Grower</h1>
        <p className="lead">
          We work directly with growers who share our focus on quality,
          freshness, and sustainable farming.
        </p>
      </section>

      <section className="biz-notice">
        <p>
          [Placeholder content — replace the sections below with your real
          growing standards, support structure, and application process.]
        </p>
      </section>

      <section className="biz-sections">
        <div className="biz-section-card">
          <h3>Our Growing Approach</h3>
          <p>
            We favour sustainable practices with minimal synthetic inputs,
            focused on soil health and long-term yield rather than short-term
            volume.
          </p>
        </div>
        <div className="biz-section-card">
          <h3>Quality Expectations</h3>
          <p>
            Every batch is expected to meet consistent standards for
            ripeness, handling, and freshness before it reaches our cold
            chain.
          </p>
        </div>
        <div className="biz-section-card">
          <h3>Grower Support</h3>
          <p>
            Partner growers get agronomic guidance and a direct line to our
            farm team — replace this with your real support offering.
          </p>
        </div>
      </section>

      <section className="biz-form-section">
        <h2>Grower Enquiry</h2>
        <p>Tell us about your farm and growing conditions — we&apos;ll be in touch.</p>
        <EnquiryForm
          type="grower"
          companyLabel="Farm name"
          messageLabel="About your farm"
          messagePlaceholder="Location, acreage, crops currently grown, growing methods..."
        />
      </section>
    </main>
  );
}
