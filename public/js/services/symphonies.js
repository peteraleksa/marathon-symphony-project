//Articles service used for articles REST endpoint
angular.module('symphonyApp.symphonies').factory("Symphonies", ['$resource', function($resource) {
    var service = $resource('symphonies/:symphonyId', {
            symphonyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }, {
            favorite: {
                method: 'POST'
            }
        }
    );

    return service;

}]);

angular.module('symphonyApp.symphonies').factory("MySymphonies", ['$resource', function($resource) {
    return $resource('users/:userId/symphonies', {
        userId: '@_id'
    });
}]);

angular.module('symphonyApp.symphonies').factory("Users", ['$resource', function($resource) {
    return {
        getId : function() {
        	return $resource('users/me', function(result) {
        		//resolve the promise as the data
        		return result.data;
        	});
        }
    }
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
