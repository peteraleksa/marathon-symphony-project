angular.module('symphonyApp.symphonies').controller('SymphonyController', ['$scope', '$routeParams', '$location', 'Global', 'Symphonies', 'Years', function ($scope, $routeParams, $location, Global, Symphonies, Years) {
    $scope.global = Global;

    $scope.toggleFav = function(id) {
        Symphonies.get({
            symphonyId: id
        }, function(id) {
        	// show button clicked
            $(id).class('highlight');
        });
    };

}]);