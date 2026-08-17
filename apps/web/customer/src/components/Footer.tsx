import Link from "next/link";
import { socialLinks } from "../../lib/berries";

const berryLinks: { label: string; key: string }[] = [
  { label: "Strawberries", key: "strawberry" },
  { label: "Blueberries", key: "blueberry" },
  { label: "Blackberries", key: "blackberry" },
  { label: "Raspberries", key: "raspberry" },
];

export default function Footer() {
  return (
    <footer className="site-footer site-footer-full">
      <div className="footer-inner footer-inner-grid">
        <div className="footer-col footer-brand-col">
          <Link href="/" aria-label="Plantopia Farms home">
            <img src="/logo.png" alt="Plantopia Farms" />
          </Link>
          <p>
            Farm-fresh berries grown with care in Kotagiri, delivered straight
            to your table.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <div className="footer-links">
            {berryLinks.map((b) => (
              <Link key={b.key} href={`/shop?berry=${b.key}`}>
                {b.label}
              </Link>
            ))}
            <Link href="/shop">All Products</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Customer Support</h4>
          <div className="footer-links">
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/orders">My Orders</Link>
            <Link href="/wishlist">Wishlist</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <div className="footer-links">
            <Link href="/about">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="footer-links footer-social">
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
              X / Twitter
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/plantopiafarms/?originalSubdomain=in"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="footer-note">
        © {new Date().getFullYear()} Plantopia Farms. All Rights Reserved.
      </div>
    </footer>
  );
}
