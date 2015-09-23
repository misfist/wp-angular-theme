/*jslint white: true */

function WPService( $http, $resource ) {

    /**
     * Global variables
     */

    var WPService = {
        wpJsonUrl: 'wp-json/wp/v2/',
        siteName: 'WP Dev',
        posts: [],
        images: [],
        categories: [],
        pageTitle: '',
        totalItems: '',
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

    // WPService.factory( 'PostService', function ( $resource ) {

    //     return $resource( WPService.wpJsonUrl + 'posts/?page=' + page );

    // } );

    WPService.getPosts = function( page ) {

        // console.log( 'WPService.getPosts', WPService.getPosts );

        return $http.get( WPService.wpJsonUrl + 'posts/?page=' + page )
        .success( function( response, status, headers ) {

            //console.log( 'response', response );
            
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

        })
        .error( function( images ) {
            console.error( 'Couldn\'t get posts in WPService.getPosts' );
        } );
    };



    WPService.getImageCollection = function() {

        console.log( 'WPService.getImageCollection called' );

        $http.get( WPService.wpJsonUrl + 'posts' )
        .success( function( images ) {

            //console.log('images', images);

            _.each( images, function ( image, i ) {

                //console.log( 'i', i, 'image', image );

                if( image.featured_image_thumbnail_full_url ) {

                    WPService.images.push( {'url':image.featured_image_thumbnail_full_url, 'title':image.featured_image_thumbnail_title} );

                }

            } );   

            //console.log( 'WPService.images', WPService.images );

        } )
        .error( function( images ) {
            console.error( 'Couldn\'t get images in WPService.getImageCollection' );
        } );

    };



    WPService.getAllCategories = function() {

        // console.log( 'WPService.getAllCategories called' );

        //Only call WP API when categories is empty
        if( WPService.categories.length ) {

            return;

        }

        $http.get( WPService.wpJsonUrl + 'terms/category/' )
        .success( function( categories ) {

            WPService.categories = categories;

        } )
        .error( function( images ) {
            console.error( 'Couldn\'t get categories in WPService.getAllCategories' );
        } );

    };

    // No longer needed - Added featured image to data returned from API call
    // https://1fix.io/blog/2015/06/26/adding-fields-wp-rest-api/
    // WPService.getFeaturedImage = function( id ) {

    //     console.log( 'WPService.getFeaturedImage', WPService.getFeaturedImage );

    //     //If no image id, return
    //     if(! id ) {

    //         return;

    //     }

    //     $http.get( WPService.wpJsonUrl + 'media/' + id )
    //     .success( function( image ) {

    //         console.log( image );

    //         WPService.post.imageUrl = image;

    //     } );

    // };



    WPService.getSearchResults = function( s ) {

        // console.log( 'WPService.getSearchResults called' );

        return $http.get( WPService.wpJsonUrl + 'posts/?filter[s]=' + s + '&filter[posts_per_page]=-1' )
        .success( function( result, status, headers ) {
        
            _updateTitle('Search Results for ' + s, 'Search Results:');

            _setArchivePage( result, 1, headers );

        })
        .error( function( result ) {
            console.error( 'Couldn\'t get results in WPService.getSearchResults' );
        } );
    };


    WPService.getPostsInCategory = function( category, page ) {

        // console.log( 'WPService.getPostsInCategory called' );

        page = ( ! page ) ? 1 : parseInt( page, 10 );
        _updateTitle('Category: ' + category.name, 'Category: ' + category.name + ' - Page: ' + page );

        var request = WPService.wpJsonUrl + 'posts/?filter[category_name]=' + category.name;
        if ( page ) {
          request += '&page=' + page;
        }

        // console.log( 'request', request );

        return $http.get( request )
        .success( function( response, status, headers ) {

          _setArchivePage( response, page, headers );

        })
        .error( function( response ) {
            console.error( 'Couldn\'t get response in WPService.getPostsInCategory' );
        } );
    };

    return WPService;

}

app.factory( 'WPService', ['$http', WPService] );