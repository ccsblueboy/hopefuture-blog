'use strict';

var mongoose = require('mongoose');
var config = require('./config');// 主要这里需要加上路径 ./ ，如果require('config')是找不到 config 的
var mongodb = mongoose.createConnection(config.connectionurl);

/**
 * 当连接出错时的处理
 */
mongodb.on('error', function (err) {
  console.error('connect to %s error: ', config.connectionurl, err.message);
  console.error.bind(console, 'connection error.');
  process.exit(1);
});

/**
 * 当打开数据库的操作
 */
mongodb.once('open', function () {
  //log.success('%s has been connected.', config.connectionurl);
});

/**
 * mongodb 连接数据库对象
 * @module mongodb
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-8
 * */
module.exports = mongodb;