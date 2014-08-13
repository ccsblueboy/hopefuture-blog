'use strict';

/**
 * 文章列表 Controller
 * @class ArticlesCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-23
 * */

angular.module('hopefutureBlogApp')
  .controller('ArticlesCtrl', function ($scope, blogService) {

    var pathname = window.location.pathname;
    var account = pathname.substring(1);

    $scope.page = {currentPage: 1};
    $scope.itemsPerPage = 20;

    /**
     * 加载文章分页列表
     */
    $scope.loadArticles = function () {
      var params = {
        currentPage: $scope.page.currentPage,
        itemsPerPage: $scope.itemsPerPage
      };

      blogService.articles(account, {params: params}, function (data) {
        if (data.success === true) {
          $scope.articles = data.dataPage.items;
          $scope.totalItems = data.dataPage.totalItems;
        }
      });
    };
    $scope.loadArticles();

  });