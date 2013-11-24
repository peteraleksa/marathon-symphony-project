angular.module('symphonyApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.myListLink = $scope.global.authenticated ? 
         "users/" + $scope.global.user._id + "/symphonies"
        : "";

    $scope.menu = [{
        "title": "Listen",
        "link": "symphonies/list",
    }, 
    {
        "title": "Compose",
        "link": "symphonies/compose",
    },
    {
    	"title": "About",
    	"link": "about",
    }];

    $scope.authmenu = [{
        "title": "My Symphonies",
        "link": $scope.myListLink,
    }];
    
    $scope.isCollapsed = false;
}]);