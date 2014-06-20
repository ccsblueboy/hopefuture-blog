'use strict';

angular.module('hopefutureBlogApp')
  .config(function ($provide) {
    $provide.decorator('myDecorator', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });
