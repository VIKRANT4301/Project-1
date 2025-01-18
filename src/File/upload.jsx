/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression"; // Ensure this library is installed

function Upload() {
  const [image, setImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [message, setMessage] = useState("");

  function convertToBase64(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert the file to Base64
    reader.onload = () => {
      setImage(reader.result); // Save Base64 to state
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  }

  async function handleImageUpload(e) {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    console.log("Original file size:", imageFile.size / 1024 / 1024, "MB");

    const options = {
      maxSizeMB: 1, // Compress to 1MB or smaller
      maxWidthOrHeight: 1920,
      useWebWorker: true, // Use a web worker for better performance
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log("Compressed file size:", compressedFile.size / 1024 / 1024, "MB");

      // Convert compressed file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error compressing and converting image:", error);
      };
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  }

  async function uploadImage() {
    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64: image }), // Match the backend's key
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setMessage(data.message);
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image");
    }
  }

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

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h2>Upload Image</h2>
        <input accept="image/*" type="file" onChange={e=> setImage(e.target.image[0])} />
        {image && <img src={image} alt="Preview" width={100} height={100} />}
        <button onClick={uploadImage}>Upload</button>
        {message && <p>{message}</p>}

        <h2>All Uploaded Images</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img.image}
              alt={`Uploaded ${index}`}
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upload;
