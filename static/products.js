// =============================================
// PRODUCTS DATA
// =============================================

const PRODUCTS = [
  {
    id: 1,
    name: "Phantom X Pro",
    category: "pro",
    tag: "Best Seller",
    shortDesc: "YoYo bi cầu cao cấp cho vận động viên chuyên nghiệp",
    desc: "Phantom X Pro là dòng YoYo đỉnh cao được thiết kế cho các tay chơi chuyên nghiệp. Với cấu trúc bi cầu siêu bền, khung nhôm nguyên khối anodized, độ quay ổn định lên đến 4 phút. Phù hợp biểu diễn 1A, 3A và 5A.",
    price: 850000,
    oldPrice: 1200000,
    stock: 15,
    rating: 5,
    specs: { "Chất liệu": "Nhôm 6061-T6", "Đường kính": "56mm", "Trọng lượng": "67g", "Bearing": "Ceramic KonKave", "Level": "Professional", "String": "Poly/Nylon" },
    color1: "#ff6b35", color2: "#c0392b", color3: "#7b0000"
  },
  {
    id: 2,
    name: "Shadow Blast",
    category: "pro",
    tag: "New",
    shortDesc: "Thiết kế butterfly wing, hoàn hảo cho 1A freestyle",
    desc: "Shadow Blast nổi bật với thiết kế wing butterfly độc đáo, tối ưu cho các combo string trick phức tạp. Vòng bi hybid ceramic cho lực quay cực mạnh, giảm thiểu rung lắc khi thực hiện các trick high-level.",
    price: 650000,
    oldPrice: null,
    stock: 8,
    rating: 4,
    specs: { "Chất liệu": "Nhôm 7075", "Đường kính": "54mm", "Trọng lượng": "63g", "Bearing": "Hybrid Ceramic", "Level": "Advanced", "String": "Polyester" },
    color1: "#1a1a2e", color2: "#16213e", color3: "#0f3460"
  },
  {
    id: 3,
    name: "Fire Storm",
    category: "intermediate",
    tag: "Hot",
    shortDesc: "YoYo mid-range, lửa cháy với màu đỏ rực rỡ",
    desc: "Fire Storm mang hơi thở rực lửa với lớp anodized đỏ cam nổi bật. Được thiết kế cho người chơi trung cấp muốn nâng tầm kỹ năng. Cân bằng hoàn hảo giữa tốc độ và độ ổn định.",
    price: 420000,
    oldPrice: 550000,
    stock: 22,
    rating: 4,
    specs: { "Chất liệu": "Nhôm 6061", "Đường kính": "55mm", "Trọng lượng": "65g", "Bearing": "Steel KK", "Level": "Intermediate", "String": "Cotton/Poly" },
    color1: "#ff4500", color2: "#ff6b00", color3: "#ffa500"
  },
  {
    id: 4,
    name: "Neo Starter",
    category: "beginner",
    tag: "Beginner",
    shortDesc: "Bộ khởi đầu hoàn hảo cho người mới học YoYo",
    desc: "Neo Starter là người bạn đồng hành lý tưởng cho những ai mới bước vào thế giới YoYo. Thiết kế responsive giúp dễ dàng giật về tay, body rộng cho phép học string tricks cơ bản.",
    price: 180000,
    oldPrice: null,
    stock: 45,
    rating: 4,
    specs: { "Chất liệu": "Plastic ABS", "Đường kính": "57mm", "Trọng lượng": "58g", "Bearing": "Slim Steel", "Level": "Beginner", "String": "Cotton" },
    color1: "#22c55e", color2: "#16a34a", color3: "#166534"
  },
  {
    id: 5,
    name: "Titanium Ghost",
    category: "pro",
    tag: "Limited",
    shortDesc: "Phiên bản giới hạn – Titan nguyên khối siêu nhẹ",
    desc: "Titanium Ghost là kiệt tác YoYo với thân được gia công từ titanium nguyên khối. Trọng lượng siêu nhẹ nhưng cực kỳ bền, mang lại cảm giác hoàn toàn khác biệt so với nhôm thông thường. Chỉ 30 chiếc mỗi đợt.",
    price: 2200000,
    oldPrice: 2800000,
    stock: 3,
    rating: 5,
    specs: { "Chất liệu": "Titanium Grade 5", "Đường kính": "53mm", "Trọng lượng": "58g", "Bearing": "Ceramic Full", "Level": "Expert", "String": "Premium Poly" },
    color1: "#c0c0c0", color2: "#a0a0b0", color3: "#707080"
  }
];

// =============================================
// SVG YoYo Generator
// =============================================

function createYoYoSVG(c1, c2, c3, size = 180) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const id = 'g' + Math.random().toString(36).slice(2,7);
  return `<svg viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
    <defs>
      <radialGradient id="${id}a" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="60%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </radialGradient>
      <radialGradient id="${id}b" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="${c2}"/>
      </radialGradient>
      <filter id="${id}sh">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="${c3}" flood-opacity="0.5"/>
      </filter>
    </defs>
    <!-- Top disc shadow -->
    <ellipse cx="${cx}" cy="${cy*0.72+4}" rx="${cx*0.88}" ry="${cy*0.26}" fill="${c3}" opacity="0.4"/>
    <!-- Top disc -->
    <ellipse cx="${cx}" cy="${cy*0.68}" rx="${cx*0.88}" ry="${cy*0.26}" fill="url(#${id}a)" filter="url(#${id}sh)"/>
    <ellipse cx="${cx}" cy="${cy*0.64}" rx="${cx*0.88}" ry="${cy*0.26}" fill="url(#${id}b)"/>
    <ellipse cx="${cx}" cy="${cy*0.64}" rx="${cx*0.62}" ry="${cy*0.18}" fill="${c1}" opacity="0.35"/>
    <!-- Bottom disc shadow -->
    <ellipse cx="${cx}" cy="${cy*1.36+4}" rx="${cx*0.88}" ry="${cy*0.26}" fill="${c3}" opacity="0.4"/>
    <!-- Bottom disc -->
    <ellipse cx="${cx}" cy="${cy*1.32}" rx="${cx*0.88}" ry="${cy*0.26}" fill="url(#${id}a)"/>
    <ellipse cx="${cx}" cy="${cy*1.28}" rx="${cx*0.88}" ry="${cy*0.26}" fill="url(#${id}b)"/>
    <ellipse cx="${cx}" cy="${cy*1.28}" rx="${cx*0.62}" ry="${cy*0.18}" fill="${c1}" opacity="0.25"/>
    <!-- Axle -->
    <rect x="${cx-0.07*s}" y="${cy*0.88}" width="${0.14*s}" height="${cy*0.46}" fill="${c3}"/>
    <!-- Center nut -->
    <ellipse cx="${cx}" cy="${cy}" rx="${cx*0.12}" ry="${cy*0.06}" fill="${c1}" opacity="0.9"/>
    <!-- String -->
    <line x1="${cx}" y1="${cy*1.52}" x2="${cx}" y2="${s-4}" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <!-- Shine top -->
    <ellipse cx="${cx*0.72}" cy="${cy*0.52}" rx="${cx*0.2}" ry="${cy*0.08}" fill="white" opacity="0.25" transform="rotate(-25,${cx*0.72},${cy*0.52})"/>
    <!-- Shine bottom -->
    <ellipse cx="${cx*0.72}" cy="${cy*1.16}" rx="${cx*0.16}" ry="${cy*0.06}" fill="white" opacity="0.15" transform="rotate(-25,${cx*0.72},${cy*1.16})"/>
  </svg>`;
}

// Render product card
function renderProductCard(p, container) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = p.id;
  const stars = '★'.repeat(p.rating) + '☆'.repeat(5-p.rating);
  const priceOld = p.oldPrice ? `<span class="old-price">${p.oldPrice.toLocaleString('vi-VN')}đ</span>` : '';
  card.innerHTML = `
    <div class="product-img">
      ${p.tag ? `<div class="product-badge">${p.tag}</div>` : ''}
      ${createYoYoSVG(p.color1, p.color2, p.color3)}
    </div>
    <div class="product-info">
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.shortDesc}</div>
      <div style="color:#ffd700;font-size:13px;margin-bottom:14px;">${stars}</div>
      <div class="product-footer">
        <div class="product-price">
          ${priceOld}
          ${p.price.toLocaleString('vi-VN')}đ
        </div>
        <button class="btn-add-cart" onclick="event.stopPropagation();addToCart(${p.id})">
          <i class="fas fa-cart-plus"></i>
        </button>
      </div>
    </div>`;
  card.addEventListener('click', () => openProductModal(p.id));
  container.appendChild(card);
}

// Expose globally
window.PRODUCTS = PRODUCTS;
window.createYoYoSVG = createYoYoSVG;
window.renderProductCard = renderProductCard;