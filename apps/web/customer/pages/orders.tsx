import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOrdersForEmail, Order } from "../lib/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
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
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setOrders(getOrdersForEmail(parsedUser.email));
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("plantopiaCurrentUser");
      router.push("/");
    }
  };

  return (
    <main className="page-shell">
      <section className="detail-page">
        <div className="detail-card">
          <div className="section-heading">
            <h1>My orders</h1>
            <button type="button" className="secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
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
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.productId}`}
                        className="order-item-row"
                      >
                        <span>{item.name}</span>
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
