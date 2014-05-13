'use strict';

(function () {
  $.validator.setDefaults({
    //延迟校验
    onfocusout: function (e) {
      setTimeout(function () {
        $(e).valid();
      }, 150);
    },
    // For the invisible tags, we need to validate too.
    ignore: 'input[type="hidden"], :button',
    errorClass: 'text-danger'
  });

  // 以下自定义校验规则
  var customMethod = {
    method1: {
      message: '',
      fn: function (value, element, param) {
        return true;
      }
    }
  };

  /**
   * add method to jquery.validator
   * 这里忽略 jshint forin 的验证
   */
  /*jshint -W089 */
  for (var c in customMethod) {
    var method = customMethod[c];
    $.validator.addMethod(c, method.fn, method.message);
  }
})();