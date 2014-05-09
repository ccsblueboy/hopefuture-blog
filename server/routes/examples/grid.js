'use strict';

var demoDao = require('./../../dao/examples/DemoDao.js');
var grid = {
  index: function (req, res) {
    res.render('demo-grid', {
      title: 'This is a Grid Example.',
      navTitle: '例子 -> Grid List'
    });
  },

  list: function (req, res) {
    demoDao.list(function (err, docs) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          items: docs
        });
      }
    });
  },

  save: function (req, res) {
    var data = req.body;
    demoDao.save(data, function (err, doc) {
      if (err) {
        console.error(err);
        res.send({success: false, err: err});
      } else {
        res.send({
          success: true,
          item: doc
        });
      }
    });
  },

  edit: function (req, res) {
    var id = req.params.id;
    demoDao.findById(id, function (err, model) {
      if (err) {
        res.send({success: false});
      } else {
        res.send({
          success: true,
          item: model
        });
      }
    });
  },

  delete: function (req, res) {
    var ids = req.query.ids;// ids is Array
    if(Object.prototype.toString.call(ids) !== '[object Array]'){
      ids = [ids];
    }
    var conditions = { _id: { $in: ids } };
    demoDao.delete(conditions, function (err) {
      res.send({success: err === null});
    });
  }
};

/**
 * 基本Grid 列表 路由
 * 该路由中包含了以下 url

 > 1. grid.index  app.get('/example-grid', grid.index); 显示Grid 首页
 > 2. grid.list app.get('/example-grid/list', grid.list); 获取Grid list 数据
 > 3. grid.save app.post('/example-grid', grid.save); 保存数据
 > 4. grid.edit app.get('/example-grid/:id', grid.edit); 编辑数据
 > 5. grid.delete app.delete('/example-grid', grid.delete); 删除数据（一条或多条）

 * @module grid
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */
module.exports = grid;