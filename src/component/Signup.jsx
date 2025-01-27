/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate();

  // Use the environment variable to dynamically determine the API URL
  // eslint-disable-next-line no-undef
  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3004"; // Default to localhost if not set
  console.log("API URL:", apiUrl); // Log the API URL for debugging

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    Axios.post(`${apiUrl}/auth/signup`, {
      username,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login"); // Redirect to login after successful signup
        } else {
          setError(response.data.message || "An error occurred. Please try again.");
        }
      })
      .catch((err) => {
        setError("Error during signup. Please try again later.");
        console.error("Signup failed:", err);
      });
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2>Media Integrity and Provenance</h2>
          <p>
            Media Integrity and Provenance refers to the process of ensuring the authenticity, origin, and history of digital media, such as images, videos, and documents, using technologies like blockchain. It aims to protect media from tampering and provide verifiable proof of its source and alterations.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h2>Sign Up</h2>
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="error-message">{error}</div>} {/* Display error message if any */}

            <button type="submit">Sign Up</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;