function UserCtrl($rootScope) {
  var vm = this;
  
  $rootScope.$emit('titleChanged', 'user detail');
}

angular
  .module('app.users')
  .controller('UserCtrl', UserCtrl);