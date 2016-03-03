function AccountDetailCtrl($rootScope, $routeParams, AccountSvc ) {
  var vm = this;

  $rootScope.$emit('titleChanged', 'account detail');

  AccountSvc.getAccountById($routeParams.accountId, function(account) {
    vm.account = account;
  });
}

angular
  .module('app.accounts')
  .controller('AccountDetailCtrl', AccountDetailCtrl);