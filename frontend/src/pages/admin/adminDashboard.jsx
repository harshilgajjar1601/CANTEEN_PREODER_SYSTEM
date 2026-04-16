import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/dashboard.css";
import "../../styles/admin/adminSidebar.css";

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

const parseItems = (items) => {
  try {
    return typeof items === "string" ? JSON.parse(items) : items || [];
  } catch {
    return [];
  }
};

export default function AdminDashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const navigate = useNavigate();

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "All" || normalizeStatus(order.status) === statusFilter;
    const matchesOrderId = orderIdSearch === "" || 
      (order.order_id && order.order_id.toLowerCase().includes(orderIdSearch.toLowerCase()));
    return matchesStatus && matchesOrderId;
  });

  const calculateRevenue = useCallback(() => {
    const today = new Date().toDateString();
    
    const todayData = orders.filter(order => 
      new Date(order.created_at).toDateString() === today
    );
    
    const todayTotal = todayData.reduce((sum, order) => 
      sum + (parseFloat(order.amount) || 0), 0
    );
    
    const total = orders.reduce((sum, order) => 
      sum + (parseFloat(order.amount) || 0), 0
    );
    
    setTodayRevenue(todayTotal);
    setTotalRevenue(total);
    setTodayOrders(todayData.length);
  }, [orders]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Admin orders fetch error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 15000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  useEffect(() => {
    calculateRevenue();
  }, [orders, calculateRevenue]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        console.log("Status update failed:", data.message);
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.log("Status update error:", error);
    }
  };

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
          <li onClick={() => { toggleSidebar(); navigate("/admin/menu"); }}>🍽️ Menu</li>
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

          <section className="revenue-overview">
            <h3>💰 Revenue Overview</h3>
            
            <div className="revenue-cards">
              <div className="revenue-card today">
                <div className="revenue-icon">📅</div>
                <div className="revenue-info">
                  <span className="revenue-label">Today's Revenue</span>
                  <span className="revenue-amount">
                    ₹{todayRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="revenue-count">{todayOrders} orders</span>
                </div>
              </div>
              
              <div className="revenue-card total">
                <div className="revenue-icon">💎</div>
                <div className="revenue-info">
                  <span className="revenue-label">Total Revenue</span>
                  <span className="revenue-amount">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="revenue-count">{orders.length} orders</span>
                </div>
              </div>
            </div>
          </section>

          <div className="filter-controls">
            <div className="search-filter">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Search by Order ID..."
                value={orderIdSearch}
                onChange={(e) => setOrderIdSearch(e.target.value)}
              />
              {orderIdSearch && (
                <button onClick={() => setOrderIdSearch("")}>
                  <i className="fa fa-times"></i>
                </button>
              )}
            </div>

            <div className="status-filter">
              <span className="filter-label">Status:</span>
              <div className="status-buttons">
                <button
                  className={`status-btn ${statusFilter === "All" ? "active" : ""}`}
                  onClick={() => setStatusFilter("All")}
                >
                  All
                </button>
                <button
                  className={`status-btn ${statusFilter === "Pending" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Pending")}
                >
                  Pending
                </button>
                <button
                  className={`status-btn ${statusFilter === "Preparing" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Preparing")}
                >
                  Preparing
                </button>
                <button
                  className={`status-btn ${statusFilter === "Ready" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Ready")}
                >
                  Ready
                </button>
                <button
                  className={`status-btn ${statusFilter === "Picked Up" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Picked Up")}
                >
                  Picked Up
                </button>
              </div>
            </div>

            <div className="filter-info">
              <span className="results-counter">
                Showing {filteredOrders.length} of {orders.length} orders
              </span>
              {(statusFilter !== "All" || orderIdSearch !== "") && (
                <button 
                  className="clear-filters-btn"
                  onClick={() => {
                    setStatusFilter("All");
                    setOrderIdSearch("");
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="stats">
            <div className="card">
              <p>Total Orders</p>
              <h2>{orders.length}</h2>
            </div>

            <div className="card" id="pending-orders">
              <p>Pending Orders</p>
              <h2>{orders.filter((order) => normalizeStatus(order.status) === "Pending").length}</h2>
            </div>
          </div>

          <div className="orders-list">
            {loading && <p className="empty-orders">Loading orders...</p>}
            {!loading && orders.length === 0 && (
              <div className="empty-state">
                <h3>No orders yet</h3>
                <p>New customer orders will appear here as soon as they are placed.</p>
              </div>
            )}
            {!loading && orders.length > 0 && filteredOrders.length === 0 && (
              <div className="empty-state">
                <h3>No orders match your filters</h3>
                <p>Try adjusting your search or status filter.</p>
                <button 
                  className="clear-filters-inline"
                  onClick={() => {
                    setStatusFilter("All");
                    setOrderIdSearch("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {filteredOrders.map((order) => {
              const items = parseItems(order.items);
              const status = normalizeStatus(order.status);

              return (
                <div className="order-card" key={order.id}>
                  <div className="order-info">
                    <span className="order-id">{formatOrderId(order.order_id)}</span>
                    <p>{order.customer_name || order.email}</p>
                    <small>
                      {items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}
                    </small>
                    <strong>₹{order.amount}</strong>
                  </div>

                  <div className="order-actions">
                    <span className={`status ${statusClass(status)}`}>
                      {status}
                    </span>
                    <select
                      className="status-select"
                      value={status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
