var app = angular.module('app',[
	'app.core'
]);

//for debugging
 app.config(function($logProvider){
     $logProvider.debugEnabled(false);
 });

//inject $log to use
// $log.debug('hello!');