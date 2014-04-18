'use strict';

/**
 * 功能描述：分页实体类
 * @param options
 * options 可选属性有：
 *    itemsPerPage 每页显示的记录数
 *    currentPage 当前页
 *    maxSize 页码显示的条数，比如设为5，则页码始终最多有5个
 *    totalItems 记录总数
 *    items 分页结果集
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

/**
 * 设置分页结果集
 * @returns {*}
 */
DataPage.prototype.setItems = function (items) {
  this.items = items;
};

module.exports = DataPage;