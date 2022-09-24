const mongoose = require("mongoose");
const validator = require("validator");
const schema = mongoose.Schema;

const CompanySchema = new schema({
  companyID: {
    type: String,
    required: [true, "company ID is required"],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "please enter company name"],
    unique: true,
    trim: true,
  },
  logo: { type: String, required: true },
  phone: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "enter valid email"],
    unique: [true, "email already used"],
  },
  city: { type: String, required: true },
  country: { type: String, required: true },
  securityType: {
    type: String,
    required: [true, "choose either bond or share"],
    enum: {
      values: ["bond", "share"],
      message: "invalid category",
    },
  },
  totalShares: { type: Number, default: 0 },
  outstanding: { type: Number, required: true },
  ipo: { type: Number, required: true },
  cashBalance: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  description: { type: String },
  listed: { type: Boolean, default: true },
  investor: { type: schema.Types.ObjectId, ref: "Investor", required: true },
});

module.exports = mongoose.model("Company", CompanySchema);
