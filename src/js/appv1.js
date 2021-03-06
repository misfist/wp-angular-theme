angular.module( 'app', ['ngRoute', 'ngSanitize'] )
.config( function( $routeProvider, $locationProvider ) {

    $locationProvider.html5Mode( true );

    // If you get 'Error: $location:nobase $location in HTML5 mode requires a tag to be present!' https://docs.angularjs.org/error/$location/nobase
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

    $routeProvider
    .when( '/', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'Main'
    } )
    .when( '/:id', {
        templateUrl: ngThemeViews.partials + 'content.html',
        controller: 'Content'
    } );

} )
.controller( 'Main', function( $scope, $http, $routeParams ) {

    $http.get( 'wp-json/wp/v2/posts/' )
    .success( function( posts ) {

        $scope.posts = posts;

    } );

    console.log( 'main is loaded.' );

} )
.controller( 'Content', function( $scope, $http, $routeParams ) {

    $http.get( 'wp-json/wp/v2/posts/' + $routeParams.id )
    .success( function( post ) {

        $scope.post = post;

    } );

} )
.directive( 'searchForm', function() {

    return {
        restrict: 'E',
        templateUrl: ngThemeViews.partials + 'search-form.html',
        controller: function( $scope, $http ) {
            $scope.filter = {
                s: ''
            };
            // Called with search()
            $scope.search = function() {

                if( $scope.filter.s.length >= 5 ) {

                    $http.get( 'wp-json/wp/v2/posts/?filter[s]=' + $scope.filter.s )
                    .success( function( results ) {
                        $scope.posts = results;
                    } );

                }

            }
        },

    }

} )
.directive( 'sidebar', function() {

    return {

        restrict: 'E',
        templateUrl: ngThemeViews.partials + 'sidebar.html'

    }

})
.directive( 'navigation', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'navigation.html',

    }

} );
