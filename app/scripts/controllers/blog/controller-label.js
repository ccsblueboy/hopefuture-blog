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
  .controller('LabelCtrl', function ($scope, $location, $timeout, $sce, blogService) {

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
        $scope.articles.forEach(function(item, index){
          item.content = $sce.trustAsHtml(item.content);
        });
        $scope.label = data.label;
        $timeout(function(){
          SyntaxHighlighter.all();
          $scope.showArticleInfo = true;
        },100);
      }
    });

  });