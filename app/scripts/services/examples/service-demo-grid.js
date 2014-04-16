'use strict';

angular.module('hopefutureBlogApp')
  .factory('demoGridService', ['hfbHttpService', function (hfbHttpService) {
    return {
      list: function (success) {
        hfbHttpService.get('example-grid/list').then(success);
      },
      save: function (data, success) {
        hfbHttpService.post('example-grid', data).then(success);
      },
      edit: function (id, success) {
        hfbHttpService.get('example-grid/' + id).then(success);
      },

      'delete': function (data, success) {
        hfbHttpService.delete('example-grid', data).then(success);
      }
    };
  }]);

