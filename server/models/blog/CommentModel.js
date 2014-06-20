'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 文章评论 Schema
 * @type {Schema}
 */
var schema = new Schema({
  articleID: { type: String },
  accountId: { type: String },
  accountEmail: { type: String },
  accountIP: { type: String },
  content: { type: String },
  browserAgent: { type: String },//浏览器 Agent
  commentParent: { type: String },//所属父评论，默认为0
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

/**
 * 文章评论 Model
 * @module CommentModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */
module.exports = mongodb.model('Comment', schema);
