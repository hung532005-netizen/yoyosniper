// =============================================
// MAIN JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderFeaturedProducts();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Highlight active page
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(l => {
    const page = l.dataset.page;
    if ((page === 'home' && (path.endsWith('index.html') || path === '/')) ||
        path.includes(page)) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  // Update login link if user is logged in
  const user = getCurrentUser();
  const loginBtn = document.getElementById('loginNavBtn');
  if (loginBtn && user) {
    loginBtn.textContent = user.name || 'Tài khoản';
    loginBtn.href = user.role === 'admin' ? '../pages/admin.html' : '#';
  }
}

// ===== FEATURED PRODUCTS =====
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 3);
  featured.forEach(p => renderProductCard(p, grid));
}

// ===== PRODUCT MODAL =====
let currentQty = 1;

function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  let overlay = document.getElementById('productModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'productModalOverlay';
    overlay.innerHTML = `<div class="product-modal" id="productModalContent"></div>`;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeProductModal(); });
    document.body.appendChild(overlay);
  }

  currentQty = 1;
  const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
  const priceOld = p.oldPrice ? `<div style="font-size:16px;color:var(--gray);text-decoration:line-through;margin-bottom:4px;">${p.oldPrice.toLocaleString('vi-VN')}đ</div>` : '';
  const specsHtml = Object.entries(p.specs).map(([k,v]) =>
    `<div class="spec-row"><span>${k}</span><span>${v}</span></div>`).join('');

  document.getElementById('productModalContent').innerHTML = `
    <button class="modal-close" onclick="closeProductModal()"><i class="fas fa-times"></i></button>
    <div class="modal-grid">
      <div class="modal-img">${createYoYoSVG(p.color1, p.color2, p.color3, 260)}</div>
      <div class="modal-content">
        <p class="modal-tag">${p.tag || p.category}</p>
        <h2 class="modal-name">${p.name}</h2>
        <div class="modal-rating">${stars} <span style="color:var(--gray);font-size:13px;"> (${p.rating * 20} reviews)</span></div>
        ${priceOld}
        <div class="modal-price">${p.price.toLocaleString('vi-VN')}đ</div>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-specs">
          <h4>Thông số kỹ thuật</h4>
          ${specsHtml}
        </div>
        <div style="margin-bottom:16px;font-size:13px;color:${p.stock < 5 ? '#f87171' : '#22c55e'}">
          <i class="fas fa-box"></i> Còn ${p.stock} trong kho
        </div>
        <div class="modal-actions">
          <div class="qty-control">
            <button onclick="changeModalQty(-1)">−</button>
            <span id="modalQty">1</span>
            <button onclick="changeModalQty(1)">+</button>
          </div>
          <button class="btn-primary" onclick="addToCart(${p.id}, currentQty); closeProductModal();">
            <i class="fas fa-cart-plus"></i> Thêm Giỏ Hàng
          </button>
        </div>
      </div>
    </div>`;

  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function changeModalQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  const el = document.getElementById('modalQty');
  if (el) el.textContent = currentQty;
}

function closeProductModal() {
  const overlay = document.getElementById('productModalOverlay');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});

// ===== USER AUTH HELPERS =====
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('yoyo_user') || 'null'); }
  catch { return null; }
}

window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.changeModalQty = changeModalQty;
window.getCurrentUser = getCurrentUser;