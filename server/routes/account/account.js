'use strict';

var accountDao = require('../../dao/account/AccountDao');
var DataPage = require('../../utils/DataPage');
var sessionManage = require('../../utils/sessionManage');
var underscore = require('underscore');

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

  changeAccountStatus: function (req, res) {
    var status = req.body.status;
    var ids = req.body.ids;// ids is Array
    if (!underscore.isArray(ids)) {
      ids = [ids];
    }
    var conditions = { _id: { $in: ids } };
    accountDao.changeAccountStatus(conditions, status, function (err) {
      res.send({success: err ? false : true});
    });

  },

  findAccount: function (req, res) {
    var _id = sessionManage.getAccountId(req);
    accountDao.find({_id: _id}, function (err, models) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          account: models[0]
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
      var message = '';
      var success = false;
      if (err) {
        switch (err) {
          case -1:
            message = '该用户不存在！请重新输入';
            break;
          case -2:
            message = '你输入的原密码不正确！请重新输入';
            break;
          default:
            message = err.message;
        }
      } else {
        success = true;
        sessionManage.clearAccountCookie(res);
      }
      res.send({success: success, message: message});
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', account.paging);
router.post('/status', account.changeAccountStatus);
router.get('/info', account.findAccount);
router.post('/', account.update);
router.post('/password', account.updatePassword);

/**
 * 用户信息路由
 * @module account
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-8-29
 * */
module.exports = router;