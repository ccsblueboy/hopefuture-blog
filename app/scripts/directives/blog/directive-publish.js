'use strict';

angular.module('hopefutureBlogApp')
    .directive('kindEditor', function ($parse) {
      return {
        restict: 'EA',
        link: function (scope, element, attrs) {
          // 初始化富文本
          // http://kindeditor.net/index.php
          var editor = KindEditor.create(element, {
            allowFileManager: false
          });
          var model = $parse(attrs.kindEditor);
          model.assign(scope, editor);
          model.assign(scope.$parent, editor);
        }
      };
    })
    .directive('articleValidator', function () {
      return {
        restrict: 'AC',
        link: function postLink(scope, element, attrs) {
          $(element).validate({
            errorPlacement: function(error, el) {
              if(el.is('#publishDate')){
                error.insertAfter(el.parent());
              }else{
                error.insertAfter(el);
              }
            },
            submitHandler: function () {
              scope.$apply(function () {
                scope.publish();
              });
            }
          });
        }
      };
    })
    .directive('articleCategory', function () {//文章分类列表指令
      return {
        restrict: 'AC',
        link: function postLink(scope, element, attrs) {
          $(element).validate({
            submitHandler: function () {
              scope.$apply(function () {
                scope.publish();
              });
            }
          });
        }
      };
    });


