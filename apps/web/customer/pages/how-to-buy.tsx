import { useRouter } from "next/router";

const steps = [
  {
    number: "1",
    title: "Choose your berries",
    body: "Browse strawberries, blueberries, blackberries, and raspberries — sold fresh by weight or in bulk packs (0.5kg, 1kg, 2kg).",
  },
  {
    number: "2",
    title: "Pick how you want to buy",
    body: "Order online for home delivery, find Plantopia berries at a store near you, or reach out directly for wholesale quantities.",
  },
  {
    number: "3",
    title: "Place your order",
    body: "Add to cart and check out online, visit a stockist in person, or send a wholesale enquiry for larger orders.",
  },
  {
    number: "4",
    title: "Enjoy fresh berries",
    body: "Orders are harvested and packed close to delivery, so what arrives is as close to farm-fresh as it gets.",
  },
];

export default function HowToBuyPage() {
  const router = useRouter();

  return (
    <main className="page-shell">
      <section className="htb-hero">
        <h1>How to Buy Plantopia Berries</h1>
        <p className="lead">
          Four simple steps, whether you&apos;re ordering a punnet for home or
          buying in bulk for a business.
        </p>
      </section>

      <section className="htb-steps">
        {steps.map((step) => (
          <div key={step.number} className="htb-step">
            <div className="htb-step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </section>

      <section className="htb-options">
        <div className="htb-option">
          <h2>Buy Online</h2>
          <p>
            Order fresh berries and bulk packs directly through our shop, with
            home delivery and secure checkout.
          </p>
          <button type="button" className="cta-button" onClick={() => router.push("/shop")}>
            Buy Berries Online
          </button>
        </div>
        <div className="htb-option">
          <h2>Buy In-Store</h2>
          <p>
            Prefer to pick your berries in person? See which partner stores
            near you carry Plantopia berries.
          </p>
          <button type="button" className="secondary" onClick={() => router.push("/where-to-buy")}>
            Find a Store
          </button>
        </div>
        <div className="htb-option">
          <h2>Buy Wholesale</h2>
          <p>
            Restaurants, cafes, and retailers can order in bulk directly from
            the farm with dedicated business pricing.
          </p>
          <button type="button" className="secondary" onClick={() => router.push("/business")}>
            Wholesale Enquiry
          </button>
        </div>
      </section>

      <style jsx>{`
        .htb-hero {
          text-align: center;
          padding: 48px 20px 8px;
          max-width: 720px;
          margin: 0 auto;
        }

        .htb-hero h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin: 0 0 14px;
        }

        .htb-hero .lead {
          color: var(--muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        .htb-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin: 48px 0;
        }

        .htb-step {
          background: var(--card);
          border-radius: 20px;
          padding: 28px 22px;
          box-shadow: var(--shadow);
          text-align: center;
        }

        .htb-step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          margin: 0 auto 16px;
        }

        .htb-step h3 {
          margin: 0 0 8px;
          font-size: 1.1rem;
        }

        .htb-step p {
          margin: 0;
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .htb-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 60px;
        }

        .htb-option {
          background: linear-gradient(180deg, #ffffff, #fbfdfb);
          border: 1px solid rgba(15, 25, 18, 0.06);
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .htb-option h2 {
          margin: 0 0 10px;
          font-size: 1.2rem;
        }

        .htb-option p {
          color: var(--muted);
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .htb-option button {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .htb-steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .htb-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
