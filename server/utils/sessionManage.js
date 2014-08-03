/**
 * Created by linder on 2014/7/17.
 */

'use strict';

/**
 * 用来动态管理 session 数据
 * @type {{setAccountSession: setAccountSession, getAccountSession: getAccountSession, clearAccountSession: clearAccountSession, isLogined: isLogined}}
 */
var sessionManage = {
  /**
   * 设置用户session
   * @param req
   * @param account
   */
  setAccountSession: function (req, account) {
    req.session.account = account;
  },

  /**
   * 返回用户session
   * 统一返回 null
   * @param req
   * @returns {account|*|$scope.account}
   */
  getAccountSession: function (req) {
    if(req.session.account === undefined){
      return null;
    }
    return req.session.account;
  },

  /**
   * 返回账户id
   * @param req
   * @returns {*}
   */
  getAccountId: function (req) {
    return req.session.account ? req.session.account._id : null;
  },

  /**
   * 清空用户session
   * @param req
   */
  clearAccountSession: function (req) {
    req.session.account = null;
  },

  /**
   * 判断用户是否登录
   * @param req
   * @returns {boolean}
   */
  isLogined: function (req) {
    return req.session.account ? true : false;
  },

  /**
   * 判断用户是否登录
   * @param req
   * @returns {boolean}
   */
  isAdministrator: function (req) {
    var account = req.session.account;
    return account ? account.loginName === 'administrator' : false;
  }
};

module.exports = sessionManage;