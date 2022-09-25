const app = require("./app");
const cloudinary = require("cloudinary");

// environmant configurations
// const dotenv = require("dotenv");
// dotenv.config({ path: "backend/config/configuration.env" });

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// handle rejected promise/ unhandled promise
process.on("unHandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("server shutdown-unhandled promise");
  server.close(() => {
    process.exit(1);
  });
});

// server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server started on port ${process.env.PORT} in ${process.env.MODE} mode`
  );
});
