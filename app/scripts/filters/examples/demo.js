'use strict';

angular.module('hopefutureBlogApp')
  .filter('demo', function () {
    return function (input) {
      return 'demo filter: ' + input;
    };
  });
