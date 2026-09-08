import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { getCartCount, subscribeToCart } from "../../lib/cart";
import { getWishlist, subscribeToWishlist } from "../../lib/wishlist";

export default function HeaderOption1TwoTier() {
  const router = useRouter();
  const businessMenuRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [hasAccount, setHasAccount] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlist().length);
    };
    sync();
    const unsubCart = subscribeToCart(sync);
    const unsubWishlist = subscribeToWishlist(sync);
    setHasAccount(Boolean(window.localStorage.getItem("plantopiaCurrentUser")));
    return () => {
      unsubCart();
      unsubWishlist();
    };
  }, []);

  useEffect(() => {
    const berry = router.query.search;
    if (typeof berry === "string") setSearchText(berry);
  }, [router.query.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeMenus = () => {
      setMobileOpen(false);
      setBusinessOpen(false);
    };
    router.events.on("routeChangeStart", closeMenus);
    return () => router.events.off("routeChangeStart", closeMenus);
  }, [router.events]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!businessOpen) return;
    const onClickOutside = (event: MouseEvent) => {
      if (!businessMenuRef.current?.contains(event.target as Node)) {
        setBusinessOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBusinessOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [businessOpen]);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    const query = searchText.trim();
    router.push(query ? `/shop?search=${encodeURIComponent(query)}` : "/shop");
  };

  return (
    <header className="header-option-1">
      <div className="header-1-top">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`hamburger-icon${mobileOpen ? " is-open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <Link href="/" className="brand" aria-label="Plantopia Farms home">
          <img src="/logo.png" alt="Plantopia Farms" />
        </Link>

        <form className="header-search-wrap header-1-search" onSubmit={handleSearchSubmit}>
          <span className="search-icon">⌕</span>
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search berries, honey, jams..."
          />
        </form>

        <div className="header-1-actions">
          <Link href="/shop" className="cta-button header-buy-cta">
            Buy Berries
          </Link>
          <Link href={hasAccount ? "/orders" : "/login"} className="header-1-account-link">
            Account
          </Link>
          <Link href="/wishlist" className="icon-link" aria-label="Wishlist">
            ♡{wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </Link>
          <button
            type="button"
            className="icon-link icon-cart"
            onClick={() => router.push("/cart")}
            aria-label={`Cart with ${cartCount} items`}
          >
            🛒{cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <nav className="header-1-bottom">
        <Link href="/berries">Berries</Link>
        <Link href="/how-to-buy">How to Buy</Link>
        <Link href="/where-to-buy">Where to Buy</Link>
        <Link href="/berry-care">Berry Care</Link>
        <Link href="/recipes">Recipes</Link>
        <Link href="/stories">Stories</Link>
        <div className="nav-dropdown" ref={businessMenuRef}>
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={businessOpen}
            onClick={() => setBusinessOpen((v) => !v)}
          >
            For Business ⌄
          </button>
          {businessOpen && (
            <div className="nav-dropdown-menu">
              <Link href="/growers">Growers</Link>
              <Link href="/business">Wholesale &amp; Distributors</Link>
              <Link href="/investors">Investors</Link>
            </div>
          )}
        </div>
        <Link href="/about">About</Link>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileOpen(false)} />
      )}
      <div
        id="mobile-menu-panel"
        className={`mobile-menu-panel${mobileOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mobile-menu-links">
          <Link href="/berries">Berries</Link>
          <Link href="/how-to-buy">How to Buy</Link>
          <Link href="/where-to-buy">Where to Buy</Link>
          <Link href="/berry-care">Berry Care</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/blog">Blog</Link>
          <div className="mobile-menu-divider" />
          <span className="mobile-menu-label">For Business</span>
          <Link href="/growers">Growers</Link>
          <Link href="/business">Wholesale &amp; Distributors</Link>
          <Link href="/investors">Investors</Link>
          <div className="mobile-menu-divider" />
          <Link href="/shop">Shop</Link>
          <Link href="/shop?category=jams">Jams</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/shop" className="cta-button mobile-menu-cta">
          Buy Berries
        </Link>
      </div>
    </header>
  );
}
