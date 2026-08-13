import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { berryCatalog, BerryKey } from "../lib/berries";

type CartItem = { id: BerryKey; quantity: number };

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const saveCart = (nextCart: CartItem[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("plantopiaCart", JSON.stringify(nextCart));
    }
    setCart(nextCart);
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          item.quantity *
            parseInt(berryCatalog[item.id].price.replace(/[^0-9]/g, ""), 10),
        0,
      ),
    [cart],
  );

  const updateQuantity = (id: BerryKey, quantity: number) => {
    const nextCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
    );
    saveCart(nextCart);
  };

  const removeItem = (id: BerryKey) =>
    saveCart(cart.filter((item) => item.id !== id));

  if (!cart.length) {
    return (
      <main className="page-shell">
        <header className="topbar">
          <Link href="/">
            <a className="brand" aria-label="Plantopia Farms home">
              <img src="/logo.svg" alt="Plantopia Farms" />
            </a>
          </Link>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/login">Login</Link>
          </nav>
        </header>
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

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </header>

      <section className="detail-page">
        <div className="detail-card">
          <h1>Your cart</h1>
          <p>{totalItems} items selected</p>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={berryCatalog[item.id].image}
                  alt={berryCatalog[item.id].name}
                />
                <div>
                  <h3>{berryCatalog[item.id].name}</h3>
                  <p>{berryCatalog[item.id].short}</p>
                  <div className="cart-actions">
                    <label>
                      Qty
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(item.id, Number(event.target.value))
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>{berryCatalog[item.id].price}</strong>
              </div>
            ))}
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
