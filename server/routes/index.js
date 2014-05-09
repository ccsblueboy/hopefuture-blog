'use strict';

/**
 * 首页路由

 * @module index
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */
exports.index = function(req, res){
  res.render('./index.html', { title: 'Express AngularJS app' });
};