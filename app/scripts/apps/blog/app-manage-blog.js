'use strict';

/**
 * 创建Angular App
 * @link hopefutureBlogApp
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-13
 * */
angular.module('hopefutureBlogApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.tinymce'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/publish', {//发表文章
        templateUrl: '../views/manageblog/publish.html',
        controller: 'PublishCtrl'
      })
      .when('/article/:articleId', {//编辑文章
        templateUrl: '../views/manageblog/publish.html',
        controller: 'PublishCtrl'
      })
      .when('/article', {//文章管理
        templateUrl: '../views/manageblog/article.html',
        controller: 'ArticleCtrl'
      })
      .when('/category', {//类别管理
        templateUrl: '../views/manageblog/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/label', {//标签管理
        templateUrl: '../views/manageblog/label.html',
        controller: 'LabelCtrl'
      })
      .when('/comment', {//评论管理
        templateUrl: '../views/manageblog/comment.html',
        controller: 'CommentCtrl'
      })
      .when('/resource', {//资源链接
        templateUrl: '../views/manageblog/resource.html',
        controller: 'ResourceCtrl'
      })
      .when('/setting', {//博客管理
        templateUrl: '../views/manageblog/setting.html',
        controller: 'SettingCtrl'
      })
      .otherwise({
        redirectTo: '/article'
      });
    //$locationProvider.html5Mode(true);
  }]);
