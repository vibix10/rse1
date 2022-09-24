const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExecutedOrderSchema = new Schema({
  buying: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  selling: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ExecutedOrder", ExecutedOrderSchema);
