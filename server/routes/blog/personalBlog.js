'use strict';

var articleDao = require('./../../dao/blog/ArticleDao');
var DataPage = require('../../utils/DataPage');
var accountDao = require('./../../dao/account/AccountDao');
var sessionManage = require('./../../utils/sessionManage');
var commentDao = require('./../../dao/blog/CommentDao');
var resourceDao = require('./../../dao/blog/ResourceDao');

/**
 * 个人博客相关route
 *
 */
var personalBlog = {
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

    commentDao.comment(comment, function (err, data) {
      if (err) {
        res.send({
          success: false,
          errMessage: err.message
        });
      } else {
        res.send({
          success: true,
          comment: data
        });
      }
    });
  },

  archive: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    var month = req.params.month;
    articleDao.archive(loginName, month, function (err, articles) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        res.send({
          success: true,
          articles: articles
        });
      }
    });
  },

  category: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    var id = req.params.id;
    articleDao.category(loginName, id, function (err, articles, category) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        res.send({
          success: true,
          articles: articles,
          category: category
        });
      }
    });
  },

  label: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    var id = req.params.id;
    articleDao.label(loginName, id, function (err, articles, label) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        res.send({
          success: true,
          articles: articles,
          label: label
        });
      }
    });
  },

  resource: function (req, res) {
    var loginName = req.baseUrl.split('/')[1];
    resourceDao.resourceList(loginName, function (err, resources) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        var _resources = [];
        if (resources.length > 0) {
          var categoryId = resources[0].categoryId;
          var category = {
            categoryName: resources[0].categoryName,
            categoryResources: []
          };
          _resources.push(category);
          resources.forEach(function (item) {
            if (item.categoryId !== categoryId) {
              category = {
                categoryName: item.categoryName,
                categoryResources: []
              };
              category.categoryResources.push(item);
              _resources.push(category);
              categoryId = item.categoryId;
            } else {
              category.categoryResources.push(item);
            }
          });
        }
        res.send({
          success: true,
          resources: _resources
        });
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/', personalBlog.index);//我的博客首页
router.get('/manage', personalBlog.manage);//管理我的博客，需要登录
router.get('/blog', personalBlog.blog);//获取博客相关数据
router.get('/articles', personalBlog.articles);//文章列表
router.get('/article/:articleId', personalBlog.article);//文章相关信息
router.post('/comment', personalBlog.comment);//发表评论
router.get('/archive/:month', personalBlog.archive);//文章归档
router.get('/category/:id', personalBlog.category);//分类目录文章列表
router.get('/label/:id', personalBlog.label);//标签文章列表
router.get('/resource', personalBlog.resource);//标签文章列表

module.exports = router;