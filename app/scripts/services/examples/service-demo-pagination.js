'use strict';

angular.module('hopefutureBlogApp')
  .factory('demoPaginationService', ['hfbHttpService', function (hfbHttpService) {
    return {
      paging: function (data, success) {
        hfbHttpService.get('example-pagination/paging', data).then(success);
      },
      save: function (data, success) {
        hfbHttpService.post('example-pagination', data).then(success);
      },
      edit: function (id, success) {
        hfbHttpService.get('example-pagination/' + id).then(success);
      },

      'delete': function (data, success) {
        hfbHttpService.delete('example-pagination', data).then(success);
      }
    };
  }]);

