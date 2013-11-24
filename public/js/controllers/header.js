angular.module('symphonyApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.myListLink = "users/" + $scope.global.user._id + "/symphonies";

    $scope.menu = [{
        "title": "Listen",
        "link": "symphonies/list",
        "show": "global"
    }, 
    {
        "title": "Compose",
        "link": "symphonies/compose",
        "show": "global"
    },
    {
    	"title": "About",
    	"link": "about",
        "show": "global"
    },
    {
        "title": "My Symphonies",
        "link": $scope.myListLink,
        "show": "global.authenticated"
    }];
    
    $scope.isCollapsed = false;
}]);