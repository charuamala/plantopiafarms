import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const initialCatalog = [
  {
    name: "Strawberry pack",
    price: "₹299",
    description: "Fresh and juicy strawberries.",
  },
  {
    name: "Blueberry pack",
    price: "₹399",
    description: "Rich in antioxidants and flavor.",
  },
  {
    name: "Blackberry pack",
    price: "₹349",
    description: "Deep, smooth berry taste.",
  },
  { name: "Raspberry pack", price: "₹329", description: "Tangy and aromatic." },
];

export default function AdminProductsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [catalog, setCatalog] = useState(initialCatalog);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
  });
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

  const startEdit = (index: number) => {
    setEditIndex(index);
    setValues(catalog[index]);
  };

  const saveEdit = () => {
    if (editIndex === null) return;
    const next = [...catalog];
    next[editIndex] = values;
    setCatalog(next);
    setEditIndex(null);
  };

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
              <h1>Product catalog</h1>
              <p>
                Edit product names, description, and price for the storefront.
              </p>
            </div>
            <div className="product-edit-grid">
              {catalog.map((item, index) => (
                <div key={item.name} className="product-edit-card">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <span>{item.price}</span>
                    <button type="button" onClick={() => startEdit(index)}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editIndex !== null && (
              <div className="product-form">
                <h3>Edit product</h3>
                <label>
                  Name
                  <input
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </label>
                <label>
                  Price
                  <input
                    value={values.price}
                    onChange={(e) =>
                      setValues({ ...values, price: e.target.value })
                    }
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={values.description}
                    onChange={(e) =>
                      setValues({ ...values, description: e.target.value })
                    }
                    rows={4}
                  />
                </label>
                <button type="button" className="cta-button" onClick={saveEdit}>
                  Save changes
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
