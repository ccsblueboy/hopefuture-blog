
'use strict';

angular.module('hopefutureBlogApp')
  .constant('errorCodes', {
    //会话过期
    '9001': '你没有登录，或会话过期，请登录。',
    '9003': '该用户不存在'
  });