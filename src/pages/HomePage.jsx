// src/pages/HomePage.jsx
import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

function HomePage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="home">

        {/* ✅ الفيديو كخلفية */}
        <video autoPlay loop muted className="background-video">
          <source src="/videos/coffee-rain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay">
          <div className="navbar">
            <div className="logo">Emtnan <span>Coffee</span></div>
            <div className="nav-buttons">
              <button onClick={() => navigate('/cart')}>🛒 Cart</button>
              <button onClick={() => navigate('/checkout')}>💳 Checkout</button>
            </div>
          </div>

          <div className="welcome">
            <h1>WELCOME</h1>
            <p>To Emtnan Coffee</p>
            <p className="slogan">Since 1990 – a legacy of taste and quality</p>
            <button onClick={() => navigate('/flip-menu')} className="login-btn">ENTER</button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default HomePage;
