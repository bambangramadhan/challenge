const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  id: Number,
  title: String,
  rate: Number,
  description: String,
  price: String,
  brand: String,
  dproduct: String
})

module.exports = mongoose.model('Product', productSchema)
