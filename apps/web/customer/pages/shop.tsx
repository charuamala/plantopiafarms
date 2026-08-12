import Link from "next/link";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey } from "../lib/berries";

type CartItem = { id: BerryKey; quantity: number };

export default function ShopPage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    const cart = stored ? JSON.parse(stored) : [];
    setCartCount(
      cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    );
  }, []);

  const addToCart = (berry: BerryKey) => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];
    const existing = cart.find((item) => item.id === berry);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: berry, quantity: 1 });
    }
    window.localStorage.setItem("plantopiaCart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
        </nav>
      </header>

      <section className="page-hero simple">
        <div>
          <p className="eyebrow">Shop our fresh berries</p>
          <h1>Choose your favorite berry box.</h1>
          <p>
            Quick checkout, same-day packing, and farm-direct delivery for your
            family.
          </p>
        </div>
      </section>

      <section className="product-grid">
        {Object.entries(berryCatalog).map(([key, berry]) => (
          <article key={key} className="product-card">
            <img src={berry.image} alt={berry.name} />
            <div className="product-body">
              <h3>{berry.name}</h3>
              <p>{berry.short}</p>
              <strong>{berry.price}</strong>
              <div className="product-actions">
                <Link href={`/berry/${key}`} className="secondary">
                  Details
                </Link>
                <button
                  type="button"
                  onClick={() => addToCart(key as BerryKey)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

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
