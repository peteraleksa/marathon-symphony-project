angular.module('symphonyApp.system').controller('WelcomeController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.sidebarModel = {
        top: {
            sort: '-favorites',
            selected: true
        },
        newest: {
            sort: '-created',
            selected: false
        },
        getSelected: function() {
            if(this.top.selected) {
                return this.top;
            }
            else {
                return this.newest;
            }
        }
    };

    $scope.sideSlct = {
        selected: $scope.sidebarModel.getSelected()
    }; 

    console.log($scope.sidebarModel.getSelected());

}]);