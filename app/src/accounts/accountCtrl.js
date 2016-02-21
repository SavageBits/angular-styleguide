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

function AccountCtrl() {
  var vm = this;
  vm.myProperty = 'oh hey';
}

angular
  .module('app.accounts')
  .controller('AccountCtrl', AccountCtrl);
