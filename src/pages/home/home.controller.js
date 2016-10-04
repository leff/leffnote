(function() {
'use strict';

angular.module('app.Home', ['firebase', 'app.AuthService'])
.controller('HomeController', HomeController)

function HomeController($scope, currentAuth) {

}

})();