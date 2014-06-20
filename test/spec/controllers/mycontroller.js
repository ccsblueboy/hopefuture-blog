'use strict';

describe('Controller: MycontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('hopefutureBlogApp'));

  var MycontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MycontrollerCtrl = $controller('MycontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
