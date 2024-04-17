const express = require("express");
let router = express.Router();
let Student = require("../../models/Student");

router.post("/api/students", async function (req, res) {
  let data = req.body;
  let student = new Student(data);
  await student.save();
  res.send(student);
});
router.delete("/api/students/:id", async function (req, res) {
  let student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).send("Record Not Found");
  res.send(student);
});
router.put("/api/students/:id", async function (req, res) {
  let student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send("Record Not Found");
  student.name = req.body.name;
  student.address = req.body.address;
  await student.save();
  res.send(student);
});
router.get("/api/students/:id", async function (req, res) {
  let student = await Student.findById(req.params.id);
  res.send(student);
});
router.get("/api/students", async function (req, res) {
  let students = await Student.find();
  //   let students = [
  //     { name: "Abdul Rehman", address: "Hafiz Abad" },
  //     { name: "Azeem", address: "Pak Arab" },
  //   ];
  res.send(students);
});

module.exports = router;
