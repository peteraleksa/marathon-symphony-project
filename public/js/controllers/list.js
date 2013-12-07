angular.module('symphonyApp.symphonies').controller('ListController', ['$scope', '$routeParams', '$location', 'Global', 'Symphonies', function ($scope, $routeParams, $location, Global, Symphonies) {
    $scope.global = Global;

    // stop player
    if($scope.player != null) {
    	$scope.player.stop();
    }

    $scope.signInToSubmit = function() {
        if(!global.authenticated) {
            console.log("mouseover submit");
        }
    };

}]);