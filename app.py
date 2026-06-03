from flask import Flask, render_template, request, redirect, session, jsonify
import pyodbc

app = Flask(__name__)  # Sửa: name -> __name__
app.secret_key = "yoyosniper_secret"

SERVER = "LTHAAA"
DATABASE = "yoyosniper"

# ==========================================
# CONNECT SQL SERVER
# ==========================================
def get_conn():
    return pyodbc.connect(
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={SERVER};"
        f"DATABASE={DATABASE};"
        "Trusted_Connection=yes;"
    )

# ==========================================
# HOME
# ==========================================
@app.route("/")
def home():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM products ORDER BY id DESC")
    rows = cur.fetchall()
    
    products = []
    for row in rows:
        products.append({
            "id": row.id,
            "name": row.name,
            "price": row.price,
            "image": row.image,
            "description": row.description,
            "stock": row.stock
        })
    
    conn.close()
    return render_template("index.html", products=products)

# ==========================================
# SHOP
# ==========================================
@app.route("/shop")
def shop():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM products")
    rows = cur.fetchall()
    
    products = []
    for row in rows:
        products.append({
            "id": row.id,
            "name": row.name,
            "price": row.price,
            "image": row.image,
            "description": row.description,
            "stock": row.stock
        })
    
    conn.close()
    return render_template("shop.html", products=products)

# ==========================================
# PRODUCT DETAIL
# ==========================================
@app.route("/product/<int:id>")  # Sửa: [int:id](int:id) -> <int:id>
def product(id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT * FROM products WHERE id=?", (id,))
    row = cur.fetchone()
    conn.close()
    
    if not row:
        return "Không tìm thấy sản phẩm"
    
    product = {
        "id": row.id,
        "name": row.name,
        "price": row.price,
        "image": row.image,
        "description": row.description,
        "stock": row.stock
    }
    
    return render_template("product.html", product=product)

# ==========================================
# LOGIN
# ==========================================
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE email=? AND password=?", (email, password))
        user = cur.fetchone()
        conn.close()
        
        if user:
            session["username"] = user.username
            session["role"] = user.role
            
            if user.role == "admin":
                return redirect("/admin")
            return redirect("/")
        
        return render_template("login.html", error="Sai tài khoản hoặc mật khẩu")
    
    return render_template("login.html")

# ==========================================
# REGISTER
# ==========================================
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        phone = request.form["phone"]
        email = request.form["email"]
        password = request.form["password"]
        
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (username, phone, email, password, role) VALUES (?, ?, ?, ?, ?)",
            (username, phone, email, password, "user")
        )
        conn.commit()
        conn.close()
        
        return redirect("/login")
    
    return render_template("register.html")

# ==========================================
# LOGOUT
# ==========================================
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

# ==========================================
# CHECKOUT
# ==========================================
@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

# ==========================================
# PLACE ORDER
# ==========================================
@app.route("/place-order", methods=["POST"])
def place_order():
    data = request.json
    
    fullname = data.get("fullname")
    email = data.get("email")
    phone = data.get("phone")
    address = data.get("address")
    payment = data.get("payment")
    total = data.get("total")
    
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (customer_name, email, phone, address, payment_method, total_price) VALUES (?, ?, ?, ?, ?, ?)",
        (fullname, email, phone, address, payment, total)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "message": "Đặt hàng thành công"})

# ==========================================
# ADMIN
# ==========================================
@app.route("/admin")
def admin():
    if session.get("role") != "admin":
        return redirect("/login")
    
    conn = get_conn()
    cur = conn.cursor()
    
    cur.execute("SELECT * FROM orders ORDER BY id DESC")
    orders = cur.fetchall()
    
    cur.execute("SELECT SUM(total_price) FROM orders")
    revenue = cur.fetchone()[0]
    
    conn.close()
    
    return render_template("admin.html", orders=orders, revenue=revenue or 0)

# ==========================================
# CHAT API
# ==========================================
@app.route("/chat", methods=["POST"])
def chat():
    msg = request.json["message"].lower()
    
    if "giá" in msg:
        reply = "YoYo bên mình từ 180k đến 2.2 triệu 🪀"
    elif "bảo hành" in msg:
        reply = "Bảo hành 12 tháng toàn bộ sản phẩm 🔧"
    elif "giao hàng" in msg:
        reply = "Giao toàn quốc 2-3 ngày 🚚"
    else:
        reply = "YoYoSniper xin chào 🪀"
    
    return jsonify({"reply": reply})

# ==========================================
# RUN APP
# ==========================================
if __name__ == "__main__":  # Sửa: name == "main" -> __name__ == "__main__"
    app.run(debug=True)