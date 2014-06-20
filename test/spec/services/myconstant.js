'use strict';

describe('Service: myConstant', function () {

  // load the service's module
  beforeEach(module('hopefutureBlogApp'));

  // instantiate service
  var myConstant;
  beforeEach(inject(function (_myConstant_) {
    myConstant = _myConstant_;
  }));

  it('should do something', function () {
    expect(!!myConstant).toBe(true);
  });

});
