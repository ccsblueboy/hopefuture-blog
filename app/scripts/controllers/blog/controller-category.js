'use strict';

/**
 * 类别管理 Controller
 * @class CategoryCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-16
 * */

angular.module('hopefutureBlogApp')
  .controller('CategoryCtrl', function ($scope, $modal, $sce, categoryService, categoryMethod) {
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
    categoryService.list(function (data) {
      if (data.success === true) {
        var collection = categoryMethod.sortItems(data.items);
        $scope.items = collection.items;
      }
    });

    /**
     * 创建新的记录
     */
    $scope.create = function () {
      categoryMethod.openFormModal($modal, $scope);
    };

    $scope.edit = function (id) {
      categoryService.edit(id, function (data) {
        categoryMethod.openFormModal($modal, $scope, data.item);
      });
    };

    /**
     * 包括删除一条或多条记录
     * @param item
     */
    $scope.delete = function (item) {
      var json;
      if (!item) {//没有传参数，表示执行的是删除多条记录
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
        var items = [];
        angular.forEach($scope.items, function (item, index) {
          if (item.checked === true) {
            items.push({_id: item._id, parent: item.parent});
          }
        });
        json = {params: {items: items}};
      } else {
        json = {
          params: {
            items: {
              _id: item._id,
              parent: item.parent
            }
          }};
      }
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
        categoryService.delete(json, function (data) {
          if (data.success === true) {
            var collection = categoryMethod.sortItems(data.items);
            $scope.items = collection.items;
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
  })
  .controller('CategoryFormCtrl', function ($scope, $modalInstance, categoryService, formData, categoryMethod) {
    $scope.items = formData.items;
    $scope.dialogTitle = '添加分类目录';
    $scope.category = {
      _id: undefined,
      name: '',
      description: '',
      parentCategory: ''
    };
    var item = formData.item;
    if (item) {
      var parentCategory = '';
      for (var i = 0, len = formData.items.length; i < len; i++) {
        if (formData.items[i]._id === item.parent) {
          parentCategory = formData.items[i];
          break;
        }
      }
      $scope.category = {
        _id: item._id,
        name: item.name,
        description: item.description,
        parentCategory: parentCategory
      };
      $scope.dialogTitle = '修改分类目录';
    }

    $scope.save = function () {
      var parentCategory = $scope.category.parentCategory;
      var category = angular.copy($scope.category);
      delete category.parentCategory;
      if (parentCategory) {
        category.parent = parentCategory._id;
      }
      categoryService.save(category, function (data) {
        if (data.success === true) {
          var collection = categoryMethod.sortItems(data.items);
          $scope.items.length = 0;
          angular.forEach(collection.items, function (item, index) {
            $scope.items.push(item);
          });

          /**
           * 如果后台返回的是单一记录数据，执行以下代码
           * 此处需要重新排序设置collection
           var collection = $scope.$parent.collection;
           var item = angular.copy(data.item);
           item.alias = categoryMethod.joinStr(item.level, ' —') + ' ' + item.name;
           collection.add(item);
           var items = collection.items.sort(function (x, y) {
              return x.level > y.level;
              });
           collection = categoryMethod.sortItems(items);
           $scope.items.length = 0;
           angular.forEach(collection.items, function (item, index) {
              $scope.items.push(item);
             });
           **/
        }
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    //$scope.va
    $scope.validateName = function () {
      $scope.validator.resetForm();
      $('#name').valid();
      $('#description').valid();
    };
  });
