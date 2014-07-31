'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 文章其他字段 Schema
 * 主要记录文章被浏览的次数
 * 根据 ip 来确认其浏览次数
 * @type {Schema}
 */
var schema = new Schema({
  articleID: { type: String },
  readCounts: { type: Number },//浏览总数
  ip: { type: String },//评论者IP
  browserAgent: { type: String }//评论者 浏览器 Agent
});

/**
 * 文章其他字段 Schema
 * @module ArticleMetaModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-31
 * */
module.exports = mongodb.model('ArticleMeta', schema);
