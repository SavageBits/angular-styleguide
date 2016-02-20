'use strict';

var app = angular.module('app', ['app.core']);

//for debugging
app.config(["$logProvider", function ($logProvider) {
  $logProvider.debugEnabled(false);
}]);

//inject $log to use
// $log.debug('hello!');
'use strict';

angular.module('app').config(function () {});
//	function($routeProvider, $locationProvider) {
//$routeProvider
//	.when('/ploop', {
//		redirectTo: 'http://www.google.com'
//	})
//	.otherwise({
//		redirectTo: 'index.html'
//	});
//}
//	);
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

angular.module('app').service('accountSvc', AccountSvc);
'use strict';

function AccountCard() {
  return {
    restrict: 'E',
    template: '<div>account card</div>'
  };
}

angular.module('app').directive('accountCard', AccountCard);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountCtrl = function () {
  AccountCtrl.$inject = ["accountSvc", "$log"];
  function AccountCtrl(accountSvc, $log) {
    var _this = this;

    _classCallCheck(this, AccountCtrl);

    $log.debug('debug from AccountCtrl');

    this.myProperty = 'here i is';

    accountSvc.myGetFunction('/assets/data/contacts.json').then(function (result) {
      return _this.accounts = result.accounts;
    });
  }

  _createClass(AccountCtrl, [{
    key: 'myFunction',
    value: function myFunction(arg) {
      console.log(arg);
    }
  }]);

  return AccountCtrl;
}();

angular.module('app').controller('AccountCtrl', AccountCtrl);
'use strict';

angular.module('app.core', ['ngRoute']);