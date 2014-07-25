'use strict';

angular.module('hopefutureBlogApp')
  .factory('blogService', ['hfbHttpService', function (hfbHttpService) {
    return {
      blog: function (account, success) {
        hfbHttpService.get(account + '/blog').then(success);
      },

      articles: function (account, data, success) {
        hfbHttpService.get(account + '/articles', data).then(success);
      },

      articleInfo: function (account, id, success) {
        hfbHttpService.get(account + '/article/' + id).then(success);
      },

      comment: function (account, data, success) {
        hfbHttpService.post(account + '/comment', data).then(success);
      }
    };
  }]);
