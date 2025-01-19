/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import "./professional.css";

const Professional = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [allImages, setAllImages] = useState([]); // Store all uploaded images

  // Handle file selection and set preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Compress and upload image
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setMessage("Please select an image before uploading.");
      return;
    }

    const options = {
      maxSizeMB: 1, // Compress to 1MB
      maxWidthOrHeight: 1920,
      useWebWorker: true, // Better performance
    };

    try {
      // Compress the image
      const compressedFile = await imageCompression(selectedImage, options);

      // Convert compressed image to Base64
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      // Upload the image
      const success = await uploadImage(base64);
      if (success) {
        setMessage("Image uploaded successfully!");
        fetchImages(); // Refresh the image feed
      }
    } catch (error) {
      console.error("Error compressing the image:", error);
      setMessage("Error compressing the image.");
    }
  };

  // Upload Base64 image to server
  const uploadImage = async (base64) => {
    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64 }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      return true;
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image.");
      return false;
    }
  };

  // Fetch uploaded images from server
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/get-image", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images.");
      }

      const data = await response.json();
      setAllImages(data.data || []); // Update image feed
    } catch (error) {
      console.error("Error fetching images:", error);
      setMessage("Error fetching uploaded images.");
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="professional-container">
      <header className="professional-header">
        <h1>Professional Network</h1>
        <p>Showcase your achievements, connect with professionals, and grow your network.</p>
      </header>

      <section className="professional-info">
        <h2>Why Join?</h2>
        <ul>
          <li>Highlight your expertise and skills.</li>
          <li>Share your career milestones.</li>
          <li>Collaborate with industry leaders.</li>
          <li>Stay informed about trends.</li>
        </ul>
      </section>

      <section className="upload-section">
        <h2>Upload Your Professional Image</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleImageUpload();
          }}
          className="upload-form"
        >
          <label htmlFor="image-upload" className="upload-label">
            Choose an Image
          </label>
          <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />

          {previewUrl && (
            <div className="preview-container">
              <h3>Preview</h3>
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}

          <button type="submit" className="upload-button">
            Upload Image
          </button>
        </form>

        {message && <p className="upload-message">{message}</p>}
      </section>

      <section className="uploaded-images">
        <h2>Uploaded Images</h2>
        <div className="feed-container">
          {allImages.length > 0 ? (
            allImages.map((post, index) => (
              <div key={index} className="post">
                <img src={post.image} alt={`Uploaded ${index}`} className="post-image" />
              </div>
            ))
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Professional;
