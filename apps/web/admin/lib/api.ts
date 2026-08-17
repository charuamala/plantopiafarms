export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

const TOKEN_KEY = "plantopiaAdminToken";

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

export type ProductInput = {
  slug?: string;
  sku: string;
  category: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  price: number;
  salePrice?: number | null;
  weight: string;
  stock: number;
  isActive?: boolean;
  tags?: string[];
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function adminLogin(
  email: string,
  password: string,
): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Invalid admin credentials");
  }
  return data.token;
}

export async function fetchAdminDashboard() {
  const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load dashboard");
  return data.stats as {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
  };
}

export async function fetchAdminProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load products");
  return data.products;
}

export async function createAdminProduct(input: ProductInput): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to create product");
  return data.product;
}

export async function updateAdminProduct(
  id: number,
  input: Partial<ProductInput>,
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to update product");
  return data.product;
}

export async function deleteAdminProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete product");
}
