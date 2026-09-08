export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export type Product = {
  id: number;
  slug: string;
  sku: string;
  category: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  price: number;
  salePrice: number | null;
  discountPercent: number;
  weight: string;
  stock: number;
  inStock: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
};

export type Category = {
  key: string;
  name: string;
  description: string;
  heroImage: string;
};

export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  weight?: string;
  inStock?: boolean;
  type?: string;
  minDiscount?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function buildQuery(filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (typeof filters.minPrice === "number")
    params.set("minPrice", String(filters.minPrice));
  if (typeof filters.maxPrice === "number")
    params.set("maxPrice", String(filters.maxPrice));
  if (filters.weight) params.set("weight", filters.weight);
  if (filters.inStock) params.set("inStock", "true");
  if (filters.type) params.set("type", filters.type);
  if (typeof filters.minDiscount === "number")
    params.set("minDiscount", String(filters.minDiscount));
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  return params.toString();
}

export async function fetchProducts(
  filters: ProductFilters = {},
): Promise<ProductListResult> {
  const qs = buildQuery(filters);
  const res = await fetch(`${API_BASE_URL}/api/products${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  return {
    products: data.products,
    total: data.total,
    page: data.page,
    limit: data.limit,
    totalPages: data.totalPages,
  };
}

export async function fetchProductBySlug(
  slug: string,
): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load product");
  const data = await res.json();
  return data.product;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  const data = await res.json();
  return data.categories;
}

export type EnquiryType = "grower" | "business" | "investor" | "general";

export type EnquiryPayload = {
  type: EnquiryType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit enquiry");
}

export async function subscribeToNewsletter(
  email: string,
): Promise<{ alreadySubscribed: boolean }> {
  const res = await fetch(`${API_BASE_URL}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Failed to subscribe");
  const data = await res.json();
  return { alreadySubscribed: Boolean(data.alreadySubscribed) };
}
