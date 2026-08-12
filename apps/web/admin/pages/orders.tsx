import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { sampleOrders, statusColor } from "../lib/sample-data";

export default function AdminOrdersPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("plantopiaAdminSession");
    if (!token) {
      router.push("/login");
      return;
    }
    setAuthenticated(true);
  }, [router]);

  return (
    <main className="page-shell admin-shell">
      <header className="topbar admin-topbar">
        <div className="brand">Plantopia Admin</div>
        <nav className="nav admin-nav">
          <Link href="/">Dashboard</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/reports">Reports</Link>
          <Link href="/products">Products</Link>
          <button
            className="secondary"
            type="button"
            onClick={() => {
              window.localStorage.removeItem("plantopiaAdminSession");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      {authenticated && (
        <section className="detail-page">
          <div className="detail-card admin-detail-card">
            <div className="section-heading">
              <h1>Order management</h1>
              <Link href="/">Back to dashboard</Link>
            </div>
            <div className="order-table">
              {sampleOrders.map((order) => (
                <div key={order.id} className="order-row">
                  <div>
                    <strong>{order.id}</strong>
                    <p>{order.customer}</p>
                  </div>
                  <div>
                    <p>{order.date}</p>
                  </div>
                  <div>
                    <p>₹{order.total}</p>
                  </div>
                  <div>
                    <span
                      className="badge"
                      style={{ background: statusColor[order.status] }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
