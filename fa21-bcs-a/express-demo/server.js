const express = require("express");
const mongoose = require("mongoose");
let server = express();
let Student = require("./models/Student");
server.use(express.json());

server.post("/api/students", async function (req, res) {
  let data = req.body;
  let student = new Student(data);
  await student.save();
  res.send(student);
});

server.delete("/api/students/:id", async function (req, res) {
  let student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).send("Record Not Found");
  res.send(student);
});
server.put("/api/students/:id", async function (req, res) {
  let student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send("Record Not Found");
  student.name = req.body.name;
  student.address = req.body.address;
  await student.save();
  res.send(student);
});
server.get("/api/students/:id", async function (req, res) {
  let student = await Student.findById(req.params.id);
  res.send(student);
});

server.get("/api/students", async function (req, res) {
  let students = await Student.find();
  //   let students = [
  //     { name: "Abdul Rehman", address: "Hafiz Abad" },
  //     { name: "Azeem", address: "Pak Arab" },
  //   ];
  res.send(students);
});

server.listen(4000, () => {
  console.log("server started listening at localhost:4000");
});
mongoose
  .connect("mongodb://localhost:27017/fa21-bcs-a")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });
