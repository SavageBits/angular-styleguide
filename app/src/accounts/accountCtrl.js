class AccountCtrl {
  constructor() {
      this.myProperty = 'here i is';
  }

  myFunction(arg) {
    console.log(arg);
  }
}

angular
  .module('app')
  .controller('AccountCtrl', AccountCtrl);
