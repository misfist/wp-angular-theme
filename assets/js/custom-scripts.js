jQuery(document).ready( function( $ ) {

    // Add wp-admin-bar class to body
    if( $( '#wpadminbar' ) ) {
        console.log('wpadminbar exists');
        $( 'body' ).addClass('admin-bar')
    }

});

