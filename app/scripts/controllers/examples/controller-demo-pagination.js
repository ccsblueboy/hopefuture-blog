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
    var params = {
      currentPage: $scope.currentPage,
      itemsPerPage: $scope.itemsPerPage
    };
    demoPaginationService.paging({params: params}, function (data) {
      if (data.success === true) {
        $scope.items = data.items;
        $scope.totalItems = data.totalItems;
      }
    });
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
            $('#' + item._id).remove();
            var index = $scope.items.indexOf(item);
            $scope.items.splice(index, 1);
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
            var items = [];
            angular.forEach($scope.items, function (item, index) {
              if (item.checked === true) {
                $('#' + item._id).remove();
              } else {
                items.push(item);
              }
            });
            $scope.items = items;
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
              index: index
            };
          }
        }
      });
    }
  })
  .controller('FormModalCtrl', function ($scope, $modalInstance, demoPaginationService, formData) {
    $scope.items = formData.items;
    $scope.demo = {
      _id: undefined,
      title: '',
      content: ''
    };
    var item = formData.item;
    if (item) {
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
            angular.extend($scope.items[formData.index], $scope.demo, data.item
            )
            ;
          } else {
            $scope.items.unshift(data.item);
          }
        }
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });