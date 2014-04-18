'use strict';

var demoDao = require('./../../dao/examples/DemoDao.js');
var DataPage = require('../../utils/DataPage');

var pagination = {
  index: function (req, res) {
    res.render('demo-pagination', {
      title: 'This is a Pagination Example.',
      navTitle: '例子 -> 分页显示Grid'
    });
  },

  paging: function (req, res) {
    var options = {
      itemsPerPage: req.query.itemsPerPage,
      currentPage: req.query.currentPage
    };
    var dataPage = new DataPage(options);
    demoDao.pagination(dataPage, function (err, data) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          dataPage : data
        });
      }
    });
  },

  save: function (req, res) {
    var data = req.body;
    demoDao.savePagination(data, function (err, doc) {
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
    if (Object.prototype.toString.call(ids) !== '[object Array]') {
      ids = [ids];
    }
    var conditions = { _id: { $in: ids } };
    demoDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  }
};

module.exports = pagination;