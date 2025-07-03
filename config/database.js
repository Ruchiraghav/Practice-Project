const mongoose = require("mongoose");
require("dotenv").config();
const mongoDBURL = process.env.MONGODB_URL;

exports.connect = () => {
  mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((error) => {
      console.log("❌ Database connection failed. Exiting now...");
      console.error(error);
      process.exit(1);
    });
};
