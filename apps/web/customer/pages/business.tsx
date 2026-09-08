import EnquiryForm from "../src/components/EnquiryForm";

export default function BusinessPage() {
  return (
    <main className="page-shell">
      <section className="biz-hero">
        <span className="eyebrow">For Business</span>
        <h1>Partner with Plantopia</h1>
        <p className="lead">
          Wholesale supply and distribution for retailers, hotels,
          restaurants, cafes, and other food businesses.
        </p>
      </section>

      <section className="biz-notice">
        <p>
          [Placeholder content — replace the sections below with your real
          wholesale pricing, minimum order quantities, and delivery areas.]
        </p>
      </section>

      <section className="biz-sections">
        <div className="biz-section-card">
          <h3>Wholesale Supply</h3>
          <p>
            Bulk berry and jam supply for businesses that need consistent
            volume and quality — replace with your real order tiers and
            pricing structure.
          </p>
        </div>
        <div className="biz-section-card">
          <h3>Distribution</h3>
          <p>
            Regional distribution partnerships for retailers looking to
            stock Plantopia berries — replace with your real coverage areas.
          </p>
        </div>
        <div className="biz-section-card">
          <h3>Retail Partnerships</h3>
          <p>
            Support for stores stocking Plantopia products, from packaging to
            replenishment — replace with your real partnership terms.
          </p>
        </div>
      </section>

      <section className="biz-form-section">
        <h2>Business Enquiry</h2>
        <p>Tell us about your business and requirements — our team will follow up.</p>
        <EnquiryForm
          type="business"
          companyLabel="Business name"
          messageLabel="Your requirement"
          messagePlaceholder="Business type, location, estimated order volume, delivery frequency..."
        />
      </section>
    </main>
  );
}
