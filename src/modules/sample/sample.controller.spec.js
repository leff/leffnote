describe('SampleController', function test() {

  var $scope;

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
    var controller = createController();
    expect($scope.example).toEqual("Example");
  });

});