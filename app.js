/**
 * 模块依赖
 * Module dependencies.
 */

var express = require('express');
var routes = require('./server/routes');
var user = require('./server/routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();

// all environments
// 环境变量
app.set('port', process.env.PORT || 3000);
//让ejs模板改为扩展名为html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

//设置多个 static-files ，这样在加载的时候就可以不用书写public和components
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/components')));

// development only
if ('development' === app.get('env')) {
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
} else {
  app.set('views', __dirname + '/dist');
  app.use(express.static(path.join(__dirname, 'dist')));
}

//定义路由
app.get('/', routes.index);
app.get('/users', user.list);

module.exports = app;

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
