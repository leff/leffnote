(function() {

angular.module('SampleModule', ['firebase'])
.controller('SampleController', SampleController)

function SampleController($scope, Auth, currentAuth) {
  $scope.example = "Example";
  $scope.auth = Auth;
  $scope.firebaseUser = currentAuth;

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    console.log("Signed in as:", firebaseUser);
    $scope.firebaseUser = firebaseUser;
  });
}

})();