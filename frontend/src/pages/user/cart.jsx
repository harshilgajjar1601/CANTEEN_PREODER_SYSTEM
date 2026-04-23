import { useContext, useState, useEffect } from "react";
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

    useEffect(() => {
      const justLoggedIn = sessionStorage.getItem("justLoggedIn");
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
      } else if (justLoggedIn) {
        sessionStorage.removeItem("justLoggedIn");
      }
    }, [navigate]);

    useEffect(() => {
      const handlePopState = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/";
        } else {
          window.history.pushState(null, "", window.location.href);
        }
      };

      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const handlePlaceOrder = () => {
      if (cart.length === 0) {
        alert("Your cart is empty! Add items from the menu first.");
        return;
      }
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
  
  const userEmail = localStorage.getItem("email");
  if (!userEmail) {
    alert("Please login first!");
    return;
  }

  setLoading(true);
  console.log("Loading set to true");

  const orderId = generateOrderId();
  
  console.log("Sending order to server:", { orderId, userEmail, total, cartItems: cart.length });

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        items: JSON.stringify(cart),
        amount: total,
        email: userEmail
      })
    });

    const result = await response.json();
    console.log("Server response:", result);

    setLoading(false);

    if (result.success) {
      setShowPayment(false);
      setShowSuccess(true);
      clearCart();
      console.log("Order placed successfully!");
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/orders", { replace: true });
      }, 2000);
    } else {
      alert("Failed: " + (result.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    alert("Error placing order. Is server running?");
  }
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
        {showPayment && !showSuccess && (
          <div style={{
            position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)', zIndex: 9999
          }}>
            <div style={{background: 'white', padding: 24, borderRadius: 16, minWidth: 320}}>

              <h2>Payment</h2>

              {cart.map((item, index) => (
                <div key={index} style={{display:'flex', justifyContent:'space-between', margin: '8px 0'}}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <hr style={{margin: '16px 0'}} />

              <h3>Total: ₹{total}</h3>
              <div style={{display: 'flex', gap: 10, marginTop: 16}}>
                <button className="cancel-btn" onClick={() => { setShowPayment(false); }} style={{flex: 1, padding: '12px'}}>
                  Cancel
                </button>
                <button onClick={handlePayment} disabled={loading} style={{
                  flex: 1, padding: '12px', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  border: 'none', borderRadius: 10, color: 'white', fontWeight: 'bold', cursor: 'pointer'
                }}>
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔥 SUCCESS POPUP */}
        {showSuccess && (
          <div style={{
            position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)', zIndex: 9999
          }}>
            <div style={{background: 'white', padding: 32, borderRadius: 16, textAlign: 'center'}}>
              <h2 style={{color: 'green'}}>✓ Payment Successful!</h2>
              <p>Your order has been placed.</p>
              <p>Redirecting to orders...</p>
            </div>
          </div>
        )}

    </div>
  );
};

export default Cart;
