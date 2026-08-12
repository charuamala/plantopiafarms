import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { sampleOrders, statusColor } from "../lib/sample-data";

function groupOrdersByDate(orders: typeof sampleOrders) {
  return orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.date] = (acc[order.date] || 0) + order.total;
    return acc;
  }, {});
}

function buildStatusBreakdown(orders: typeof sampleOrders) {
  return orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
}

export default function AdminDashboardPage() {
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

  const totalRevenue = sampleOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );
  const totalOrders = sampleOrders.length;
  const totalCustomers = new Set(sampleOrders.map((order) => order.customer))
    .size;
  const ordersByDate = useMemo(() => groupOrdersByDate(sampleOrders), []);
  const statusData = useMemo(() => buildStatusBreakdown(sampleOrders), []);

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
        <section className="dashboard-grid">
          <div className="metric-card">
            <span>Total revenue</span>
            <strong>₹{totalRevenue}</strong>
          </div>
          <div className="metric-card">
            <span>Orders this week</span>
            <strong>{totalOrders}</strong>
          </div>
          <div className="metric-card">
            <span>Active customers</span>
            <strong>{totalCustomers}</strong>
          </div>
        </section>
      )}

      {authenticated && (
        <section className="report-grid">
          <div className="report-card">
            <h2>Revenue by date</h2>
            <div className="bar-chart">
              {Object.entries(ordersByDate).map(([date, total]) => (
                <div key={date} className="bar-row">
                  <span>{date}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.min(100, (total / totalRevenue) * 180)}%`,
                      }}
                    />
                  </div>
                  <strong>₹{total}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="report-card">
            <h2>Status breakdown</h2>
            <div className="pie-list">
              {Object.entries(statusData).map(([status, count]) => (
                <div key={status} className="pie-segment">
                  <span
                    style={{
                      background:
                        statusColor[status as keyof typeof statusColor],
                    }}
                  />
                  <strong>{status}</strong>
                  <span>
                    {count} order{count > 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {authenticated && (
        <section className="orders-summary">
          <div className="section-heading">
            <h2>Recent orders</h2>
            <Link href="/orders">View all</Link>
          </div>
          <div className="order-list">
            {sampleOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div>
                  <strong>{order.id}</strong>
                  <p>{order.customer}</p>
                </div>
                <div>
                  <span
                    className="badge"
                    style={{ background: statusColor[order.status] }}
                  >
                    {order.status}
                  </span>
                  <p>₹{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
