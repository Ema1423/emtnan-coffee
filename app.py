from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # يسمح بالوصول من الفرونت اند

# 🛠️ دوال مساعدة لقراءة وكتابة الملفات
def read_data(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

def write_data(filename, data):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

# ✅ 1. عرض قائمة المنتجات
@app.route('/products', methods=['GET'])
def get_products():
    products = read_data('products.json')
    return jsonify(products)

# ✅ 2. عرض محتوى السلة
@app.route('/cart', methods=['GET'])
def get_cart():
    cart = read_data('cart.json')
    return jsonify(cart)

# ✅ 3. إضافة منتج للسلة
@app.route('/cart', methods=['POST'])
def add_to_cart():
    cart = read_data('cart.json')
    new_item = request.json
    print("📦 تم استلام المنتج:", new_item)
    cart.append(new_item)
    write_data('cart.json', cart)
    return jsonify({"message": "Item added to cart"}), 201

# ✅ ✅ 3.1 تحديث كمية منتج بناءً على ID
@app.route('/update-quantity', methods=['POST'])
def update_quantity():
    data = request.json
    product_id = data.get('id')
    new_qty = data.get('quantity')

    cart = read_data('cart.json')
    for item in cart:
        if item.get('id') == product_id:
            item['quantity'] = new_qty
            break

    write_data('cart.json', cart)
    return jsonify({"message": "Quantity updated"})

# ✅ 4. حذف منتج من السلة باستخدام الفهرس
@app.route('/cart/<int:index>', methods=['DELETE'])
def delete_from_cart(index):
    cart = read_data('cart.json')
    if 0 <= index < len(cart):
        removed = cart.pop(index)
        write_data('cart.json', cart)
        return jsonify({"message": "Item removed", "item": removed})
    else:
        return jsonify({"error": "Invalid index"}), 400

@app.route('/checkout', methods=['POST'])
def checkout():
    print("📥 تم الضغط على زر إتمام الطلب")  

    cart = read_data('cart.json')
    if not cart:
        return jsonify({"error": "Cart is empty"}), 400

    total = sum(item['price'] * item.get('quantity', 1) for item in cart)
    delivery_fee = 10
    tax = total * 0.05
    final_total = total + delivery_fee + tax

    write_data('cart.json', [])

    # ✅ طباعة تفاصيل الفاتورة في الطرفية
    print(f"📦 إجمالي الطلب: {total:.2f} ريال")
    print(f"🚚 التوصيل: {delivery_fee:.2f} ريال")
    print(f"💰 الضريبة: {tax:.2f} ريال")
    print(f"💳 الإجمالي الكلي: {final_total:.2f} ريال")
    print("✅ تم إفراغ السلة بعد الدفع")

    write_data('cart.json', [])  # تفرغ السلة بعد الدفع

    return jsonify({
        "message": "Order placed successfully",
        "subtotal": total,
        "delivery": delivery_fee,
        "tax": round(tax, 2),
        "total": round(final_total, 2)
    })


# ✅ نقطة البداية
@app.route('/')
def home():
    return jsonify({"message": "Emtnan Backend is running 🎉"})

if __name__ == '__main__':
    app.run(debug=True)