//Articles service used for articles REST endpoint
angular.module('symphonyApp.symphonies').factory("Symphonies", ['$resource', function($resource) {
    return $resource('symphonies/:symphonyId', {
        symphonyId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

/* Services */
angular.module('symphonyApp.symphonies').factory("Years", ['$resource', function($resource) {
	return {
		getYears : function() {
			// return the promise directly
			return $resource('/years')
				.then(function(result) {
					//resolve the promise as the data
					return result.data;
				});
		}
	}
}]);
