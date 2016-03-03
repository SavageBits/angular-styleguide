function HeaderCtrl($rootScope) {
  var vm = this;
  
  $rootScope.$on('titleChanged', function(event, title) {
    vm.title = title;
  });
}

angular
  .module('app.header')
  .controller('HeaderCtrl', HeaderCtrl);