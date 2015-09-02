function WPService( $http ) {

    var wpJsonUrl = 'wp-json/wp/v2/';
    var siteName = 'WP Dev';

    var WPService = {

        posts: [],
        categories: [],
        pageTitle: '',
        currentPage: 1,
        totalPages: 1

    }

    function _updateTitle( documentTitle, pageTitle ) {

        document.querySelector( 'title' ).innerHTML = siteName + ' | ' + documentTitle;
        WPService.pageTitle = pageTitle;

    }

    // Get functions
    WPService.getPosts = function( page ) {

        return $http.get( wpJsonUrl + 'posts/?page=' + page )
        .success( function( posts, status, headers ) {

            page = parseInt( page );

            // If page doesn't exist

            if( isNaN( page ) || page > headers( 'X-WP-TotalPages' ) ) {

                _updateTitle( 'Page Not Found', 'Page Not Found' );

            } else {

                if( page > 1 ) {

                    // If multi-page
                    _updateTitle( 'Posts on Page ' + page, 'Posts on Page ' + page );

                } else {

                    _updateTitle( 'Home', 'Latest Posts' );

                }

            }

            _updateTitle( 'Home', 'Latest Posts' );

            WPService.posts = posts;
            WPService.pageTitle = 'Latest Posts';
            WPService.currentPage = page;
            WPService.totalPages = headers( 'X-WP-TotalPages' );


        } );

    }

    WPService.getAllCategories = function() {

        //Only call WP API when tcategories is empty
        if( WPService.categories.length ) {

            return;

        }

        $http.get( wpJsonUrl + 'terms/category/' )
        .success( function( categories ) {

            WPService.categories = categories;

        } );

    };

    return WPService;

}

app.factory( 'WPService', ['$http', WPService] );