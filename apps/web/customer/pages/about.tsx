import Link from "next/link";
import TeamSection from "../src/components/TeamSection";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <Link href="/">
          <a className="brand" aria-label="Plantopia Farms home">
            <img src="/logo.svg" alt="Plantopia Farms" />
          </a>
        </Link>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="page-hero simple">
        <div>
          <p className="eyebrow">About us</p>
          <h1>From our fields to your family table.</h1>
          <p>
            Plantopia Farms grows berries with care so you get fresh, healthy
            fruit in every bite.
          </p>
        </div>
      </section>

      <section className="info-grid">
        <div>
          <h2>Farm-first quality</h2>
          <p>
            We focus on sustainable growing, gentle harvesting, and small-batch
            packing so your berries arrive with peak taste.
          </p>
        </div>
        <div>
          <h2>Healthy berry benefits</h2>
          <p>
            Our berries are rich in antioxidants, vitamin C, fiber, and natural
            energy for everyday meals.
          </p>
        </div>
        <div>
          <h2>Easy delivery</h2>
          <p>
            Choose your berry mix, checkout with editable shipping, and get
            farm-fresh berries delivered to your door.
          </p>
        </div>
      </section>

      <TeamSection />

      <footer className="site-footer compact">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link href="/">
              <a aria-label="Plantopia Farms home">
                <img src="/logo.svg" alt="Plantopia Farms" />
              </a>
            </Link>
          </div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
