/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "Guest";
  const [showCategories, setShowCategories] = useState(false);

  // Navigate to a specific page
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <main className="homepage">
      {/* Top Bar with User ID */}
      <header className="top-bar">
        <div className="user-id">
          <span>Welcome, {userName}!</span>
        </div>
        <nav className="top-nav">
          <button onClick={() => handleNavigation("/profile")}>Profile</button>
          <button onClick={() => handleNavigation("/settings")}>Settings</button>
          <button onClick={() => handleNavigation("/logout")}>Logout</button>

          {/* Category Dropdown */}
          <div
            className="category-dropdown"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="dropdown-btn">Categories</button>
            {showCategories && (
              <ul className="dropdown-menu">
                <li onClick={() => handleNavigation("/professional")}>
                  Professional
                </li>
                <li onClick={() => handleNavigation("/personal")}>Personal</li>
                <li onClick={() => handleNavigation("/college")}>College</li>
                <li onClick={() => handleNavigation("/social")}>Social</li>
                <li onClick={() => handleNavigation("/community")}>
                  Community
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>

      {/* Intro Section */}
      <section className="intro-section">
        <h2>Real Image Identifier</h2>
        <p>Empowering trust with Blockchain Technology</p>
      </section>

      {/* Categories Section */}
      <section className="list-section">
        <h3>Explore Categories</h3>
        <ul className="category-list">
          <li onClick={() => handleNavigation("/professional")}>Professional</li>
          <li onClick={() => handleNavigation("/personal")}>Personal</li>
          <li onClick={() => handleNavigation("/college")}>College</li>
          <li onClick={() => handleNavigation("/social")}>Social</li>
          <li onClick={() => handleNavigation("/community")}>Community</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Real Image Identifier. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default Home;
