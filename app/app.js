var angular = require('angular');

angular
    .module('app',[]);

angular
    .module('app')
    .controller('MyCtrl',function($scope) {
        $scope.myProperty = 'oh cool';
    });
