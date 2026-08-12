import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey } from "../../lib/berries";

export default function BerryDetailPage() {
  const router = useRouter();
  const { berry } = router.query;
  const [berryKey, setBerryKey] = useState<BerryKey | null>(null);

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
    if (existing) existing.quantity += 1;
    else cart.push({ id: berryKey, quantity: 1 });
    window.localStorage.setItem("plantopiaCart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <main className="detail-page">
      <div className="detail-card">
        <button
          type="button"
          className="back-button"
          onClick={() => router.back()}
        >
          ← Back to shop
        </button>
        <div className="detail-layout">
          <div className="detail-image-wrap">
            <img
              src={berryInfo.image}
              alt={berryInfo.name}
              className="detail-image"
            />
          </div>
          <div className="detail-info">
            <div className="berry-badge">{berryInfo.name}</div>
            <h1>{berryInfo.name}</h1>
            <p className="detail-tagline">{berryInfo.short}</p>
            <p className="detail-description">{berryInfo.description}</p>
            <div className="detail-price-row">
              <strong>{berryInfo.price}</strong>
              <button type="button" className="cta-button" onClick={addToCart}>
                Add to cart
              </button>
            </div>
            <div className="detail-section">
              <h3>Health benefits</h3>
              <ul>
                {berryInfo.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="detail-section">
              <h3>Good source of</h3>
              <div className="nutrition-tags">
                {berryInfo.nutrition.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
