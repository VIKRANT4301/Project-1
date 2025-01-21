import express from "express";
import { ImageModel } from "../models/ImageModel.js";

const router = express.Router();

// Upload image route
router.post("/upload", async (req, res) => {
  try {
    const { base64, name } = req.body;
    if (!base64 || !name) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const newImage = new ImageModel({
      name,
      image: base64, // Store Base64 string in MongoDB
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get images route
router.get("/get-image", async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json({ data: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching images" });
  }
});

export default router;