import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import HTMLFlipBook from 'react-pageflip';
import './FlipMenu.css';

const coffeeItems = [
  {
    name: "Espresso",
    price: "12 SAR",
    calories: "10 kcal",
    time: "5 min",
    image: "https://images.pexels.com/photos/9623369/pexels-photo-9623369.jpeg"
  },
  {
    name: "V60 coffee",
    price: "12 SAR",
    calories: "18 kcal",
    time: "5 min",
    image: "https://images.pexels.com/photos/31986824/pexels-photo-31986824.jpeg"
  },
  {
    name: "Frappuccino",
    price: "31 SAR",
    calories: "18 kcal",
    time: "10min",
    image: "https://images.pexels.com/photos/7091582/pexels-photo-7091582.jpeg"
  },
  {
    name: "Latte",
    price: "18 SAR",
    calories: "120 kcal",
    time: "7 min",
    image: "https://images.pexels.com/photos/24613535/pexels-photo-24613535.jpeg"
  },
  {
    name: "Matcha",
    price: "24 SAR",
    calories: "150 kcal",
    time: "8 min",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
  },
];

const dessertItems = [
  {
    name: "Cheesecake",
    price: "25 SAR",
    calories: "300 kcal",
    time: "10 min",
    image: "https://images.pexels.com/photos/3791088/pexels-photo-3791088.jpeg"
  },
  {
    name: "Marble Cake",
    price: "60 SAR",
    calories: "530 kcal",
    time: "45min",
    image: "https://images.pexels.com/photos/30700682/pexels-photo-30700682.jpeg"
  },
  {
    name: "Chocolate Brownie",
    price: "49 SAR",
    calories: "420 kcal",
    time: "28 min",
    image: "https://images.pexels.com/photos/9957213/pexels-photo-9957213.jpeg"
  },
  {
    name: "French Berry Croissant",
    price: "52 SAR",
    calories: "400 kcal",
    time: "40 min",
    image: "https://images.pexels.com/photos/19296862/pexels-photo-19296862.jpeg"
  },
  {
    name: "Chocolate Cake",
    price: "22 SAR",
    calories: "350 kcal",
    time: "12 min",
    image: "https://images.pexels.com/photos/12118046/pexels-photo-12118046.jpeg"
  },
  {
    name: "Donut",
    price: "36 SAR",
    calories: "180 kcal",
    time: "19 min",
    image: "https://images.pexels.com/photos/12347692/pexels-photo-12347692.jpeg"
  },
];

function FlipMenu() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flip-wrapper">
        <video autoPlay loop muted className="background-video">
          <source src="/videos/coffee-rain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <HTMLFlipBook width={400} height={600} showCover={true} mobileScrollSupport={true}>
          {/* الغلاف */}
          <div className="page cover-page">
            <div className="page-content">
              <h2>📖 Emtnan Coffee</h2>
              <p>Flip to view our full menu</p>
              <button onClick={() => navigate('/')}>Back to Home</button>
              <button onClick={() => navigate('/cart')}>View Cart</button>
            </div>
          </div>

          {/* صفحات القهوة */}
          {coffeeItems.map((item, index) => (
            <div className="page product-page" key={`coffee-${index}`}>
              <div className="page-content">
                <img src={item.image} alt={item.name} className="product-image" />
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> {item.price}</p>
                <p><strong>Calories:</strong> {item.calories}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}

          {/* صفحة عنوان الحلويات */}
          <div className="page cover-page">
            <div className="page-content">
              <h2>🍰 Desserts</h2>
              <p>Enjoy sweet treats with your coffee</p>
            </div>
          </div>

          {/* صفحات الحلويات */}
          {dessertItems.map((item, index) => (
            <div className="page product-page" key={`dessert-${index}`}>
              <div className="page-content">
                <img src={item.image} alt={item.name} className="product-image" />
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> {item.price}</p>
                <p><strong>Calories:</strong> {item.calories}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}

          {/* صفحة النهاية */}
          <div className="page end-page">
            <div className="page-content">
              <h2>شكراً لتصفحك المنيو</h2>
              <p>نتمنى زيارتك قريبًا ☕</p>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    </PageTransition>
  );
}

export default FlipMenu;