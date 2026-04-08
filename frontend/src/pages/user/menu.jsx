import "../../styles/user/menu.css";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import burger from "../../assets/Images/burger.webp";
import pizza from "../../assets/Images/pizza.jpeg";
import fries from "../../assets/Images/fries.jpg";
import coffee from "../../assets/Images/coffee.jpeg";
import dosa from "../../assets/Images/dosa.webp";
import paneerPizza from "../../assets/Images/paneerPizza.jpg";  
import { useNavigate , Link} from "react-router-dom";
import  { jwtDecode } from "jwt-decode";
import { useState, useEffect , useContext} from "react";
import { CartContext } from "../../context/CartContext";




function Menu() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
  const token = localStorage.getItem("token");

  // console.log("MENU TOKEN:", token);

  if (!token) {
    navigate("/", { replace: true });
  }
  else {
    const decoded = jwtDecode(token);
    setUsername(decoded.name);
  }
}, [navigate]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  return (
    <>
    
      {/* Sidebar */}
     <Sidebar toggleSidebar={toggleSidebar} />
      {/* Top Nav */}
      <Navbar username={username} toggleSidebar={toggleSidebar} />

      {/* Main */}
      <div className="main">

        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button><i className="fa fa-search"></i></button>
        </div>

        {/* Categories */}
        <div className="categories">
          <div className="cat"><i className="fa fa-hamburger"></i><p>Burger</p></div>
          <div className="cat"><i className="fa fa-pizza-slice"></i><p>Pizza</p></div>
          <div className="cat"><i className="fa-solid fa-champagne-glasses"></i><p>Drinks</p></div>
          <div className="cat"><i className="fa-solid fa-bread-slice"></i><p>Sandwich</p></div>
          <div className="cat"><i className="fa-solid fa-mug-hot"></i><p>Break fast</p></div>
          <div className="cat"><i className="fa-solid fa-spoon"></i><p>Lunch</p></div>
          <div className="cat"><i className="fa-solid fa-bowl-rice"></i><p>Chinese</p></div>
        </div>

        <h3 id="title">Food Cart</h3>

        {/* Food List */}
        <div className="food-list">

          <div className="food-card">
            <img src={burger} alt="Burger" />
            <h4>Burger</h4>
            <p>₹150</p>
            <button onClick={() => addToCart({ id: 1, name: "Burger", price: 150 , image: burger })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={pizza} alt="Pizza" />
            <h4>Pizza</h4>
            <p>₹120</p>
            <button onClick={() => addToCart({ id: 2, name: "Pizza", price: 120 , image: pizza })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={fries} alt="French Fries" />
            <h4>French Fries</h4>
            <p>₹90</p>
            <button onClick={() => addToCart({ id: 3, name: "French Fries", price: 90 , image: fries })}>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src={coffee} alt="Cold Coffee" />
            <h4>Cold Coffee</h4>
            <p>₹80</p>
            <button onClick={() => addToCart({ id: 4, name: "Cold Coffee", price: 80 , image: coffee })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={dosa} alt="Masala Dosa" />
            <h4>Masala Dosa</h4>
            <p>₹100</p>
            <button onClick={() => addToCart({ id: 5, name: "Masala Dosa", price: 100 , image: dosa })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={paneerPizza} alt="Paneer Pizza" />
            <h4>Paneer Pizza</h4>
            <p>₹150</p>
            <button onClick={() => addToCart({ id: 6, name: "Paneer Pizza", price: 150 , image: paneerPizza })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Veg Sandwich" />
            <h4>Veg Sandwich</h4>
            <p>₹60</p>
            <button onClick={() => addToCart({ id: 7, name: "Veg Sandwich", price: 60 , image: vegSandwich })}>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src={"#"} alt="Tea" />
            <h4>Tea</h4>
            <p>₹20</p>
            <button onClick={() => addToCart({ id: 8, name: "Tea", price: 20 , image: tea })}>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src={"#"} alt="Coffee" />
            <h4>Coffee</h4>
            <p>₹30</p>
            <button onClick={() => addToCart({ id: 9, name: "Coffee", price: 30 , image: coffee })}>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src={"#"} alt="Chocolate Shake" />
            <h4>Chocolate Shake</h4>
            <p>₹120</p>
            <button onClick={() => addToCart({ id: 10, name: "Chocolate Shake", price: 120 , image: chocolateShake })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Veg Noodles" />
            <h4>Veg Noodles</h4>
            <p>₹110</p>
            <button onClick={() => addToCart({ id: 11, name: "Veg Noodles", price: 110 , image: vegNoodles })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Manchurian" />
            <h4>Manchurian</h4>
            <p>₹130</p>
            <button onClick={() => addToCart({ id: 12, name: "Manchurian", price: 130 , image: manchurian })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Pav Bhaji" />
            <h4>Pav Bhaji</h4>
            <p>₹120</p>
            <button onClick={() => addToCart({ id: 13, name: "Pav Bhaji", price: 120 , image: pavBhaji })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Samosa" />
            <h4>Samosa</h4>
            <p>₹25</p>
            <button onClick={() => addToCart({ id: 14, name: "Samosa", price: 25 , image: samosa })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Kachori" />
            <h4>Kachori</h4>
            <p>₹30</p>
            <button onClick={() => addToCart({ id: 15, name: "Kachori", price: 30 , image: kachori })}>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={"#"} alt="Ice Cream" />
            <h4>Ice Cream</h4>
            <p>₹100</p>
            <button onClick={() => addToCart({ id: 16, name: "Ice Cream", price: 100 , image: iceCream })}  >Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src={"#"} alt="Fruit Juice" />
            <h4>Fruit Juice</h4>
            <p>₹70</p>
            <button onClick={() => addToCart({ id: 17, name: "Fruit Juice", price: 70 , image: fruitJuice })}>Add to Cart</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Menu;