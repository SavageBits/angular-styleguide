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
	$logProvider.debugEnabled(false);
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

function AccountCtrl() {
  var vm = this;
  vm.myProperty = 'oh hey';
}

angular.module('app.accounts').controller('AccountCtrl', AccountCtrl);
'use strict';

angular.module('app.accounts').config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'app/src/accounts/account-list.html',
		controller: 'AccountCtrl',
		controllerAs: 'vm'
	}).otherwise({
		redirectTo: '/home'
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
  }]);

  return AccountSvc;
}();

angular.module('app.accounts').service('accountSvc', AccountSvc);
'use strict';

function AccountCard() {
	return {
		templateUrl: 'app/src/widgets/accountCard/account-card.html'
	};
}

angular.module('app.widgets').directive('accountCard', AccountCard);
'use strict';

function UserDetail() {
	return {};
}

angular.module('app.widgets').directive('userDetail', UserDetail);