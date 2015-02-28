'use strict';

/**
 * 例子： 数据导入导出 Controller
 * @class DemoDataCtrl
 * @since 0.3.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-2-12
 * */

angular.module('hopefutureBlogApp')
  .controller('DemoDataCtrl', function ($scope, $modal, demoDataService) {
    $scope.mongodump = function () {
      demoDataService.mongodump(function (data) {
        if(data.success){
          $modal.open({
            templateUrl: '../views/templates/alert-modal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              config: function () {
                return {
                  modalContent: '导出数据成功！'
                };
              }
            }
          });
        }
      });
    };

    $scope.mongorestore = function () {
      demoDataService.mongorestore(function (data) {
        if(data.success){
          $modal.open({
            templateUrl: '../views/templates/alert-modal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              config: function () {
                return {
                  modalContent: '导入数据成功！'
                };
              }
            }
          });
        }
      });
    };
  });
