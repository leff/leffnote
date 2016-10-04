(function(){
'use strict';

angular.module('app', [
  'ui.router',
  'templates',
  'firebase',
  'app.AuthService',
  'app.Nav',
  'app.Home',
  'app.Notes'
])
.run(AuthConfiguration)
.config(RouteConfiguration);

// See https://github.com/firebase/angularfire/blob/master/docs/guide/user-auth.md

function AuthConfiguration($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("home");
    }
  });
}

function RouteConfiguration($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state( 'home', {
    url: '/',
    templateUrl: 'pages/home/home.html',
    controller: 'HomeController',
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      currentAuth: function(AuthService) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return AuthService.firebaseAuth.$waitForSignIn();
      }
    }
  });

  $stateProvider.state( 'notes', {
    url: '/notes/',
    controller: 'NotesController',
    templateUrl: 'pages/notes/notes.html',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      currentAuth: function(AuthService) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return AuthService.firebaseAuth.$requireSignIn();
      }
    }
  });
}

}());