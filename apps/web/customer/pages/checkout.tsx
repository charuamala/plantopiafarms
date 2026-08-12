import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog, BerryKey } from "../lib/berries";

type CartItem = { id: BerryKey; quantity: number };

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
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("plantopiaCart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        parseInt(berryCatalog[item.id].price.replace(/[^0-9]/g, ""), 10),
    0,
  );

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

    const newOrder = {
      id: `order_${Date.now()}`,
      name: values.name,
      email: values.email,
      address: `${values.address}, ${values.city}, ${values.state} - ${values.postal}`,
      cart,
      total: totalAmount,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("plantopiaOrders");
      const orders = stored ? JSON.parse(stored) : [];
      orders.unshift(newOrder);
      window.localStorage.setItem("plantopiaOrders", JSON.stringify(orders));
      window.localStorage.removeItem("plantopiaCart");
    }

    setMessage("Your test payment was accepted. Thank you for your order!");
    setTimeout(() => router.push("/orders"), 1400);
  };

  if (!cart.length) {
    return (
      <main className="page-shell">
        <header className="topbar">
          <div className="brand">Plantopia Farms</div>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
          </nav>
        </header>
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
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/orders">Orders</Link>
        </nav>
      </header>

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
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>
                    {berryCatalog[item.id].name} x{item.quantity}
                  </span>
                  <strong>
                    ₹
                    {item.quantity *
                      parseInt(
                        berryCatalog[item.id].price.replace(/[^0-9]/g, ""),
                        10,
                      )}
                  </strong>
                </div>
              ))}
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
