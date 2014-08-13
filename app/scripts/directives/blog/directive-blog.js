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
  })
  //用来统一显示文章相关数据，评论数 标签，分类等
  .directive('articleMeta', function () {
    return {
      restrict: 'AC',
      templateUrl: 'views/templates/article-meta.html',
      link: function(scope, element) {
      }
    };
  });

