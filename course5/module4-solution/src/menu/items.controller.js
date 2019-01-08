(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['menuItems'];
function ItemsController(menuItems) {
  var $ctrl = this;

  $ctrl.menuItems = menuItems;
  console.log($ctrl.menuItems);
}

})();
