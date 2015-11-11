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
  .controller('ConfirmModalCtrl', function ($scope, $uibModalInstance, config) {
    $scope.modalTitle = config.modalTitle;
    $scope.modalContent = config.modalContent;
    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
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
  .controller('AlertModalCtrl', function ($scope, $uibModalInstance, config) {
    $scope.modalTitle = config.modalTitle;
    $scope.modalContent = config.modalContent;
    $scope.hideClose = config.hideClose;
    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });