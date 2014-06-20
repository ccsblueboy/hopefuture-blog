'use strict';

/**
 * 文章管理 Controller
 * @class ArticleCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */

angular.module('hopefutureBlogApp')
  .controller('ArticleCtrl', function ($scope, $modal, articleService) {
    //初始化记录
    $scope.items = [];
    $scope.grid = {
      checked: false
    };

    $scope.page = {currentPage: 1};
    $scope.maxSize = 5;
    $scope.itemsPerPage = 10;

    $scope.loadPageData = function () {
      var params = {
        currentPage: $scope.page.currentPage,
        itemsPerPage: $scope.itemsPerPage
      };

      articleService.paging({params: params}, function (data) {
        if (data.success === true) {
          $scope.items = data.dataPage.items;
          $scope.totalItems = data.dataPage.totalItems;
        }
      });
    };

    $scope.loadPageData();

    $scope.create = function () {
    };

    $scope.edit = function (id, index) {
    };

    $scope.delete = function (item) {
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: '../views/templates/confirmModal.html',
        controller: 'ConfirmModalCtrl'
      });
      modalInstance.result.then(function () {
        demoPaginationService.delete({params: {ids: [item._id]}}, function (data) {
          if (data.success === true) {
            $scope.loadPageData();
          }
        });
      });
    };

    $scope.deleteAll = function () {
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: '../views/templates/confirmModal.html',
        controller: 'ConfirmModalCtrl'
      });
      /**
       * 点击ok和cancel执行的回调
       * modalInstance.result.then(function () {}, function () {});
       */
      modalInstance.result.then(function () {
        var ids = [];
        angular.forEach($scope.items, function (item, index) {
          if (item.checked === true) {
            ids.push(item._id);
          }
        });
        var json = {params: {ids: ids}};
        demoPaginationService.delete(json, function (data) {
          if (data.success === true) {
            $scope.loadPageData(1);
            $scope.grid.checked = false;
          }
        });
      });
    };

    $scope.selectAll = function () {
      angular.forEach($scope.items, function (item, index) {
        item.checked = $scope.grid.checked;
      });
    };

    $scope.selectItem = function () {
      var checked = false;
      angular.forEach($scope.items, function (item, index) {
        if (item.checked) {
          checked = true;
          return false;
        }
      });
      $scope.grid.checked = checked;
    };

  });
