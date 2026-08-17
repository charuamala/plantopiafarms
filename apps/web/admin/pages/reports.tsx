import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminOrder, sampleOrders, statusColor } from "../lib/sample-data";
import { useAdminAuth } from "../lib/useAdminAuth";

const statusOptions: Array<AdminOrder["status"] | "All"> = [
  "All",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminReportsPage() {
  const { authenticated } = useAdminAuth();
  const [statusFilter, setStatusFilter] = useState<
    AdminOrder["status"] | "All"
  >("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredOrders = useMemo(() => {
    return sampleOrders.filter((order) => {
      if (statusFilter !== "All" && order.status !== statusFilter) return false;
      if (dateFrom && order.date < dateFrom) return false;
      if (dateTo && order.date > dateTo) return false;
      return true;
    });
  }, [statusFilter, dateFrom, dateTo]);

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );
  const totalOrders = filteredOrders.length;

  if (!authenticated) return null;

  return (
    <section className="detail-page">
      <div className="detail-card admin-detail-card">
        <div className="section-heading">
          <div>
            <h1>Order reporting</h1>
            <p>
              Filter orders by status and delivery date range to review
              revenue and fulfillment trends.
            </p>
          </div>
          <Link href="/orders">View order list</Link>
        </div>
        <div className="product-form">
          <label>
            Order status
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as AdminOrder["status"] | "All")
              }
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label>
            Delivery date from
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
          <label>
            Delivery date to
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
        </div>

        <div className="dashboard-grid">
          <div className="metric-card">
            <span>Filtered revenue</span>
            <strong>₹{totalRevenue}</strong>
          </div>
          <div className="metric-card">
            <span>Filtered orders</span>
            <strong>{totalOrders}</strong>
          </div>
          <div className="metric-card">
            <span>Unique customers</span>
            <strong>
              {new Set(filteredOrders.map((order) => order.customer)).size}
            </strong>
          </div>
        </div>

        <div className="order-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div>
                <strong>{order.id}</strong>
                <p>{order.customer}</p>
              </div>
              <div>
                <p>{order.date}</p>
                <span
                  className="badge"
                  style={{ background: statusColor[order.status] }}
                >
                  {order.status}
                </span>
              </div>
              <div>
                <strong>₹{order.total}</strong>
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <p>No orders match the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  );
}
