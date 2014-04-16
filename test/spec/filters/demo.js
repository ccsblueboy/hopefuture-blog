'use strict';

describe('Filter: demo', function () {

  // load the filter's module
  beforeEach(module('hopefutureBlogApp'));

  // initialize a new instance of the filter before each test
  var demo;
  beforeEach(inject(function ($filter) {
    demo = $filter('demo');
  }));

  it('should return the input prefixed with "grid filter:"', function () {
    var text = 'angularjs';
    expect(demo(text)).toBe('grid filter: ' + text);
  });

});
