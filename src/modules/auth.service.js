(function() {
'use strict';

angular
  .module('app.AuthService', ['firebase'])
  .factory('AuthService', AuthService);

 AuthService.$inject = ['$firebaseAuth'];

function AuthService($firebaseAuth) {
  let firebaseAuthObject = $firebaseAuth();

  let service = {
    firebaseAuth: firebaseAuthObject,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn
  };

  return service;


  function login() {
    return firebaseAuthObject.$signInWithPopup('google');
  }

  function logout() {
    firebaseAuthObject.$signOut();
  }

  function isLoggedIn() {
    return firebaseAuthObject.$getAuth();
  }
}

})();