(function() {

	'use strict';

	angular
		.module('OmdbMovies')
		.factory('dialogFactory', dialogFactory);

	function dialogFactory() {
		var factory = {
			show: show,
			close: close
		};

		function show() {
			var dialog = document.querySelector('dialog');

			if(!dialog.showModal) {
    			dialogPolyfill.registerDialog(dialog);
    		}

			dialog.showModal();
		}

		function close() {
			var dialog = document.querySelector('dialog');
			dialog.close();
		}

		return factory;
	}

})();