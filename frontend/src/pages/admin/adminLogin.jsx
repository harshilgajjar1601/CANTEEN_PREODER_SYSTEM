import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/user/login.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

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
        setMsgType("success");

        setTimeout(() => {
          navigate("/admin/adminDashboard", { replace: true });
        }, 1500);
      } else {
        setMsg(res.data.message);
        setMsgType("error");
      }
    } catch (err) {
      console.log(err);
      setMsg("Server error");
      setMsgType("error");
    }
  };

  return (
    <div className="auth-page">
        <div className="auth-card auth-card--admin">
            <span className="auth-eyebrow">Admin access</span>
            <h2 className="auth-title">Sign in to the dashboard</h2>
            <p className="auth-subtitle">Restricted access for canteen operators and managers.</p>

            <form onSubmit={handleLogin} className="auth-form">
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
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="fa fa-lock"></i>
                  <span className="toggle" onClick={togglePassword}>
                    <i
                      className={`fa ${
                        passwordVisible ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
              </div>

              {msg && (
                <p className={`auth-message ${msgType}`} aria-live="polite">
                  {msg}
                </p>
              )}

              <button className="auth-button" type="submit">Login</button>
            </form>

        </div>
    </div>
  );
}

export default AdminLogin;
