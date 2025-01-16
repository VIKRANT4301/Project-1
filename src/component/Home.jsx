/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "Guest";

  // Navigate to a specific page
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <main className="homepage">
      <header>
        <h1>Hello, {userName}! Welcome to the Home Page</h1>
      </header>

      <section className="intro-section">
        <h2>Real Image Identifier</h2>
        <p>Empowering trust with Blockchain Technology</p>
      </section>

      <section className="list-section">
        <h3>Categories</h3>
        <ul className="category-list">
          <li onClick={() => handleNavigation("/professional")}>Professional</li>
          <li onClick={() => handleNavigation("/personal")}>Personal</li>
          <li onClick={() => handleNavigation("/college")}>College</li>
          <li onClick={() => handleNavigation("/social")}>Social</li>
          <li onClick={() => handleNavigation("/community")}>Community</li>
        </ul>
      </section>
    </main>
  );
}

export default Home;
