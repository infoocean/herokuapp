const mongoose = require("mongoose");
const { Schema } = mongoose;

const RegistrationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  dateofbirth: {
    type: Date,
    default: Date.now,
  },
  applyasa: {
    type: String,
  },
  image: {
    type: Buffer,
  },
});

const registration = new mongoose.model("Registration", RegistrationSchema);
module.exports = registration;
