'use strict';

angular.module('hopefutureBlogApp').directive('protectedValidator', function () {
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
})//用来统一显示文章相关数据，评论数 标签，分类等
  .directive('articleMeta', function () {
    return {
      restrict: 'AC',
      templateUrl: 'views/templates/article-meta.html',
      link: function (scope, element) {
      }
    };
  })//用来处理文章目录指令
  .directive('generateCatalogue', ['$timeout', 'scrollSpy', function ($timeout, scrollSpy) {
    return {
      restrict: 'AC',
      link: function (scope, element) {
        var catalogueHtml = scope.article.catalogueHtml;//目录
        var catalogueContent = scope.article.catalogueContent;//内容
        var html = '<div class="article-content">';
        html += catalogueContent + '</div>';
        html += '<div class="article-catalogue sr-only">';
        html += '<div class="article-catalogue-header"><span class="glyphicon glyphicon-list"></span></div>';
        html += catalogueHtml + '</div>';
        element.append(html);

        $(window).off('scroll.catalogue').on('scroll.catalogue', function () {
          var $aside = $('.article-aside-panel');
          var contentBottom = $aside.offset().top + $aside.outerHeight();
          var scrollTop = $(window).scrollTop();
          var $catalogue = $('.article-catalogue');
          if (scrollTop + 70 > contentBottom) {
            $catalogue.removeClass('sr-only');
          } else {
            $catalogue.addClass('sr-only');
            $catalogue.find('.nav').show();
          }
        });

        element.find('.glyphicon').click(function (e) {
          $(e.target).parent().next().toggle();
        });

        $timeout(function () {
          scrollSpy.loadScroll($('body'), {
            offset: 70,
            target: '.article-catalogue'
          });
        });
      }
    };
  }]);