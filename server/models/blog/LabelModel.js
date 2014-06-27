'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 文章标签 Schema
 * @type {Schema}
 */
var schema = new Schema({
  name: { type: String },
  accountId: { type: String },
  count: { type: String },//文章使用次数
  createdDate: { type: Date, default: Date.now }
});

/**
 * 文章标签 Model
 * @module LabelModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */
module.exports = mongodb.model('Label', schema);
