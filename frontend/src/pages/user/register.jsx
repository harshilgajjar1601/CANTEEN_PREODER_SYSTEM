import { Link } from "react-router-dom"; 
import { useState } from "react";
import "../../styles/user/register.css";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  // ✅ FIXED API CALL
  const handleRegister = async (e) => {
    e.preventDefault(); // ❗ page reload stop kare

    const data = {
      name,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (result.message) {
        setMessage(result.message);
        setMessageType(res.ok ? "success" : "error");
      }

    } catch (error) {
      console.log("Error:", error);
      setMessage("Server error");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <span className="auth-eyebrow">New user</span>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Register once and place orders faster the next time.</p>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-box">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box password-box">
            <i className="fa fa-lock"></i>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle" onClick={togglePassword}>
              <i
                className={`fa ${
                  passwordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </span>
          </div>

          {message && (
            <p className={`auth-message ${messageType}`} aria-live="polite">
              {message}
            </p>
          )}

          <button className="auth-button" type="submit">Sign Up</button>

          <p className="auth-footer">
            Already have an account?<Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
