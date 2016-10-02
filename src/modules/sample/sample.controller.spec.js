describe('SampleController', function test() {

  let $scope, createController;

  beforeEach(module('app'));

  beforeEach(inject(function inject($rootScope, $controller) {
    $scope = $rootScope.$new();
    createController = function() {
      return $controller('SampleController', {
        '$scope': $scope
      });
    };
  }));

  it('Sets scope', function testScope() {
    let controller = createController();
    expect($scope.example).toEqual("Example");
  });

});