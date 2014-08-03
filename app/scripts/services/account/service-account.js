'use strict';

angular.module('hopefutureBlogApp')
  .factory('accountService', ['hfbHttpService', function (hfbHttpService) {
    return {
      paging: function (data, success) {
        hfbHttpService.get('manage/account', data).then(success);
      },
      freeze: function (data, success) {
        hfbHttpService.post('manage/account/freeze', data).then(success);
      }
    };
  }]);

