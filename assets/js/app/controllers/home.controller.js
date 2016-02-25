(function() {

	'use strict';

	angular
		.module('OmdbMovies')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$location', '$timeout', '$localStorage', 'omdbService', 'dialogFactory'];

	function HomeController($scope, $location, $timeout, $localStorage, omdbService, dialogFactory) {

		$scope.collapse = false;
		$scope.progress = false;
		$scope.dialog = {};

		$scope.buscar = function(newSearch) {
			if(newSearch) {
				$scope.movies = [];
				$scope.limit = 6;
				$scope.page = 1;
				$scope.total = 0;
			}

			$scope.collapse = true;
			$scope.progress = true;
			$scope.checkPage();

			$localStorage.put('last-search', $scope.title);

			omdbService.search(
				{},
				{
					title: $scope.title,
					page: $scope.page
				},
				function(data) {
					if($scope.page > 1) {
						data.Search = $scope.movies.concat(data.Search);
					}

					$scope.movies = data.Search;
					$scope.total = parseInt(data.totalResults);
					$scope.progress = false;
				},
				function(data) {
					$scope.progress = false;
					$scope.showDialog('Erro', 'Ocorreu um erro, por favor tente novamente.');
				}
			);
		};

		$scope.checkPage = function() {
			if(angular.isDefined($scope.movies) && $scope.total > $scope.movies.length) {
				$scope.page = $scope.page + 1;
			}
			return $scope.page;
		};

		$scope.showDialog = function(title, text) {
			$scope.dialog.title = title;
			$scope.dialog.text = text;
			dialogFactory.show();
		};

		$scope.closeDialog = function() {
			dialogFactory.close();
		};

		$scope.moreInfo = function(id) {
			$location.path('/movie/' + id);
		};

		$scope.loadMore = function() {
			$timeout(function() {
				var diff = ($scope.total - $scope.limit);
				$scope.limit = $scope.limit + ((diff < 6) ? diff : 6);

				if($scope.total > $scope.movies.length) {
					$scope.buscar();
				}
			}, 100);

			console.log($scope.total + ' - ' + $scope.movies.length + ' - ' + $scope.limit);
		};

		$scope.$on('scrolled', function() {
			$scope.loadMore();
		});

		if($localStorage.get('last-search')) {
			$scope.title = $localStorage.get('last-search');
			$scope.buscar(true);
		}
	}

})();