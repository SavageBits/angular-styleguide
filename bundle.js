'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountCard() {
  return {
    restrict: 'E',
    template: '<div>account card</div>'
  };
}

angular.module('app').directive('AccountCard', AccountCard);

'use strict';

var AccountCtrl = function () {
  function AccountCtrl() {
    _classCallCheck(this, AccountCtrl);

    this.myProperty = 'here i is';
  }

  _createClass(AccountCtrl, [{
    key: 'myFunction',
    value: function myFunction(arg) {
      console.log(arg);
    }
  }]);

  return AccountCtrl;
}();

angular.module('app').controller('AccountCtrl', AccountCtrl);