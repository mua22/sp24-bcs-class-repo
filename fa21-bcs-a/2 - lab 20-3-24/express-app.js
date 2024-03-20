//npm i express
//run it from same folder in which you are building your server
// npm i -g nodemon
//run above command once in lifetime.
const express = require("express");
let server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
//above line sets ejs as view engine
server.get("/api/stories", function (req, res) {
  res.send([
    { title: "Story 1", content: "story 1 content" },
    { title: "story 2", content: "story 2 content" },
  ]);
});
server.get("/contact-us", function (req, res) {
  //route to handle / get request
  res.render("contact-us");
});
server.get("/", function (req, res) {
  //route to handle / get request
  res.render("homepage");
});

server.listen(4000);
