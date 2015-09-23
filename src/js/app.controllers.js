/*jslint white: true */

var app = angular.module( 'app-controllers', ['ngResource', 'ngRoute', 'ngSanitize'] );

/**
 * Controllers
 */

app.controller('MainController', ['$scope', '$resource', 'WPService', function( $scope, $resource, WPService ) {

    console.log( 'MainController loaded' );

    WPService.getAllCategories();
    WPService.getPosts( 1 );
    $scope.data = WPService;

    //$scope.data = WPService.PostService.query()

    console.log( '$scope.data', $scope.data );


}] );

//Category controller
app.controller('CategoryController', ['$scope', '$routeParams', '$http', 'WPService', function( $scope, $routeParams, $http, WPService ) {
    
    // console.log( 'CategoryController loaded' );

    WPService.getAllCategories();

    $http.get( WPService.wpJsonUrl + 'terms/category/' + $routeParams.category )
    .success(function( category ) {

        if ( !Object.keys(category).length ) {

            document.querySelector( 'title' ).innerHTML = 'Category not found | AngularJS Demo Theme';
            $scope.data.pageTitle = 'Category not found';

        } else {

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

    // console.log( 'PageController is loaded.' );

    $http.get( WPService.wpJsonUrl + 'pages/?filter[name]=about' )
    .success( function( page ) {

        $scope.post = page[0];

    } );

}] );

// Single Post
app.controller( 'PostController', ['$scope', '$http', '$routeParams', 'WPService', function( $scope, $http, $routeParams, WPService ) {

    // console.log( 'PostController is loaded.' );

    $http.get( WPService.wpJsonUrl + 'posts/?filter[name]=' + $routeParams.slug )
    .success( function( post ) {

        $scope.post = post[0];

    } );

}] );

// Carousel
// app.controller( 'CarouselController', ['$scope', 'WPService', function( $scope, WPService ) {

//     console.log( 'CarouselController is loaded.' );

//     $scope.slides = [
//         {
//           image: 'http://lorempixel.com/400/200/'
//         },
//         {
//           image: 'http://lorempixel.com/400/200/food'
//         },
//         {
//           image: 'http://lorempixel.com/400/200/sports'
//         },
//         {
//           image: 'http://lorempixel.com/400/200/people'
//         }
//       ];

//     // WPService.getImageCollection();

//     // $scope.images = WPService.images;

//     console.log( 'CarouselController WPService', WPService );

// }] );

app.controller( 'CarouselCtrl', [ '$scope', 'WPService', function( $scope, WPService ) {
 
    console.log( 'CarouselCtrl called' );

    WPService.getImageCollection();

    $scope.carouselInterval = 3000;
    $scope.slides = WPService.images;

} ] );

