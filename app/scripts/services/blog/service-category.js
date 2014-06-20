'use strict';

angular.module('hopefutureBlogApp')
    .factory('categoryService', ['hfbHttpService', function (hfbHttpService) {
      return {
        list: function (success) {
          hfbHttpService.get('manage/category').then(success);
        },
        save: function (data, success) {
          hfbHttpService.post('manage/category', data).then(success);
        },
        edit: function (id, success) {
          hfbHttpService.get('manage/category/' + id).then(success);
        },
        'delete': function (data, success) {
          hfbHttpService.delete('manage/category', data).then(success);
        }
      };
    }])
    .factory('categoryMethod', function () {

      // Public API here
      return {
        /**
         * 节点是否是其孩子节点
         * @param item1
         * @param item2
         * @returns {boolean}
         */
        isChild: function (item1, item2) {
          if (!item1 || !item2) {
            return false;
          }
          if (item1._id === item2.parent) {
            return true;
          }
          return false;
        },

        /**
         * 拼接字符串
         * @param count
         * @param str
         * @returns {string}
         */
        joinStr: function (count, str) {
          var result = '';
          for (var i = 0; i < count; i++) {
            result += str;
          }
          return result;
        }
      };
    });

