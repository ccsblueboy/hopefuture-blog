'use strict';

var accountDao = require('./../../dao/account/AccountDao.js');
var account = {
  index: function (req, res) {
    res.render('account/signup', {
      title: '注册页面'
    });
  },
  signup: function (req, res) {
    var data = req.body;
    accountDao.signup(data, function (err) {
      res.send({success: err === null});
    });
  },

  /**
   * 校验重名
   * 需要过滤掉以下用户
   * [examples account login logout signup manage admin]
   * @param req
   * @param res
   */
  duplicate: function (req, res) {
    var loginName = req.query.loginName;
    var filters = ['examples', 'account', 'login', 'logout', 'signup', 'manage', 'admin'];
    if (filters.indexOf(loginName) !== -1) {
      res.send(false);
      return;
    }
    var conditions = {loginName: loginName};
    accountDao.find(conditions, function (err, model) {
      if (err) {
        res.send(false);
      } else {
        res.send(model.length === 0);
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', account.index);
router.post('/', account.signup);
router.get('/validate/duplicate', account.duplicate);

module.exports = router;