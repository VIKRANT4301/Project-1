/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import "./personal.css";

const Personal = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image selection
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
      setLoading(true);
      setMessage("Uploading image...");

      // Compress image before upload
      const compressedFile = await imageCompression(selectedImage, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64: base64.replace(/^data:image\/\w+;base64,/, ""),
          name: selectedImage.name,
        }),
      });

      if (!response.ok) throw new Error("Failed to upload image.");
      const data = await response.json();
      setMessage(data.message || "Image uploaded successfully.");

      // Reset form and refresh image list
      setSelectedImage(null);
      setPreviewUrl("");
      fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch images from the server
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/get-image");
      if (!response.ok) throw new Error("Failed to fetch images.");
      const data = await response.json();
      setAllImages(data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Error fetching images.");
    } finally {
      setLoading(false);
    }
  };

  // Handle suspicious activity (right-click, drag, etc.)
  const handleSuspiciousActivity = async (event, imageName) => {
    event.preventDefault(); // Prevent default download action
    alert(`Unauthorized action detected on: ${imageName}`);

    try {
      await fetch("http://localhost:3000/api/send-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Suspicious activity detected on image: ${imageName}`,
          userEmail: "user@example.com", // Replace with dynamic email
        }),
      });
    } catch (error) {
      console.error("Alert error:", error);
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
        <h2>Upload an Image</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleImageUpload();
          }}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>

      <section className="uploaded-images">
        <h2>Uploaded Images</h2>
        <div className="image-gallery">
          {allImages.length > 0 ? (
            allImages.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  src={`data:image/jpeg;base64,${image.image}`}
                  alt={image.name}
                  className="uploaded-image"
                  onContextMenu={(e) => handleSuspiciousActivity(e, image.name)}
                  onDragStart={(e) => handleSuspiciousActivity(e, image.name)}
                  onMouseDown={(e) => handleSuspiciousActivity(e, image.name)}
                />
                <p>{image.name}</p>
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

export default Personal;