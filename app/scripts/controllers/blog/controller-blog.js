'use strict';

/**
 * 个人博客 Controller
 * @class BlogCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-12
 * */

angular.module('hopefutureBlogApp')
  .controller('BlogCtrl', function ($scope, blogService) {
    $scope.$parent.loginName = 'linder';

    /**
     * 创建新的文章
     */
    $scope.createBlog = function(){

    };

    /**
     * 管理我的博客
     */
    $scope.manageBlog = function(){
      window.location.href = window.location.href + '/manage';
    };

  });