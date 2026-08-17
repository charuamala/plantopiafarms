export type FilterValues = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  weight?: string;
  inStock: boolean;
  type?: string;
  minDiscount?: number;
};

type Props = {
  values: FilterValues;
  onChange: (next: Partial<FilterValues>) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const CATEGORIES = [
  { key: undefined, label: "All Berries" },
  { key: "strawberry", label: "Strawberry" },
  { key: "blueberry", label: "Blueberry" },
  { key: "blackberry", label: "Blackberry" },
  { key: "raspberry", label: "Raspberry" },
];

const WEIGHTS = ["125g", "250g", "500g", "1kg"];

const PRODUCT_TYPES = [
  { key: "organic", label: "Organic" },
  { key: "farm-fresh", label: "Farm Fresh" },
  { key: "premium", label: "Premium" },
  { key: "imported", label: "Imported" },
  { key: "gift-pack", label: "Gift Pack" },
  { key: "combo-pack", label: "Combo Pack" },
];

const DISCOUNTS = [10, 20, 30, 50];

export default function FilterSidebar({
  values,
  onChange,
  onClearAll,
  isOpen,
  onClose,
}: Props) {
  return (
    <aside className={`filter-panel ${isOpen ? "filter-panel-open" : ""}`}>
      <div className="filter-heading-row">
        <h3>Filters</h3>
        <div className="filter-heading-actions">
          <button type="button" className="clear-link" onClick={onClearAll}>
            Clear all
          </button>
          <button
            type="button"
            className="filter-close-mobile"
            onClick={onClose}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="filter-group">
        <h4>Categories</h4>
        {CATEGORIES.map((c) => (
          <label key={c.label} className="filter-option">
            <input
              type="radio"
              name="category"
              checked={(values.category ?? undefined) === c.key}
              onChange={() => onChange({ category: c.key })}
            />
            <span>{c.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-range-control">
          <div className="price-range-value">
            Up to ₹{values.maxPrice ?? 1500}
          </div>
          <input
            type="range"
            min={0}
            max={1500}
            step={50}
            value={values.maxPrice ?? 1500}
            onChange={(event) =>
              onChange({ maxPrice: Number(event.target.value) || undefined })
            }
            className="price-slider"
            aria-label="Maximum price"
          />
          <div className="price-range-scale">
            <span>₹0</span>
            <span>₹1,500</span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h4>Product Weight</h4>
        {WEIGHTS.map((weight) => (
          <label key={weight} className="filter-option">
            <input
              type="radio"
              name="weight"
              checked={values.weight === weight}
              onChange={() =>
                onChange({ weight: values.weight === weight ? undefined : weight })
              }
            />
            <span>{weight}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Availability</h4>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={values.inStock}
            onChange={(event) => onChange({ inStock: event.target.checked })}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      <div className="filter-group">
        <h4>Product Type</h4>
        {PRODUCT_TYPES.map((t) => (
          <label key={t.key} className="filter-option">
            <input
              type="radio"
              name="type"
              checked={values.type === t.key}
              onChange={() =>
                onChange({ type: values.type === t.key ? undefined : t.key })
              }
            />
            <span>{t.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Discount</h4>
        {DISCOUNTS.map((d) => (
          <label key={d} className="filter-option">
            <input
              type="radio"
              name="discount"
              checked={values.minDiscount === d}
              onChange={() =>
                onChange({ minDiscount: values.minDiscount === d ? undefined : d })
              }
            />
            <span>{d}% or more</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
