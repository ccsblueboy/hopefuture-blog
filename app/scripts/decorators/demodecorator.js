'use strict';

angular.module('hopefutureBlogApp')
  .config(function ($provide) {
    $provide.decorator('demo', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });
