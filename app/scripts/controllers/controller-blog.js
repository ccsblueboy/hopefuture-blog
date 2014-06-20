'use strict';

/**
 * 该 Controller 主要设置一些公用的属性和方法，方便其他 Controller 调用
 * 比如 alert ，header 中的一些数据等
 * 该 Controller 中的属性和方法应该尽量的少
 * @class BlogCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-12
 * */

angular.module('hopefutureBlogApp')
  .controller('BlogCtrl', function ($scope) {
    //用户登录名，可以用来设置二级域名，这样每个用户对应一个唯一的地址
    $scope.loginName = '';

    //页面中输出的alert提示信息
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  });