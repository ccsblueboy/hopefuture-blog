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
    if ($location.path() === '/editarticle') {
      $scope.header = '编辑文章';
    }

    $scope.article = {
      title: '',
      content: '',
      status: 'publish',
      publicityStatus: 'public',//公开度，默认公开
      protectedPassword: '',//密码保护，需输入密码才能查看
      top: false,//文章置顶
      publishType: 'immediate',
      publishDate: '',
      articleLink: '',//文章永久链接，取相对地址
      type: 'richText',//文章类型
      categories: [],//文章所属分类
      labels: []//文章标签
    };

    $scope.publish = function (status) {
      if (status) {
        $scope.article.status = status;
      }
      $scope.article.content = $scope.kindEditorContent.html();
      $scope.article.publishDate = $scope.article.publishType === 'immediate' ? '' : $filter('date')($scope.article.publishDate, 'yyyy-MM-dd');
      publishService.save($scope.article, function (data) {
        if (data.success === true) {

        } else {

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
  .controller('PublishTypeCtrl', function ($scope) {//发布方式
    $scope.format = 'yyyy-MM-dd';
    $scope.openDatepicker = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
  })
  .controller('ArticleLabelCtrl', function ($scope, publishService) {// 标签

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
        if(!_item){//创建新的
          _item ={
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
      if(!_item){//创建新的
        _item ={
          name: item
        };
        collection.add(_item);
        $scope.$parent.article.labels.push(item);
      }
    };

    $scope.removeLabel = function(item){
      collection.removeByKey(item);
      $scope.displayLabels = collection.getItems();

      var labels = $scope.$parent.article.labels;
      var index = labels.indexOf(item);
      labels.splice(index,1);
    };

    $scope.openLabelPanel = function () {
      if (!$scope.showLabelPanel) {
        publishService.getLabel(function (data) {
          if (data.success === true) {
            $scope.labels = data.items;
          }
        });
      }
      $scope.showLabelPanel = !$scope.showLabelPanel;
    };
  });


