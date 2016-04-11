function AccountCard() {
  return {
    templateUrl: '/app/src/widgets/accountCard/account-card.html'
  }
}

angular
  .module('app.widgets')
  .directive('accountCard', AccountCard);
  