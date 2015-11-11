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
    /*request.defaults({jar: true});//开启 Cookies

     //获取登录webflow
     request.get('http://passport.csdn.net/account/login',function(err, httpResponse, body){
     if(err){
     res.write('登录失败！');
     res.end();
     }else{*/
    /*var $ = cheerio.load(body);
     var $form = $('#fm1');*/
    var loginForm = {
      username: 'linder1223',
      password: 'linder584452',
      _eventId: 'submit'
    };
    loginForm.lt = 'LT-32793-D3MaIbdGE19zgl2IOBk72FGfduZBhR';//$form.find('[name="lt"]').val();
    loginForm.execution = 'e4s1';// $form.find('[name="execution"]').val();
    //登录
    request.post('http://passport.csdn.net/account/login',
      {
        form: loginForm,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,zh;q=0.8',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          //'Content-Length': 131,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'JSESSIONID=7F17FC20FE62CCEBDE8891CFC8E2343C.tomcat3; uuid_tt_dd=564921062011389625_20151028; __message_district_code=000000; __gads=ID=0e00f328122a614e:T=1447136924:S=ALNI_MaSxrVgOhBM0k8AwlT7b4jsmS3qHQ; JSESSIONID=7F17FC20FE62CCEBDE8891CFC8E2343C.tomcat3; UN=linder1223; UE=""; _gat=1; __message_sys_msg_id=0; __message_gu_msg_id=0; __message_cnel_msg_id=0; __message_in_school=0; _ga=GA1.2.1597852103.1447136174; dc_tos=nxn21g; dc_session_id=1447225108357',
          'Host': 'passport.csdn.net',
          'Origin': 'http://passport.csdn.net',
          'Referer': 'http://passport.csdn.net/account/login',
          'Upgrade-Insecure-Requests': 1,
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
        }


      }, function (err, httpResponse, body) {
        if (err) {
          res.write('登录失败！');
          res.end();
        } else {
          //提交数据
          //新增
          var url = 'http://write.blog.csdn.net/postedit?edit=1&joinblogcontest=undefined&r=0.5822820197790861';
          //var url = 'http://write.blog.csdn.net/postedit/49762895?edit=1&joinblogcontest=undefined&r=0.7527074210811406';
          var formData = {
            titl: '文章四',
            typ: 1,
            cont: '文章四',
            desc: '',
            tags: 'Web',
            flnm: '',
            chnl: 14,
            comm: 2,
            level: 0,
            tag2: '',
            artid: 0,
            checkcode: '',
            userinfo1: 59,
            stat: 'draft'
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
    /*}

     });*/

  }
};

var express = require('express');
var router = express.Router();

router.get('/obtain', capture.obtain);
router.post('/transmit', capture.transmit);
router.get('/request', capture.request);
router.get('/formdata', capture.formData);

module.exports = router;