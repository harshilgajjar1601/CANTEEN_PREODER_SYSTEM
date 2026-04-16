import burger from "../../assets/Images/burger.webp";
import pizza from "../../assets/Images/pizza.jpeg";
import fries from "../../assets/Images/fries.jpg";
import coffee from "../../assets/Images/coffee.jpeg";
import dosa from "../../assets/Images/dosa.webp";
import paneerPizza from "../../assets/Images/paneerPizza.jpg";  
import vegSandwich from "../../assets/Images/vegSandwich.jpeg";
import tea from "../../assets/Images/tea.jpeg";
import chocolateShake from "../../assets/Images/chocolateShake.jpeg";
import vegNoodles from "../../assets/Images/vegNoodles.webp";
import manchurian from "../../assets/Images/manchurian.jpeg";
import pavBhaji from "../../assets/Images/pavBhaji.jpeg";
import samosa from "../../assets/Images/samosa.jpeg";
import kachori from "../../assets/Images/kachori.jpeg";
import iceCream from "../../assets/Images/iceCream.jpeg";
import fruitJuice from "../../assets/Images/fruitJuice.webp";

import "../../styles/user/menu.css";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import  { jwtDecode } from "jwt-decode";
import { useState, useEffect , useContext} from "react";
import { CartContext } from "../../context/CartContext";

const categories = [
  { label: "Burger", icon: "fa-hamburger" },
  { label: "Pizza", icon: "fa-pizza-slice" },
  { label: "Drinks", icon: "fa-champagne-glasses" },
  { label: "Sandwich", icon: "fa-bread-slice" },
  { label: "Breakfast", icon: "fa-mug-hot" },
  { label: "Lunch", icon: "fa-spoon" },
  { label: "Chinese", icon: "fa-bowl-rice" },
];

const foodItems = [
  { id: 1, name: "Burger", price: 90, image: burger, tag: "Classic" },
  { id: 2, name: "Pizza", price: 150, image: pizza, tag: "Chef pick" },
  { id: 3, name: "French Fries", price: 120, image: fries, tag: "Snack" },
  { id: 4, name: "Cold Coffee", price: 100, image: coffee, tag: "Drink" },
  { id: 5, name: "Masala Dosa", price: 190, image: dosa, tag: "Breakfast" },
  { id: 6, name: "Paneer Pizza", price: 350, image: paneerPizza, tag: "Premium" },
  { id: 7, name: "Veg Sandwich", price: 60, image: vegSandwich, tag: "Light" },
  { id: 8, name: "Tea", price: 20, image: tea, tag: "Hot" },
  { id: 9, name: "Coffee", price: 40, image: coffee, tag: "Hot" },
  { id: 10, name: "Chocolate Shake", price: 90, image: chocolateShake, tag: "Drink" },
  { id: 11, name: "Veg Noodles", price: 210, image: vegNoodles, tag: "Chinese" },
  { id: 12, name: "Manchurian", price: 100, image: manchurian, tag: "Chinese" },
  { id: 13, name: "Pav Bhaji", price: 120, image: pavBhaji, tag: "Street food" },
  { id: 14, name: "Samosa", price: 25, image: samosa, tag: "Snack" },
  { id: 15, name: "Kachori", price: 30, image: kachori, tag: "Snack" },
  { id: 16, name: "Ice Cream", price: 100, image: iceCream, tag: "Dessert" },
  { id: 17, name: "Fruit Juice", price: 70, image: fruitJuice, tag: "Fresh" },
];



function Menu() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [username] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return "";
    }

    try {
      const decoded = jwtDecode(token);
      return decoded.name || "";
    } catch {
      return "";
    }
  });
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/", { replace: true });
  }
}, [navigate]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  return (
    <>
      <Sidebar toggleSidebar={toggleSidebar} />
      <Navbar username={username} toggleSidebar={toggleSidebar} />

      <div className="main menu-page">
        <section className="menu-hero">
          <div>
            <span className="section-kicker">Campus canteen</span>
            <h1>Fresh food, fast ordering.</h1>
            <p>
              Browse the menu, add items in a tap, and move straight to checkout.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{foodItems.length}</strong>
              <span>Items</span>
            </div>
            <div>
              <strong>{categories.length}</strong>
              <span>Categories</span>
            </div>
          </div>
        </section>

        <div className="search-box">
          <input type="text" placeholder="Search your favorite meal" />
          <button aria-label="Search">
            <i className="fa fa-search"></i>
          </button>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <button className="cat" key={category.label} type="button">
              <i className={`fa ${category.icon}`}></i>
              <p>{category.label}</p>
            </button>
          ))}
        </div>

        <div className="section-head">
          <h3 id="title">Popular picks</h3>
          <p>Simple, quick, and built for repeat orders.</p>
        </div>

        <div className="food-list">
          {foodItems.map((item) => (
            <article className="food-card" key={item.id}>
              <div className="food-card__media">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="food-card__body">
                <span className="food-tag">{item.tag}</span>
                <h4>{item.name}</h4>
                <p className="food-price">₹{item.price}</p>
                <button
                  className="food-card__button"
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
