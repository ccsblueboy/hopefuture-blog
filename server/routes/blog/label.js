'use strict';

var labelDao = require('./../../dao/blog/LabelDao.js');
var DataPage = require('../../utils/DataPage');
var underscore = require('underscore');

var label = {
  paging: function (req, res) {
    var options = {
      itemsPerPage: req.query.itemsPerPage,
      currentPage: req.query.currentPage
    };
    var dataPage = new DataPage(options);
    var searchContent = req.query.searchContent;

    labelDao.pagination(dataPage, searchContent, function (err, data) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          dataPage: data
        });
      }
    });
  },
  save: function (req, res) {
    var data = req.body;
    if (underscore.isEmpty(data.name)) {
      res.send({success: false, err: '标签名称不能为空！'});
      return;
    }
    labelDao.save(data, function (err, doc) {
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
    labelDao.findById(id, function (err, model) {
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
    if (!underscore.isArray(ids)) {
      ids = [ids];
    }
    var conditions = { _id: { $in: ids } };
    labelDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  },

  /**
   * 校验重名
   * @param req
   * @param res
   */
  duplicate: function (req, res) {
    var name = req.query.name,
      id = req.query.id;
    var conditions = {name: name};
    if (id) {
      conditions._id = { $ne: id };
    }
    labelDao.find(conditions, function (err, model) {
      if (err) {
        res.send(false);
      } else {
        res.send(model.length === 0);
      }
    });
  },

  /**
   * 返回常用的标签
   * @param req
   * @param res
   */
  frequentList: function (req, res) {
    var num = req.params.num;
    labelDao.frequentList(num, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          items: docs
        });
      } else {
        res.send({success: false});
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', label.paging);
router.post('/', label.save);
router.get('/:id', label.edit);
router.delete('/', label.delete);
router.get('/validate/duplicate', label.duplicate);
router.get('/records/frequent', label.frequentList);//常用的分类

/**
 * 标签路由
 * @module label
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-11
 * */

module.exports = router;