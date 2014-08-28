'use strict';

angular.module('hopefutureBlogApp').factory('blogService', ['hfbHttpService', function (hfbHttpService) {
    return {
      //个人博客相关数据
      blog: function (account, success) {
        hfbHttpService.get(account + '/blog').then(success);
      },
      //所有文章列表，分页显示
      articles: function (account, data, success) {
        hfbHttpService.get(account + '/articles', data).then(success);
      },
      //文章信息
      articleInfo: function (account, id, data, success) {
        hfbHttpService.get(account + '/article/' + id, data).then(success);
      },
      //提交评论
      comment: function (account, data, success) {
        hfbHttpService.post(account + '/comment', data).then(success);
      },
      //文章归档
      archive: function (account, month, success) {
        hfbHttpService.get(account + '/archive/' + month).then(success);
      },
      //分类目录文章列表
      category: function (account, id, success) {
        hfbHttpService.get(account + '/category/' + id).then(success);
      },
      //标签文章列表
      label: function (account, id, success) {
        hfbHttpService.get(account + '/label/' + id).then(success);
      },
      //资源链接列表
      resource: function (account, success) {
        hfbHttpService.get(account + '/resource').then(success);
      }
    };
  }])
  // 用SyntaxHighlighter 格式化代码
  .factory('syntaxHighlighter', function () {
    var pathCtx = '';
    function path() {
      var args = arguments, result = [];
      for (var i = 0; i < args.length; i++){
        result.push(args[i].replace('@', pathCtx));
      }
      return result;
    }

    return {
      format: function (ctx) {
        pathCtx = ctx;
        SyntaxHighlighter.autoloader.apply(null, path(
          'applescript @shBrushAppleScript.js',
          'actionscript3 as3 @shBrushAS3.js',
          'bash shell @shBrushBash.js',
          'coldfusion cf @shBrushColdFusion.js',
          'cpp c @shBrushCpp.js',
          'c# c-sharp csharp @shBrushCSharp.js',
          'css @shBrushCss.js',
          'delphi pascal @shBrushDelphi.js',
          'diff patch pas @shBrushDiff.js',
          'erl erlang @shBrushErlang.js',
          'groovy @shBrushGroovy.js',
          'java @shBrushJava.js',
          'jfx javafx @shBrushJavaFX.js',
          'js jscript javascript @shBrushJScript.js',
          'perl pl @shBrushPerl.js',
          'php @shBrushPhp.js',
          'text plain @shBrushPlain.js',
          'py python @shBrushPython.js',
          'powershell ps posh @shBrushPowerShell.js',
          'ruby rails ror rb @shBrushRuby.js',
          'sass scss @shBrushSass.js',
          'scala @shBrushScala.js',
          'sql @shBrushSql.js',
          'vb vbnet @shBrushVb.js',
          'xml xhtml xslt html @shBrushXml.js'
        ));
        SyntaxHighlighter.all();
      }
    };
  });



