import Link from "next/link";

export default function ContactPage() {
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
          <Link href="/about">About</Link>
        </nav>
      </header>

      <section className="page-hero simple">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>We’re here to help.</h1>
          <p>
            Reach out for order support, wholesale inquiries, or farm updates.
          </p>
        </div>
      </section>

      <section className="contact-grid">
        <div className="contact-card">
          <h2>Business contact</h2>
          <p>Benitto Prabu F</p>
          <p>Business Development Manager</p>
          <p>+91 74004 55538</p>
          <p>+91 97909 65058</p>
          <p>benitto@plantopiafarms.com</p>
        </div>
        <div className="contact-card">
          <h2>Visit our farm</h2>
          <p>Plantopia Farms</p>
          <p>
            1/271 Kookal, Naavalorai Masakkal, Kotagiri, The Nilgiris, TN 643217
          </p>
        </div>
        <div className="contact-card">
          <h2>Website</h2>
          <p>www.plantopiafarms.com</p>
          <p>Instagram: @plantopiafarms</p>
          <p>Facebook: Plantopia Farms</p>
        </div>
      </section>

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
