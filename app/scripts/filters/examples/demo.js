'use strict';

angular.module('hopefutureBlogApp')
  .filter('grid', function () {
    return function (input) {
      return 'grid filter: ' + input;
    };
  });
