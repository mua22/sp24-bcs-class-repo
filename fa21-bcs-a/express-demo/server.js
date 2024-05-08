const express = require("express");
const mongoose = require("mongoose");
let server = express();
let Student = require("./models/Student");
server.use(express.json());
server.set("view engine", "ejs");
server.use(express.urlencoded());
let cookieParser = require("cookie-parser");
let expressSession = require("express-session");
let ejsLayouts = require("express-ejs-layouts");
let mainSiteMiddleware = require("./middlewares/main-site");
let checkAuth = require("./middlewares/check-auth");
server.use(ejsLayouts);
server.use(cookieParser());
server.use(expressSession({ secret: "My Secret Key" }));

server.use(express.static("public"));
server.use(mainSiteMiddleware);
let studentsAPIRouter = require("./routes/api/students");
const { cookie } = require("express/lib/response");
server.use(studentsAPIRouter);

server.get("/contact-us", async (req, res) => {
  res.render("contact-us");
});
server.get("/cart", checkAuth, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let students = await Student.find({ _id: { $in: cart } });
  res.render("cart", { students });
});

server.use("/students", require("./routes/students"));
server.use("/", require("./routes/auth"));

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
