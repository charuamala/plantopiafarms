import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "../../lib/api";
import { addToCart } from "../../lib/cart";
import { isWishlisted, toggleWishlist } from "../../lib/wishlist";

const BADGE_LABELS: Record<string, string> = {
  organic: "🌿 Organic",
  "best-seller": "⭐ Best Seller",
  popular: "🔥 Popular",
  "new-arrival": "🆕 New Arrival",
  "farm-fresh": "💚 Farm Fresh",
  "gift-pack": "🎁 Gift Pack",
  "combo-pack": "🧺 Combo Pack",
  premium: "✨ Premium",
  imported: "🌍 Imported",
  "family-pack": "👨‍👩‍👧 Family Pack",
};

type Props = {
  product: Product;
  onQuickView: (product: Product) => void;
  onAdded?: (product: Product) => void;
};

export default function ProductCard({ product, onQuickView, onAdded }: Props) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    onAdded?.(product);
  };

  const handleWishlistToggle = () => {
    setWishlisted(toggleWishlist(product.id));
  };

  const displayPrice = product.salePrice ?? product.price;
  const badges = product.tags.slice(0, 2);

  return (
    <article className="shop-product-card product-card-rich">
      <div className="shop-product-visual">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <button
          type="button"
          className={`wishlist-toggle ${wishlisted ? "active" : ""}`}
          onClick={handleWishlistToggle}
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          {wishlisted ? "♥" : "♡"}
        </button>
        {product.discountPercent > 0 && (
          <span className="sale-badge">{product.discountPercent}% OFF</span>
        )}
        <div className="quick-view-overlay">
          <button type="button" onClick={() => onQuickView(product)}>
            Quick View
          </button>
        </div>
      </div>
      <div className="shop-product-body">
        <div className="product-badges">
          {badges.map((tag) => (
            <span key={tag} className="product-badge">
              {BADGE_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>
        <Link href={`/products/${product.slug}`} className="product-card-title">
          <h3>{product.name}</h3>
        </Link>
        <p>{product.shortDescription}</p>
        <div className="product-rating">
          <span>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>
        <div className="product-weight-chip">{product.weight}</div>
        <div className="shop-product-footer">
          <div className="price-block">
            {product.salePrice && (
              <span className="price-original">₹{product.price}</span>
            )}
            <strong>₹{displayPrice}</strong>
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {product.inStock ? "Add" : "Out of stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
