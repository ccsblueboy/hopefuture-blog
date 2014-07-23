'use strict';

var articleDao = require('./../../dao/blog/ArticleDao.js');
var DataPage = require('../../utils/DataPage');
var accountDao = require('./../../dao/account/AccountDao.js');

var blog = {
  index: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    accountDao.find({loginName: loginName, activated: true}, function (err, docs) {
      if (err || docs == null || docs.length === 0) {
        res.render('errors/invalid');
      } else {
        res.render('blog/blog', {
          title: '我的博客首页'
        });
      }
    });
  },

  manage: function (req, res) {
    res.render('blog/manage-blog', {
      title: '管理我的博客'
    });
  },

  blog: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    //以下会设置其他条件，比如栏目，标签等，待实现
    articleDao.findBlogData(loginName, function (err, data) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        res.send({
          success: true,
          blogData: data
        });
      }
    });
  },

  articles: function (req, res) {
    var options = {
      itemsPerPage: req.query.itemsPerPage,
      currentPage: req.query.currentPage
    };
    var loginName = req.baseUrl.split('/')[1];
    var dataPage = new DataPage(options);
    articleDao.list(loginName, dataPage, function (err, data) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          dataPage: data
        });
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', blog.index);
router.get('/manage', blog.manage);
router.get('/blog', blog.blog);
router.get('/articles', blog.articles);

module.exports = router;