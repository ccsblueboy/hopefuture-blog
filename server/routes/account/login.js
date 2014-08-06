'use strict';

var accountDao = require('./../../dao/account/AccountDao.js');
var sessionManage = require('../../utils/sessionManage');

var account = {
  index: function (req, res) {
    res.render('login', {
      title: '登录页面'
    });
  },
  login: function (req, res) {
    var data = req.body;
    accountDao.findByLoginNameAndPassword(data, function (err, doc) {
      var message = '';
      var success = false;
      switch (err) {
        case -1:
          message = '该用户不存在！请重新输入';
          break;
        case -2:
          message = '你输入的密码不正确！请重新输入';
          break;
        case -3:
          message = '该用户没有激活！';
          break;
        default:
          sessionManage.setAccountSession(req, {
            _id: doc._id,
            loginName: doc.loginName
          });
          success = true;
          break;
      }
      res.send({success: success, message: message});
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', account.index);
router.post('/', account.login);

module.exports = router;