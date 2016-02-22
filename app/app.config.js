//for debugging
angular
	.module('app')
	.config(function($logProvider){
		$logProvider.debugEnabled(true);
	});

//inject $log to use
// $log.debug('hello!');