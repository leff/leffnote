(function() {

angular.module('Notes', ['firebase'])
.controller('NotesController', NotesController)

function NotesController($scope, currentAuth, $firebaseArray) {
  let i = 1;
  $scope.firebaseUser = currentAuth;

  console.log("user", $scope.firebaseUser);

  let notesRef = firebase.database().ref().child('notes').child(currentAuth.uid);
  $scope.notes = $firebaseArray(notesRef); // for adding too, etc

  let query = notesRef.orderByChild('timestamp').limitToLast(25);
  $scope.filteredNotes = $firebaseArray(query); // for display

  $scope.addNote = () => {
    $scope.notes.$add({
      title: `My New Note ${i++}`,
      content: 'Some text for you. Cool.'
    })
  }
}

})();