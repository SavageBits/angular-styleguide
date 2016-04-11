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

AccountCtrl.$inject = ["$rootScope", "$log", "AccountSvc"];
function AccountCtrl($rootScope, $log, AccountSvc) {
  var vm = this;

  $log.debug('Set $logProvider.debugEnabled(false) in app.config.js to turn this message off');

  vm.myProperty = 'my property';

  $rootScope.$emit('titleChanged', 'home');

  AccountSvc.myGetFunction('/assets/data/accounts.json').then(function (response) {
    vm.accounts = response.data;
  });
}

angular.module('app.accounts').controller('AccountCtrl', AccountCtrl);
'use strict';

AccountDetailCtrl.$inject = ["$rootScope", "$routeParams", "AccountSvc"];
function AccountDetailCtrl($rootScope, $routeParams, AccountSvc) {
  var vm = this;

  $rootScope.$emit('titleChanged', 'account detail');

  AccountSvc.getAccountById($routeParams.accountId, function (account) {
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

HeaderCtrl.$inject = ["$rootScope"];
function HeaderCtrl($rootScope) {
  var vm = this;

  $rootScope.$on('titleChanged', function (event, title) {
    vm.title = title;
  });
}

angular.module('app.header').controller('HeaderCtrl', HeaderCtrl);
'use strict';

UserCtrl.$inject = ["$rootScope"];
function UserCtrl($rootScope) {
  var vm = this;

  $rootScope.$emit('titleChanged', 'user detail');
}

angular.module('app.users').controller('UserCtrl', UserCtrl);
'use strict';

angular.module('app.users').config(["$routeProvider", function ($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: '/app/src/users/user-list.html',
    controller: 'UserCtrl',
    controllerAs: 'vm'
  });
}]);
'use strict';

function AccountCard() {
  return {
    templateUrl: '/app/src/widgets/accountCard/account-card.html'
  };
}

angular.module('app.widgets').directive('accountCard', AccountCard);
'use strict';

Info.$inject = ["$log"];
function Info($log) {
  return {
    scope: {
      title: '=infoTitle'
    },
    templateUrl: '/app/src/widgets/info/info.html',
    transclude: true,
    link: function link(scope, element, attributes, controller, transclude) {
      element.find('.content').append(transclude());
    }
  };
}

angular.module('app').directive('info', Info);
'use strict';

function AccountDetailCard() {
  return {
    templateUrl: '/app/src/widgets/accountDetailCard/account-detail-card.html'
  };
}

angular.module('app.widgets').directive('accountDetailCard', AccountDetailCard);
'use strict';

function NavHeader() {
  return {
    templateUrl: '/app/src/widgets/navHeader/nav-header.html'
  };
}

angular.module('app.widgets').directive('navHeader', NavHeader);
'use strict';

UserDetail.$inject = ["$rootScope"];
function UserDetail($rootScope) {
  return {
    templateUrl: '/app/src/widgets/userDetail/user-detail.html'
  };
}

angular.module('app.widgets').directive('userDetail', UserDetail);
'use strict';

(function () {
  function Text() {
    return {
      templateUrl: '/app/src/core/input/text/input-text.html'
    };
  }

  angular.module('app.core').directive('inputText', Text);
})();