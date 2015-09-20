/*jslint white: true */

var app = angular.module( 'app-controllers', ['ngRoute', 'ngSanitize'] );

/**
 * Controllers
 */

app.controller('MainController', ['$scope', 'WPService', function( $scope, WPService ) {

    console.log( 'MainController loaded' );

    WPService.getAllCategories();
    WPService.getPosts( 1 );
    $scope.data = WPService;

    //console.log( '$scope.data', $scope.data ); 

}] );

//Category controller
app.controller('CategoryController', ['$scope', '$routeParams', '$http', 'WPService', function( $scope, $routeParams, $http, WPService ) {
    
    console.log( 'CategoryController loaded' );

    WPService.getAllCategories();

    //console.log( 'WPService.wpJsonUrl', WPService.wpJsonUrl );

    $http.get( WPService.wpJsonUrl + 'terms/category/' + $routeParams.category )
    .success(function( category ) {

        //console.log( 'CategoryController category', category );

        if ( !Object.keys(category).length ) {

            document.querySelector( 'title' ).innerHTML = 'Category not found | AngularJS Demo Theme';
            $scope.data.pageTitle = 'Category not found';

        } else {

            //console.log( 'category', category );
            $scope.current_category_id = category.id;
            WPService.getPostsInCategory( category, $routeParams.page );
        }
    });

    $scope.data = WPService;
}]);



// Paged
app.controller( 'PagedController', ['$scope', '$http', '$routeParams', 'WPService', function( $scope, $http, $routeParams, WPService ) {

    console.log( 'PagedController is loaded.' );

    WPService.getAllCategories();
    $scope.data = WPService;

    // Get categories
    $http.get( WPService.wpJsonUrl + 'terms/category/' )
    .success( function( categories ) {

        $scope.categories = categories;

    });

    // Get paged posts
    $http.get( WPService.wpJsonUrl + 'posts/?page=' + $routeParams.page )
    .success( function( posts, status, headers ) {

        var currentPage = parseInt( $routeParams.page );
        $scope.currentPage = currentPage;
        $scope.totalPages = headers( 'X-WP-TotalPages' );

        $scope.posts = posts;
        $scope.pageTitle = 'Page: ' + $scope.currentPage;
       
       // console.log( 'posts', posts ); 

    } );

}] );




// Single Page
app.controller( 'PageController', ['$scope', '$http', '$routeParams', 'WPService', function( $scope, $http, $routeParams, WPService ) {

    console.log( 'PageController is loaded.' );

    $http.get( WPService.wpJsonUrl + 'pages/?filter[name]=about' )
    .success( function( page ) {

        $scope.post = page[0];

    } );

}] );

// Single Post
app.controller( 'PostController', ['$scope', '$http', '$routeParams', 'WPService', function( $scope, $http, $routeParams, WPService ) {

    console.log( 'PostController is loaded.' );

    $http.get( WPService.wpJsonUrl + 'posts/?filter[name]=' + $routeParams.slug )
    .success( function( post ) {

        $scope.post = post[0];

        if( $scope.post.featured_image > 0 ) {

            $http.get( WPService.wpJsonUrl + 'media/' + $scope.post.featured_image )
            .success( function( image ) {

                $scope.post.image = image;

                //console.log('image', image);

            });

        }

    } );

}] );