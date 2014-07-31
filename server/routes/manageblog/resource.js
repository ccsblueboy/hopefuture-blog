'use strict';

var resourceDao = require('./../../dao/blog/ResourceDao');
var underscore = require('underscore');

var resource = {
  list: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];

    resourceDao.list(loginName, function (err, resources, categories) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          items: resources,
          categories: categories
        });
      }
    });
  },

  save: function (req, res) {
    var data = req.body;
    var loginName = req.baseUrl.split('/')[1];
    data.account = loginName;

    resourceDao.save(data, function (err, doc) {
      if (err) {
        console.error(err);
        res.send({success: false, err: err});
      } else {
        res.send({
          success: true,
          item: doc
        });
      }
    });
  },

  edit: function (req, res) {
    var id = req.params.id;
    resourceDao.findById(id, function (err, model) {
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
    var ids = req.query.ids;// ids is Array
    if (!underscore.isArray(ids)) {
      ids = [ids];
    }
    var conditions = { _id: { $in: ids } };
    resourceDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  }

};

var express = require('express');
var router = express.Router();

router.get('/', resource.list);
router.post('/', resource.save);
router.get('/:id', resource.edit);
router.delete('/', resource.delete);

/**
 * 资源链接路由
 * @module comment
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-31
 * */

module.exports = router;