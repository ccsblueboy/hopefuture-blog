/**
 * 模块依赖
 * Module dependencies.
 */

var express = require('express');
var routes = require('./server/routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var routes = require('./server/routes/routes');
var app = express();

// all environments
// 环境变量
app.set('port', process.env.PORT || 9000);
//让ejs模板改为扩展名为html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'app') }));

//app.set('env', 'production');
// development only
if ('development' === app.get('env')) {
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
} else {
  app.set('views', __dirname + '/webapp');
  app.use(express.static(path.join(__dirname, 'webapp')));
}

//定义路由
routes(app);

module.exports = app;

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
