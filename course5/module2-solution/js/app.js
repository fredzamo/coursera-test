(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();

  buyList.buy = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  buyList.empty = function() {
      return buyList.items.length === 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var bougthList = this;

  bougthList.items = ShoppingListCheckOffService.getBoughtItems();

  bougthList.empty = function() {
      return bougthList.items.length === 0;
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
    },
    {
      name: "Candies",
      quantity: "1"
    }
  ];
  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var item = buyItems[itemIndex];
    boughtItems.push(item);
    buyItems.splice(itemIndex, 1);
  }

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
