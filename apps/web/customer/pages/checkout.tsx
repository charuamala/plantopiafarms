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
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
    fetchProducts({ limit: 100 })
      .then((result) => {
        const map: Record<number, Product> = {};
        result.products.forEach((p) => {
          map[p.id] = p;
        });
        setProducts(map);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalAmount = cart.reduce((sum, item) => {
    const product = products[item.productId];
    if (!product) return sum;
    return sum + item.quantity * (product.salePrice ?? product.price);
  }, 0);

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
              <label>
                Card number
                <input
                  value={values.cardNumber}
                  onChange={(e) =>
                    setValues({ ...values, cardNumber: e.target.value })
                  }
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  Expiry
                  <input
                    value={values.expiry}
                    onChange={(e) =>
                      setValues({ ...values, expiry: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  CVC
                  <input
                    value={values.cvc}
                    onChange={(e) =>
                      setValues({ ...values, cvc: e.target.value })
                    }
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
