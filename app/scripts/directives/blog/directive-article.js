'use strict';

angular.module('hopefutureBlogApp')
  .directive('protectedValidator', function () {
    return {
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        $(element).validate({
          rules: {
            name: {
              remote: {
                url: scope.account + '/article/' + scope.articleId + '/password',
                type: 'get',
                dataType: 'json'
              }
            }

      },
          messages: {
            name: {
              remote: '你输入的密码错误！'
            }
          },
          submitHandler: function () {
            scope.$apply(function () {
              scope.viewArticle();
            });
          }
        });
      }
    };
  });

