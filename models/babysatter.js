const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BabysatterSchema = new Schema({
  firstname: String,
  lastname: String,
  city: String,
  phonenumber: Number,
  hourlyrate: Number,
  satscore: String
});

module.exports = mongoose.model('Babysatter', BabysatterSchema);
