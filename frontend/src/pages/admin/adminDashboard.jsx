import { useState } from "react";
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <div className="admin-container">

      {/* 🔥 Sidebar */}
      <div className={`Sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">Admin</h2>

        <ul>
          <li onClick={toggleSidebar}>📊 Dashboard</li>
          <li onClick={toggleSidebar}>📦 Orders</li>
          <li onClick={toggleSidebar}>🍽 Menu</li>
          <li onClick={toggleSidebar}>👤 Users</li>
          <li onClick={toggleSidebar}>🚪 Logout</li>
        </ul>
      </div>

      {/* 🔥 Overlay (mobile) */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* 🔥 Main Dashboard */}
      <div className="dashboard">

        {/* 🔥 Topbar */}
        <div className="topbar">
          <button className="menu-btn" onClick={toggleSidebar}>☰</button>
          <h2>Admin Dashboard</h2>
        </div>

        <div className="dashboard-content">

      
          <h3 className="welcome">Welcome, Admin!</h3>

          <hr />

          {/* Stats */}
          <div className="stats">
            <div className="card" >
              <p>Total Orders</p>
              <h2>{totalOrders}</h2>
            </div>

            <div className="card" id="pending-orders">
              <p>Pending Orders</p>
              <h2>{pendingOrders}</h2>
            </div>
          </div>

          {/* Orders */}
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-info">
                  <b>Order #{order.id}</b> — {order.customer} — ₹{order.total}
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