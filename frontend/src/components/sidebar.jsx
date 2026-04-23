import { useNavigate } from "react-router-dom";
import "../styles/user/sidebar.css";
function Sidebar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/", { replace: true });
  };

  const handleNavigate = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <div className="sidebar" id="sidebar">
      <div className="menuTitle">
        <h3>Menu</h3>
        <i className="fa-solid fa-x" onClick={toggleSidebar}></i>
      </div>

      <div onClick={() => handleNavigate("/menu")}>
        <i className="fa fa-home"></i> Home
      </div>

      <div onClick={() => handleNavigate("/cart")}>
        <i className="fa fa-shopping-cart"></i> Cart
      </div>

      <div onClick={() => handleNavigate("/orders")}>
        <i className="fa fa-utensils"></i> Orders
      </div>

      <div onClick={handleLogout}>
        <i className="fa fa-sign-out"></i> Logout
      </div>
    </div>
  );
}

export default Sidebar;