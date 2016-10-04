(function(){
'use strict';

angular.module('app.Nav', ['app.AuthService'])
.directive('lnNav', NavDirective);



function NavDirective() {
  return {
    templateUrl: 'modules/nav/nav.html',
    restrict: 'E',
    controller: NavController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      pageTitle: '@'
    }
  }
}

NavController.$inject = ['AuthService'];
function NavController(AuthService) {
  var vm = this;
  vm.user = AuthService.isLoggedIn();
  vm.login = AuthService.login;
  vm.logout = AuthService.logout;

  console.log(vm);
}

}());