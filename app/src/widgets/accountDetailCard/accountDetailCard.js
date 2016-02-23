function AccountDetailCard() {
  return {
    templateUrl: '/app/src/widgets/accountDetailCard/account-detail-card.html'
  }
}

angular
  .module('app.widgets')
  .directive('accountDetailCard', AccountDetailCard);