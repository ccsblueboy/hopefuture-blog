'use strict';

/**
 * 创建 Article Dao 用来操作 ArticleModel，实现数据的增删改查等功能
 * @module ArticleDao
 * @class
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */
function ArticleDao(Model) {
  this.model = Model;
}

var ArticleModel = require('../../models/blog/ArticleModel');
var articleDao = new ArticleDao(ArticleModel);
module.exports = articleDao;

var labelDao = require('./LabelDao');
var categoryDao = require('./CategoryDao');
var underscore = require('underscore');


/**
 * 保存数据，包括添加和修改
 * @method
 * @param data {ArticleModel} ArticleModel 实例
 * @param callback {function}回调函数
 */
ArticleDao.prototype.save = function (data, callback) {
  if (data._id) {
    var model = this.model;
    var promise = model.findById(data._id).exec();
    promise.then(function (doc) {
      if (doc) {
        //分类
        var categories = doc.categories;
        var copyCat = underscore.clone(data.categories);
        var _categories = [];
        var i, len, index;
        for (i = 0, len = categories.length; i < len; i++) {
          index = copyCat.indexOf(categories[i]);
          if (index === -1) {
            _categories.push({
              _id: categories[i],
              increase: false
            });
          } else {
            copyCat.splice(index, 1);
          }
        }
        for (i = 0, len = copyCat.length; i < len; i++) {
          _categories.push({
            _id: copyCat[i],
            increase: true
          });
        }

        //标签
        var labels = doc.labels;
        var copyLabels = underscore.clone(data.labels);
        var _labels = [];
        for (i = 0, len = labels.length; i < len; i++) {
          index = copyLabels.indexOf(labels[i]);
          if (index === -1) {
            _labels.push({
              name: labels[i],
              increase: false
            });
          } else {
            copyLabels.splice(index, 1);
          }
        }
        for (i = 0, len = copyLabels.length; i < len; i++) {
          _labels.push({
            name: copyLabels[i],
            increase: true
          });
        }

        categoryDao.updateCount(_categories, function (err) {
          if (err) {
            return callback(err);
          }
          labelDao.update(data.account, _labels, function (err) {
            if (err) {
              return callback(err);
            }
            data.updatedDate = new Date();
            model.update({_id: data._id}, data, function (err, numberAffected, rawResponse) {
              return callback(err);
            });
          });
        });
      } else {
        callback('operate error！');
      }
    });
  } else {
    var entity = new this.model(data);
    //这里应该用异步添加的方式实现
    //先保存添加的标签
    labelDao.update(data.account, data.labels, function (err) {
      if (err) {
        return callback(err);
      }
      categoryDao.updateCount(data.categories, function (err) {
        if (err) {
          return callback(err);
        }
        entity.save(function (err, product, numberAffected) {
          if (err) {
            return callback(err);
          } else {
            return callback(err, product._doc._id);
          }
        });
      });
    });
  }
};

/**
 * 分页显示
 * @method
 * @param loginName {String} 账户登录名
 * @param dataPage {DataPage} 分页数据
 * @param callback {function} 回调函数
 */
ArticleDao.prototype.pagination = function (loginName, dataPage, callback) {
  var skip = dataPage.itemsPerPage * (dataPage.currentPage - 1);
  var limit = dataPage.itemsPerPage;
  var model = this.model;
  model.count({}, function (err, count) {
    if (err === null) {
      dataPage.setTotalItems(count);
      model.find({account: loginName}, {_id: 1, title: 1, status: 1, articleLink: 1, categories: 1, labels: 1, readCounts: 1, commentCounts: 1, createdDate: 1},
        {skip: skip, limit: limit}, function (err, docs) {
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
ArticleDao.prototype.findById = function (id, callback) {
  this.model.findById(id, function (err, model) {
    return callback(err, model);
  });
};

/**
 * 删除记录
 * @method
 * @param loginName {String} 账户登录名
 * @param conditions { Object }
 * 要删除数据的条件，例如：{ field: { $n: [<value1>, <value2>, ... <valueN> ] } }
 * @param callback {function} 回调函数
 */
ArticleDao.prototype.delete = function (loginName, conditions, callback) {
  var model = this.model;

  model.find(conditions, {categories: 1, labels: 1}, function (err, docs) {
    var _categories = [], _labels = [];
    var i, j, lenI, lenJ;
    for (i = 0, lenI = docs.length; i < lenI; i++) {
      for (j = 0, lenJ = docs[i].categories.length; j < lenJ; j++) {
        _categories.push({
          _id: docs[i].categories[j],
          increase: false
        });
      }
      for (j = 0, lenJ = docs[i].labels.length; j < lenJ; j++) {
        _labels.push({
          name: docs[i].labels[j],
          increase: false
        });
      }
    }

    categoryDao.updateCount(_categories, function (err) {
      if (err) {
        return callback(err);
      }
      labelDao.update(loginName, _labels, function (err) {
        if (err) {
          return callback(err);
        }
        model.remove(conditions, function (err) {
          return callback(err);
        });
      });
    });
  });
};