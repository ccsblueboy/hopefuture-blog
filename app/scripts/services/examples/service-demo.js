'use strict';

angular.module('hopefutureBlogApp')
  .factory('demoService', ['hfbHttpService', function (hfbHttpService) {
    return {
      list: function (config, success) {
        hfbHttpService.get('', config).then(success);
      },
      addOrUpdate : function(config, success){
        hfbHttpService.post('examples', config).then(success);
      }
    };
  }]);

