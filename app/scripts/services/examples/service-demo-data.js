'use strict';

angular.module('hopefutureBlogApp')
  .factory('demoDataService', ['hfbHttpService', function (hfbHttpService) {
    return {
      mongodump: function (success) {
        hfbHttpService.get('data/mongodump').then(success);
      },

      mongorestore: function (success) {
        hfbHttpService.get('data/mongorestore').then(success);
      }
    };
  }]);

