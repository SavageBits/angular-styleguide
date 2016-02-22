class AccountSvc {
  constructor($http) {
    this.$http = $http;
  }

  myGetFunction(myApiRoute) {
    return this.$http.get(myApiRoute);
  }

  getAccountById(accountId, successCallback) {
    this.$http.get('/assets/data/accounts.json')
      .then(function(response) {
        console.log(response);
        for (var i=0; i < response.data.length; i++) {
          if (response.data[i].id == accountId) {
            successCallback(response.data[i]);
          }
        }
      });
  }
}

angular
  .module('app.accounts')
  .service('accountSvc', AccountSvc);
