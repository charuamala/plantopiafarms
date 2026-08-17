const CART_KEY = "plantopiaCart";
const CART_EVENT = "plantopia:cart-updated";

export type CartItem = {
  productId: number;
  quantity: number;
};

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(CART_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getCart(): CartItem[] {
  return readCart();
}

export function getCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(productId: number, quantity = 1) {
  const cart = readCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  writeCart(cart);
}

export function updateQuantity(productId: number, quantity: number) {
  const cart = readCart();
  if (quantity <= 0) {
    writeCart(cart.filter((item) => item.productId !== productId));
    return;
  }
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity = quantity;
    writeCart(cart);
  }
}

export function removeFromCart(productId: number) {
  const cart = readCart();
  writeCart(cart.filter((item) => item.productId !== productId));
}

export function clearCart() {
  writeCart([]);
}

export function subscribeToCart(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
