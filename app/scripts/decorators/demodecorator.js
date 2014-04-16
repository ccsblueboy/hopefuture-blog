'use strict';

angular.module('hopefutureBlogApp')
  .config(function ($provide) {
    $provide.decorator('grid', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });
