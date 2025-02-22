// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./reset.css";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Set the backend URL dynamically based on environment
  // eslint-disable-next-line no-undef
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3004"; // Default to localhost if not set

  useEffect(() => {
    if (token) {
      Axios.post(`${backendURL}/auth/verify-token`, { token })
        .then((response) => {
          if (!response.data.status) {
            setError("Invalid or expired token.");
            navigate("/forgotpassword"); // Redirect to forgot password if token is invalid
          }
        })
        .catch((err) => {
          setError("Error verifying token.");
          navigate("/forgotpassword"); // Redirect to forgot password if error occurs
          console.error("Error during token verification:", err);
        });
    } else {
      setError("No token provided.");
      navigate("/forgotpassword");
    }
  }, [token, navigate, backendURL]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    Axios.post(`${backendURL}/auth/resetpassword`, { token, newPassword })
      .then((response) => {
        if (response.data.status) {
          setSuccess(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect to login page after 2 seconds
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.error("Error during password reset:", err);
      });
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
