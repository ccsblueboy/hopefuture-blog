var mongoose = require('mongoose');
var config = require('./config');// 主要这里需要加上路径 ./ ，如果require('config')是找不到 config 的
var mongodb = mongoose.createConnection(config.connectionurl);

mongodb.on('error', function (err) {
  console.error('connect to %s error: ', config.connectionurl, err.message);
  console.error.bind(console, 'connection error.');
  process.exit(1);
});
mongodb.once('open', function () {
  //log.success('%s has been connected.', config.connectionurl);
});

module.exports = mongodb;