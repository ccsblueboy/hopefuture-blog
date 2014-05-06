'use strict';

angular.module('hopefutureBlogApp')
  .controller('ConfirmModalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('AlertModalCtrl', function ($scope, $modalInstance, alertContent) {
    $scope.alertContent = alertContent;
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });