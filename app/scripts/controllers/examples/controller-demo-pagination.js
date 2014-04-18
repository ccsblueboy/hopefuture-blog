'use strict';

angular.module('hopefutureBlogApp')
  .controller('DemoPaginationCtrl', function ($scope, $modal, demoPaginationService) {
    //初始化记录
    $scope.items = [];
    $scope.grid = {
      checked: false
    };

    /**
     * 分页数据
     */
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.itemsPerPage = 2;

    $scope.loadPageData = function (page) {
      /**
       * FIXME 这里有一个bug（应该是angular ui的bug，待升级解决），不能直接获取 $scope.currentPage，待解决
       */
      if (page) {
        $scope.currentPage = page;
      } else if ($scope.$$childHead) {
        $scope.currentPage = $scope.$$childHead.$$childHead.page;
      }
      var params = {
        currentPage: $scope.currentPage,
        itemsPerPage: $scope.itemsPerPage
      };
      demoPaginationService.paging({params: params}, function (data) {
        if (data.success === true) {
          $scope.items = data.dataPage.items;
          $scope.totalItems = data.dataPage.totalItems;
        }
      });
    };

    $scope.loadPageData(1);

    $scope.create = function () {
      openFormModal($modal, $scope);
    };

    $scope.edit = function (id, index) {
      demoPaginationService.edit(id, function (data) {
        openFormModal($modal, $scope, data.item, index);
      });
    };

    $scope.delete = function (item) {
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: './views/templates/confirmModal.html',
        controller: 'ConfirmModalCtrl'
      });
      modalInstance.result.then(function () {
        demoPaginationService.delete({params: {ids: [item._id]}}, function (data) {
          if (data.success === true) {
            $scope.loadPageData(1);
          }
        });
      });
    };

    $scope.deleteAll = function () {
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: './views/templates/confirmModal.html',
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

    function openFormModal($modal, $scope, item, index) {
      $modal.open({
        backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
        //keyboard: false,// 设为false，按 esc键不会关闭 modal
        templateUrl: 'demoModalContent.html',
        controller: 'FormModalCtrl',
        windowClass: 'h-grid-modal',
        resolve: {// 传递数据
          formData: function () {
            return  {
              items: $scope.items,
              item: item,
              index: index,
              loadPageData: $scope.loadPageData
            };
          }
        }
      });
    }
  })
  .controller('FormModalCtrl', function ($scope, $modalInstance, demoPaginationService, formData) {
    $scope.items = formData.items;
    $scope.loadPageData = formData.loadPageData;
    $scope.demo = {
      _id: undefined,
      title: '',
      content: ''
    };
    var item = formData.item;
    if (item) {//修改
      $scope.demo = {
        _id: item._id,
        title: item.title,
        content: item.content
      };
    }
    $scope.ok = function () {
      demoPaginationService.save($scope.demo, function (data) {
        if (data.success === true) {
          if (item) {
            angular.extend($scope.items[formData.index], $scope.demo, data.item);
          } else {
            $scope.items.unshift(data.item);
            $scope.loadPageData(1);
          }
        }
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });