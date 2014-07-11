'use strict';

var categoryDao = require('./../../dao/blog/CategoryDao.js');
var underscore = require('underscore');

function setItemLevel(docs) {
  /**
   * 递归设置节点 level
   * @param item
   * @param map
   * @returns {*}
   */
  var setLevel = function (item, map) {
    if (!item.parent) {
      return 0;
    }
    var level = item.level;
    if (level !== undefined) {
      return level;
    } else {
      level = setLevel(map[item.parent], map);
      item.level = level + 1;
      return level + 1;
    }
  };

  // 给数据加上level
  var i, len = docs.length, item, map = {}, items = [];
  for (i = 0; i < len; i++) {
    var doc = docs[i]._doc;
    item = {
      _id: doc._id,
      name: doc.name,
      count: doc.count,
      parent: doc.parent
    };
    items.push(item);
    map[doc._id] = item;
  }
  for (i = 0; i < len; i++) {
    item = items[i];
    if (item.level === undefined) {
      item.level = setLevel(item, map);
    }
  }
  return items;
}

var category = {

  list: function (req, res) {
    categoryDao.list(null, function (err, docs) {
      if (!err) {
        var items = setItemLevel(docs);
        res.send({
          success: true,
          items: items
        });
      } else {
        res.send({success: false});
      }
    });
  },

  query: function (req, res) {
    var searchContent = req.query.searchContent;
    categoryDao.list(searchContent, function (err, docs) {
      if (!err) {
        var items = setItemLevel(docs);
        res.send({
          success: true,
          items: items
        });
      } else {
        res.send({success: false});
      }
    });
  },

  save: function (req, res) {
    var data = req.body;
    if (underscore.isEmpty(data.name)) {
      res.send({success: false, err: '分类名称不能为空！'});
      return;
    }
    categoryDao.save(data, function (err, docs) {
      if (err) {
        console.error(err);
        res.send({success: false, err: err});
      } else {
        var items = setItemLevel(docs);
        res.send({
          success: true,
          items: items
        });
      }
    });
  },

  edit: function (req, res) {
    var id = req.params.id;
    categoryDao.findById(id, function (err, model) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          item: model
        });
      }
    });
  },

  delete: function (req, res) {
    var items = req.query.items;// items is Array
    if (!underscore.isArray(items)) {
      items = [items];
    }
    categoryDao.delete(items, function (err, docs) {
      if (err) {
        console.error(err);
        res.send({success: false, err: err});
      } else {
        var newItems = setItemLevel(docs);
        res.send({
          success: true,
          items: newItems
        });
      }
    });
  },

  /**
   * 校验重名
   * @param req
   * @param res
   */
  duplicate: function (req, res) {
    var name = req.query.name,
      parent = req.query.parent === '' ? null : req.query.parent,
      id = req.query.id;
    var conditions = {name: name, parent: parent};
    if (id) {
      conditions._id = { $ne: id };
    }
    categoryDao.find(conditions, function (err, model) {
      if (err) {
        res.send(false);
      } else {
        res.send(model.length === 0);
      }
    });
  },

  /**
   * 返回常用的分类目录列表
   * @param req
   * @param res
   */
  frequentList: function (req, res) {
    var num = req.params.num;
    categoryDao.frequentList(num, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          items: docs
        });
      } else {
        res.send({success: false});
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', category.list);
router.post('/', category.save);
router.get('/:id', category.edit);
router.delete('/', category.delete);
router.get('/validate/duplicate', category.duplicate);
router.get('/records/frequent', category.frequentList);//常用的分类
router.get('/records/query', category.query);//常用的分类

/**
 * 分类目录路由
 * @module category
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-19
 * */

module.exports = router;