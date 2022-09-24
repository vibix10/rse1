const express = require("express");

const app = express();
const path = require("path");

// environmant configurations
// const dotenv = require("dotenv");
// dotenv.config({ path: "backend/config/configuration.env" });

const db = require("./db");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(fileupload());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const companyRouters = require("./routes/companyRoutes");
const investorRouters = require("./routes/investorRoutes");
const orderRouters = require("./routes/orderRoutes");
const moneyRouters = require("./routes/money");

app.use("/api/company", companyRouters);
app.use("/api/investor", investorRouters);
app.use("/api/order", orderRouters);
app.use("/api/money", moneyRouters);

if (true) {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// error middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

// handle rejected promise
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Error name: ${err.stack}`);
  console.log("server shutdown-unhandled promise");
  process.exit(0);
});

module.exports = app;
