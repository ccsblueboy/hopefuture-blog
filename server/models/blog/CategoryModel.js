'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 文章分类目录 Schema
 * 在命令窗口插入一条记录
 * db.categories.save({"name":"meifenlei",level:0,createDate:new Date()})
 * @type {Schema}
 */
var schema = new Schema({
  name: { type: String },
  description: { type: String },
  parent: { type: String },
  level: { type: Number },
  createdDate: { type: Date, default: Date.now }
});

/**
 * 文章分类目录 Model
 * @module CategoryModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */
module.exports = mongodb.model('Category', schema);