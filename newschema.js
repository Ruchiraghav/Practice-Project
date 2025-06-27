const mongoose = require("mongoose");

const Studentschema = new mongoose.Schema({
  Student_Id: Number,
  Name: String,
  Roll_no: Number,
  Birthday: Date,
});

module.exports = mongoose.model("student", Studentschema, "Students");
