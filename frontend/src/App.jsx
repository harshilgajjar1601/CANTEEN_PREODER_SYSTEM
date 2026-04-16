import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Menu from "./pages/user/menu";
import Cart from "./pages/user/cart";
import Orders from "./pages/user/orders";
import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/adminDashboard";



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

          {/* Admin routes */}
         <Route path="/admin/adminLogin" element={<AdminLogin />} />

          {/* Admin dashboard */}
         <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;