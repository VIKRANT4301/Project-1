/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Community = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate image preview URL
    }
  };

  // Handle form submission (you can send the image to the server here)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedImage) {
      // Implement your image upload logic here (e.g., send the file to a server)
      alert("Image uploaded successfully!");
      // Reset the preview and selected image
      setSelectedImage(null);
      setPreviewUrl("");
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div className="community-container">
      <h1>Community Page</h1>
      <p>Welcome to the Community Page! Here, we bring people together to share knowledge and grow together.</p>

      <section className="community-info">
        <h2>Why Join Our Community?</h2>
        <ul>
          <li>Network with like-minded individuals.</li>
          <li>Access exclusive content and resources.</li>
          <li>Collaborate on exciting projects.</li>
          <li>Support and grow with the community.</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h3>Get Involved</h3>
        <p>Become a part of our growing community by joining our events or starting a conversation!</p>
        <button className="join-button">Join the Community</button>
      </section>

      {/* Photo Upload Section */}
      <section className="upload-section">
        <h2>Upload Your Photo</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label htmlFor="image-upload" className="upload-label">
            Choose a photo
          </label>
          <input 
            type="file" 
            id="image-upload" 
            accept="image/*"
            onChange={handleImageChange} 
          />
          
          {previewUrl && (
            <div className="preview-container">
              <h3>Image Preview:</h3>
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}
          
          <button type="submit" className="upload-button">Upload</button>
        </form>
      </section>
    </div>
  );
};

export default Community;