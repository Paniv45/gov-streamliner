// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  panCardNumber: { type: String, required: true },
  aadhaarCardNumber: { type: String, required: true },
  disabilityCertificateNumber: { type: String, required: true },
  incomeCertificateNumber: { type: String, required: true },
  panCard: {
    filePath: { type: String },
    fileName: { type: String },
  },
  aadhaarCard: {
    filePath: { type: String },
    fileName: { type: String },
  },
  disabilityCertificate: {
    filePath: { type: String },
    fileName: { type: String },
  },
  incomeCertificate: {
    filePath: { type: String },
    fileName: { type: String },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
