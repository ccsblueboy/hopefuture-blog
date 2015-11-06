'use strict';

var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

var config = require('../../config');

router.get('/', function (req, res) {
  res.render('examples/examples');
});

router.get('/data', function (req, res) {
  res.render('examples/data');
});

/**
 * 数据导出
 * mongodump -h localhost:27017 -d hfblog -o D:\gitworkspace\hopefuture-blog\data\mongodb
 */
router.get('/data/mongodump', function (req, res) {
  var mongodb = config.mongodb;
  var command = 'mongodump';
  var args = ['-h', mongodb.host + ':' + mongodb.port, '-d', mongodb.database, '-o', mongodb.dataPath];
  if (mongodb.user) {
    args.push('-u', mongodb.user);
  }
  if (mongodb.pass) {
    args.push('-p', mongodb.pass);
  }
  var mongodump = spawn(command, args);
  mongodump.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });
  mongodump.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
    res.send({
      success: false
    });
  });
  mongodump.on('exit', function (code) {
    console.log('mongodump exited with code ' + code);
    res.send({
      success: true
    });
  });
});


/**
 * 数据导入
 * mongorestore -h localhost:27017 -d hfblog  D:\gitworkspace\hopefuture-blog\data\mongodb\hfblog --drop
 */
router.get('/data/mongorestore', function (req, res) {
  var mongodb = config.mongodb;
  var command = 'mongorestore';
  var args = ['-h', mongodb.host + ':' + mongodb.port, '-d', mongodb.database, mongodb.dataPath + '/' + mongodb.database, '--drop'];
  if (mongodb.user) {
    args.push('-u', mongodb.user);
  }
  if (mongodb.pass) {
    args.push('-p', mongodb.pass);
  }

  var mongorestore = spawn(command, args);
  mongorestore.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });
  mongorestore.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
  mongorestore.on('exit', function (code) {
    console.log('mongodump exited with code ' + code);
  });
  res.send({
    success: true
  });
});

/**
 * 例子路由
 * @module examples
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */
module.exports = router;
