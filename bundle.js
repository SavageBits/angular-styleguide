'use strict';

//for debugging
angular.module('app').config(["$logProvider", function ($logProvider) {
  $logProvider.debugEnabled(true);
}]);

//inject $log to use
// $log.debug('hello!');
'use strict';

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

AccountCtrl.$inject = ["accountSvc"];
function AccountCtrl(accountSvc) {
  var vm = this;
  vm.myProperty = 'oh hey';

  accountSvc.myGetFunction('/assets/data/accounts.json').then(function (response) {
    vm.accounts = response.data;
  });
}

angular.module('app.accounts').controller('AccountCtrl', AccountCtrl);
'use strict';

AccountDetailCtrl.$inject = ["$routeParams", "AccountSvc"];
function AccountDetailCtrl($routeParams, AccountSvc) {
  var vm = this;

  accountSvc.getAccountById($routeParams.accountId, function (account) {
    vm.account = account;
  });
}

angular.module('app.accounts').controller('AccountDetailCtrl', AccountDetailCtrl);
'use strict';

angular.module('app.accounts').config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/app/src/accounts/account-list.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm'
  }).when('/detail/:accountId', {
    templateUrl: '/app/src/accounts/account-detail.html',
    controller: 'AccountDetailCtrl',
    controllerAs: 'vm'
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
'use strict';

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

AccountSvc.$inject = ["$http"];
function AccountSvc($http) {
  AccountSvc.myGetFunction = function (myApiRoute) {
    return $http.get(myApiRoute);
  };

  AccountSvc.getAccountById = function (accountId, successCallback) {
    $http.get('/assets/data/accounts.json').then(function (response) {
      var i;

      for (i = 0; i < response.data.length; i += 1) {
        if (response.data[i].id === accountId) {
          successCallback(response.data[i]);
          break;
        }
      }
    });
  };

  return AccountSvc;
}

angular.module('app.accounts').factory('AccountSvc', AccountSvc);
'use strict';

angular.module('app.users').config(["$routeProvider", function ($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: '/app/src/users/user-list.html'
  });
}]);
'use strict';

function AccountDetailCard() {
  return {
    templateUrl: '/app/src/widgets/accountDetailCard/account-detail-card.html'
  };
}

angular.module('app.widgets').directive('accountDetailCard', AccountDetailCard);
'use strict';

function AccountCard() {
  return {
    templateUrl: '/app/src/widgets/accountCard/account-card.html'
  };
}

angular.module('app.widgets').directive('accountCard', AccountCard);
'use strict';

function UserDetail() {
  return {
    templateUrl: '/app/src/widgets/userDetail/user-detail.html'
  };
}

angular.module('app.widgets').directive('userDetail', UserDetail);