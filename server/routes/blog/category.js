'use strict';

var categoryDao = require('./../../dao/blog/CategoryDao.js');
var category = {

  list: function (req, res) {
    categoryDao.list(function (err, docs) {
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
    categoryDao.save(data, function (err, doc) {
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
    categoryDao.findById(id, function (err, model) {
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
    categoryDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', category.list);
router.post('/', category.save);
router.get('/:id', category.edit);
router.delete('/', category.delete);

/**
 * 分类目录路由
 * @module category
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-19
 * */

module.exports = router;