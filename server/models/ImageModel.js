import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

export const ImageModel = mongoose.model("Image", ImageSchema);
