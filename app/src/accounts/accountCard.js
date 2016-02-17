function AccountCard() {
  return {
    restrict: 'E',
    template: '<div>account card</div>'
  };
}

angular
  .module('app')
  .directive('AccountCard', AccountCard);
