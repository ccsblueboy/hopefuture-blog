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
    .controller('PublishCtrl', function ($scope, $filter, articleService) {

      $scope.article = {
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
        category: '',//文章所属分类
        labels: ''//文章标签
      };


      $scope.publish = function () {
        $scope.article.content = $scope.kindEditorContent.html();
        $scope.article.publishDate = $scope.article.publishType === 'immediate' ? '' : $filter('date')($scope.article.publishDate, 'yyyy-MM-dd');
        articleService.save($scope.article, function (data) {
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
            break;
          case 'protected':
            $scope.show.top = false;
            $scope.show.protectedPassword = true;
            break;
          case 'private':
            $scope.show.top = false;
            $scope.show.protectedPassword = false;
            break;
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
    .controller('PublishTypeCtrl', function ($scope) {
      $scope.format = 'yyyy-MM-dd';
      $scope.openDatepicker = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };
    });
