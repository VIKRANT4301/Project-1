import express from "express";
import ProfessionalImage from "../models/ProfessionalImage.js"; // Correct import

const router = express.Router();

// Upload Image
router.post("/upload", async (req, res) => {

    const { base64, name } = req.body;

    if (!base64 || !name) {
      return res.status(400).json({ message: "Invalid image data." });
    }
try{
    // Save the image to the database
    const newImage = new ProfessionalImage({
      name,
      image: base64,  // Assuming you're saving the base64 string in the image field
    });

    // Save the new image to the database
    await newImage.save();

    // Return a success response
    return res.status(200).json({ message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading image:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch Images
router.get("/get-image", async (req, res) => {
  try {
    const images = await ProfessionalImage.find();  // Fetch images from ProfessionalImage collection
    res.status(200).json({ data: images });
  } catch (error) {
    console.error("Fetch images error:", error);
    res.status(500).json({ message: "Error fetching images." });
  }
});

// Send Alert
router.post("/send-alert", async (req, res) => {
  const { message, userEmail } = req.body;

  try {
    // Log suspicious activity or send an email (email sending requires nodemailer setup)
    console.log("Suspicious activity alert:", message, userEmail);

    // Example placeholder logic: Send a success response.
    res.status(200).json({ message: "Alert sent successfully." });
  } catch (error) {
    console.error("Alert error:", error);
    res.status(500).json({ message: "Error sending alert." });
  }
});

export default router;
