const CART_KEY = 'allcity_cart';

export function getCart() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
}

export function addToCart(product, size, qty = 1) {
  const cart = getCart();
  const price = product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price)
    ? parseFloat(product.salePrice)
    : parseFloat(product.price);
  const idx = cart.findIndex(i => i.productId === product.id && i.size === size);
  if (idx > -1) { cart[idx].qty += qty; }
  else { cart.push({ productId: product.id, name: product.name, size, qty, price, slug: product.slug, image: product.image }); }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
}

export function updateCartQty(productId, size, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.productId === productId && i.size === size);
  if (idx > -1) { cart[idx].qty = Math.max(1, qty); }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
}

export function removeFromCart(productId, size) {
  const cart = getCart().filter(i => !(i.productId === productId && i.size === size));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
}

export function clearCart() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('storage'));
  }
}
