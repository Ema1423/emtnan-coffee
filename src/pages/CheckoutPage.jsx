// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import PageTransition from '../components/PageTransition';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧺 جلب السلة من الباك اند لعرض المنتجات في الفاتورة
  useEffect(() => {
    fetch('https://emtnan-coffee.onrender.com/cart')
      .then(res => res.json())
      .then(data => {
        setCartItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('فشل جلب السلة في صفحة الفاتورة:', err);
        setLoading(false);
      });
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return total + (isNaN(price) ? 0 : price * quantity);
  }, 0);

  // ✅ إرسال الطلب للباك اند وإنشاء الفاتورة الحقيقية
  const handleConfirmOrder = () => {
    fetch('https://emtnan-coffee.onrender.com/checkout', {
      method: 'POST',
    })
      .then(res => {
        if (!res.ok) throw new Error('فشل تنفيذ الطلب');
        return res.json();
      })
      .then(data => {
        setInvoice(data);      // { items, subtotal, delivery_fee, tax, total }
        setConfirmed(true);
        // بعد 3 ثواني يرجع للرئيسية
        setTimeout(() => navigate('/'), 3000);
      })
      .catch(err => {
        console.error('خطأ أثناء تنفيذ الطلب:', err);
        alert('❌ حدث خطأ أثناء تنفيذ الطلب');
      });
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="checkout-page">
          <p>جارِ تحميل الطلب...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="checkout-page">
        {confirmed && invoice ? (
          <div className="thank-you">
            <h2>✅ Order Confirmed!</h2>
            <p>Thank you for your purchase. Your coffee will arrive soon ☕</p>

            <div className="invoice-box">
              <h3>Final Invoice 🧾</h3>
              {invoice.items && invoice.items.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity || 1} = {(item.price * (item.quantity || 1)).toFixed(2)} SAR
                </p>
              ))}
              <hr />
              <p>Subtotal: {invoice.subtotal.toFixed(2)} SAR</p>
              <p>Delivery: {invoice.delivery_fee.toFixed(2)} SAR</p>
              <p>VAT (5%): {invoice.tax.toFixed(2)} SAR</p>
              <p><strong>Total: {invoice.total.toFixed(2)} SAR</strong></p>
            </div>
          </div>
        ) : (
          <>
            <h1>Checkout 🧾</h1>

            {/* زر طباعة الفاتورة */}
            <button onClick={() => window.print()}>🖨 Print Invoice</button>

            {/* الفاتورة قبل التأكيد (من cartItems) */}
            <div id="invoice" className="invoice-print">
              <h2>🧾 Emtnan Coffee</h2>
              <p>Order Summary</p>
              <hr />
              {cartItems.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity || 1} = {(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)} SAR
                </p>
              ))}
              <hr />
              <p>Subtotal: {totalPrice.toFixed(2)} SAR</p>
              <p>Delivery: 10.00 SAR</p>
              <p>VAT (5%): {(totalPrice * 0.05).toFixed(2)} SAR</p>
              <p>
                <strong>
                  Total: {(totalPrice + 10 + totalPrice * 0.05).toFixed(2)} SAR
                </strong>
              </p>
            </div>

            <div className="invoice-box">
              <h3>Order Summary 📋</h3>
              <p>Subtotal: {totalPrice.toFixed(2)} SAR</p>
              <p>Delivery: 10.00 SAR</p>
              <p>VAT (5%): {(totalPrice * 0.05).toFixed(2)} SAR</p>
              <hr />
              <p>
                <strong>
                  Total: {(totalPrice + 10 + totalPrice * 0.05).toFixed(2)} SAR
                </strong>
              </p>
            </div>

            <button onClick={handleConfirmOrder}>Confirm & Pay</button>
            <button onClick={() => navigate('/cart')}>Back to Cart</button>
          </>
        )}
      </div>
    </PageTransition>
  );
}

export default CheckoutPage;