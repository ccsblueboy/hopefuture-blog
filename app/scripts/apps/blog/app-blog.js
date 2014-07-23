'use strict';

/**
 * 创建Angular App
 * @link hopefutureBlogApp
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-12
 * */
angular.module('hopefutureBlogApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/articles', {//文章列表
        templateUrl: '../views/blog/articles.html',
        controller: 'ArticlesCtrl'
      })
//      .when('/article', {//每一篇文章
//        templateUrl: '../views/blog/publish.html',
//        controller: 'PublishCtrl'
//      })
//      .when('/category', {//分类文章列表
//        templateUrl: '../views/blog/category.html',
//        controller: 'CategoryCtrl'
//      })
//      .when('/label', {//标签文章列表
//        templateUrl: '../views/blog/label.html',
//        controller: 'LabelCtrl'
//      })
      .otherwise({
        redirectTo: '/articles'
      });
  }]);