import Link from "next/link";
import { sampleOrders, statusColor } from "../lib/sample-data";
import { useAdminAuth } from "../lib/useAdminAuth";

export default function AdminOrdersPage() {
  const { authenticated } = useAdminAuth();

  if (!authenticated) return null;

  return (
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
  );
}
