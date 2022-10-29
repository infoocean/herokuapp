const mongoose = require("mongoose");
const { Schema } = mongoose;

const WybritOrder = new Schema({
  Userid: {
    type: String,
    required: true,
  },
  Orderid: {
    type: Number,
    required: true,
  },
});

const WybritOrders = new mongoose.model("WybritOrders", WybritOrder);
module.exports = WybritOrders;
