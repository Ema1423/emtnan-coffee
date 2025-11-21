import { useEffect, useState } from "react";

function FlipMenu() {
  const [products, setProducts] = useState([]);

 useEffect(() => {
  fetch("https://emtnan-coffee.onrender.com/products")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error fetching products:", error));
}, []);

const addToCart = (item) => {
  fetch("https://emtnan-coffee.onrender.com/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item, quantity: 1 }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("✅ تمت الإضافة للسلة");
      console.log(data);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
      alert("حدث خطأ أثناء الإضافة");
    });
};
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((item, index) => (
        <div key={index} className="border rounded-xl m-4 p-4 w-60 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          <p>السعر: {item.price} ريال</p>
          <p>السعرات: {item.calories} cal</p>
          <p>التحضير: {item.prep_time}</p>
          <button
            className="mt-3 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => addToCart(item)}
          >
            أضف إلى السلة
          </button>
        </div>
      ))}
    </div>
  );
}

export default FlipMenu;