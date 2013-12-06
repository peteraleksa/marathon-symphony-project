//Setting up route
/***********************************************
  This is where we route to the partials,

    /welcome
      the welcome page
      uses the WelcomeCtrl controller

    /compose
      the page for choosing composition options
      uses the ComposeCtrl controller

    /symphonies
      shows the list of all symphonies 
      uses the SymphonyListCtrl controller

    /symphonies/:symphonyId where symphonyId is the id of the symphony object to view 
      shows the symphony detail viewd
      uses the SymphonyDetailCtrl controller

    default view is /welcome

 **********************/

window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
          when('/welcome', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
          }).
          when('/symphonies/compose', {
            templateUrl: 'views/symphonies/compose.html',
            controller: 'SymphonyController'
          }).
          when('/symphonies/list', {
            templateUrl: 'views/symphonies/list.html',
            controller: 'SymphonyController'
          }).
          when('/symphonies/users/:userId', {
            templateUrl: 'views/symphonies/mylist.html',
            controller: 'SymphonyController'
          }).
          when('/favorites/users/:userId', {
            templateUrl: 'views/symphonies/favlist.html',
            controller: 'SymphonyController'
          }).
          when('/about', {
            templateUrl: 'views/about.html'
          }).
          when('/symphonies/:symphonyId', {
            templateUrl: 'views/symphonies/view.html',
            controller: 'SymphonyController'
          }).
          otherwise({
            redirectTo: '/welcome'
          });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);

