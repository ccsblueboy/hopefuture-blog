'use strict';

/**
 * 创建 Category Dao 用来操作 Category Model，实现数据的增删改查等功能
 * @module CategoryDao
 * @class
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-19
 * */
function CategoryDao(Model) {
  this.model = Model;
}

var mongoose = require('mongoose');
var CategoryModel = require('../../models/blog/CategoryModel');
var categoryDao = new CategoryDao(CategoryModel);

module.exports = categoryDao;

/**
 * 保存数据，包括添加和修改
 * 执行后返回所有列表，如果影响性能的话，直接返回其添加或修改的数据
 * @method
 * @param data {CategoryModel} CategoryModel 实例
 * @param callback {function}回调函数
 */
CategoryDao.prototype.save = function (data, callback) {
  var self = this;
  if (data._id) {
    var update = {
      name: data.name,
      parent: data.parent === undefined ? null : data.parent,
      description: data.description
    };
    this.model.update({_id: data._id}, update, function (err, numberAffected, rawResponse) {
      if (err) {
        return callback(err);
      } else {
        self.model.find({}, {_id: 1, name: 1, parent: 1}).sort({_id: 1})
            .exec(function (err, docs) {
              return callback(err, docs);
            });
      }
    });
  } else {
    var entity = new this.model(data);
    //当有错误发生时，返回err；product 是返回生成的实体，numberAffected which will be 1 when the document was found and updated in the database, otherwise 0.
    entity.save(function (err, product, numberAffected) {
      if (err) {
        return callback(err);
      } else {
        self.model.find({}, {_id: 1, name: 1, parent: 1}).sort({_id: 1})
            .exec(function (err, docs) {
              return callback(err, docs);
            });
      }
    });
  }
};

/**
 * 返回数据列表
 * @method
 * @param callback {function} 回调函数
 */
CategoryDao.prototype.list = function (callback) {
  this.model.find({}, {_id: 1, name: 1, parent: 1}).sort({_id: 1})
      .exec(function (err, docs) {
        return callback(err, docs);
      });
};

/**
 * 根据id查询数据
 * @method
 * @param id {String} 主键
 * @param callback {function} 回调函数
 */
CategoryDao.prototype.findById = function (id, callback) {
  this.model.findById(id, function (err, model) {
    return callback(err, model);
  });
};

/**
 * 删除记录
 * 该 方法有问题，主要处理 循环回调的问题，待解决
 * @method
 * @param items { Array } 要删除记录数组，包括主键 _id 和 parent
 * @param callback {function} 回调函数
 */
CategoryDao.prototype.delete = function (items, callback) {
  //要删除数据的条件，例如：{ field: { $n: [<value1>, <value2>, ... <valueN> ] } }
  var ids = [], i, len = items.length, item;
  for (i = 0; i < len; i++) {
    ids.push(JSON.parse(items[i])._id);
  }
  var conditions = { _id: { $in: ids } };

  var model = this.model;
  this.model.remove(conditions, function (err) {
    if (err) {
      return callback(err);
    }
    //var promise = new mongoose.Promise();
    for (i = 0; i < len; i++) {
      item = JSON.parse(items[i]);
      model.update({parent: item._id}, { parent: item.parent || null },function (err) {
        //promise.resolve(err);
      });
    }
    //promise.then(function(){
      model.find({}, {_id: 1, name: 1, parent: 1}).sort({_id: 1})
          .exec(function (err, docs) {
            return callback(err, docs);
          });
    //});
  });
};

/**
 * 根据给定的条件查询记录
 * @param conditions {Object} 条件
 * @param callback {function} 回调函数
 */
CategoryDao.prototype.find = function (conditions, callback) {
  this.model.find(conditions, function (err, model) {
    return callback(err, model);
  });
};