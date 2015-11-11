'use strict';

var BufferHelper = require('../../utils/bufferHelper');
var iconv = require('iconv-lite');//解决编码转换模块
var url = require('url');//引用url模块，处理url地址相关操作
var http = require('http');
var request = require('request');
var cheerio = require('cheerio'); //引用cheerio模块,使在服务器端像在客户端上操作DOM,不用正则表达式

//加载第三方页面
function download(url, callback) {
  http.get(url, function (res) {
    var bufferHelper = new BufferHelper();//解决中文编码问题
    res.on('data', function (chunk) {
      bufferHelper.concat(chunk);
    });
    res.on('end', function () {
      //注意，此编码必须与抓取页面的编码一致，否则会出现乱码，也可以动态去识别
      var val = iconv.decode(bufferHelper.toBuffer(), 'utf-8');
      callback(val);
    });
  }).on('error', function () {
    callback(null);
  });
}

//抓取数据
var capture = {
  //从第三方网页获取数据
  obtain: function (req, res) {
    var arg = url.parse(req.url, true).query;    //通过调用url模块，获取查询字符串参数集合
    var link = arg.link;    //获取抓取的link
    var callback = arg.callback;    //回调函数的名称
    //若没有对link加上http，则补全
    var protocol = 'http';
    if (link.indexOf('http') < 0) {
      link = protocol + '://' + link;
    }
    //抓取页面
    download(link, function (data) {
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
        'Transfer-Encoding': 'chunked'
      });

      var doc = data.toString();
      if (callback) {
        res.write(callback + '(' + doc + ')');
      }
      else {
        res.write(doc);
      }
      res.end();
    });
  },

  //往第三方中写数据
  transmit: function (req, res) {
    var formData = {
      titl: '测试',
      typ: '1',
      cont: '随碟附送地方',
      desc: '',
      tags: 'Web',
      flnm: '',
      chnl: '14',
      comm: '2',
      level: '0',
      tag2: '',
      artid: '0',
      checkcode: '',
      userinfo1: '59',
      stat: 'draft'
    };
    http.post(url, function (res) {
      var bufferHelper = new BufferHelper();//解决中文编码问题
      res.on('data', function (chunk) {
        bufferHelper.concat(chunk);
      });
      res.on('end', function () {
        //注意，此编码必须与抓取页面的编码一致，否则会出现乱码，也可以动态去识别
        var val = iconv.decode(bufferHelper.toBuffer(), 'utf-8');
        //callback(val);
      });
    }).on('error', function () {
      //callback(null);
    });
  },

  request: function (req, res) {
    var arg = url.parse(req.url, true).query;//通过调用url模块，获取查询字符串参数集合
    var link = arg.link;    //获取抓取的link
    var callback = arg.callback;    //回调函数的名称
    //若没有对link加上http，则补全
    var protocol = 'http';
    if (link.indexOf('http') < 0) {
      link = protocol + '://' + link;
    }
    //抓取页面
    request(link, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8',
          'Transfer-Encoding': 'chunked'
        });

        if (callback) {
          res.write(callback + '(' + body + ')');
        }
        else {
          res.write(body);
        }
        res.end();
      }
    });
  },

  formData: function (req, res) {
    request.defaults({jar: true});//开启 Cookies
    /*jshint -W106*/
    /*jshint -W069*/
    //获取登录authenticity_token
    request.get('http://www.iteye.com/login', function (err, httpResponse, body) {
      if (err) {
        res.write('登录失败！');
        res.end();
      } else {
        var $ = cheerio.load(body);
        var $form = $('#login_form');
        var loginForm = {
          name: 'linder0209',
          password: 'linder%*$$52',
          remember_me: '1',
          button: '登　录'
        };
        loginForm['authenticity_token'] = $form.find('[name="authenticity_token"]').val();
        //登录
        request.post('http://www.iteye.com/login', {form: loginForm,}, function (err, httpResponse, body) {
          if (err) {
            res.write('登录失败！');
            res.end();
          } else {
            //提交数据
            //新增
            var url = 'http://linder0209.iteye.com/admin/blogs';
            //var url = 'http://write.blog.csdn.net/postedit/49762895?edit=1&joinblogcontest=undefined&r=0.7527074210811406';
            var formData = {
              authenticity_token: 'qGaulRjPJjiuf/gygyvBB+3opN/S8x27J8LeG6vzpUs=',
              blog: {
                blog_type: 0,
                whole_category_id: 2,
                title: '测试我的blo3333g3',
                bbcode: false,
                body: '<div class="iteye-blog-content-contain" style="font-size: 14px"><p>测试我的blog3</p></div>',
                tag_list: '',
                diggable: 0
              },
              topic: {
                forum_id: ''
              },
              commit: '发布'
            };

            request.post({url: url, form: formData}, function (err, httpResponse, body) {
              if (err) {
                res.write('提交form表单数据出错！');
              }
              else {
                res.write('提交form表单数据成功！');
              }
              res.end();
            });
          }
        });
      }

    });

  }
};

var express = require('express');
var router = express.Router();

router.get('/obtain', capture.obtain);
router.post('/transmit', capture.transmit);
router.get('/request', capture.request);
router.get('/formdata', capture.formData);

module.exports = router;