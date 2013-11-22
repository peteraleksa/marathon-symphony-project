angular.module('symphonyApp.system').controller('WelcomeController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.sidebarModel = 'Top';
    $scope.sideSort = '-favorites';

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

}]);