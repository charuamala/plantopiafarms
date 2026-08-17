import { useReveal } from "../lib/useReveal";

export default function ContactPage() {
  const card1 = useReveal();
  const card2 = useReveal();
  const card3 = useReveal();

  return (
    <main className="page-shell">
      <section className="page-hero simple contact-hero">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>We’re here to help.</h1>
          <p>
            Reach out for order support, wholesale inquiries, or farm updates.
          </p>
        </div>
        <div className="hero-float-image contact-hero-image" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80"
            alt=""
          />
        </div>
      </section>

      <section className="contact-grid">
        <div
          ref={card1.ref}
          className={`contact-card reveal${card1.visible ? " reveal-visible" : ""}`}
        >
          <h2>Business contact</h2>
          <p>Benitto Prabu F</p>
          <p>Business Development Manager</p>
          <p>+91 74004 55538</p>
          <p>+91 97909 65058</p>
          <p>benitto@plantopiafarms.com</p>
        </div>
        <div
          ref={card2.ref}
          className={`contact-card reveal${card2.visible ? " reveal-visible" : ""}`}
          style={{ transitionDelay: "90ms" }}
        >
          <h2>Visit our farm</h2>
          <p>Plantopia Farms</p>
          <p>
            1/271 Kookal, Naavalorai Masakkal, Kotagiri, The Nilgiris, TN 643217
          </p>
        </div>
        <div
          ref={card3.ref}
          className={`contact-card reveal${card3.visible ? " reveal-visible" : ""}`}
          style={{ transitionDelay: "180ms" }}
        >
          <h2>Website</h2>
          <p>www.plantopiafarms.com</p>
          <p>Instagram: @plantopiafarms</p>
          <p>Facebook: Plantopia Farms</p>
        </div>
      </section>
    </main>
  );
}
