/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './professional.css'; // Optional: Add custom styles for this page

const Professional = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");

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
      // Simulate image upload logic (you can replace this with actual upload logic)
      setMessage("Image uploaded successfully!");
      // Reset the preview and selected image
      setSelectedImage(null);
      setPreviewUrl("");
    } else {
      setMessage("Please select an image to upload.");
    }
  };

  return (
    <div className="professional-container">
      <h1>Professional Page</h1>
      <p>Welcome to the Professional Page! This is the place for professionals to share ideas, experiences, and connect with others in the industry.</p>

      {/* Professional Information Section */}
      <section className="professional-info">
        <h2>Why Share Your Professional Achievements?</h2>
        <ul>
          <li>Showcase your skills and accomplishments.</li>
          <li>Share your work experiences and professional achievements.</li>
          <li>Connect with industry leaders and professionals.</li>
          <li>Stay updated on the latest industry trends.</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h3>Network with Industry Professionals!</h3>
        <p>Join the professional community by uploading your work, projects, and achievements!</p>
        <button className="join-button">Join the Professional Network</button>
      </section>

      {/* Image Upload Section */}
      <section className="upload-section">
        <h2>Upload Your Professional Image</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label htmlFor="image-upload" className="upload-label">
            Choose an image
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

        {/* Display feedback message */}
        {message && <p className="message">{message}</p>}
      </section>
    </div>
  );
};

export default Professional;
