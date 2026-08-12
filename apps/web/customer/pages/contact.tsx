import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
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
          <h2>Customer care</h2>
          <p>hello@plantopiafarms.com</p>
          <p>+91 98765 43210</p>
        </div>
        <div className="contact-card">
          <h2>Visit our farm</h2>
          <p>Plantopia Farms</p>
          <p>Chennai, Tamil Nadu, India</p>
        </div>
        <div className="contact-card">
          <h2>Social</h2>
          <p>Instagram: @plantopiafarms</p>
          <p>Facebook: Plantopia Farms</p>
        </div>
      </section>

      <footer className="site-footer compact">
        <div className="footer-inner">
          <div className="footer-brand">Plantopia Farms</div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
