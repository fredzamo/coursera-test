(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function () {
    return getData("https://davids-restaurant.herokuapp.com/categories.json").then(function (result) {
      return result.data;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return getData("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName).then(function (result) {
      return result.data.menu_items;
    });
  };

  var getData = function (url) {
    var response = $http({
      method: "GET",
      url: url
    });

    return response;
  };
}

})();
