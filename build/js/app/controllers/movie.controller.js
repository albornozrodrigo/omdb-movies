(function() {

	'use strict';

	angular
		.module('OmdbMovies')
		.controller('MovieController', MovieController);

	MovieController.$inject = ['$scope', '$location', '$routeParams', 'omdbService', 'dialogFactory'];

	function MovieController($scope, $location, $routeParams, omdbService, dialogFactory) {

		omdbService.info(
			{},
			{ imdbID: $routeParams.id },
			function(data) {
				$scope.movie = data;
			},
			function(data) {
				$scope.showDialog('Erro', 'Ocorreu um erro, por favor tente novamente.');
				$location.path('/');
			}
		);

		$scope.goBack = function() {
			$location.path('/');
		};

		$scope.showDialog = function(title, text) {
			$scope.dialog.title = title;
			$scope.dialog.text = text;
			dialogFactory.show();
		};

		$scope.closeDialog = function() {
			dialogFactory.close();
		};

	}

})();