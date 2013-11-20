angular.module('symphonyApp.system').controller('WelcomeController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);