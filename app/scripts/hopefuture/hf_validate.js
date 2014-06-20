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
    maxbyteslength: {
      message: '输入内容不能超过{0}个字节，一个汉字等于两个字节。',
      fn: function (value, element, param) {
        return this.optional(element) || value.replace(/[^\x00-\xFF]/g, '**').length <= param;
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