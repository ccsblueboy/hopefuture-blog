'use strict';

/**
 * 创建 Comment Dao 用来操作 CommentModel，实现数据的增删改查等功能
 * @module CommentDao
 * @class
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-25
 * */
function CommentDao(Model) {
  this.model = Model;
}

var CommentModel = require('../../models/blog/CommentModel');
var commentDao = new CommentDao(CommentModel);
var moment = require('moment');

module.exports = commentDao;

/**
 * 保存数据，包括添加和修改
 * @method
 * @param data {CommentModel} CommentModel 实例
 * @param callback {function}回调函数
 */
CommentDao.prototype.save = function (data, callback) {
  var model = this.model;
  if (data._id) {
    var update = {
    };
    model.update({_id: data._id}, update, function (err, numberAffected, rawResponse) {
      return callback(err);
    });
  } else {
    var promise = model.findOne({articleID: data.articleID, content: data.content}, {_id: 1}).exec();
    promise.then(function (comment) {
      if (comment) {
        return callback('9005');
      }

      //同一篇文章同一个 ip 两次评论间隔不能小于30秒，防止灌水
      //FIXME 关于防止灌水的算法待修改
      var date = moment().add('s', -30).toDate();
      return model.findOne({articleID: data.articleID, ip: data.ip, createdDate: { $gt: date}}, {_id: 1}).exec();
    }).then(function (comment) {
      if (comment) {
        return callback('9004');
      }
      var entity = new model(data);
      //当有错误发生时，返回err；product 是返回生成的实体，numberAffected which will be 1 when the document was found and updated in the database, otherwise 0.
      entity.save(function (err, product, numberAffected) {
        return callback(err, product._doc);
      });
    }).then(null, function (err) {
      return callback(err);
    });
  }
};

/**
 * 返回数据列表
 * @method
 * @param callback {function} 回调函数
 */
CommentDao.prototype.list = function (callback) {
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
CommentDao.prototype.pagination = function (dataPage, callback) {
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
CommentDao.prototype.findById = function (id, callback) {
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
CommentDao.prototype.delete = function (conditions, callback) {
  this.model.remove(conditions, function (err) {
    return callback(err);
  });
};
