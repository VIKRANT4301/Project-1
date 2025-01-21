// server/models/ImageModel.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageModel = mongoose.model("Image", ImageSchema);

// Export the model
export { ImageModel };
