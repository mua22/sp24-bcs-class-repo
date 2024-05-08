const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  roles: [],
});
let User = mongoose.model("User", userSchema);
module.exports = User;
