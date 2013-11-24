angular.module('symphonyApp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

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
    }];

    $scope.authmenu = [{
        "title": "My Symphonies",
        "link": "user/:userId/symphonies",
        "show": "global.authenticated"
    }];
    
    $scope.isCollapsed = false;
}]);