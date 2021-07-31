const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    type: { type: String },
    name: { type: String },
    surname: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("Users", UserSchema);
