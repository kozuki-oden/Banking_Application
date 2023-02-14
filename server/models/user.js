const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },

  phone: {
    type: String,
    required: true,
    min: 10,
    max: 12,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
    required: true,
    min: 4,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  authorized: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods = {
  authenticate: function (password) {
    if (password === this.hash_password) {
      return "true";
    } else return "false";
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
