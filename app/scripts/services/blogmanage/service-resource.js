'use strict';

angular.module('hopefutureBlogApp')
  .factory('resourceService', ['hfbHttpService', function (hfbHttpService) {
    return {
      list: function (success) {
        hfbHttpService.get('manage/resource').then(success);
      },
      save: function (data, success) {
        hfbHttpService.post('manage/resource', data).then(success);
      },
      edit: function (id, success) {
        hfbHttpService.get('manage/resource/' + id).then(success);
      },
      'delete': function (data, success) {
        hfbHttpService.delete('manage/resource', data).then(success);
      },
      saveCategory: function (data, success) {
        hfbHttpService.post('manage/resource/category', data).then(success);
      },
      deleteCategory: function (data, success) {
        hfbHttpService.delete('manage/resource/category', data).then(success);
      }
    };
  }]);

