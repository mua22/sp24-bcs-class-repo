const express = require("express");
const mongoose = require("mongoose");
const Mobile = require("./models/Mobile");
let server = express();
server.use(express.json());

let mobileApiRouter = require("./routes/api/mobiles");
server.use("/", mobileApiRouter);
server.use("/", require("./routes/api/games"));

//mongoose accepts a connection string to your db and attempts a connections here
mongoose.connect("mongodb://localhost:27017/fa21-bcs-b").then((data) => {
  console.log("DB Connected");
});
server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
