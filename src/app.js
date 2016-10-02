(function(){

angular.module('app', [
  'ui.router',
  'templates',
  'SampleModule'
])
.config(RouteConfiguration);

function RouteConfiguration($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state( 'home', {
    url: '/',
    templateUrl: 'modules/sample/sample.html',
    controller: 'SampleController'
  });
}

}());