const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  foodOrders: {
    type: [String],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  postalCode: {
    type: Number,
    required: true
  },
  postalCity: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
})

const OrderList = mongoose.model("order", OrderSchema);
module.exports = OrderList;
