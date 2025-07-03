const Student = require("../newschema");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const savestudent = async (req, res) => {
  try {
    const newstudent = new Student({
      Name: req.body.student_name,
      Roll_no: req.body.Roll_no,
      Birthday: new Date(req.body.Birthday), // Ensure Birthday is a Date object
    });

    // Await the save operation and handle success/failure
    await newstudent.save();
    res.send("Data inserted");
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Error inserting data");
  }
};

const showstudent = async (req, res) => {
  try {
    const { name } = req.params;
    const student = await Student.findOne({ Name: name });
    if (student) {
      console.log("STUDENT exists");
    }
    res.json(student);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Error inserting data");
  }
};

const showstudents = async (req, res) => {
  try {
    const student = await Student.find();
    if (student) {
      console.log("Stfdgd");
    }
    res.json(student);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Error inserting data");
  }
};

const deletestudent = async (req, res) => {
  try {
    const { name } = req.params;

    const deletedStudent = await Student.findOneAndDelete({ Name: name });

    if (!deletedStudent) {
      return res.status(404).send("Student not found");
    }

    res.send("Student deleted successfully");
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Error deleting data");
  }
};

const updatestudent = async (req, res) => {
  try {
    const { name } = req.params;
    const updatedData = {
      Name: req.body.student_name,
      Roll_no: req.body.Roll_no,
      Birthday: new Date(req.body.Birthday),
    };

    const updatedStudent = await Student.findOneAndUpdate(
      { Name: name },
      updatedData,
      { new: true } // returns updated document
    );

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    res.send("Student updated successfully");
  } catch (e) {
    console.error("Error:", e);
    res.status(500).send("Error updating data");
  }
};

const registerstudent=async (req, res) => {

  try {

    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), 
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    )
    user.token = token;

 
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
const loginstudent=async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  savestudent,
  showstudent,
  showstudents,
  updatestudent,
  deletestudent,
  registerstudent,
  loginstudent,
};
