const mongoose = require("mongoose");
let mobileSchema = mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
});
let Mobile = mongoose.model("Mobile", mobileSchema);
module.exports = Mobile;
