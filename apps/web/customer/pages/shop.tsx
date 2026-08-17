import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchProducts, Product, ProductFilters } from "../lib/api";
import FilterSidebar, { FilterValues } from "../src/components/FilterSidebar";
import ProductCard from "../src/components/ProductCard";
import ProductQuickView from "../src/components/ProductQuickView";
import SocialShare from "../src/components/SocialShare";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount_desc", label: "Discount: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "alphabetical", label: "Alphabetical" },
];

function toNumberParam(value: unknown): number | undefined {
  if (typeof value !== "string") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function toStringParam(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const query = router.query;
  const filters: FilterValues = {
    category: toStringParam(query.berry),
    minPrice: toNumberParam(query.minPrice),
    maxPrice: toNumberParam(query.maxPrice),
    weight: toStringParam(query.weight),
    inStock: query.inStock === "true",
    type: toStringParam(query.type),
    minDiscount: toNumberParam(query.minDiscount),
  };
  const search = toStringParam(query.search) ?? "";
  const sort = toStringParam(query.sort) ?? "featured";
  const page = toNumberParam(query.page) ?? 1;
  const limit = 12;

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    const apiFilters: ProductFilters = {
      category: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      weight: filters.weight,
      inStock: filters.inStock || undefined,
      type: filters.type,
      minDiscount: filters.minDiscount,
      search: search || undefined,
      sort,
      page,
      limit,
    };
    fetchProducts(apiFilters)
      .then((result) => {
        setProducts(result.products);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    router.isReady,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.weight,
    filters.inStock,
    filters.type,
    filters.minDiscount,
    search,
    sort,
    page,
  ]);

  const updateQuery = (
    next: Record<string, string | number | boolean | undefined>,
    resetPage = true,
  ) => {
    const merged: Record<string, string> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === "string") merged[key] = value;
    });
    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === false) {
        delete merged[key];
      } else {
        merged[key] = String(value);
      }
    });
    if (resetPage) delete merged.page;
    router.push({ pathname: "/shop", query: merged }, undefined, {
      shallow: true,
    });
  };

  const handleFilterChange = (next: Partial<FilterValues>) => {
    updateQuery({
      berry: "category" in next ? next.category : filters.category,
      minPrice: "minPrice" in next ? next.minPrice : filters.minPrice,
      maxPrice: "maxPrice" in next ? next.maxPrice : filters.maxPrice,
      weight: "weight" in next ? next.weight : filters.weight,
      inStock: "inStock" in next ? next.inStock : filters.inStock,
      type: "type" in next ? next.type : filters.type,
      minDiscount:
        "minDiscount" in next ? next.minDiscount : filters.minDiscount,
      search,
      sort,
    });
  };

  const handleClearAll = () => {
    router.push({ pathname: "/shop" }, undefined, { shallow: true });
  };

  const handleAdded = (product: Product) => {
    setToast(`${product.name} added to your cart.`);
    window.setTimeout(() => setToast(""), 2500);
  };

  const categoryLabel = filters.category
    ? filters.category.charAt(0).toUpperCase() +
      filters.category.slice(1).replace(/y$/, "ies")
    : "All Berries";

  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  return (
    <main className="page-shell shop-page-shell">
      <div className="shop-topbar">
        <div className="shop-brand">{categoryLabel}</div>
        <div className="shop-search-wrap">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            defaultValue={search}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateQuery({ search: (event.target as HTMLInputElement).value });
              }
            }}
            placeholder="Search for our farm-fresh products"
          />
        </div>
        <button
          type="button"
          className="mobile-filter-toggle"
          onClick={() => setFiltersOpen(true)}
        >
          Filter
        </button>
        <button
          type="button"
          className="mobile-filter-toggle"
          onClick={() => setSortOpen((v) => !v)}
        >
          Sort
        </button>
      </div>

      <div className="shop-layout-row">
        <FilterSidebar
          values={filters}
          onChange={handleFilterChange}
          onClearAll={handleClearAll}
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />

        <section className="shop-product-list-wrap">
          <div className={`shop-toolbar ${sortOpen ? "sort-open-mobile" : ""}`}>
            <p className="result-count">
              {total === 0
                ? "No products found"
                : `Showing ${rangeStart}–${rangeEnd} of ${total} products`}
            </p>
            <label className="sort-select">
              Sort by
              <select
                value={sort}
                onChange={(event) => updateQuery({ sort: event.target.value })}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {loading ? (
            <div className="shop-empty-state">
              <h3>Loading products…</h3>
            </div>
          ) : products.length === 0 ? (
            <div className="shop-empty-state">
              <h3>No berries found</h3>
              <p>Try adjusting your filters or searching a different term.</p>
              <button type="button" className="cta-button" onClick={handleClearAll}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="shop-product-list">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                  onAdded={handleAdded}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Pagination">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => updateQuery({ page: page - 1 }, false)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={p === page ? "active" : ""}
                  onClick={() => updateQuery({ page: p }, false)}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => updateQuery({ page: page + 1 }, false)}
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </div>

      {filtersOpen && (
        <div
          className="filter-drawer-backdrop"
          onClick={() => setFiltersOpen(false)}
        />
      )}

      <div style={{ paddingTop: 18, textAlign: "center" }}>
        <SocialShare />
      </div>

      {toast && <div className="toast-notification">{toast}</div>}

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  );
}
