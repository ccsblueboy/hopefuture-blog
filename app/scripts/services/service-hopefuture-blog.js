'use strict';

angular.module('hopefutureBlogApp')
  .factory('blogMethod', function () {

    var re = /\{\{:([\w-]+)\}\}/g;
    // Public API here
    return {
      /**
       * 处理模板数据
       * 该方法支持键值即json格式的数据
       * @param template
       * @param values
       * @returns {*}
       */
      applyTemplate: function (template, values) {
        return template.replace(re, function (m, name) {
          return values[name] !== undefined ? values[name] : '';
        });
      },

      /**
       * 根据文章所引用标签的数量显示标签样式
       * @param labels
       * @returns {*}
       */
      parseArticleLabel: function (labels) {
        if (!labels) {
          return null;
        }
        var items = angular.copy(labels);
        labels.sort(function (item, next) {
          return item.count > next.count;
        });
        if (labels.length > 0) {
          var minCount = labels[0].count, maxCount = labels[labels.length - 1].count, sub = maxCount - minCount;
          /**
           * 根据 count 大小设置字体大小，最大的为 30px，最小为14px,
           * 最大和最小差值为16
           * 如果 sub 为 0，则取最小字体14px
           */
          angular.forEach(items, function (item, index) {
            if (sub === 0) {
              item.style = {fontSize: '14px'};
            } else {
              item.style = {fontSize: (14 + 16 / sub * (item.count - 1)) + 'px'};
            }
          });
        }
        return items;
      },

      renderComment: function (comments) {
        var self = this;
        var tmpl =
          '   <div class="clearfix">' +
          '     <img class="pull-left" src="./images/head-portrait.png" alt="头像" width="50px" height="50px"/>' +
          '     <div class="pull-left margin20-L">' +
          '       <p><a href="#">2014年5月23日 at 上午10:26</a></p>' +
          '       <p>Linder</p>' +
          '     </div>' +
          '   </div>' +
          '   <div class="comment-content">' +
          '     写的不错，学习了' +
          '   </div>' +
          '   <div>' +
          '     <a href=""><span class="glyphicon glyphicon-share-alt"></span> 回复</a>' +
          '   </div>';

        function render(items) {
          if (!items || items.length === 0) {
            return;
          }
          var html = '<ul class="list-unstyled comment">';
          var item;
          for (var i = 0, len = items.length; i < len; i++) {
            html += '<li>';
            item = items[i];
            html += self.applyTemplate(tmpl, item);
            if (item.children && item.children.length > 0) {
              html += render(item.children);
            }
            html += '</li>';
          }
          html += '</ul>';

          return html;
        }

        var html = render(comments);
        return html;
      }
    };
  });
