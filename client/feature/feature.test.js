describe('AngularSeed Feature Test', function () {

  // load the controller's module
  beforeEach(module('angularseed'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeatureCtrl = $controller('FeatureController', {
      $scope: scope
    });
  }));

  it('should do something', function () {
    expect(FeatureCtrl.foo).toBe('Bar');
  });
});
