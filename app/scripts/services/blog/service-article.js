'use strict';

angular.module('hopefutureBlogApp')
  .factory('articleService', ['hfbHttpService', function (hfbHttpService) {
    return {
      paging: function (data, success) {
        hfbHttpService.get('manage/article', data).then(success);
      },
      save: function (data, success) {
        hfbHttpService.post('manage/article', data).then(success);
      },
      edit: function (id, success) {
        hfbHttpService.get('manage/article/' + id).then(success);
      },

      'delete': function (data, success) {
        hfbHttpService.delete('manage/article', data).then(success);
      }
    };
  }]);

