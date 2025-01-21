import mongoose from 'mongoose';

const UserDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  uploadedImages: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});

const UserData = mongoose.model('UserData', UserDataSchema);
export default UserData;
