'use strict';

var main = require('./main');
var examples = require('./examples/examples');
var grid = require('./examples/grid');
var pagination = require('./examples/pagination');
var account = require('./account/account');
var login = require('./account/login');
var signup = require('./account/signup');
var forgot = require('./account/forgot');
var resetPassword = require('./account/resetPassword');
var blog = require('./blog/blog');
var article = require('./manageblog/article');
var category = require('./manageblog/category');
var label = require('./manageblog/label');
var comment = require('./manageblog/comment');
var resource = require('./manageblog/resource');

var sessionManage = require('../utils/sessionManage');

/**
 * 页面相关路由抽象实现，即访问页面的url
 * 该实现把所有路由的接口都封装到该文件中
 * @example
 app.use('/', index);
 app.use('/example-grid', grid);

 * @module routes
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */

module.exports = function (app) {
  app.use('/', main);
  app.use('/examples', examples);
  app.use('/examples/grid', grid);
  app.use('/examples/pagination', pagination);

  app.use('/login', login);
  app.use('/logout', function (req, res) {
    sessionManage.clearAccountSession(req);
    res.redirect(302, '/');
  });
  app.use('/signup', signup);

  app.use('/forgot', forgot);//忘记用户或密码

  app.use('/resetpassword', resetPassword);//重置密码

  app.use('/terms', function (req, res) {
    res.render('account/terms', {
      title: '注册条款'
    });
  });

  app.use('/about', function (req, res) {
    res.render('about');
  });

  //用 url 变量来区分每个用户的博客，用户注册时不能用项目中存在的链接名称，注册时需要过滤一下，
  //有：examples account login logout signup manage admin terms about
  app.use('/:account', blog);

  app.use('/:account/manage/article', article);// 管理文章
  app.use('/:account/manage/category', category);// 分类目录管理
  app.use('/:account/manage/label', label);// 标签
  app.use('/:account/manage/comment', comment);// 评论
  app.use('/:account/manage/resource', resource);// 资源链接
  app.use('/:account/manage/account', account);// 用户信息

};