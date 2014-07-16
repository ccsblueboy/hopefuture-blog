'use strict';

angular.module('hopefutureBlogApp')
  .factory('hopefutureBlogService', ['hfbHttpService', function (hfbHttpService) {
    return {
      logout: function (success) {
        hfbHttpService.get('logout').then(success);
      }
    };
  }]);

