const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.port || 3000;
const cors = require("cors");
const verifyToken = require("./middleware/aut");

const {
  savestudent,
  showstudent,
  showstudents,
  deletestudent,
  updatestudent,
  registerstudent,
  loginstudent,
} = require("./controller/saveController");

const server = http.createServer(app);

app.use(cors());
const router = express.Router();
module.exports = router;

app.use(express.json());

const mongoDBURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Open routes:
app.post("/register", registerstudent);
app.post("/login", loginstudent);

// Protect all routes below this line
app.use(verifyToken);
app.post("/students", verifyToken, savestudent);
app.get("/students", verifyToken, showstudents);
app.delete("/student/:name", verifyToken, deletestudent);
app.put("/student/:name", verifyToken, updatestudent);
app.get("/student/:name", verifyToken, showstudent);
