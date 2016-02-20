class AccountCtrl {
  constructor(accountSvc,$log) {
    $log.debug('debug from AccountCtrl');

    this.myProperty = 'here i is';

    accountSvc.myGetFunction('/assets/data/contacts.json')
      .then(result => this.accounts = result.accounts);
  }

  myFunction(arg) {
    console.log(arg);
  }
}

angular
  .module('app')
  .controller('AccountCtrl', AccountCtrl);
