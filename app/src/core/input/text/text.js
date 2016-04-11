(function () {
  function Text() {
    return {
      templateUrl: '/app/src/core/input/text/input-text.html'
    }
  }  

  angular
    .module('app.core')
    .directive('inputText', Text);  
})();