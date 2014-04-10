var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  id: { type: Schema.ObjectId },
  title: { type: String },
  content: { type: String },
  createdDate: { type: Date, default: Date.now },
  createdBy: String,
  updatedDate: { type: Date, default: Date.now },
  updatedBy: String
});

mongoose.model('Blog', schema);
