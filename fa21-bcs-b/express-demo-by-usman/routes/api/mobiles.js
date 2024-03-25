let express = require("express");
let router = express.Router();
let Mobile = require("../../models/Mobile");
router.get("/api/mobiles/:id", async (req, res) => {
  let mobile = await Mobile.findById(req.params.id);
  return res.send(mobile);
});
router.put("/api/mobiles/:id", async (req, res) => {
  let mobile = await Mobile.findById(req.params.id);
  mobile.name = req.body.name;
  mobile.brand = req.body.brand;
  mobile.price = req.body.price;
  await mobile.save();
  return res.send(mobile);
});
router.delete("/api/mobiles/:id", async (req, res) => {
  let mobile = await Mobile.findByIdAndDelete(req.params.id);
  return res.send(mobile);
});

router.post("/api/mobiles", async (req, res) => {
  let data = req.body;
  let record = new Mobile(data);
  await record.save();
  return res.send(record);
});
router.get("/api/mobiles", async function (req, res) {
  let mobiles = await Mobile.find();
  return res.send(mobiles);
  //   res.send([
  //     { name: "s21", brand: "Samsung", price: 50000 },
  //     { name: "iphone 15 pro max", brand: "Apple", price: 500000 },
  //   ]);
});

module.exports = router;
