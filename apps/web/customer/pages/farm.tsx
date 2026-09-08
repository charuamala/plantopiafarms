import Link from "next/link";
import { useRouter } from "next/router";

export default function FarmPage() {
  const router = useRouter();

  return (
    <main className="page-shell">
      <section className="farm-hero">
        <div className="farm-hero-content">
          <h1>Our Farm in Kotagiri</h1>
          <p className="lead">
            Sustainably grown, hand-harvested, delivered fresh to your table.
          </p>
        </div>
      </section>

      <section className="farm-section">
        <div className="farm-grid">
          <div className="farm-text">
            <h2>Growing with Care</h2>
            <p>
              Nestled in the cool highlands of Kotagiri, Plantopia Farms spans
              multiple acres dedicated to premium berry cultivation. Our farm
              practices sustainable agriculture with minimal synthetic inputs,
              focusing on soil health, biodiversity, and natural pest management.
            </p>
            <p>
              We believe that great berries start with great farming. Every bush
              receives individualized care throughout the growing season, ensuring
              optimal ripeness and maximum flavor at harvest time.
            </p>
          </div>
          <div className="farm-image" style={{backgroundImage: 'url(/images/farm-growing-care.jpg)'}} />
        </div>
      </section>

      <section className="farm-section alternate">
        <div className="farm-image" style={{backgroundImage: 'url(/images/farm-harvest.jpg)'}} />
        <div className="farm-text">
          <h2>Harvest to Delivery</h2>
          <p>
            Our berries are hand-picked at peak ripeness to ensure maximum
            sweetness, flavor, and nutritional value. We harvest early in the
            morning when berries are coolest, then immediately pack them in
            refrigerated containers.
          </p>
          <p>
            From harvest to your door, we maintain a cold chain to preserve
            freshness. Most orders ship within 24 hours, arriving fresh and ready
            to enjoy. We offer bulk packs (0.5kg, 1kg, 2kg) for families, businesses,
            and bulk buyers seeking premium farm-fresh berries.
          </p>
        </div>
      </section>

      <section className="farm-section">
        <div className="farm-text">
          <h2>Artisan Preserves</h2>
          <p>
            Beyond fresh berries, we craft handmade jams and preserves in small
            batches using only our farm's berries and minimal added sugar. Each jar
            represents a moment of peak ripeness, preserved to deliver pure berry
            flavor throughout the year.
          </p>
          <p>
            Our Artisan Jams collection includes Blackberry, Raspberry, and Mixed
            Berry varieties, each available in bulk sizes (0.5kg, 1kg, 2kg) for
            restaurants, cafes, and retail partners.
          </p>
          <button
            type="button"
            className="cta-button"
            onClick={() => router.push("/shop?category=jams")}
          >
            Shop Artisan Jams
          </button>
        </div>
        <div className="farm-image" style={{backgroundImage: 'url(/images/farm-jam.jpg)'}} />
      </section>

      <section className="farm-values">
        <h2>Our Commitment</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>🌱 Sustainability</h3>
            <p>
              We farm with regenerative practices that improve soil health and
              support local ecosystems.
            </p>
          </div>
          <div className="value-card">
            <h3>🍓 Quality</h3>
            <p>
              Every berry meets our strict quality standards before packing.
              No compromises on taste or freshness.
            </p>
          </div>
          <div className="value-card">
            <h3>⚡ Speed</h3>
            <p>
              Harvested today, packaged today, delivered tomorrow. Farm-fresh
              means no delays.
            </p>
          </div>
          <div className="value-card">
            <h3>🤝 Community</h3>
            <p>
              We support local workers, fair trade practices, and direct
              relationships with our customers.
            </p>
          </div>
        </div>
      </section>

      <section className="farm-cta">
        <h2>Experience Farm Freshness</h2>
        <p>
          Bulk berries and artisan jams, delivered fresh from Kotagiri to your
          table.
        </p>
        <div className="cta-row">
          <button type="button" onClick={() => router.push("/shop")}>
            Shop Bulk Berries
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => router.push("/shop?category=jams")}
          >
            Shop Artisan Jams
          </button>
        </div>
      </section>

      <style jsx>{`
        .farm-hero {
          background: linear-gradient(
            135deg,
            rgba(0, 100, 50, 0.7),
            rgba(59, 130, 79, 0.6)
          ),
          url('/images/farm-strawberry-field.jpg');
          background-size: cover;
          background-position: center;
          padding: 60px 40px;
          border-radius: 12px;
          color: white;
          text-align: center;
          margin-bottom: 60px;
        }

        .farm-hero h1 {
          font-size: 3rem;
          margin-bottom: 12px;
        }

        .farm-hero .lead {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .farm-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 60px;
          padding: 40px 0;
          border-bottom: 1px solid rgba(33, 40, 29, 0.08);
        }

        .farm-section.alternate {
          grid-template-columns: 1fr 1fr;
        }

        .farm-section.alternate .farm-image {
          order: -1;
        }

        .farm-text h2 {
          font-size: 2rem;
          margin-bottom: 24px;
          color: var(--text);
        }

        .farm-text p {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 16px;
          color: var(--muted);
        }

        .farm-text button {
          margin-top: 12px;
        }

        .farm-image {
          width: 100%;
          height: 400px;
          border-radius: 8px;
          background-size: cover;
          background-position: center;
          box-shadow: var(--shadow);
        }

        .farm-values {
          margin-bottom: 60px;
          text-align: center;
        }

        .farm-values h2 {
          font-size: 2rem;
          margin-bottom: 40px;
          color: var(--text);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .value-card {
          padding: 24px;
          background: white;
          border-radius: 8px;
          border: 1px solid rgba(33, 40, 29, 0.08);
          text-align: center;
        }

        .value-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
        }

        .value-card p {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .farm-cta {
          background: linear-gradient(
            135deg,
            rgba(76, 140, 76, 0.12),
            rgba(255, 255, 255, 0.7)
          );
          border-radius: 12px;
          padding: 60px 40px;
          text-align: center;
        }

        .farm-cta h2 {
          font-size: 2rem;
          margin-bottom: 12px;
          color: var(--text);
        }

        .farm-cta p {
          font-size: 1.1rem;
          color: var(--muted);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .farm-section {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .farm-section.alternate .farm-image {
            order: 0;
          }

          .farm-hero {
            padding: 40px 20px;
          }

          .farm-hero h1 {
            font-size: 2rem;
          }

          .farm-text h2 {
            font-size: 1.5rem;
          }

          .farm-image {
            height: 300px;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
