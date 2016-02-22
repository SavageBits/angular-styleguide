function UserDetail() {
  return {
    templateUrl: 'app/src/widgets/userDetail/user-detail.html'
  }
}

angular
  .module('app.widgets')
  .directive('userDetail', UserDetail);