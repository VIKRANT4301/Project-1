/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add an error state
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          const userName = response.data.userName || "User";
          navigate("/home", { state: { userName } });
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again later.");
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

        {/* Show error message if there is an error */}
        {error && <div className="error-message">{error}</div>}

        <div className="login-links">
          <Link to="/forgotPassword" className="forgot-password">
            Forgot Password?
          </Link>
          <p>
            Do not have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
