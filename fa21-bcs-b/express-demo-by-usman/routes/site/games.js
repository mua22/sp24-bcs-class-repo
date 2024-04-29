const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/games/new", async (req, res) => {
  res.render("games/new");
});
router.post("/games/new", async (req, res) => {
  let record = new Game(req.body);
  await record.save();
  //PRG: post redirect get design pattern
  return res.redirect("/games");
  // return res.send(record);
  // res.send("Submitted Data");
});
router.get("/games/:id/delete", async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  return res.redirect("/games");
});

router.get("/games/:id/edit", async (req, res) => {
  let game = await Game.findById(req.params.id);
  return res.render("games/edit", { game });
});

router.post("/games/:id/edit", async (req, res) => {
  let game = await Game.findById(req.params.id);
  game.title = req.body.title;
  game.type = req.body.type;
  game.genre = req.body.genre;
  await game.save();
  return res.redirect("/games");
});

router.get("/games/:page?", async (req, res) => {
  let page = Number(req.params.page) ? Number(req.params.page) : 1;
  let pageSize = 3;
  let games = await Game.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  let total = await Game.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  res.render("games/list", {
    pageTitle: "List All Games",
    games,
    total,
    page,
    pageSize,
    totalPages,
  });
});

module.exports = router;
