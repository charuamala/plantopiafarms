import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey, socialLinks } from "../lib/berries";

const bannerOrder: BerryKey[] = [
  "strawberry",
  "blueberry",
  "blackberry",
  "raspberry",
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedBerry, setSelectedBerry] = useState<BerryKey | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % bannerOrder.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    const cart = stored ? JSON.parse(stored) : [];
    setCartCount(
      cart.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0,
      ),
    );
  }, []);

  const handleAddToCart = (berry: BerryKey) => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    const cart = stored ? JSON.parse(stored) : [];
    const existing = cart.find((item: any) => item.id === berry);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: berry, quantity: 1 });
    }
    window.localStorage.setItem("plantopiaCart", JSON.stringify(cart));
    setCartCount(
      cart.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0,
      ),
    );
  };

  const activeBerry = bannerOrder[activeSlide];
  const slideInfo = berryCatalog[activeBerry];

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <button
            className="nav-cart"
            type="button"
            onClick={() => router.push("/cart")}
          >
            Cart ({cartCount})
          </button>
        </nav>
      </header>

      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 30, 18, 0.55), rgba(14, 62, 32, 0.18)), url(${slideInfo.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content">
          <p className="eyebrow">Fresh from our farm</p>
          <h1>Premium berries delivered to your table.</h1>
          <p>
            Natural sweetness, farm-fresh quality, and healthy berry goodness
            for every day.
          </p>
          <div className="cta-row">
            <button type="button" onClick={() => router.push("/shop")}>
              Shop Now
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => router.push("/about")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="berry-badge">Featured</div>
          <h3>{slideInfo.name}</h3>
          <p>{slideInfo.short}</p>
          <strong>{slideInfo.price}</strong>
          <button
            type="button"
            className="cta-button"
            onClick={() => setSelectedBerry(activeBerry)}
          >
            Quick view
          </button>
        </div>

        <div className="hero-dots" aria-label="banner slider dots">
          {bannerOrder.map((berry, index) => (
            <button
              key={berry}
              type="button"
              className={index === activeSlide ? "dot active" : "dot"}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to ${berry}`}
            />
          ))}
        </div>
      </section>

      <section className="section-intro">
        <div>
          <h2>Berry favorites</h2>
          <p>
            Discover our fresh strawberry, blueberry, blackberry, and raspberry
            packs, with product detail pages and easy checkout.
          </p>
        </div>
      </section>

      <section className="category-grid">
        {Object.entries(berryCatalog).map(([key, berry]) => (
          <div
            key={key}
            className="category-card"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.22)), url(${berry.image})`,
            }}
          >
            <strong>{berry.name}</strong>
            <p>{berry.short}</p>
            <div className="category-actions">
              <button
                type="button"
                onClick={() => setSelectedBerry(key as BerryKey)}
              >
                Quick view
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => router.push(`/berry/${key}`)}
              >
                Full details
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="share-row">
        <p>Share Plantopia Farms with friends:</p>
        <div className="share-buttons">
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </section>

      {selectedBerry && (
        <div className="modal-backdrop" onClick={() => setSelectedBerry(null)}>
          <div
            className="modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedBerry(null)}
            >
              ✕
            </button>
            <img
              src={berryCatalog[selectedBerry].image}
              alt={berryCatalog[selectedBerry].name}
            />
            <div className="modal-content">
              <div className="berry-badge">
                {berryCatalog[selectedBerry].name}
              </div>
              <h3>{berryCatalog[selectedBerry].short}</h3>
              <p>{berryCatalog[selectedBerry].description}</p>
              <ul>
                {berryCatalog[selectedBerry].benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <div className="modal-actions">
                <strong>{berryCatalog[selectedBerry].price}</strong>
                <button
                  type="button"
                  className="cta-button"
                  onClick={() => {
                    handleAddToCart(selectedBerry);
                    setSelectedBerry(null);
                  }}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    router.push(`/berry/${selectedBerry}`);
                    setSelectedBerry(null);
                  }}
                >
                  View full details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">Plantopia Farms</div>
          <div className="footer-links">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/orders">My Orders</Link>
          </div>
          <div className="footer-contact">
            <div>📞 +91 98765 43210</div>
            <div>✉️ hello@plantopiafarms.com</div>
          </div>
        </div>
        <div className="footer-note">
          © {new Date().getFullYear()} Plantopia Farms — Fresh berries
          delivered.
        </div>
      </footer>
    </main>
  );
}
