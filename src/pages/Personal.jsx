/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './personal.css'; // Optional: Add custom styles for this page

const Personal = () => {
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
    <div className="personal-container">
      <h1>Personal Page</h1>
      <p>Welcome to your personal page! Share your favorite memories, hobbies, and more.</p>

      {/* Personal Content Section */}
      <section className="personal-info">
        <h2>Why Share Your Personal Moments?</h2>
        <ul>
          <li>Document your favorite memories.</li>
          <li>Share your hobbies and passions.</li>
          <li>Stay connected with friends and family.</li>
          <li>Keep track of your personal growth and milestones.</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h3>Share Your Personal Journey!</h3>
        <p>Upload your personal photos and create a visual timeline of your life!</p>
        <button className="join-button">Join the Personal Sharing Community</button>
      </section>

      {/* Image Upload Section */}
      <section className="upload-section">
        <h2>Upload Your Personal Image</h2>
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

export default Personal;
