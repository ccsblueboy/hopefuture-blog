'use strict';

angular.module('hopefutureBlogApp')
  .directive('resourceValidator', function () {
    return {
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        $(element).validate({
          submitHandler: function () {
            scope.$apply(function () {
              scope.save();
            });
          }
        });
      }
    };
  });


