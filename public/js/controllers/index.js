angular.module('symphonyApp.system').controller('WelcomeController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.sideSort = '-favorites';
    // stop player
    if($scope.player != null) {
    	$scope.player.stop();
    }

}]);