'use strict';

var index = require('./index');
var user = require('./user');
var grid = require('./examples/grid');
var pagination = require('./examples/pagination');

module.exports = function (app) {
  app.get('/', index.index);
  app.get('/users', user.list);

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