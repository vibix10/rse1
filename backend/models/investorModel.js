const mongoose = require("mongoose");
const validator = require("validator");
const async = require("../middleware/async");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const investorSchema = new Schema({
  name: {
    type: String,
    required: [true, "please set name"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "please enter unique username"],
    trim: true,
    unique: [true, "username already taken"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    validate: [validator.isEmail, "enter valid email"],
    unique: [true, "email already used"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
    minlength: [8, "password is too short"],
  },
  phone: {
    type: Number,
    required: [true, "enter phone number"],
    minlength: [10, "phone number is invalid"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    public_id: {
      type: String,
      required: [true, "upload image"],
      default: "pics/m4hss10mz35xmx4utxdo",
    },

    url: {
      type: String,
      required: [true, "upload image"],
      default:
        "https://res.cloudinary.com/ben250/image/upload/v1663271518/pics/m4hss10mz35xmx4utxdo.jpg",
    },
  },
  role: {
    type: String,
    required: [true, "choose role"],
    enum: { values: ["investor", "underwriter"], message: "Enter valid role" },
  },
  status: {
    type: String,
    default: "active",
    enum: { values: ["active", "deactive"], message: "set valid status" },
  },
  cashBalance: {
    type: Number,
    default: 0,
  },
  shares: [
    {
      companyRef: { type: Schema.Types.ObjectId, ref: "Company" },
      companyName: { type: String },
      num: { type: Number },
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encryption
investorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare password
investorSchema.methods.comparePassword = async function (pwd) {
  return await bcrypt.compare(pwd, this.password);
};

// generate Jwt Token
investorSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// reset password
investorSchema.methods.getPasswordResetToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // hash token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Investor", investorSchema);
