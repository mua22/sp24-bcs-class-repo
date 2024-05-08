let express = require("express");
let router = express.Router();
let User = require("../models/User");
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  let user = new User(req.body);
  await user.save();
  res.redirect("/login");
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect("/register");
  if (user.password != req.body.password) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});
module.exports = router;
