const mongoose = require("mongoose");
let gamesSchema = mongoose.Schema({
  title: String,
  type: String,
  genre: String,
});
let Game = mongoose.model("Game", gamesSchema);
module.exports = Game;
