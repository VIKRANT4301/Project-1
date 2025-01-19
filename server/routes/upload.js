import express from 'express';
import Upload from "../models/uploadSchema.js"; // Correctly import the model

const UploadRouter = express.Router();

// Handle image upload
UploadRouter.post('/upload', async (req, res) => {
  try {
    const { base64, name } = req.body;

    const newUpload = new Upload({
      name,
      image: base64,
    });

    await newUpload.save();
    res.status(200).json({ message: 'Image uploaded successfully', data: newUpload });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// Get all uploaded images
UploadRouter.get('/get-image', async (req, res) => {
  try {
    const images = await Upload.find();
    res.status(200).json({ data: images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
});

export { UploadRouter };