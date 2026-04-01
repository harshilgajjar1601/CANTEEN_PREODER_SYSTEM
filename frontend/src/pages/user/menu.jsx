import "../../styles/user/menu.css";
import burger from "../../assets/Images/burger.webp";
import pizza from "../../assets/Images/pizza.jpeg";
import fries from "../../assets/Images/fries.jpg";
import coffee from "../../assets/Images/coffee.jpeg";
import dosa from "../../assets/Images/dosa.webp";
import paneerPizza from "../../assets/Images/paneerPizza.jpg";  

function Menu() {

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  return (
    <>
      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <div className="menuTitle">
          <h3>Menu</h3>
          <i className="fa-solid fa-x" onClick={toggleSidebar}></i>
        </div>

        <a href="#"><i className="fa fa-home"></i> Home</a>
        <a href="#"><i className="fa fa-utensils"></i> Orders</a>
        <a href="#"><i className="fa fa-shopping-cart"></i> Cart</a>
        <a href="#"><i className="fa fa-user"></i> Profile</a>
      </div>

      {/* Top Nav */}
      <div className="top-nav">
        <div className="user-profile">
          <i className="fa fa-bars" id="menu-btn"onClick={toggleSidebar}></i>
          <i className="fa-solid fa-user"></i>
          <span className="username">Harshil</span>
        </div>
        <div className="cart">
          <i className="fa fa-shopping-cart"></i>
          <span>2</span>
        </div>
      </div>

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
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={pizza} alt="Pizza" />
            <h4>Pizza</h4>
            <p>₹120</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={fries} alt="French Fries" />
            <h4>French Fries</h4>
            <p>₹90</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src={coffee} alt="Cold Coffee" />
            <h4>Cold Coffee</h4>
            <p>₹80</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={dosa} alt="Masala Dosa" />
            <h4>Masala Dosa</h4>
            <p>₹100</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src={paneerPizza} alt="Paneer Pizza" />
            <h4>Paneer Pizza</h4>
            <p>₹150</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Veg Sandwich</h4>
            <p>₹60</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Tea</h4>
            <p>₹20</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Coffee</h4>
            <p>₹30</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Chocolate Shake</h4>
            <p>₹120</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Veg Noodles</h4>
            <p>₹110</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Manchurian</h4>
            <p>₹130</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Pav Bhaji</h4>
            <p>₹120</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Samosa</h4>
            <p>₹25</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Kachori</h4>
            <p>₹30</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Ice Cream</h4>
            <p>₹100</p>
            <button>Add to Cart</button>
          </div>

          <div className="food-card drink">
            <img src="https://via.placeholder.com/150" alt="" />
            <h4>Fruit Juice</h4>
            <p>₹70</p>
            <button>Add to Cart</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Menu;