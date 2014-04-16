'use strict';

var demoDao = require('./../../dao/examples/DemoDao.js');
var grid = {
  index: function (req, res) {
    res.render('demo-grid', {
      title: 'This is a Grid Example.',
      navTitle: '例子 -> Grid List'
    });
  },

  list: function (req, res) {
    demoDao.list(function (err, docs) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          items: docs
        });
      }
    });
  },

  save: function (req, res) {
    var data = req.body;
    demoDao.save(data, function (err, doc) {
      if (err) {
        console.error(err);
        res.send({success: false, err: err});
      } else {
        res.send({
          success: true,
          item: doc
        });
      }
    });
  },

  edit: function (req, res) {
    var id = req.params.id;
    demoDao.findById(id, function (err, model) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          item: model
        });
      }
    });
  },
  delete: function (req, res) {
    var ids = req.query.ids;// ids is Array
    if(Object.prototype.toString.call(ids) !== '[object Array]'){
      ids = [ids];
    }
    var conditions = { _id: { $in: ids } };
    demoDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  }
};

module.exports = grid;