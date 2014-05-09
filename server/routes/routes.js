'use strict';

var index = require('./index');
var grid = require('./examples/grid');
var pagination = require('./examples/pagination');

/**
 * 页面相关路由抽象实现，即访问页面的url
 * 该实现把所有路由的接口都封装到该文件中
 * @example
 * 首页的路由
 app.get('/', index.index);
 app.get('/example-grid', grid.index);

 * @module routes
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */

module.exports = function (app) {
  app.get('/', index.index);

  app.get('/examples',function(req, res){
    res.render('./examples.html');
  });
  //没有分页 Grid 路由
  app.get('/example-grid', grid.index);
  app.get('/example-grid/list', grid.list);
  app.post('/example-grid', grid.save);
  app.get('/example-grid/:id', grid.edit);
  app.delete('/example-grid', grid.delete);

  //Pagination Grid 路由
  app.get('/example-pagination', pagination.index);
  app.get('/example-pagination/paging', pagination.paging);
  app.post('/example-pagination', pagination.save);
  app.get('/example-pagination/:id', pagination.edit);
  app.delete('/example-pagination', pagination.delete);
};