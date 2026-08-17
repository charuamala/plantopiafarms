import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../lib/api";
import { addToCart } from "../lib/cart";
import { getWishlist, removeFromWishlist } from "../lib/wishlist";

export default function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    const ids = getWishlist();
    if (!ids.length) {
      setProducts([]);
      setLoading(false);
      return;
    }
    fetchProducts({ limit: 100 })
      .then((result) => {
        setProducts(result.products.filter((p) => ids.includes(p.id)));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    load();
  };

  const handleAddToCart = (id: number) => {
    addToCart(id, 1);
  };

  return (
    <main className="page-shell">
      <section className="detail-page">
        <div className="detail-card">
          <h1>Your wishlist</h1>
          {loading ? (
            <p>Loading…</p>
          ) : !products.length ? (
            <div className="empty-state">
              <p>Your wishlist is empty.</p>
              <button type="button" onClick={() => router.push("/shop")}>
                Browse berries
              </button>
            </div>
          ) : (
            <div className="cart-list">
              {products.map((product) => (
                <div key={product.id} className="cart-item">
                  <img src={product.images[0]} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.shortDescription} · {product.weight}
                    </p>
                    <div className="cart-actions">
                      <button
                        type="button"
                        className="cta-button"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to cart" : "Out of stock"}
                      </button>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => handleRemove(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong>₹{product.salePrice ?? product.price}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
