const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const MenuList = mongoose.model("menu", MenuSchema, "menus");

module.exports = MenuList;
