const express = require("express");
let router = express.Router();
let User = require("../../models/User");

router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // req.session.flash = {
    //   type: "danger",
    //   message: "User with given name already exist",
    // };
    res.flash("danger", "User Already Exist");
    return res.redirect("/register");
  }
  user = new User(req.body);
  await user.save();
  res.render("/login");
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.flash("success", "Logged out Successfully");
  res.redirect("/login");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.flash("danger", "USer with given email already exist");
    return res.redirect("/register");
  }
  if (user.password != req.body.password) {
    res.flash("danger", "Invalid Password");
    return res.redirect("/login");
  }
  req.session.user = user;
  res.flash("success", user.name + " Logged In");
  return res.redirect("/");
});
module.exports = router;
