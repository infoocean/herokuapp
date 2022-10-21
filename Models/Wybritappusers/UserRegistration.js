const mongoose = require("mongoose");
const { Schema } = mongoose;

const WybritUserRegistrationSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const userregistration = new mongoose.model(
  "WybrituserRegistration",
  WybritUserRegistrationSchema
);
module.exports = userregistration;
