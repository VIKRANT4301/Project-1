/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import "./fp.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  // Use environment variable or default to localhost for development
  // eslint-disable-next-line no-undef
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before sending the request
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await Axios.post(`${backendURL}/auth/forgotpassword`, { email });

      if (response.data.status) {
        setSuccessMessage("An email has been sent with a link to reset your password.");
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error during password reset request:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>} 
    </div>
  );
};

export default ForgotPassword;
