(function() {

angular.module('Home', ['firebase'])
.controller('HomeController', HomeController)

function HomeController($scope, Auth, currentAuth) {
  $scope.auth = Auth;
  $scope.firebaseUser = currentAuth;

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    console.log("Signed in as:", firebaseUser);
    $scope.firebaseUser = firebaseUser;
  });
}

})();