'use strict';

var demoDao = require('./../../dao/examples/DemoDao.js');
var demo = {
  index: function (req, res) {
    res.render('demo', { title: 'This is an Example.'});
  },

  list: function (req, res) {
    demoDao.list(function (err, obj) {
      res.send(obj);
    });
  },

  add: function (req, res) {
    demoDao.add(function (err, obj) {
      res.send(obj);
    });
  },
  update: function (req, res) {
    demoDao.update(function (err, obj) {
      res.send(obj);
    });
  },
  view: function (req, res) {
    demoDao.view(function (err, obj) {
      res.send(obj);
    });
  }
};

module.exports = demo;