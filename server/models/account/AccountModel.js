'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 账户 Schema
 * 用mongodb 脚本创建，命令如下：
 * db.createCollection("accounts")
 * db.accounts.save({"loginName":"admin","password":"admin1"})
 * @type {Schema}
 */
var schema = new Schema({
  loginName: { type: String },
  name: { type: String },
  password: { type: String },
  email: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

/**
 * 创建账户 Model
 * @module AccountModel
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-9
 * */
module.exports = mongodb.model('Account', schema);
