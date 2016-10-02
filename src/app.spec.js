describe('App', function test() {

  var $scope;

  beforeEach(module('app'));

  beforeEach(inject(function inject($rootScope) {
    $scope = $rootScope.$new();
  }));

  it('Resolves dependencies', function test1() {
    $scope.$apply();
  });

});