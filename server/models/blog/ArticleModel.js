'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 文章 Schema
 * @type {Schema}
 */
var schema = new Schema({
  title: { type: String },
  content: { type: String },
  accountId: { type: String },//即作者
  status: { type: String },//文章状态，如发布，草稿等
  commentStatus: { type: String },
  publicityStatus: { type: String },//公开度
  protectedPassword: { type: String },//公开度（密码保护），需输入密码才能查看
  articleLink: { type: String },//文章永久链接，取相对地址
  type: { type: String },//文章类型
  categories: { type: Array },//文章所属分类
  labels: { type: Array },//文章标签
  readCounts: { type: Number },//浏览总数
  commentCounts: { type: Number },//评论总数
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

/**
 * 文章 Model
 * @module ArticleModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */
module.exports = mongodb.model('Article', schema);
