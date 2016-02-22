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

function AccountCtrl(accountSvc) {
  var vm = this;
  vm.myProperty = 'oh hey';

  accountSvc.myGetFunction('/assets/data/accounts.json')
    .then(function(response) {
      vm.accounts = response.data;
    });
}

angular
  .module('app.accounts')
  .controller('AccountCtrl', AccountCtrl);
