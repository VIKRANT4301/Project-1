import express from "express";
import { ImageModel } from "../models/ImageModel.js";

const router = express.Router();

// Upload image route (No authentication required)
router.post("/upload", async (req, res) => {
  try {
    const { base64, name } = req.body;

    // Validate required fields
    if (!base64 || !name) {
      return res.status(400).json({ message: "Image and name are required" });
    }

    // Create new image entry
    const newImage = new ImageModel({
      image: base64,  // Store the image base64 data
      name: name      // Store the image name
    });

    // Save the image to the database
    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully!" });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all images route (No authentication required)
router.get("/get-image", async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json({ data: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
});

export default router;
