const express = require("express");
const mongoose = require("mongoose");
const Mobile = require("./models/Mobile");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const isAuthenticated = require("./middlewares/isAuthenticated");
let server = express();
server.use(express.json());
server.use(express.urlencoded());

server.use(cookieParser());
server.use(session({ secret: "Its  a secret" }));
server.set("view engine", "ejs");
server.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts);
server.use(require("./middlewares/siteMiddleware"));
let mobileApiRouter = require("./routes/api/mobiles");

server.use("/", mobileApiRouter);
server.use("/", require("./routes/site/auth"));
server.use("/", require("./routes/api/games"));
server.use("/", require("./routes/site/games"));

server.get("/contact-us.html", isAuthenticated, (req, res) => {
  res.render("contact-us");
});
server.get("/", (req, res) => {
  res.render("homepage");
});

//mongoose accepts a connection string to your db and attempts a connections here
mongoose.connect("mongodb://localhost:27017/fa21-bcs-b").then((data) => {
  console.log("DB Connected");
});
server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
