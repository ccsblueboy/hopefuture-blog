'use strict';

var articleDao = require('./../../dao/blog/ArticleDao');
var DataPage = require('../../utils/DataPage');
var accountDao = require('./../../dao/account/AccountDao');
var sessionManage = require('./../../utils/sessionManage');
var commentDao = require('./../../dao/blog/CommentDao');

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
  },

  article: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    var articleId = req.params.articleId;
    articleDao.articleInfo(loginName, articleId, function (err, data) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        // 如果登陆，设置用户信息
        var account = sessionManage.getAccountSession(req);
        if (account) {
          data.account = {
            commentator: account.loginName,
            email: account.email
          };
        }
        res.send({
          success: true,
          articleInfo: data
        });
      }
    });
  },

  comment: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    var comment = req.body;
    comment.account = loginName;
    comment.browserAgent = req.headers['user-agent'];
    comment.ip = req._remoteAddress;

    commentDao.save(comment, function (err, data) {
      if (err) {
        res.send({
          success: false,
          errMessage: err
        });
      } else {
        res.send({
          success: true,
          comment: data
        });
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', blog.index);//我的博客首页
router.get('/manage', blog.manage);//管理我的博客，需要登录
router.get('/blog', blog.blog);//获取博客相关数据
router.get('/articles', blog.articles);//文章列表
router.get('/article/:articleId', blog.article);//文章相关信息
router.post('/comment', blog.comment);//发表评论

module.exports = router;