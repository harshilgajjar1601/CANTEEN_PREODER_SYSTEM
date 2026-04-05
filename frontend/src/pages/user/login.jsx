import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import "../../styles/user/login.css";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [msg, setMessage] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
      const token = localStorage.getItem("token");

    if (token) {
        navigate("/menu", { replace: true });
    }
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setType(location.state.type);
    }
  }, [location.state]);

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
      setMessage(res.data.message);
      setColor("green");

      setTimeout(() => {
        navigate("./menu", { replace: true });
      }, 2000);
      
    } else {
        setMessage(res.data.message);
        setColor("red");
      }

  } catch (err) {
    setMessage("Server error");
    setColor("red");
  }
};

  return (
    <div className="container">
      <div className="login-card">
        <h2>USER-LOGIN</h2>
        <p className="subtitle">Welcome User 👋</p>

        <form onSubmit={handleLogin}>
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

          {/* 🔥 MESSAGE UI */}
          {msg && (
            <p
              style={{
                color: type === "success" ? "green" : "red",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              {msg}
            </p>
          )}

          <button type="submit"> Login</button>

          <p className="bottom-text">
            Don't have an account?<Link to="/register">Sign-Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;