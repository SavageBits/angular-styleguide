//angular
//	.module('app')
//	.config(function($routeProvider, $locationProvider){
//		$routeProvider
//			.when('/home', {
//				templateUrl: 'app/src/accounts/account-list.html'
//			})
//			.otherwise({
//				redirectTo: '/home'
//			});
//
//			$locationProvider.html5Mode({
//				enabled: true,
//				requireBase: false
//			});
//	});
"use strict";
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

AccountDetailCtrl.$inject = ["accountSvc", "$routeParams", "$scope"];
function AccountDetailCtrl(accountSvc, $routeParams, $scope) {
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountSvc = function () {
  AccountSvc.$inject = ["$http"];
  function AccountSvc($http) {
    _classCallCheck(this, AccountSvc);

    this.$http = $http;
  }

  _createClass(AccountSvc, [{
    key: 'myGetFunction',
    value: function myGetFunction(myApiRoute) {
      return this.$http.get(myApiRoute);
    }
  }, {
    key: 'getAccountById',
    value: function getAccountById(accountId, successCallback) {
      this.$http.get('/assets/data/accounts.json').then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].id == accountId) {
            successCallback(response.data[i]);
          }
        }
      });
    }
  }]);

  return AccountSvc;
}();

angular.module('app.accounts').service('accountSvc', AccountSvc);
'use strict';

angular.module('app.users').config(["$routeProvider", function ($routeProvider) {
	$routeProvider.when('/users', {
		templateUrl: '/app/src/users/user-list.html'
	});
}]);
'use strict';

function AccountCard() {
	return {
		templateUrl: 'app/src/widgets/accountCard/account-card.html'
	};
}

angular.module('app.widgets').directive('accountCard', AccountCard);
'use strict';

function UserDetail() {
	return {
		templateUrl: 'app/src/widgets/userDetail/user-detail.html'
	};
}

angular.module('app.widgets').directive('userDetail', UserDetail);