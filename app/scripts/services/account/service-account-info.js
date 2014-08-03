'use strict';

angular.module('hopefutureBlogApp')
  .factory('accountInfoService', ['hfbHttpService', function (hfbHttpService) {
    return {
      update: function (data, success) {
        hfbHttpService.post('manage/account', data).then(success);
      },
      updatePassword: function (data, success) {
        hfbHttpService.post('manage/account/password', data).then(success);
      }
    };
  }]);

