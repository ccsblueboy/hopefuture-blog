'use strict';

/**
 * 标签 Controller
 * @class LabelCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-30
 * */

angular.module('hopefutureBlogApp')
  .controller('LabelCtrl', function ($scope, $location, $timeout, blogService, syntaxHighlighter) {

    var pathname = window.location.pathname;
    var account = pathname.substring(1);

    /**
     * 加载文章归档列表
     */
    var path = $location.path();
    var id = path.substring(path.lastIndexOf('/') + 1);

    blogService.label(account, id, function (data) {
      if (data.success === true) {
        $scope.articles = data.articles;
        $scope.label = data.label;
        $timeout(function(){
          syntaxHighlighter.autoLoader($scope.development === true ? '/bower_components/SyntaxHighlighter/scripts/' : '/scripts/syntaxHighlighter/');
          $scope.showArticleInfo = true;
        },100);
      }
    });

  });