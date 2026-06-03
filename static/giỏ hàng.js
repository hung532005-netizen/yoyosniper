// =============================================
// CART MANAGEMENT
// =============================================

const CartManager = {
  get() {
    try { return JSON.parse(localStorage.getItem('yoyo_cart') || '[]'); }
    catch { return []; }
  },
  save(cart) {
    localStorage.setItem('yoyo_cart', JSON.stringify(cart));
    this.updateBadge();
  },
  add(productId, qty = 1) {
    const cart = this.get();
    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      const p = PRODUCTS.find(p => p.id === productId);
      if (p) cart.push({ id: p.id, name: p.name, price: p.price, qty, color1: p.color1, color2: p.color2, color3: p.color3 });
    }
    this.save(cart);
    showToast(`Đã thêm vào giỏ hàng! 🛒`, 'success');
  },
  remove(productId) {
    const cart = this.get().filter(i => i.id !== productId);
    this.save(cart);
  },
  updateQty(productId, qty) {
    const cart = this.get();
    const item = cart.find(i => i.id === productId);
    if (item) { item.qty = Math.max(1, qty); this.save(cart); }
  },
  total() {
    return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },
  clear() {
    localStorage.removeItem('yoyo_cart');
    this.updateBadge();
  },
  updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      const count = this.count();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

function addToCart(id, qty = 1) {
  CartManager.add(id, qty);
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function showToast(msg, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  const icon = type === 'success' ? '✅' : '❌';
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Init badge on load
document.addEventListener('DOMContentLoaded', () => CartManager.updateBadge());

window.CartManager = CartManager;
window.addToCart = addToCart;
window.showToast = showToast;