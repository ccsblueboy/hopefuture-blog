'use strict';

angular.module('hopefutureBlogApp')
  .factory('publishService', ['hfbHttpService', '$q', function (hfbHttpService, $q) {
    return {
      save: function (data, success) {
        hfbHttpService.post('manage/article', data).then(success);
      },
      edit: function (id, success) {
        hfbHttpService.get('manage/article/' + id).then(success);
      },
      getLabel: function (success) {
        hfbHttpService.get('manage/label/records/frequent').then(success);
      },
      getCategoryAndFrequentCategory: function (success) {
        var url1 = 'manage/category';
        var promise1 = hfbHttpService.get(url1);
        var url2 = 'manage/category/records/frequent';
        var promise2 = hfbHttpService.get(url2);
        $q.all([promise1, promise2]).then(success);
      },
      addCategory: function (data, success) {
        hfbHttpService.post('manage/category', data).then(success);
      }
    };
  }])
  .factory('publishMethod', function ($timeout) {
    var process, request;
    return {
      validCategory: function ($scope, callback) {
        // Here we use the jQuery Ajax, because it can abort an ajax request.
        // I will find how to abort an ajax request in Angular at later.
        if (process) {
          $timeout.cancel(process);
        }
        process = $timeout(function() {
          if (request) {
            request.abort();
          }
          request = $.ajax({
            url: 'manage/category/validate/duplicate',
            mode: 'abort',
            dataType: 'json',
            async: false,
            data: {
              name: $scope.category.name,
              parent: $scope.category.parentCategory ? $scope.category.parentCategory._id : ''
            },
            success: function (response) {
              var valid = response === true || response === 'true';
              if (!valid) {
                $scope.$parent.alerts = [
                  {type: 'danger', message: '一个拥有相同名字的父级项目已存在。'}
                ];
              }else{
                $scope.$parent.alerts = [];
              }
              if(callback && angular.isFunction(callback)){
                callback(valid);
              }
            }
          });
        },200);
      }
    };
  })
  .constant('publicityStatus', {//公开度
    public: '公开',
    protected: '密码保护',
    private: '私密'
  })
  .constant('publishTypeStatus', {//发布方式
    immediate: '立即发布',
    delay: '定时发布'
  });


