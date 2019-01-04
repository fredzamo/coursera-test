(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.service('RetrieveDataService', RetrieveDataService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    restrict: "E",
    templateUrl: '../template.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.searchTerm = "";

  list.msg = MenuSearchService.getMessage();

  list.foundItems = MenuSearchService.getMenuItems();

  list.getMatchedMenuItems = function (searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm);
  };

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeMenuItem(itemIndex);
    console.log("still " + list.foundItems.length + " items present");
  };

}

MenuSearchService.$inject = ['RetrieveDataService'];
function MenuSearchService(RetrieveDataService) {
  var service = this;

  var menuItems = [];

  var message = {
      msg: "",
  };

  service.getMenuItems = function () {
    return menuItems;
  };

  service.getMessage = function () {
    return message;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    retrieveMenuItems(searchTerm);
  };

  service.removeMenuItem = function (itemIndex) {
    menuItems.splice(itemIndex, 1);
  };

  // private function used to retrieve items
  function retrieveMenuItems(searchTerm) {

    menuItems.splice(0,menuItems.length);

    var promise = RetrieveDataService.retrieveData("https://davids-restaurant.herokuapp.com/menu_items.json");

    promise.then(function (response) {
      for (var i = 0; i< response.data.menu_items.length; i++) {
        var item = response.data.menu_items[i];
        if (searchTerm !== "" && item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          menuItems.push(item);
        }
      }

      if (menuItems.length === 0) {
        message.msg = "Nothing found";
      } else {
        message.msg = "";
      }

    }).catch(function (error) {
      console.log("error occurred");
    });
  };
}

RetrieveDataService.$inject = ['$http'];
function RetrieveDataService($http) {
  var service = this;

  service.retrieveData = function (url) {
    var response = $http({
      method: "GET",
      url: url
    });

    return response;
  };
}

})();
