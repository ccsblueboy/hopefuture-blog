'use strict';

angular.module('hopefutureBlogApp')
  .factory('blogMethod', function () {
    // Public API here
    return {
      /**
       * 根据文章所引用标签的数量显示标签样式
       * @param labels
       * @returns {*}
       */
      parseArticleLabel: function (labels) {
        if(!labels){
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
      }
    };
  });
