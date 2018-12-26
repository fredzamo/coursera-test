(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {

  $scope.buyItems = ShoppingListCheckOffService.getBuyItems();

  $scope.bought = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  }

  $scope.empty = function() {
      return $scope.buyItems.length === 0;
  }
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {

  $scope.boughtItems = ShoppingListCheckOffService.getBoughtItems();

  $scope.empty = function() {
      return $scope.boughtItems.length === 0;
  }
}

// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];
  var boughtItems = [];

  service.boughtItem = function (itemIndex) {
    var item = buyItems[itemIndex];
    boughtItems.push(item);
    buyItems.splice(itemIndex, 1);
  }

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    buyItems.push(item);
  };

  service.removeItem = function (itemIndex) {
    buyItems.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
