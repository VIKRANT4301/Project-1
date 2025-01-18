/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression"; // Ensure this library is installed
import "./college.css"; // Ensure styles are defined here

const College = () => {
  const [image, setImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [message, setMessage] = useState("");

   async function fetchImages() {
      try {
        const response = await fetch("http://localhost:3000/api/get-image", {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
  
        const data = await response.json();
        setAllImages(data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
  
    useEffect(() => {
      fetchImages(); // Fetch images on component mount
    }, []);
  // Handle image selection and compression
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => setImage(reader.result);
      reader.onerror = (err) => console.error("Error reading file:", err);
    } catch (err) {
      console.error("Compression Error:", err);
    }
  };

  // Upload image to the backend
  const uploadImage = async () => {
    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: image }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        setMessage("Image uploaded successfully!");
        setImage("");
        fetchImages(); // Refresh images
      } else {
        setMessage("Failed to upload image. Please try again.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setMessage("Error uploading image.");
    }
  };

  return (
    <div className="college-container">
      <h1>College Memories</h1>
      <p>
        Share your favorite college memories with the community by uploading images below.
      </p>

      <div className="upload-section">
        <h2>Upload Your College Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {image && (
          <div className="preview-container">
            <h3>Image Preview</h3>
            <img src={image} alt="Preview" className="preview-image" />
          </div>
        )}
        <button onClick={uploadImage} className="upload-button">
          Upload Image
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="gallery-section">
        <h2>Uploaded College Memories</h2>
        {allImages.length > 0 ? (
          <div className="image-gallery">
            {allImages.map((img, idx) => (
              <div key={idx} className="image-item">
                <img src={img.image} alt={`Memory ${idx}`} className="gallery-image" />
              </div>
            ))}
          </div>
        ) : (
          <p>No images uploaded yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default College;
