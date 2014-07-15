'use strict';

/**
 * 依赖模块
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./server/routes/routes');
var session = require('express-session');
var errorCodes = require('./server/utils/errorCodes');

var app = express();

//让ejs模板改为扩展名为html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

/**
 * 拦截器，当用户没有登录时，访问后台相关链接跳转到登录页面
 * 当路径中包含 manage 时，表示是访问的后台链接
 */
app.use(function (req, res, next) {
  var session = req.session;
  var path = req.path;
  if (path.indexOf('/manage') !== -1 && session.loginName == null) {
    if(req.headers.xrequestedwith === 'XMLHttpRequest'){
      res.send({
        success: false,
        errorCode: errorCodes['9001']
      });
    }else{
      //必须显式的设置 301 重定向，如 res.redirect('/login'); 只会把地址输入到页面，还需手工点击，不信你试试？
      //设置为 301 firefox 有问题，这里设为 302
      res.redirect(302, '/login');
    }
  } else {
    next();
  }
});

//定义路由
routes(app);

var environment = 'development';
app.set('env', environment);
// development only
if ('development' === app.get('env')) {
  app.set('views', path.join(__dirname, 'app'));
  app.use(express.static(path.join(__dirname, 'app')));
} else {
  app.set('views', path.join(__dirname, 'webapp'));
  app.use(express.static(path.join(__dirname, 'webapp')));
}


/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
