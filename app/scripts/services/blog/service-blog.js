'use strict';

angular.module('hopefutureBlogApp')
  .factory('blogService', ['hfbHttpService', function (hfbHttpService) {
    return {
      blog: function (account, success) {
        hfbHttpService.get(account + '/blog').then(success);
      },

      articles: function (account, data, success) {
        hfbHttpService.get(account + '/articles', data).then(success);
      }
    };
  }]);
