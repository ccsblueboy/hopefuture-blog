'use strict';

describe('Filter: truncate -- 测试过滤器：truncate', function () {
  beforeEach(module('hopefutureBlogApp'));
  it('截取后的字符长度应该是10',
    // 注意函数参数名字的书写，必须是过滤器名+Filter
    inject(function (truncateFilter) {
      expect(truncateFilter('abcdefghijkl', 10).length).toBe(10);
    })
  );

  //另一种写法，首先用 $filter 实例化过滤器
  var truncate;
  beforeEach(inject(function ($filter) {
    truncate = $filter('truncate');
  }));

  it('截取后的字符长度应该是5', function () {
    var text = 'angularjs';
    expect(truncate(text, 5).length).toBe(5);
  });
});