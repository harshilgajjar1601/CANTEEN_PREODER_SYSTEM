import { useState } from "react";
import "../../styles/user/login.css"; 

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // page reload stop
    console.log("Email:", email);
    console.log("Password:", password);
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
                  passwordVisible ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          <button type="submit">Login</button>

          <p className="bottom-text">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;