'use strict';

angular.module('hopefutureBlogApp')
  .filter('truncate', function () {
    return function (input, length) {
      if(input){
        return input.length > length ? input.substring(0, length) : input;
      }
      return '';
    };
  });