const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  investor: { type: Schema.Types.ObjectId, ref: "Investor", required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: {
      values: ["outstanding", "canceled", "executed"],
      message: "invalid status",
    },
    default: "outstanding",
  },
  bid: { type: Number, required: [true, "enter bid price"] },
  volume: { type: Number, required: [true, "enter quantity"] },
  totalCost: { type: Number, default: 0, required: true },
  orderType: {
    type: String,
    required: [true, "select order type"],
    enum: {
      values: ["buying", "selling", "ipoOrder"],
      message: "select valid order",
    },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
