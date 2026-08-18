import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts, Product } from "../lib/api";
import { CartItem, getCart, removeFromCart, updateQuantity } from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const router = useRouter();

  const loadProducts = () => {
    setLoading(true);
    setLoadError(false);
    fetchProducts({ limit: 100 })
      .then((result) => {
        const map: Record<number, Product> = {};
        result.products.forEach((p) => {
          map[p.id] = p;
        });
        setProducts(map);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setCart(getCart());
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const totalAmount = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products[item.productId];
        if (!product) return sum;
        return sum + item.quantity * (product.salePrice ?? product.price);
      }, 0),
    [cart, products],
  );

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, Math.max(1, quantity));
    setCart(getCart());
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  if (loading) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p>Loading your cart…</p>
        </section>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Pick a berry box to get started and enjoy farm-fresh delivery.</p>
          <button type="button" onClick={() => router.push("/shop")}>
            Browse berries
          </button>
        </section>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>Couldn't load your cart</h1>
          <p>We're having trouble reaching the shop right now. Please try again.</p>
          <button type="button" onClick={loadProducts}>
            Retry
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="detail-page">
        <div className="detail-card">
          <h1>Your cart</h1>
          <p>{totalItems} items selected</p>
          <div className="cart-list">
            {cart.map((item) => {
              const product = products[item.productId];
              if (!product) return null;
              const unitPrice = product.salePrice ?? product.price;
              return (
                <div key={item.productId} className="cart-item">
                  <img src={product.images[0]} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.shortDescription} · {product.weight}
                    </p>
                    <div className="cart-actions">
                      <label>
                        Qty
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(event) =>
                            handleUpdateQuantity(
                              item.productId,
                              Number(event.target.value),
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong>₹{unitPrice * item.quantity}</strong>
                </div>
              );
            })}
          </div>
          <div className="checkout-summary">
            <div>
              <p>Total items</p>
              <strong>{totalItems}</strong>
            </div>
            <div>
              <p>Estimated cost</p>
              <strong>₹{totalAmount}</strong>
            </div>
            <button
              type="button"
              className="cta-button"
              onClick={() => router.push("/checkout")}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
