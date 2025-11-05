const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  housename: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  photo: String,
  contact: String,
  description: String,
});

module.exports = mongoose.model('Home', homeSchema);
