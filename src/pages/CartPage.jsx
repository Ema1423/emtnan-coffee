import React, { useEffect, useState } from 'react';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = () => {
    fetch('https://emtnan-coffee.onrender.com/cart')
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('فشل جلب السلة:', err));
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const handleCheckout = () => {
  fetch('https://emtnan-coffee.onrender.com/checkout', {
    method: 'POST',
  })
    .then(res => {
      if (!res.ok) throw new Error('فشل الطلب');
      return res.json();
    })
    .then(data => {
      console.log("✅ الفاتورة:", data);
      alert(`✅ تم تنفيذ الطلب بنجاح!\nالإجمالي: ${data.total} ريال`);
      navigate('/');
    })
    .catch(err => {
      console.error("❌ فشل تنفيذ الطلب:", err);
      alert("❌ حدث خطأ أثناء تنفيذ الطلب");
    });
};


  const handleDelete = (index) => {
    fetch(`https://emtnan-coffee.onrender.com/cart/${index}`, {
      method: 'DELETE',
    })
      .then(() => fetchCart())
      .catch(err => console.error('فشل حذف المنتج:', err));
  };

  const updateQuantity = (index, change) => {
   

    const updatedItems = [...cartItems];
    const item = updatedItems[index];
    const newQty = (item.quantity || 1) + change;
    if (newQty < 1) return;

    fetch('https://emtnan-coffee.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, quantity: newQty }),
    })
      .then(() => fetchCart())
      .catch(err => console.error('فشل تحديث الكمية:', err));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return total + (isNaN(price) ? 0 : price * quantity);
  }, 0);

  return (
    <PageTransition>
      <video autoPlay muted loop className="background-video">
        <source src="/videos/coff.mp4" type="video/mp4" />
      </video>

      <div className="cart-page cart-content">
        <h1>🛒 السلة</h1>

        {cartItems.length === 0 ? (
          <p>السلة فارغة حالياً.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    className="cart-image"
                  />
                  <div className="cart-details">
                    <strong>{item.name}</strong><br />
                    {item.price} × {item.quantity || 1} = {(item.price * (item.quantity || 1)).toFixed(2)} SAR
                    <p className="prep-time">⏱ {item.prep_time || '5 min'}</p>
                    <div className="quantity-buttons">
                      <button onClick={() => updateQuantity(index, -1)} className="qty-btn">-</button>
                      <span className="qty-value">{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(index, 1)} className="qty-btn">+</button>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(index)} className="remove-button">❌</button>
                </li>
              ))}
            </ul>

            <p className="total"><strong>الإجمالي:</strong> {totalPrice.toFixed(2)} SAR</p>

            <div className="cart-buttons">
              <button onClick={() => {
              console.log("✅ الزر تم الضغط عليه");
              handleCheckout();
        }}>
            إتمام الطلب
            </button>

              <button onClick={() => navigate('/')}>الرجوع للرئيسية</button>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}

export default CartPage;