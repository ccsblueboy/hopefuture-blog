'use strict';

describe('Controller: DemoGridCtrl', function () {

  // load the controller's module
  beforeEach(module('hopefutureBlogApp'));

  var demoGridCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    demoGridCtrl = $controller('DemoGridCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
