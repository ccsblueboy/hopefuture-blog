'use strict';

/**
 * 文章分类目录 Controller
 * @class CategoryCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-30
 * */

angular.module('hopefutureBlogApp')
  .controller('CategoryCtrl', function ($scope, $location, $timeout, $sce, blogService) {

    var pathname = window.location.pathname;
    var account = pathname.substring(1);

    var path = $location.path();
    var id = path.substring(path.lastIndexOf('/') + 1);

    blogService.category(account, id, function (data) {
      if (data.success === true) {
        $scope.articles = data.articles;
        $scope.articles.forEach(function(item, index){
          item.content = $sce.trustAsHtml(item.content);
        });
        $scope.category = data.category;
        $timeout(function(){
          SyntaxHighlighter.highlight();
          $scope.showArticleInfo = true;
        },100);
      }
    });

  });