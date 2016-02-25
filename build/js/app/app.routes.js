(function() {

	'use strict';

	angular
		.module('OmdbMovies')
		.config(routes);

	routes.$inject = ['$routeProvider'];

	function routes($routeProvider) {
		$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/movie/:id', {
			templateUrl: 'views/movie.html',
			controller: 'MovieController'
		});
	}

})();