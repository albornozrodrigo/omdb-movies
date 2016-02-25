(function() {

	'use strict';

	angular
		.module('OmdbMovies')
		.service('omdbService', omdbService);

	omdbService.$inject = ['$resource'];

	function omdbService($resource) {
		var url = 'https://www.omdbapi.com';
		var params = {
			title: '@title',
			page: '@page',
			imdbID: '@imdbID'
		};
		var options = {};
		var actions = {
			search: {
				method: 'GET',
				url: url + '/?s=:title&type=movie&page=:page',
			},
			info: {
				method: 'GET',
				url: url + '/?i=:imdbID'
			}
		};

		return $resource(url, params, actions, options);
	}

})();