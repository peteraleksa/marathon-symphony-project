angular.module('symphonyApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Listen",
        "link": "symphonies/list"
    }, 
    {
        "title": "Compose",
        "link": "symphonies/compose"
    },
    {
    	"title": "About",
    	"link": "about"
    }];
    
    $scope.isCollapsed = false;
}]);