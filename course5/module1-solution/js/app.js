(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunchMenu;

    $scope.onClick = function() {

      if ($scope.lunchMenu != undefined && $scope.lunchMenu != "") {
        var dishes = $scope.lunchMenu.split(",");
        var dLength = dishes.length;

        console.log("dishes length = '%d'", dLength);
        if (dLength <= 3) {
          $scope.message = "Enjoy!";
          console.log("Enjoy [%s]", dishes.toString());
        } else {
          $scope.message = "Too much!";
          console.log("Too much [%s]", dishes.toString());
        }
      } else {
        $scope.message = "Please enter data first";
        console.log("Please enter data first");
      }
    }

  }



})();
