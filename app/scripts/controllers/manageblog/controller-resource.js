'use strict';

/**
 * 资源链接 Controller
 * @class ResourceCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-31
 * */

angular.module('hopefutureBlogApp')
  .controller('ResourceCtrl', function ($scope, $modal, resourceService) {

    var resource = {
      _id: undefined,
      name: '',
      link: '',//链接
      categoryId: '',//分类
      description: ''
    };

    $scope.resource = angular.copy(resource);

    $scope.index = undefined;

    $scope.resourceFormTitle = '添加资源链接';
    $scope.submitText = '添加';
    /**
     * 列表数据
     * @type {Array}
     */
    $scope.items = [];
    /**
     * 是否选中全部列表
     * @type {{checked: boolean}}
     */
    $scope.grid = {
      checked: false
    };

    /**
     * 返回列表
     */
    resourceService.list(function (data) {
      if (data.success === true) {
        $scope.items = data.items;
        $scope.categories = data.categories;
      }
    });


    $scope.edit = function (id, index) {
      $scope.index = index;
      resourceService.edit(id, function (data) {
        if (data.success === true) {
          var item = data.item;
          $scope.resource = {
            _id: item._id,
            name: item.name,
            link: item.link,
            categoryId: item.categoryId,
            description: item.description
          };

          $scope.resourceFormTitle = '修改资源链接 — ' + item.name;
          $scope.submitText = '修改';
          $scope.editStatus = true;
        }
      });
    };

    //取消编辑
    $scope.cancelEdit = function () {
      $scope.resourceFormTitle = '添加资源链接';
      $scope.submitText = '添加';
      $scope.editStatus = false;
      $scope.resource = angular.copy(resource);
    };

    $scope.save = function () {
      resourceService.save($scope.resource, function (data) {
        if (data.success === true) {
          if ($scope.resource._id) {//修改
            angular.extend($scope.items[$scope.index], $scope.resource);
          } else {
            $scope.items.unshift(data.item);
          }
          $scope.editStatus = false;
          //清空
          $scope.resource = angular.copy(resource);
        }
      });
    };

    /**
     * 包括删除一条或多条记录
     * @param item
     */
    $scope.delete = function (item) {
      var ids;
      if (!item) {//没有传参数，表示执行的是删除多条记录
        ids = [];
        if ($scope.grid.checked === false) {
          $modal.open({
            templateUrl: '../views/templates/alertModal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              config: function () {
                return {
                  modalContent: '请至少选择一条记录！'
                };
              }
            }
          });
          return;
        }
        angular.forEach($scope.items, function (item, index) {
          if (item.checked === true) {
            ids.push(item._id);
          }
        });
      } else {
        ids = [item._id];
      }
      var json = {params: {ids: ids}};

      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: '../views/templates/confirmModal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          config: function () {
            return {
              modalContent: '确定要删除所选的记录吗？'
            };
          }
        }
      });
      modalInstance.result.then(function () {
        resourceService.delete(json, function (data) {
          if (data.success === true) {
            var idsMap = {};
            var i, len;
            for (i = 0, len = ids.length; i < len; i++) {
              idsMap[ids[i]] = true;
            }
            for (i = $scope.items.length - 1; i >= 0; i--) {
              if (idsMap[$scope.items[i]._id]) {
                $scope.items.splice(i, 1);
              }
            }
            if (!item) {
              $scope.grid.checked = false;
            }

            $scope.cancelEdit();
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

    $scope.manageCategory = function () {
      openCategoryFormModal($modal, $scope);
    };

    function openCategoryFormModal($modal, $scope) {
      $modal.open({
        backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
        //keyboard: false,// 设为false，按 esc键不会关闭 modal
        templateUrl: 'categoryModal.html',
        controller: 'CategoryFormModalCtrl',
        windowClass: 'h-grid-modal',
        resolve: {// 传递数据
          formData: function () {
            return  {
              items: $scope.items
            };
          }
        }
      });
    }
  })
  .controller('CategoryFormModalCtrl', function ($scope, $modalInstance, demoPaginationService, formData) {
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
    $scope.save = function () {
      demoPaginationService.save($scope.demo, function (data) {
        if (data.success === true) {
          if (item) {
            angular.extend($scope.items[formData.index], $scope.demo, data.item);
          } else {
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
