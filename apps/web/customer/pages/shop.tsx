import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey } from "../lib/berries";
import SocialShare from "../src/components/SocialShare";

type CartItem = { id: BerryKey; quantity: number };

const filterOptions = [
  "Alphabetical",
  "Price (Low to High)",
  "Price (High to Low)",
  "Discount (High to Low)",
  "Popularity",
];

export default function ShopPage() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    const cart = stored ? JSON.parse(stored) : [];
    setCartCount(
      cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const berryParam = router.query.berry;
    const queryValue =
      typeof berryParam === "string"
        ? berryParam
        : new URLSearchParams(window.location.search).get("berry");

    if (queryValue) {
      setSearchText(queryValue.trim());
    }
  }, [router.query.berry]);

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

  const filteredBerries = Object.entries(berryCatalog).filter(
    ([key, berry]) => {
      const query = searchText.trim().toLowerCase();

      if (!query) return true;

      return (
        berry.name.toLowerCase().includes(query) ||
        berry.short.toLowerCase().includes(query) ||
        key.toLowerCase().includes(query)
      );
    },
  );

  const hasBerryParam = Boolean(router.query.berry);

  return (
    <main className="page-shell shop-page-shell">
      {!hasBerryParam && (
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
      )}

      <header className="shop-topbar">
        <div className="brand shop-brand">Plantopia Farms</div>

        <div className="shop-search-wrap">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search for our farm-fresh products"
          />
        </div>

        <nav className="shop-nav">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/orders">Account</Link>
          <button
            type="button"
            className="icon-cart"
            onClick={() => (window.location.href = "/cart")}
          >
            🛒
          </button>
        </nav>
      </header>

      <div className="shop-layout-row">
        <aside className="filter-panel">
          <div className="filter-heading-row">
            <h3>Filters</h3>
            <button type="button" className="clear-link">
              Clear all
            </button>
          </div>

          <div className="filter-group">
            <h4>Sort By</h4>
            {filterOptions.map((option) => (
              <label key={option} className="filter-option">
                <input type="checkbox" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </aside>

        <section className="shop-product-list">
          {filteredBerries.length === 0 ? (
            <div className="shop-empty-state">
              <h3>No berries found</h3>
              <p>
                Try a different berry name like strawberry, blueberry, or
                raspberry.
              </p>
            </div>
          ) : (
            filteredBerries.map(([key, berry]) => (
              <article key={key} className="shop-product-card">
                <div className="shop-product-visual">
                  <img src={berry.image} alt={berry.name} />
                </div>
                <div className="shop-product-body">
                  <span className="product-badge">Hydrating</span>
                  <h3>{berry.name}</h3>
                  <p>{berry.short}</p>
                  <div className="shop-product-footer">
                    <strong>{berry.price}</strong>
                    <button
                      type="button"
                      onClick={() => addToCart(key as BerryKey)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>

      <div style={{ paddingTop: 18, textAlign: "center" }}>
        <SocialShare />
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
