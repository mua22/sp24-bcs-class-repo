let express = require("express");
let router = express.Router();
let Game = require("../../models/Game");
router.get("/api/games/:id", async (req, res) => {
  let game = await Game.findById(req.params.id);
  return res.send(game);
});
router.put("/api/games/:id", async (req, res) => {
  let game = await Game.findById(req.params.id);
  game.title = req.body.title;
  game.type = req.body.type;
  game.genre = req.body.genre;
  await game.save();
  return res.send(game);
});
router.delete("/api/games/:id", async (req, res) => {
  let game = await Game.findByIdAndDelete(req.params.id);
  return res.send(game);
});

router.post("/api/games", async (req, res) => {
  let data = req.body;
  let record = new Game(data);
  await record.save();
  return res.send(record);
});
router.get("/api/games", async function (req, res) {
  let games = await Game.find();
  return res.send(games);
});

module.exports = router;
