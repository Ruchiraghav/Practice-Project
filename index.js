const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const {
  savestudent,
  showstudent,
  showstudents,
  deletestudent,
  updatestudent,
} = require("./controller/saveController");


const app = express();
const port = process.env.port || 3000;
const cors = require("cors");
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

app.post("/student", savestudent);

app.get("/students", showstudents);

app.delete("/student/:name", deletestudent);

app.put("/student/:name", updatestudent);
app.get("/student/:name", showstudent);
