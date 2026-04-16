import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "../../styles/user/cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    // 🔥 NEW STATES
    const [showPayment, setShowPayment] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();

    const handlePlaceOrder = () => {
      setShowPayment(true);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity,0);

    const toggleSidebar = () => {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    };

    // 🔥 ORDER ID + PAYMENT LOGIC
    const generateOrderId = () => {
      return "ORD #" + Math.floor(1000 + Math.random() * 9000);
    };

    const handlePayment = async () => {
  setLoading(true);

  setTimeout(async () => {
    setShowPayment(false);
    setShowSuccess(true);

    const orderId = generateOrderId();
    const email = localStorage.getItem("email"); // 🔥 IMPORTANT

    try {
      await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          order_id: orderId,
          items: JSON.stringify(cart), // 👈 stringify
          amount: total,
          status: "Pending",
          email: email
        })
      });

      console.log("Order Saved ✅");

      clearCart(); // Clear cart after order is placed

    } catch (err) {
      console.log("Order Save Error ❌", err);
    }

    
    setLoading(false);
    
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/orders", { replace: true });
    }, 2000);

  }, 1500);
};

  return (
    <div className="cart-container">
      <Sidebar toggleSidebar={toggleSidebar} /> 
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="cart-content">
        <div className="page-header">
          <div>
            <span className="section-kicker">Checkout</span>
            <h2>My Cart 🛒</h2>
            <p>Review quantities and confirm the final amount before payment.</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Add a few items from the menu to start your order.</p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="quantity">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>

                  <div className="price">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h3>Total: ₹{total}</h3>
              <button className="order-btn" onClick={handlePlaceOrder}>
                Place order
              </button>
            </div>
          </>
        )}
        </div>

        {/* 🔥 PAYMENT MODAL */}
        {showPayment && (
          <div className="overlay">
            <div className="modal">

              <h2>Payment</h2>

              {cart.map((item, index) => (
                <div key={index} className="payment-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <hr />

              <h3>Total: ₹{total}</h3>
              <div className="paymentBtns">
                <button className="pay-btn" onClick={handlePayment} disabled={loading}>
                  {loading ? <div className="loader"></div> : "Make Payment"}
                </button>
                <button className="cancel-btn" onClick={() => setShowPayment(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔥 SUCCESS POPUP */}
        {showSuccess && (
          <div className="overlay">
            <div className="modal success-modal">
              <h2>✅ Payment Successful</h2>
            </div>
          </div>
        )}

    </div>
  );
};

export default Cart;
