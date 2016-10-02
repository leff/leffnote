(function(){

angular.module('app', [
  'ui.router',
  'templates',
  'firebase',
  'SampleModule',
  'Notes'
])
.run(AuthConfiguration)
.config(RouteConfiguration)
.factory('Auth', function($firebaseAuth) {
  return $firebaseAuth();
});

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
    templateUrl: 'modules/sample/sample.html',
    controller: 'SampleController',
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      currentAuth: function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }
    }
  });

  $stateProvider.state( 'notes', {
    url: '/notes/',
    controller: 'NotesController',
    templateUrl: 'modules/notes/notes.html',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      currentAuth: function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }
    }
  });
}

}());