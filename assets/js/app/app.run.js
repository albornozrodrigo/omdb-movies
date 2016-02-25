(function() {

    'use strict';

    angular
        .module('OmdbMovies')
        .run(run);

    run.$inject = ['$rootScope', '$localStorage'];

    function run($rootScope, $localStorage) {
        Matrix();

    	$rootScope.$on('$routeChangeStart', function(event, next, prev) {
    		if(angular.isUndefined(prev) && next.controller == 'HomeController') {
    			$localStorage.remove('last-search');
    		}
    	});
    }

})();