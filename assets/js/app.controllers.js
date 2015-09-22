/*jslint white: true */

var app = angular.module( 'app-controllers', ['ngRoute', 'ngSanitize', 'ui.bootstrap'] );

/**
 * Controllers
 */

app.controller('MainController', ['$scope', 'WPService', function( $scope, WPService ) {

    //console.log( 'MainController loaded' );

    WPService.getAllCategories();
    WPService.getPosts( 1 );
    $scope.data = WPService;

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
// app.controller( 'CarouselController', ['$scope', function( $scope ) {

//     $scope.myInterval = 3000;
//     $scope.slides = [
//         {
//             image: 'http://lorempixel.com/400/200/'
//         },
//         {
//             image: 'http://lorempixel.com/400/200/food'
//         },
//         {
//             image: 'http://lorempixel.com/400/200/sports'
//         },
//         {
//             image: 'http://lorempixel.com/400/200/people'
//         }
//     ];

// }] );

app.controller('folderCtrl', function ($scope, $http) {
  $scope.w = window.innerWidth;
  $scope.h = window.innerHeight-20;
  $scope.uri = "http://lorempixel.com";
  $scope.folders = [
    'abstract',
    'animals',
    'business',
    'cats',
    'city',
    'food',
    'night',
    'life',
    'fashion',
    'people',
    'nature',
    'sports',
    'technics',
    'transport'
  ];
  $scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  $scope.currentFolder = $scope.folders[0];
  $scope.selectFolder = function (folder) {
    $scope.currentFolder = folder;
  };
  $scope.activeFolder = function (folder) {
    return (folder === $scope.currentFolder) ? 'active' : '';
  };
});

