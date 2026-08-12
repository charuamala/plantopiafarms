export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  status: "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  date: string;
  items: { name: string; quantity: number; price: number }[];
};

export const sampleOrders: AdminOrder[] = [
  {
    id: "ORD-1001",
    customer: "Meena Sharma",
    email: "meena@example.com",
    status: "Delivered",
    total: 1299,
    date: "2026-08-10",
    items: [
      { name: "Strawberry pack", quantity: 2, price: 299 },
      { name: "Blueberry pack", quantity: 1, price: 399 },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Arjun Gupta",
    email: "arjun@example.com",
    status: "Shipped",
    total: 349,
    date: "2026-08-11",
    items: [{ name: "Blackberry pack", quantity: 1, price: 349 }],
  },
  {
    id: "ORD-1003",
    customer: "Neha Patel",
    email: "neha@example.com",
    status: "Confirmed",
    total: 329,
    date: "2026-08-12",
    items: [{ name: "Raspberry pack", quantity: 1, price: 329 }],
  },
  {
    id: "ORD-1004",
    customer: "Priya Singh",
    email: "priya@example.com",
    status: "Delivered",
    total: 698,
    date: "2026-08-09",
    items: [
      { name: "Strawberry pack", quantity: 1, price: 299 },
      { name: "Raspberry pack", quantity: 1, price: 329 },
    ],
  },
];

export const statusColor: Record<AdminOrder["status"], string> = {
  Confirmed: "#3e8e41",
  Shipped: "#2d6b30",
  Delivered: "#4d6ed7",
  Cancelled: "#b0233a",
};
