const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const CartList = mongoose.model("cart", CartSchema);

module.exports = CartList;
