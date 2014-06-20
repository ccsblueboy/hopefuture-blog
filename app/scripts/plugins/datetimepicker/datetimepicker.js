'use strict';
/**
 * 可以参考 https://github.com/zhaber/datetimepicker
 */
angular.module('ui.bootstrap.datetimepicker', ['ui.bootstrap.datepicker','ui.bootstrap.timepicker'])
    .directive('datetimepicker', [ function () {
      return {
        restict: 'EA',
        link: function (scope, element, attrs) {
        }
      };
    }]);