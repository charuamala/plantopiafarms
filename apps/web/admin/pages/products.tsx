import { useEffect, useState } from "react";
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  Product,
  ProductInput,
  updateAdminProduct,
} from "../lib/api";
import { useAdminAuth } from "../lib/useAdminAuth";

const CATEGORIES = ["strawberry", "blueberry", "blackberry", "raspberry"];
const WEIGHTS = ["125g", "250g", "500g", "1kg"];

const emptyForm: ProductInput = {
  slug: "",
  sku: "",
  category: "strawberry",
  name: "",
  shortDescription: "",
  description: "",
  images: [],
  price: 0,
  salePrice: null,
  weight: "250g",
  stock: 0,
  isActive: true,
  tags: [],
};

export default function AdminProductsPage() {
  const { authenticated } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState<ProductInput>(emptyForm);
  const [imagesText, setImagesText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetchAdminProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authenticated) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const startCreate = () => {
    setEditingId(null);
    setValues(emptyForm);
    setImagesText("");
    setTagsText("");
    setShowForm(true);
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setValues({
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      images: product.images,
      price: product.price,
      salePrice: product.salePrice,
      weight: product.weight,
      stock: product.stock,
      isActive: product.isActive,
      tags: product.tags,
    });
    setImagesText(product.images.join("\n"));
    setTagsText(product.tags.join(", "));
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteAdminProduct(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload: ProductInput = {
      ...values,
      images: imagesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    try {
      if (editingId) {
        await updateAdminProduct(editingId, payload);
      } else {
        await createAdminProduct(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) return null;

  return (
    <section className="detail-page">
      <div className="detail-card admin-detail-card">
        <div className="section-heading">
          <div>
            <h1>Product catalog</h1>
            <p>Manage products shown on the storefront in real time.</p>
          </div>
          <button type="button" className="cta-button" onClick={startCreate}>
            + Add product
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}

        {loading ? (
          <p>Loading products…</p>
        ) : (
          <div className="product-edit-grid">
            {products.map((product) => (
              <div key={product.id} className="product-edit-card">
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {product.category} · {product.weight} · SKU {product.sku}
                  </p>
                  <p>{product.shortDescription}</p>
                  {!product.isActive && <span className="badge" style={{ background: "#b0233a" }}>Disabled</span>}
                </div>
                <div>
                  <span>
                    ₹{product.salePrice ?? product.price}
                    {product.salePrice && (
                      <span style={{ textDecoration: "line-through", marginLeft: 8, opacity: 0.6 }}>
                        ₹{product.price}
                      </span>
                    )}
                  </span>
                  <p>Stock: {product.stock}</p>
                  <button type="button" onClick={() => startEdit(product)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <form className="product-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Edit product" : "New product"}</h3>
            <label>
              Name
              <input
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </label>
            <label>
              Slug (optional, derived from name if left blank)
              <input
                value={values.slug}
                onChange={(e) => setValues({ ...values, slug: e.target.value })}
              />
            </label>
            <label>
              SKU
              <input
                value={values.sku}
                onChange={(e) => setValues({ ...values, sku: e.target.value })}
                required
              />
            </label>
            <label>
              Category
              <select
                value={values.category}
                onChange={(e) => setValues({ ...values, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Weight
              <select
                value={values.weight}
                onChange={(e) => setValues({ ...values, weight: e.target.value })}
              >
                {WEIGHTS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Short description
              <input
                value={values.shortDescription}
                onChange={(e) =>
                  setValues({ ...values, shortDescription: e.target.value })
                }
                required
              />
            </label>
            <label>
              Full description
              <textarea
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                rows={4}
                required
              />
            </label>
            <label>
              Image URLs (one per line)
              <textarea
                value={imagesText}
                onChange={(e) => setImagesText(e.target.value)}
                rows={3}
                placeholder="https://example.com/photo.jpg"
              />
            </label>
            <label>
              Price (₹)
              <input
                type="number"
                min={0}
                value={values.price}
                onChange={(e) =>
                  setValues({ ...values, price: Number(e.target.value) })
                }
                required
              />
            </label>
            <label>
              Sale price (₹, optional)
              <input
                type="number"
                min={0}
                value={values.salePrice ?? ""}
                onChange={(e) =>
                  setValues({
                    ...values,
                    salePrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                min={0}
                value={values.stock}
                onChange={(e) =>
                  setValues({ ...values, stock: Number(e.target.value) })
                }
                required
              />
            </label>
            <label>
              Tags (comma separated, e.g. organic, best-seller)
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(e) =>
                  setValues({ ...values, isActive: e.target.checked })
                }
              />
              {"  "}Active (visible on storefront)
            </label>

            <div className="section-heading">
              <button type="submit" className="cta-button" disabled={saving}>
                {saving ? "Saving…" : "Save product"}
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
