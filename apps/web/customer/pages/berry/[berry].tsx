import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey } from "../../lib/berries";
import SocialShare from "../../src/components/SocialShare";

export default function BerryDetailPage() {
  const router = useRouter();
  const { berry } = router.query;
  const [berryKey, setBerryKey] = useState<BerryKey | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!berry) return;
    const key = Array.isArray(berry) ? berry[0] : berry;
    if (key in berryCatalog) {
      setBerryKey(key as BerryKey);
    }
  }, [berry]);

  if (!berryKey) {
    return (
      <main className="page-shell">
        <header className="topbar">
          <div className="brand">Plantopia Farms</div>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
          </nav>
        </header>
        <section className="empty-state">
          <h1>Berry not found</h1>
          <button type="button" onClick={() => router.push("/shop")}>
            Back to shop
          </button>
        </section>
      </main>
    );
  }

  const berryInfo = berryCatalog[berryKey];

  const addToCart = () => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    const cart = stored ? JSON.parse(stored) : [];
    const existing = cart.find((item: any) => item.id === berryKey);
    if (existing) existing.quantity += quantity;
    else cart.push({ id: berryKey, quantity });
    window.localStorage.setItem("plantopiaCart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <main className="page-shell detail-page-shell">
      <div className="promo-bar">
        <span>
          Download the App and Get FLAT 25% Off + 25% Cashback on 1st Order
        </span>
        <button type="button" className="promo-button">
          Download
        </button>
        <button type="button" className="location-button">
          Select Your Location
        </button>
      </div>

      <header className="shop-topbar detail-header">
        <div className="brand shop-brand">Plantopia Farms</div>

        <div className="shop-search-wrap">
          <span className="search-icon">⌕</span>
          <input type="text" placeholder="Search for our farm-fresh products" />
        </div>

        <nav className="shop-nav">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/orders">Account</Link>
          <button
            type="button"
            className="icon-cart"
            onClick={() => router.push("/cart")}
          >
            🛒
          </button>
        </nav>
      </header>

      <div className="detail-card">
        <button
          type="button"
          className="back-button"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <div className="detail-layout">
          <div className="detail-image-wrap">
            <div className="detail-product-tag">Cold pressed</div>
            <img
              src={berryInfo.image}
              alt={berryInfo.name}
              className="detail-image"
            />
            <div className="detail-image-footer">
              <span>{berryInfo.name}</span>
              <strong>250 ml</strong>
            </div>
          </div>

          <div className="detail-info">
            <div className="berry-badge">{berryInfo.name}</div>
            <h1>{berryInfo.name}</h1>
            <p className="detail-tagline">{berryInfo.short}</p>

            <div className="detail-meta-row">
              <span>250 ml</span>
              <span>Farm Fresh</span>
              <span>No Added Sugar</span>
            </div>

            <div className="detail-price-row">
              <strong>{berryInfo.price}</strong>
            </div>

            <div className="detail-toggle-row">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>

            <button
              type="button"
              className="cta-button full-width"
              onClick={addToCart}
            >
              Add
            </button>

            <div className="detail-section">
              <h3>Why you’ll love it</h3>
              <ul className="detail-benefit-list">
                {berryInfo.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="detail-description-block">
          <h3>Description</h3>
          <p>{berryInfo.description}</p>
          <p>
            Crafted for everyday wellness, each serving brings a naturally
            vibrant taste, a burst of fruit freshness, and a feel-good boost
            that fits clean, active living.
          </p>
          <div className="nutrition-tags">
            {berryInfo.nutrition.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <SocialShare />
        </div>

        <div className="detail-summary-grid">
          <div className="summary-card">
            <h4>Next Day Delivery</h4>
            <p>
              Order before 12:30 PM and get your berry order delivered the very
              next morning.
            </p>
          </div>
          <div className="summary-card">
            <h4>Ozone Washed</h4>
            <p>
              Clean, safe and natural fruit handling for a fresh taste you can
              trust.
            </p>
          </div>
          <div className="summary-card">
            <h4>HACCP Certified</h4>
            <p>
              Quality controlled from harvest to packed freshness for dependable
              nutrition.
            </p>
          </div>
        </div>
      </div>

      <footer className="site-footer compact">
        <div className="footer-inner">
          <div className="footer-brand">Plantopia Farms</div>
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
