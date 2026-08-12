import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { berryCatalog } from "../lib/berries";

type OrderItem = {
  id: string;
  name: string;
  email: string;
  address: string;
  cart: { id: string; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = window.localStorage.getItem("plantopiaCurrentUser");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    const storedOrders = window.localStorage.getItem("plantopiaOrders");
    const allOrders = storedOrders ? JSON.parse(storedOrders) : [];
    setOrders(
      allOrders.filter(
        (order: any) => order.email === JSON.parse(storedUser).email,
      ),
    );
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("plantopiaCurrentUser");
      router.push("/");
    }
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">Plantopia Farms</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <button type="button" className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <section className="detail-page">
        <div className="detail-card">
          <h1>My orders</h1>
          {user && <p>Welcome back, {user.name}.</p>}
          {!orders.length ? (
            <div className="empty-state">
              <p>No orders found yet.</p>
              <button type="button" onClick={() => router.push("/shop")}>
                Shop berries
              </button>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <p>{order.address}</p>
                  <div className="order-items">
                    {order.cart.map((item) => (
                      <div
                        key={`${order.id}-${item.id}`}
                        className="order-item-row"
                      >
                        <span>
                          {
                            berryCatalog[item.id as keyof typeof berryCatalog]
                              .name
                          }
                        </span>
                        <strong>x{item.quantity}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    <span>Total</span>
                    <strong>₹{order.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
