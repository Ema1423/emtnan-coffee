// src/pages/MenuPage.jsx
import React from 'react';
import './MenuPage.css';

function MenuPage() {
  const items = [
    { name: "Espresso", price: "12 SAR", calories: "10 kcal", time: "5 min" },
    { name: "Latte", price: "18 SAR", calories: "120 kcal", time: "7 min" },
    { name: "Cappuccino", price: "17 SAR", calories: "110 kcal", time: "6 min" },
  ];

  return (
    <div className="menu-container">
      <div className="menu-title">Menu</div>
      <div className="menu-items">
        {items.map((item, index) => (
          <div className="menu-card" key={index}>
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <p>Calories: {item.calories}</p>
            <p>Delivery: {item.time}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
