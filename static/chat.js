// =============================================
// CHAT BOX
// =============================================

const chatResponses = {
  "mới bắt đầu": "Mình gợi ý bạn bắt đầu với **Neo Starter** (180k) – thiết kế responsive dễ giật về tay, body rộng giúp dễ học trick cơ bản. Sau khi nắm vững, có thể nâng cấp lên **Fire Storm** 🪀",
  "beginner": "Dành cho người mới, **Neo Starter** là lựa chọn tuyệt vời! Giá 180.000đ, thiết kế thân thiện, bền bỉ. Xem tại cửa hàng nhé!",
  "giá": "Sản phẩm của YoYoSniper có giá từ:\n• Neo Starter: 180.000đ (beginner)\n• Fire Storm: 420.000đ (intermediate)\n• Shadow Blast: 650.000đ (advanced)\n• Phantom X Pro: 850.000đ (pro)\n• Titanium Ghost: 2.200.000đ (limited)",
  "bảo hành": "YoYoSniper bảo hành **12 tháng** cho tất cả sản phẩm! Lỗi do sản xuất sẽ được đổi mới hoàn toàn. Bộ phận hỗ trợ kỹ thuật trực tuyến 24/7 🔧",
  "giao hàng": "Giao hàng toàn quốc trong **2–3 ngày làm việc**. Miễn phí vận chuyển cho đơn từ 500.000đ. Hỏa tốc nội thành Huế trong 4 giờ!",
  "thanh toán": "Hỗ trợ 2 hình thức:\n• **COD** – Thanh toán khi nhận hàng\n• **VNPAY QR** – Quét mã thanh toán ngay\nTất cả đều an toàn và nhanh chóng!",
  "pro": "Dòng Pro của YoYoSniper gồm:\n• **Phantom X Pro** – Nhôm 6061, Ceramic bearing\n• **Shadow Blast** – Nhôm 7075, thiết kế butterfly\n• **Titanium Ghost** – Titan nguyên khối, limited edition\nĐều phù hợp biểu diễn thi đấu!",
  "liên hệ": "Bạn có thể liên hệ:\n📍 123 Lê Lợi, TP. Huế\n📞 0905 123 456\n✉️ hello@yoyosniper.vn\nMạng xã hội: @yoyosniper.vn",
  "default": "Cảm ơn bạn đã liên hệ YoYoSniper! 🪀 Mình có thể giúp bạn về: sản phẩm, giá cả, bảo hành, giao hàng, hoặc thanh toán. Bạn muốn hỏi gì?"
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  for (const [key, val] of Object.entries(chatResponses)) {
    if (m.includes(key)) return val;
  }
  return chatResponses.default;
}

function appendMsg(text, type) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  const msg = input.value.trim();
  input.value = '';
  appendMsg(msg, 'user');
  setTimeout(() => {
    const response = getResponse(msg);
    appendMsg(response, 'bot');
  }, 600);
}

function chatQuick(msg) {
  document.getElementById('chatInput').value = msg;
  sendChat();
}

// Toggle chatbox
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chatToggle');
  const chatbox = document.getElementById('chatbox');
  const closeBtn = document.getElementById('chatClose');
  toggle?.addEventListener('click', () => chatbox?.classList.toggle('open'));
  closeBtn?.addEventListener('click', () => chatbox?.classList.remove('open'));
});

window.sendChat = sendChat;
window.chatQuick = chatQuick;