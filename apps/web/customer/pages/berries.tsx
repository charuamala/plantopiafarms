import Link from "next/link";
import { useRouter } from "next/router";
import { berryCatalog } from "../lib/berries";

export default function BerriesPage() {
  const router = useRouter();

  return (
    <main className="page-shell">
      <section className="berries-hero">
        <h1>Discover Plantopia Berries</h1>
        <p className="lead">
          Fresh, wholesome berries grown with care in Kotagiri — naturally
          sweet, carefully harvested, and delivered close to peak ripeness.
        </p>
      </section>

      <section className="berries-intro">
        <div>
          <h2>Why fresh matters</h2>
          <p>
            Berries lose flavour and nutrition fast once picked. That&apos;s
            why we harvest early in the morning, cool them immediately, and
            move them through a short, careful cold chain — so what reaches
            you tastes like it was just picked, because it nearly was.
          </p>
        </div>
        <div>
          <h2>The Plantopia difference</h2>
          <p>
            Every variety we grow is chosen for flavour first. We farm with
            minimal synthetic inputs, handle every berry gently by hand, and
            pack in small batches rather than rushing volume — so quality
            stays consistent, box after box.
          </p>
        </div>
      </section>

      <section className="berries-grid">
        {Object.entries(berryCatalog).map(([key, berry]) => (
          <article key={key} className="berry-variety-card">
            <div
              className="berry-variety-image"
              style={{ backgroundImage: `url(${berry.image})` }}
            />
            <div className="berry-variety-body">
              <h3>{berry.name}</h3>
              <p>{berry.short}</p>
              <p className="berry-variety-desc">{berry.description}</p>
              <div className="berry-variety-tags">
                {berry.nutrition.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="berry-variety-actions">
                <Link href={`/berry/${key}`} className="secondary">
                  Learn more
                </Link>
                <button
                  type="button"
                  className="cta-button"
                  onClick={() => router.push(`/shop?berry=${key}`)}
                >
                  Shop {berry.name.toLowerCase()}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="berries-cta">
        <h2>Ready to buy?</h2>
        <p>See how ordering works, from bulk packs to store pickup.</p>
        <div className="cta-row">
          <button type="button" onClick={() => router.push("/how-to-buy")}>
            How to Buy
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => router.push("/where-to-buy")}
          >
            Where to Buy
          </button>
        </div>
      </section>

      <style jsx>{`
        .berries-hero {
          text-align: center;
          padding: 48px 20px 8px;
          max-width: 720px;
          margin: 0 auto;
        }

        .berries-hero h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin: 0 0 14px;
        }

        .berries-hero .lead {
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .berries-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 1000px;
          margin: 48px auto;
        }

        .berries-intro h2 {
          font-size: 1.3rem;
          margin: 0 0 10px;
        }

        .berries-intro p {
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
        }

        .berries-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 60px;
        }

        .berry-variety-card {
          background: var(--card);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .berry-variety-image {
          height: 220px;
          background-size: cover;
          background-position: center;
        }

        .berry-variety-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .berry-variety-body h3 {
          margin: 0;
          font-size: 1.4rem;
        }

        .berry-variety-body > p {
          margin: 0;
          color: var(--muted);
        }

        .berry-variety-desc {
          line-height: 1.6;
        }

        .berry-variety-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 4px 0 8px;
        }

        .berry-variety-tags span {
          background: var(--primary-soft);
          color: var(--primary-dark);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .berry-variety-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }

        .berries-cta {
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

        .berries-cta h2 {
          margin: 0 0 8px;
        }

        .berries-cta p {
          color: var(--muted);
          margin: 0 0 24px;
        }

        @media (max-width: 768px) {
          .berries-intro,
          .berries-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
