import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../lib/api";
import { CartItem, clearCart, getCart } from "../lib/cart";
import { addOrder } from "../lib/orders";

type CheckoutValues = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvc(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 4);
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<CheckoutValues>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [message, setMessage] = useState("");
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

  const totalAmount = cart.reduce((sum, item) => {
    const product = products[item.productId];
    if (!product) return sum;
    return sum + item.quantity * (product.salePrice ?? product.price);
  }, 0);

  const completeOrder = () => {
    addOrder({
      id: `order_${Date.now()}`,
      name: values.name,
      email: values.email,
      address: `${values.address}, ${values.city}, ${values.state} - ${values.postal}`,
      items: cart
        .filter((item) => products[item.productId])
        .map((item) => {
          const product = products[item.productId];
          return {
            productId: item.productId,
            name: product.name,
            price: product.salePrice ?? product.price,
            quantity: item.quantity,
          };
        }),
      total: totalAmount,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    });
    clearCart();

    setMessage("Your test payment was accepted. Thank you for your order!");
    setTimeout(() => router.push("/orders"), 1400);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !values.name ||
      !values.email ||
      !values.address ||
      !values.cardNumber ||
      !values.expiry ||
      !values.cvc
    ) {
      setMessage("Please complete all required fields.");
      return;
    }
    completeOrder();
  };

  const handleGooglePay = () => {
    if (!values.name || !values.email || !values.address) {
      setMessage(
        "Add your name, email, and address above, then pay with Google Pay.",
      );
      return;
    }
    completeOrder();
  };

  if (loading) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p>Loading checkout…</p>
        </section>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <h1>There’s nothing to checkout yet.</h1>
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
          <h1>Couldn't load checkout</h1>
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
          <h1>Checkout</h1>
          <p>
            Use test card details: 4242 4242 4242 4242, expiry 12/34, CVC 123.
          </p>
          <div className="checkout-grid">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Billing & shipping</h2>
              <label>
                Full name
                <input
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Street address
                <input
                  value={values.address}
                  onChange={(e) =>
                    setValues({ ...values, address: e.target.value })
                  }
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  City
                  <input
                    value={values.city}
                    onChange={(e) =>
                      setValues({ ...values, city: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  State
                  <input
                    value={values.state}
                    onChange={(e) =>
                      setValues({ ...values, state: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <label>
                Postal code
                <input
                  value={values.postal}
                  onChange={(e) =>
                    setValues({ ...values, postal: e.target.value })
                  }
                  required
                />
              </label>

              <h2>Payment</h2>

              <button
                type="button"
                className="google-pay-button"
                onClick={handleGooglePay}
                aria-label="Pay with Google Pay"
              >
                <svg viewBox="0 0 41 17" className="google-pay-glyph" aria-hidden="true">
                  <path fill="#4285F4" d="M19.5 8.6c0-.5 0-1-.1-1.5h-7v2.8h4c-.2 1-.8 1.9-1.7 2.5v2h2.8c1.6-1.5 2.5-3.7 2.5-6.3z" />
                  <path fill="#34A853" d="M12.4 15c1.9 0 3.5-.6 4.6-1.7l-2.8-2c-.6.4-1.4.7-2.4.7-1.8 0-3.4-1.2-3.9-2.9H6.2v2c1.1 2.3 3.5 4 6.2 4z" />
                  <path fill="#FBBC04" d="M8.5 9.1c-.1-.4-.2-.8-.2-1.3s.1-.9.2-1.3v-2H6.2C5.7 5.5 5.4 6.7 5.4 7.8s.3 2.3.8 3.3z" />
                  <path fill="#EA4335" d="M12.4 4.6c1.1 0 2 .4 2.7 1.1l2.1-2C15.9 2.4 14.3 1.7 12.4 1.7c-2.7 0-5.1 1.7-6.2 4l2.3 1.8c.5-1.7 2.1-2.9 3.9-2.9z" />
                </svg>
                Pay with Google Pay
              </button>

              <div className="payment-divider">
                <span>or pay with card</span>
              </div>

              <label>
                Card number
                <input
                  value={values.cardNumber}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      cardNumber: formatCardNumber(e.target.value),
                    })
                  }
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  Expiry
                  <input
                    value={values.expiry}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    required
                  />
                </label>
                <label>
                  CVC
                  <input
                    value={values.cvc}
                    onChange={(e) =>
                      setValues({ ...values, cvc: formatCvc(e.target.value) })
                    }
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    required
                  />
                </label>
              </div>
              {message && <p className="form-message">{message}</p>}
              <button type="submit" className="cta-button">
                Place order
              </button>
            </form>
            <div className="checkout-summary-panel">
              <h2>Order summary</h2>
              {cart.map((item) => {
                const product = products[item.productId];
                if (!product) return null;
                const unitPrice = product.salePrice ?? product.price;
                return (
                  <div key={item.productId} className="summary-item">
                    <span>
                      {product.name} x{item.quantity}
                    </span>
                    <strong>₹{unitPrice * item.quantity}</strong>
                  </div>
                );
              })}
              <div className="summary-total">
                <span>Total</span>
                <strong>₹{totalAmount}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
