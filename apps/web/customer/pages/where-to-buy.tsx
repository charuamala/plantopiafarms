import { useRouter } from "next/router";
import { stores } from "../lib/stores";

export default function WhereToBuyPage() {
  const router = useRouter();

  return (
    <main className="page-shell">
      <section className="wtb-hero">
        <h1>Where to Buy Plantopia Berries</h1>
        <p className="lead">Find Plantopia berries at a store near you.</p>
      </section>

      <section className="wtb-notice">
        <p>
          The stores below are sample entries — replace them with your real
          stockists once confirmed. See <code>lib/stores.ts</code>.
        </p>
      </section>

      <section className="wtb-grid">
        {stores.map((store) => (
          <div key={store.name} className="wtb-card">
            <h3>{store.name}</h3>
            <p className="wtb-city">{store.city}</p>
            <p className="wtb-address">{store.address}</p>
            <p className="wtb-availability">Available: {store.availability}</p>
            {store.mapUrl && (
              <a href={store.mapUrl} target="_blank" rel="noreferrer" className="secondary">
                View Location
              </a>
            )}
          </div>
        ))}
      </section>

      <section className="wtb-cta">
        <h2>Prefer delivery?</h2>
        <p>Order online and get fresh berries delivered straight to your door.</p>
        <button type="button" className="cta-button" onClick={() => router.push("/shop")}>
          Buy Berries Online
        </button>
      </section>

      <style jsx>{`
        .wtb-hero {
          text-align: center;
          padding: 48px 20px 8px;
        }

        .wtb-hero h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin: 0 0 14px;
        }

        .wtb-hero .lead {
          color: var(--muted);
          font-size: 1.1rem;
          margin: 0;
        }

        .wtb-notice {
          max-width: 640px;
          margin: 24px auto 8px;
          background: var(--primary-soft);
          border-radius: 14px;
          padding: 14px 20px;
          text-align: center;
        }

        .wtb-notice p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--primary-dark);
        }

        .wtb-notice code {
          font-family: ui-monospace, monospace;
          background: rgba(255, 255, 255, 0.6);
          padding: 1px 6px;
          border-radius: 6px;
        }

        .wtb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin: 40px 0 60px;
        }

        .wtb-card {
          background: var(--card);
          border-radius: 20px;
          padding: 26px 24px;
          box-shadow: var(--shadow);
        }

        .wtb-card h3 {
          margin: 0 0 6px;
          font-size: 1.15rem;
        }

        .wtb-city {
          color: var(--primary-dark);
          font-weight: 700;
          margin: 0 0 10px;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .wtb-address,
        .wtb-availability {
          color: var(--muted);
          margin: 0 0 6px;
          font-size: 0.92rem;
        }

        .wtb-cta {
          text-align: center;
          background: linear-gradient(
            135deg,
            rgba(76, 140, 76, 0.12),
            rgba(255, 255, 255, 0.7)
          );
          border-radius: 24px;
          padding: 48px 24px;
          margin-bottom: 60px;
        }

        .wtb-cta h2 {
          margin: 0 0 8px;
        }

        .wtb-cta p {
          color: var(--muted);
          margin: 0 0 24px;
        }

        @media (max-width: 900px) {
          .wtb-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
