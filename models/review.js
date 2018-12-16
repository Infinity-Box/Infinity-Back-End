const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  title: String,
  content: String,
  moduleId: { type: Schema.Types.ObjectId, ref: 'Module' }
});


module.exports = mongoose.model('Review', ReviewSchema);
