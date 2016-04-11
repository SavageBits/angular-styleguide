function Info($log) {
  return {
    scope: {
      title: '=infoTitle'
    },
    templateUrl: '/app/src/widgets/info/info.html',
    transclude: true,
    link: function(scope, element, attributes, controller, transclude) {
      element.find('.content').append(transclude());
    }
  }
}

angular
  .module('app')
  .directive('info', Info);
  