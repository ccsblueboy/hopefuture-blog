'use strict';

/**
 * 文章 Controller
 * @class ArticleCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-23
 * */

angular.module('hopefutureBlogApp')
  .controller('ArticleCtrl', function ($scope, $location, blogService) {

    var pathname = window.location.pathname;
    var account = pathname.substring(1);
    var absUrl = $location.absUrl();
    var articleIdReg = /\/\w+$/;

    $scope.articleLink = absUrl;
    //文章相关信息
    $scope.article = {};
    $scope.comments = [];
    $scope.prevArticle = undefined;
    $scope.nextArticle = undefined;
    $scope.relatedArticle = [];

    var path = $location.path();

    var id = path.substring(path.lastIndexOf('/') + 1);
    blogService.articleInfo(account, id, function (data) {
      if (data.success === true) {
        $scope.article = data.articleInfo.article;
        $scope.comments = data.articleInfo.comments;
        if (data.articleInfo.prevArticle) {
          $scope.prevArticle = data.articleInfo.prevArticle;
          $scope.prevArticle.articleLink = absUrl.replace(articleIdReg, '/' + $scope.prevArticle._id);
        }

        if (data.articleInfo.nextArticle) {
          $scope.nextArticle = data.articleInfo.nextArticle;
          $scope.nextArticle.articleLink = absUrl.replace(articleIdReg, '/' + $scope.nextArticle._id);
        }

        $scope.relatedArticle = data.articleInfo.relatedArticle;
        angular.forEach(function (item) {
          item.articleLink = absUrl.replace(articleIdReg, '/' + item._id);
        });
      }
    });

  });