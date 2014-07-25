'use strict';

angular.module('hopefutureBlogApp')
  .directive('commentValidator', function ($parse) {
    return {
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        var validator = $(element).validate();
        var model = $parse(attrs.commentValidator);
        model.assign(scope, validator);
      }
    };
  });

