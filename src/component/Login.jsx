/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set Axios base URL dynamically (global or local)
  // eslint-disable-next-line no-undef
  const backendURL = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, '') || "http://localhost:3004";
  console.log("Using backend URL:", backendURL);

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(`${backendURL}/auth/login`, { email, password });

      if (response.data.status) {
        const { userName, token } = response.data;

        // Store token and username in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", userName);

        // Navigate to home page with user data
        navigate("/home", { state: { userName } });
      } else {
        setError(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again later.");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>Media Integrity and Provenance</h2>

          <span>Do not have an account?</span>
          <Link to="/">
            <button>Sign Up</button>
          </Link>
        </div>
        <div className="right">
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
      </div>
    </div>
  );
};

export default Login;
