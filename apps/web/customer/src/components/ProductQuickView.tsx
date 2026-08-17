import { useRouter } from "next/router";
import { useState } from "react";
import { Product } from "../../lib/api";
import { addToCart } from "../../lib/cart";

type Props = {
  product: Product;
  onClose: () => void;
};

export default function ProductQuickView({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const displayPrice = product.salePrice ?? product.price;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <img src={product.images[0]} alt={product.name} />
        <div className="modal-content">
          <div className="berry-badge">{product.weight}</div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-rating">
            <span>
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className="review-count">({product.reviewCount} reviews)</span>
          </div>
          <p className={product.inStock ? "stock-in" : "stock-out"}>
            {product.inStock ? `In stock (${product.stock} available)` : "Out of stock"}
          </p>
          <div className="detail-toggle-row">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>
          <div className="modal-actions">
            <div className="price-block">
              {product.salePrice && (
                <span className="price-original">₹{product.price}</span>
              )}
              <strong>₹{displayPrice}</strong>
            </div>
            <button
              type="button"
              className="cta-button"
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product.id, quantity);
                onClose();
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                router.push(`/products/${product.slug}`);
                onClose();
              }}
            >
              View full details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
