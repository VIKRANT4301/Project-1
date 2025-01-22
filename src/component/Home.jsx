/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import Share from "./share/Share";

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch API URL from environment variable
  // eslint-disable-next-line no-undef
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  // Fetch user data from localStorage or redirect to login if missing
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/login'); // Redirect to login if username is missing
    } else {
      setUserName(storedUsername);
    }
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);

    // Example of using backendURL for a fetch request
    try {
      const response = await fetch(`${backendURL}/search?query=${searchQuery}`);
      const data = await response.json();
      console.log("Search Results:", data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <main className="homepage">
      {/* Sidebar */}
      <aside className="navbar">
        <h1 className="navbar-title">Menu</h1>
        <ul className="navbar-menu">
          <li onClick={() => handleNavigation("/")}>Home</li>
          <li onClick={() => handleNavigation("/about")}>About</li>
          <li onClick={() => handleNavigation("/contact")}>Contact</li>
          <li onClick={() => handleNavigation("/services")}>Services</li>
        </ul>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search"
          />
          <button type="submit" aria-label="Submit Search">
            🔍
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <header className="top-bar">
          <div className="user-id">
            <span>Welcome, {userName}!</span>
          </div>
          <nav className="top-nav">
            <button onClick={() => handleNavigation("/profile")}>Profile</button>
            <button onClick={() => handleNavigation("/settings")}>Settings</button>
            <button onClick={() => handleNavigation("/logout")}>Logout</button>
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

        {/* Share Component */}
        <div className="home">
          <Share />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Real Image Identifier. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default Home;
