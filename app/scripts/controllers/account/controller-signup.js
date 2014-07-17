'use strict';

/**
 * 注册 Controller
 * @class SignupCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-16
 * */

angular.module('hopefutureBlogApp')
  .controller('SignupCtrl', function ($scope, signupService) {

    $scope.account = {
      loginName: '',
      name: '',
      password: '',
      email: ''
    };

    $scope.showForm = true;
    /**
     * 注册
     */
    $scope.signup = function () {
      signupService.signup($scope.account, function (data) {
        if (data.success === true) {
          $scope.showForm = false;
        } else {
          //注意这里，对于父 Controller中的赋值，需要加上 $parent
          //如果是取值，直接写 $scope.alerts 就可以了
          $scope.$parent.alerts = [
            {type: 'danger', message: data.message}
          ];
        }
      });
    };
  });