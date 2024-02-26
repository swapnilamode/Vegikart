const mongoose = require("mongoose");

// Define a schema for orders
const orderSchema = mongoose.Schema({
  items: [{
    productId: String,
    name: String,
    price: String,
    quantity: Number,
  }],
  totalAmount: String,
  shippingAddress: {
    address: String,
    city: String,
    country: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;