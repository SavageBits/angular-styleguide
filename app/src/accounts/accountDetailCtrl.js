function AccountDetailCtrl(accountSvc, $routeParams, $scope) {
	var vm = this;

	accountSvc.getAccountById($routeParams.accountId, function(account) {
		vm.account = account;
	});
}

angular
	.module('app.accounts')
	.controller('AccountDetailCtrl', AccountDetailCtrl);