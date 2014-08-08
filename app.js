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
var sessionManage = require('./server/utils/sessionManage');
var encryption = require('./server/utils/passwordCrypto').encryption;
var config = require('./server/config');

var accountDao = require('./server/dao/account/AccountDao');
var accountMetaDao = require('./server/dao/account/AccountMetaDao');

var app = express();

//让ejs模板改为扩展名为html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(config.cookieSecret));

// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: config.sessionSecret
}));

/**
 * 用户是否设置了自动登录，
 * 如果自动登录，先从cookie中取信息，再设置session
 */
app.use(function (req, res, next) {
  if (sessionManage.isStaticResource(req)) {
    next();
  } else {
    var loginName = req.cookies.loginName,
      password = req.cookies.password,
      key = req.cookies.key;
    if (loginName && password && key) {
      key = key.replace(/hfblog/g, '=');
      loginName = encryption.decrypt(key, loginName);
      password = encryption.decrypt(key, password);
      accountDao.findByLoginNameAndPassword({loginName: loginName, password: password}, function (err, doc) {
        if (err === 1) {
          sessionManage.setAccountSession(req, {
            _id: doc._id,
            loginName: doc.loginName
          });
        }
        next();
      });
    } else {
      next();
    }
  }
});

/**
 * 拦截器，当用户没有登录时，访问后台相关链接跳转到登录页面
 * 当路径中包含 manage 时，表示是访问的后台链接
 */
app.use(function (req, res, next) {
  if (sessionManage.isStaticResource(req)) {
    next();
  } else {
    var account = sessionManage.getAccountSession(req);
    var path = req.path;
    if (/\/\w+\/manage($|\/)/.test(path)) {
      if (account === null) {
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {//Ajax请求
          res.send({
            success: false,
            errorCode: '9001',
            errorMessage: errorCodes['9001']
          });
        } else {
          //必须显式的设置 301 重定向，如 res.redirect('/login'); 只会把地址输入到页面，还需手工点击，不信你试试？
          //设置为 301 firefox 有问题，这里设为 302
          res.redirect(302, '/login');
        }
      } else {
        var loginName = req.path.split('/')[1];
        if (account.loginName !== loginName) {//非法操作
          if (req.headers.xrequestedwith === 'XMLHttpRequest') {
            res.send({
              success: false,
              errorCode: '9002',
              errorMessage: errorCodes['9002']
            });
          } else {
            res.render('errors/illegal');
          }
        } else {
          next();
        }
      }
    } else {
      next();
    }
  }
});

// 判断是否登录并设置登录信息
app.use(function (req, res, next) {
  if (sessionManage.isStaticResource(req)) {
    next();
  } else {
    var account = sessionManage.getAccountSession(req);
    res.locals.logined = account ? true : false;
    res.locals.loginName = account ? account.loginName : '';
    res.locals.administrator = account ? account.loginName === 'administrator' : false;//是否是管理员

    //设置用户主题
    var theme = req.cookies.theme;
    if (theme) {
      res.locals.theme = theme;
      next();
    } else {
      var loginName = req.baseUrl.split('/')[1];
      if (config.accountFilters.indexOf(loginName)) {//系统存在的链接路径
        res.locals.theme = config.defaultTheme;
        next();
      } else {//从数据库中查找，看是否之前设置过
        accountMetaDao.findTheme({loginName: loginName}, function (err, themeCode) {
          if (!err && themeCode) {
            res.locals.theme = themeCode;
          } else {
            res.locals.theme = config.defaultTheme;
          }
          next();
        });
      }
    }
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
  res.render('errors/error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
