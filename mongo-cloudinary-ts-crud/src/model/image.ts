import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

const Image = mongoose.model("Image", userSchema);

export default Image