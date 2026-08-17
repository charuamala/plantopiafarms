const ORDERS_KEY = "plantopiaOrders";

export type OrderLineItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  name: string;
  email: string;
  address: string;
  items: OrderLineItem[];
  total: number;
  status: string;
  createdAt: string;
};

export function getAllOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(ORDERS_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getOrdersForEmail(email: string): Order[] {
  return getAllOrders().filter((order) => order.email === email);
}

export function addOrder(order: Order) {
  if (typeof window === "undefined") return;
  const orders = getAllOrders();
  orders.unshift(order);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
