const WISHLIST_KEY = "plantopiaWishlist";
const WISHLIST_EVENT = "plantopia:wishlist-updated";

function readWishlist(): number[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(WISHLIST_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWishlist(ids: number[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}

export function getWishlist(): number[] {
  return readWishlist();
}

export function isWishlisted(productId: number): boolean {
  return readWishlist().includes(productId);
}

export function toggleWishlist(productId: number): boolean {
  const list = readWishlist();
  const idx = list.indexOf(productId);
  if (idx >= 0) {
    list.splice(idx, 1);
    writeWishlist(list);
    return false;
  }
  list.push(productId);
  writeWishlist(list);
  return true;
}

export function removeFromWishlist(productId: number) {
  writeWishlist(readWishlist().filter((id) => id !== productId));
}

export function subscribeToWishlist(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(WISHLIST_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(WISHLIST_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
