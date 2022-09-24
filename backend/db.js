const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://vibix:vibix@cluster0.jm41nay.mongodb.net/rse1?retryWrites=true&w=majority"
);

const dbObj = mongoose.connection;
dbObj.on("connected", () => {
  console.log("db connected");
});
dbObj.on("error", () => {
  console.log("db error");
});

module.exports = dbObj;
