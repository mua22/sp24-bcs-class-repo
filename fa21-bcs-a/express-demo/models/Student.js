const mongoose = require("mongoose");

let studentSchema = mongoose.Schema({
  name: String,
  address: String,
});
let Student = mongoose.model("Student", studentSchema);
module.exports = Student;
