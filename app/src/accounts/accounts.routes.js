angular
	.module('app.accounts')
	.config(function($routeProvider,$locationProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'app/src/accounts/account-list.html',
				controller: 'AccountCtrl',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/home'
			});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		})
	});