import mongoose from 'mongoose';

// Define Upload Schema
const UploadSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the uploaded file
  image: { type: String, required: true }, // Base64 string of the image
  uploadedAt: { type: Date, default: Date.now }, // Timestamp of upload
});

// Create and export the Upload model
const Upload = mongoose.model("Upload", UploadSchema);

export default Upload;
