'use strict';

/**
 * 通用 Confirm 模态窗口 Controller
 * @class ConfirmModalCtrl
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */
angular.module('hopefutureBlogApp')
  .controller('ConfirmModalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

/**
 * 通用 Alert 模态窗口 Controller
 * @class AlertModalCtrl
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-9
 * */
  .controller('AlertModalCtrl', function ($scope, $modalInstance, alertContent) {
    $scope.alertContent = alertContent;
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });