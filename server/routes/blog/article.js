'use strict';

var articleDao = require('./../../dao/blog/ArticleDao.js');
var DataPage = require('../../utils/DataPage');

var article = {

  paging: function (req, res) {
    var options = {
      itemsPerPage: req.query.itemsPerPage,
      currentPage: req.query.currentPage
    };
    var dataPage = new DataPage(options);
    articleDao.pagination(dataPage, function (err, data) {
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
    articleDao.save(data, function (err, doc) {
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
    articleDao.findById(id, function (err, model) {
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
    articleDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', article.paging);
router.post('/', article.save);
router.get('/:id', article.edit);
router.delete('/', article.delete);

/**
 * 文章管理路由
 * @module article
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */

module.exports = router;