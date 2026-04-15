import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/user/login.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password
      });

      if (res.data.success) {
        localStorage.setItem("admin", true); // 🔥 admin flag

        setMsg(res.data.message);
        setColor("green");

        setTimeout(() => {
          navigate("/admin/adminDashboard", { replace: true });
        }, 1500);
      } else {
        setMsg(res.data.message);
        setColor("red");
      }
    } catch (err) {
      console.log(err);
      setMsg("Server error");
      setColor("red");
    }
  };

  return (
    <div className="container">
        <div className="login-card">

            <h2>ADMIN-LOGIN 🔐</h2>
            <p className="subtitle">Only for admin access</p>

            <form onSubmit={handleLogin}>

            <div className="input-box">
                <input
                type="email"
                placeholder="Admin Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fa fa-envelope"></i>
            </div>

            <div className="input-box password-box">
                <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fa fa-lock"></i>
            </div>

            <button type="submit">Login</button>
            </form>

            {msg && (   
            <p style={{ color, marginTop: "10px", fontWeight: "bold" }}>
                {msg}
            </p>
            )}

        </div>
    </div>
  );
}

export default AdminLogin;