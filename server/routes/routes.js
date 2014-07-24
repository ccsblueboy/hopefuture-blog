'use strict';

var main = require('./main');
var examples = require('./examples/examples');
var grid = require('./examples/grid');
var pagination = require('./examples/pagination');
var account = require('./account/account');
var login = require('./account/login');
var signup = require('./account/signup');
var blog = require('./blog/blog');
var article = require('./manageblog/article');
var category = require('./manageblog/category');
var label = require('./manageblog/label');
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
  app.use('/account', account);
  app.use('/login', login);
  app.use('/logout', function (req, res) {
    sessionManage.clearAccountSession(req);
    res.redirect(302, '/');
  });
  app.use('/signup', signup);

  app.use('/terms', function (req, res) {
    res.render('account/terms', {
      title: '注册条款'
    });
  });

  //用 url 变量来区分每个用户的博客，用户注册时不能用项目中存在的链接名称，注册时需要过滤一下，
  //有：examples account login logout signup manage admin terms
  app.use('/:account', blog);

  app.use('/:account/manage/article', article);// 管理文章
  app.use('/:account/manage/category', category);// 分类目录管理
  app.use('/:account/manage/label', label);// 标签

};