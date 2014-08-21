'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 博客相关数据 Schema
 * 主要用来初始化博客相关数据、打补丁等信息
 * @type {Schema}
 */
var schema = new Schema({
  code: { type: String },//代码
  val: { type: String },//值
  description: { type: String },//描述
  createdDate: { type: Date, default: Date.now }
});

/**
 * 博客相关数据 Model
 * @module BlogModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-8-21
 * */
module.exports = mongodb.model('Blog', schema);
