import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Menu from "./pages/user/menu";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;