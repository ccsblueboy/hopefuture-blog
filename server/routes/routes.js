'use strict';

var index = require('./index');
var examples = require('./examples/examples');
var grid = require('./examples/grid');
var pagination = require('./examples/pagination');

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
  app.use('/', index);
  app.use('/examples', examples);
  app.use('/example-grid', grid);
  app.use('/example-pagination', pagination);
};