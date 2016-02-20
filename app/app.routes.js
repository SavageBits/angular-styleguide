angular
	.module('app')
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			.when('/home', {
				templateUrl: 'app/src/accounts/account-list.html'
			})
			.otherwise({
				redirectTo: '/home'
			});

			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	});