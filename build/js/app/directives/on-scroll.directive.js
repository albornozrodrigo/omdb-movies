(function() {

    'use strict';

    angular
        .module('OmdbMovies')
        .directive('onScroll', onScroll);

    onScroll.$inject = ['$rootScope'];

    function onScroll($rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        };

        link.$inject = ['$scope', '$element', '$attrs'];

        function link($scope, $element, $attrs) {
            var element = $element[0];

            $element.bind('scroll', function() {
                if(element.scrollTop + element.offsetHeight >= element.scrollHeight) {
                    $rootScope.$broadcast('scrolled');
                }
            });
        }

        return directive;
    }

})();