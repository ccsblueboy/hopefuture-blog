'use strict';

angular.module('hopefutureBlogApp')
  .factory('blogService', ['hfbHttpService', function (hfbHttpService) {
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
  }]);
