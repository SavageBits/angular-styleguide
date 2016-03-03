function NavHeader() {
    return {
      templateUrl: '/app/src/widgets/navHeader/nav-header.html'
    }
}

angular
  .module('app.widgets')
  .directive('navHeader', NavHeader);