
// userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
