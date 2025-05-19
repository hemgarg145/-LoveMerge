const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dob: { type: Date, required: true },
  bio: { type: String },
  profilePic: { type: String }, // in case you're using it

  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("User", UserSchema);
