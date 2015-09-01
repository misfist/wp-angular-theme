function WPService( $http ) {

    var WPService = {

        categories: []

    }

    WPService.getAllCategories = function() {

        //Only call WP API when tcategories is empty
        if( WPService.categories.length ) {

            return;

        }

        $http.get( 'wp-json/wp/v2/terms/category/' )
        .success( function( categories ) {

            WPService.categories = categories;

        } );

    };

    return WPService;

}

app.factory( 'WPService', ['$http', WPService] );