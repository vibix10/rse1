const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rse");

const dbObj = mongoose.connection;
dbObj.on("connected", () => {
  console.log("db connected");
});
dbObj.on("error", () => {
  console.log("db error");
});
const data = require("./data/company.json");
//const db = require("./db.js");

const mod = require("./models/companyModel");
try {
  console.log("strat");
  mod.insertMany(data);
  console.log("end");
  process.exit();
} catch (e) {
  console.log(e.message);
}
