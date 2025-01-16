// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./college.css"

const College = () => {
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
    <div className="college-container">
      <h1>College Page</h1>
      <p>Welcome to the College Page! Share your memories, events, and experiences with your peers.</p>

      {/* College Information Section */}
      <section className="college-info">
        <h2>Why Share Your College Moments?</h2>
        <ul>
          <li>Celebrate your achievements.</li>
          <li>Share events and memories with friends.</li>
          <li>Get involved in college activities.</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h3>Get Involved in the College Community!</h3>
        <p>Upload your favorite memories and experiences with the college community!</p>
        <button className="join-button">Join the College Community</button>
      </section>

      {/* Image Upload Section */}
      <section className="upload-section">
        <h2>Upload Your College Image</h2>
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

export default College;
