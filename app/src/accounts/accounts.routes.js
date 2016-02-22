angular
  .module('app.accounts')
  .config(function($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/src/accounts/account-list.html',
        controller: 'AccountCtrl',
        controllerAs: 'vm'
      })
      .when('/detail/:accountId', {
        templateUrl: '/app/src/accounts/account-detail.html',
        controller: 'AccountDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  });