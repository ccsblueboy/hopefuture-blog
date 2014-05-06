'use strict';

angular.module('hopefutureBlogApp')
  .filter('truncate', function () {
    return function (input, length) {
      return input.length > length ? input.substring(0, length) : input;
    };
  });