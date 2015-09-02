var app = angular.module( 'app', ['ngRoute', 'ngSanitize'] );

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
        controller: 'Main',
        title: 'Home'
    } )
    .when( '/about', {
        templateUrl: ngThemeViews.partials + 'about.html',
        controller: 'Page',
        title: 'About',
    } )
    .when( '/:slug', {
        templateUrl: ngThemeViews.partials + 'post.html',
        controller: 'Post',
        title: ''
    } )
    .when( '/page/:page', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'Paged',
        title: 'Home'        
    } )
    .when( '/category/:category', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'Category',
        title: 'Category'
    } )
    .when( '/category/:category/page/:page', {
        templateUrl: ngThemeViews.partials + 'main.html',
        controller: 'Category',
        title: 'Category'
    } )
    .otherwise( {
        redirectTo: '/'
    } );

} );

/**
 * Controllers
 */

app.controller('Main', ['$scope', 'WPService', function($scope, WPService) {

    console.log( 'Main loaded' );

    WPService.getAllCategories();
    WPService.getPosts( 1 );
    $scope.data = WPService;

    console.log( $scope.data ); 

}] );

// Category
app.controller( 'Category', ['$scope', '$http', '$routeParams', 'WPService', function( $scope, $http, $routeParams, WPService ) {

    console.log( 'Category is loaded.' );

    WPService.getAllCategories();
    $scope.data = WPService;

    // Get categories
    $http.get( 'wp-json/wp/v2/terms/category/' )
    .success( function( categories ) {

        $scope.categories = categories;

    });

    // Get category
    $http.get( 'wp-json/wp/v2/terms/category/' + $routeParams.category )

    .success( function( category ) {

        $scope.category = category;
        $scope.currentCategoryId = category.id;

        var currentPage = ( ! $routeParams.page ) ? 1 : parseInt( $routeParams.page );
        $scope.pageTitle = 'Posts in ' + category.name + ' Page ' + currentPage;

        var request = 'wp-json/wp/v2/posts/?filter[category_name]=' + category.slug;
        if( $routeParams.page ) {
            request += '&page=' + $routeParams.page;
        }

        $http.get( request )
        .success( function( posts, status, headers ) {

            $scope.posts = posts;

            $scope.currentPage = currentPage;
            $scope.totalPages = headers( 'X-WP-TotalPages' );

        } );

    } );

}] );

// Paged
app.controller( 'Paged', ['$scope', '$http', '$routeParams', 'WPService', function( $scope, $http, $routeParams ) {

    console.log( 'Paged is loaded.' );

    WPService.getAllCategories();
    $scope.data = WPService;

    // Get categories
    $http.get( 'wp-json/wp/v2/terms/category/' )
    .success( function( categories ) {

        $scope.categories = categories;

    });

    // Get paged posts
    $http.get( 'wp-json/wp/v2/posts/?page=' + $routeParams.page )
    .success( function( posts, status, headers ) {

        var currentPage = parseInt( $routeParams.page );
        $scope.currentPage = currentPage;
        $scope.totalPages = headers( 'X-WP-TotalPages' );

        $scope.posts = posts;
        $scope.pageTitle = 'Posts on page ' + $scope.currentPage;
        console.log( 'posts', posts ); 

    } );

}] );




// Single Page
app.controller( 'Page', function( $scope, $http, $routeParams ) {

    console.log( 'Page is loaded.' );

    $http.get( 'wp-json/wp/v2/pages/?filter[name]=about' )
    .success( function( page ) {

        $scope.post = page[0];

    } );

} );

// Single Post
app.controller( 'Post', function( $scope, $http, $routeParams ) {

    console.log( 'Post is loaded.' );

    $http.get( 'wp-json/wp/v2/posts/?filter[name]=' + $routeParams.slug )
    .success( function( post ) {

        $scope.post = post[0];

        if( $scope.post.featured_image > 0 ) {

            $http.get( 'wp-json/wp/v2/media/' + $scope.post.featured_image )
            .success( function( image ) {

                $scope.post.image = image;

                console.log('image', image);

            });

        }

    } );

} );


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

app.directive( 'navigation', function() {

    return {

        restrict: 'EA',
        templateUrl: ngThemeViews.partials + 'navigation.html',

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

