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

  // Define the API URL based on environment or default to localhost
  const apiUrl =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
      ? "https://project-1-sage-phi.vercel.app"
      : "http://localhost:3004";

  console.log("API URL:", apiUrl); // Log the API URL for debugging

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await Axios.post(`${apiUrl}/auth/signup`, {
        username,
        email,
        password,
      });

      if (response.data.status) {
        navigate("/login"); // Redirect to login after successful signup
      } else {
        setError(response.data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Error during signup. Please try again later.");
      console.error("Signup failed:", err);
    }
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
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
