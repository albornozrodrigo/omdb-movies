(function() {

	'use strict';

	angular
		.module('OmdbMovies')
		.service('omdbService', omdbService);

	omdbService.$inject = ['$resource'];

	function omdbService($resource) {
		var url = 'http://www.omdbapi.com';
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
				/*isArray: true,
				transformResponse: function(data) {
					return JSON.parse(data).Search;
				}*/
			},
			info: {
				method: 'GET',
				url: url + '/?i=:imdbID'
			}
		};

		return $resource(url, params, actions, options);
	}

})();