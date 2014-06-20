'use strict';

var blog = {
  index: function (req, res) {
    res.render('blog/blog', {
      title: '我的博客首页'
    });
  },
  manage: function (req, res) {
    res.render('blog/manage-blog', {
      title: '管理我的博客'
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', blog.index);
router.get('/manage', blog.manage);

module.exports = router;