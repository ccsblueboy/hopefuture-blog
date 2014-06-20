'use strict';

describe('Service: myValue', function () {

  // load the service's module
  beforeEach(module('hopefutureBlogApp'));

  // instantiate service
  var myValue;
  beforeEach(inject(function (_myValue_) {
    myValue = _myValue_;
  }));

  it('should do something', function () {
    expect(!!myValue).toBe(true);
  });

});
