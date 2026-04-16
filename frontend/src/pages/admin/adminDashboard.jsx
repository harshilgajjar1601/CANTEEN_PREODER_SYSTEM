import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/dashboard.css";
import "../../styles/admin/adminSidebar.css";

const orders = [
  { id: 101, customer: "John Doe", total: 350, status: "Preparing" },
  { id: 102, customer: "Ananya Shah", total: 220, status: "Pending" },
  { id: 103, customer: "Rohit Patel", total: 180, status: "Completed" },
  { id: 104, customer: "Meena Desai", total: 420, status: "Pending" },
];

export default function AdminDashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <div className="admin-container">

      <div className={`Sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-block">
          <span className="logo-mark">CP</span>
          <div>
            <h2 className="logo">Admin</h2>
            <p className="logo-subtitle">Canteen control room</p>
          </div>
        </div>

        <ul>
          <li onClick={toggleSidebar}>📊 Dashboard</li>
          <li onClick={toggleSidebar}>📦 Orders</li>
          <li onClick={toggleSidebar}>🍽 Menu</li>
          <li onClick={toggleSidebar}>👤 Users</li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </div>

      {/* 🔥 Overlay (mobile) */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* 🔥 Main Dashboard */}
      <div className="dashboard">

        <div className="topbar">
          <div className="topbar-left">
            <button className="menu-btn" onClick={toggleSidebar}>☰</button>
            <div>
              <span className="topbar-kicker">Operations</span>
              <h2>Admin Dashboard</h2>
            </div>
          </div>
          <span className="topbar-pill">Live overview</span>
        </div>

        <div className="dashboard-content">
          <section className="welcome-panel">
            <div>
              <span className="section-kicker">Overview</span>
              <h3 className="welcome">Welcome, Admin!</h3>
              <p>Track incoming work, keep the queue moving, and review active orders.</p>
            </div>
          </section>

          <div className="stats">
            <div className="card">
              <p>Total Orders</p>
              <h2>{totalOrders}</h2>
            </div>

            <div className="card" id="pending-orders">
              <p>Pending Orders</p>
              <h2>{pendingOrders}</h2>
            </div>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-info">
                  <span className="order-id">Order #{order.id}</span>
                  <p>{order.customer}</p>
                  <small>₹{order.total}</small>
                </div>

                <div className="order-actions">
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                  <button>Details</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
