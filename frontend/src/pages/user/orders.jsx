import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "../../styles/user/orders.css";
import { Link } from "react-router-dom";

const STATUS_OPTIONS = ["Pending", "Preparing", "Ready", "Picked Up"];

const formatOrderId = (orderId) => {
  if (!orderId) {
    return "";
  }

  if (orderId.startsWith("ORD #")) {
    return orderId;
  }

  return orderId.replace(/^ORD[-\s]*/, "ORD #");
};

const normalizeStatus = (status) => {
  if (!status) {
    return "Pending";
  }

  return STATUS_OPTIONS.includes(status) ? status : "Pending";
};

const statusClass = (status) =>
  normalizeStatus(status).toLowerCase().replace(/\s+/g, "-");

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  const fetchOrders = useCallback(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      console.log("Email not found ❌");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const activeOrders = orders.filter(
    (order) => normalizeStatus(order.status) !== "Picked Up"
  );
  const completedOrders = orders.filter(
    (order) => normalizeStatus(order.status) === "Picked Up"
  );

  const displayOrders = activeTab === "active" ? activeOrders : completedOrders;

  return (
    <div className="orders-container">
      <Sidebar toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="orders-content">
        <div className="page-header">
          <div>
            <span className="section-kicker">Track</span>
            <h2>My Orders 📦</h2>
            <p>View your active and past orders</p>
          </div>
          <Link to="/menu" className="order-now-btn">
            Order Now
          </Link>
        </div>

        <div className="orders-tabs">
          <button
            className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active Orders
            {activeOrders.length > 0 && (
              <span className="tab-badge">{activeOrders.length}</span>
            )}
          </button>
          <button
            className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Order History
            {completedOrders.length > 0 && (
              <span className="tab-badge completed">{completedOrders.length}</span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : displayOrders.length === 0 ? (
          <div className="empty-state">
            <h3>
              {activeTab === "active"
                ? "No active orders"
                : "No order history yet"}
            </h3>
            <p>
              {activeTab === "active"
                ? "Place your first order to see it here"
                : "Your completed orders will appear here"}
            </p>
            {activeTab === "active" && (
              <Link to="/menu" className="browse-menu-btn">
                Browse Menu
              </Link>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {displayOrders.map((order, index) => {
              const items = Array.isArray(order.items)
                ? order.items
                : JSON.parse(order.items || "[]");
              const status = normalizeStatus(order.status);
              const orderDate = new Date(order.created_at);
              const dateStr = orderDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div className="order-card" key={index}>
                  <div className="order-header">
                    <span className="order-id">
                      {formatOrderId(order.order_id)}
                    </span>
                    <span className={`status ${statusClass(status)}`}>
                      {status}
                    </span>
                  </div>
                  <div className="order-date">{dateStr}</div>
                  <div className="order-items">
                    {items.map((item, i) => (
                      <span key={i} className="item-tag">
                        {item.name} x{item.quantity}
                      </span>
                    ))}
                  </div>
                  <div className="order-footer">
                    <span className="order-amount">₹{order.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
