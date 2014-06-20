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
    .controller('CategoryCtrl', function ($scope, $modal, $sce, categoryService) {
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
          angular.forEach(data.items, function (item, index) {
            item.alias = joinStr(item.level, ' —') + ' ' + item.name;
          });
          //重新排序，按照所属级别关系排序，属于同一个父节点的放到一起
          var coll = new $.hopefuture.Collection(function (o) {
                return o._id;
              }),
              collection = new $.hopefuture.Collection(function (o) {
                return o._id;
              });
          var _item, index, parentItem, step, nextItem;

          coll.addAll(data.items);
          coll.each(function (item, i, len) {
            _item = angular.copy(item);
            if (_item.parent) {
              index = collection.indexOfKey(_item.parent);
              parentItem = collection.itemAt(index);
              step = index + 1;
              nextItem = collection.itemAt(step);
              while (isChild(parentItem, nextItem)) {
                step++;
                nextItem = collection.itemAt(step);
              }
              collection.insert(step, _item);
            } else {
              collection.add(_item);
            }
          });

          $scope.collection = collection;
          $scope.items = collection.items;
        }
      });

      // 节点是否是其孩子节点
      function isChild(item1, item2) {
        if (!item1 || !item2) {
          return false;
        }
        if (item1._id === item2.parent) {
          return true;
        }
        return false;
      }

      function joinStr(count, str) {
        var result = '';
        for (var i = 0; i < count; i++) {
          result += str;
        }
        return result;
      }

      /**
       * 创建新的记录
       * @method DemoGridCtrl.create
       */
      $scope.create = function () {

      };

      $scope.edit = function (id, index) {
        categoryService.edit(id, function (data) {

        });
      };

      $scope.delete = function (item) {
        var modalInstance = $modal.open({
          backdrop: 'static',
          templateUrl: '../views/templates/confirmModal.html',
          controller: 'ConfirmModalCtrl'
        });
        modalInstance.result.then(function () {
          categoryService.delete({params: {ids: [item._id]}}, function (data) {
            if (data.success === true) {
              $('#' + item._id).remove();
              var index = $scope.items.indexOf(item);
              $scope.items.splice(index, 1);
            }
          });
        });
      };

      $scope.deleteAll = function () {
        if ($scope.grid.checked === false) {
          $modal.open({
            templateUrl: '../views/templates/alertModal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              alertContent: function () {
                return 'Please select at least one record.';
              }
            }
          });
          return;
        }
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
          categoryService.delete(json, function (data) {
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
    .controller('CategoryFormCtrl', function ($scope, $modal, categoryService) {
      $scope.category = {
        name: '',
        description: '',
        parentCategory: ''
      };

      $scope.save = function () {
        var parentCategory = $scope.category.parentCategory;
        var category = angular.copy($scope.category);
        delete category.parentCategory;
        if (parentCategory === '') {
          category.level = 0;
        } else {
          category.parent = parentCategory._id;
          category.level = parentCategory.level + 1;
        }
        categoryService.save(category, function (data) {
          if (data.success === true) {

          }
        });
      };
    });
