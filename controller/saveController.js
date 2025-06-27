const Student = require("../newschema");

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
module.exports = {
  savestudent,
  showstudent,
  showstudents,
  updatestudent,
  deletestudent,
};
