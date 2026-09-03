import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { getCartCount, subscribeToCart } from "../../lib/cart";
import { getWishlist, subscribeToWishlist } from "../../lib/wishlist";

export default function HeaderOption3Refined() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [hasAccount, setHasAccount] = useState(false);

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

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    const query = searchText.trim();
    router.push(query ? `/shop?search=${encodeURIComponent(query)}` : "/shop");
  };

  return (
    <header className="header-option-3">
      {/* Single row with better visual hierarchy */}
      <Link href="/" className="brand" aria-label="Plantopia Farms home">
        <img src="/logo.png" alt="Plantopia Farms" />
      </Link>

      <form className="header-search-wrap header-3-search" onSubmit={handleSearchSubmit}>
        <span className="search-icon">⌕</span>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search berries, honey, jams..."
        />
      </form>

      <nav className="header-3-nav">
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/faq">FAQ</Link>
      </nav>

      <div className="header-3-actions">
        <Link href={hasAccount ? "/orders" : "/login"} className="header-3-account-link">
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
    </header>
  );
}
