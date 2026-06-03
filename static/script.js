function toggleChat(){
    document.getElementById("chat-window").classList.toggle("hidden");
}

function sendChat(){
    let input = document.getElementById("chat-input");
    let messages = document.getElementById("chat-messages");

    if(input.value.trim() === "") return;

    messages.innerHTML += `<p><b>Bạn:</b> ${input.value}</p>`;

    fetch("/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:input.value})
    })
    .then(res => res.json())
    .then(data => {
        messages.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
    });

    input.value = "";
}

const data = {
    "Thừa Thiên Huế": {
        "TP Huế": ["Phường Phú Hội", "Phường Thuận Thành", "Phường Vỹ Dạ"],
        "Hương Thủy": ["Phường Thủy Dương", "Phường Thủy Phương"]
    },
    "Đà Nẵng": {
        "Hải Châu": ["Phường Hải Châu 1", "Phường Hải Châu 2"],
        "Sơn Trà": ["Phường An Hải Bắc", "Phường Mân Thái"]
    },
    "Hồ Chí Minh": {
        "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành"],
        "Quận 3": ["Phường Võ Thị Sáu", "Phường 7"]
    }
};

window.onload = function(){
    let province = document.getElementById("province");
    let district = document.getElementById("district");
    let ward = document.getElementById("ward");

    if(!province) return;

    Object.keys(data).forEach(p => {
        province.innerHTML += `<option value="${p}">${p}</option>`;
    });

    province.onchange = function(){
        district.innerHTML = `<option value="">Chọn quận/huyện</option>`;
        ward.innerHTML = `<option value="">Chọn phường/xã</option>`;

        Object.keys(data[province.value]).forEach(d => {
            district.innerHTML += `<option value="${d}">${d}</option>`;
        });
    };

    district.onchange = function(){
        ward.innerHTML = `<option value="">Chọn phường/xã</option>`;

        data[province.value][district.value].forEach(w => {
            ward.innerHTML += `<option value="${w}">${w}</option>`;
        });
    };
};