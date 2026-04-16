import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "../../styles/user/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      console.log("Email not found ❌");
      return;
    }

    fetch(`http://localhost:5000/api/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Orders Data 🔥", data);
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatOrderId = (orderId) => {
    if (!orderId) {
      return "";
    }

    if (orderId.startsWith("ORD #")) {
      return orderId;
    }

    return orderId.replace(/^ORD[-\s]*/, "ORD #");
  };

  return (
    <div className="orders-container">
      <Sidebar toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="orders-content">
        <div className="page-header">
          <div>
            <span className="section-kicker">History</span>
            <h2>My Orders 📦</h2>
            <p>Track completed and pending canteen orders in one place.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <h3>No orders found</h3>
            <p>Once you place your first order, it will appear here.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => {
                  const items = JSON.parse(order.items);

                  return (
                    <tr key={index}>
                      <td>{formatOrderId(order.order_id)}</td>

                      <td>
                        {items.map((item, i) => (
                          <div key={i}>
                            {item.name} x {item.quantity}
                          </div>
                        ))}
                      </td>

                      <td>₹{order.amount}</td>

                      <td className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
