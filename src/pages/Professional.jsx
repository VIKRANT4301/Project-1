/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import "./professional.css";

const Professional = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [allImages, setAllImages] = useState([]);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload image to the server
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setMessage("Please select an image before uploading.");
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(selectedImage, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64: base64.replace(/^data:image\/\w+;base64,/, ""),
          name: selectedImage.name,
        }),
      });

      if (!response.ok) throw new Error("Failed to upload image.");
      const data = await response.json();
      setMessage(data.message || "Image uploaded successfully.");
      fetchImages();
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  // Fetch images from server
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/get-image");
      if (!response.ok) throw new Error("Failed to fetch images.");
      const data = await response.json();
      setAllImages(data.data || []);
    } catch (error) {
      setMessage("Error fetching images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="professional-container">
      <header className="professional-header">
        <h1>Professional Network</h1>
      </header>
      <section className="upload-section">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleImageUpload();
          }}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          <button type="submit">Upload Image</button>
        </form>
        {message && <p>{message}</p>}
      </section>
      <section className="uploaded-images">
        <h2>Uploaded Images</h2>
        <div>
          {allImages.map((image, index) => (
            <div key={index}>
              <img src={`data:image/jpeg;base64,${image.image}`} alt={image.name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Professional;
