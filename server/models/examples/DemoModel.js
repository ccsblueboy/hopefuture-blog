var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: { type: String },
  content: { type: String },
  createdDate: { type: Date, default: Date.now },
  createdBy: String,
  updatedDate: { type: Date, default: Date.now },
  updatedBy: String
});

// 创建 Model
module.exports = mongodb.model('Demo', schema);
