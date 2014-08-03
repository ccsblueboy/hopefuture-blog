'use strict';

var accountDao = require('../../dao/account/AccountDao');
var DataPage = require('../../utils/DataPage');

var account = {
  paging: function (req, res) {
    var options = {
      itemsPerPage: req.query.itemsPerPage,
      currentPage: req.query.currentPage
    };
    var dataPage = new DataPage(options);
    var searchContent = req.query.searchContent;

    accountDao.pagination(dataPage, searchContent, function (err, data) {
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

  freeze: function (req, res) {
    var id = req.params.id;
    accountDao.findById(id, function (err, model) {
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

  findAccountByLoginName: function (req, res) {
    var loginName = req.params.loginName;
    accountDao.findOne({loginName: loginName}, function (err, model) {
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

  update: function (req, res) {
    var data = req.body;
    accountDao.update(data, function (err) {
      if (err) {
        res.send({success: false, err: err});
      } else {
        res.send({
          success: true
        });
      }
    });
  },


  updatePassword: function (req, res) {
    var data = req.body;
    accountDao.updatePassword(data, function (err) {
      res.send({success: err === null});
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', account.paging);
router.post('/freeze', account.freeze);
router.get('/:loginName', account.findAccountByLoginName);
router.post('/', account.update);
router.post('/password/:id', account.updatePassword);

/**
 * 用户信息路由
 * @module account
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-8-29
 * */
module.exports = router;