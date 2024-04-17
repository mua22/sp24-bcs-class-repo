const express = require("express");
const mongoose = require("mongoose");
let server = express();
let Student = require("./models/Student");
server.use(express.json());
server.set("view engine", "ejs");

let ejsLayouts = require("express-ejs-layouts");
server.use(ejsLayouts);

server.use(express.static("public"));

let studentsAPIRouter = require("./routes/api/students");
server.use(studentsAPIRouter);

server.get("/contact-us", async (req, res) => {
  res.render("contact-us");
});

server.get("/", async (req, res) => {
  res.render("homepage");
  // res.send("Hello Class A section");
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
