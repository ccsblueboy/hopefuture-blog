'use strict';

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

var AccountModel = require('../../models/account/AccountModel');
var accountDao = new AccountDao(AccountModel);

module.exports = accountDao;

/**
 * 保存数据，包括添加和修改
 * @method
 * @param data {AccountModel} AccountModel 实例
 * @param callback {function}回调函数
 */
AccountDao.prototype.save = function (data, callback) {
  if (data._id) {
    var update = {
      title: data.title,
      content: data.content,
      updatedDate: new Date()
    };
    this.model.update({_id: data._id}, update, function (err, numberAffected, rawResponse) {
      return callback(err, {updatedDate: update.updatedDate});
    });
  } else {
    var entity = new this.model(data);
    //当有错误发生时，返回err；product 是返回生成的实体，numberAffected which will be 1 when the document was found and updated in the database, otherwise 0.
    entity.save(function (err, product, numberAffected) {
      return callback(err, product._doc);
    });
  }
};

/**
 * 返回数据列表
 * @method
 * @param callback {function} 回调函数
 */
AccountDao.prototype.list = function (callback) {
  this.model.find({}, function (err, docs) {
    return callback(err, docs);
  });
};

/**
 * 分页显示
 * @method
 * @param dataPage {DataPage} 分页数据
 * @param callback {function} 回调函数
 */
AccountDao.prototype.pagination = function (dataPage, callback) {
  var skip = dataPage.itemsPerPage * (dataPage.currentPage - 1);
  var limit = dataPage.itemsPerPage;
  var model = this.model;
  model.count({}, function (err, count) {
    if (err === null) {
      dataPage.setTotalItems(count);
      model.find({}, null, {skip: skip, limit: limit}, function (err, docs) {
        dataPage.setItems(docs);
        return callback(err, dataPage);
      });
    }
  });
};

/**
 * 根据id查询数据
 * @method
 * @param id {String} 主键
 * @param callback {function} 回调函数
 */
AccountDao.prototype.findById = function (id, callback) {
  this.model.findOne({_id: id}, function (err, model) {
    return callback(err, model);
  });
};

/**
 * 删除记录
 * @method
 * @param conditions { Object }
 * 要删除数据的条件，例如：{ field: { $n: [<value1>, <value2>, ... <valueN> ] } }
 * @param callback {function} 回调函数
 */
AccountDao.prototype.delete = function (conditions, callback) {
  this.model.remove(conditions, function (err) {
    return callback(err);
  });
};

/**
 * 保存分页数据
 * @method
 * @param data  {AccountModel} AccountModel 实例
 * @param callback  {function} 回调函数
 */
AccountDao.prototype.savePagination = function (data, callback) {
  if (data._id) {
    var update = {
      title: data.title,
      content: data.content,
      updatedDate: new Date()
    };
    this.model.update({_id: data._id}, update, function (err, numberAffected, rawResponse) {
      return callback(err, {updatedDate: update.updatedDate});
    });
  } else {
    var entity = new this.model(data);
    //当有错误发生时，返回err；product 是返回生成的实体，numberAffected which will be 1 when the document was found and updated in the database, otherwise 0.
    entity.save(function (err, product, numberAffected) {
      return callback(err);
    });
  }
};

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
  var model = this.model;

  var promise = model.findOne({loginName: loginName}).exec();
  promise.then(function (login) {
    if (login) {
      return model.findOne({loginName: loginName, password: password}).exec();
    } else {
      callback(-1);
    }
  }).then(function (login) {
    if (login) {
      callback(1, login);
    } else {
      callback(-2);
    }
  });
};
