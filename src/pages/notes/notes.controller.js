(function() {

angular.module('app.Notes', ['firebase'])
.controller('NotesController', NotesController)

function NotesController($scope, currentAuth, $firebaseArray) {
  $scope.firebaseUser = currentAuth;
  $scope.newnote = {};

  let notesRef = firebase.database().ref().child('notes').child(currentAuth.uid);
  $scope.notes = $firebaseArray(notesRef); // for adding too, etc

  let query = notesRef.orderByChild('sortstamp').limitToLast(25);
  $scope.filteredNotes = $firebaseArray(query); // for display

  $scope.addNote = () => {
    let n = angular.copy($scope.newnote);
    $scope.notes.$add({
      title: n.title,
      src: n.src,
      content: n.content,
      sortstamp: 0 - Date.now()
    });
    $scope.newnote = {};
  }
}

})();