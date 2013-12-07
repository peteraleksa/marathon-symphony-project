window.app = angular.module('symphonyApp', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'uiSlider', 'symphonyApp.system', 'symphonyApp.symphonies', 'symphonyApp.compose']);
angular.module('symphonyApp.system', []);
angular.module('symphonyApp.symphonies', []);
angular.module('symphonyApp.compose', []);
angular.module('uiSlider', []);