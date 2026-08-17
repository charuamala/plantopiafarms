import { getDb } from './d1';

export type ProductRow = {
  id: number;
  slug: string;
  sku: string;
  category_key: string;
  name: string;
  short_description: string;
  description: string;
  images: string;
  price: number;
  sale_price: number | null;
  weight: string;
  stock: number;
  is_active: number;
  rating: number;
  review_count: number;
  tags: string;
  created_at: string;
};

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

export type ProductInput = {
  slug: string;
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
  rating?: number;
  reviewCount?: number;
  tags?: string[];
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

function toProduct(row: ProductRow): Product {
  const price = row.price;
  const salePrice = row.sale_price;
  const discountPercent =
    salePrice && salePrice < price
      ? Math.round(((price - salePrice) / price) * 100)
      : 0;

  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    category: row.category_key,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    images: JSON.parse(row.images || '[]'),
    price,
    salePrice: salePrice ?? null,
    discountPercent,
    weight: row.weight,
    stock: row.stock,
    inStock: row.stock > 0,
    isActive: Boolean(row.is_active),
    rating: row.rating,
    reviewCount: row.review_count,
    tags: JSON.parse(row.tags || '[]'),
    createdAt: row.created_at,
  };
}

function sortProducts(products: Product[], sort?: string): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price_asc':
      return list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case 'price_desc':
      return list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case 'discount_desc':
      return list.sort((a, b) => b.discountPercent - a.discountPercent);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'popularity':
      return list.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'newest':
      return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    case 'alphabetical':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }
}

export async function listProducts(filters: ProductFilters) {
  const db = getDb();
  const clauses: string[] = ['is_active = 1'];
  const params: unknown[] = [];

  if (filters.category) {
    clauses.push('category_key = ?');
    params.push(filters.category);
  }
  if (typeof filters.minPrice === 'number') {
    clauses.push('price >= ?');
    params.push(filters.minPrice);
  }
  if (typeof filters.maxPrice === 'number') {
    clauses.push('price <= ?');
    params.push(filters.maxPrice);
  }
  if (filters.weight) {
    clauses.push('weight = ?');
    params.push(filters.weight);
  }
  if (filters.inStock) {
    clauses.push('stock > 0');
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const { results } = await db
    .prepare(`SELECT * FROM products ${where}`)
    .bind(...params)
    .all<ProductRow>();

  let products = (results ?? []).map(toProduct);

  if (filters.type) {
    products = products.filter((p) => p.tags.includes(filters.type as string));
  }
  if (typeof filters.minDiscount === 'number') {
    products = products.filter((p) => p.discountPercent >= (filters.minDiscount as number));
  }
  if (filters.search) {
    const q = filters.search.trim().toLowerCase();
    if (q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
  }

  products = sortProducts(products, filters.sort);

  const total = products.length;
  const limit = filters.limit && filters.limit > 0 ? filters.limit : 12;
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const start = (page - 1) * limit;
  const paged = products.slice(start, start + limit);

  return {
    products: paged,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function listAllProductsForAdmin(): Promise<Product[]> {
  const db = getDb();
  const { results } = await db
    .prepare('SELECT * FROM products ORDER BY category_key, name')
    .all<ProductRow>();
  return (results ?? []).map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getDb();
  const row = await db
    .prepare('SELECT * FROM products WHERE slug = ? AND is_active = 1')
    .bind(slug)
    .first<ProductRow>();
  return row ? toProduct(row) : null;
}

export async function listCategories(): Promise<Category[]> {
  const db = getDb();
  const { results } = await db.prepare('SELECT * FROM categories').all<{
    key: string;
    name: string;
    description: string;
    hero_image: string;
  }>();
  return (results ?? []).map((r) => ({
    key: r.key,
    name: r.name,
    description: r.description,
    heroImage: r.hero_image,
  }));
}

export async function countActiveProducts(): Promise<number> {
  const db = getDb();
  const row = await db
    .prepare('SELECT COUNT(*) as count FROM products WHERE is_active = 1')
    .first<{ count: number }>();
  return row?.count ?? 0;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const db = getDb();
  const slug = input.slug?.trim() || slugify(input.name);
  await db
    .prepare(
      `INSERT INTO products
        (slug, sku, category_key, name, short_description, description, images, price, sale_price, weight, stock, is_active, rating, review_count, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      slug,
      input.sku,
      input.category,
      input.name,
      input.shortDescription,
      input.description,
      JSON.stringify(input.images ?? []),
      input.price,
      input.salePrice ?? null,
      input.weight,
      input.stock,
      input.isActive === false ? 0 : 1,
      input.rating ?? 4.5,
      input.reviewCount ?? 0,
      JSON.stringify(input.tags ?? [])
    )
    .run();

  const row = await db
    .prepare('SELECT * FROM products WHERE slug = ?')
    .bind(slug)
    .first<ProductRow>();
  if (!row) throw new Error('Failed to load product after insert');
  return toProduct(row);
}

export async function updateProduct(
  id: number,
  input: Partial<ProductInput>
): Promise<Product | null> {
  const db = getDb();
  const existing = await db
    .prepare('SELECT * FROM products WHERE id = ?')
    .bind(id)
    .first<ProductRow>();
  if (!existing) return null;

  const merged: ProductRow = {
    ...existing,
    slug: input.slug ?? existing.slug,
    sku: input.sku ?? existing.sku,
    category_key: input.category ?? existing.category_key,
    name: input.name ?? existing.name,
    short_description: input.shortDescription ?? existing.short_description,
    description: input.description ?? existing.description,
    images: input.images ? JSON.stringify(input.images) : existing.images,
    price: input.price ?? existing.price,
    sale_price: input.salePrice === undefined ? existing.sale_price : input.salePrice,
    weight: input.weight ?? existing.weight,
    stock: input.stock ?? existing.stock,
    is_active:
      input.isActive === undefined ? existing.is_active : input.isActive ? 1 : 0,
    rating: input.rating ?? existing.rating,
    review_count: input.reviewCount ?? existing.review_count,
    tags: input.tags ? JSON.stringify(input.tags) : existing.tags,
  };

  await db
    .prepare(
      `UPDATE products SET
        slug = ?, sku = ?, category_key = ?, name = ?, short_description = ?,
        description = ?, images = ?, price = ?, sale_price = ?, weight = ?,
        stock = ?, is_active = ?, rating = ?, review_count = ?, tags = ?
       WHERE id = ?`
    )
    .bind(
      merged.slug,
      merged.sku,
      merged.category_key,
      merged.name,
      merged.short_description,
      merged.description,
      merged.images,
      merged.price,
      merged.sale_price,
      merged.weight,
      merged.stock,
      merged.is_active,
      merged.rating,
      merged.review_count,
      merged.tags,
      id
    )
    .run();

  return toProduct(merged);
}

export async function deleteProduct(id: number): Promise<boolean> {
  const db = getDb();
  const result = await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
  return (result.meta?.changes ?? 0) > 0;
}
