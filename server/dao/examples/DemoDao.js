'use strict';

function DemoDao(Model) {
  this.model = Model;
}

var DemoModel = require('../../models/examples/DemoModel');
var demoDao = new DemoDao(DemoModel);
module.exports = demoDao;

/**
 * 保存数据
 * @param data
 * @param callback
 */
DemoDao.prototype.save = function (data, callback) {
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

DemoDao.prototype.list = function (callback) {
  this.model.find({}, function (err, docs) {
    return callback(err, docs);
  });
};

/**
 * 分页显示
 * @param dataPage 分页数据
 * @param callback
 */
DemoDao.prototype.pagination = function (dataPage, callback) {
  var skip = dataPage.itemsPerPage * (dataPage.currentPage - 1);
  var limit = dataPage.itemsPerPage;
  var model = this.model;
  model.count({}, function (err, count) {
    if (err === null) {
      model.find({}, null, {skip: skip, limit: limit}, function (err, docs) {
        return callback(err, docs, count);
      });
    }
  });
};

DemoDao.prototype.findById = function (id, callback) {
  this.model.findOne({_id: id}, function (err, model) {
    return callback(err, model);
  });
};

/**
 * 删除记录
 * @param conditions { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
 * @param callback
 */
DemoDao.prototype.delete = function (conditions, callback) {
  var query = this.model.remove(conditions, function (err) {
    return callback(err);
  });
  query.exec();
};