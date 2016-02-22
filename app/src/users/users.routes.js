angular
  .module('app.users')
  .config(function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: '/app/src/users/user-list.html'
      });
  });