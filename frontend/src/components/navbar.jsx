import { useNavigate } from "react-router-dom";
import "../styles/user/navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ username, toggleSidebar }) {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);
  const displayName = username || "Guest";

  return (
    <div className="top-nav">
      <div className="user-profile">
        <i
          className="fa fa-bars"
          id="menu-btn"
          onClick={toggleSidebar}
        ></i>

        <i className="fa-solid fa-user"></i>
        <span className="username">Welcome, {displayName}</span>
      </div>

      <div className="cart" onClick={() => navigate("/cart", { replace: true })}>
        <i className="fa fa-shopping-cart"></i>
        <span>{totalItems}</span>
      </div>
    </div>
  );
}

export default Navbar;
