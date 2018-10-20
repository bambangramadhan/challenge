const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = mongoose.Schema({
  id: String,
  name: String,
  chat: String
})

module.exports = mongoose.model('Data', dataSchema);
