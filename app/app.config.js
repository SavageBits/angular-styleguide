//for debugging
angular
	.module('app')
	.config(function($logProvider){
		$logProvider.debugEnabled(false);
	});

//inject $log to use
// $log.debug('hello!');