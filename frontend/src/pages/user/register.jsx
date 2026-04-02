import { Link } from "react-router-dom"; 
import { useState } from "react";
import "../../styles/user/register.css";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        alert(result.message);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="register-card">
        <h2>CREATE ACCOUNT</h2>
        <p className="subtitle">Welcome User 👋</p>

        <form onSubmit={handleRegister}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle" onClick={togglePassword}>
              <i
                className={`fa ${
                  passwordVisible ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          <button type="submit">Sign Up</button>

          <p className="bottom-text">
            Already have an account?<Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;