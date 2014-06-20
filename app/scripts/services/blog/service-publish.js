'use strict';

angular.module('hopefutureBlogApp')
    .factory('publishService', ['hfbHttpService', function (hfbHttpService) {
      return {
        paging: function (data, success) {
          hfbHttpService.get('manage/article', data).then(success);
        },
        save: function (data, success) {
          hfbHttpService.post('manage/article', data).then(success);
        },
        edit: function (id, success) {
          hfbHttpService.get('manage/article/' + id).then(success);
        },

        'delete': function (data, success) {
          hfbHttpService.delete('manage/article', data).then(success);
        },
        getCategory: function(data, success){
          hfbHttpService.get('manage/category', data).then(success);
        }
      };
    }])
    .constant('publicityStatus', {//公开度
      public: '公开',
      protected: '密码保护',
      private: '私密'
    });

