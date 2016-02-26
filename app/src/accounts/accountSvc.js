// ES6
// class AccountSvc {
//   constructor($http, $q) {
//     this.$http = $http;
//   }

//   myGetFunction(myApiRoute) {
//     return this.$http.get(myApiRoute);
//   }

//   getAccountById(accountId, successCallback) {    
//     this.$http.get('/assets/data/accounts.json')
//       .then(function(response) {
//         let i;
        
//         for  (i = 0; i < response.data.length; i += 1) {
//           if (response.data[i].id === accountId) {
//             successCallback(response.data[i]);
//             break;
//           }
//         }
//       });
//   }
// }

// angular
//   .module('app.accounts')
//   .service('accountSvc', AccountSvc);

function AccountSvc($http) {
  AccountSvc.myGetFunction = function(myApiRoute) {
    return $http.get(myApiRoute);
  }
  
  AccountSvc.getAccountById = function(accountId, successCallback) {
    $http.get('/assets/data/accounts.json')
      .then(function(response) {        
        var i;
        
        for  (i = 0; i < response.data.length; i += 1) {
          if (response.data[i].id === accountId) {
            successCallback(response.data[i]);
            break;
          }
        }        
      });
  }
  
  return AccountSvc;
}

angular
  .module('app.accounts')
  .factory('AccountSvc', AccountSvc);