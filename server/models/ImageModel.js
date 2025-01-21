import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: String,
  image: String, // Base64 encoded image string
  createdAt: { type: Date, default: Date.now },
});

export const ImageModel = mongoose.model("Image", ImageSchema);
