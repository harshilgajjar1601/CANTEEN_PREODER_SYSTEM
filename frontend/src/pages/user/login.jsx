import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import "../../styles/user/login.css";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [msg, setMessage] = useState(() => location.state?.message || "");
  const [msgType, setMsgType] = useState(() => location.state?.type || "success");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        navigate("/menu", { replace: true });
    }
  }, [location.state, navigate]);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };


 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);
      setMessage(res.data.message);
      setMsgType("success");

      setTimeout(() => {
        navigate("/menu", { replace: true });
      }, 2000);
      
    } else {
        setMessage(res.data.message);
        setMsgType("error");
      }

  } catch {
    setMessage("Server error");
    setMsgType("error");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-eyebrow">User access</span>
        <h2 className="auth-title">Sign in to your account</h2>
        <p className="auth-subtitle">Welcome back. Check your menu, cart, and live orders from one place.</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
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

          <p className="auth-footer">
            Don't have an account?<Link to="/register">Sign-Up</Link>
          </p>
          <p className="auth-note">
            Admin login..!<Link to="/admin/adminLogin">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
