import PageTransition from '../components/PageTransition';
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    const priceNumber = parseFloat(item.price);
    return total + (isNaN(priceNumber) ? 0 : priceNumber * item.quantity);
  }, 0);

  return (
    <PageTransition> {/* ✅ تغليف كامل الصفحة */}
      <div className="cart-page">
        <h1>Your Cart 🛒</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-image" />
                  <div className="cart-details">
                    <strong>{item.name}</strong><br />
                    {item.price} × {item.quantity} = {(parseFloat(item.price) * item.quantity).toFixed(2)} SAR
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(index)}>❌</button>
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> {totalPrice.toFixed(2)} SAR</p>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </>
        )}
      </div>
    </PageTransition>
  );
}

export default CartPage;
