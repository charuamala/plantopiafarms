import TeamSection from "../src/components/TeamSection";
import { useReveal } from "../lib/useReveal";

export default function AboutPage() {
  const card1 = useReveal();
  const card2 = useReveal();
  const card3 = useReveal();

  return (
    <main className="page-shell">
      <section className="page-hero simple about-hero">
        <div>
          <p className="eyebrow">About us</p>
          <h1>From our fields to your family table.</h1>
          <p>
            Plantopia Farms grows berries with care so you get fresh, healthy
            fruit in every bite.
          </p>
        </div>
        <div className="hero-float-image about-hero-image" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80"
            alt=""
          />
        </div>
      </section>

      <section className="info-grid">
        <div
          ref={card1.ref}
          className={`reveal${card1.visible ? " reveal-visible" : ""}`}
        >
          <h2>Farm-first quality</h2>
          <p>
            We focus on sustainable growing, gentle harvesting, and small-batch
            packing so your berries arrive with peak taste.
          </p>
        </div>
        <div
          ref={card2.ref}
          className={`reveal${card2.visible ? " reveal-visible" : ""}`}
          style={{ transitionDelay: "90ms" }}
        >
          <h2>Healthy berry benefits</h2>
          <p>
            Our berries are rich in antioxidants, vitamin C, fiber, and natural
            energy for everyday meals.
          </p>
        </div>
        <div
          ref={card3.ref}
          className={`reveal${card3.visible ? " reveal-visible" : ""}`}
          style={{ transitionDelay: "180ms" }}
        >
          <h2>Easy delivery</h2>
          <p>
            Choose your berry mix, checkout with editable shipping, and get
            farm-fresh berries delivered to your door.
          </p>
        </div>
      </section>

      <TeamSection />
    </main>
  );
}
