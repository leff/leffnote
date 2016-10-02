(function() {

angular.module('Notes', ['firebase'])
.controller('NotesController', NotesController)

function NotesController($scope, currentAuth, $firebaseArray) {
  let i = 1;
  $scope.firebaseUser = currentAuth;

  let notesRef = firebase.database().ref().child("notes");
  // download the data from a Firebase reference into a (pseudo read-only) array
  // all server changes are applied in realtime
  $scope.notes = $firebaseArray(notesRef);
  // create a query for the most recent 25 messages on the server
  let query = notesRef.orderByChild("timestamp").limitToLast(25);
  // the $firebaseArray service properly handles database queries as well
  $scope.filteredNotes = $firebaseArray(query);

  $scope.addNote = () => {
    $scope.notes.$add({
      title: `My New Note ${i++}`,
      content: 'Some text for you. Cool.'
    })
  }
}

})();