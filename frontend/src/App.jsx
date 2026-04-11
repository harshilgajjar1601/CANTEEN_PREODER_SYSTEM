import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Menu from "./pages/user/menu";
import Cart from "./pages/user/cart";
import Orders from "./pages/user/orders";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* After login */}
        <Route path="/menu" element={<Menu />} />

        {/* Cart page */}
        <Route path="/cart" element={<Cart />} />

         {/* Orders page */}
         <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;