import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import HTMLFlipBook from 'react-pageflip';
import './FlipMenu.css';

const coffeeItems = [
  {
    id: 1,
    name: "Espresso",
    price: 12,
    calories: 10,
    prep_time: "5 min",
    image: "https://images.pexels.com/photos/9623369/pexels-photo-9623369.jpeg"
  },
  {
    id: 2,
    name: "V60 coffee",
    price: 12,
    calories: 18,
    prep_time: "5 min",
    image: "https://images.pexels.com/photos/31986824/pexels-photo-31986824.jpeg"
  },
  {
    id: 3,
    name: "Frappuccino",
    price: 31,
    calories: 18,
    prep_time: "10 min",
    image: "https://images.pexels.com/photos/7091582/pexels-photo-7091582.jpeg"
  },
  {
    id: 4,
    name: "Latte",
    price: 18,
    calories: 120,
    prep_time: "7 min",
    image: "https://images.pexels.com/photos/24613535/pexels-photo-24613535.jpeg"
  },
  {
    id: 5,
    name: "Matcha",
    price: 24,
    calories: 150,
    prep_time: "8 min",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
  },
];

const dessertItems = [
  {
    id: 50,
    name: "Cheesecake",
    price: 25,
    calories: 300,
    prep_time: "10 min",
    image: "https://images.pexels.com/photos/3791088/pexels-photo-3791088.jpeg"
  },
  {
    id: 53,
    name: "Marble Cake",
    price: 60,
    calories: 530,
    prep_time: "45 min",
    image: "https://images.pexels.com/photos/30700682/pexels-photo-30700682.jpeg"
  },
  {
    id: 60,
    name: "Chocolate Brownie",
    price: 49,
    calories: 420,
    prep_time: "28 min",
    image: "https://images.pexels.com/photos/9957213/pexels-photo-9957213.jpeg"
  },
  {id: 66,
    name: "French Berry Croissant",
    price: 52,
    calories: 400,
    prep_time: "40 min",
    image: "https://images.pexels.com/photos/19296862/pexels-photo-19296862.jpeg"
  },
  {
   id: 70,
    name: "Chocolate Cake",
    price: 22,
    calories: 350,
    prep_time: "12 min",
    image: "https://images.pexels.com/photos/12118046/pexels-photo-12118046.jpeg"
  },
  {
    id: 75,
    name: "Donut",
    price: 36,
    calories: 180,
    prep_time: "19 min",
    image: "https://images.pexels.com/photos/12347692/pexels-photo-12347692.jpeg"
  },
];

function FlipMenu() {
  const navigate = useNavigate();

  const addToCart = (item) => {
    fetch("http://127.0.0.1:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ تم الإضافة إلى السلة:", data);
        alert("✅ تمت الإضافة إلى السلة!");
      })
      .catch((error) => {
        console.error("❌ فشل الإضافة إلى السلة:", error);
        alert("❌ فشل في الإرسال إلى السيرفر");
      });
  };

  return (
    <PageTransition>
      <div className="flip-wrapper">
        <video autoPlay loop muted className="background-video">
          <source src="/videos/coff.mp4" type="video/mp4" />
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

          {/* القهوة */}
          {coffeeItems.map((item, index) => (
            <div className="page product-page" key={`coffee-${index}`}>
              <div className="page-content">
                <img src={item.image} alt={item.name} className="product-image" />
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> {item.price} ريال</p>
                <p><strong>Calories:</strong> {item.calories} kcal</p>
                <p><strong>Time:</strong> {item.prep_time}</p>
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

          {/* الحلويات */}
          {dessertItems.map((item, index) => (
            <div className="page product-page" key={`dessert-${index}`}>
              <div className="page-content">
                <img src={item.image} alt={item.name} className="product-image" />
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> {item.price} ريال</p>
                <p><strong>Calories:</strong> {item.calories} kcal</p>
                <p><strong>Time:</strong> {item.prep_time}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}

          {/* نهاية */}
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
