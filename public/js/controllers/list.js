angular.module('symphonyApp.symphonies').controller('ListController', ['$scope', '$routeParams', '$location', 'Global', 'Symphonies', function ($scope, $routeParams, $location, Global, Symphonies) {
    $scope.global = Global;

    $scope.signInToSubmit = function() {
        if(!global.authenticated) {
            console.log("mouseover submit");
        }
    };

}]);