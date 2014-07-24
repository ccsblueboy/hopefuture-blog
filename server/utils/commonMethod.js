/**
 * Created by linder on 2014/7/24.
 */
'use strict';

/**
 * 通用方法
 */
var commonMethod = {

  /**
   * 根据 array 数据 存在父节点管理来动态设置其 level
   * @param items 要设置的数组
   * @param parentField 父节点字段名称
   * @returns {Array}
   */
  setItemLevel: function (items, parentField) {
    parentField = parentField || 'parent';

    /**
     * 递归设置节点 level
     * @param item
     * @param map
     * @returns {*}
     */
    var setLevel = function (item, map) {
      if (!item[parentField]) {
        return 0;
      }
      var level = item.level;
      if (level !== undefined) {
        return level;
      } else {
        level = setLevel(map[item[parentField]], map);
        item.level = level + 1;
        return level + 1;
      }
    };

    // 给数据加上level
    var i, len = items.length, item, map = {};
    //数组转换为键值对
    for (i = 0; i < len; i++) {
      map[items[i]._id] = items[i];
    }
    //设置 level 值
    for (i = 0; i < len; i++) {
      item = items[i];
      if (item.level === undefined) {
        item.level = setLevel(item, map);
      }
    }
    return items;
  }
};

module.exports = commonMethod;