import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { CartContext } from '../context/CartContext';
import PageTransition from '../components/PageTransition';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [confirmed, setConfirmed] = useState(false);

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  // ✅ زر التأكيد يعمل مباشرة بدون باك اند
  const handleConfirmOrder = () => {
    setConfirmed(true);
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <PageTransition>
      <div className="checkout-page">
        {confirmed ? (
          <div className="thank-you">
            <h2>✅ Order Confirmed!</h2>
            <p>Thank you for your purchase. Your coffee will arrive soon ☕</p>
          </div>
        ) : (
          <>
            <h1>Checkout 🧾</h1>

            <button onClick={() => window.print()}>🖨 Print Invoice</button>

            <div id="invoice" className="invoice-print">
              <h2>🧾 Emtnan Coffee</h2>
              <p>Order Summary</p>
              <hr />
              {cart.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity} = {(parseFloat(item.price) * item.quantity).toFixed(2)} SAR
                </p>
              ))}
              <hr />
              <p>Subtotal: {totalPrice.toFixed(2)} SAR</p>
              <p>Delivery: 10.00 SAR</p>
              <p>VAT (5%): {(totalPrice * 0.05).toFixed(2)} SAR</p>
              <p><strong>Total: {(totalPrice + 10 + totalPrice * 0.05).toFixed(2)} SAR</strong></p>
            </div>

            <p><strong>Total:</strong> {totalPrice.toFixed(2)} SAR</p>
            <p>Please confirm your order and proceed to payment.</p>

            <div className="invoice-box">
              <h3>Order Summary 📋</h3>
              <p>Subtotal: {totalPrice.toFixed(2)} SAR</p>
              <p>Delivery: 10.00 SAR</p>
              <p>VAT (5%): {(totalPrice * 0.05).toFixed(2)} SAR</p>
              <hr />
              <p><strong>Total: {(totalPrice + 10 + totalPrice * 0.05).toFixed(2)} SAR</strong></p>
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