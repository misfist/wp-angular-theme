/*jslint white: true */

function WPService( $http ) {

    /**
     * Global variables
     */

    var WPService = {
        wpJsonUrl: 'wp-json/wp/v2/',
        siteName: 'WP Dev',
        posts: [],
        categories: [],
        pageTitle: '',
        currentPage: 1,
        totalPages: 1
    };

    /**
     * Helpers
     */


    function _updateTitle( documentTitle, pageTitle ) {

        document.querySelector( 'title' ).innerHTML = WPService.siteName + ' | ' + documentTitle;
        WPService.pageTitle = pageTitle;

    }

    function _setArchivePage( posts, page, headers ) {
        WPService.posts = posts;
        WPService.currentPage = page;
        WPService.totalPages = headers( 'X-WP-TotalPages' );
    }

    /**
     * Get Data
     */

    WPService.getPosts = function( page ) {

        console.log( 'WPService.getPosts', WPService.getPosts );

        return $http.get( WPService.wpJsonUrl + 'posts/?page=' + page )
        .success( function( response, status, headers ) {

            console.log( 'response', response );
            
            page = parseInt( page, 10 );

            if ( isNaN(page) || page > headers( 'X-WP-TotalPages' ) ) {

                _updateTitle( 'Page Not Found', 'Page Not Found' );

            } else {

                if ( page>1 ) {

                    _updateTitle( 'Posts on Page ' + page, 'Posts on Page ' + page + ':' );
                
                } else {

                    _updateTitle( 'Home', 'Latest Posts:' );

                }

                _setArchivePage( response, page, headers );
            }



        });
    };

    WPService.getAllCategories = function() {

        console.log( 'WPService.getAllCategories called' );

        //Only call WP API when categories is empty
        if( WPService.categories.length ) {

            return;

        }

        $http.get( WPService.wpJsonUrl + 'terms/category/' )
        .success( function( categories ) {

            WPService.categories = categories;

        } );

    };

    WPService.getFeaturedImage = function( id ) {

        console.log( 'WPService.getFeaturedImage', WPService.getFeaturedImage );

        //If no image id, return
        if(! id ) {

            return;

        }

        $http.get( WPService.wpJsonUrl + 'media/' + id )
        .success( function( image ) {

            console.log( image );

            WPService.post.imageUrl = image;

        } );

    };



    WPService.getSearchResults = function( s ) {

    return $http.get( WPService.wpJsonUrl + 'posts/?filter[s]=' + s + '&filter[posts_per_page]=-1' )
    .success(function( result, status, headers ) {
    
        _updateTitle('Search Results for ' + s, 'Search Results:');

        _setArchivePage( result, 1, headers );

        });
    };


    WPService.getPostsInCategory = function( category, page ) {

        console.log( 'WPService.getPostsInCategory called' );

        // console.log( 'category', category );

        // console.log( 'page', page );

        page = ( ! page ) ? 1 : parseInt( page, 10 );
        _updateTitle('Category: ' + category.name, 'Category: ' + category.name + ' - Page: ' + page );

        var request = WPService.wpJsonUrl + 'posts/?filter[category_name]=' + category.name;
        if ( page ) {
          request += '&page=' + page;
        }

        // console.log( 'request', request );

        return $http.get( request ).success(function( res, status, headers ){
          _setArchivePage( res, page, headers );
        });
    };

    return WPService;

}

app.factory( 'WPService', ['$http', WPService] );