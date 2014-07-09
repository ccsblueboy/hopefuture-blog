'use strict';

/**
 * 发表文章 Controller
 * @class PublishCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-13
 * */

angular.module('hopefutureBlogApp')
  .controller('PublishCtrl', function ($scope, $filter, $location, publishService) {

    $scope.header = '撰写新文章';
    $scope.editStatus = false;

    $scope.article = {
      _id: undefined,
      title: '',
      content: '',
      status: '',
      publicityStatus: 'public',//公开度，默认公开
      protectedPassword: '',//密码保护，需输入密码才能查看
      top: false,//文章置顶
      publishType: 'immediate',
      publishDate: '',
      articleLink: '',//文章永久链接，取相对地址
      type: 'richText',//文章类型
      categories: [],//文章所属分类
      labels: [],//文章标签
      updateStatus: false//修改状态
    };

    var reg = /article\/\w+/;
    var path = $location.path();
    if (reg.test(path) === true) {
      $scope.header = '编辑文章';
      $scope.editStatus = true;
      var id = path.substring(path.lastIndexOf('/') + 1);

      publishService.edit(id, function (data) {
        if (data.success === true) {
          angular.extend($scope.article, data.item);
        }
      });

    }

    /**
     * 保存草稿
     */
    $scope.saveDraft = function () {
      if ($scope.validator.valid()) {
        $scope.publish('draft');
      }
    };

    /**
     * 发布
     * @param status
     */
    $scope.publish = function (status) {
      status = status || 'publish';
      $scope.article.status = status;
      $scope.article.content = $scope.tinymceContent.getContent();
      $scope.article.publishDate = $scope.article.publishType === 'immediate' ? '' : $filter('date')($scope.article.publishDate, 'yyyy-MM-dd');
      publishService.save($scope.article, function (data) {
        if (data.success === true) {
          $scope.$parent.showPublishInfo = true;
          $scope.publishInfo = status === 'draft' ? '文章草稿已更新' : '文章已发布';
          if ($scope.editStatus === false) {
            $location.path('/article/' + data._id);
          }
        }
      });
    };
  })
  .controller('PublicityCtrl', function ($scope, publicityStatus) {

    $scope.publicityStatus = publicityStatus.public;
    $scope.publicityPanel = false;

    //文章公开度
    $scope.publicity = {
      publicityStatus: 'public',//公开度，默认公开
      protectedPassword: '',//密码保护，需输入密码才能查看
      top: false//文章置顶
    };

    $scope.show = {
      top: true,
      protectedPassword: false
    };

    $scope.$watch('publicity.publicityStatus', function (newValue, oldValue) {
      switch (newValue) {
        case 'public':
          $scope.show.top = true;
          $scope.show.protectedPassword = false;
          $('#protectedPassword').rules('remove', 'required');
          $('#protectedPassword').valid();
          break;
        case 'protected':
          $scope.show.top = false;
          $scope.show.protectedPassword = true;
          $('#protectedPassword').rules('add', 'required');
          break;
        case 'private':
          $scope.show.top = false;
          $scope.show.protectedPassword = false;
          $('#protectedPassword').rules('remove', 'required');
          $('#protectedPassword').valid();
          break;
      }
    });
    $scope.$watch('article.publishType', function (newValue, oldValue) {
      if (newValue === 'delay') {
        $('#publishDate').rules('add', 'required');
      } else {
        $('#publishDate').rules('remove', 'required');
        $('#publishDate').valid();
      }
    });

    /**
     * 设置文章公开度
     */
    $scope.setPublicityStatus = function () {
      var status = $scope.publicity.publicityStatus;
      switch (status) {
        case 'public':
          $scope.publicity.protectedPassword = '';
          break;
        case 'protected':
          $scope.publicity.top = false;
          break;
        case 'private':
          $scope.publicity.top = false;
          $scope.publicity.protectedPassword = '';
          break;
      }
      angular.extend($scope.$parent.article, $scope.publicity);
      $scope.publicityStatus = publicityStatus[status];
      $scope.publicityPanel = false;
    };

  })
  .controller('PublishTypeCtrl', function ($scope, publishTypeStatus) {//发布方式
    $scope.publishTypeStatus = publishTypeStatus.immediate;
    $scope.publishTypePanel = false;

    //文章发布方式
    $scope.publishType = {
      publishTypeStatus: 'immediate',
      publishDate: ''
    };

    $scope.setPublishTypeStatus = function () {
      var status = $scope.publishType.publishTypeStatus;
      if (status === 'immediate') {
        $scope.publishType.publishDate = '';
      }
      angular.extend($scope.$parent.article, $scope.publishType);
      $scope.publishTypeStatus = publishTypeStatus[status];
      $scope.publishTypePanel = false;
    };

    $scope.$watch('publishType.publishTypeStatus', function (newValue, oldValue) {
      $scope.showPublishDate = newValue === 'delay';
    });

    $scope.format = 'yyyy-MM-dd';
    $scope.openDatepicker = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
  })
  .controller('ArticleLabelCtrl', function ($scope, publishService) {// 标签

    /**
     * jshint global
     -HopeFuture
     * 用来处理显示 label 中间变量（集合）
     */
    var collection = new HopeFuture.Collection(function (o) {
      return o.name;
    });

    $scope.displayLabels = [];
    $scope.addLabel = function () {
      if (!$scope.label) {
        return;
      }
      var labels = $scope.label.split(',');
      angular.forEach(labels, function (item, index) {
        var _item = collection.key(item);
        if (!_item) {//创建新的
          _item = {
            name: item
          };
          collection.add(_item);
          $scope.$parent.article.labels.push(item);
        }
      });
      $scope.displayLabels = collection.getItems();
      $scope.label = '';
    };

    $scope.addLabelFromC = function (item) {
      var _item = collection.key(item);
      if (!_item) {//创建新的
        _item = {
          name: item.name
        };
        collection.add(_item);
        $scope.displayLabels = collection.getItems();
        $scope.$parent.article.labels.push(item.name);
      }
    };

    $scope.removeLabel = function (item) {
      collection.removeByKey(item);
      $scope.displayLabels = collection.getItems();

      var labels = $scope.$parent.article.labels;
      var index = labels.indexOf(item);
      labels.splice(index, 1);
    };

    $scope.openLabelPanel = function () {
      if (!$scope.showLabelPanel) {
        publishService.getLabel(function (data) {
          if (data.success === true) {
            var items = angular.copy(data.items);
            data.items.sort(function (item, next) {
              return item.count > next.count;
            });
            var minCount = data.items[0].count,
              maxCount = data.items[data.items.length - 1].count,
              sub = maxCount - minCount;
            /**
             * 根据 count 大小设置字体大小，最大的为 30px，最小为14px,
             * 最大和最小差值为16
             * 如果 sub 为 0，则取最小字体14px
             */
            angular.forEach(items, function (item, index) {
              if (sub === 0) {
                item.style = {fontSize: '14px'};
              } else {
                item.style = {fontSize: (14 + 16 / sub * (item.count - 1)) + 'px'};
              }
            });
            $scope.labels = items;
          }
        });
      }
      $scope.showLabelPanel = !$scope.showLabelPanel;
    };
  })
  .controller('ArticleCategoryCtrl', function ($scope, publishService, categoryMethod, publishMethod) {// 文章分类
    /**
     * 返回文章分类列表和常用的分类列表
     */
    publishService.getCategoryAndFrequentCategory(function (data) {
      if (data[0].success === true) {
        var collection = categoryMethod.sortItems(data[0].items);
        var items = collection.getItems();
        angular.forEach(items, function (item, index) {
          item.style = {marginLeft: item.level * 20 + 'px'};
        });
        $scope.categories = items;
      }

      if (data[1].success === true) {
        $scope.frequentCategories = data[1].items;
      }
    });

    var categories = [];
    $scope.changeCategory = function (category, from) {
      if (category.checked === true) {
        if (categories.indexOf(category._id) === -1) {
          categories.push(category._id);
        }
      } else {
        var index = categories.indexOf(category._id);
        categories.splice(index, 1);
      }

      var _categories;
      if (from === 'frequent') {
        _categories = $scope.categories;
      } else {
        _categories = $scope.frequentCategories;
      }
      if (_categories) {
        for (var i = 0, len = _categories.length; i < len; i++) {
          if (_categories[i]._id === category._id) {
            _categories[i].checked = category.checked;
            break;
          }
        }
      }
      $scope.$parent.article.categories = categories;
    };

    //添加新的分类目录
    $scope.category = {
      name: '',
      parentCategory: ''
    };

    $scope.addCategory = function () {
      if ($('#category').val() === '') {
        $scope.$parent.alerts = [
          {type: 'danger', message: '分类名称不能为空！'}
        ];
        return;
      } else {
        var valid = publishMethod.validCategory($scope);
        if (!valid) {
          return;
        }
      }
      var parentCategory = $scope.category.parentCategory;
      var category = angular.copy($scope.category);
      delete category.parentCategory;
      if (parentCategory) {
        category.parent = parentCategory._id;
      }
      publishService.addCategory(category, function (data) {
        if (data.success === true) {
          var collection = categoryMethod.sortItems(data.items);
          var items = collection.getItems();
          angular.forEach(items, function (item, index) {
            item.style = {marginLeft: item.level * 20 + 'px'};
          });
          $scope.categories = items;

          $scope.category.name = '';
          $scope.category.parentCategory = '';
        }
      });
    };
    $scope.$watch('category.name', function (newValue, oldValue) {
      if (newValue !== '') {
        $scope.$parent.alerts = [];
        publishMethod.validCategory($scope);
      }
    });
    $scope.$watch('category.parentCategory', function (newValue, oldValue) {
      if ($scope.category.name !== '') {
        publishMethod.validCategory($scope);
      }
    });

  });
