import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey } from "../../lib/berries";
import SocialShare from "../../src/components/SocialShare";

export default function BerryCategoryPage() {
  const router = useRouter();
  const { berry } = router.query;
  const [berryKey, setBerryKey] = useState<BerryKey | null>(null);

  useEffect(() => {
    if (!berry) return;
    const key = Array.isArray(berry) ? berry[0] : berry;
    if (key in berryCatalog) {
      setBerryKey(key as BerryKey);
    }
  }, [berry]);

  if (!berryKey) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Berry not found</h1>
          <button type="button" onClick={() => router.push("/shop")}>
            Back to shop
          </button>
        </section>
      </main>
    );
  }

  const berryInfo = berryCatalog[berryKey];

  return (
    <main className="page-shell detail-page-shell">
      <div className="detail-card">
        <button
          type="button"
          className="back-button"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <div className="detail-layout">
          <div className="detail-image-wrap">
            <img
              src={berryInfo.image}
              alt={berryInfo.name}
              className="detail-image"
            />
            <div className="detail-image-footer">
              <span>{berryInfo.name}</span>
            </div>
          </div>

          <div className="detail-info">
            <div className="berry-badge">{berryInfo.name}</div>
            <h1>{berryInfo.name}</h1>
            <p className="detail-tagline">{berryInfo.short}</p>

            <div className="detail-meta-row">
              <span>Farm Fresh</span>
              <span>No Added Sugar</span>
            </div>

            <button
              type="button"
              className="cta-button full-width"
              onClick={() => router.push(`/shop?berry=${berryKey}`)}
            >
              Shop {berryInfo.name.toLowerCase()} products
            </button>

            <div className="detail-section">
              <h3>Why you’ll love it</h3>
              <ul className="detail-benefit-list">
                {berryInfo.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="detail-description-block">
          <h3>Description</h3>
          <p>{berryInfo.description}</p>
          <div className="nutrition-tags">
            {berryInfo.nutrition.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <SocialShare />
        </div>

        <div className="detail-summary-grid">
          <div className="summary-card">
            <h4>Next Day Delivery</h4>
            <p>
              Order before 12:30 PM and get your berry order delivered the very
              next morning.
            </p>
          </div>
          <div className="summary-card">
            <h4>Ozone Washed</h4>
            <p>
              Clean, safe and natural fruit handling for a fresh taste you can
              trust.
            </p>
          </div>
          <div className="summary-card">
            <h4>HACCP Certified</h4>
            <p>
              Quality controlled from harvest to packed freshness for dependable
              nutrition.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
