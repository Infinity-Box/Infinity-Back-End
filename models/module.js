const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  firstname: String,
  lastname: String,
  city: String,
  phonenumber: Number,
  hourlyrate: Number,
});

module.exports = mongoose.model('Module', ModuleSchema);
