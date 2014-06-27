'use strict';

var labelDao = require('./../../dao/blog/LabelDao.js');

var label = {
  list: function (req, res) {
    labelDao.list(function (err, docs) {
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

router.get('/', label.list);

/**
 * 标签路由
 * @module label
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-25
 * */

module.exports = router;