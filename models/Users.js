const crypto = require('crypto');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a valid name"]
  },
  lastname: {
    type: String,
    required: [true, "Please provide a valid surname"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists, please login"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
},
  { timestamps: true }
);

// Encrypt password before creating the User
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Hash password to the model before it is saved
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Check for matching password on login and DB
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Get signed in token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 360000 });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = User = mongoose.model("Users", UserSchema);
