//class AccountCtrl {
//  constructor(accountSvc,$log) {
//    $log.debug('debug from AccountCtrl');
//
//    this.myProperty = 'here i is';
//
//    accountSvc.myGetFunction('/assets/data/contacts.json')
//      .then(result => this.accounts = result.accounts);
//  }
//
//  myFunction(arg) {
//    console.log(arg);
//  }
//}

function AccountCtrl(AccountSvc, $rootScope) {
  var vm = this;
  vm.myProperty = 'my property';
  
  $rootScope.$emit('titleChanged', 'home');

  AccountSvc.myGetFunction('/assets/data/accounts.json')
    .then(function(response) {
      vm.accounts = response.data;
    });
}

angular
  .module('app.accounts')
  .controller('AccountCtrl', AccountCtrl);
