const crypto = require('crypto');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StaffSchema = new mongoose.Schema(
  {
    bid: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
      }
    ],
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
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
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Encrypt password before creating the User
StaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Hash password to the model before it is saved
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Check for matching password on login and DB
StaffSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Get signed in token
StaffSchema.methods.getSignedToken = function () {
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

StaffSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = Staff = mongoose.model("Staff", StaffSchema);