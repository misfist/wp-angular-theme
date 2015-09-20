var app = angular.module( 'app', ['ngRoute', 'ngSanitize', 'app-controllers', 'app-directives'] );

/**
 * Config
 */

app.config( function( $routeProvider, $locationProvider ) {

    $locationProvider.html5Mode( true );

    // If you get 'Error: $location:nobase $location in HTML5 mode requires a tag to be present!' https://docs.angularjs.org/error/$location/nobase
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

    $routeProvider
    .when( '/', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'MainController',
        title: 'Home'
    } )
    .when( '/about', {
        templateUrl: ngThemeViews.partials + 'about.html',
        controller: 'PageController',
        title: 'About',
    } )
    .when( '/:slug', {
        templateUrl: ngThemeViews.partials + 'post.html',
        controller: 'PostController',
        title: ''
    } )
    .when( '/page/:page', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'PagedController',
        title: 'Home'        
    } )
    .when( '/category/:category', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'CategoryController',
        title: 'Category'
    } )
    // .when( '/category/:category/page/:page', {
    //     templateUrl: ngThemeViews.partials + 'main.html',
    //     controller: 'Category',
    //     title: 'Category'
    // } )
    .when( '/wp-admin', {
        redirectTo: '/wp-admin/'
    } )
    .otherwise( {
        redirectTo: '/'
    } );

} );