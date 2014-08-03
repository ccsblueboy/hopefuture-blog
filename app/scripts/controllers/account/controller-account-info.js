'use strict';

/**
 * 用户信息 Controller
 * @class AccountInfoCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-8-2
 * */

angular.module('hopefutureBlogApp').controller('AccountInfoCtrl', function ($scope, $modal, accountInfoService) {

  $scope.account = {
    loginName: '',
    password: '',
    email: '',
    name: '',
    englishName: '',
    residence: '',//居住地
    position: '',//职位
    headPortrait: 'head-portrait-default',//头像
    sex: '',
    site: '',
    signature: ''//我的签名
  };


  accountInfoService.getInfoByLoginName(function (data) {
    if (data.success === true) {
      angular.extend($scope.account, data.account);
    }
  });

  $scope.update = function () {
    accountInfoService.update($scope.account, function (data) {
      if (data.success === true) {
        $scope.$parent.alerts = [
          {type: 'success', message: '修改用户信息成功！'}
        ];
      }
    });
  };

  //修改密码
  $scope.updatePassword = function () {
    $modal.open({
      backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
      //keyboard: false,// 设为false，按 esc键不会关闭 modal
      templateUrl: 'updatePassword.html',
      controller: 'UpdatePasswordCtrl',
      size: 'lg',
      resolve: {// 传递数据
        formData: function () {
          return  {
            loginName: $scope.account.loginName
          };
        }
      }
    });
  };
}).controller('UpdatePasswordCtrl', function ($scope, $modalInstance, $timeout, accountInfoService, formData) {
  $scope.dialogTitle = '修改用户密码';
  $scope.account = {
    loginName: formData.loginName,
    password: ''
  };

  $scope.updatePassword = function () {
    accountInfoService.updatePassword($scope.account, function (data) {
      if (data.success === true) {
        $scope.$parent.alerts = [
          {type: 'success', message: '密码修改成功！'}
        ];
        $timeout(function () {
          $modalInstance.close();
        }, 500);
      } else {
        $scope.$parent.alerts = [
          {type: 'danger', message: data.errorMessage}
        ];
      }
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

