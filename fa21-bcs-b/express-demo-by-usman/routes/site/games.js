const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");

router.get("/games", async (req, res) => {
  let games = await Game.find();
  res.render("games/list", { pageTitle: "List All Games", games });
});

module.exports = router;
