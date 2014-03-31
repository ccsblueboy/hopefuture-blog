var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  id: { type: Schema.ObjectId },
  title: { type: String },
  content: { type: String },
  created_date: { type: Date, default: Date.now },
  created_by: String,
  updated_date: { type: Date, default: Date.now },
  updated_by: String
});

mongoose.model('Blog', schema);
