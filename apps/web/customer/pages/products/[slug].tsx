import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchProductBySlug, Product } from "../../lib/api";
import { addToCart } from "../../lib/cart";
import { isWishlisted, toggleWishlist } from "../../lib/wishlist";
import SocialShare from "../../src/components/SocialShare";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (typeof slug !== "string") return;
    fetchProductBySlug(slug).then((result) => {
      setProduct(result);
      if (result) setWishlisted(isWishlisted(result.id));
    });
  }, [slug]);

  if (product === undefined) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p>Loading product…</p>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Product not found</h1>
          <button type="button" onClick={() => router.push("/shop")}>
            Back to shop
          </button>
        </section>
      </main>
    );
  }

  const displayPrice = product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="page-shell detail-page-shell">
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
            {product.discountPercent > 0 && (
              <div className="detail-product-tag">
                {product.discountPercent}% OFF
              </div>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className="detail-image"
            />
            <div className="detail-image-footer">
              <span>{product.category}</span>
              <strong>{product.weight}</strong>
            </div>
          </div>

          <div className="detail-info">
            <div className="berry-badge">{product.tags[0] ?? product.category}</div>
            <h1>{product.name}</h1>
            <p className="detail-tagline">{product.shortDescription}</p>

            <div className="product-rating">
              <span>
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="review-count">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="detail-meta-row">
              <span>{product.weight}</span>
              <span>{product.inStock ? `In stock (${product.stock})` : "Out of stock"}</span>
              {product.tags.map((tag) => (
                <span key={tag}>{tag.replace("-", " ")}</span>
              ))}
            </div>

            <div className="detail-price-row">
              {product.salePrice && (
                <span className="price-original">₹{product.price}</span>
              )}
              <strong>₹{displayPrice}</strong>
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

            <div className="detail-actions-row">
              <button
                type="button"
                className="cta-button full-width"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {added ? "Added!" : product.inStock ? "Add to cart" : "Out of stock"}
              </button>
              <button
                type="button"
                className={`secondary wishlist-toggle-inline ${wishlisted ? "active" : ""}`}
                onClick={() => setWishlisted(toggleWishlist(product.id))}
              >
                {wishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
              </button>
            </div>
          </div>
        </div>

        <div className="detail-description-block">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div style={{ marginTop: 18 }}>
          <SocialShare />
        </div>
      </div>
    </main>
  );
}
