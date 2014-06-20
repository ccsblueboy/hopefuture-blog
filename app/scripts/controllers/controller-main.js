'use strict';

/**
 * 网站首页 Controller
 * @class MainCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-12
 * */

angular.module('hopefutureBlogApp')
  .controller('MainCtrl', function ($scope, mainService) {
    $scope.$parent.loginName = 'linder';

  });