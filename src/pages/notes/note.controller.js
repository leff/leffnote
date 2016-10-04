(function() {

angular.module('app.Note', ['firebase'])
.controller('NoteController', NoteController)

function NoteController($scope, currentAuth, $firebaseObject, $stateParams) {
  $scope.firebaseUser = currentAuth;


  let noteRef = firebase.database().ref()
    .child('notes')
    .child(currentAuth.uid)
    .child($stateParams.id);
  $scope.note = $firebaseObject(noteRef);


  $scope.editNote = () => {
    $scope.note.title = 'edited title';
    $scope.note.$save();
  }
}

})();