const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MenuModel = require("./models/menuList");
const CartModel = require("./models/cartList");
const OrderModel = require("./models/orderList");

var app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/srilankan_restaurant");

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error: ", error);
});

//Get menus from database
app.get("/getMenu", (req, res) => {
  MenuModel.find({})
    .then((menuList) => res.json(menuList))
    .catch((err) => res.json(err))
});

app.get("/getCart", (req, res) => {
  CartModel.find({})
  .then((cartList) => res.json(cartList))
  .catch((err) => res.json(err))
})

//Add item to cart
app.post("/addToCart", (req, res) => {
  CartModel.create({
    name: req.body.name,
    price: req.body.price
  })
  .then((cart) => res.json(cart))
  .catch((err) => res.json(err))
});

//Add order after submitting order
app.post("/addToOrders", (req, res) => {
  OrderModel.create({
    foodOrders: req.body.foodOrders,
    totalPrice: req.body.totalPrice,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    postalCode: req.body.postalCode,
    postalCity: req.body.postalCity,
    telephoneNumber: req.body.telephoneNumber,
    email: req.body.email,
  })
});

app.delete("/deleteCart", (req, res) => {
  CartModel.deleteMany({})
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
})

app.delete("/deleteCartItem/:id", (req, res) => {
  const id = req.params.id;
  CartModel.findByIdAndDelete({ _id: id })
  .then((cartItem) => res.json(cartItem))
  .catch((err) => res.json(err));
})

app.listen(3001, () => {
  console.log("Server running on 3001");
})
