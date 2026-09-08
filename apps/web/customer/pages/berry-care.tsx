export default function BerryCarePage() {
  return (
    <main className="page-shell">
      <section className="care-hero">
        <h1>How to Enjoy Fresh Berries</h1>
        <p className="lead">
          Fresh berries are delicate. A little care after delivery goes a long
          way toward keeping them sweet, firm, and safe to eat.
        </p>
      </section>

      <section className="care-grid">
        <div className="care-card">
          <h3>🚿 Washing</h3>
          <p>
            Wash berries gently under cool running water only right before
            eating — not before storing. Washing too early adds moisture that
            speeds up spoilage. Pat dry with a paper towel or use a salad
            spinner.
          </p>
        </div>
        <div className="care-card">
          <h3>❄️ Refrigeration</h3>
          <p>
            Store unwashed berries in a single layer in a shallow, ventilated
            container in the refrigerator — crushing or stacking bruises them
            quickly. Most fresh berries keep well for 3–7 days refrigerated,
            depending on the variety and ripeness at delivery.
          </p>
        </div>
        <div className="care-card">
          <h3>🍽️ When to eat</h3>
          <p>
            Berries taste best within the first few days of arrival. Check
            for any soft or discoloured berries and remove them promptly —
            one spoiled berry can speed up spoilage in the whole batch.
          </p>
        </div>
        <div className="care-card">
          <h3>🧊 Freezing</h3>
          <p>
            To freeze, wash and thoroughly dry berries, then spread them in a
            single layer on a tray until solid before transferring to an
            airtight bag. This keeps them from clumping and preserves texture
            for smoothies and cooking.
          </p>
        </div>
        <div className="care-card">
          <h3>🥣 Serving ideas</h3>
          <p>
            Enjoy berries plain, over yogurt or cereal, blended into a lassi
            or smoothie, or folded into desserts. Bring refrigerated berries
            to room temperature for about 10 minutes before serving to bring
            out more of their natural sweetness.
          </p>
        </div>
        <div className="care-card">
          <h3>♻️ Reducing waste</h3>
          <p>
            Slightly overripe berries are perfect for jams, sauces, and baked
            goods rather than the bin — heat and sugar are forgiving of soft
            texture in a way that eating fresh isn&apos;t.
          </p>
        </div>
      </section>

      <style jsx>{`
        .care-hero {
          text-align: center;
          padding: 48px 20px 8px;
          max-width: 720px;
          margin: 0 auto;
        }

        .care-hero h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin: 0 0 14px;
        }

        .care-hero .lead {
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .care-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin: 48px 0 60px;
        }

        .care-card {
          background: var(--card);
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: var(--shadow);
        }

        .care-card h3 {
          margin: 0 0 12px;
          font-size: 1.1rem;
        }

        .care-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .care-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
