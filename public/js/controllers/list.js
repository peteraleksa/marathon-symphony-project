angular.module('symphonyApp.symphonies').controller('ListController', ['$scope', '$routeParams', '$location', 'Global', 'Symphonies', function ($scope, $routeParams, $location, Global, Symphonies) {
    $scope.global = Global;
/*
    $scope.sidebarModel = 'Mine';
    $scope.sideFilter = "{'user': $routeParams.userId}";
    $scope.sideSort = '-created';

    $scope.find = function() {
        Symphonies.query(function(symphonies) {
            $scope.symphonies = symphonies;
        });
    };

    $scope.findOne = function() {
        Symphonies.get({
            symphonyId: $routeParams.symphonyId
        }, function(symphony) {
            $scope.symphony = symphony;
        });
    };

    // this isnt right
    // need to move increment to back end
    $scope.toggleFav = function() {
        console.log("toggle called");
        var symphony = Symphonies.get({
            symphonyId: $routeParams.symphonyId,
            userId: $routeParams.userId
            }, function(symphony) {
                $scope.symphony = symphony;
                $scope.symphony.favorites = symphony.favorites + 1;
                $scope.symphony.$update(function() {
                console.log("favorited");
            });
        });
        
    };

    $scope.toggleSidebar = function() {

    	if($scope.sidebarModel == 'Newest') {
    		$scope.sideSort = '-created';
    		$scope.sidebarModel = 'Top';
    	}

    	else if ($scope.sidebarModel == 'Top') {
    		$scope.sideSort = '-favorites';
    		$scope.sidebarModel = 'Newest';
    	}

    };
/*
// check egghead.io for this

    $scope.toggleFav = function(id) {
        Symphonies.get({
            symphonyId: id
        }, function(id) {
        	// show button clicked
            console.log('button clicked');
        });
    };
*/

}]);