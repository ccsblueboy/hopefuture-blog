'use strict';

angular.module('hopefutureBlogApp')
  .factory('mainService', ['hfbHttpService', function (hfbHttpService) {
    return {
      boutiqueArticle: function (success) {
        hfbHttpService.get('/blog').then(success);
      }
    };
  }]);

