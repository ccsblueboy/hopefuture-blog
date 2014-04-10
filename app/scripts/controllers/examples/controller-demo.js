'use strict';

angular.module('hopefutureBlogApp')
  .controller('DemoCtrl', function ($scope, $modal, demoService) {
    $scope.create = function () {
      var modalInstance = $modal.open({
        backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
        //keyboard: false,// 设为false，按 esc键不会关闭 modal
        templateUrl: 'demoModalContent.html',
        controller: 'FormModalCtrl',
        windowClass: 'h-demo-modal',
        resolve: {

        }
      });

      modalInstance.result.then(function () {

      }, function () {

      });
    };
  })
  .controller('FormModalCtrl', function ($scope, $modalInstance, demoService) {
    $scope.demo = {
      id: 0,
      title: '',
      content: ''
    };
    $scope.ok = function () {
      demoService.addOrUpdate({
        data: $scope.demo
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });