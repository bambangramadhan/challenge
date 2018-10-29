const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reduxSchema = mongoose.Schema({
  id: Number,
  name: String,
  phone: String
})

module.exports = mongoose.model('Redux', reduxSchema)
