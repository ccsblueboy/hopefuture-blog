'use strict';

/**
 * 功能描述：分页实体类
 * @param options
 * options 可选属性有：
 *    totalItems 记录总数
 *    currentPage 当前页
 *    maxSize 页码显示的条数，比如设为5，则页码始终最多有5个
 *    startItem 开始要显示的记录数
 *    itemsPerPage 每页显示的记录数
 *    maxPage 最大页码
 * @constructor
 */
function DataPage(options) {
  this.itemsPerPage = options.itemsPerPage;
  this.currentPage = options.currentPage || 1;
  this.maxSize = options.maxSize || 5;
}

DataPage.prototype.setTotalItems = function (totalItems) {
  this.totalItems = totalItems;
};

DataPage.prototype.getTotalItems = function () {
  return this.totalItems;
};

module.exports = DataPage;