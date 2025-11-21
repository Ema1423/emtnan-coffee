import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import FlipMenu from './pages/FlipMenu';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/flip-menu" element={<FlipMenu />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <ToastContainer position="top-center" autoClose={2000} />
        <AnimatedRoutes />
      </CartProvider>
    </Router>
  );
}

export default App;