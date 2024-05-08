let express = require("express");
let router = express.Router();
let Student = require("../models/Student");

router.get("/new", (req, res) => {
  res.render("students/new");
});

router.post("/new", async (req, res) => {
  let std = new Student(req.body);
  await std.save();
  return res.redirect("/students");
  //   return res.send(req.body);

  //   res.render("students/new");
});

router.get("/delete/:id", async (req, res) => {
  let std = await Student.findByIdAndDelete(req.params.id);
  return res.redirect("/students");
});
router.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);

  // return res.send(req.cookies);
  return res.redirect("/students");
});

router.get("/edit/:id", async (req, res) => {
  let student = await Student.findById(req.params.id);
  return res.render("students/edit", { student });
});
router.post("/edit/:id", async (req, res) => {
  let student = await Student.findById(req.params.id);
  student.name = req.body.name;
  student.address = req.body.address;
  await student.save();
  return res.redirect("/students");
});

router.get("/", async (req, res) => {
  let pageTitle = "List of All students";
  let students = await Student.find();
  //   return res.send(students);
  return res.render("students/list", { pageTitle, students });
});

module.exports = router;
