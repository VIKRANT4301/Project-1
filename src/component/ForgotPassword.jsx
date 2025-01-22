/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import "./fp.css"
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New success message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before sending the request
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await Axios.post("https://media-provenance-e3ox.onrender.com/auth/forgotpassword", { email });
      if (response.data.status) {
        setSuccessMessage("An email has been sent with a link to reset your password.");
        // Optional: Redirect to a page that says 'Check your email'
      } else {
        setError(response.data.message); // Display error message from the backend
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

      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>} {/* Show success message */}
    </div>
  );
};

export default ForgotPassword;
