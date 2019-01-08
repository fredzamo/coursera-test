(function () {
'use strict';

angular.module('Data')
.component('categories', {
  templateUrl: 'src/menu/templates/main.categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
