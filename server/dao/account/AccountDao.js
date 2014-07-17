'use strict';

/**
 * 加密算法
 * @type {hash}
 */
var hash = require('../../utils/passwordCrypto').hash;

/**
 * 创建 Account Dao 用来操作 AccountModel，实现数据的增删改查等功能
 * @module AccountDao
 * @class
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-9
 * */
function AccountDao(Model) {
  this.model = Model;
}

/**
 * 判断登录名和密码是否正确
 * 采用异步回调处理同步 Promise
 * http://mongoosejs.com/docs/api.html#promise_Promise
 * @param data
 * @param callback
 */
AccountDao.prototype.findByLoginNameAndPassword = function (data, callback) {
  var loginName = data.loginName,
    password = data.password;

  this.model.findOne({loginName: loginName}, function (err, login) {
    if (login) {
      hash(password, login.salt, function (err, hash) {
        if (err) {
          return callback(-2);
        }
        if (hash === login.hashPassword) {
          return callback(1, login);
        } else {//密码不正确
          return callback(-2);
        }
      });
    } else {//登录名不正确
      return callback(-1);
    }
  });
};

/**
 * 注册用户
 * @method
 * @param data {AccountModel} AccountModel 实例
 * @param callback {function}回调函数
 */
AccountDao.prototype.signup = function (data, callback) {
  var password = data.password;
  delete data.password;

  var model = this.model;
  hash(password, function (err, salt, hash) {
    if (err) {
      return callback(err);
    }
    data.salt = salt;
    data.hashPassword = hash;

    var entity = new model(data);
    //当有错误发生时，返回err；product 是返回生成的实体，numberAffected which will be 1 when the document was found and updated in the database, otherwise 0.
    entity.save(function (err, product, numberAffected) {
      return callback(err);
    });
  });
};

/**
 * 根据给定的条件查询记录
 * @param conditions {Object} 条件
 * @param callback {function} 回调函数
 */
AccountDao.prototype.find = function (conditions, callback) {
  this.model.find(conditions, function (err, model) {
    return callback(err, model);
  });
};

var AccountModel = require('../../models/account/AccountModel');
var accountDao = new AccountDao(AccountModel);
module.exports = accountDao;