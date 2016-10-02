(function() {

angular.module('SampleModule', [])
.controller('SampleController', SampleController)

function SampleController($scope) {
  $scope.example = "Example";
}

})();