'use strict';

var main = require('./main');
var examples = require('./examples/examples');
var grid = require('./examples/grid');
var pagination = require('./examples/pagination');
var account = require('./account/account');
var login = require('./account/login');
var blog = require('./blog/blog');
var article = require('./blog/article');
var category = require('./blog/category');
var label = require('./blog/label');

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
  //用 url 变量来区分每个用户的博客
  app.use('/:blog', blog);

  app.use('/:blog/manage/article',article);// 管理文章
  app.use('/:blog/manage/category',category);// 分类目录管理
  app.use('/:blog/manage/label',label);// 标签

};