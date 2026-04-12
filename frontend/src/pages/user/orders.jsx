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

  return (
    <div className="orders-container">
      <Sidebar toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="orders-content">
        <h2>My Orders 📦</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
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
                      <td>{order.order_id}</td>

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