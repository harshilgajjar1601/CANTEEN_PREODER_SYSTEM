import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Sidebar from "../../components/sidebar";
import "../../styles/user/cart.css";
import Navbar from "../../components/navbar";

function Cart() {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity,0);

    const toggleSidebar = () => {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    };


  return (
    <div className="cart-container">
      <Sidebar toggleSidebar={toggleSidebar} /> 
      <Navbar toggleSidebar={toggleSidebar} />
        <div className="cart-content">
      
          <h2>My Cart 🛒</h2>
          
            {cart.length === 0 ? (
              <p>Your cart is empty..!</p>
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
              <button className="order-btn">Place Order</button>
            </div>
          </>
        )}
        </div>
    </div>
  );
};

export default Cart;