import { Link, useNavigate } from "react-router-dom";
import "../styles/user/sidebar.css";
function Sidebar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  

  return (
    <div className="sidebar" id="sidebar">
      <div className="menuTitle">
        <h3>Menu</h3>
        <i className="fa-solid fa-x" onClick={toggleSidebar}></i>
      </div>

      <Link to="/menu">
        <i className="fa fa-home"></i> Home
      </Link>

      <Link to="/cart">
        <i className="fa fa-shopping-cart"></i> Cart
      </Link>

      <Link to="/orders">
        <i className="fa fa-utensils"></i> Orders
      </Link>
      <Link to="/profile">
        <i className="fa fa-user"></i> Profile
      </Link>

      <a href="#" onClick={handleLogout}>
        <i className="fa fa-sign-out"></i> Logout
      </a>
    </div>
  );
}

export default Sidebar;