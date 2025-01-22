import mongoose from "mongoose";

const ProfessionalImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("ProfessionalImage", ProfessionalImageSchema, "professional_images");
