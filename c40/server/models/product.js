const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  title: String,
  rate: Number,
  description: String,
  price: String,
  brand: String,
  detailProduct: Text 
})

module.exports = mongoose.model('Product', productSchema)
