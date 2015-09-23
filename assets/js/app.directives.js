/*jslint white: true */

var app = angular.module( 'app-directives', ['ngRoute', 'ngSanitize'] );

/**
 * Directives
 */

app.directive( 'searchForm', function() {

    return {
        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'search-form.html',
        //template: 'Search Keyword: <input type="text" name="s" ng-model="filter.s" ng-change="search()">',
        controller: function( $scope, $http ) {
            $scope.filter = {
                s: ''
            };
            // Called with search()
            $scope.search = function() {

                if( $scope.filter.s.length >= 5 ) {

                    $http.get( 'wp-json/wp/v2/posts/?filter[s]=' + $scope.filter.s + '&filter[posts_per_page]=-1' )
                    .success( function( results ) {

                        $scope.posts = results;
                        $scope.currentPage = 1;
                        $scope.totalPages = 1;

                    } );

                }

            }
        },

    }

} );

app.directive( 'sidebar', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'sidebar.html'

    }

});

app.directive( 'categories', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'categories.html'

    }

});

app.directive( 'navigation', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'navigation.html',

    }

} );

app.directive( 'slider', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'slider.html',

    }

} );


app.directive('postsNavLink', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'posts-nav-link.html',
        controller: ['$scope', '$element', '$routeParams', function( $scope, $element, $routeParams ) {

            var currentPage = ( ! $routeParams.page ) ? 1 : parseInt( $routeParams.page ),
            linkPrefix = ( ! $routeParams.category ) ? 'page/' : '' + $routeParams.category + '/page/';

            $scope.postsNavLink = {
                prevLink: linkPrefix + ( currentPage - 1 ),
                nextLink: linkPrefix + ( currentPage + 1 ),
                sep: ( ! $element.attr( 'sep' ) ) ? '|' : $element.attr( 'sep' ),
                prevLabel: ( ! $element.attr( 'prev-label' ) ) ? 'Previous Page' : $element.attr( 'prev-label' ),
                nextLabel: ( ! $element.attr( 'next-label' ) ) ? 'Next Page' : $element.attr( 'next-label' )
            };

            console.log( 'currentPage', currentPage );

        }]

    }

} );

