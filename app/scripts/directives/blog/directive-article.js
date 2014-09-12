'use strict';

angular.module('hopefutureBlogApp')
  .directive('protectedValidator', function () {
    return {
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        $(element).validate({
          rules: {
            protectedPassword: {
              remote: {
                url: scope.account + '/article/' + scope.articleId + '/password',
                type: 'get',
                dataType: 'json'
              }
            }
          },
          messages: {
            protectedPassword: {
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
  })
  //用来统一显示文章相关数据，评论数 标签，分类等
  .directive('articleMeta', function () {
    return {
      restrict: 'AC',
      templateUrl: 'views/templates/article-meta.html',
      link: function (scope, element) {
      }
    };
  });

